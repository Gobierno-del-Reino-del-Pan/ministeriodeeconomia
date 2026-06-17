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
const MANUAL_COOLDOWN = 5 * 60 * 1000; // 5 minutos

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
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dibujar gráfica
  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 1) return;
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

    // Etiquetas eje X
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px system-ui, sans-serif';
    const stepX = history.length > 1 ? chartWidth / (history.length - 1) : 0;
    const labelEvery = Math.max(1, Math.floor(history.length / 8));
    history.forEach((h, i) => {
      if (history.length > 1 && i % labelEvery !== 0 && i !== history.length - 1) return;
      const x = padding.left + i * stepX;
      const date = new Date(h.timestamp);
      ctx.fillText(date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }), x, height - padding.bottom + 18);
    });

    // Si solo hay un punto, dibujarlo y mostrar valor
    if (history.length === 1) {
      const h = history[0];
      const x = padding.left + chartWidth / 2;
      const y = padding.top + chartHeight - ((h.balance - yMin) / yRange) * chartHeight;
      // Punto grande
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Etiqueta
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(fmt(h.balance) + ' 🪙', x, y - 16);
      // Mensaje
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillText('Esperando más datos para la tendencia...', x, height - padding.bottom + 40);
      return;
    }

    // Área bajo la línea (solo si hay más de 1 punto)
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
  }, [history]);

  // Redibujar cuando cambie history
  useEffect(() => {
    drawChart();
  }, [drawChart]);

  // Fetch PIB - ahora siempre guarda un valor (0 si no hay datos)
  const fetchPib = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/gobierno/pib');
      const json = await res.json();
      let totalBalance = 0;
      if (json.data && json.data.length > 0) {
        totalBalance = json.data.reduce((sum: number, d: { balance: number }) => sum + (d.balance ?? 0), 0);
      }
      // Si no hay datos o el balance es NaN, usar 0
      if (isNaN(totalBalance)) totalBalance = 0;

      setCurrentBalance(totalBalance);
      setLastUpdate(json.fetched_at || new Date().toISOString());

      setHistory(prev => {
        const now = new Date().toISOString();
        const newEntry: PibSnapshot = { timestamp: now, balance: totalBalance };
        const last = prev[prev.length - 1];
        // Evitar duplicados muy cercanos (< 1 min)
        if (last && Math.abs(new Date(now).getTime() - new Date(last.timestamp).getTime()) < 60000) {
          // Si el último es igual, no añadimos, pero actualizamos el currentBalance
          return prev;
        }
        const updated = [...prev, newEntry];
        const trimmed = updated.length > 200 ? updated.slice(-200) : updated;
        saveHistory(trimmed);
        return trimmed;
      });
    } catch {
      // En caso de error, registrar 0 para tener al menos algo
      setCurrentBalance(0);
      setHistory(prev => {
        const now = new Date().toISOString();
        const newEntry: PibSnapshot = { timestamp: now, balance: 0 };
        const last = prev[prev.length - 1];
        if (last && Math.abs(new Date(now).getTime() - new Date(last.timestamp).getTime()) < 60000) {
          return prev;
        }
        const updated = [...prev, newEntry];
        const trimmed = updated.length > 200 ? updated.slice(-200) : updated;
        saveHistory(trimmed);
        return trimmed;
      });
    }
    setFetching(false);
  }, []);

  // Fetch inicial y auto-refresh
  useEffect(() => {
    fetchPib();
    timerRef.current = setInterval(fetchPib, REFRESH_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchPib]);

  // Manejo de actualización manual con cooldown
  const handleManualRefresh = useCallback(() => {
    if (cooldownRemaining > 0) {
      return;
    }
    fetchPib();
    // Iniciar cooldown
    setCooldownRemaining(MANUAL_COOLDOWN);
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    cooldownTimerRef.current = setInterval(() => {
      setCooldownRemaining(prev => {
        if (prev <= 1000) {
          clearInterval(cooldownTimerRef.current!);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  }, [fetchPib, cooldownRemaining]);

  // Limpiar timer de cooldown al desmontar
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, []);

  const growth = history.length >= 2
    ? ((history[history.length - 1].balance - history[0].balance) / Math.abs(history[0].balance || 1) * 100)
    : 0;

  // Formatear tiempo de cooldown
  const formatCooldown = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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
              {history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📈</div>
                  <p>No hay datos disponibles. Haz clic en "Actualizar ahora" para obtener la primera lectura.</p>
                  <button
                    onClick={handleManualRefresh}
                    disabled={fetching || cooldownRemaining > 0}
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.9rem', opacity: (fetching || cooldownRemaining > 0) ? 0.5 : 1 }}
                  >
                    {fetching ? 'Cargando...' : cooldownRemaining > 0 ? `Espera ${formatCooldown(cooldownRemaining)}` : 'Actualizar ahora'}
                  </button>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  width={700}
                  height={350}
                  style={{ width: '100%', height: 'auto', aspectRatio: '700/350' }}
                />
              )}
              <div style={{ textAlign: 'center', marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleManualRefresh}
                  disabled={fetching || cooldownRemaining > 0}
                  className="btn btn-primary"
                  style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', opacity: (fetching || cooldownRemaining > 0) ? 0.5 : 1 }}
                >
                  {fetching ? 'Actualizando...' : cooldownRemaining > 0 ? `Espera ${formatCooldown(cooldownRemaining)}` : 'Actualizar ahora'}
                </button>
              </div>
              {cooldownRemaining > 0 && (
                <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
                  ⏳ Puedes volver a actualizar en {formatCooldown(cooldownRemaining)}
                </div>
              )}
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