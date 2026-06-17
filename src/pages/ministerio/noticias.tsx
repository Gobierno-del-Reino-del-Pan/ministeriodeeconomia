import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';
import { Link } from 'wouter';

const SIDE = [
  { label: 'El Ministerio', href: '/ministerio' },
  { label: 'Organización', href: '/ministerio/organizacion' },
  { label: 'Secretarías de Estado', href: '/ministerio/secretarias' },
  { label: 'Agenda institucional', href: '/ministerio/agenda' },
  { label: 'Noticias', href: '/ministerio/noticias' },
];

const NOTICIAS = [
  { tag: 'Comercio', fecha: '10 jun. 2026', titulo: 'Programa de Apoyo a la Exportación 2026', resumen: 'El Ministerio pone en marcha una línea de financiación de 12 millones de PAN para empresas que inicien actividad exportadora este ejercicio.' },
  { tag: 'Empleo', fecha: '5 jun. 2026', titulo: 'Plan Nacional de Empleo Juvenil', resumen: 'Nuevas medidas para reducir el desempleo entre menores de 30 años, con incentivos fiscales a empresas contratantes y programas de formación dual.' },
  { tag: 'Normativa', fecha: '28 may. 2026', titulo: 'Reglamento de Comercio Interior aprobado', resumen: 'El Consejo de Ministros aprueba el primer Reglamento de Comercio Interior del Reino del Pan, publicado en el BOE del día 28.' },
  { tag: 'Economía', fecha: '20 may. 2026', titulo: 'La inflación se modera al 2,1% en mayo', resumen: 'El Índice de Precios al Consumo del Reino del Pan registra en mayo una tasa interanual del 2,1%, la más baja desde la fundación del Estado.' },
];

export default function NoticiasPage() {
  return (
    <PageLayout
      crumbs={[{ label: 'El Ministerio', href: '/ministerio' }, { label: 'Noticias' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Sala de prensa"
      heroSubtitle="Comunicados, notas de prensa y noticias institucionales del Ministerio."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="El Ministerio" items={SIDE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {NOTICIAS.map((n, i) => (
              <article key={i} className="card card-featured">
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span className="tag tag-primary">{n.tag}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>{n.fecha}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{n.titulo}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.7, margin: '0 0 0.75rem' }}>{n.resumen}</p>
                <a href="#" style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>Leer comunicado completo →</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
