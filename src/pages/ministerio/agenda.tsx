import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'El Ministerio', href: '/ministerio' },
  { label: 'Organización', href: '/ministerio/organizacion' },
  { label: 'Secretarías de Estado', href: '/ministerio/secretarias' },
  { label: 'Agenda institucional', href: '/ministerio/agenda' },
  { label: 'Noticias', href: '/ministerio/noticias' },
];

const EVENTOS = [
  { fecha: '18 jun. 2026', titulo: 'Reunión del Consejo Económico y Social', lugar: 'Palacio Ministerial, Sala de Juntas A', hora: '10:00 h' },
  { fecha: '20 jun. 2026', titulo: 'Firma del Acuerdo Marco de Cooperación Comercial con la Alianza del Norte', lugar: 'Sede del Ministerio', hora: '12:00 h' },
  { fecha: '25 jun. 2026', titulo: 'Jornadas sobre Economía Digital y Empleo', lugar: 'Auditorio Nacional del Pan', hora: '09:30 h' },
  { fecha: '2 jul. 2026', titulo: 'Presentación del Informe de Coyuntura Económica — 2.º Trimestre 2026', lugar: 'Sala de Prensa Ministerial', hora: '11:00 h' },
];

export default function AgendaPage() {
  return (
    <PageLayout
      crumbs={[{ label: 'El Ministerio', href: '/ministerio' }, { label: 'Agenda' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Agenda institucional"
      heroSubtitle="Actos, comparecencias y eventos oficiales del Ministerio."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="El Ministerio" items={SIDE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {EVENTOS.map((e, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', textAlign: 'center', minWidth: '80px', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--display-font)', fontSize: '1.3rem', lineHeight: 1 }}>{e.fecha.split(' ')[0]}</div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>{e.fecha.split(' ')[1]} {e.fecha.split(' ')[2]}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1rem', marginBottom: '0.3rem' }}>{e.titulo}</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>🕐 {e.hora} &nbsp;·&nbsp; 📍 {e.lugar}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
