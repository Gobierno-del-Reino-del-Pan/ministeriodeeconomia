import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NewsTickerBar from '../../components/NewsTickerBar';
import BreadcrumbNav from '../../components/BreadcrumbNav';
import { Link } from 'wouter';

const ENTRADAS = [
  { id: 'rdp-2026-421', ref: 'RDP-2026-421', titulo: 'Real Decreto por el que se regula el comercio ambulante en el territorio del Reino del Pan', seccion: 'I — Disposiciones generales', fecha: '10 jun. 2026', organo: 'Ministerio de Economía, Comercio y Empresa' },
  { id: 'rdp-2026-418', ref: 'RDP-2026-418', titulo: 'Orden ministerial sobre la clasificación arancelaria de productos agroalimentarios', seccion: 'II — Autoridades y personal', fecha: '7 jun. 2026', organo: 'Secretaría de Estado de Comercio' },
  { id: 'rdp-2026-410', ref: 'RDP-2026-410', titulo: 'Resolución de convocatoria de becas de inserción laboral para jóvenes desempleados, ejercicio 2026', seccion: 'III — Otras disposiciones', fecha: '2 jun. 2026', organo: 'Secretaría de Estado de Empleo' },
  { id: 'rdp-2026-398', ref: 'RDP-2026-398', titulo: 'Ley de Inversiones Extranjeras del Reino del Pan', seccion: 'I — Disposiciones generales', fecha: '25 may. 2026', organo: 'Cortes del Reino del Pan' },
  { id: 'rdp-2026-384', ref: 'RDP-2026-384', titulo: 'Reglamento del Registro Mercantil Central del Reino del Pan', seccion: 'I — Disposiciones generales', fecha: '15 may. 2026', organo: 'Ministerio de Economía, Comercio y Empresa' },
];

export default function BoeIndex() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <NewsTickerBar />
      <BreadcrumbNav crumbs={[{ label: 'BOE' }]} />
      <div style={{ background: '#091f42', color: '#fff', padding: '2.5rem 0', borderBottom: '3px solid var(--gold)' }}>
        <div className="container">
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-light)', display: 'block', marginBottom: '0.5rem' }}>
            Boletín Oficial del Estado
          </span>
          <h1 style={{ fontFamily: 'var(--display-font)', fontSize: '2rem', color: '#fff' }}>
            Boletín Oficial del Reino del Pan
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Publicación oficial de disposiciones, actos y anuncios del Gobierno del Reino del Pan.
          </p>
        </div>
      </div>
      <main style={{ flex: 1, padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.25rem' }}>Disposiciones recientes</h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Actualizado: 15 jun. 2026</span>
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <table className="boe-table">
              <thead>
                <tr><th>Referencia</th><th>Título</th><th>Sección</th><th>Órgano</th><th>Fecha</th></tr>
              </thead>
              <tbody>
                {ENTRADAS.map((e) => (
                  <tr key={e.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Link href={'/boe/' + e.id} style={{ color: 'var(--primary)', fontWeight: 700 }}>{e.ref}</Link>
                    </td>
                    <td><Link href={'/boe/' + e.id} style={{ color: 'var(--foreground)' }}>{e.titulo}</Link></td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{e.seccion}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{e.organo}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{e.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}