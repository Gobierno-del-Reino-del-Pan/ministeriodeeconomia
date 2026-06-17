import { useEffect, useState, useCallback } from 'react';
import { Link } from 'wouter';
import { DashboardUser, Economy } from '../../../lib/lpb/types';

function fmt(n: number) {
  return n.toLocaleString('es-ES');
}

// Genera un ID aleatorio de 3 letras mayúsculas + 3 dígitos
function generateProductId(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  let id = '';
  for (let i = 0; i < 3; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 3; i++) {
    id += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return id;
}

interface Empresa {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  balance: number;
  emoji: string;
  created_at: string;
}

interface Producto {
  id: string;
  empresa_id: string;
  product_id: string;
  name: string;
  description: string | null;
  price: number;
  emoji: string;
  category: string;
  stackable: boolean;
  created_at: string;
}

type TabView = 'list' | 'detail' | 'edit' | 'add-product' | 'edit-product';

// Modal de confirmación personalizado
function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  danger = false,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}) {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onCancel}
    >
      <div
        className="card"
        style={{
          maxWidth: '420px',
          width: '90%',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'scaleIn 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{danger ? '⚠️' : '❓'}</div>
        <h3 style={{ fontFamily: 'var(--display-font)', margin: '0 0 0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>{message}</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '0.5rem 1.5rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              background: 'var(--background)',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="btn"
            style={{
              padding: '0.5rem 1.5rem',
              fontSize: '0.9rem',
              background: danger ? 'var(--error)' : 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TabEmpresa({ economy, user }: { economy: Economy | null; user: DashboardUser }) {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [view, setView] = useState<TabView>('list');

  // Editar empresa
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editEmoji, setEditEmoji] = useState('');
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  // Producto
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodEmoji, setProdEmoji] = useState('📦');
  const [prodCategory, setProdCategory] = useState('general');
  const [prodStackable, setProdStackable] = useState(true);
  const [prodError, setProdError] = useState('');
  const [prodLoading, setProdLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);

  // Modal confirmación
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    danger?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    danger: false,
  });

  // Cargar empresas
  const loadEmpresas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/lpb/empresas', { credentials: 'include' });
      if (!res.ok) throw new Error('Error al cargar empresas');
      const data = await res.json();
      setEmpresas(data.empresas ?? []);
    } catch (err: any) {
      setError(err.message || 'No se pudieron cargar tus empresas.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProductos = useCallback(async (empresaId: string) => {
    try {
      const res = await fetch(`/api/lpb/empresas/${empresaId}/productos`, { credentials: 'include' });
      const data = await res.json();
      setProductos(data.productos ?? []);
    } catch {
      setProductos([]);
    }
  }, []);

  useEffect(() => {
    loadEmpresas();
  }, [loadEmpresas]);

  const selectEmpresa = (emp: Empresa) => {
    setSelectedEmpresa(emp);
    setEditName(emp.name);
    setEditDesc(emp.description || '');
    setEditEmoji(emp.emoji);
    setView('detail');
    loadProductos(emp.id);
  };

  // Editar empresa
  const handleEditEmpresa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpresa) return;
    setEditLoading(true);
    setEditError('');
    try {
      const res = await fetch(`/api/lpb/empresas/${selectedEmpresa.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, description: editDesc, emoji: editEmoji }),
      });
      const data = await res.json();
      if (data.ok) {
        setSelectedEmpresa(data.empresa);
        setView('detail');
        loadEmpresas();
      } else {
        setEditError(data.error || 'Error al actualizar');
      }
    } catch {
      setEditError('Error de conexión');
    }
    setEditLoading(false);
  };

  // Eliminar empresa
  const handleDeleteEmpresa = () => {
    if (!selectedEmpresa) return;
    setConfirmModal({
      isOpen: true,
      title: `Eliminar "${selectedEmpresa.name}"`,
      message: 'Esta acción es irreversible y se borrarán todos los productos asociados. ¿Estás seguro?',
      danger: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/lpb/empresas/${selectedEmpresa.id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          const data = await res.json();
          if (data.ok) {
            setSelectedEmpresa(null);
            setView('list');
            loadEmpresas();
          } else {
            alert(data.error || 'Error al eliminar');
          }
        } catch {
          alert('Error de conexión');
        }
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  };

  // Crear/editar producto
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpresa) return;
    setProdLoading(true);
    setProdError('');

    const rawName = prodName.trim();
    if (!rawName) {
      setProdError('El nombre es obligatorio.');
      setProdLoading(false);
      return;
    }

    if (prodPrice < 0) {
      setProdError('El precio no puede ser negativo.');
      setProdLoading(false);
      return;
    }

    // Generar ID automático si es nuevo producto
    let productId = editingProduct ? editingProduct.product_id : generateProductId();

    // Si es edición, no regeneramos el ID

    const payload = {
      product_id: productId,
      name: rawName,
      description: prodDesc.trim(),
      price: prodPrice,
      emoji: prodEmoji,
      category: prodCategory,
      stackable: prodStackable,
    };

    try {
      const url = editingProduct
        ? `/api/lpb/empresas/${selectedEmpresa.id}/productos/${editingProduct.id}`
        : `/api/lpb/empresas/${selectedEmpresa.id}/productos`;
      const method = editingProduct ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.ok) {
        resetProductForm();
        setView('detail');
        loadProductos(selectedEmpresa.id);
      } else {
        // Si el error es por ID duplicado, regenerar y reintentar (opcional)
        if (data.error && data.error.includes('duplicado')) {
          // Regeneramos el ID y lo mostramos al usuario para que reintente
          const newId = generateProductId();
          setProdError(`El ID generado ya existe, reintenta con el nuevo ID: ${newId}`);
          // Podríamos actualizar el payload, pero mejor dejamos que el usuario pulse de nuevo
        } else {
          setProdError(data.error || 'Error al guardar el producto');
        }
      }
    } catch {
      setProdError('Error de conexión');
    }
    setProdLoading(false);
  };

  const handleDeleteProduct = (prod: Producto) => {
    if (!selectedEmpresa) return;
    setConfirmModal({
      isOpen: true,
      title: `Eliminar "${prod.name}"`,
      message: '¿Estás seguro de que quieres eliminar este producto?',
      danger: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/lpb/empresas/${selectedEmpresa.id}/productos/${prod.id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          const data = await res.json();
          if (data.ok) {
            loadProductos(selectedEmpresa.id);
          }
        } catch { /* */ }
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  };

  const resetProductForm = () => {
    setProdName('');
    setProdDesc('');
    setProdPrice(0);
    setProdEmoji('📦');
    setProdCategory('general');
    setProdStackable(true);
    setProdError('');
    setProdLoading(false);
    setEditingProduct(null);
  };

  const startEditProduct = (prod: Producto) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdDesc(prod.description || '');
    setProdPrice(prod.price);
    setProdEmoji(prod.emoji);
    setProdCategory(prod.category);
    setProdStackable(prod.stackable);
    setView('edit-product');
  };

  const startAddProduct = () => {
    resetProductForm();
    // Generamos un ID inicial para mostrar (aunque no se muestra al usuario)
    setView('add-product');
  };

  // ── VIEW: LIST ──
  if (view === 'list') {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.1rem', margin: 0 }}>Mis Empresas</h3>
          <Link to="/lpb/tramites/crear-empresa">
            <a className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              + Crear empresa
            </a>
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>Cargando tus empresas...</div>
        ) : error ? (
          <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
            <span>❌</span>
            <span>{error}</span>
          </div>
        ) : empresas.length === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏢</div>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }}>Aún no tienes ninguna empresa.</p>
            <Link to="/lpb/tramites/crear-empresa">
              <a className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.5rem' }}>
                Crear mi primera empresa
              </a>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {empresas.map(emp => (
              <div
                key={emp.id}
                className="card"
                onClick={() => selectEmpresa(emp)}
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'transform 0.15s',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{emp.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{emp.name}</div>
                  {emp.description && (
                    <div style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{emp.description}</div>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, color: 'var(--gold)' }}>{fmt(emp.balance)} 🪙</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Balance</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--muted-foreground)' }}>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            ))}
          </div>
        )}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          danger={confirmModal.danger}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        />
      </>
    );
  }

  // ── VIEW: EDIT EMPRESA ──
  if (view === 'edit' && selectedEmpresa) {
    return (
      <>
        <button
          onClick={() => { setView('detail'); setEditError(''); }}
          style={{ marginBottom: '1rem', padding: '0.4rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          ← Volver
        </button>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', fontSize: '1rem' }}>Editar empresa</h3>
          <form onSubmit={handleEditEmpresa}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Nombre</label>
              <input
                type="text" value={editName} onChange={e => setEditName(e.target.value)} maxLength={50}
                style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'var(--background)', color: 'var(--foreground)' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Descripción</label>
              <textarea
                value={editDesc} onChange={e => setEditDesc(e.target.value)} maxLength={300} rows={3}
                style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'var(--background)', color: 'var(--foreground)', resize: 'vertical' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Emoji</label>
              <input
                type="text" value={editEmoji} onChange={e => setEditEmoji(e.target.value)} maxLength={4}
                style={{ width: '60px', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '1.2rem', textAlign: 'center', background: 'var(--background)', color: 'var(--foreground)' }}
              />
            </div>
            {editError && (
              <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
                <span>❌</span><span>{editError}</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary" disabled={editLoading} style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', opacity: editLoading ? 0.5 : 1 }}>
                {editLoading ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <button type="button" onClick={() => setView('detail')} style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  // ── VIEW: ADD / EDIT PRODUCT ──
  if ((view === 'add-product' || view === 'edit-product') && selectedEmpresa) {
    // Para nuevo producto, generamos un ID que se mostrará (opcional) pero no editable
    const displayProductId = editingProduct ? editingProduct.product_id : 'AUTO-GENERADO';

    return (
      <>
        <button
          onClick={() => { setView('detail'); resetProductForm(); }}
          style={{ marginBottom: '1rem', padding: '0.4rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          ← Volver a {selectedEmpresa.name}
        </button>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1rem', fontSize: '1rem' }}>
            {editingProduct ? 'Editar producto' : 'Nuevo producto'}
          </h3>
          <form onSubmit={handleProductSubmit}>
            {/* Mostramos el ID (solo lectura) */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>ID del producto</label>
              <div style={{
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                background: 'var(--muted)',
                color: 'var(--muted-foreground)',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
              }}>
                {displayProductId}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>
                {editingProduct ? 'ID fijo (no editable)' : 'Se generará automáticamente al guardar (3 letras + 3 números)'}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Nombre <span style={{ color: 'var(--error)' }}>*</span></label>
              <input
                type="text"
                value={prodName}
                onChange={e => setProdName(e.target.value)}
                placeholder="Ej: Pan integral"
                maxLength={50}
                required
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  fontSize: '0.9rem',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Descripción</label>
              <textarea
                value={prodDesc}
                onChange={e => setProdDesc(e.target.value)}
                maxLength={300}
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  fontSize: '0.9rem',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  resize: 'vertical',
                }}
              />
            </div>

            <div className="product-form-grid" style={{ marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Precio (🪙) <span style={{ color: 'var(--error)' }}>*</span></label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setProdPrice(Math.max(0, prodPrice - 1))}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)',
                      background: 'var(--background)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      lineHeight: 1,
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={prodPrice}
                    onChange={e => setProdPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    min={0}
                    step={1}
                    style={{
                      width: '80px',
                      padding: '0.4rem 0.5rem',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)',
                      fontSize: '0.9rem',
                      background: 'var(--background)',
                      color: 'var(--foreground)',
                      textAlign: 'center',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setProdPrice(prodPrice + 1)}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)',
                      background: 'var(--background)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      lineHeight: 1,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Emoji</label>
                <input
                  type="text"
                  value={prodEmoji}
                  onChange={e => setProdEmoji(e.target.value)}
                  maxLength={4}
                  style={{
                    width: '60px',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Categoría</label>
                <select
                  value={prodCategory}
                  onChange={e => setProdCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    fontSize: '0.9rem',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                  }}
                >
                  <option value="general">General</option>
                  <option value="alimentacion">Alimentación</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="servicios">Servicios</option>
                  <option value="entretenimiento">Entretenimiento</option>
                  <option value="transporte">Transporte</option>
                  <option value="salud">Salud</option>
                  <option value="educacion">Educación</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={prodStackable}
                  onChange={e => setProdStackable(e.target.checked)}
                />
                Apilable (se pueden comprar varias unidades)
              </label>
            </div>

            {prodError && (
              <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
                <span>❌</span><span>{prodError}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={prodLoading || !prodName.trim()}
                style={{
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.9rem',
                  opacity: (prodLoading || !prodName.trim()) ? 0.5 : 1,
                }}
              >
                {prodLoading ? 'Guardando...' : editingProduct ? 'Guardar cambios' : 'Crear producto'}
              </button>
              <button
                type="button"
                onClick={() => { setView('detail'); resetProductForm(); }}
                style={{
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.9rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--background)',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  // ── VIEW: DETAIL ──
  if (selectedEmpresa) {
    return (
      <>
        <button
          onClick={() => { setSelectedEmpresa(null); setView('list'); }}
          style={{ marginBottom: '1rem', padding: '0.4rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          ← Mis empresas
        </button>

        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{selectedEmpresa.emoji}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--display-font)', fontSize: '1.2rem', margin: 0 }}>{selectedEmpresa.name}</h3>
              {selectedEmpresa.description && (
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: '0.3rem 0 0' }}>{selectedEmpresa.description}</p>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--gold)' }}>{fmt(selectedEmpresa.balance)} 🪙</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Balance empresa</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setView('edit')}
              style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
            >
              ✏️ Editar
            </button>
            <button
              onClick={handleDeleteEmpresa}
              style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem', border: '1px solid var(--error)', borderRadius: 'var(--radius)', background: 'var(--background)', color: 'var(--error)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h4 style={{ fontFamily: 'var(--display-font)', fontSize: '1rem', margin: 0 }}>Productos de la tienda ({productos.length})</h4>
          <button
            onClick={startAddProduct}
            className="btn btn-primary"
            style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
          >
            + Añadir producto
          </button>
        </div>

        {productos.length === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📦</div>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>No hay productos en la tienda. Añade el primero.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {productos.map(prod => (
              <div key={prod.id} className="card lpb-product-item">
                <div className="lpb-product-header">
                  <span style={{ fontSize: '1.5rem' }}>{prod.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{prod.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                      ID: {prod.product_id} · {prod.category} {prod.stackable ? '· Apilable' : ''}
                    </div>
                    {prod.description && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.15rem' }}>{prod.description}</div>
                    )}
                  </div>
                </div>
                <div className="lpb-product-footer">
                  <div style={{ fontWeight: 600, color: 'var(--gold)', whiteSpace: 'nowrap' }}>{fmt(prod.price)} 🪙</div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => startEditProduct(prod)}
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)', cursor: 'pointer' }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod)}
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', border: '1px solid var(--error)', borderRadius: 'var(--radius)', background: 'var(--background)', color: 'var(--error)', cursor: 'pointer' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          danger={confirmModal.danger}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        />
      </>
    );
  }

  return null;
}