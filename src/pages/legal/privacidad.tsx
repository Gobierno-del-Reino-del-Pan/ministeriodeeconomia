import PageLayout from '../../components/PageLayout';

export default function Privacidad() {
  return (
    <PageLayout
      crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Política de privacidad' }]}
      heroTag="Portal institucional"
      heroTitle="Politica de Privacidad"
      heroSubtitle="Protección de datos personales conforme a la normativa vigente."
    >
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Responsable del tratamiento</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1rem' }}>
              De acuerdo con lo establecido en el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa que el responsable del tratamiento de los datos personales recogidos en este portal es:
            </p>
            <ul style={{ color: 'var(--foreground)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
              <li><strong>Entidad:</strong> Ministerio de Economía, Comercio y Empresa</li>
              <li><strong>Domicilio:</strong> Plaza de la Constitución, 1, 28001 Pan City</li>
              <li><strong>Delegado de Protección de Datos:</strong> dpd@economia.gob.pan</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Finalidades del tratamiento</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Los datos personales recogidos serán tratados para las siguientes finalidades:
            </p>
            <ul style={{ color: 'var(--foreground)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
              <li>Gestión de trámites y solicitudes presentadas por los ciudadanos</li>
              <li>Atención al ciudadano y respuesta a consultas</li>
              <li>Envío de notificaciones electrónicas</li>
              <li>Cumplimiento de obligaciones legales</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Derechos de los ciudadanos</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Toda persona tiene derecho a obtener confirmación sobre el tratamiento de sus datos personales y a acceder a ellos, así como a solicitar su rectificación, supresión, limitación del tratamiento, portabilidad y oposición, dirigiendo su solicitud a la dirección del Delegado de Protección de Datos.
            </p>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
              Asimismo, tiene derecho a presentar una reclamación ante la Autoridad de Control competente (Agencia de Protección de Datos del Reino del Pan).
            </p>
          </div>

          <div className="card">
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Cookies</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
              Este sitio web utiliza cookies propias y de terceros estrictamente necesarias para la prestación del servicio. Puede obtener más información sobre el uso de cookies y cómo desactivarlas en la configuración de su navegador.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
