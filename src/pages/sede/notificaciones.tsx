import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'LPB',            href: '/sede' },
  { label: 'Trámites',       href: '/sede/tramites' },
  { label: 'Notificaciones', href: '/sede/notificaciones' },
];

export default function Notificaciones() {
  return (
    <PageLayout
      crumbs={[{ label: 'LPB', href: '/sede' }, { label: 'Notificaciones' }]}
      heroTag="LPB — Laboral Panien Bank"
      heroTitle="Notificaciones electrónicas"
      heroSubtitle="Consulte aquí las notificaciones y comunicaciones que le ha remitido el Ministerio."
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="LPB" items={SIDE} />
          <div>
            <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
              <span>🔒</span>
              <span>Para acceder a sus notificaciones personales es necesario identificarse con su <strong>Documento de Identidad Paniense (DIP)</strong> o mediante certificado digital reconocido.</span>
            </div>
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted-foreground)', border: '1px dashed var(--border)', borderRadius: 'var(--radius)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔔</div>
              <p style={{ margin: 0, fontWeight: 600 }}>Acceso con identificación pendiente</p>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.83rem' }}>El sistema de identificación digital se desplegará próximamente.</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}