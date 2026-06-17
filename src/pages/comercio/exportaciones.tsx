import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
  { label: 'PIB', href: '/comercio/indicadores' },
];

export default function Exportaciones() {
  return (
    <PageLayout
      crumbs={[{ label: 'Comercio', href: '/comercio' }, { label: 'Exportaciones' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Exportaciones"
      heroSubtitle="Instrumentos y programas del Gobierno para apoyar la internacionalización de las empresas del Reino del Pan."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
              <span>📢</span>
              <span>La información sobre programas de apoyo a la exportación estará disponible próximamente. Consulte el <strong>LPB</strong> para futuras actualizaciones.</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}