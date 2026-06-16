import { useState } from 'react';

function fmt(n: number) {
  return n?.toLocaleString('es-ES') ?? '0';
}

export default function TabTransferencia({ senderDiscordId, bank }: { senderDiscordId: string; bank: number }) {
  const [dpi, setDpi] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit() {
    if (!dpi.trim() || !amount || Number(amount) <= 0) {
      setMsg('Rellena todos los campos correctamente.');
      setStatus('error');
      return;
    }
    if (Number(amount) > bank) {
      setMsg('No tienes suficiente saldo en el banco.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/lpb/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from_discord_id: senderDiscordId, to_dpi: dpi.trim(), amount: Number(amount) }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('ok');
        setMsg(`Transferencia de ${fmt(Number(amount))} 🪙 realizada correctamente.`);
        setDpi(''); setAmount('');
      } else {
        setStatus('error');
        setMsg(data.error ?? 'Error desconocido.');
      }
    } catch {
      setStatus('error');
      setMsg('Error de red.');
    }
  }

  return (
    <div style={{ maxWidth: '480px' }}>
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--display-font)', marginBottom: '1.25rem', fontSize: '1rem' }}>Enviar dinero</h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>DPI del destinatario</label>
          <input
            value={dpi}
            onChange={e => setDpi(e.target.value)}
            placeholder="DPI - 000123Z"
            style={{
              width: '100%', padding: '0.6rem 0.9rem', borderRadius: 'var(--radius)',
              border: '1px solid var(--border)', background: 'var(--background)',
              color: 'var(--foreground)', fontSize: '0.95rem', boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
            Cantidad <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>(saldo bancario: {fmt(bank)} 🪙)</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="1000"
            min={1}
            style={{
              width: '100%', padding: '0.6rem 0.9rem', borderRadius: 'var(--radius)',
              border: '1px solid var(--border)', background: 'var(--background)',
              color: 'var(--foreground)', fontSize: '0.95rem', boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.7rem', fontSize: '1rem', opacity: status === 'loading' ? 0.7 : 1 }}
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