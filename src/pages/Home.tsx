import { Link } from 'wouter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsTickerBar from '../components/NewsTickerBar';

const DESTACADOS = [
  { tag: 'Comercio Exterior', title: 'Programa de Apoyo a la Exportación 2026', desc: 'El Ministerio pone en marcha una línea de financiación de 12 millones de PAN para empresas que inicien actividad exportadora.', href: '/comercio/exportaciones', date: '10 jun. 2026' },
  { tag: 'Empleo', title: 'Plan Nacional de Empleo Juvenil', desc: 'Nuevas medidas para reducir el desempleo entre menores de 30 años, con incentivos fiscales a empresas contratantes.', href: '/empleo/politicas', date: '5 jun. 2026' },
  { tag: 'Normativa', title: 'Reglamento de Comercio Interior aprobado', desc: 'El Consejo de Ministros aprueba el primer Reglamento de Comercio Interior del Reino del Pan, publicado en el BOE.', href: '/boe', date: '28 may. 2026' },
];

const ACCESOS = [
  { icon: '📋', label: 'Trámites y Gestiones',  href: '/lpb/tramites',        desc: 'Solicitudes, licencias y registros' },
  { icon: '📰', label: 'Boletín Oficial',        href: '/boe',                 desc: 'Legislación y disposiciones oficiales' },
  { icon: '📊', label: 'Estadísticas',           href: '/empleo/estadisticas', desc: 'Datos económicos y de empleo' },
  { icon: '🌐', label: 'Comercio Exterior',      href: '/comercio',            desc: 'Exportaciones e inversiones' },
  { icon: '🏛️', label: 'El Ministerio',          href: '/ministerio',          desc: 'Organización y competencias' },
  { icon: '🏦', label: 'LPB',                    href: '/lpb',                  desc: 'Laboral Panien Bank' },
];

const STATS = [
  { num: '3,2 %',  label: 'Tasa de desempleo',      sub: '2.º trimestre 2026' },
  { num: '+18 %',  label: 'Exportaciones',           sub: 'Crecimiento interanual' },
  { num: '47',     label: 'Acuerdos comerciales',    sub: 'Vigentes y en negociación' },
  { num: '1.200',  label: 'Empresas registradas',    sub: 'En el Registro Mercantil' },
];

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <NewsTickerBar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #091f42 0%, #0F326A 55%, #1a4a9e 100%)', color: '#fff', padding: '4rem 0 3rem', position: 'relative', overflow: 'hidden', borderBottom: '3px solid var(--gold)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z' fill='%23fff'/%3E%3C/svg%3E\")" }} />
        <div className="container" style={{ position: 'relative' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-light)', display: 'block', marginBottom: '1rem' }}>
            Gobierno del Reino del Pan
          </span>
          <h1 style={{ fontFamily: 'var(--display-font)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#ffffff', maxWidth: '700px', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Ministerio de Economía,<br />Comercio y Empresa
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '520px', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Impulsamos el crecimiento económico, el comercio sostenible y el empleo de calidad en el Reino del Pan.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <Link href="/lpb/tramites" className="btn btn-gold">Iniciar un trámite</Link>
            <Link href="/ministerio" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.45)' }}>Conocer el Ministerio</Link>
          </div>
        </div>
      </section>

      {/* ACCESOS DIRECTOS */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
            {ACCESOS.map((a) => (
              <Link key={a.href} href={a.href}>
                <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem 1rem', textAlign: 'center', transition: 'all 200ms', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLElement).style.background = 'var(--secondary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'var(--background)'; }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{a.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>{a.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', lineHeight: 1.4 }}>{a.desc}</div>
                </div>
              </Link>
            ))}
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
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
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