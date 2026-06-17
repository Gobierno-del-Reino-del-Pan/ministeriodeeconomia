import { Link } from 'wouter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsTickerBar from '../components/NewsTickerBar';
import { useState } from 'react';

const ACCESOS = [
  {
    icon: '📋',
    label: 'Trámites y Gestiones',
    href: '/lpb/tramites',
    desc: 'Solicitudes, licencias y registros',
    detail: 'Accede a la oficina virtual para realizar solicitudes de licencias, presentar registros oficiales, iniciar expedientes administrativos y realizar gestiones con el Ministerio de manera 100% digital.'
  },
  {
    icon: '📊',
    label: 'Estadísticas',
    href: '/empleo/estadisticas',
    desc: 'Datos económicos y de empleo',
    detail: 'Consulta los indicadores socioeconómicos actuales elaborados por el INEP, como las tasas históricas de empleo, el crecimiento sectorial, el índice de precios al consumo y estadísticas mercantiles.'
  },
  {
    icon: '🌐',
    label: 'Comercio Exterior',
    href: '/comercio',
    desc: 'Exportaciones e inversiones',
    detail: 'Explora los convenios y tratados bilaterales vigentes, el marco normativo de las inversiones extranjeras directas, y los programas del Gobierno para potenciar la exportación de las empresas panienses.'
  },
  {
    icon: '🏛️',
    label: 'El Ministerio',
    href: '/ministerio',
    desc: 'Organización y competencias',
    detail: 'Infórmate acerca del organigrama, el equipo directivo, las secretarías de estado y la agenda pública. Encuentra comunicados de prensa y la agenda de comparecencias de los portavoces del departamento.'
  },
  {
    icon: '🏦',
    label: 'LPB',
    href: '/lpb',
    desc: 'Laboral Panien Bank',
    detail: 'Entra a la banca pública del Reino del Pan. Gestiona tus depósitos, solicita líneas de préstamo para el fomento empresarial y laboral, realiza transferencias instantáneas y maneja tu cuenta ciudadana.'
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <NewsTickerBar />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 5rem', borderBottom: '3px solid var(--gold)', minHeight: '380px', display: 'flex', alignItems: 'center', color: '#fff' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <source src="/heroEconomia.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.85) 0%, rgba(15, 31, 66, 0.75) 50%, rgba(151, 180, 224, 0.45) 100%)',
            zIndex: 2,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#ffffff',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            marginBottom: '1.25rem'
          }}>
            Gobierno del Reino del Pan
          </span>
          <h1 className="home-hero-title">
            Ministerio de Economía,<br />Comercio y Empresa
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '620px',
            fontSize: '1.15rem',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}>
            Impulsamos el crecimiento económico, el comercio sostenible y el empleo de calidad en el Reino del Pan.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/lpb/tramites" className="btn btn-gold">Iniciar un trámite</Link>
            <Link href="/ministerio" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.6)' }}>Conocer el Ministerio</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)', padding: '4rem 0' }}>
        <div className="container">
          <div className="interactive-access-dashboard">
            <div className="selector-list">
              {ACCESOS.map((a, i) => (
                <div
                  key={a.href}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`selector-item ${activeIndex === i ? 'active' : ''}`}
                >
                  <div className="selector-item-icon">{a.icon}</div>
                  <div className="selector-item-content">
                    <h4 className="selector-item-title">{a.label}</h4>
                    <p className="selector-item-desc">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="preview-panel">
              <div className="preview-icon-glow">
                {ACCESOS[activeIndex].icon}
              </div>
              <span className="preview-tag">Sección del Portal</span>
              <h3 className="preview-title">{ACCESOS[activeIndex].label}</h3>
              <p className="preview-desc">
                {ACCESOS[activeIndex].detail}
              </p>
              <Link href={ACCESOS[activeIndex].href} className="btn btn-primary preview-btn">
                <span>Ingresar a la sección</span>
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}