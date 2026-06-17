import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política de Empleo', href: '/empleo' },
  { label: 'Estadísticas', href: '/empleo/estadisticas' },
  { label: 'Políticas Activas', href: '/empleo/politicas' },
  { label: 'Ofertas de empleo', href: '/empleo/formacion/empleos' },
];

const PLANES = [
  {
    titulo: 'Créditos ICORP (Orden ECE/118/2026)',
    desc: 'Línea de financiación empresarial para empresas de nueva creación. Finalidad: impulsar el emprendimiento y la innovación, favorecer la creación de empleo, facilitar la implantación de nuevas actividades económicas e incrementar la competitividad del tejido empresarial paniense. El ICORP desarrollará las bases reguladoras en un plazo máximo de quince días.',
    estado: 'Activo',
  },
  {
    titulo: 'Bono Masa Joven (BMJ)',
    desc: 'Ayuda de 15.200 panedas para ciudadanos jóvenes del Reino del Pan (18 años o más) destinada a fomentar su participación en la vida cultural, social y económica del Reino. Requisitos: DPI activo, tener 18 años o más y no haber solicitado el bono anteriormente.',
    estado: 'Activo',
  },
];

export default function Politicas() {
  return (
    <PageLayout
      crumbs={[{ label: 'Empleo', href: '/empleo' }, { label: 'Políticas Activas' }]}
      heroTag="Secretaría de Estado de Empleo y Economía Social"
      heroTitle="Políticas Activas de Empleo"
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Empleo" items={SIDE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {PLANES.map((p, i) => (
              <div key={i} className="card card-featured">
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <span className="tag tag-primary">{p.estado}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  {p.titulo}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.7 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}