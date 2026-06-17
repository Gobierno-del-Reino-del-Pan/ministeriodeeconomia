import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
  { label: 'PIB', href: '/comercio/indicadores' },
];

// Datos inventados (millones de panedas)
const DATOS_PIB = [
  { año: '2022', valor: 8200 },
  { año: '2023', valor: 9100 },
  { año: '2024', valor: 10500 },
  { año: '2025', valor: 11800 },
  { año: '2026', valor: 13400 },
];

export default function Indicadores() {
  // Función para dibujar el gráfico de líneas en un canvas
  const drawChart = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Limpiar
    ctx.clearRect(0, 0, width, height);

    // Encontrar el máximo para escalar
    const maxVal = Math.max(...DATOS_PIB.map(d => d.valor));
    const minVal = Math.min(...DATOS_PIB.map(d => d.valor));
    const range = maxVal - minVal || 1;

    // Dibujar fondo de cuadrícula (líneas horizontales tenues)
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'var(--muted-foreground)';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + chartHeight - (i / 4) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      // Etiquetas de los ejes y
      const val = Math.round(minVal + (i / 4) * range);
      ctx.fillText(val.toString(), padding.left - 8, y + 4);
    }

    // Dibujar ejes
    ctx.strokeStyle = 'var(--foreground)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // Dibujar etiquetas del eje x (años)
    ctx.textAlign = 'center';
    ctx.fillStyle = 'var(--muted-foreground)';
    const stepX = chartWidth / (DATOS_PIB.length - 1);
    DATOS_PIB.forEach((d, i) => {
      const x = padding.left + i * stepX;
      ctx.fillText(d.año, x, height - padding.bottom + 16);
    });

    // Dibujar la línea de datos
    ctx.beginPath();
    ctx.strokeStyle = 'var(--gold)';
    ctx.lineWidth = 3;
    DATOS_PIB.forEach((d, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((d.valor - minVal) / range) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dibujar puntos en los datos
    ctx.fillStyle = 'var(--gold)';
    DATOS_PIB.forEach((d, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((d.valor - minVal) / range) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Añadir valor sobre el último punto
    const last = DATOS_PIB[DATOS_PIB.length - 1];
    const lastX = padding.left + (DATOS_PIB.length - 1) * stepX;
    const lastY = padding.top + chartHeight - ((last.valor - minVal) / range) * chartHeight;
    ctx.fillStyle = 'var(--foreground)';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(last.valor + ' M', lastX, lastY - 12);
  };

  return (
    <PageLayout
      crumbs={[{ label: 'Comercio', href: '/comercio' }, { label: 'PIB' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Producto Interior Bruto (PIB) del Reino del Pan"
      heroSubtitle="Evolución de las arcas del Reino. Datos en millones de panedas (estimaciones)."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
              <span>📊</span>
              <span>Datos elaborados por el Instituto Nacional de Estadística Paniense (INEP). Última actualización: <strong>17 de junio de 2026</strong>.</span>
            </div>

            <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
                Evolución del PIB (millones de panedas)
              </h3>
              <canvas
                ref={drawChart}
                width={600}
                height={300}
                style={{ width: '100%', height: 'auto', aspectRatio: '600/300' }}
              />
              <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                * Datos estimados sujetos a revisión.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-number">13.400 M</div>
                <div className="stat-label">PIB 2026 (estimado)</div>
              </div>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-number">+13,6%</div>
                <div className="stat-label">Crecimiento interanual</div>
              </div>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-number">7.200 M</div>
                <div className="stat-label">Reservas del Reino</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}