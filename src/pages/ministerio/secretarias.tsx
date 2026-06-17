import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'El Ministerio', href: '/ministerio' },
  { label: 'Organización', href: '/ministerio/organizacion' },
  { label: 'Secretarías de Estado', href: '/ministerio/secretarias' },
  { label: 'Agenda institucional', href: '/ministerio/agenda' },
  { label: 'Noticias', href: '/ministerio/noticias' },
];

const SECS = [
  {
    titulo: 'Secretaría de Estado de Economía y Apoyo a la Empresa',
    desc: 'Coordina la política económica general, la previsión macroeconómica y las medidas de apoyo al tejido empresarial paniense.',
    competencias: ['Política presupuestaria y fiscal', 'Registro Mercantil Central', 'Estadística económica oficial', 'Apoyo a la PYME'],
  },
  {
    titulo: 'Secretaría de Estado de Comercio',
    desc: 'Dirige la política de comercio exterior e interior, la promoción de exportaciones y las relaciones comerciales internacionales.',
    competencias: ['Aranceles e inspección comercial', 'Acuerdos de libre comercio', 'Ferias y promoción exterior', 'Defensa de la competencia'],
  },
  {
    titulo: 'Secretaría de Estado de Empleo y Economía Social',
    desc: 'Gestiona la política de empleo, la regulación laboral, la formación profesional para el empleo y la economía social y cooperativa.',
    competencias: ['Servicio Paniense de Empleo', 'Relaciones laborales y convenios', 'Formación profesional para el empleo', 'Cooperativas y economía social'],
  },
];

export default function Secretarias() {
  return (
    <PageLayout
      crumbs={[{ label: 'El Ministerio', href: '/ministerio' }, { label: 'Secretarías de Estado' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Secretarías de Estado"
      heroSubtitle="Los órganos superiores del Ministerio responsables de la dirección y coordinación de cada área de actuación."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="El Ministerio" items={SIDE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {SECS.map((s, i) => (
              <div key={i} className="card">
                <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>{s.titulo}</h2>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{s.desc}</p>
                <h4 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: '0.6rem' }}>Competencias</h4>
                <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {s.competencias.map((c, j) => (
                    <li key={j} style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>{c}</li>
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
