import PageLayout from '../../../components/PageLayout';
import SideNav from '../../../components/SideNav';

const SIDE = [
  { label: 'Política de Empleo', href: '/empleo' },
  { label: 'Estadísticas', href: '/empleo/estadisticas' },
  { label: 'Políticas Activas', href: '/empleo/politicas' },
  { label: 'Formación Profesional', href: '/empleo/formacion' },
  { label: 'Ofertas de empleo', href: '/empleo/formacion/empleos' }, // <-- NUEVO
];

export default function Formacion() {
  return (
    <PageLayout
      crumbs={[{ label: 'Empleo', href: '/empleo' }, { label: 'Formación Profesional' }]}
      heroTag="Secretaría de Estado de Empleo"
      heroTitle="Formación Profesional para el Empleo"
      heroSubtitle="El sistema de formación para el empleo mejora la cualificación de los trabajadores y facilita su empleabilidad."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Empleo" items={SIDE} />
          <div>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              El subsistema de Formación Profesional para el Empleo articula la oferta formativa subvencionada dirigida a trabajadores ocupados y desempleados, con el objetivo de mejorar sus competencias y facilitar su acceso o permanencia en el mercado de trabajo.
            </p>
            <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
              <span>📚</span>
              <span>El catálogo de cursos para el segundo semestre de 2026 se publicará el <strong>1 de julio de 2026</strong> en el LPB.</span>
            </div>
            <a href="/empleo/formacion/empleos" className="btn btn-primary">Consultar oferta formativa</a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}