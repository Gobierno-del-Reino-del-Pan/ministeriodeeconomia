import Header from './Header';
import Footer from './Footer';
import NewsTickerBar from './NewsTickerBar';
import BreadcrumbNav from './BreadcrumbNav';

interface Crumb { label: string; href?: string; }

interface Props {
  crumbs?: Crumb[];
  heroTag?: string;
  heroTitle: string;
  heroSubtitle?: string;
  children: React.ReactNode;
}

export default function PageLayout({ crumbs = [], heroTag, heroTitle, heroSubtitle, children }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <NewsTickerBar />
      {crumbs.length > 0 && <BreadcrumbNav crumbs={crumbs} />}

      {/* Hero de sección */}
      <div className="page-hero">
        <div className="container">
          {heroTag && <span className="page-hero-tag">{heroTag}</span>}
          <h1 className="page-hero-title">
            {heroTitle}
          </h1>
          {heroSubtitle && (
            <p className="page-hero-subtitle">
              {heroSubtitle}
            </p>
          )}
        </div>
      </div>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
