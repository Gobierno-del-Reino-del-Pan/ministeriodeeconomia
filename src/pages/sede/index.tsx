import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';
import { Link } from 'wouter';

const SIDE = [
  { label: 'LPB',             href: '/sede' },
  { label: 'Trámites',        href: '/sede/tramites' },
  { label: 'Notificaciones',  href: '/sede/notificaciones' },
];

const SERVICIOS = [
  { icon: '📋', label: 'Trámites y solicitudes',      href: '/sede/tramites',       desc: 'Registro de documentos, solicitudes de licencias y gestiones administrativas.' },
  { icon: '🔔', label: 'Notificaciones electrónicas', href: '/sede/notificaciones', desc: 'Consulte las notificaciones y comunicaciones dirigidas a su persona o empresa.' },
  { icon: '📰', label: 'Boletín Oficial',             href: '/boe',                 desc: 'Acceso a las disposiciones publicadas en el BOE.' },
];

export default function SedeIndex() {
  return (
    <PageLayout
      crumbs={[{ label: 'LPB' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="LPB — Laboral Panien Bank"
      heroSubtitle="Punto de acceso a los servicios y trámites financieros y laborales del Ministerio."
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="LPB" items={SIDE} />
          <div>
            <div className="alert alert-warning" style={{ marginBottom: '2rem' }}>
              <span>⚠️</span>
              <span>El <strong>Laboral Panien Bank</strong> está en fase de despliegue progresivo. Algunos servicios estarán disponibles próximamente.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {SERVICIOS.map((s) => (
                <Link key={s.href} href={s.href}>
                  <div className="card card-featured" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%' }}>
                    <div style={{ fontSize: '1.8rem' }}>{s.icon}</div>
                    <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1rem' }}>{s.label}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', margin: 0, flex: 1 }}>{s.desc}</p>
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