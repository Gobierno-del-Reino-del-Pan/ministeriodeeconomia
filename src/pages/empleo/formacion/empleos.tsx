import PageLayout from '../../../components/PageLayout';
import SideNav from '../../../components/SideNav';

const SIDE = [
  { label: 'Política de Empleo', href: '/empleo' },
  { label: 'Estadísticas', href: '/empleo/estadisticas' },
  { label: 'Políticas Activas', href: '/empleo/politicas' },
  { label: 'Ofertas de empleo', href: '/empleo/formacion/empleos' },
];

function formatSalary(salary: number | string | null): string {
  if (salary === null) return '—';
  if (typeof salary === 'string') return salary;
  if (typeof salary === 'number') {
    if (salary >= 1000) {
      const k = salary / 1000;
      if (k % 1 === 0) {
        return k.toFixed(0) + 'K';
      } else {
        return k.toFixed(1).replace('.', ',') + 'K';
      }
    }
    return salary.toString();
  }
  return '—';
}

const TRABAJOS = [
  {
    cargo: 'Policía Panacional',
    funcion: 'Asegurar que los usuarios cumplan la Constitución del Reino y capturar a sinvergüenzas.',
    salario: 4500,
  },
  {
    cargo: 'Guardia Panadera',
    funcion: 'Asegurar que los usuarios cumplan la Constitución del Reino y poner multas a diestro.',
    salario: 4000,
  },
  {
    cargo: 'Militar',
    funcion: 'Proteger a los ciudadanos en periodos de guerra o de incidencias climáticas graves.',
    salario: 5400,
  },
  {
    cargo: 'Médico',
    funcion: 'Asegurar que se mantenga el buen estado de salud de los ciudadanos.',
    salario: 4700,
  },
  {
    cargo: 'Profesor',
    funcion: 'Enseñar a los niños, adolescentes y adultos todo lo que sea necesario.',
    salario: 3800,
  },
  {
    cargo: 'Informático',
    funcion: 'Programar, vigilar posibles vulnerabilidades y todo lo necesario para proteger.',
    salario: 3900,
  },
  {
    cargo: 'Futbolista',
    funcion: 'Ganar partidos (con la necesidad de formar un equipo).',
    salario: 8100,
  },
  {
    cargo: 'Político',
    funcion: 'Buscar el bienestar de los ciudadanos (y, opcionalmente, el propio). Fundar, construir, hacer.',
    salario: 4800,
  },
  {
    cargo: 'Veterinario',
    funcion: 'Cuidar de la salud de los animales domésticos y silvestres del Reino, así como controlar las plagas en las regiones cerealistas.',
    salario: 2600,
  },
  {
    cargo: 'Reportero de la TVP',
    funcion: 'Difundir información veraz y contrastada sobre la actualidad del Reino, cubrir eventos oficiales y entrevistar a figuras políticas y sociales. Depende de la Televisión del Pan (TVP).',
    salario: 2900,
  },
  {
    cargo: 'Entrenador Pokémon',
    funcion: 'Representar al Reino en ligas y competiciones internacionales de Pokémon. Capturar, entrenar y criar criaturas para la defensa nacional y el deporte.',
    salario: 3400,
  },
];

export default function Ofertas() {
  return (
    <PageLayout
      crumbs={[
        { label: 'Empleo', href: '/empleo' },
        { label: 'Ofertas de empleo' },
      ]}
      heroTag="Secretaría de Estado de Empleo"
      heroTitle="Ofertas de empleo del Reino"
      heroSubtitle="Relación de puestos de trabajo disponibles en la administración y servicios públicos."
    >
      <div className="section">
        <div className="container subpage-grid">
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
                          <span style={{ fontWeight: 700, color: 'var(--gold)' }}>
                            {formatSalary(trabajo.salario)} 🪙
                          </span>
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