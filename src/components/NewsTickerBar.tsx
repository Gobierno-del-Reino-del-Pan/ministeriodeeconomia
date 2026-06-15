const ITEMS = [
  'El Ministerio publica las directrices de política comercial para el ejercicio 2026',
  'Convocatoria de ayudas para la internacionalización de empresas panienses — Plazo abierto',
  'El índice de desempleo se sitúa en el 3,2% en el segundo trimestre de 2026',
  'Nuevo acuerdo de cooperación económica con la Alianza de Naciones Libres',
  'Aprobado el Reglamento de Inversiones Extranjeras en el Reino del Pan',
];

export default function NewsTickerBar() {
  return (
    <div className="news-ticker" style={{ display: 'flex', height: '32px', alignItems: 'center', overflow: 'hidden' }}>
      <div className="news-ticker-label">
        Actualidad
      </div>
      <div style={{ overflow: 'hidden', flex: 1, position: 'relative' }}>
        <div className="ticker-track" style={{ display: 'flex', gap: '5rem', whiteSpace: 'nowrap', cursor: 'default' }}>
          <span style={{ display: 'flex', gap: '5rem', flexShrink: 0 }}>
            {ITEMS.map((item, i) => (
              <span key={'a-' + i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>◆</span>
                {item}
              </span>
            ))}
          </span>
          {/* Duplicado para bucle continuo */}
          <span aria-hidden="true" style={{ display: 'flex', gap: '5rem', flexShrink: 0 }}>
            {ITEMS.map((item, i) => (
              <span key={'b-' + i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>◆</span>
                {item}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
