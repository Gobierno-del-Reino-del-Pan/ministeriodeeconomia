import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';
import { Link } from 'wouter';

const SIDE = [
  { label: 'El Ministerio', href: '/ministerio' },
  { label: 'Organización', href: '/ministerio/organizacion' },
  { label: 'Secretarías de Estado', href: '/ministerio/secretarias' },
  { label: 'Agenda institucional', href: '/ministerio/agenda' },
  { label: 'Noticias', href: '/ministerio/noticias' },
];

export default function MinisterioIndex() {
  return (
    <PageLayout
      crumbs={[{ label: 'El Ministerio' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Quiénes somos"
      heroSubtitle="El Ministerio de Economía, Comercio y Empresa es el departamento del Gobierno del Reino del Pan responsable de la política económica, la regulación del comercio y el fomento del empleo."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="El Ministerio" items={SIDE} />

          <div>
            <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
              <span>📌</span>
              <span>El Ministerio desarrolla sus funciones con arreglo a la <strong>Ley Orgánica de Organización de la Administración del Reino del Pan</strong>.</span>
            </div>

            <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.5rem', marginBottom: '1rem' }}>Funciones y competencias</h2>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              El Ministerio de Economía, Comercio y Empresa ejerce las competencias del Gobierno en materia de política económica general, planificación y previsión económica, relaciones económicas internacionales, comercio interior y exterior, y regulación de las relaciones laborales y del empleo.
            </p>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Corresponde al Ministerio la elaboración y seguimiento de los presupuestos generales del Estado en colaboración con el resto de departamentos ministeriales, así como la supervisión de las entidades públicas empresariales bajo su tutela. En este marco, el Ministerio ha impulsado la derogación de la Tasa IRPF/26, la creación de la línea de financiación "Créditos ICORP" y el lanzamiento del Bono Masa Joven (BMJ).
            </p>

            <div className="divider" />

            <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.3rem', marginBottom: '1.25rem' }}>Órganos superiores</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { title: 'Secretaría de Estado de Economía, Comercio y Empresa', href: '/ministerio/secretarias' },
                { title: 'Secretaría de Estado de Hacienda', href: '/ministerio/secretarias' },
                { title: 'Secretaría de Estado de Empleo y Economía Social', href: '/ministerio/secretarias' },
              ].map((o) => (
                <Link key={o.href + o.title} href={o.href}>
                  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>Órgano Superior</span>
                    <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '0.95rem', color: 'var(--foreground)' }}>{o.title}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>Ver más →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}