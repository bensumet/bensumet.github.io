import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

// Hash routing ("#/work/coreconnect") keeps every page reachable on GitHub
// Pages with no server rewrites, and deep links survive a refresh.

export function currentPath(): string[] {
  return window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
}

export function useRoute(): string[] {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const onHash = () => {
      const go = () => { setPath(currentPath()); window.scrollTo({ top: 0 }); };
      // Pages cross-fade: the old one lifts away as the new one settles in (see pageStyles).
      const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
      if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        doc.startViewTransition(() => flushSync(go));
      } else go();
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return path;
}

export const href = (...parts: string[]) => `#/${parts.join('/')}`;
