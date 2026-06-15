import { Link } from 'wouter';

interface Crumb { label: string; href?: string; }

export default function BreadcrumbNav({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="breadcrumb">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
        <Link href="/">Inicio</Link>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#aaa' }}>›</span>
            {c.href
              ? <Link href={c.href}>{c.label}</Link>
              : <span style={{ color: 'var(--foreground)' }}>{c.label}</span>
            }
          </span>
        ))}
      </div>
    </div>
  );
}
