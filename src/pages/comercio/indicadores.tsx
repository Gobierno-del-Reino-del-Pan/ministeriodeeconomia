import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
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

type RangeKey = 'live' | '28d' | '3m' | '1a';

const RANGES: { key: RangeKey; label: string; days: number | null }[] = [
  { key: 'live', label: 'En vivo', days: null },
  { key: '28d', label: '28 días', days: 28 },
  { key: '3m', label: '3 meses', days: 90 },
  { key: '1a', label: '1 año', days: 365 },
];

const STORAGE_KEY = 'pib_history';
const REFRESH_SECONDS = 5 * 60; // 5 minutos
const MAX_HISTORY_MS = 365 * 24 * 60 * 60 * 1000; // conservar como máximo 1 año
const CHART_RESOLUTION = 180; // puntos máximos dibujados, para que rangos largos no vayan lentos

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

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

// Notación compacta para el eje Y (1.2M, 850k...) así la gráfica respira
function fmtCompact(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return (n / 1_000_000).toLocaleString('es-ES', { maximumFractionDigits: 1 }) + 'M';
  if (abs >= 1_000) return (n / 1_000).toLocaleString('es-ES', { maximumFractionDigits: 1 }) + 'k';
  return fmt(n);
}

// Reduce la cantidad de puntos a dibujar sin perder la forma general de la curva
function downsample(points: PibSnapshot[], maxPoints: number): PibSnapshot[] {
  if (points.length <= maxPoints) return points;
  const step = points.length / maxPoints;
  const result: PibSnapshot[] = [];
  for (let i = 0; i < maxPoints; i++) {
    result.push(points[Math.floor(i * step)]);
  }
  const last = points[points.length - 1];
  if (result[result.length - 1] !== last) result.push(last);
  return result;
}

