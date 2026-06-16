import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function LpbIndex() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation('/lpb/cuenta');
  }, [setLocation]);

  return null;
}