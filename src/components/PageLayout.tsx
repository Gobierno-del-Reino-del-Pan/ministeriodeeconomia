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
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: '#ffffff', maxWidth: '680px' }}>
            {heroTitle}
          </h1>
          {heroSubtitle && (
            <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '0.6rem', maxWidth: '560px', fontSize: '0.95rem', lineHeight: 1.65 }}>
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
