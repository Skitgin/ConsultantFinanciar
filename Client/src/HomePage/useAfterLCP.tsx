import { useState, useEffect } from 'react';

export function useAfterLCP() {
  const [isLCPReady, setIsLCPReady] = useState(false);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        setIsLCPReady(true);
        observer.disconnect(); // Stop listening once LCP is found
      }
    });

    // Observe largest-contentful-paint entries
    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    return () => observer.disconnect();
  }, []);

  return isLCPReady;
}