import { Economy, DashboardUser, InventoryItem } from '../../../lib/lpb/types';

const RARITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  common: { bg: '#f5f5f5', text: '#666', border: '#ddd' },
  uncommon: { bg: '#e6f7e6', text: '#1a7f1a', border: '#4caf50' },
  rare: { bg: '#e6f0fa', text: '#1565c0', border: '#2196f3' },
  epic: { bg: '#f3e5f5', text: '#7b1fa2', border: '#9c27b0' },
  legendary: { bg: '#fff8e1', text: '#f57c00', border: '#ffc107' },
};

const RARITY_LABELS: Record<string, string> = {
  common: 'Común',
  uncommon: 'Poco común',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Legendario',
};

const TYPE_LABELS: Record<string, string> = {
  food: 'Comida',
  tool: 'Herramienta',
  boost: 'Mejora',
  cosmetic: 'Cosmético',
  special: 'Especial',
};

function InventoryCard({ item }: { item: InventoryItem }) {
  const rarity = RARITY_COLORS[item.rarity] || RARITY_COLORS.common;
  const formattedDate = item.purchased_at
    ? new Date(item.purchased_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  return (
    <div
      className="card"
      style={{
        padding: '1rem',
        border: `2px solid ${rarity.border}`,
        background: `linear-gradient(135deg, ${rarity.bg} 0%, white 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div style={{
          fontSize: '2.5rem',
          filter: item.available ? 'none' : 'grayscale(1) opacity(0.5)',
        }}>
          {item.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem', color: rarity.text }}>
            {item.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
            {item.description}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              background: rarity.border,
              color: 'white',
              fontWeight: 600,
            }}>
              {RARITY_LABELS[item.rarity]}
            </span>
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              background: 'var(--muted)',
              color: 'var(--foreground)',
            }}>
              {TYPE_LABELS[item.type] || item.type}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--gold)',
          }}>
            {item.price.toLocaleString('es-ES')} 🪙
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
            ×{item.quantity}
          </div>
        </div>
      </div>
      <div style={{
        marginTop: '0.75rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.75rem',
        color: 'var(--muted-foreground)',
      }}>
        <span>Comprado: {formattedDate}</span>
        <span style={{ fontWeight: 600, color: item.available ? 'var(--success)' : 'var(--muted-foreground)' }}>
          {item.available ? 'Disponible' : 'No disponible'}
        </span>
      </div>
    </div>
  );
}

export default function TabInventario({ economy, user }: { economy: Economy | null; user: DashboardUser }) {
  const inventory: InventoryItem[] = economy?.inventory || [];
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const groupedByType = inventory.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  if (!economy) {
    return (
      <div className="alert alert-info">
        <span>ℹ️</span>
        <span>No se encontraron datos económicos para tu cuenta. Interactúa en el servidor de Discord para generar tu perfil.</span>
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎒</div>
        <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
          Tu inventario está vacío
        </h3>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
          Visita la tienda en Discord para comprar objetos y mejorar tu experiencia en el Reino del Pan.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Resumen */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>🎒</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{inventory.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Objetos únicos</div>
        </div>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>📊</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalItems}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Total objetos</div>
        </div>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>💰</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalValue.toLocaleString('es-ES')}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Valor total 🪙</div>
        </div>
      </div>

      {/* Inventario agrupado por tipo */}
      {Object.entries(groupedByType).map(([type, items]) => (
        <div key={type} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--display-font)',
            fontSize: '1rem',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              background: 'var(--muted)',
              borderRadius: 'var(--radius)',
              fontSize: '0.85rem',
            }}>
              {TYPE_LABELS[type] || type}
            </span>
            <span style={{ color: 'var(--muted-foreground)', fontWeight: 400, fontSize: '0.85rem' }}>
              ({items.length})
            </span>
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {items.map((item) => (
              <InventoryCard key={item.inventory_id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
