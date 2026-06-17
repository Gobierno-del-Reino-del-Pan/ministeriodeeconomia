import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import PageLayout from '../../components/PageLayout';
import { useAuth } from '../../lib/auth';
import { useLpbData } from '../../lib/lpb/hooks';
import { DashboardUser, Economy, Prestamo } from '../../lib/lpb/types';

type TabKey = 'cuenta' | 'inventario' | 'prestamos' | 'transferencia' | 'tramites' | 'empresa';

const TABS: { key: TabKey; label: string; icon: string; path: string }[] = [
  { key: 'cuenta', label: 'Mi Cuenta', icon: '👤', path: '/lpb/cuenta' },
  { key: 'inventario', label: 'Inventario', icon: '🎒', path: '/lpb/inventario' },
  { key: 'prestamos', label: 'Préstamos', icon: '📋', path: '/lpb/prestamos' },
  { key: 'transferencia', label: 'Transferencia', icon: '💸', path: '/lpb/transferencia' },
  { key: 'empresa', label: 'Empresa', icon: '🏢', path: '/lpb/empresa' },
  { key: 'tramites', label: 'Trámites', icon: '📑', path: '/lpb/tramites' },
];

interface Props {
  children: (props: { user: DashboardUser; economy: Economy | null; prestamos: Prestamo[]; loading: boolean }) => ReactNode;
}

// Capturar el error de la URL ANTES de que wouter navegue (se ejecuta en el módulo, no en un efecto)
function getInitialUrlError(): string | null {
  try {
    return new URLSearchParams(window.location.search).get('error');
  } catch {
    return null;
  }
}

// Pantalla de inicio de sesión (login con Discord)
function LoginScreen() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏦</div>
        <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>Accede a LPB</h2>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
          Inicia sesión con tu cuenta de Discord para acceder al Laboral Panien Bank.
        </p>
        <a
          href="/auth/discord"
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.75rem 2rem' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.07.07 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.072.072 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .085.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Iniciar sesión con Discord
        </a>
      </div>
    </div>
  );
}

function NoDpiScreen() {
  return (
    <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚠️</div>
      <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '2rem', marginBottom: '1.5rem' }}>
        No eres ciudadano del Reino del Pan
      </h2>
      <p style={{ fontSize: '1.3rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Para acceder a los servicios financieros del LPB, necesitas un DPI (Documento de Identidad Paniense).
      </p>
      <p style={{ fontSize: '1.3rem', marginBottom: '2.5rem' }}>
        <a
          href="https://reino-del-pan-web.vercel.app/dpi/create"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--gold)',
            textDecoration: 'underline',
            fontWeight: 700,
            fontSize: '1.5rem',
            textDecorationColor: 'var(--gold)',
            textUnderlineOffset: '0.2em',
          }}
        >
          Crear mi DPI →
        </a>
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.85rem 2.8rem',
          fontSize: '1.2rem',
          borderRadius: 'var(--radius)',
          background: 'var(--primary)',
          color: 'var(--background)',
          fontWeight: 700,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
        className="btn btn-primary"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

function SessionError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
      <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.5rem', marginBottom: '1rem' }}>
        No se pudo cargar tu sesión
      </h2>
      <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Hubo un problema al verificar tu identidad. Puedes intentarlo de nuevo.
      </p>
      <button
        onClick={onRetry}
        className="btn btn-primary"
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          background: 'var(--primary)',
          color: 'var(--background)',
          borderRadius: 'var(--radius)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Reintentar
      </button>
    </div>
  );
}

const HERO_PROPS = {
  crumbs: [{ label: 'LPB' }],
  heroTag: 'Ministerio de Economía, Comercio y Empresa',
  heroTitle: 'LPB — Laboral Panien Bank',
  heroSubtitle: 'Punto de acceso a los servicios y trámites financieros y laborales del Ministerio.',
};

export default function LpbLayout({ children }: Props) {
  const { user, loading: authLoading, error: authError, refresh, logout } = useAuth();
  const [location] = useLocation();

  // Capturar el error de la URL en el primer render, antes de que wouter navegue
  const urlErrorRef = useRef<string | null>(getInitialUrlError());
  const urlError = urlErrorRef.current;

  const isAuthenticated = !authLoading && !authError && !!user && !!user.dpi;
  const { economy, prestamos, loading: dataLoading } = useLpbData(isAuthenticated);

  // ── Errores de URL del backend ────────────────────────────────────────────

  if (urlError === 'config') {
    return (
      <PageLayout {...HERO_PROPS}>
        <div className="section">
          <div className="container" style={{ maxWidth: '860px' }}>
            <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
              <span>⚠️</span>
              <span><strong>Error de configuración:</strong> SUPABASE_SERVICE_ROLE_KEY no está configurado en el archivo .env</span>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (urlError === 'auth_failed') {
    return (
      <PageLayout {...HERO_PROPS}>
        <div className="section">
          <div className="container" style={{ maxWidth: '860px' }}>
            <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
              <span>⚠️</span>
              <span>Error al autenticar con Discord. Verifica que DISCORD_CLIENT_ID y DISCORD_CLIENT_SECRET estén configurados correctamente.</span>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (urlError === 'no_dpi') {
    return (
      <PageLayout {...HERO_PROPS}>
        <div className="section">
          <div className="container" style={{ maxWidth: '860px' }}>
            <NoDpiScreen />
          </div>
        </div>
      </PageLayout>
    );
  }

  // ── Estados de autenticación ──────────────────────────────────────────────

  if (authLoading) {
    return (
      <PageLayout {...HERO_PROPS}>
        <div className="section">
          <div className="container" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--muted-foreground)' }}>Cargando sesión...</div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (authError) {
    return (
      <PageLayout {...HERO_PROPS}>
        <div className="section">
          <div className="container" style={{ maxWidth: '860px' }}>
            <SessionError onRetry={refresh} />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout {...HERO_PROPS}>
        <div className="section">
          <div className="container" style={{ maxWidth: '860px' }}>
            <LoginScreen />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!user.dpi) {
    return (
      <PageLayout {...HERO_PROPS}>
        <div className="section">
          <div className="container" style={{ maxWidth: '860px' }}>
            <NoDpiScreen />
          </div>
        </div>
      </PageLayout>
    );
  }

  // ── Todo bien: contenido con pestañas ────────────────────────────────────

  const isActive = (path: string) => location === path;

  return (
    <PageLayout {...HERO_PROPS}>
      <div className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <button
              onClick={logout}
              style={{
                padding: '0.4rem 1rem', fontSize: '0.85rem',
                border: '1px solid var(--border)', background: 'var(--background)',
                borderRadius: 'var(--radius)', cursor: 'pointer',
              }}
            >
              Cerrar sesión
            </button>
          </div>

          <div className="lpb-tabs-container" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>            {TABS.map(tab => (
              <Link key={tab.key} to={tab.path}>
                <a
                  style={{
                    padding: '0.6rem 1.2rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: isActive(tab.path) ? 700 : 400,
                    color: isActive(tab.path) ? 'var(--foreground)' : 'var(--muted-foreground)',
                    borderBottom: isActive(tab.path) ? '2px solid var(--gold)' : '2px solid transparent',
                    marginBottom: '-1px',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textDecoration: 'none',
                  }}
                >
                  {tab.icon} {tab.label}
                </a>
              </Link>
            ))}
          </div>

          {dataLoading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>Cargando datos...</div>
          ) : (
            children({ user, economy, prestamos, loading: dataLoading })
          )}
        </div>
      </div>
    </PageLayout>
  );
}