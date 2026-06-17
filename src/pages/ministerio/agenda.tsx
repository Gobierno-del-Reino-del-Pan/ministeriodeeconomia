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
  {
    fecha: '17 jun. 2026',
    titulo: 'Publicación del Real Decreto-Ley 14/2026 de derogación de la Tasa IRPF/26',
    lugar: 'BOE del Reino del Pan',
    hora: '00:00 h',
  },
  {
    fecha: '16 jun. 2026',
    titulo: 'Aprobación de la Orden ECE/118/2026 de creación de los "Créditos ICORP"',
    lugar: 'Sede del Ministerio',
    hora: '12:00 h',
  },
  {
    fecha: '15 jun. 2026',
    titulo: 'Lanzamiento oficial del Bono Masa Joven (BMJ) y apertura del plazo de solicitudes en el LPB',
    lugar: 'Palacio Ministerial, Sala de Prensa',
    hora: '10:30 h',
  },
  {
    fecha: '12 jun. 2026',
    titulo: 'Presentación del Informe de Coyuntura Económica — 2.º Trimestre 2026',
    lugar: 'Auditorio Nacional del Pan',
    hora: '11:00 h',
  },
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