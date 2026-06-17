import { Link } from 'wouter';
import PageLayout from '../../components/PageLayout';
import { useAuth } from '../../lib/auth';

export default function LpbBonoMasaJoven() {
  const { user } = useAuth();

  return (
    <PageLayout
      crumbs={[{ label: 'LPB' }, { label: 'Trámites', href: '/lpb/tramites' }, { label: 'Bono Masa Jóven' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Bono Masa Jóven"
      heroSubtitle="Ayuda de 15.200 panedas para ciudadanos jóvenes del Reino del Pan."
    >
      <div className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Link to="/lpb/tramites">
              <a
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius)',
                  background: 'var(--muted)',
                  color: 'var(--foreground)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--muted)')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver a Trámites
              </a>
            </Link>
          </div>

          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem' }}>🎂</span>
              <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.25rem', margin: 0 }}>Bono Masa Jóven</h2>
            </div>

            <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
              <span>🎯</span>
              <div>
                <strong>Bono Masa Jóven (BMJ)</strong><br />
                Una ayuda de <strong>15.200 panedas</strong> para ciudadanos jóvenes del Reino del Pan destinada a fomentar su
                participación en la vida cultural, social y económica del Reino.
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Requisitos</h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', margin: 0 }}>
                <li>Ser ciudadano del Reino del Pan con DPI activo</li>
                <li>Tener 18 años o más</li>
                <li>No haber solicitado el bono anteriormente</li>
              </ul>
            </div>

            {user ? (
              <div style={{
                background: 'var(--muted)',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                marginBottom: '1rem',
              }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>
                  Solicitante
                </div>
                <div style={{ fontWeight: 600 }}>{user.discord_username}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>DPI: {user.dpi || 'No disponible'}</div>
              </div>
            ) : (
              <div className="alert alert-warning" style={{ marginBottom: '1rem' }}>
                <span>⚠️</span>
                <span>Debes <Link to="/lpb/cuenta">iniciar sesión</Link> para solicitar este trámite.</span>
              </div>
            )}

            <button
              className="btn btn-primary"
              disabled={!user || !user.dpi}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                opacity: (!user || !user.dpi) ? 0.5 : 1,
                cursor: (!user || !user.dpi) ? 'not-allowed' : 'pointer',
              }}
            >
              Solicitar Bono Masa Jóven
            </button>
          </div>

          <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--muted)' }}>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: 0 }}>
              ¿Necesitas ayuda? Visita la{' '}
              <Link to="/ministerio/secretarias" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'underline' }}>
                Secretaría de Economía
              </Link>{' '}
              o contacta con un administrador en Discord.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}