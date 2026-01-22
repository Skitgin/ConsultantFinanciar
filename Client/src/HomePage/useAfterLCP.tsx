import { useState, useEffect } from 'react';

export function useAfterLCP() {
  const [isLCPReady, setIsLCPReady] = useState(false);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        setIsLCPReady(true);
        observer.disconnect(); 
      }
    });

    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    return () => observer.disconnect();
  }, []);

  return isLCPReady;
}