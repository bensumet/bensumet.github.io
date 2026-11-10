import { lazy, Suspense, useEffect } from 'react';
import { Box, Container, GlobalStyles, Link, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ChapterStripes, motion, typography, useEdgeSettings } from '@bensumet/edge';
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
      <ToggleButton value="ink" sx={{ px: 1.25, py: 0.25 }}>Ink</ToggleButton>
      <ToggleButton value="paper" sx={{ px: 1.25, py: 0.25 }}>Paper</ToggleButton>
    </ToggleButtonGroup>
  );
}

function Wordmark() {
  return (
    <Link href={href()} underline="none" color="text.primary" aria-label="Ben Viwatmanitsakul, home" sx={{ mr: 'auto' }}>
      <Typography component="span" sx={{ fontFamily: typography.poster, fontStretch: '72%', fontWeight: 850, textTransform: 'uppercase', fontSize: '1.35rem', lineHeight: 1, letterSpacing: '-0.01em' }}>
        Ben
      </Typography>{' '}
      <Typography component="span" sx={{ fontFamily: typography.display, fontStyle: 'italic', fontSize: '1.3rem', color: 'primary.main' }}>
        Viwatmanitsakul
      </Typography>
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
      <Link
        href="#main"
        onClick={(e: React.MouseEvent) => {
          // Move focus without touching the hash, which drives routing.
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        sx={{ position: 'absolute', left: 8, top: -48, zIndex: 2000, p: 1, bgcolor: 'primary.main', color: 'primary.contrastText', '&:focus': { top: 8 } }}
      >
        Skip to content
      </Link>
      <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'background.default', borderBottom: 1, borderColor: 'text.primary', pt: 'env(safe-area-inset-top, 0px)' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 3, rowGap: 1, py: 1.5 }}>
          <Wordmark />
          {/* edge-allow theme-colors: a mask only uses alpha; the color itself never shows. It fades the last link to say the row scrolls on phones. */}
          <Box component="nav" aria-label="Sections" sx={{ order: { xs: 3, md: 0 }, width: { xs: '100%', md: 'auto' }, overflowX: 'auto', overflowY: 'hidden', p: 1, m: -1, maskImage: { xs: 'linear-gradient(90deg, black 88%, transparent)', md: 'none' } }}>
            <Stack component="ul" direction="row" spacing={{ xs: 2, md: 2.5 }} sx={{ listStyle: 'none', m: 0, p: 0, whiteSpace: 'nowrap' }}>
              {sections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={href(s.id)}
                    underline="none"
                    aria-current={id === s.id ? 'page' : undefined}
                    sx={{
                      fontFamily: typography.body, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: id === s.id ? 'primary.main' : 'text.primary', py: 0.75, display: 'inline-block',
                      borderBottom: 2, borderColor: id === s.id ? 'primary.main' : 'transparent', transition: `color ${motion.duration.quick}ms, border-color ${motion.duration.quick}ms`,
                      '&:hover, &:focus-visible': { color: 'primary.main', borderColor: 'primary.main' },
                    }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </Stack>
          </Box>
          <ModePicker />
        </Container>
      </Box>
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
      <Box component="footer" sx={{ bgcolor: 'edge.tint', overflow: 'hidden', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography aria-hidden="true" sx={{ fontFamily: typography.poster, fontStretch: '72%', fontWeight: 850, textTransform: 'uppercase', fontSize: 'clamp(2.6rem, 1rem + 5vw, 5.5rem)', lineHeight: 0.82, whiteSpace: 'nowrap' }}>
            Design <Box component="span" sx={{ fontFamily: typography.display, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', color: 'primary.main' }}>&amp; code</Box>
          </Typography>
          <Typography variant="body2" sx={{ mt: 3, maxWidth: '62ch' }}>
            Designed and built by Ben Viwatmanitsakul with AI coding assistants; I review and test every change.
            This site is built with <Link href={href('system')}>Edge, my design system</Link>.
            Product examples use fictional companies and sample data.
          </Typography>
          <Stack direction="row" useFlexGap sx={{ mt: 2, flexWrap: 'wrap', columnGap: 3, rowGap: 1 }}>
            <Link href="https://github.com/bensumet">GitHub</Link>
            <Link href="https://github.com/bensumet/bensumet.github.io">View the code</Link>
            <Link href="https://www.linkedin.com/in/ben-viwatmanitsakul/">LinkedIn</Link>
            <Link href="mailto:bensumet@gmail.com">bensumet@gmail.com</Link>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
