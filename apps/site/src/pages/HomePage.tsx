import { Box, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Columns, Lead, motion, WallArt } from '@bensumet/edge';
import { IndexList } from '../components/Layout';
import { href } from '../router';
import { art } from '../data/craft';
import { sections } from '../sections';
import { arrive } from '../components/Motion';
import { StripHeadline } from '../components/StripHeadline';

const work = [
  { to: href('work', 'coreconnect'), label: 'CoreConnect, one framework for every carrier', kind: 'Case study', src: art('home/tile-coreconnect.jpg'), alt: 'A re-creation of the CoreConnect policy portal: a business policy with its summary header and step list.' },
  { to: href('work', 'immersive-ai'), label: 'P&C Immersive AI, AI features and architecture', kind: 'Case study', src: art('home/tile-deep-search.jpg'), alt: 'An AI search mockup from the platform: results with filters that adapt to what came back.' },
  { to: href('system', 'console'), label: 'Edge, a design system for people and agents', kind: 'Design system', src: art('home/tile-edge-console.jpg'), alt: 'A cloud console built only from Edge components, in the light theme.' },
  { to: href('craft'), label: 'Place / Space, type you walk through', kind: 'Typography', src: art('type/exhibit-4.jpg'), alt: 'Exhibition view: hanging paper strips that line up to read You are here.' },
];

/** A work tile's picture: the image on a tinted 4:3 mat. It lifts a little on hover. */
const TileMat = styled('span')(({ theme }) => ({
  display: 'grid',
  placeItems: 'center',
  aspectRatio: '4 / 3',
  maxWidth: '100%',
  overflow: 'hidden',
  padding: theme.spacing(1.5),
  backgroundColor: theme.vars.palette.edge.tint,
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    boxShadow: theme.shadows[6],
    transition: `transform ${motion.duration.base}ms ${motion.ease.enter}`,
    [motion.reduced]: { transition: 'none' },
  },
  'a:hover &, a:focus-visible &': { '& img': { transform: 'translateY(-4px)', [motion.reduced]: { transform: 'none' } } },
}));

export default function HomePage() {
  return (
    <>
      <Box component="section" sx={{ position: 'relative', mb: { xs: 6, md: 10 } }}>
        <Box sx={arrive(0)}><Typography variant="eyebrow">Design systems · Frontend architecture · Engineering leadership</Typography></Box>
        <Box component="h1" sx={{ m: 0, mt: 2.5, maxWidth: { md: '78%' } }}>
          <StripHeadline text="I build design systems" />
          <Typography variant="heroItalic" sx={{ ...arrive(700), display: 'block', mt: 1 }}>
            and the frontends made from them.
          </Typography>
        </Box>
        <WallArt variant="planets" sx={{ position: 'absolute', right: 0, top: { md: 40 }, width: 220, height: 220, display: { xs: 'none', md: 'block' } }} />
        <Box sx={{ ...arrive(820), mt: { xs: 4, md: 5 } }}>
          <Lead opening="Fifteen years in,">
            I still design what I build. I designed CoreConnect&rsquo;s interface and built the framework behind it, used by about 25
            insurance carriers. On a new AI insurance platform that had no design system, I set one up, and I lead its frontend.
            I also manage a team of four engineers. Edge, the system this site runs on, is one that people and coding agents follow.
          </Lead>
        </Box>
        <Stack direction="row" useFlexGap sx={{ ...arrive(820), mt: 3, flexWrap: 'wrap', columnGap: 3, rowGap: 1 }}>
          <Link variant="label" href={href('work')}>Read the case studies</Link>
          <Link variant="label" href={href('system')}>See the design system</Link>
        </Stack>
      </Box>

      <Columns as="section" aria-label="Selected work" preset="quarters" gap={{ xs: 1.5, md: 2.5 }} sx={{ ...arrive(940), mb: { xs: 6, md: 10 } }}>
        {work.map((w) => (
          <Link key={w.label} href={w.to} underline="none" color="inherit" sx={{ display: 'block' }}>
            <TileMat><img src={w.src} alt={w.alt} /></TileMat>
            <Typography variant="eyebrow" sx={{ mt: 1 }}>{w.kind}</Typography>
            <Typography variant="label">{w.label}</Typography>
          </Link>
        ))}
      </Columns>

      <Box component="section" aria-labelledby="contents">
        <Typography id="contents" variant="eyebrow" component="h2" color="text.primary" sx={{ mb: 2 }}>Contents</Typography>
        <IndexList
          label="Sections"
          items={sections.filter((s) => s.id !== 'about').map((s, i) => ({ to: href(s.id), number: String(i + 1).padStart(2, '0'), title: s.label, blurb: s.blurb }))}
        />
      </Box>

      <Columns as="section" aria-label="Now" preset="narrowWide" sx={{ mt: { xs: 6, md: 10 } }}>
        <Typography variant="eyebrow">Now</Typography>
        <Typography variant="lead">
          Director, Product Engineering at Majesco. I lead the frontend for Immersive AI, a next-generation property and casualty insurance
          platform, and build its user-facing AI features. I manage a team of four engineers and stay hands-on.
        </Typography>
      </Columns>
    </>
  );
}
