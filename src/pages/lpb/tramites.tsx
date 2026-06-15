import { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'LPB',            href: '/lpb' },
  { label: 'Trámites',       href: '/lpb/tramites' },
  { label: 'Notificaciones', href: '/lpb/notificaciones' },
];

const TRAMITES = [
  {
    titulo: 'Solicitud de licencia de apertura de establecimiento comercial',
    plazo: 'Permanente', canal: 'Electrónico / Presencial',
    desc: 'Permite a personas físicas o jurídicas solicitar la autorización para la apertura de establecimientos comerciales de nueva planta o ampliación de los existentes.',
    pasos: ['Cumplimentar el formulario de solicitud', 'Adjuntar la documentación requerida (proyecto técnico, DNI/NIE, etc.)', 'Abonar la tasa correspondiente (código 001-MECE)', 'Presentar en LPB o en los registros habilitados'],
  },
  {
    titulo: 'Alta en el Registro Mercantil Central del Reino del Pan',
    plazo: 'Permanente', canal: 'Electrónico',
    desc: 'Inscripción de empresas, sociedades y empresarios individuales en el Registro Mercantil Central, requisito para el inicio de la actividad mercantil.',
    pasos: ['Aportar escritura de constitución o declaración censal', 'Identificación del representante legal', 'Presentación electrónica firmada'],
  },
  {
    titulo: 'Solicitud de bonificación por contratación indefinida (Plan Empleo Joven)',
    plazo: 'Hasta el 31 de diciembre de 2026', canal: 'Electrónico',
    desc: 'Incentivos en cuota a la Seguridad Social para empresas que formalicen contratos indefinidos con menores de 30 años.',
    pasos: ['Verificar que la empresa cumple los requisitos del Plan', 'Presentar el contrato de trabajo en el SPE', 'Solicitar la bonificación en el LPB'],
  },
];

export default function Tramites() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PageLayout
      crumbs={[{ label: 'LPB', href: '/lpb' }, { label: 'Trámites' }]}
      heroTag="LPB — Laboral Panien Bank"
      heroTitle="Trámites y gestiones"
      heroSubtitle="Catálogo de procedimientos administrativos del Ministerio de Economía, Comercio y Empresa."
    >
      <div className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <SideNav title="LPB" items={SIDE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {TRAMITES.map((t, i) => (
              <div key={i} className="accordion-item">
                <div className="accordion-header" onClick={() => setOpen(open === i ? null : i)}>
                  <span>{t.titulo}</span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--primary)', lineHeight: 1 }}>{open === i ? '−' : '+'}</span>
                </div>
                {open === i && (
                  <div className="accordion-body">
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="tag">Plazo: {t.plazo}</span>
                      <span className="tag">Canal: {t.canal}</span>
                    </div>
                    <p style={{ margin: '0 0 0.85rem' }}>{t.desc}</p>
                    <strong style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pasos a seguir:</strong>
                    <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {t.pasos.map((p, j) => <li key={j}>{p}</li>)}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}