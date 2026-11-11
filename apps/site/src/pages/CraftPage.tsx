import { useState } from 'react';
import { Box, Button, ButtonBase, Dialog, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { ChapterStripes, Columns, DotRule, Headline, Lead, Measure, RuleItem, RuleList } from '@bensumet/edge';
import { Opener } from '../components/Layout';
import { useVisitState } from '../useVisitState';
import { a2, art, logos, paintings, placeSpace, placeSpaceBooks, recognition, tinfish, typeStudy, wallArt, type Plate } from '../data/craft';


// ----- Gallery pieces ----------------------------------------------------
// Print work shown as it was made: uncropped, on a mat. These read their
// colors and spacing from the theme, so they follow the mode and the accent.

/** The mat a plate sits on. Logos sit on white so their brand colors read as designed. */
const MatButton = styled(ButtonBase, { shouldForwardProp: (p) => p !== 'light' && p !== 'tile' })<{ light?: boolean; tile?: boolean }>(({ theme, light, tile }) => ({
  display: tile ? 'grid' : 'block',
  placeItems: 'center',
  width: '100%',
  backgroundColor: light ? theme.vars.palette.common.white : theme.vars.palette.edge.tint,
  padding: theme.spacing(tile ? 3 : 1.5),
  ...(tile && { height: 200 }),
  [theme.breakpoints.up('md')]: { padding: theme.spacing(tile ? 4 : 2.5), ...(tile && { height: 210 }) },
  '& img': { transition: 'transform .2s' },
  '&:hover img, &:focus-visible img': { transform: 'scale(1.01)' },
}));

/** Holds the image; on a spread it adds a soft gutter, so two facing pages read as an open book. */
const Plate = styled('span', { shouldForwardProp: (p) => p !== 'spread' })<{ spread?: boolean }>(({ theme, spread }) => {
  const shade = (pct: number) => `color-mix(in srgb, ${theme.vars.palette.common.black} ${pct}%, transparent)`;
  return {
    position: 'relative',
    display: 'block',
    width: 'fit-content',
    maxWidth: '100%',
    marginInline: 'auto',
    ...(spread && {
      '&::after': {
        content: '""', position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(to right, transparent 46%, ${shade(6)} 49%, ${shade(16)} 50%, ${shade(6)} 51%, transparent 54%)`,
      },
    }),
  };
});

const PlateImage = styled('img', { shouldForwardProp: (p) => p !== 'size' && p !== 'flat' })<{ size: 'tile' | 'wide' | 'page'; flat?: boolean }>(({ theme, size, flat }) => ({
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'contain',
  maxHeight: size === 'tile' ? 136 : size === 'wide' ? 420 : 340,
  ...(size === 'tile' && { [theme.breakpoints.up('md')]: { maxHeight: 146 } }),
  boxShadow: flat ? 'none' : theme.shadows[4],
}));

/** One image, uncropped, on a tinted mat. Click to view large. */
function Mat({ p, onOpen, light, src, tile }: { p: Plate; onOpen: (p: Plate & { url: string }) => void; light?: boolean; src?: string; tile?: boolean }) {
  const url = src ?? art(p.src);
  return (
    <Box component="figure" sx={{ m: 0, gridColumn: p.wide && !tile ? { md: '1 / -1' } : undefined }}>
      <MatButton light={light} tile={tile} onClick={() => onOpen({ ...p, url })} aria-label={`View larger: ${p.title}`}>
        <Plate spread={p.spread}>
          <PlateImage src={url} alt={p.alt} loading="lazy" decoding="async" size={tile ? 'tile' : p.wide ? 'wide' : 'page'} flat={light} />
        </Plate>
      </MatButton>
      <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        <Typography component="strong" variant="inherit" color="text.primary">{p.title}</Typography>
        {p.caption && <>. {p.caption}</>}
      </Typography>
    </Box>
  );
}

/** Plates in a grid: one column on phones, two on tablets, `cols` on desktop. */
function Grid({ children, cols = 3 }: { children: React.ReactNode; cols?: number }) {
  return <Columns template={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${cols}, 1fr)` }} gap={{ xs: 3, md: 4 }} align="start">{children}</Columns>;
}

/** A section head on a hairline that starts at a gold dot, as in the type study. */
function SectionHead({ n, bold, italic, children }: { n: string; bold: string; italic?: string; children?: React.ReactNode }) {
  return (
    <Box sx={{ mt: { xs: 9, md: 12 }, mb: 4 }}>
      <DotRule sx={{ mb: 3 }} />
      <Typography variant="eyebrow">{n}</Typography>
      <Box sx={{ mt: 1.5 }}><Headline level="section" bold={bold} italic={italic} /></Box>
      {children && <Measure sx={{ mt: 2.5 }}>{children}</Measure>}
    </Box>
  );
}

/** A book opener: stripe column, running head with the year, title, author in italic. */
function BookOpener({ title, author, year, credit, note }: { title: string; author: string; year: number; credit: string; note: string }) {
  return (
    <Columns template="14px 1fr" gap={{ xs: 2, md: 3 }} sx={{ mt: 6, mb: 3 }}>
      <ChapterStripes direction="horizontal" sx={{ height: '100%' }} />
      <Box>
        <Typography variant="eyebrow">{year} · {credit}</Typography>
        <Typography variant="posterMinor" component="h3" sx={{ mt: 1 }}>{title}</Typography>
        <Typography variant="byline">{author}</Typography>
        <Measure as={Typography} color="text.secondary" sx={{ mt: 1 }}>{note}</Measure>
      </Box>
    </Columns>
  );
}

function Book({ b, onOpen }: { b: (typeof tinfish)[number]; onOpen: (p: Plate & { url: string }) => void }) {
  return (
    <Box>
      <BookOpener title={b.title} author={b.author} year={b.year} credit={b.credit} note={b.note} />
      <Grid cols={b.plates.length === 4 && b.plates.every((p) => !p.wide && !p.spread) ? 4 : b.plates.some((p) => p.spread) ? 2 : 3}>{b.plates.map((p) => <Mat key={p.src} p={p} onOpen={onOpen} />)}</Grid>
    </Box>
  );
}

export default function CraftPage() {
  const [open, setOpen] = useState<(Plate & { url: string }) | null>(null);
  const [more, setMore] = useVisitState('craft.more', false);

  return (
    <>
      <Opener eyebrow="Craft" bold="Print first," italic="then the screen.">
        <Lead opening="Before I wrote code,">
          I set type. Place / Space, the books, the type study and the wall art here are where my eye for color, hierarchy and rhythm comes from, and
          several of Edge&rsquo;s devices come straight from these pages.
        </Lead>
      </Opener>

      <SectionHead n="01 · Type" bold="Place / Space," italic="type you walk through.">
        <Typography color="text.secondary">
          A group exhibition about place. Each designer researched one location, and the hanging paper forms a path so visitors
          walk the show as a journey, one designer&rsquo;s place at each stop. Mine was Bishop Street in downtown Honolulu, where business
          and government share the same few blocks; my two books, Contention and Promotion, are about how both compete for that space and
          survive in it. Featured in the book <i>Design School Confidential</i> and on the website for James Craig&rsquo;s{' '}
          <i>Designing with Type</i>, and shown in the Typography III exhibition at the Commons Gallery.
        </Typography>
      </SectionHead>
      {/* Columns sized to each print's own width, so the three hang at one scale. */}
      <Columns template={{ xs: '1fr', md: '758fr 335fr 672fr' }} gap={{ xs: 3, md: 2.5 }} align="start">
        {placeSpace.map((p) => <Mat key={p.src} p={p} onOpen={setOpen} />)}
      </Columns>
      <Columns template={{ xs: '1fr', md: '580fr 580fr 1160fr' }} gap={{ xs: 3, md: 2.5 }} align="start" sx={{ mt: 5 }}>
        {placeSpaceBooks.slice(0, 3).map((p) => <Mat key={p.src} p={p} onOpen={setOpen} />)}
      </Columns>
      <Box sx={{ mt: 4 }}><Grid cols={2}>{placeSpaceBooks.slice(3).map((p) => <Mat key={p.src} p={p} onOpen={setOpen} />)}</Grid></Box>

      <Box sx={{ mt: 8, mb: 3 }}>
        <Typography component="h3" variant="h3">One guide, twenty-one systems</Typography>
        <Measure as={Typography} color="text.secondary" sx={{ mt: 1 }}>
          A study in showing the same information many ways with type alone: one customer information guide (providers, phone numbers,
          offices), organized twenty-one ways. Three are shown.
        </Measure>
      </Box>
      <Grid>{typeStudy.map((p) => <Mat key={p.src} p={p} onOpen={setOpen} light />)}</Grid>

      <SectionHead n="02 · Books" bold="Books" italic="designed, drawn and set.">
        <Typography color="text.secondary">A 600-page guide for the East-West Center, and books I designed for Tinfish Press, 2008–2011. Spreads are shown small, for their design; the poems and prose belong to their authors.</Typography>
      </SectionHead>
      <BookOpener title={a2.title} author={a2.publisher} year={a2.year} credit="Logo, cover, charts and typesetting" note={a2.lead} />
      {/* Indented to the opener's text column: the stripe plus its gap. */}
      <Measure as={Typography} color="text.secondary" sx={{ mb: 3, ml: { xs: '30px', md: '38px' } }}>
        I re-created every chart from the researchers&rsquo; data, designed them in each chapter&rsquo;s color family, and typeset all 600 pages.
      </Measure>
      <Grid cols={4}>{a2.front.map((p) => <Mat key={p.src} p={p} onOpen={setOpen} />)}</Grid>
      <Box sx={{ mt: 4 }}><Grid>{a2.pages.map((p) => <Mat key={p.src} p={p} onOpen={setOpen} />)}</Grid></Box>
      <Box sx={{ mt: 4 }}><Grid>{a2.charts.map((p) => <Mat key={p.src} p={p} onOpen={setOpen} />)}</Grid></Box>

      {tinfish.slice(0, 2).map((b) => <Book key={b.title} b={b} onOpen={setOpen} />)}


      <SectionHead n="03 · Identity" bold="Logos," italic="a whole brand in one mark.">
        <Typography color="text.secondary">Logos for businesses and community groups. Shown on white so each brand&rsquo;s colors read as designed. Contact details on the two Kal badges are placeholders.</Typography>
      </SectionHead>
      <Grid cols={4}>{logos.map((p) => <Mat key={p.src} p={p} onOpen={setOpen} light tile />)}</Grid>

      <SectionHead n="04 · Wall art" bold="Three prints," italic="one quiet palette.">
        <Typography color="text.secondary">Minimal prints in deep green, dusty rose, ochre and warm paper. Edge&rsquo;s wall-art shapes come from these.</Typography>
      </SectionHead>
      <Grid>{wallArt.map((p) => <Mat key={p.src} p={p} onOpen={setOpen} />)}</Grid>

      <SectionHead n="05 · Recognition" bold="Recognition" />
      <RuleList as="dl">
        {recognition.map(([k, v]) => (
          <RuleItem as="div" key={k} preset="aside" space={2}>
            <Typography variant="eyebrow" component="dt">{k}</Typography>
            <Typography variant="prose" component="dd">{v}</Typography>
          </RuleItem>
        ))}
      </RuleList>
      <Box component="section" aria-labelledby="craft-more" sx={{ mt: 8, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography id="craft-more" component="h2" variant="h4">More work</Typography>
        <Measure as={Typography} color="text.secondary" sx={{ mt: 1 }}>Two more books for Tinfish Press, and still lifes I painted digitally.</Measure>
        <Button variant="outlined" sx={{ mt: 2 }} aria-expanded={more} aria-controls="craft-more-body" onClick={() => setMore((v) => !v)}>
          {more ? 'Hide more work' : 'Show more work'}
        </Button>
        <Box id="craft-more-body" hidden={!more} sx={{ mt: 2 }}>
          {tinfish.slice(2).map((b) => <Book key={b.title} b={b} onOpen={setOpen} />)}
          <Typography component="h3" variant="h4" sx={{ mt: 6, mb: 2 }}>Digital paintings</Typography>
          <Grid cols={paintings.length === 5 ? 5 : 3}>{paintings.map((p) => <Mat key={p.src} p={p} onOpen={setOpen} />)}</Grid>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        All images © Ben Viwatmanitsakul, all rights reserved. Logos belong to their organizations; books belong to their authors and publishers.
      </Typography>

      <Dialog open={!!open} onClose={() => setOpen(null)} maxWidth={false} aria-label={open?.title}
        PaperProps={{ sx: { bgcolor: 'edge.tint', p: { xs: 1.5, md: 3 }, maxWidth: '96vw' } }}>
        {open && (
          <>
            <IconButton onClick={() => setOpen(null)} aria-label="Close" sx={{ position: 'absolute', right: 8, top: 8, bgcolor: 'background.paper' }}><CloseIcon /></IconButton>
            <Box component="img" src={open.url} alt={open.alt} sx={{ display: 'block', maxWidth: '100%', maxHeight: '82vh', mx: 'auto' }} />
            <Typography sx={{ mt: 1.5, fontWeight: 650 }}>{open.title}{open.caption && <Typography component="span" color="text.secondary">. {open.caption}</Typography>}</Typography>
          </>
        )}
      </Dialog>
    </>
  );
}
