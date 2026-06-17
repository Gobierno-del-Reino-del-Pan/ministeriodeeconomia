import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
  { label: 'PIB', href: '/comercio/indicadores' },
];

export default function Acuerdos() {
  return (
    <PageLayout
      crumbs={[{ label: 'Comercio', href: '/comercio' }, { label: 'Acuerdos Comerciales' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Acuerdos Comerciales"
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
              <span>📢</span>
              <span>No hay acuerdos comerciales firmados en este momento. Esta sección se actualizará cuando se formalicen nuevos tratados.</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}