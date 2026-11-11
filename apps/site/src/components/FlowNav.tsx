import { Box, Link, Typography } from '@mui/material';
import { Columns } from '@bensumet/edge';
import { flow, flowIndex } from '../flow';
import { href } from '../router';
import { sections } from '../sections';

/** Previous, up and next at the end of every page, so a visitor always has a way on. */
export function FlowNav({ path }: { path: string[] }) {
  const i = flowIndex(path);
  if (i < 0) return null;
  const here = flow[i];
  const prev = flow[i - 1];
  const next = flow[i + 1];
  const isIndex = here.path.length === 1 && here.section !== 'craft' && here.section !== 'about';
  const sectionLabel = sections.find((s) => s.id === here.section)?.label ?? '';
  const cell = (label: string, title: string, to: string, align: 'left' | 'right' | 'center', rel?: string) => (
    <Link href={to} rel={rel} underline="none" color="inherit" sx={{ display: 'block', textAlign: { xs: 'left', sm: align } }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="label">{title}</Typography>
    </Link>
  );
  return (
    <Columns as="nav" aria-label="Keep reading" template={{ xs: '1fr', sm: '1fr auto 1fr' }} align="start" sx={{ mt: 8, pt: 3, borderTop: 1, borderColor: 'text.primary' }}>
      <Box>{prev && cell('← Previous', prev.title, href(...prev.path), 'left', 'prev')}</Box>
      <Box sx={{ order: { xs: 3, sm: 0 } }}>
        {!isIndex && here.path.length > 1 && cell('Back to', `All of ${sectionLabel}`, href(here.section), 'center')}
      </Box>
      <Box>{next ? cell('Next →', next.title, href(...next.path), 'right', 'next') : cell('Start again', 'Home', href(), 'right')}</Box>
    </Columns>
  );
}
