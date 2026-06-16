import PageLayout from '../../components/PageLayout';

export default function AvisoLegal() {
  return (
    <PageLayout
      crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Aviso legal' }]}
      heroTag="Portal institucional"
      heroTitle="Aviso Legal"
      heroSubtitle="Información legal sobre el uso del portal del Ministerio de Economía, Comercio y Empresa."
    >
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Datos identificativos</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1rem' }}>
              En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del titular de este sitio web:
            </p>
            <ul style={{ color: 'var(--foreground)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
              <li><strong>Titular:</strong> Ministerio de Economía, Comercio y Empresa del Reino del Pan</li>
              <li><strong>Domicilio:</strong> Plaza de la Constitución, 1, 28001 Pan City</li>
              <li><strong>NIF:</strong> S-1234567-H</li>
              <li><strong>Email:</strong> info@economia.gob.pan</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Condiciones de uso</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1rem' }}>
              El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación plena de todas las cláusulas y condiciones de uso incluidas en este aviso legal.
            </p>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
              El usuario se compromete a utilizar el sitio web de forma diligente y correcta, absteniéndose de realizar cualquier acto que pudiera dañar la imagen, los intereses o los derechos del Ministerio de Economía, Comercio y Empresa o de terceros.
            </p>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Propiedad intelectual</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
              Todos los contenidos de este sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual del Ministerio de Economía, Comercio y Empresa o de terceros sin que puedan atribuirse al usuario más derechos que los contemplados en la normativa de propiedad intelectual aplicable.
            </p>
          </div>

          <div className="card">
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Exclusión de garantías y responsabilidad</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
              El Ministerio de Economía, Comercio y Empresa no asume responsabilidad alguna por los daños y perjuicios de toda naturaleza que puedan deberse a la utilización de los servicios e información que contiene el sitio web, así como a la presencia de virus o elementos lesivos en los contenidos.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
