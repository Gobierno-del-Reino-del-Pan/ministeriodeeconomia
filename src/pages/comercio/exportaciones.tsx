import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
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
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.4rem', marginBottom: '1rem' }}>Programa de Apoyo a la Exportación 2026</h2>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              El Ministerio pone a disposición de las empresas panienses una línea de financiación preferencial de <strong>12 millones de PAN</strong> para el ejercicio 2026, destinada a sufragar los costes de apertura de nuevos mercados exteriores, participación en ferias internacionales y contratación de personal especializado en comercio exterior.
            </p>
            <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
              <span>⚠️</span>
              <span>El plazo de solicitud está abierto hasta el <strong>31 de agosto de 2026</strong>. Las solicitudes deben presentarse a través de la Sede Electrónica.</span>
            </div>
            <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Beneficiarios</h3>
            <ul style={{ margin: '0 0 1.5rem', padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Empresas con domicilio fiscal en el Reino del Pan</li>
              <li style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Con menos de 250 trabajadores (PYME)</li>
              <li style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Sin exportaciones previas o con exportaciones inferiores al 10% de su facturación</li>
            </ul>
            <a href="/sede/tramites" className="btn btn-primary">Solicitar en Sede Electrónica</a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
