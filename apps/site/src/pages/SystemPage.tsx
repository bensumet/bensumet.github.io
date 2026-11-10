import { lazy, Suspense } from 'react';
import { Box, Link, Stack, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { edgeColor, edgeLabel, edges, motion, typography, useEdgeSettings, type EdgeName } from '@bensumet/edge';
import { Eyebrow } from '../components/Layout';
import { href } from '../router';
import { revealFrom } from '../components/Motion';

const FoundationsPage = lazy(() => import('./system/FoundationsPage').then((m) => ({ default: m.FoundationsPage })));
const ComponentsPage = lazy(() => import('./system/ComponentsPage').then((m) => ({ default: m.ComponentsPage })));
const AiPatternsPage = lazy(() => import('./system/AiPatternsPage').then((m) => ({ default: m.AiPatternsPage })));
const StatesPage = lazy(() => import('./system/StatesPage'));
const AgentsPage = lazy(() => import('./system/AgentsPage'));
const ConsolePage = lazy(() => import('./system/ConsolePage'));
const EvalsPage = lazy(() => import('./system/EvalsPage'));

export const tabs = [
  { id: 'foundations', label: 'Foundations', Component: FoundationsPage },
  { id: 'components', label: 'Components', Component: ComponentsPage },
  { id: 'states', label: 'States', Component: StatesPage },
  { id: 'ai-patterns', label: 'AI patterns', Component: AiPatternsPage },
  { id: 'console', label: 'Console demo', Component: ConsolePage },
  { id: 'agents', label: 'For agents', Component: AgentsPage },
  { id: 'evals', label: 'Evaluations', Component: EvalsPage },
] as const;

/** Lets visitors repaint the whole system: components read color only from the theme. */
function EdgePicker() {
  const { edge, setEdge, mode } = useEdgeSettings();
  return (
    <ToggleButtonGroup exclusive size="small" value={edge} onChange={(e, v: EdgeName | null) => v && revealFrom(e.currentTarget as Element, () => setEdge(v))} aria-label="Accent color">
      {(Object.keys(edges) as EdgeName[]).map((name) => (
        <Tooltip key={name} title={edgeLabel(name, mode)}>
          <ToggleButton value={name} aria-label={`${edgeLabel(name, mode)} accent`} sx={{ px: 1 }}>
            {/* edge-allow square-corners: round swatches read as color samples, not controls */}
            <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: edgeColor(name, mode) }} />
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}

export default function SystemPage({ path }: { path: string[] }) {
  const tab = tabs.find((t) => t.id === path[0]) ?? tabs[0];
  const Current = tab.Component;
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between', mb: 4, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box>
          <Eyebrow>Design system</Eyebrow>
          <Typography component="p" sx={{ fontFamily: typography.display, fontStyle: 'italic', fontSize: '1.15rem', mt: 0.5 }}>
            Edge, the design system this site is built with.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary" id="accent-label">Accent</Typography>
          <EdgePicker />
        </Stack>
      </Box>
      <Box component="nav" aria-label="System pages" sx={{ mb: 4, mx: -1, mt: -1, p: 1, overflowX: 'auto', overflowY: 'hidden' }}>
        <Stack component="ul" direction="row" spacing={3} sx={{ listStyle: 'none', m: 0, p: 0, whiteSpace: 'nowrap' }}>
          {tabs.map((t) => (
            <li key={t.id}>
              <Link href={href('system', t.id)} underline="none" aria-current={t.id === tab.id ? 'page' : undefined}
                sx={{ display: 'inline-block', fontWeight: 600, color: t.id === tab.id ? 'primary.main' : 'text.primary', borderBottom: 2, borderColor: t.id === tab.id ? 'primary.main' : 'transparent', pb: 0.5, transition: `color ${motion.duration.quick}ms, border-color ${motion.duration.quick}ms`, '&:hover, &:focus-visible': { color: 'primary.main', borderColor: 'primary.main' } }}>
                {t.label}
              </Link>
            </li>
          ))}
        </Stack>
      </Box>
      <Suspense fallback={<Typography color="text.secondary" role="status">Loading…</Typography>}>
        <Current />
      </Suspense>
    </>
  );
}
