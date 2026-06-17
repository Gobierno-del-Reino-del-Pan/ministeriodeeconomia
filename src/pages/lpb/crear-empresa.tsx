import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import PageLayout from '../../components/PageLayout';
import { useAuth } from '../../lib/auth';

const EMPRESA_COST = 750000;

export default function LpbCrearEmpresa() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('🏢');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [createdEmpresa, setCreatedEmpresa] = useState<{ id: string; name: string; emoji: string } | null>(null);
  const [hasEmpresa, setHasEmpresa] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  // Verificar si el usuario ya tiene empresa
  useEffect(() => {
    const checkEmpresa = async () => {
      if (!user) {
        setChecking(false);
        return;
      }
      try {
        const res = await fetch('/api/lpb/empresas', { credentials: 'include' });
        const data = await res.json();
        const empresas = data.empresas ?? [];
        setHasEmpresa(empresas.length > 0);
      } catch {
        setHasEmpresa(false);
      } finally {
        setChecking(false);
      }
    };
    checkEmpresa();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Transformar nombre: espacios a guiones, eliminar caracteres especiales
    const rawName = name.trim();
    if (rawName.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.');
      return;
    }
    // Slug: minúsculas, espacios y otros no alfanuméricos a guiones, eliminar guiones dobles
    const slugName = rawName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    if (!slugName) {
      setError('El nombre solo puede contener letras, números y guiones.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/lpb/empresas', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: slugName, description: description.trim(), emoji }),
      });
      const data = await res.json();

      if (data.ok) {
        setSuccess(true);
        setCreatedEmpresa(data.empresa);
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.');
    }
    setLoading(false);
  };

  const EMOJI_OPTIONS = ['🏢', '🏪', '🏭', '🛒', '🍔', '☕', '🛍️', '💊', '🚗', '📱', '💻', '🎮', '📚', '🎵', '🎨', '🔧', '🧪', '🏠'];

  // Mientras se verifica
  if (checking) {
    return (
      <PageLayout
        crumbs={[{ label: 'LPB' }, { label: 'Trámites', href: '/lpb/tramites' }, { label: 'Crear Empresa' }]}
        heroTag="Ministerio de Economía, Comercio y Empresa"
        heroTitle="Crear Empresa"
        heroSubtitle="Registra tu empresa en el Reino del Pan por 750.000 panedas."
      >
        <div className="section">
          <div className="container" style={{ maxWidth: '720px', textAlign: 'center', padding: '2rem' }}>
            <p>Cargando...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Si ya tiene empresa, mostrar mensaje y enlace a gestión
  if (hasEmpresa) {
    return (
      <PageLayout
        crumbs={[{ label: 'LPB' }, { label: 'Trámites', href: '/lpb/tramites' }, { label: 'Crear Empresa' }]}
        heroTag="Ministerio de Economía, Comercio y Empresa"
        heroTitle="Crear Empresa"
        heroSubtitle="Registra tu empresa en el Reino del Pan por 750.000 panedas."
      >
        <div className="section">
          <div className="container" style={{ maxWidth: '720px' }}>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
              <h2 style={{ fontFamily: 'var(--display-font)', marginBottom: '0.5rem' }}>
                Ya tienes una empresa
              </h2>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
                Cada ciudadano solo puede registrar una empresa. Puedes gestionar la tuya desde el panel.
              </p>
              <Link to="/lpb/empresa">
                <a className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.5rem' }}>
                  Gestionar mi empresa
                </a>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      crumbs={[{ label: 'LPB' }, { label: 'Trámites', href: '/lpb/tramites' }, { label: 'Crear Empresa' }]}
      heroTag="Ministerio de Economía, Comercio y Empresa"
      heroTitle="Crear Empresa"
      heroSubtitle="Registra tu empresa en el Reino del Pan por 750.000 panedas."
    >
      <div className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Link to="/lpb/tramites">
              <a
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius)',
                  background: 'var(--muted)',
                  color: 'var(--foreground)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--muted)')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver a Trámites
              </a>
            </Link>
          </div>

          {success && createdEmpresa ? (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontFamily: 'var(--display-font)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                ¡Empresa creada con éxito!
              </h2>
              <div style={{
                background: 'var(--muted)',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}>
                <span style={{ fontSize: '2rem' }}>{createdEmpresa.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{createdEmpresa.name}</span>
              </div>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
                Se han descontado <strong>{EMPRESA_COST.toLocaleString('es-ES')} panedas</strong> de tu cuenta bancaria.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/lpb/empresa">
                  <a className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none' }}>
                    Gestionar mi empresa
                  </a>
                </Link>
                <Link to="/lpb/tramites">
                  <a style={{
                    padding: '0.6rem 1.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    textDecoration: 'none',
                    color: 'var(--foreground)',
                  }}>
                    Volver a Trámites
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
                <span>💰</span>
                <div>
                  <strong>Coste de registro:</strong> {EMPRESA_COST.toLocaleString('es-ES')} panedas se descontarán de tu cuenta bancaria al crear la empresa. Asegúrate de tener saldo suficiente.
                </div>
              </div>

              {!user ? (
                <div className="alert alert-warning" style={{ marginBottom: '1rem' }}>
                  <span>⚠️</span>
                  <span>Debes <Link to="/lpb/cuenta">iniciar sesión</Link> para crear una empresa.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
                  {/* Emoji selector */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      Icono de la empresa
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {EMOJI_OPTIONS.map(e => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => setEmoji(e)}
                          style={{
                            width: '44px',
                            height: '44px',
                            fontSize: '1.4rem',
                            border: emoji === e ? '2px solid var(--gold)' : '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            background: emoji === e ? 'var(--muted)' : 'var(--background)',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nombre */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      Nombre de la empresa <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ej: Panadería del Reino"
                      maxLength={50}
                      required
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        fontSize: '0.95rem',
                        background: 'var(--background)',
                        color: 'var(--foreground)',
                      }}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                      {name.length}/50 caracteres (se usará como identificador: espacios → guiones)
                    </div>
                  </div>

                  {/* Descripción */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      Descripción
                    </label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Describe brevemente tu empresa..."
                      maxLength={300}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        fontSize: '0.95rem',
                        background: 'var(--background)',
                        color: 'var(--foreground)',
                        resize: 'vertical',
                      }}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                      {description.length}/300 caracteres
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
                      <span>❌</span>
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !name.trim()}
                    style={{
                      padding: '0.75rem 2rem',
                      fontSize: '1rem',
                      opacity: (loading || !name.trim()) ? 0.5 : 1,
                      cursor: (loading || !name.trim()) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {loading ? 'Creando empresa...' : `Crear empresa (${EMPRESA_COST.toLocaleString('es-ES')} 🪙)`}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}