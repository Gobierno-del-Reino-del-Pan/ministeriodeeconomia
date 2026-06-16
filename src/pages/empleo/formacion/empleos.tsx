import PageLayout from '../../../components/PageLayout';
import SideNav from '../../../components/SideNav';

// Menú lateral actualizado: el enlace a Ofertas apunta a la nueva ruta
const SIDE = [
  { label: 'Política de Empleo', href: '/empleo' },
  { label: 'Estadísticas', href: '/empleo/estadisticas' },
  { label: 'Políticas Activas', href: '/empleo/politicas' },
  { label: 'Ofertas de empleo', href: '/empleo/ofertas' }, // ← ruta limpia
];

const TRABAJOS = [
  {
    cargo: 'Policía Panacional',
    funcion: 'Asegurar que los usuarios cumplan la Constitución del Reino y capturar a sinvergüenzas.',
    salario: null,
  },
  {
    cargo: 'Guardia Panadera',
    funcion: 'Asegurar que los usuarios cumplan la Constitución del Reino y poner multas a diestro.',
    salario: null,
  },
  {
    cargo: 'Militar',
    funcion: 'Proteger a los ciudadanos en periodos de guerra o de incidencias climáticas graves.',
    salario: null,
  },
  {
    cargo: 'Médico',
    funcion: 'Asegurar que se mantenga el buen estado de salud de los ciudadanos.',
    salario: '3.7K',
  },
  {
    cargo: 'Profesor',
    funcion: 'Enseñar a los niños, adolescentes y adultos todo lo que sea necesario.',
    salario: null,
  },
  {
    cargo: 'Informático',
    funcion: 'Programar, vigilar posibles vulnerabilidades y todo lo necesario para proteger.',
    salario: null,
  },
  {
    cargo: 'Futbolista',
    funcion: 'Ganar partidos (con la necesidad de formar un equipo).',
    salario: '9.1K',
  },
  {
    cargo: 'Político',
    funcion: 'Buscar el bienestar de los ciudadanos (y, opcionalmente, el propio). Fundar, construir, hacer.',
    salario: '5.2K',
  },
  {
    cargo: 'Veterinario',
    funcion: 'Cuidar de la salud de los animales domésticos y silvestres del Reino, así como controlar las plagas en las regiones cerealistas.',
    salario: null,
  },
  {
    cargo: 'Reportero de la TVP',
    funcion: 'Difundir información veraz y contrastada sobre la actualidad del Reino, cubrir eventos oficiales y entrevistar a figuras políticas y sociales. Depende de la Televisión del Pan (TVP).',
    salario: null,
  },
  {
    cargo: 'Entrenador Pokémon',
    funcion: 'Representar al Reino en ligas y competiciones internacionales de Pokémon. Capturar, entrenar y criar criaturas para la defensa nacional y el deporte.',
    salario: null,
  },
];

export default function Ofertas() {
  return (
    <PageLayout
      crumbs={[
        { label: 'Empleo', href: '/empleo' },
        { label: 'Ofertas de empleo' }, // ← sin "Formación Profesional"
      ]}
      heroTag="Secretaría de Estado de Empleo"
      heroTitle="Ofertas de empleo del Reino"
      heroSubtitle="Relación de puestos de trabajo disponibles en la administración y servicios públicos."
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="Empleo" items={SIDE} />
          <div>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
              Todas estas reformas han sido lideradas e implementadas por <strong>Martini</strong>, quien se ha convertido en una figura clave del proceso de reconstrucción.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Cargo</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Función principal</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Salario</th>
                  </tr>
                </thead>
                <tbody>
                  {TRABAJOS.map((trabajo, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{trabajo.cargo}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>{trabajo.funcion}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        {trabajo.salario ? (
                          <span style={{ fontWeight: 700, color: 'var(--gold)' }}>{trabajo.salario} 🪙</span>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}