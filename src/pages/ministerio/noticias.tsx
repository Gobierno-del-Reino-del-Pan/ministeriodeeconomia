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
  {
    tag: 'Hacienda',
    fecha: '17 jun. 2026',
    titulo: 'Derogada la Tasa IRPF/26 y los mecanismos de recaudación de emergencia',
    resumen: 'El Real Decreto-Ley 14/2026 elimina el gravamen extraordinario del 7% y el mecanismo adicional del 0,025%, reforzando la capacidad económica de los ciudadanos del Reino del Pan.',
  },
  {
    tag: 'Economía',
    fecha: '16 jun. 2026',
    titulo: 'Creada la línea de financiación "Créditos ICORP" para empresas de nueva creación',
    resumen: 'La Orden ECE/118/2026 aprueba una línea de financiación inspirada en las líneas ICO para impulsar el emprendimiento y la competitividad empresarial. El ICORP publicará las bases reguladoras en los próximos quince días.',
  },
  {
    tag: 'Empleo',
    fecha: '15 jun. 2026',
    titulo: 'Lanzado el Bono Masa Joven (BMJ) con una ayuda de 15.200 panedas',
    resumen: 'Los ciudadanos del Reino del Pan de 18 años o más pueden solicitar esta ayuda para fomentar su participación en la vida cultural, social y económica. El trámite ya está disponible en el LPB.',
  },
  {
    tag: 'Economía',
    fecha: '12 jun. 2026',
    titulo: 'El PIB del Reino del Pan crece un 3,2% interanual en el segundo trimestre',
    resumen: 'Según los datos publicados por el INEP, la economía paniense mantiene un ritmo de crecimiento sólido, impulsado por el consumo interno y el aumento de la inversión.',
  },
  {
    tag: 'Empleo',
    fecha: '5 jun. 2026',
    titulo: 'Plan Nacional de Empleo Juvenil 2026 – Nuevas medidas activas',
    resumen: 'El Ministerio presenta un paquete de incentivos a la contratación indefinida de menores de 30 años, con bonificaciones en cuotas y formación dual en empresas.',
  },
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
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.7, margin: 0 }}>
                  {n.resumen}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}