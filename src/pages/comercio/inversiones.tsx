import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
];

export default function Inversiones() {
  return (
    <PageLayout
      crumbs={[{ label: 'Comercio', href: '/comercio' }, { label: 'Inversiones Extranjeras' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Inversiones Extranjeras"
      heroSubtitle="El Reino del Pan ofrece un marco jurídico estable, transparente y atractivo para la inversión exterior."
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              El Reglamento de Inversiones Extranjeras, aprobado por Real Decreto en junio de 2026, establece el régimen de autorización previa para las inversiones en sectores estratégicos y el procedimiento de notificación para las restantes.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                { label: 'Inversión acumulada', valor: '€ 2,3 M', sub: 'Comprometida en 2026' },
                { label: 'Proyectos activos', valor: '14', sub: 'En distintos sectores' },
                { label: 'Países inversores', valor: '9', sub: 'Con relación activa' },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-number">{s.valor}</div>
                  <div className="stat-label">{s.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