export default function Indicadores() {
  const [history, setHistory] = useState<PibSnapshot[]>(loadHistory);
  const [fetching, setFetching] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_SECONDS);
  const [range, setRange] = useState<RangeKey>('live');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Filtra el histórico según el rango elegido (en vivo = todo lo disponible)
  const filteredHistory = useMemo(() => {
    const selected = RANGES.find(r => r.key === range);
    if (!selected || selected.days === null) return history;
    const cutoff = Date.now() - selected.days * 24 * 60 * 60 * 1000;
    return history.filter(h => new Date(h.timestamp).getTime() >= cutoff);
  }, [history, range]);

  const displayHistory = useMemo(
    () => downsample(filteredHistory, CHART_RESOLUTION),
    [filteredHistory]
  );

  // Dibujar gráfica
  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || displayHistory.length < 1) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 30, right: 20, bottom: 34, left: 64 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const balances = displayHistory.map(h => h.balance);
    const maxVal = Math.max(...balances);
    const minVal = Math.min(...balances);
    const range_ = maxVal - minVal || Math.max(Math.abs(maxVal), 1) * 0.05;
    const paddingY = range_ * 0.18;
    const yMin = minVal - paddingY;
    const yMax = maxVal + paddingY;
    const yRange = yMax - yMin || 1;

    // Cuadrícula punteada, sutil
    ctx.save();
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 1;
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + chartHeight - (i / 4) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      const val = yMin + (i / 4) * yRange;
      ctx.fillText(fmtCompact(val), padding.left - 10, y + 4);
    }
    ctx.restore();

    // Eje inferior
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // Etiquetas eje X: hora si es "en vivo", fecha si es un rango largo
    ctx.textAlign = 'center';
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px system-ui, sans-serif';
    const stepX = displayHistory.length > 1 ? chartWidth / (displayHistory.length - 1) : 0;
    const labelEvery = Math.max(1, Math.ceil(displayHistory.length / 6));
    displayHistory.forEach((h, i) => {
      if (displayHistory.length > 1 && i % labelEvery !== 0 && i !== displayHistory.length - 1) return;
      const x = padding.left + i * stepX;
      const date = new Date(h.timestamp);
      const label = range === 'live'
        ? date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: range === '1a' ? '2-digit' : undefined });
      ctx.fillText(label, x, height - padding.bottom + 18);
    });

    const points = displayHistory.map((h, i) => ({
      x: padding.left + i * stepX,
      y: padding.top + chartHeight - ((h.balance - yMin) / yRange) * chartHeight,
    }));

    // Caso de un único punto: aún no hay tendencia que trazar
    if (points.length === 1) {
      const { x, y } = points[0];
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.18)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(fmt(displayHistory[0].balance) + ' 🪙', x, y - 18);
      return;
    }

    // Curva suavizada (Catmull-Rom simplificado vía curvas cuadráticas)
    const buildPath = () => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);
    };

    // Área bajo la curva
    buildPath();
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.lineTo(points[0].x, height - padding.bottom);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.35)');
    gradient.addColorStop(1, 'rgba(212, 175, 55, 0.01)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Línea con resplandor dorado
    buildPath();
    ctx.shadowColor = 'rgba(212, 175, 55, 0.55)';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Halo pulsante en el último punto (valor actual)
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 9, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.22)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(last.x, last.y, 4.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#d4af37';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Etiqueta del valor actual
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    const labelY = last.y - 18 < padding.top + 10 ? last.y + 24 : last.y - 18;
    ctx.fillText(fmt(displayHistory[displayHistory.length - 1].balance) + ' 🪙', last.x, labelY);
  }, [displayHistory, range]);

  useEffect(() => {
    drawChart();
  }, [drawChart]);

  const fetchPib = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/gobierno/pib');
      const json = await res.json();
      let totalBalance = 0;
      if (json.data && json.data.length > 0) {
        totalBalance = json.data.reduce((sum: number, d: { balance: number }) => sum + (d.balance ?? 0), 0);
      }
      if (isNaN(totalBalance)) totalBalance = 0;

      setHistory(prev => {
        const newEntry: PibSnapshot = { timestamp: new Date().toISOString(), balance: totalBalance };
        const updated = [...prev, newEntry];
        const cutoff = Date.now() - MAX_HISTORY_MS;
        const trimmed = updated.filter(h => new Date(h.timestamp).getTime() >= cutoff);
        saveHistory(trimmed);
        return trimmed;
      });
    } catch {
      setHistory(prev => {
        const newEntry: PibSnapshot = { timestamp: new Date().toISOString(), balance: 0 };
        const updated = [...prev, newEntry];
        const cutoff = Date.now() - MAX_HISTORY_MS;
        const trimmed = updated.filter(h => new Date(h.timestamp).getTime() >= cutoff);
        saveHistory(trimmed);
        return trimmed;
      });
    }
    setFetching(false);
  }, []);

  // Fetch inicial y cuenta atrás hasta el próximo refresco (cada 5 minutos)
  useEffect(() => {
    fetchPib();
  }, [fetchPib]);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          fetchPib();
          return REFRESH_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [fetchPib]);

  return (
    <PageLayout
      crumbs={[{ label: 'Comercio', href: '/comercio' }, { label: 'PIB' }]}
      heroTag="Secretaría de Estado de Comercio"
      heroTitle="Producto Interior Bruto (PIB) del Reino del Pan"
      heroSubtitle="Evolución de las arcas del Reino en tiempo real."
    >
      <style>{`
        @keyframes pib-pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.55); }
          70% { box-shadow: 0 0 0 7px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
        @keyframes pib-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pib-card {
          animation: pib-fade-in 0.4s ease-out;
        }
        .pib-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d4af37;
          animation: pib-pulse-dot 1.6s infinite;
        }
        .pib-range-group {
          display: flex;
          gap: 0.4rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }
        .pib-range-btn {
          font-size: 0.8rem;
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted-foreground);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .pib-range-btn:hover {
          border-color: #d4af37;
          color: #1f2937;
        }
        .pib-range-btn.active {
          background: #d4af37;
          border-color: #d4af37;
          color: #1f2937;
          font-weight: 600;
        }
      `}</style>

      <div className="section">
        <div className="container subpage-grid">
          <SideNav title="Comercio" items={SIDE} />
          <div>
            <div
              className="pib-card"
              style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.1rem', margin: 0, textAlign: 'center' }}>
                  Evolución del PIB (panedas)
                </h3>
                <div style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                  <span className="pib-live-dot" />
                  <span>{fetching ? 'Actualizando…' : `Se refrescará en ${formatCountdown(secondsLeft)}`}</span>
                </div>
              </div>

              <div className="pib-range-group">
                {RANGES.map(r => (
                  <button
                    key={r.key}
                    onClick={() => setRange(r.key)}
                    className={`pib-range-btn${range === r.key ? ' active' : ''}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📈</div>
                  <p>Consultando las arcas del Reino...</p>
                </div>
              ) : filteredHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🗓️</div>
                  <p>Todavía no hay suficiente histórico para mostrar este periodo. Vuelve más adelante.</p>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  width={700}
                  height={350}
                  style={{ width: '100%', height: 'auto', aspectRatio: '700/350' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}