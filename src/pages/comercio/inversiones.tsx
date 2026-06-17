import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
  { label: 'PIB', href: '/comercio/indicadores' },
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
        <div className="container subpage-grid">
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
              <span>📢</span>
              <span>El marco regulatorio para inversiones extranjeras se encuentra en proceso de actualización. Próximamente se publicará el nuevo reglamento.</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}