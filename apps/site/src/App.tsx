import { lazy, Suspense, useEffect } from 'react';
import { Box, Container, GlobalStyles, Link, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ChapterStripes, Measure, useEdgeSettings } from '@bensumet/edge';
import { Footer, Masthead, MastheadRow, SectionNav, SkipLink } from './components/Shell';
import { href, useRoute } from './router';
import { flow } from './flow';
import { sections, type SectionId } from './sections';
import { FlowNav } from './components/FlowNav';
import { arrive, pageTransitions, revealFrom, revealStyles } from './components/Motion';

// Each section loads on demand, so the first visit only downloads what it shows.
const HomePage = lazy(() => import('./pages/HomePage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const AiPage = lazy(() => import('./pages/AiPage'));
const SystemPage = lazy(() => import('./pages/SystemPage'));
const CraftPage = lazy(() => import('./pages/CraftPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

const pages: Record<SectionId | 'home', React.ComponentType<{ path: string[] }>> = {
  home: HomePage, work: WorkPage, ai: AiPage, system: SystemPage, craft: CraftPage, about: AboutPage,
};

function ModePicker() {
  const { mode, setMode } = useEdgeSettings();
  return (
    <ToggleButtonGroup exclusive size="small" value={mode} onChange={(e, v) => v && revealFrom(e.currentTarget as Element, () => setMode(v))} aria-label="Color mode">
      <ToggleButton value="ink">Ink</ToggleButton>
      <ToggleButton value="paper">Paper</ToggleButton>
    </ToggleButtonGroup>
  );
}

function Wordmark() {
  return (
    <Link href={href()} underline="none" color="text.primary" aria-label="Ben Viwatmanitsakul, home" sx={{ mr: 'auto' }}>
      <Typography variant="brand">Ben</Typography>{' '}
      <Typography variant="byline" component="span">Viwatmanitsakul</Typography>
    </Link>
  );
}

export default function App() {
  const path = useRoute();
  const id = (sections.find((s) => s.id === path[0])?.id ?? 'home') as SectionId | 'home';
  const Page = pages[id];
  const section = sections.find((s) => s.id === id);

  useEffect(() => {
    const page = path.length > 1 ? flow.find((f) => f.path.join('/') === path.join('/')) : undefined;
    const name = page ? page.title.replace(/^Design system: /, '') : section?.label;
    document.title = name ? `${name} · Ben Viwatmanitsakul` : 'Ben Viwatmanitsakul · Design engineer';
  }, [section, path]);

  return (
    <>
      <GlobalStyles styles={revealStyles} />
      <SkipLink
        href="#main"
        onClick={(e: React.MouseEvent) => {
          // Move focus without touching the hash, which drives routing.
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Skip to content
      </SkipLink>
      <Masthead>
        <Container maxWidth="lg">
          <MastheadRow>
            <Wordmark />
            <SectionNav aria-label="Sections">
              <ul>
                {sections.map((s) => (
                  <li key={s.id}>
                    <Link variant="nav" href={href(s.id)} aria-current={id === s.id ? 'page' : undefined}>{s.label}</Link>
                  </li>
                ))}
              </ul>
            </SectionNav>
            <ModePicker />
          </MastheadRow>
        </Container>
      </Masthead>
      {/* edge-allow no-page-landmarks: the app shell is the one place that owns the main landmark */}
      <Container component="main" id="main" tabIndex={-1} maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, outline: 'none', minHeight: '60vh' }}>
        <Suspense fallback={<Typography color="text.secondary" role="status">Loading…</Typography>}>
          <Box key={path.join('/')} sx={id === 'home' || pageTransitions ? undefined : arrive(0)}>
            <Page path={path.slice(1)} />
            {id !== 'home' && <FlowNav path={path} />}
          </Box>
        </Suspense>
      </Container>
      <ChapterStripes direction="vertical" sx={{ height: 14, mt: 8 }} />
      <Footer>
        <Container maxWidth="lg">
          <Typography variant="signoff" aria-hidden="true" sx={{ whiteSpace: 'nowrap' }}>
            Design <Typography variant="accentItalic">&amp; code</Typography>
          </Typography>
          <Measure sx={{ mt: 3 }}>
            <Typography variant="body2">
            Designed and built by Ben Viwatmanitsakul with AI coding assistants; I review and test every change.
            This site is built with <Link href={href('system')}>Edge, my design system</Link>.
              Product examples use fictional companies and sample data.
            </Typography>
          </Measure>
          <Stack direction="row" useFlexGap sx={{ mt: 2, flexWrap: 'wrap', columnGap: 3, rowGap: 1 }}>
            <Link href="https://github.com/bensumet">GitHub</Link>
            <Link href="https://github.com/bensumet/bensumet.github.io">View the code</Link>
            <Link href="https://www.linkedin.com/in/ben-viwatmanitsakul/">LinkedIn</Link>
            <Link href="mailto:bensumet@gmail.com">bensumet@gmail.com</Link>
          </Stack>
        </Container>
      </Footer>
    </>
  );
}
