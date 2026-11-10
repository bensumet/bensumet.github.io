import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { motion } from '@bensumet/edge';

const rise = keyframes`
  from { opacity: 0; transform: translateY(${motion.rise}px); }
  to { opacity: 1; transform: none; }
`;

/** Content arriving on a page: fades and rises into place once. `delay` orders one page's sequence. */
export function arrive(delay = 0) {
  return {
    animation: `${rise} ${motion.duration.enter}ms ${motion.ease.enter} ${delay}ms both`,
    [motion.reduced]: { animation: 'none' },
  } as const;
}

/**
 * Several views stacked in one place; switching fades the new one in over the old.
 * All views stay in the layout grid, so the height doesn't jump between them, and the hidden ones
 * leave the accessibility tree.
 */
export function Crossfade({ active, views }: { active: string; views: { id: string; node: React.ReactNode }[] }) {
  return (
    <Box sx={{ display: 'grid' }}>
      {views.map((v) => {
        const on = v.id === active;
        return (
          <Box key={v.id} aria-hidden={!on}
            sx={{
              gridArea: '1 / 1', minWidth: 0, opacity: on ? 1 : 0, visibility: on ? 'visible' : 'hidden',
              transition: `opacity ${motion.duration.base}ms ${motion.ease.standard}, visibility 0s linear ${on ? 0 : motion.duration.base}ms`,
              [motion.reduced]: { transition: 'none' },
            }}>
            {v.node}
          </Box>
        );
      })}
    </Box>
  );
}

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Runs a theme change as a reveal: the new look spreads in a circle from the control that was pressed.
 * Falls back to an instant change where View Transitions aren't supported or motion is reduced.
 */
export function revealFrom(el: Element | null, change: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  if (!doc.startViewTransition || prefersReduced() || !el) { change(); return; }
  const r = el.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.documentElement.classList.add('reveal');
  const t = doc.startViewTransition(() => { flushSync(change); }) as { ready: Promise<void>; finished?: Promise<void> };
  t.finished?.finally(() => document.documentElement.classList.remove('reveal'));
  t.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: motion.duration.enter + 180, easing: motion.ease.enter, pseudoElement: '::view-transition-new(root)' },
    );
  }).catch(() => {});
}

/** View-transition styles: theme reveals (html.reveal) wipe in a circle; page changes cross-fade and rise. */
export const revealStyles = {
  '@keyframes edge-page-out': { to: { opacity: 0, transform: `translateY(-${motion.rise}px)` } },
  '@keyframes edge-page-in': { from: { opacity: 0, transform: `translateY(${motion.rise}px)` } },
  '::view-transition-old(root)': { animation: `edge-page-out ${motion.duration.base}ms ${motion.ease.standard} both` },
  '::view-transition-new(root)': { animation: `edge-page-in ${motion.duration.enter}ms ${motion.ease.enter} ${motion.duration.quick}ms both` },
  'html.reveal::view-transition-old(root), html.reveal::view-transition-new(root)': { animation: 'none', mixBlendMode: 'normal' },
} as const;

/** True where page changes animate through View Transitions, so the in-page arrival isn't doubled. */
export const pageTransitions = typeof document !== 'undefined' && 'startViewTransition' in document;

/** A number that counts to its new value when it changes, so the eye sees the size of the change. */
export function useTween(value: number, duration: number = motion.duration.enter) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (prefersReduced()) { setShown(value); from.current = value; return; }
    const start = performance.now(); const a = from.current; let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - k, 3);
      setShown(Math.round(a + (value - a) * e));
      if (k < 1) raf = requestAnimationFrame(tick); else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); from.current = value; };
  }, [value, duration]);
  return shown;
}
