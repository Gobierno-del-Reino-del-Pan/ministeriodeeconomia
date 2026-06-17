import StatusBadge from '../../../components/lpb/StatusBadge';
import { Prestamo } from '../../../lib/lpb/types';

function fmt(n: number) {
  return n?.toLocaleString('es-ES') ?? '0';
}

export default function TabPrestamos({ prestamos, discordId }: { prestamos: Prestamo[]; discordId: string }) {
  const activos   = prestamos.filter(p => p.status === 'active' && p.borrower_id === discordId);
  const prestados = prestamos.filter(p => p.lender_id === discordId);
  const historial = prestamos.filter(p => p.status !== 'active' && p.borrower_id === discordId);

  function PrestamoCard({ p }: { p: Prestamo }) {
    const progress = p.total_days > 0
      ? Math.min(100, Math.round(((new Date().getTime() - new Date(p.start_date).getTime()) / (1000 * 60 * 60 * 24)) / p.total_days * 100))
      : 0;

    return (
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ fontWeight: 700 }}>{p.loan_name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.15rem' }}>
              {new Date(p.start_date).toLocaleDateString('es-ES')} → {new Date(p.end_date).toLocaleDateString('es-ES')}
            </div>
          </div>
          <StatusBadge status={p.status} />
        </div>
        <div className="lpb-prestamos-grid" style={{ marginBottom: '0.75rem' }}>          {[
            { label: 'Capital',        value: fmt(p.amount) + ' 🪙' },
            { label: 'Total a pagar',  value: fmt(p.total_amount) + ' 🪙' },
            { label: 'Cuota diaria',   value: fmt(p.daily_payment) + ' 🪙' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--muted)', borderRadius: 'var(--radius)', padding: '0.5rem 0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>{label}</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{value}</div>
            </div>
          ))}
        </div>
        {p.status === 'active' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.3rem' }}>
              <span>Progreso</span><span>{progress}%</span>
            </div>
            <div style={{ height: '6px', background: 'var(--muted)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gold)', borderRadius: '999px', transition: 'width 0.3s' }} />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (prestamos.length === 0) {
    return (
      <div className="alert alert-info">
        <span>ℹ️</span>
        <span>No tienes préstamos registrados.</span>
      </div>
    );
  }

  return (
    <div>
      {activos.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem' }}>Préstamos activos</h3>
          {activos.map(p => <PrestamoCard key={p.id} p={p} />)}
        </div>
      )}
      {prestados.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem' }}>Préstamos concedidos</h3>
          {prestados.map(p => <PrestamoCard key={p.id} p={p} />)}
        </div>
      )}
      {historial.length > 0 && (
        <div>
          <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem' }}>Historial</h3>
          {historial.map(p => <PrestamoCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}