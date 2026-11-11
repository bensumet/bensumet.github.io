import { Box, Link, Stack, Typography } from '@mui/material';
import { Lead, WallArt, typography } from '@bensumet/edge';
import { IndexList } from '../components/Layout';
import { href } from '../router';
import { art } from '../data/craft';
import { sections } from '../sections';
import { arrive } from '../components/Motion';
import { StripHeadline } from '../components/StripHeadline';
import { motion } from '@bensumet/edge';

export default function HomePage() {
  return (
    <>
      <Box component="section" sx={{ position: 'relative', mb: { xs: 6, md: 10 } }}>
        <Box sx={arrive(0)}><Typography variant="eyebrow">Design systems · Frontend architecture · Engineering leadership</Typography></Box>
        <Box component="h1" sx={{ m: 0, mt: 2.5, maxWidth: { md: '78%' }, textWrap: 'balance' }}>
          <StripHeadline text="I build design systems" sx={{ fontFamily: typography.poster, fontStretch: '70%', fontWeight: 850, textTransform: 'uppercase', fontSize: 'clamp(3.2rem, 1rem + 9vw, 8.6rem)', lineHeight: 0.84 }} />
          <Box component="span" sx={{ ...arrive(700), display: 'block', fontFamily: typography.display, fontStyle: 'italic', color: 'primary.main', fontSize: 'clamp(2.1rem, 1rem + 4.6vw, 5rem)', lineHeight: 1.02, mt: 1 }}>
            and the frontends made from them.
          </Box>
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
          <Link href={href('work')} sx={{ fontWeight: 600 }}>Read the case studies</Link>
          <Link href={href('system')} sx={{ fontWeight: 600 }}>See the design system</Link>
        </Stack>
      </Box>


      <Box component="section" aria-label="Selected work" sx={{ ...arrive(940), mb: { xs: 6, md: 10 }, display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 1.5, md: 2.5 } }}>
        {[
          { to: href('work', 'coreconnect'), label: 'CoreConnect, one framework for every carrier', kind: 'Case study', src: art('home/tile-coreconnect.jpg'), alt: 'A re-creation of the CoreConnect policy portal: a business policy with its summary header and step list.' },
          { to: href('work', 'immersive-ai'), label: 'P&C Immersive AI, AI features and architecture', kind: 'Case study', src: art('home/tile-deep-search.jpg'), alt: 'An AI search mockup from the platform: results with filters that adapt to what came back.' },
          { to: href('system', 'console'), label: 'Edge, a design system for people and agents', kind: 'Design system', src: art('home/tile-edge-console.jpg'), alt: 'A cloud console built only from Edge components, in the light theme.' },
          { to: href('craft'), label: 'Place / Space, type you walk through', kind: 'Typography', src: art('type/exhibit-4.jpg'), alt: 'Exhibition view: hanging paper strips that line up to read You are here.' },
        ].map((w) => (
          <Link key={w.label} href={w.to} underline="none" color="inherit" sx={{ display: 'block', '&:hover .t, &:focus-visible .t': { color: 'primary.main' }, '& img': { transition: `transform ${motion.duration.base}ms ${motion.ease.enter}` }, '&:hover img, &:focus-visible img': { transform: 'translateY(-4px)' }, [motion.reduced]: { '& img': { transition: 'none' }, '&:hover img, &:focus-visible img': { transform: 'none' } } }}>
            <Box sx={{ aspectRatio: '4 / 3', maxWidth: '100%', bgcolor: 'edge.tint', display: 'grid', placeItems: 'center', overflow: 'hidden', p: w.src ? 1.5 : 0 }}>
              {w.src ? <Box component="img" src={w.src} alt={w.alt} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: 6 }} /> : <Mini kind={w.kind} />}
            </Box>
            <Typography sx={{ mt: 1, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'text.secondary' }}>{w.kind}</Typography>
            <Typography className="t" sx={{ fontWeight: 650, lineHeight: 1.3 }}>{w.label}</Typography>
          </Link>
        ))}
      </Box>

      <Box component="section" aria-labelledby="contents">
        <Typography id="contents" component="h2" sx={{ fontFamily: typography.body, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', mb: 2 }}>
          Contents
        </Typography>
        <IndexList
          label="Sections"
          items={sections.filter((s) => s.id !== 'about').map((s, i) => ({ to: href(s.id), number: String(i + 1).padStart(2, '0'), title: s.label, blurb: s.blurb }))}
        />
      </Box>

      <Box component="section" sx={{ mt: { xs: 6, md: 10 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        <Typography variant="eyebrow">Now</Typography>
        <Typography sx={{ fontFamily: typography.display, fontSize: '1.25rem', lineHeight: 1.55, maxWidth: typography.measure }}>
          Director, Product Engineering at Majesco. I lead the frontend for Immersive AI, a next-generation property and casualty insurance
          platform, and build its user-facing AI features. I manage a team of four engineers and stay hands-on.
        </Typography>
      </Box>
    </>
  );
}

/** Small drawn thumbnails for work that lives in code rather than images. */
function Mini({ kind }: { kind: string }) {
  if (kind === 'AI mockup') {
    return (
      <Box aria-hidden="true" sx={{ width: '82%', display: 'grid', gap: 0.75 }}>
        <Box sx={{ border: 1, borderColor: 'primary.main', height: 18 }} />
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>{[38, 46, 30, 52].map((w) => <Box key={w} sx={{ width: w, height: 12, border: 1, borderColor: 'divider' }} />)}</Box>
        {[0, 1, 2].map((i) => <Box key={i} sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}><Box sx={{ width: 14, height: 14, bgcolor: 'action.selected' }} /><Box sx={{ height: 6, flex: 1, bgcolor: i === 0 ? 'primary.main' : 'divider' }} /></Box>)}
      </Box>
    );
  }
  return (
    <Box aria-hidden="true" sx={{ fontFamily: typography.mono, fontSize: '0.62rem', lineHeight: 1.6, color: 'text.secondary', width: '82%' }}>
      <Box sx={{ color: 'primary.main' }}># Edge design system</Box>
      <Box>## Tokens</Box><Box>- tokens.json</Box><Box>- contrast.json</Box>
      <Box>## Rules</Box><Box>- Foundations</Box><Box>- SummaryCard</Box>
    </Box>
  );
}
