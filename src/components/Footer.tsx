import { Link } from 'wouter';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

          {/* Identidad */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.9rem' }}>
              <img src="/logo.png" alt="Logo" style={{ height: '40px', width: '40px', objectFit: 'contain', borderRadius: '3px' }} />
              <span style={{ fontFamily: 'var(--display-font)', color: '#fff', fontSize: '0.9rem' }}>Reino del Pan</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
              Ministerio de Economía,<br />Comercio y Empresa
            </p>
          </div>

          {/* El Ministerio */}
          <div>
            <p className="footer-heading">El Ministerio</p>
            <a href="/ministerio" className="footer-link">Quiénes somos</a>
            <a href="/ministerio/organizacion" className="footer-link">Organización</a>
            <a href="/ministerio/secretarias" className="footer-link">Secretarías</a>
            <a href="/ministerio/agenda" className="footer-link">Agenda institucional</a>
          </div>

          {/* Áreas */}
          <div>
            <p className="footer-heading">Áreas</p>
            <a href="/comercio" className="footer-link">Comercio Exterior</a>
            <a href="/comercio/exportaciones" className="footer-link">Exportaciones</a>
            <a href="/empleo" className="footer-link">Empleo y Trabajo</a>
            <a href="/empleo/estadisticas" className="footer-link">Estadísticas</a>
          </div>

          {/* Ciudadano */}
          <div>
            <p className="footer-heading">Ciudadano</p>
            <a href="/sede" className="footer-link">Sede Electrónica</a>
            <a href="/sede/tramites" className="footer-link">Trámites</a>
            <a href="/boe" className="footer-link">Boletín Oficial</a>
            <a href="/sede/notificaciones" className="footer-link">Notificaciones</a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© {year} Ministerio de Economía, Comercio y Empresa — Reino del Pan. Todos los derechos reservados.</span>
          <span>Accesibilidad · Aviso legal · Política de privacidad · Mapa del portal</span>
        </div>
      </div>
    </footer>
  );
}
