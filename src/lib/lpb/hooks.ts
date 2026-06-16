import { useEffect, useState } from 'react';
import { Economy, Prestamo } from './types';

export function useLpbData(authenticated: boolean) {
  const [economy, setEconomy] = useState<Economy | null>(null);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const [ecoRes, preRes] = await Promise.all([
          fetch('/api/lpb/economy'),
          fetch('/api/lpb/prestamos'),
        ]);
        const ecoData = await ecoRes.json();
        const preData = await preRes.json();
        if (ecoData.economy) setEconomy(ecoData.economy);
        if (preData.prestamos) setPrestamos(preData.prestamos);
      } catch {
        // silencioso
      }
      setLoading(false);
    }
    load();
  }, [authenticated]);

  return { economy, prestamos, loading };
}