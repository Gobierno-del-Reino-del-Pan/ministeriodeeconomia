import { Link, useLocation } from 'wouter';

const NAV = [
  { label: 'Home', href: '/' },
  {
    label: 'Ministerio',
    href: '/ministerio',
    sub: [
      { label: 'El Ministerio', href: '/ministerio' },
      { label: 'Organización', href: '/ministerio/organizacion' },
      { label: 'Secretarías', href: '/ministerio/secretarias' },
      { label: 'Agenda', href: '/ministerio/agenda' },
      { label: 'Noticias', href: '/ministerio/noticias' },
    ],
  },
  {
    label: 'Comercio',
    href: '/comercio',
    sub: [
      { label: 'Política Comercial', href: '/comercio' },
      { label: 'Exportaciones', href: '/comercio/exportaciones' },
      { label: 'Inversiones', href: '/comercio/inversiones' },
      { label: 'Acuerdos', href: '/comercio/acuerdos' },
    ],
  },
  {
    label: 'Empleo',
    href: '/empleo',
    sub: [
      { label: 'Política de Empleo', href: '/empleo' },
      { label: 'Estadísticas', href: '/empleo/estadisticas' },
      { label: 'Políticas Activas', href: '/empleo/politicas' },
      { label: 'Formación', href: '/empleo/formacion' },
    ],
  },
];

export default function Header() {
  const [location] = useLocation();

  return (
    <header>
      <div className="site-header">
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '0.5rem 1.25rem',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="Escudo del Reino del Pan"
              className="logo-img"
            />
          </Link>

          <div style={{ flex: 1 }} />

          <nav
            style={{
              display: 'flex',
              gap: '1.75rem',
              alignItems: 'center',
            }}
          >
            {NAV.map((item) => {
              const isActive =
                item.href === '/'
                  ? location === '/'
                  : location.startsWith(item.href);

              return (
                <div
                  key={item.href}
                  style={{ position: 'relative' }}
                  className="nav-group"
                >
                  <Link
                    href={item.href}
                    className={`nav-link${isActive ? ' active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}

            <Link
              href="/lpb"
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '0.55rem 1.25rem',
                borderRadius: 'var(--radius)',
                background: 'var(--primary)',
                color: '#fff',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              Accede a LPB
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}