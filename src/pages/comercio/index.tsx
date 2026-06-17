import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';
import { Link } from 'wouter';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
  { label: 'PIB', href: '/comercio/indicadores' },
];

export default function ComercioIndex() {
  return (
    <PageLayout
      crumbs={[{ label: 'Comercio' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Política Comercial"
      heroSubtitle="El Ministerio impulsa un comercio sostenible, competitivo e integrado en los mercados internacionales."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              La política comercial del Reino del Pan se orienta a la apertura de mercados, la defensa de la competencia leal y el impulso a las empresas panienses en el exterior.
            </p>
            <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
              <span>📢</span>
              <span>Esta sección se encuentra en fase de desarrollo. Próximamente se publicará información detallada sobre los programas y acuerdos comerciales del Reino.</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}