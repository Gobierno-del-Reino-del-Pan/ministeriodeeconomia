import { Economy, DashboardUser, InventoryItem } from '../../../lib/lpb/types';

interface RawInventoryItem {
  inventory_id: string;
  id?: string;
  name?: string;
  type?: string;
  emoji?: string;
  price?: number;
  price_paid?: number;
  rarity?: string;
  quantity?: number;
  available?: boolean;
  stackable?: boolean;
  description?: string;
  purchased_at?: string | null;
  empresa_id?: string;
  empresa_name?: string;
  [key: string]: any;
}

function normalizeItem(raw: RawInventoryItem): InventoryItem {
  const price = raw.price_paid ?? raw.price ?? 0;
  const rarity = raw.rarity || 'common';
  let description = raw.description;
  if (!description && raw.empresa_name) {
    description = `Producto de ${raw.empresa_name}`;
  } else if (!description) {
    description = 'Sin descripción';
  }
  const emoji = raw.emoji || '📦';
  const name = raw.name || raw.empresa_name || 'Objeto';
  const type = raw.type || 'unknown';
  const quantity = raw.quantity ?? 1;
  const available = raw.available !== undefined ? raw.available : true;
  const stackable = raw.stackable !== undefined ? raw.stackable : true;
  const purchased_at = raw.purchased_at || null;

  return {
    inventory_id: raw.inventory_id,
    id: raw.id || '',
    name,
    type,
    emoji,
    price,
    rarity,
    quantity,
    available,
    stackable,
    description,
    purchased_at,
    ...(raw.empresa_id && { empresa_id: raw.empresa_id }),
    ...(raw.empresa_name && { empresa_name: raw.empresa_name }),
    ...(raw.price_paid !== undefined && { price_paid: raw.price_paid }),
  } as InventoryItem;
}

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
  entidad_item: 'Producto de empresa',
};

function InventoryCard({ item }: { item: RawInventoryItem }) {
  const normalized = normalizeItem(item);
  const rarity = RARITY_COLORS[normalized.rarity] || RARITY_COLORS.common;

  const formattedDate = normalized.purchased_at
    ? new Date(normalized.purchased_at).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
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
        <div
          style={{
            fontSize: '2.5rem',
            filter: normalized.available ? 'none' : 'grayscale(1) opacity(0.5)',
          }}
        >
          {normalized.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: '0.95rem',
              marginBottom: '0.2rem',
              color: rarity.text,
            }}
          >
            {normalized.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
            {normalized.description}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                background: rarity.border,
                color: 'white',
                fontWeight: 600,
              }}
            >
              {RARITY_LABELS[normalized.rarity]}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                background: 'var(--muted)',
                color: 'var(--foreground)',
              }}
            >
              {TYPE_LABELS[normalized.type] || normalized.type}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--gold)',
            }}
          >
            {normalized.price.toLocaleString('es-ES')} 🪙
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
            ×{normalized.quantity}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--muted-foreground)',
        }}
      >
        <span>Comprado: {formattedDate}</span>
        <span style={{ fontWeight: 600, color: normalized.available ? 'var(--success)' : 'var(--muted-foreground)' }}>
          {normalized.available ? 'Disponible' : 'No disponible'}
        </span>
      </div>
    </div>
  );
}

export default function TabInventario({ economy, user }: { economy: Economy | null; user: DashboardUser }) {
  const inventory: RawInventoryItem[] = economy?.inventory || [];
  const totalItems = inventory.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
  const totalValue = inventory.reduce((sum, item) => {
    const price = item.price_paid ?? item.price ?? 0;
    return sum + price * (item.quantity ?? 1);
  }, 0);

  const groupedByType = inventory.reduce((acc, item) => {
    const type = item.type || 'unknown';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, RawInventoryItem[]>);

  if (!economy) {
    return (
      <div className="alert alert-info">
        <span>ℹ️</span>
        <span>
          No se encontraron datos económicos para tu cuenta. Interactúa en el servidor de Discord para generar tu perfil.
        </span>
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
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

      {Object.entries(groupedByType).map(([type, items]) => (
        <div key={type} style={{ marginBottom: '1.5rem' }}>
          <h3
            style={{
              fontFamily: 'var(--display-font)',
              fontSize: '1rem',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--muted)',
                borderRadius: 'var(--radius)',
                fontSize: '0.85rem',
              }}
            >
              {TYPE_LABELS[type] || type}
            </span>
            <span style={{ color: 'var(--muted-foreground)', fontWeight: 400, fontSize: '0.85rem' }}>
              ({items.length})
            </span>
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {items.map((item) => (
              <InventoryCard key={item.inventory_id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}