// edge-allow-file edge-first: frames standalone demos that carry their own styles
import { useEffect, useRef, useState } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';

/**
 * Shows one of the original design artifacts, cleaned for publishing, exactly
 * as it was designed. The artifact keeps its own styles; the frame only sizes
 * itself to the content (each demo posts its height) and offers a full-page view.
 */
export function DemoFrame({ src, title, height, note }: { src: string; title: string; height?: number; note?: string }) {
  const url = `${import.meta.env.BASE_URL}demos/${src}`;
  const ref = useRef<HTMLIFrameElement>(null);
  const [h, setH] = useState(height ?? 900);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (height) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== ref.current?.contentWindow) return;
      const next = Number((e.data as { demoHeight?: number })?.demoHeight);
      if (next > 0) setH(Math.min(Math.ceil(next) + 4, 20000));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [height]);

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">{note ?? 'The original design artifact, with the product renamed.'}</Typography>
        <Link href={url} target="_blank" rel="noopener" variant="body2" sx={{ fontWeight: 600 }}>Open full page</Link>
      </Stack>
      <Box sx={{ position: 'relative', border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        {!loaded && <Typography role="status" color="text.secondary" sx={{ position: 'absolute', inset: 0, p: 3 }}>Loading the demo…</Typography>}
        <Box component="iframe" ref={ref} src={url} title={title} loading="lazy" onLoad={() => setLoaded(true)}
          sx={{ display: 'block', width: '100%', height: h, border: 0 }} />
      </Box>
    </Box>
  );
}
