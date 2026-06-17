import { Link } from 'wouter';
import PageLayout from '../../components/PageLayout';
import { useAuth } from '../../lib/auth';

interface TramiteCardProps {
  icon: string;
  title: string;
  description: string;
  status: 'available' | 'coming_soon' | 'maintenance';
  href: string;
  highlights?: string[];
}

function TramiteCard({ icon, title, description, status, href, highlights }: TramiteCardProps) {
  const statusConfig = {
    available: { label: 'Disponible', color: 'var(--success)', bg: '#e6f7e6' },
    coming_soon: { label: 'Próximamente', color: 'var(--warning)', bg: '#fff8e1' },
    maintenance: { label: 'En mantenimiento', color: 'var(--muted-foreground)', bg: 'var(--muted)' },
  };
  const cfg = statusConfig[status];

  return (
    <Link to={href}>
      <div
        className="card"
        style={{
          padding: '1.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
              {title}
            </h3>
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              background: cfg.bg,
              color: cfg.color,
              fontWeight: 600,
            }}>
              {cfg.label}
            </span>
          </div>
        </div>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
          {description}
        </p>
        {highlights && highlights.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem' }}>
              {highlights.map((h, i) => (
                <li key={i} style={{ marginBottom: '0.3rem', color: 'var(--foreground)' }}>{h}</li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ marginTop: '1rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--gold)',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}>
            Acceder
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function LpbTramites() {
  const { user } = useAuth();

  const tramites = [
    {
      icon: '🏦',
      title: 'Créditos ICORP',
      description: 'Línea de financiación para empresas de nueva creación (similar a las líneas ICO). Orden ECE/118/2026.',
      status: 'available' as const,
      href: '/lpb/tramites/creditos-icorp',
      highlights: ['Financiación empresarial', 'Interés competitivo', 'Hasta 100.000 panedas'],
    },
    {
      icon: '🎂',
      title: 'Bono Masa Jóven',
      description: 'Ayuda de 15.200 panedas para ciudadanos jóvenes del Reino del Pan.',
      status: 'available' as const,
      href: '/lpb/tramites/bono-masa-joven',
      highlights: ['15.200 panedas de ayuda', '18 años o más', 'Un uso por ciudadano'],
    },
  ];

  return (
    <PageLayout
      crumbs={[{ label: 'LPB' }, { label: 'Trámites' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Trámites del LPB"
      heroSubtitle="Solicita ayudas y financiación para impulsar tu negocio o acceder a beneficios como ciudadano del Reino del Pan."
    >
      <div className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <a
              href="https://mineco.duckdns.org/lpb/cuenta"
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
              Volver a LPB
            </a>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #fff9e6 0%, white 100%)', borderLeft: '4px solid var(--gold)' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Portal de Trámites del LPB
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: 0 }}>
              Desde aquí puedes acceder a los trámites disponibles. Asegúrate de tener tu DPI activo para poder realizar solicitudes.
              {user ? (
                <span style={{ color: 'var(--success)', fontWeight: 600 }}> Estás autenticado como {user.discord_username}.</span>
              ) : (
                <span style={{ color: 'var(--warning)', fontWeight: 600 }}> <Link to="/lpb/cuenta">Inicia sesión</Link> para acceder a los formularios.</span>
              )}
            </p>
          </div>

          <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', fontSize: '1rem' }}>
            Trámites disponibles
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            {tramites.map((t, i) => (
              <TramiteCard key={i} {...t} />
            ))}
          </div>

          <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--muted)' }}>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: 0 }}>
              ¿Necesitas ayuda con algún trámite? Visita la{' '}
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