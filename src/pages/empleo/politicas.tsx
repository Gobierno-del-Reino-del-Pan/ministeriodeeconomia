import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política de Empleo', href: '/empleo' },
  { label: 'Estadísticas', href: '/empleo/estadisticas' },
  { label: 'Políticas Activas', href: '/empleo/politicas' },
  { label: 'Ofertas de empleo', href: '/empleo/formacion/empleos' }, // <-- NUEVO
];

const PLANES = [
  { titulo: 'Plan Nacional de Empleo Juvenil 2026', desc: 'Incentivos a la contratación indefinida de menores de 30 años: bonificaciones en cuotas a la Seguridad Social y desgravaciones fiscales.', estado: 'Activo' },
  { titulo: 'Programa de Reinserción Laboral', desc: 'Apoyo a desempleados de larga duración mediante itinerarios personalizados de orientación, formación y prácticas en empresa.', estado: 'Activo' },
  { titulo: 'Plan de Empleo para Personas con Discapacidad', desc: 'Medidas específicas para favorecer la contratación y la adaptación de puestos de trabajo para personas con discapacidad reconocida.', estado: 'Activo' },
  { titulo: 'Incentivos a la Conciliación Familiar', desc: 'Ayudas a empresas que implanten medidas de conciliación, teletrabajo o reducción de jornada por cuidado de dependientes.', estado: 'Convocatoria próxima' },
];

export default function Politicas() {
  return (
    <PageLayout
      crumbs={[{ label: 'Empleo', href: '/empleo' }, { label: 'Políticas Activas' }]}
      heroTag="Secretaría de Estado de Empleo y Economía Social"
      heroTitle="Políticas Activas de Empleo"
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="Empleo" items={SIDE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {PLANES.map((p, i) => (
              <div key={i} className="card card-featured">
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <span className={'tag ' + (p.estado === 'Activo' ? 'tag-primary' : 'tag-gold')}>{p.estado}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>{p.titulo}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}