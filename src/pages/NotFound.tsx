import { Link } from 'wouter';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontFamily: 'var(--display-font)', fontSize: '5rem', color: 'var(--primary)', lineHeight: 1 }}>404</div>
          <h1 style={{ fontFamily: 'var(--display-font)', fontSize: '1.6rem', margin: '0.75rem 0 0.5rem' }}>Página no encontrada</h1>
          <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: '2rem' }}>
            La dirección solicitada no existe o ha sido trasladada. Si considera que es un error, contacte con la administración.
          </p>
          <Link href="/" className="btn btn-primary">Volver al inicio</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}