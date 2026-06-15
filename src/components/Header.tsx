import { Link, useLocation } from 'wouter';

const NAV = [
  { label: 'Ministerio', href: '/ministerio',
    sub: [
      { label: 'El Ministerio',  href: '/ministerio' },
      { label: 'Organización',   href: '/ministerio/organizacion' },
      { label: 'Secretarías',    href: '/ministerio/secretarias' },
      { label: 'Agenda',         href: '/ministerio/agenda' },
      { label: 'Noticias',       href: '/ministerio/noticias' },
    ]
  },
  { label: 'Comercio', href: '/comercio',
    sub: [
      { label: 'Política Comercial', href: '/comercio' },
      { label: 'Exportaciones',      href: '/comercio/exportaciones' },
      { label: 'Inversiones',        href: '/comercio/inversiones' },
      { label: 'Acuerdos',           href: '/comercio/acuerdos' },
    ]
  },
  { label: 'Empleo', href: '/empleo',
    sub: [
      { label: 'Política de Empleo', href: '/empleo' },
      { label: 'Estadísticas',       href: '/empleo/estadisticas' },
      { label: 'Políticas Activas',  href: '/empleo/politicas' },
      { label: 'Formación',          href: '/empleo/formacion' },
    ]
  },
  { label: 'BOE',  href: '/boe' },
  { label: 'LPB',  href: '/sede' },
];

export default function Header() {
  const [location] = useLocation();

  return (
    <header>
      <div className="site-header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0.5rem 1.25rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="/logo.png" alt="Escudo del Reino del Pan" className="logo-img" />
          </Link>
          <div style={{ flex: 1 }} />
          <nav style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
            {NAV.map((item) => (
              <div key={item.href} style={{ position: 'relative' }} className="nav-group">
                <Link
                  href={item.href}
                  className={'nav-link' + (location.startsWith(item.href) ? ' active' : '')}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}