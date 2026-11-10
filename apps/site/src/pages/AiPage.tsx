import { lazy, Suspense } from 'react';
import { Typography } from '@mui/material';

// Studies that are built so far; the rest show an in-progress note.
const built: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  'deep-search': lazy(() => import('../studies/deep-search/DeepSearchStudy').then((m) => ({ default: m.DeepSearchStudy }))),
  'admin-portal': lazy(() => import('../studies/admin-portal/AdminPortalStudy').then((m) => ({ default: m.AdminPortalStudy }))),
  palette: lazy(() => import('../studies/palette/PaletteStudy').then((m) => ({ default: m.PaletteStudy }))),
  'ai-estimate': lazy(() => import('../studies/ai-estimate/AiEstimateStudy').then((m) => ({ default: m.AiEstimateStudy }))),
  'build-log': lazy(() => import('../studies/build-log/BuildLogStudy').then((m) => ({ default: m.BuildLogStudy }))),
  process: lazy(() => import('../studies/process/ProcessEssay').then((m) => ({ default: m.ProcessEssay }))),
};
import { Lead } from '@bensumet/edge';
import { IndexList, Opener, Pending } from '../components/Layout';
import { href } from '../router';

export const aiStudies = [
  {
    id: 'deep-search',
    title: 'Search filters that fit the answer',
    kind: 'Working mockup',
    blurb: 'An AI search results page whose filters and grouping adapt to what came back. Try four searches and watch the controls change.',
  },
  {
    id: 'admin-portal',
    title: 'From mockup to product',
    kind: 'Working mockup',
    blurb: 'A clickable admin I designed with an AI assistant, round by round. I then built the admin shell to it.',
  },
  {
    id: 'palette',
    title: 'A palette, measured',
    kind: 'Decision study',
    blurb: 'Candidate palettes painted onto the same product screens in light and dark, with every contrast ratio and color distance measured live.',
  },
  {
    id: 'ai-estimate',
    title: 'Showing an AI estimate',
    kind: 'Decision study',
    blurb: 'How a number a model produced should look next to real prices: the working file round by round, the option I chose, and the visuals I rejected.',
  },
  {
    id: 'build-log',
    title: 'This site, built with Claude Code',
    kind: 'Build log',
    blurb: 'Who did what when I built this portfolio with Claude Code, and the eight gates every change went through, with what each one caught.',
  },
  {
    id: 'process',
    title: 'How I work with AI',
    kind: 'Essay',
    blurb: 'Where coding assistants speed me up, where they fail, and the review and test gates every change goes through.',
  },
];

export default function AiPage({ path }: { path: string[] }) {
  const study = aiStudies.find((s) => s.id === path[0]);
  const Built = study ? built[study.id] : undefined;
  if (Built) {
    return (
      <>
        <Suspense fallback={<Typography color="text.secondary" role="status">Loading…</Typography>}><Built /></Suspense>
      </>
    );
  }
  if (study) {
    return (
      <>
        <Opener eyebrow={`Designing with AI · ${study.kind}`} bold={study.title} />
        <Pending what="Being rebuilt on a fictional product with Edge, so you can use it here." />
      </>
    );
  }
  return (
    <>
      <Opener eyebrow="Prototypes" bold="I design in code," italic="then decide with evidence.">
        <Lead opening="An AI assistant drafts the options;">
          I decide which one ships, and test it. Four of these are working mockups I designed this way for real problems in my recent projects: I
          set the direction and made the calls, the assistant drafted options, and we iterated until each design was right. Each was built on
          the product&rsquo;s own theme, so it could be built exactly as designed. They&rsquo;re shown as they were made, with the product renamed, so you can use them.
        </Lead>
      </Opener>
      <IndexList label="Studies" items={aiStudies.map((s, i) => ({ to: href('ai', s.id), number: String(i + 1).padStart(2, '0'), title: s.title, kind: s.kind, blurb: s.blurb }))} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, maxWidth: '66ch' }}>
        Company names, data and branding are replaced throughout. The interactions and the reasoning are mine.
      </Typography>
    </>
  );
}
