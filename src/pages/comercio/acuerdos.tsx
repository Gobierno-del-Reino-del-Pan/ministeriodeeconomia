import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
];

const ACUERDOS = [
  { titulo: 'Acuerdo Marco de Libre Comercio con la Alianza del Norte', estado: 'Vigor', fecha: 'Mar. 2026' },
  { titulo: 'Convenio de Cooperación Económica — Unión de Repúblicas del Sur', estado: 'Vigor', fecha: 'Ene. 2026' },
  { titulo: 'Memorando de Entendimiento en materia aduanera con Veldoria', estado: 'Negociación', fecha: 'En curso' },
  { titulo: 'Protocolo de Inversiones con el Bloque Atlántico', estado: 'Ratificación', fecha: 'Jun. 2026' },
];

export default function Acuerdos() {
  return (
    <PageLayout
      crumbs={[{ label: 'Comercio', href: '/comercio' }, { label: 'Acuerdos Comerciales' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Acuerdos Comerciales"
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <table className="boe-table">
                <thead>
                  <tr>
                    <th>Acuerdo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {ACUERDOS.map((a, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{a.titulo}</td>
                      <td>
                        <span className={'tag ' + (a.estado === 'Vigor' ? 'tag-primary' : a.estado === 'Negociación' ? '' : 'tag-gold')}>
                          {a.estado}
                        </span>
                      </td>
                      <td>{a.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
