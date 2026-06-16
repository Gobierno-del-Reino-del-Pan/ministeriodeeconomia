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

      const { data: verificado } = await sb
        .from('verificados')
        .select('*')
        .eq('discord_id', discordUser.id)
        .maybeSingle();

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