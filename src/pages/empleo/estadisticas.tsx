import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política de Empleo', href: '/empleo' },
  { label: 'Estadísticas', href: '/empleo/estadisticas' },
  { label: 'Políticas Activas', href: '/empleo/politicas' },
  { label: 'Ofertas de empleo', href: '/empleo/formacion/empleos' }, // <-- NUEVO
];

const DATOS = [
  { num: '3,2 %',  label: 'Tasa de desempleo',          sub: '2.º trimestre 2026' },
  { num: '68,4 %', label: 'Tasa de actividad',           sub: 'Población de 16 a 64 años' },
  { num: '12.340', label: 'Contratos registrados',        sub: 'Mayo 2026' },
  { num: '1.200',  label: 'Empresas inscritas',          sub: 'Registro Mercantil' },
  { num: '4,1 %',  label: 'Crecimiento del PIB',         sub: 'Previsión 2026' },
  { num: '2,1 %',  label: 'Inflación IPC',               sub: 'Mayo 2026' },
];

export default function Estadisticas() {
  return (
    <PageLayout
      crumbs={[{ label: 'Empleo', href: '/empleo' }, { label: 'Estadísticas' }]}
      heroTag="Secretaría de Estado de Empleo y Economía Social"
      heroTitle="Estadísticas del mercado de trabajo"
      heroSubtitle="Datos oficiales elaborados por el Instituto Nacional de Estadística Paniense (INEP)."
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="Empleo" items={SIDE} />
          <div>
            <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
              <span>📊</span>
              <span>Los datos se actualizan trimestralmente. Última actualización: <strong>11 de junio de 2026</strong>.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '1rem' }}>
              {DATOS.map((d, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-number">{d.num}</div>
                  <div className="stat-label">{d.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>{d.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}