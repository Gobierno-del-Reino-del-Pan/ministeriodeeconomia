import { Link, useLocation } from 'wouter';

interface Item { label: string; href: string; }

export default function SideNav({ title, items }: { title: string; items: Item[] }) {
  const [location] = useLocation();
  return (
    <aside className="side-nav">
      <div className="side-nav-title">{title}</div>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={location === item.href ? 'active' : ''}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
