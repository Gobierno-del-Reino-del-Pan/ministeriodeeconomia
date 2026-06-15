import PageLayout from '../../components/PageLayout';

export default function Accesibilidad() {
  return (
    <PageLayout
      crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Accesibilidad' }]}
      heroTag="Portal institucional"
      heroTitle="Declaración de Accesibilidad"
      heroSubtitle="Compromiso del Ministerio de Economía, Comercio y Empresa con la accesibilidad web."
    >
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Compromiso con la accesibilidad</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1rem' }}>
              El Ministerio de Economía, Comercio y Empresa se compromete a hacer accesibles sus páginas web de conformidad con el Real Decreto 1112/2018, de 7 de septiembre, sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público.
            </p>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
              Este sitio web ha sido diseñado siguiendo los estándares y directrices de accesibilidad definidos por el W3C (World Wide Web Consortium) y las normas UNE 139803:2012.
            </p>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Nivel de cumplimiento</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1rem' }}>
              El objetivo es cumplir con el nivel AA de las directrices WCAG 2.1. Se han implementado las siguientes medidas:
            </p>
            <ul style={{ color: 'var(--foreground)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
              <li>Uso de textos alternativos en imágenes</li>
              <li>Estructura semántica correcta del contenido</li>
              <li>Contraste de colores adecuado</li>
              <li>Navegación accesible por teclado</li>
              <li>Formularios con etiquetas asociadas correctamente</li>
              <li>Maquetación flexible adaptable a diferentes dispositivos</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', color: 'var(--foreground)' }}>Contacto y sugerencias</h2>
            <p style={{ color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Si detecta cualquier barrera de acceso o tiene sugerencias de mejora, puede comunicárnoslo a través del siguiente correo electrónico:
            </p>
            <p style={{ fontWeight: 600, color: 'var(--foreground)' }}>accesibilidad@economia.gob.pan</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
