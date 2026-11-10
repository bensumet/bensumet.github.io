import { useEffect, useState } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { motion } from '@bensumet/edge';

// A headline cut into vertical strips, like the hanging paper in Place / Space. The strips arrive out
// of line and settle into words once, on load. Screen readers get the plain text once.

const N = 16;
// Fixed, uneven starting offsets (in em) so the scatter looks hung by hand, not random each load.
const start = Array.from({ length: N }, (_, i) => (((i * 7) % 11) - 5) * 0.11);

const reduced = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function StripHeadline({ text, sx }: { text: string; sx?: SxProps<Theme> }) {
  const still = reduced();
  const [phase, setPhase] = useState<'scattered' | 'settling' | 'settled'>(still ? 'settled' : 'scattered');

  useEffect(() => {
    if (still) return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setPhase('settling')); });
    const done = window.setTimeout(() => setPhase('settled'), motion.duration.enter + N * 40 + 200);
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); window.clearTimeout(done); };
  }, [still]);

  const w = 100 / N;
  return (
    <Box component="span"
      sx={[{ position: 'relative', display: 'block' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box component="span" sx={visuallyHidden}>{text}</Box>
      <Box component="span" aria-hidden="true" sx={{ display: 'block', visibility: 'hidden' }}>{text}</Box>
      {start.map((s, i) => {
        const y = phase === 'scattered' ? s * 4 : 0;
        const settling = phase !== 'settled';
        return (
          <Box key={i} component="span" aria-hidden="true"
            sx={{
              position: 'absolute', inset: 0, display: 'block', pointerEvents: 'none',
              clipPath: `inset(-0.25em ${Math.max(0, 100 - (i + 1) * w - 0.15)}% -0.25em ${Math.max(0, i * w - 0.15)}%)`,
              transform: `translateY(${y}em)`,
              opacity: phase === 'scattered' ? 0 : 1,
              transition: settling
                ? `transform ${motion.duration.enter + 260}ms ${motion.ease.enter} ${i * 40}ms, opacity ${motion.duration.base}ms linear ${i * 40}ms`
                : 'none',
              [motion.reduced]: { transition: 'none', transform: 'none', opacity: 1 },
            }}>
            {text}
          </Box>
        );
      })}
    </Box>
  );
}
