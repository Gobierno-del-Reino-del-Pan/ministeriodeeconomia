import PageLayout from '../../components/PageLayout';
import { Link } from 'wouter';

const SITEMAP = {
  'Ministerio': [
    { label: 'Inicio - El Ministerio', href: '/ministerio' },
    { label: 'Organización', href: '/ministerio/organizacion' },
    { label: 'Secretarías', href: '/ministerio/secretarias' },
    { label: 'Agenda institucional', href: '/ministerio/agenda' },
    { label: 'Noticias', href: '/ministerio/noticias' },
  ],
  'Comercio Exterior': [
    { label: 'Política Comercial', href: '/comercio' },
    { label: 'Exportaciones', href: '/comercio/exportaciones' },
    { label: 'Inversiones', href: '/comercio/inversiones' },
    { label: 'Acuerdos comerciales', href: '/comercio/acuerdos' },
  ],
  'Empleo': [
    { label: 'Política de Empleo', href: '/empleo' },
    { label: 'Estadísticas laborales', href: '/empleo/estadisticas' },
    { label: 'Políticas activas de empleo', href: '/empleo/politicas' },
    { label: 'Formación profesional', href: '/empleo/formacion' },
  ],
  'LPB - Laboral Panien Bank': [
    { label: 'Acceso a LPB', href: '/lpb' },
    { label: 'Trámites y gestiones', href: '/lpb/tramites' },
    { label: 'Notificaciones electrónicas', href: '/lpb/notificaciones' },
  ],
  'Información legal': [
    { label: 'Accesibilidad', href: '/accesibilidad' },
    { label: 'Aviso legal', href: '/aviso-legal' },
    { label: 'Política de privacidad', href: '/privacidad' },
    { label: 'Mapa del portal', href: '/mapa-del-portal' },
  ],
};

export default function MapaDelPortal() {
  return (
    <PageLayout
      crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Mapa del portal' }]}
      heroTag="Portal institucional"
      heroTitle="Mapa del Portal"
      heroSubtitle="Estructura y navegación del sitio web del Ministerio de Economía, Comercio y Empresa."
    >
      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(SITEMAP).map(([section, links]) => (
              <div key={section} className="card">
                <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', borderBottom: '2px solid var(--gold)', paddingBottom: '0.5rem', color: 'var(--foreground)' }}>
                  {section}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {links.map((link) => (
                    <li key={link.href} style={{ marginBottom: '0.5rem' }}>
                      <Link href={link.href} style={{ color: 'var(--primary)', textDecoration: 'none', display: 'block', padding: '0.35rem 0', transition: 'color 180ms' }}>
                        <span style={{ marginRight: '0.5rem' }}>&#8594;</span> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
