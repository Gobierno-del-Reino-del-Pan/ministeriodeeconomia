import { Link } from 'wouter';
import PageLayout from '../../components/PageLayout';
import { useAuth } from '../../lib/auth';

export default function LpbCreditosICORP() {
  const { user } = useAuth();

  return (
    <PageLayout
      crumbs={[{ label: 'LPB' }, { label: 'Trámites', href: '/lpb/tramites' }, { label: 'Créditos ICORP' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Créditos ICORP"
      heroSubtitle="Línea de financiación para empresas de nueva creación inspirada en las líneas ICO."
    >
      <div className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Botón Volver a Trámites */}
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
              <span style={{ fontSize: '2rem' }}>🏦</span>
              <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.25rem', margin: 0 }}>Créditos ICORP</h2>
            </div>

            <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
              <span>📜</span>
              <div>
                <strong>Orden ECE/118/2026, de 16 de junio</strong><br />
                Línea de financiación empresarial inspirada en las <strong>líneas ICO</strong> del Gobierno de España.
                Esta orden se publica en el <strong>BORP</strong> (Boletín Oficial del Reino del Pan) y está
                gestionada por el Instituto Corporativo de Financiación (ICORP).
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Finalidad</h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', margin: 0 }}>
                <li>Impulsar el emprendimiento y la innovación</li>
                <li>Favorecer la creación de empleo</li>
                <li>Facilitar la implantación de nuevas actividades económicas</li>
                <li>Incrementar la competitividad del tejido empresarial paniense</li>
              </ul>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Condiciones del crédito</h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', margin: 0 }}>
                <li>El crédito se concede con un <strong>interés competitivo</strong> que se fijará en función del riesgo y las condiciones del mercado.</li>
                <li>El importe máximo del crédito será de hasta <strong>750.000 panedas</strong> (sujeto a evaluación del ICORP).</li>
                <li>El plazo de amortización se determinará en las bases reguladoras del ICORP.</li>
                <li>Las empresas deberán presentar un <strong>plan de negocio</strong> y proyecciones financieras.</li>
                <li>La devolución se realizará mediante cuotas periódicas, con posibilidad de carencia inicial.</li>
              </ul>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                <em>Nota: El tipo de interés exacto será publicado próximamente por el ICORP en sus bases reguladoras.</em>
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Requisitos</h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', margin: 0 }}>
                <li>Ser ciudadano del Reino del Pan con DPI activo</li>
                <li>Empresa de nueva creación o con menos de 2 años de antigüedad</li>
                <li>Presentar plan de negocio y proyecciones financieras</li>
                <li>No tener deudas pendientes con el ICORP</li>
              </ul>
            </div>

            <div className="alert alert-warning" style={{ marginBottom: '1rem' }}>
              <span>📋</span>
              <span>Las bases reguladoras y procedimientos de solicitud serán publicadas en un plazo máximo de quince días por el ICORP.</span>
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
              Solicitar Crédito ICORP
            </button>
          </div>

          {/* Info de contacto */}
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