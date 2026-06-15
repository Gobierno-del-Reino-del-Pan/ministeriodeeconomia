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
            <Link href="/ministerio" className="footer-link">Quiénes somos</Link>
            <Link href="/ministerio/organizacion" className="footer-link">Organización</Link>
            <Link href="/ministerio/secretarias" className="footer-link">Secretarías</Link>
            <Link href="/ministerio/agenda" className="footer-link">Agenda institucional</Link>
          </div>

          {/* Áreas */}
          <div>
            <p className="footer-heading">Áreas</p>
            <Link href="/comercio" className="footer-link">Comercio Exterior</Link>
            <Link href="/comercio/exportaciones" className="footer-link">Exportaciones</Link>
            <Link href="/empleo" className="footer-link">Empleo y Trabajo</Link>
            <Link href="/empleo/estadisticas" className="footer-link">Estadísticas</Link>
          </div>

          {/* Ciudadano */}
          <div>
            <p className="footer-heading">Ciudadano</p>
            <Link href="/lpb" className="footer-link">LPB - Laboral Panien Bank</Link>
            <Link href="/lpb/tramites" className="footer-link">Trámites</Link>
            <Link href="/lpb/notificaciones" className="footer-link">Notificaciones</Link>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© {year} Ministerio de Economía, Comercio y Empresa — Reino del Pan. Todos los derechos reservados.</span>
          <span>
            <Link href="/accesibilidad" className="footer-link-inline">Accesibilidad</Link>
            {' · '}
            <Link href="/aviso-legal" className="footer-link-inline">Aviso legal</Link>
            {' · '}
            <Link href="/privacidad" className="footer-link-inline">Política de privacidad</Link>
            {' · '}
            <Link href="/mapa-del-portal" className="footer-link-inline">Mapa del portal</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
