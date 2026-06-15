import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'El Ministerio', href: '/ministerio' },
  { label: 'Organización', href: '/ministerio/organizacion' },
  { label: 'Secretarías de Estado', href: '/ministerio/secretarias' },
  { label: 'Agenda institucional', href: '/ministerio/agenda' },
  { label: 'Noticias', href: '/ministerio/noticias' },
];

const ORGANIGRAMA = [
  {
    nivel: 'Ministro/a',
    titulo: 'Ministro de Economía, Comercio y Empresa',
    cargo: 'Miembro del Consejo de Ministros',
  },
  {
    nivel: 'Secretaría de Estado',
    titulo: 'Secretaría de Estado de Economía y Apoyo a la Empresa',
    cargo: 'Órgano Superior',
  },
  {
    nivel: 'Secretaría de Estado',
    titulo: 'Secretaría de Estado de Comercio',
    cargo: 'Órgano Superior',
  },
  {
    nivel: 'Secretaría de Estado',
    titulo: 'Secretaría de Estado de Empleo y Economía Social',
    cargo: 'Órgano Superior',
  },
  {
    nivel: 'Subsecretaría',
    titulo: 'Subsecretaría de Economía, Comercio y Empresa',
    cargo: 'Órgano Directivo',
  },
];

export default function Organizacion() {
  return (
    <PageLayout
      crumbs={[{ label: 'El Ministerio', href: '/ministerio' }, { label: 'Organización' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Organización"
      heroSubtitle="Estructura orgánica del Ministerio, de conformidad con el Real Decreto de Organización del Gobierno del Reino del Pan."
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="El Ministerio" items={SIDE} />
          <div>
            <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Estructura orgánica</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {ORGANIGRAMA.map((o, i) => (
                <div key={i} className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '3px', background: 'var(--primary)', borderRadius: '2px', alignSelf: 'stretch', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.25rem' }}>{o.nivel}</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--foreground)' }}>{o.titulo}</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', marginTop: '0.15rem' }}>{o.cargo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
