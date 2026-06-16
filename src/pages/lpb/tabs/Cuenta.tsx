import { Economy, DashboardUser } from '../../../lib/lpb/types';

function fmt(n: number) {
  return n?.toLocaleString('es-ES') ?? '0';
}

export default function TabCuenta({ economy, user }: { economy: Economy | null; user: DashboardUser }) {
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.png?size=128`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;

  if (!economy) {
    return (
      <div className="alert alert-info">
        <span>ℹ️</span>
        <span>No se encontraron datos económicos para tu cuenta. Interactúa en el servidor de Discord para generar tu perfil.</span>
      </div>
    );
  }

  const total = (economy.cash ?? 0) + (economy.bank ?? 0);
  const inventoryEntries = economy.inventory ? Object.entries(economy.inventory).filter(([, v]) => (v as number) > 0) : [];

  return (
    <div>
      {/* perfil */}
      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
        <img src={avatarUrl} alt="Avatar" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid var(--gold)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{user.discord_username}</div>
          <div style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>Verificado</span> · {user.dpi ?? '—'}
          </div>
        </div>
      </div>

      {/* saldos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Efectivo', value: economy.cash, icon: '💵' },
          { label: 'Banco',    value: economy.bank, icon: '🏦' },
          { label: 'Total',    value: total,         icon: '💰' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{icon}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{fmt(value)} 🪙</div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* stats */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', fontSize: '1rem' }}>Estadísticas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'Total ganado',  value: fmt(economy.total_earned) + ' 🪙' },
            { label: 'Total gastado', value: fmt(economy.total_spent)  + ' 🪙' },
            { label: 'Miembro desde', value: economy.created_at ? new Date(economy.created_at).toLocaleDateString('es-ES') : '—' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--muted)', borderRadius: 'var(--radius)', padding: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>{label}</div>
              <div style={{ fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* inventario */}
      {inventoryEntries.length > 0 && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', fontSize: '1rem' }}>Inventario</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {inventoryEntries.map(([item, qty]) => (
              <span key={item} style={{
                padding: '0.3rem 0.75rem', borderRadius: '999px',
                background: 'var(--muted)', fontSize: '0.85rem', fontWeight: 600,
              }}>
                {item} <span style={{ color: 'var(--gold)' }}>×{qty as number}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}