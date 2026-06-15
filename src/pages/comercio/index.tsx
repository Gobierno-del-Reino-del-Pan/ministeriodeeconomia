import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';
import { Link } from 'wouter';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
];

export default function ComercioIndex() {
  return (
    <PageLayout
      crumbs={[{ label: 'Comercio' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Política Comercial"
      heroSubtitle="El Ministerio impulsa un comercio sostenible, competitivo e integrado en los mercados internacionales."
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              La política comercial del Reino del Pan se orienta a la apertura de mercados, la defensa de la competencia leal y el impulso a las empresas panienses en el exterior. La Secretaría de Estado de Comercio coordina estas actuaciones con los organismos internacionales y los socios estratégicos del Reino.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
              {[
                { href: '/comercio/exportaciones', label: 'Exportaciones', desc: 'Programas de apoyo y financiación a la exportación.' },
                { href: '/comercio/inversiones',   label: 'Inversiones',   desc: 'Marco regulatorio para la inversión extranjera.' },
                { href: '/comercio/acuerdos',      label: 'Acuerdos',      desc: 'Tratados y convenios comerciales vigentes.' },
              ].map((c) => (
                <Link key={c.href} href={c.href}>
                  <div className="card card-featured">
                    <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1rem', marginBottom: '0.4rem' }}>{c.label}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', margin: 0 }}>{c.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
