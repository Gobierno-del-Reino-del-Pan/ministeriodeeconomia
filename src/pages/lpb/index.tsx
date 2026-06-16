import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function LpbIndex() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error');
    if (error) {
      // Redirigir a /lpb/cuenta pasando el error como param para que Layout lo capture
      setLocation(`/lpb/cuenta?error=${error}`);
    } else {
      setLocation('/lpb/cuenta');
    }
  }, [setLocation]);

  return null;
}