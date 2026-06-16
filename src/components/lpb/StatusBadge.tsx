export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    active:    { label: 'Activo',    color: 'var(--success)' },
    pending:   { label: 'Pendiente', color: 'var(--gold)' },
    completed: { label: 'Pagado',    color: 'var(--muted-foreground)' },
    defaulted: { label: 'Impagado',  color: 'var(--destructive)' },
  };
  const s = map[status] ?? { label: status, color: 'var(--muted-foreground)' };
  return (
    <span style={{
      fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem',
      borderRadius: '999px', background: s.color + '22', color: s.color,
    }}>
      {s.label}
    </span>
  );
}