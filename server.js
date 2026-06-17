import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { createClient } from '@supabase/supabase-js';
import { WebSocket } from 'ws';

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4433;
const isDev = process.argv.includes('--dev') || process.env.NODE_ENV === 'development';

let supabase = null;
function getSupabase() {
  if (!supabase && process.env.VITE_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { realtime: { transport: WebSocket } }
    );
  }
  return supabase;
}

function getSession(req) {
  const session = req.cookies?.session;
  if (!session) return null;
  try {
    return JSON.parse(Buffer.from(session, 'base64').toString());
  } catch {
    return null;
  }
}

const DISCORD_CLIENT_ID     = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI  = process.env.DISCORD_REDIRECT_URI;

async function bootstrap() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  // ── AUTH ─────────────────────────────────────────────────────────────────

  app.get('/auth/discord', (req, res) => {
    const params = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      redirect_uri: DISCORD_REDIRECT_URI,
      response_type: 'code',
      scope: 'identify',
    });
    res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
  });

  app.get('/auth/discord/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.redirect('/lpb?error=no_code');

    try {
      const sb = getSupabase();
      if (!sb) return res.redirect('/lpb?error=config');

      const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: DISCORD_CLIENT_ID,
          client_secret: DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: DISCORD_REDIRECT_URI,
        }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) throw new Error('No access token');

      const userRes = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const discordUser = await userRes.json();

      const { data: verificado, error: verifError } = await sb
        .from('verificados')
        .select('*')
        .eq('discord_id', discordUser.id)
        .maybeSingle();

      if (verifError) {
        console.error('verificados query error:', verifError);
        return res.redirect('/lpb?error=config');
      }

      if (!verificado) {
        res.cookie('session', '', { maxAge: 0, httpOnly: true });
        return res.redirect('/lpb?error=no_dpi');
      }

      const sessionData = {
        discord_id:       discordUser.id,
        discord_username: discordUser.username,
        avatar:           discordUser.avatar,
        dpi:              verificado.dpi,
        verified_at:      verificado.verified_at,
      };

      const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString('base64');
      res.cookie('session', sessionToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.redirect('/lpb');
    } catch (err) {
      console.error('Discord auth error:', err);
      res.redirect('/lpb?error=auth_failed');
    }
  });

  app.get('/api/me', (req, res) => {
    const user = getSession(req);
    res.json({ user: user ?? null });
  });

  app.post('/auth/logout', (req, res) => {
    res.cookie('session', '', { maxAge: 0, httpOnly: true });
    res.json({ success: true });
  });

  // ── LPB API ───────────────────────────────────────────────────────────────

  // Economía del usuario actual
  app.get('/api/lpb/economy', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { data, error } = await sb
      .from('users_economy')
      .select('*')
      .eq('id', user.discord_id)
      .maybeSingle();

    if (error) console.error('economy error:', error);
    res.json({ economy: data ?? null });
  });

  // Préstamos del usuario actual (como borrower o lender)
  app.get('/api/lpb/prestamos', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { data, error } = await sb
      .from('prestamos')
      .select('*')
      .or(`borrower_id.eq.${user.discord_id},lender_id.eq.${user.discord_id}`)
      .order('created_at', { ascending: false });

    if (error) console.error('prestamos error:', error);
    res.json({ prestamos: data ?? [] });
  });

  // Transferencia de efectivo por DPI
  app.post('/api/lpb/transfer', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const { to_dpi, amount } = req.body;
    if (!to_dpi || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    // Buscar destinatario por DPI
    const { data: destVerif, error: dpiErr } = await sb
      .from('verificados')
      .select('discord_id')
      .eq('dpi', to_dpi)
      .maybeSingle();

    if (dpiErr || !destVerif) {
      return res.json({ ok: false, error: 'DPI no encontrado o no registrado.' });
    }

    if (destVerif.discord_id === user.discord_id) {
      return res.json({ ok: false, error: 'No puedes transferirte dinero a ti mismo.' });
    }

    // Leer saldo del remitente
    const { data: sender } = await sb
      .from('users_economy')
      .select('bank')
      .eq('id', user.discord_id)
      .maybeSingle();

    if (!sender || sender.bank < amount) {
      return res.json({ ok: false, error: 'Saldo bancario insuficiente.' });
    }

    // Leer saldo del destinatario
    const { data: receiver } = await sb
      .from('users_economy')
      .select('bank, total_earned')
      .eq('id', destVerif.discord_id)
      .maybeSingle();

    if (!receiver) {
      return res.json({ ok: false, error: 'El destinatario no tiene cuenta en el banco.' });
    }

    // Actualizar remitente
    const { error: errSender } = await sb
      .from('users_economy')
      .update({ bank: sender.bank - amount, updated_at: new Date().toISOString() })
      .eq('id', user.discord_id);

    if (errSender) {
      console.error('transfer sender error:', errSender);
      return res.json({ ok: false, error: 'Error al procesar la transferencia.' });
    }

    // Actualizar destinatario
    const { error: errReceiver } = await sb
      .from('users_economy')
      .update({
        bank: receiver.bank + amount,
        total_earned: (receiver.total_earned ?? 0) + amount,
        updated_at: new Date().toISOString(),
      })
      .eq('id', destVerif.discord_id);

    if (errReceiver) {
      console.error('transfer receiver error:', errReceiver);
      // Revertir remitente
      await sb.from('users_economy').update({ bank: sender.bank, updated_at: new Date().toISOString() }).eq('id', user.discord_id);
      return res.json({ ok: false, error: 'Error al acreditar al destinatario.' });
    }

    res.json({ ok: true });
  });

  // ── PIB (Gobierno balance) ──────────────────────────────────────────────────

  app.get('/api/gobierno/pib', async (_req, res) => {
    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { data, error } = await sb
      .from('gobierno')
      .select('id, name, balance, created_at')
      .eq('is_public', true);

    if (error) {
      console.error('gobierno pib error:', error);
      return res.status(500).json({ error: 'Error al leer datos' });
    }

    const now = new Date();
    res.json({ data: data ?? [], fetched_at: now.toISOString() });
  });

  // ── BONO MASA JÓVEN ────────────────────────────────────────────────────────

  app.post('/api/lpb/bono-masa-joven', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    // 1) Comprobar que tiene DPI
    if (!user.dpi) {
      return res.json({ ok: false, error: 'No tienes DPI registrado.' });
    }

    // 2) Buscar el DPI en la tabla dpis para comprobar edad
    const { data: dpiRecord, error: dpiErr } = await sb
      .from('dpis')
      .select('dpi_number, fecha_nac, nombre, apellidos')
      .eq('dpi_number', user.dpi)
      .maybeSingle();

    if (dpiErr || !dpiRecord) {
      return res.json({ ok: false, error: 'No se encontró tu DPI en el registro.' });
    }

    // 3) Comprobar edad >= 18
    const birthDate = new Date(dpiRecord.fecha_nac);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return res.json({ ok: false, error: 'No puedes reclamar el Bono Masa Jóven porque no cumples los requisitos necesarios. Debes tener 18 años o más.' });
    }

    // 4) Comprobar que no lo ha reclamado ya
    const { data: existingBono } = await sb
      .from('bonos')
      .select('id')
      .eq('user_id', user.discord_id)
      .eq('bono_type', 'masa_joven')
      .maybeSingle();

    if (existingBono) {
      return res.json({ ok: false, error: 'Ya has reclamado este bono.' });
    }

    // 5) Registrar el bono y actualizar economía
    const BONO_AMOUNT = 15200;

    const { error: bonoErr } = await sb
      .from('bonos')
      .insert({ user_id: user.discord_id, dpi: user.dpi, bono_type: 'masa_joven', amount: BONO_AMOUNT });

    if (bonoErr) {
      console.error('bono insert error:', bonoErr);
      return res.json({ ok: false, error: 'Error al registrar el bono.' });
    }

    // Leer economía actual
    const { data: economy } = await sb
      .from('users_economy')
      .select('bank, total_earned')
      .eq('id', user.discord_id)
      .maybeSingle();

    if (!economy) {
      return res.json({ ok: false, error: 'No tienes cuenta bancaria. Interactúa en Discord primero.' });
    }

    const { error: econErr } = await sb
      .from('users_economy')
      .update({
        bank: (economy.bank ?? 0) + BONO_AMOUNT,
        total_earned: (economy.total_earned ?? 0) + BONO_AMOUNT,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.discord_id);

    if (econErr) {
      console.error('economy update error:', econErr);
      return res.json({ ok: false, error: 'Error al actualizar tu saldo.' });
    }

    res.json({ ok: true, amount: BONO_AMOUNT });
  });

  // ── EMPRESAS ────────────────────────────────────────────────────────────────

  const EMPRESA_COST = 750000;

  // Listar empresas del usuario
  app.get('/api/lpb/empresas', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { data, error } = await sb
      .from('empresas')
      .select('*')
      .eq('owner_id', user.discord_id)
      .order('created_at', { ascending: false });

    if (error) console.error('empresas list error:', error);
    res.json({ empresas: data ?? [] });
  });

  // Crear empresa
  app.post('/api/lpb/empresas', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { name, description, emoji } = req.body;
    if (!name || name.trim().length < 2) {
      return res.json({ ok: false, error: 'El nombre de la empresa debe tener al menos 2 caracteres.' });
    }

    // Comprobar saldo
    const { data: economy } = await sb
      .from('users_economy')
      .select('bank, total_spent')
      .eq('id', user.discord_id)
      .maybeSingle();

    if (!economy) {
      return res.json({ ok: false, error: 'No tienes cuenta bancaria. Interactúa en Discord primero.' });
    }

    if ((economy.bank ?? 0) < EMPRESA_COST) {
      return res.json({ ok: false, error: `No tienes suficiente dinero en el banco. Crear una empresa cuesta ${EMPRESA_COST.toLocaleString('es-ES')} panedas. Tienes ${(economy.bank ?? 0).toLocaleString('es-ES')} panedas.` });
    }

    // Crear empresa
    const { data: empresa, error: empErr } = await sb
      .from('empresas')
      .insert({
        owner_id: user.discord_id,
        name: name.trim(),
        description: description?.trim() || null,
        emoji: emoji || '🏢',
      })
      .select()
      .single();

    if (empErr) {
      if (empErr.code === '23505') {
        return res.json({ ok: false, error: 'Ya tienes una empresa con ese nombre.' });
      }
      console.error('empresa insert error:', empErr);
      return res.json({ ok: false, error: 'Error al crear la empresa.' });
    }

    // Descontar del banco
    const { error: econErr } = await sb
      .from('users_economy')
      .update({
        bank: (economy.bank ?? 0) - EMPRESA_COST,
        total_spent: (economy.total_spent ?? 0) + EMPRESA_COST,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.discord_id);

    if (econErr) {
      console.error('economy update error:', econErr);
      // Intentar borrar la empresa recién creada
      await sb.from('empresas').delete().eq('id', empresa.id);
      return res.json({ ok: false, error: 'Error al descontar el pago. Inténtalo de nuevo.' });
    }

    res.json({ ok: true, empresa });
  });

  // Editar empresa
  app.patch('/api/lpb/empresas/:id', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { id } = req.params;
    const { name, description, emoji } = req.body;

    // Verificar propiedad
    const { data: emp } = await sb
      .from('empresas')
      .select('owner_id')
      .eq('id', id)
      .maybeSingle();

    if (!emp || emp.owner_id !== user.discord_id) {
      return res.status(403).json({ error: 'No eres el propietario de esta empresa.' });
    }

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined) updates.description = description?.trim() || null;
    if (emoji !== undefined) updates.emoji = emoji;

    const { data, error } = await sb
      .from('empresas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('empresa update error:', error);
      return res.json({ ok: false, error: 'Error al actualizar la empresa.' });
    }

    res.json({ ok: true, empresa: data });
  });

  // Eliminar empresa
  app.delete('/api/lpb/empresas/:id', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { id } = req.params;

    const { data: emp } = await sb
      .from('empresas')
      .select('owner_id')
      .eq('id', id)
      .maybeSingle();

    if (!emp || emp.owner_id !== user.discord_id) {
      return res.status(403).json({ error: 'No eres el propietario de esta empresa.' });
    }

    const { error } = await sb.from('empresas').delete().eq('id', id);

    if (error) {
      console.error('empresa delete error:', error);
      return res.json({ ok: false, error: 'Error al eliminar la empresa.' });
    }

    res.json({ ok: true });
  });

  // ── ENTIDAD SHOP (productos de empresa) ─────────────────────────────────────

  // Listar productos de una empresa
  app.get('/api/lpb/empresas/:empresaId/productos', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { empresaId } = req.params;

    // Verificar propiedad
    const { data: emp } = await sb
      .from('empresas')
      .select('owner_id')
      .eq('id', empresaId)
      .maybeSingle();

    if (!emp || emp.owner_id !== user.discord_id) {
      return res.status(403).json({ error: 'No eres el propietario de esta empresa.' });
    }

    const { data, error } = await sb
      .from('entidad_shop')
      .select('*')
      .eq('empresa_id', empresaId)
      .order('created_at', { ascending: false });

    if (error) console.error('shop list error:', error);
    res.json({ productos: data ?? [] });
  });

  // Crear producto
  app.post('/api/lpb/empresas/:empresaId/productos', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { empresaId } = req.params;
    const { product_id, name, description, price, emoji, category, stackable } = req.body;

    if (!product_id || !name || price === undefined || price < 0) {
      return res.json({ ok: false, error: 'Datos incompletos: product_id, name y price son obligatorios.' });
    }

    // Verificar propiedad
    const { data: emp } = await sb
      .from('empresas')
      .select('owner_id')
      .eq('id', empresaId)
      .maybeSingle();

    if (!emp || emp.owner_id !== user.discord_id) {
      return res.status(403).json({ error: 'No eres el propietario de esta empresa.' });
    }

    const { data, error } = await sb
      .from('entidad_shop')
      .insert({
        empresa_id: empresaId,
        product_id: product_id.trim(),
        name: name.trim(),
        description: description?.trim() || null,
        price,
        emoji: emoji || '📦',
        category: category || 'general',
        stackable: stackable !== false,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.json({ ok: false, error: 'Ya existe un producto con ese ID en esta empresa.' });
      }
      console.error('shop insert error:', error);
      return res.json({ ok: false, error: 'Error al crear el producto.' });
    }

    res.json({ ok: true, producto: data });
  });

  // Editar producto
  app.patch('/api/lpb/empresas/:empresaId/productos/:productoId', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { empresaId, productoId } = req.params;
    const { name, description, price, emoji, category, stackable } = req.body;

    // Verificar propiedad de la empresa
    const { data: emp } = await sb
      .from('empresas')
      .select('owner_id')
      .eq('id', empresaId)
      .maybeSingle();

    if (!emp || emp.owner_id !== user.discord_id) {
      return res.status(403).json({ error: 'No eres el propietario de esta empresa.' });
    }

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined) updates.description = description?.trim() || null;
    if (price !== undefined) updates.price = price;
    if (emoji !== undefined) updates.emoji = emoji;
    if (category !== undefined) updates.category = category;
    if (stackable !== undefined) updates.stackable = stackable;

    const { data, error } = await sb
      .from('entidad_shop')
      .update(updates)
      .eq('id', productoId)
      .eq('empresa_id', empresaId)
      .select()
      .single();

    if (error) {
      console.error('shop update error:', error);
      return res.json({ ok: false, error: 'Error al actualizar el producto.' });
    }

    if (!data) {
      return res.json({ ok: false, error: 'Producto no encontrado.' });
    }

    res.json({ ok: true, producto: data });
  });

  // Eliminar producto
  app.delete('/api/lpb/empresas/:empresaId/productos/:productoId', async (req, res) => {
    const user = getSession(req);
    if (!user) return res.status(401).json({ error: 'No autenticado' });

    const sb = getSupabase();
    if (!sb) return res.status(500).json({ error: 'Sin Supabase' });

    const { empresaId, productoId } = req.params;

    // Verificar propiedad
    const { data: emp } = await sb
      .from('empresas')
      .select('owner_id')
      .eq('id', empresaId)
      .maybeSingle();

    if (!emp || emp.owner_id !== user.discord_id) {
      return res.status(403).json({ error: 'No eres el propietario de esta empresa.' });
    }

    const { error } = await sb
      .from('entidad_shop')
      .delete()
      .eq('id', productoId)
      .eq('empresa_id', empresaId);

    if (error) {
      console.error('shop delete error:', error);
      return res.json({ ok: false, error: 'Error al eliminar el producto.' });
    }

    res.json({ ok: true });
  });

  // ── ESTÁTICO / VITE ───────────────────────────────────────────────────────

  if (!isDev) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════════════════════╗');
    console.log(`  ║  MECE · Reino del Pan  →  http://localhost:${PORT}   ║`);
    console.log('  ╚══════════════════════════════════════════════════════╝');
    console.log('');
  });
}

bootstrap().catch((err) => {
  console.error('Error al iniciar el servidor:', err);
  process.exit(1);
});