import { useEffect, useRef, useState, useCallback } from 'react';
import PageLayout from '../../components/PageLayout';
import SideNav from '../../components/SideNav';

const SIDE = [
  { label: 'Política Comercial', href: '/comercio' },
  { label: 'Exportaciones', href: '/comercio/exportaciones' },
  { label: 'Inversiones Extranjeras', href: '/comercio/inversiones' },
  { label: 'Acuerdos Comerciales', href: '/comercio/acuerdos' },
  { label: 'PIB', href: '/comercio/indicadores' },
];

interface PibSnapshot {
  timestamp: string;
  balance: number;
}

const STORAGE_KEY = 'pib_history';
const REFRESH_INTERVAL = 2 * 60 * 60 * 1000; // 2 horas

function loadHistory(): PibSnapshot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function saveHistory(history: PibSnapshot[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

function fmt(n: number) {
  return n.toLocaleString('es-ES');
}

export default function Indicadores() {
  const [history, setHistory] = useState<PibSnapshot[]>(loadHistory);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const [fetching, setFetching] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPib = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/gobierno/pib');
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        // Sumar balances de todas las entidades públicas
        const totalBalance = json.data.reduce((sum: number, d: { balance: number }) => sum + (d.balance ?? 0), 0);
        setCurrentBalance(totalBalance);
        setLastUpdate(json.fetched_at);

        setHistory(prev => {
          const now = new Date().toISOString();
          const newEntry: PibSnapshot = { timestamp: now, balance: totalBalance };
          // Evitar duplicados muy cercanos (< 1 min)
          const last = prev[prev.length - 1];
          if (last && Math.abs(new Date(now).getTime() - new Date(last.timestamp).getTime()) < 60000) {
            return prev;
          }
          const updated = [...prev, newEntry];
          // Mantener máximo 200 puntos
          const trimmed = updated.length > 200 ? updated.slice(-200) : updated;
          saveHistory(trimmed);
          return trimmed;
        });
      }
    } catch {
      // silencioso
    }
    setFetching(false);
  }, []);

  useEffect(() => {
    fetchPib();
    timerRef.current = setInterval(fetchPib, REFRESH_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchPib]);

  const drawChart = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || history.length < 2) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 30, right: 20, bottom: 40, left: 70 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const balances = history.map(h => h.balance);
    const maxVal = Math.max(...balances);
    const minVal = Math.min(...balances);
    const range = maxVal - minVal || 1;
    const paddingY = range * 0.1;
    const yMin = minVal - paddingY;
    const yMax = maxVal + paddingY;
    const yRange = yMax - yMin;

    // Cuadrícula
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + chartHeight - (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      const val = Math.round(yMin + (i / 5) * yRange);
      ctx.fillText(fmt(val), padding.left - 8, y + 4);
    }

    // Ejes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // Etiquetas eje X (fechas)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px system-ui, sans-serif';
    const stepX = chartWidth / (history.length - 1);
    // Mostrar solo algunas etiquetas para no saturar
    const labelEvery = Math.max(1, Math.floor(history.length / 8));
    history.forEach((h, i) => {
      if (i % labelEvery !== 0 && i !== history.length - 1) return;
      const x = padding.left + i * stepX;
      const date = new Date(h.timestamp);
      ctx.fillText(date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }), x, height - padding.bottom + 18);
    });

    // Área bajo la línea
    ctx.beginPath();
    history.forEach((h, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((h.balance - yMin) / yRange) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + (history.length - 1) * stepX, height - padding.bottom);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.3)');
    gradient.addColorStop(1, 'rgba(212, 175, 55, 0.02)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Línea de datos
    ctx.beginPath();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    history.forEach((h, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((h.balance - yMin) / yRange) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Puntos
    history.forEach((h, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((h.balance - yMin) / yRange) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
    });

    // Valor del último punto
    const last = history[history.length - 1];
    const lastX = padding.left + (history.length - 1) * stepX;
    const lastY = padding.top + chartHeight - ((last.balance - yMin) / yRange) * chartHeight;
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(fmt(last.balance) + ' 🪙', lastX, lastY - 14);
  };

  const growth = history.length >= 2
    ? ((history[history.length - 1].balance - history[0].balance) / Math.abs(history[0].balance || 1) * 100)
    : 0;

  return (
    <PageLayout
      crumbs={[{ label: 'Comercio', href: '/comercio' }, { label: 'PIB' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Producto Interior Bruto (PIB) del Reino del Pan"
      heroSubtitle="Evolución de las arcas del Reino en tiempo real. Actualización automática cada 2 horas."
    >
      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
              <span>📊</span>
              <span>Datos elaborados por el Instituto Nacional de Estadística Paniense (INEP). Los datos se obtienen directamente de las arcas del gobierno y se actualizan automáticamente cada 2 horas. {lastUpdate && <>Última actualización: <strong>{new Date(lastUpdate).toLocaleString('es-ES')}</strong></>} {fetching && <span style={{ color: 'var(--warning)' }}>(Actualizando...)</span>}</span>
            </div>

            <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
                Evolución del PIB (panedas)
              </h3>
              {history.length < 2 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📈</div>
                  <p>Recopilando datos para generar la gráfica...</p>
                  <p style={{ fontSize: '0.85rem' }}>Se necesitan al menos 2 lecturas. La próxima se tomará en 2 horas.</p>
                  <button
                    onClick={fetchPib}
                    disabled={fetching}
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.9rem', opacity: fetching ? 0.5 : 1 }}
                  >
                    {fetching ? 'Cargando...' : 'Forzar actualización'}
                  </button>
                </div>
              ) : (
                <canvas
                  ref={drawChart}
                  width={700}
                  height={350}
                  style={{ width: '100%', height: 'auto', aspectRatio: '700/350' }}
                />
              )}
              <div style={{ textAlign: 'center', marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={fetchPib}
                  disabled={fetching}
                  className="btn btn-primary"
                  style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', opacity: fetching ? 0.5 : 1 }}
                >
                  {fetching ? 'Actualizando...' : 'Actualizar ahora'}
                </button>
                <button
                  onClick={() => {
                    if (confirm('¿Borrar todo el historial de PIB guardado?')) {
                      setHistory([]);
                      saveHistory([]);
                    }
                  }}
                  style={{
                    padding: '0.4rem 1rem', fontSize: '0.85rem',
                    border: '1px solid var(--border)', background: 'var(--background)',
                    borderRadius: 'var(--radius)', cursor: 'pointer', color: 'var(--muted-foreground)',
                  }}
                >
                  Borrar historial
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-number">{currentBalance !== null ? fmt(currentBalance) : '—'} 🪙</div>
                <div className="stat-label">PIB Actual</div>
              </div>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-number" style={{ color: growth >= 0 ? 'var(--success)' : 'var(--error)' }}>
                  {history.length >= 2 ? `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%` : '—'}
                </div>
                <div className="stat-label">Variación histórica</div>
              </div>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-number">{history.length}</div>
                <div className="stat-label">Lecturas registradas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
