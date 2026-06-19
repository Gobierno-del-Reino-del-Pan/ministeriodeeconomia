import { useState } from 'react';

function fmt(n: number) {
  return n?.toLocaleString('es-ES') ?? '0';
}


function isValidDpi(dpi: string): boolean {

  const clean = dpi.replace(/[\s-]/g, '');

  return /^\d{6}[A-Z]$/.test(clean);
}

export default function TabTransferencia({ senderDiscordId, bank }: { senderDiscordId: string; bank: number }) {
  const [dpi, setDpi] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit() {
    // Validar campos
    if (!dpi.trim()) {
      setMsg('Introduce el DPI del destinatario.');
      setStatus('error');
      return;
    }
    if (!isValidDpi(dpi)) {
      setMsg('El formato del DPI no es válido. Debe tener 6 dígitos y una letra mayúscula (ej: 123456Z).');
      setStatus('error');
      return;
    }
    const amountNum = Number(amount);
    if (!amount || amountNum <= 0) {
      setMsg('Introduce una cantidad válida mayor que 0.');
      setStatus('error');
      return;
    }
    if (amountNum > bank) {
      setMsg(`No tienes suficiente saldo. Tu saldo es ${fmt(bank)} 🪙.`);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMsg('');

    try {
      const res = await fetch('/api/lpb/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_discord_id: senderDiscordId,
          to_dpi: dpi.trim(),
          amount: amountNum,
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setStatus('ok');
        setMsg(`Transferencia de ${fmt(amountNum)} 🪙 realizada correctamente.`);
        setDpi('');
        setAmount('');
        // Si tienes una función para refrescar el saldo, llámala aquí
        // refreshBank(); 
      } else {
        setStatus('error');
        // Mostrar mensaje de error específico del backend
        setMsg(data.error ?? 'Error desconocido. Inténtalo de nuevo.');
      }
    } catch {
      setStatus('error');
      setMsg('Error de conexión. Comprueba tu red e inténtalo de nuevo.');
    }
  }

  // Limpiar mensaje al cambiar campos
  function handleDpiChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDpi(e.target.value);
    if (status === 'error' || status === 'ok') {
      setStatus('idle');
      setMsg('');
    }
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
    if (status === 'error' || status === 'ok') {
      setStatus('idle');
      setMsg('');
    }
  }

  return (
    <div style={{ maxWidth: '480px' }}>
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1.25rem', fontSize: '1rem' }}>Enviar dinero</h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
            DPI del destinatario
          </label>
          <input
            value={dpi}
            onChange={handleDpiChange}
            placeholder="Ej: 123456Z"
            style={{
              width: '100%',
              padding: '0.6rem 0.9rem',
              borderRadius: 'var(--radius)',
              border: `1px solid ${status === 'error' && msg.includes('DPI') ? 'var(--error)' : 'var(--border)'}`,
              background: 'var(--background)',
              color: 'var(--foreground)',
              fontSize: '0.95rem',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
            Formato: 6 dígitos + 1 letra mayúscula (sin espacios ni guiones)
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
            Cantidad <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>(saldo bancario: {fmt(bank)} 🪙)</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="1000"
            min={1}
            style={{
              width: '100%',
              padding: '0.6rem 0.9rem',
              borderRadius: 'var(--radius)',
              border: `1px solid ${status === 'error' && msg.includes('cantidad') ? 'var(--error)' : 'var(--border)'}`,
              background: 'var(--background)',
              color: 'var(--foreground)',
              fontSize: '0.95rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '0.7rem',
            fontSize: '1rem',
            opacity: status === 'loading' ? 0.7 : 1,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar transferencia'}
        </button>

        {msg && (
          <div className={`alert alert-${status === 'ok' ? 'success' : 'error'}`} style={{ marginTop: '1rem' }}>
            <span>{status === 'ok' ? '✅' : '⚠️'}</span>
            <span>{msg}</span>
          </div>
        )}
      </div>
    </div>
  );
}