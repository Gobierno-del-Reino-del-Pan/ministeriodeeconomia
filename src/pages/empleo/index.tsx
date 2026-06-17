import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';
import { Link } from 'wouter';

const SIDE = [
  { label: 'Política de Empleo', href: '/empleo' },
  { label: 'Estadísticas', href: '/empleo/estadisticas' },
  { label: 'Políticas Activas', href: '/empleo/politicas' },
  { label: 'Ofertas de empleo', href: '/empleo/formacion/empleos' },
];

export default function EmpleoIndex() {
  return (
    <PageLayout
      crumbs={[{ label: 'Empleo' }]}
      heroTag="Secretaría de Estado de Empleo y Economía Social"
      heroTitle="Política de Empleo"
      heroSubtitle="El Ministerio garantiza el derecho al trabajo de calidad de todos los ciudadanos del Reino del Pan."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Empleo" items={SIDE} />
          <div>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '2rem' }}>
              La política de empleo del Reino del Pan se orienta a la creación de empleo estable y de calidad, la reducción del desempleo estructural y la formación continua de los trabajadores. El Servicio Paniense de Empleo (SPE) es el organismo encargado de gestionar las políticas activas de empleo.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {SIDE.slice(1).map((s) => (
                <Link key={s.href} href={s.href}>
                  <div className="card card-featured">
                    <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1rem', marginBottom: '0.3rem' }}>{s.label}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>Acceder →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}