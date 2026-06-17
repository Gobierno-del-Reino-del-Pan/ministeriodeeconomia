import { Link } from 'wouter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsTickerBar from '../components/NewsTickerBar';
import { useState } from 'react';

const DESTACADOS = [
  { tag: 'Comercio Exterior', title: 'Programa de Apoyo a la Exportación 2026', desc: 'El Ministerio pone en marcha una línea de financiación de 12 millones de PAN para empresas que inicien actividad exportadora.', href: '/comercio/exportaciones', date: '10 jun. 2026' },
  { tag: 'Empleo', title: 'Plan Nacional de Empleo Juvenil', desc: 'Nuevas medidas para reducir el desempleo entre menores de 30 años, con incentivos fiscales a empresas contratantes.', href: '/empleo/politicas', date: '5 jun. 2026' },
  { tag: 'Normativa', title: 'Reglamento de Comercio Interior aprobado', desc: 'El Consejo de Ministros aprueba el primer Reglamento de Comercio Interior del Reino del Pan, publicado en el BOE.', href: '/boe', date: '28 may. 2026' },
];

const ACCESOS = [
  {
    icon: '📋',
    label: 'Trámites y Gestiones',
    href: '/lpb/tramites',
    desc: 'Solicitudes, licencias y registros',
    detail: 'Accede a la oficina virtual para realizar solicitudes de licencias, presentar registros oficiales, iniciar expedientes administrativos y realizar gestiones con el Ministerio de manera 100% digital.'
  },
  {
    icon: '📰',
    label: 'Boletín Oficial',
    href: '/boe',
    desc: 'Legislación y disposiciones oficiales',
    detail: 'Consulta las leyes, reales decretos, resoluciones de órganos superiores, anuncios y otras disposiciones del Reino del Pan publicadas de manera oficial en el Boletín Oficial del Estado (BOE).'
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

const STATS = [
  { num: '3,2 %', label: 'Tasa de desempleo', sub: '2.º trimestre 2026' },
  { num: '+18 %', label: 'Exportaciones', sub: 'Crecimiento interanual' },
  { num: '47', label: 'Acuerdos comerciales', sub: 'Vigentes y en negociación' },
  { num: '1.200', label: 'Empresas registradas', sub: 'En el Registro Mercantil' },
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
        {/* Capa de atenuación para que sea más visible el texto */}
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

      {/* NOTICIAS */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.5rem', color: 'var(--foreground)' }}>Actualidad del Ministerio</h2>
            <Link href="/ministerio/noticias" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Ver todas las noticias →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {DESTACADOS.map((n, i) => (
              <Link key={i} href={n.href}>
                <article className="card card-featured" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="tag tag-primary">{n.tag}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>{n.date}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.05rem', color: 'var(--foreground)', lineHeight: 1.35 }}>{n.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--muted-foreground)', lineHeight: 1.65, margin: 0, flex: 1 }}>{n.desc}</p>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>Leer más →</span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="section section-alt">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.4rem', marginBottom: '1.75rem' }}>Indicadores económicos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.25rem' }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
            <Link href="/empleo/estadisticas" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Ver todos los indicadores →</Link>
          </div>
        </div>
      </section>

      {/* BOE */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.4rem' }}>Últimas disposiciones — BOE</h2>
            <Link href="/boe" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Ir al BOE →</Link>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(16px)', border: '1px solid rgba(151, 180, 224, 0.2)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(151, 180, 224, 0.03)' }}>
            <table className="boe-table">
              <thead>
                <tr><th>Referencia</th><th>Título</th><th>Sección</th><th>Fecha</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><Link href="/boe/rdp-2026-421" style={{ color: 'var(--primary)', fontWeight: 600 }}>RDP-2026-421</Link></td>
                  <td>Real Decreto de regulación del comercio ambulante</td>
                  <td>I — Disposiciones generales</td><td>10 jun. 2026</td>
                </tr>
                <tr>
                  <td><Link href="/boe/rdp-2026-418" style={{ color: 'var(--primary)', fontWeight: 600 }}>RDP-2026-418</Link></td>
                  <td>Orden ministerial sobre clasificación arancelaria</td>
                  <td>II — Autoridades y personal</td><td>7 jun. 2026</td>
                </tr>
                <tr>
                  <td><Link href="/boe/rdp-2026-410" style={{ color: 'var(--primary)', fontWeight: 600 }}>RDP-2026-410</Link></td>
                  <td>Resolución de convocatoria de becas de empleo</td>
                  <td>III — Otras disposiciones</td><td>2 jun. 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AVISO */}
      <section style={{ paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="alert alert-info">
            <span style={{ fontSize: '1.1rem' }}>ℹ️</span>
            <span>
              El <strong>LPB (Laboral Panien Bank)</strong> está en fase de despliegue. Algunas funcionalidades se habilitarán progresivamente durante las próximas semanas.
              Para consultas urgentes, utilice los canales habilitados en{' '}
              <Link href="/lpb" style={{ color: 'var(--primary)', fontWeight: 600 }}>lpb.mece.rdp.gov</Link>.
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}