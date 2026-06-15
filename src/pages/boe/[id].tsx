import { useParams } from 'wouter';
import PageLayout from '../../components/PageLayout';

const DOCS: Record<string, { ref: string; titulo: string; fecha: string; organo: string; texto: string }> = {
  'rdp-2026-421': {
    ref: 'RDP-2026-421',
    titulo: 'Real Decreto por el que se regula el comercio ambulante en el territorio del Reino del Pan',
    fecha: '10 de junio de 2026',
    organo: 'Ministerio de Economía, Comercio y Empresa',
    texto: `El presente Real Decreto tiene por objeto establecer el marco jurídico aplicable al ejercicio de la actividad de comercio ambulante en el territorio del Reino del Pan, con el fin de garantizar la protección de los consumidores, la competencia leal y la ordenación urbanística adecuada.

**Artículo 1. Objeto y ámbito de aplicación.**
Se entiende por comercio ambulante la actividad comercial ejercida fuera de un establecimiento permanente, en la vía pública o en espacios habilitados al efecto, con carácter periódico o itinerante.

**Artículo 2. Licencia municipal.**
El ejercicio del comercio ambulante requiere la obtención de licencia municipal en cada municipio en que se pretenda desarrollar la actividad, con arreglo al procedimiento establecido en la legislación de régimen local.

**Artículo 3. Condiciones sanitarias y de seguridad.**
Los puestos de venta ambulante deberán cumplir la normativa vigente en materia de seguridad alimentaria, protección al consumidor y prevención de riesgos laborales.

**Disposición final primera. Entrada en vigor.**
El presente Real Decreto entrará en vigor el día siguiente al de su publicación en el Boletín Oficial del Reino del Pan.`,
  },
};

export default function BoeDetalle() {
  const { id } = useParams<{ id: string }>();
  const doc = id ? DOCS[id] : undefined;

  if (!doc) {
    return (
      <PageLayout heroTitle="Disposición no encontrada" crumbs={[{ label: 'BOE', href: '/boe' }, { label: id ?? '' }]}>
        <div className="section">
          <div className="container">
            <p style={{ color: 'var(--muted-foreground)' }}>La referencia indicada no se ha encontrado en el archivo del BOE.</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      crumbs={[{ label: 'BOE', href: '/boe' }, { label: doc.ref }]}
      heroTag="Boletín Oficial del Reino del Pan"
      heroTitle={doc.ref}
    >
      <div className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem 1.5rem', marginBottom: '2rem', fontSize: '0.82rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.5rem' }}>
            <div><span style={{ fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.68rem' }}>Referencia</span><br /><strong>{doc.ref}</strong></div>
            <div><span style={{ fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.68rem' }}>Fecha</span><br />{doc.fecha}</div>
            <div style={{ gridColumn: '1 / -1' }}><span style={{ fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.68rem' }}>Órgano emisor</span><br />{doc.organo}</div>
          </div>
          <h1 style={{ fontFamily: 'var(--display-font)', fontSize: '1.4rem', marginBottom: '1.5rem', lineHeight: 1.3 }}>{doc.titulo}</h1>
          <div className="divider-gold" />
          <div style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--foreground)' }}>{doc.texto}</div>
        </div>
      </div>
    </PageLayout>
  );
}