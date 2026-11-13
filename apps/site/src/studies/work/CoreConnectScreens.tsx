import { Fragment, useState } from 'react';
import { Box, Button, ButtonBase, Collapse, Dialog, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Columns, Measure, motion, Section } from '@bensumet/edge';
import { art } from '../../data/craft';
import { Crossfade } from '../../components/Motion';
import { CoreConnectRedesign } from './CoreConnectRedesign';
import { CoreConnectProcess } from './CoreConnectProcess';

const cc = (f: string) => art(`work/coreconnect/${f}`);

interface Screen { src: string; w: number; h: number; alt: string; caption?: string }

const hub: Screen = { src: cc('portal-hub.jpg'), w: 1568, h: 668, alt: 'The CoreConnect portal launcher: round icons for Policy, Rating, Claims, Agent, Insured, Billing, BI/MI, Admin and Shopper.' };

const pairs: { id: string; title: string; body: string; design: Screen; shipped: Screen; year: string }[] = [
  {
    id: 'bimi', year: '2019', title: 'The BI/MI dashboard',
    body: 'A home page of report cards under one filter bar: product, state and date range. My 2019 design shipped with the original look. A few years later the product was redesigned with a new look; the dashboard kept the filter bar and the card grid, and the cards now hold live reports.',
    design: { src: cc('design-bimi-2019.jpg'), w: 1600, h: 765, alt: 'Re-creation of my 2019 design: a filter bar over report cards for policies pending cancellation and open claims, each with an Export to Excel button.' },
    shipped: { src: cc('policy-dashboard.jpg'), w: 1548, h: 668, alt: 'Re-creation of the dashboard after the redesign: the same filter bar over report cards with tables and bar charts.' },
  },
  {
    id: 'upload', year: '2020', title: 'Upload Match',
    body: 'A spreadsheet inside the policy, so underwriters can paste or upload many rows at once instead of typing them one by one. My 2020 design shipped with the original look. After the redesign, each kind of problem is counted above the grid and can be filtered.',
    design: { src: cc('design-upload-match-2020.jpg'), w: 1600, h: 900, alt: 'Re-creation of my 2020 design: a quote page with a step list on the left and a spreadsheet grid of driver rows, with Upload File and Undo buttons.' },
    shipped: { src: cc('policy-property-grid.jpg'), w: 1548, h: 668, alt: 'Re-creation of the Property Information step after the redesign: counters for Misc, Format, Missing Data, Data Size and Invalid above a spreadsheet grid of locations.' },
  },
];

const gallery: Screen[] = [
  { src: cc('agent-quote-insured.jpg'), w: 1568, h: 668, alt: 'Agent portal: a home insurance quote on its General Policy Info step, with insured details and Yes or No toggles.', caption: 'Agent portal: a home quote, insured details' },
  { src: cc('agent-quote-premium.jpg'), w: 1568, h: 668, alt: 'Agent portal: the quote’s Premium step, a coverage table with limits and premiums totaling $1,094.', caption: 'Agent portal: the quote’s premium' },
  { src: cc('policy-search.jpg'), w: 1548, h: 668, alt: 'Policy portal: search results for business owners policies, with number, status, term, dates, insured, premium and state.', caption: 'Policy portal: search results' },
  { src: cc('policy-overview.jpg'), w: 1548, h: 668, alt: 'Policy portal: a business owners policy with its summary header, total premium panel and step list.', caption: 'Policy portal: one policy, summary header and steps' },
];

const screenParts: [string, string][] = [
  ['Price header', 'Who the quote is for, the annual premium, how it compares with the last version, and the next step. It stays in view while the table changes.'],
  ['Priced table', 'Coverages, options and credits, each with a subtotal. Limits and the deductible are dropdowns; changing one reprices the quote in place.'],
  ['Since the last version', 'An AI summary of what moved the price. Each point links to the record it came from, so the agent can repeat it with confidence.'],
  ['Suggestions', 'AI recommendations drawn from the quote’s own records, each with its reason and what it does to the price. Nothing changes until the agent accepts, and Undo reverses it.'],
  ['Go paperless', 'On the Insured tab. Turning it on applies the paperless discount right away, so the customer hears the saving as they agree to it.'],
];

const themes: { id: string; label: string; s: Screen }[] = [
  { id: 'botanico', label: 'Botanico', s: { src: cc('theme-botanico.jpg'), w: 1002, h: 582, alt: 'Theme preview in Botanico: deep green header and tabs, teal headings and icons.' } },
  { id: 'autunno', label: 'Autunno', s: { src: cc('theme-autunno.jpg'), w: 1002, h: 582, alt: 'Theme preview in Autunno: teal-to-copper banner, teal tabs, rust headings and icons.' } },
  { id: 'cielo', label: 'Cielo', s: { src: cc('theme-cielo.jpg'), w: 1002, h: 582, alt: 'Theme preview in Cielo: blue banner and tabs, orange links and icons.' } },
];

function Img({ s, onOpen }: { s: Screen; onOpen?: (s: Screen) => void }) {
  const img = <Box component="img" src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async"
    sx={{ display: 'block', width: '100%', height: 'auto', maxWidth: '100%' }} />;
  if (!onOpen) return <Box sx={{ border: 1, borderColor: 'divider' }}>{img}</Box>;
  return (
    <ButtonBase onClick={() => onOpen(s)} aria-label={`Enlarge: ${s.caption ?? s.alt}`}
      sx={{ display: 'block', width: '100%', border: 1, borderColor: 'divider', overflow: 'hidden',
        '& img': { transition: `transform ${motion.duration.base}ms ${motion.ease.standard}` },
        '&:hover img, &:focus-visible img': { transform: 'scale(1.015)' },
        [motion.reduced]: { '& img': { transition: 'none' }, '&:hover img, &:focus-visible img': { transform: 'none' } } }}>
      {img}
    </ButtonBase>
  );
}

function Pair({ p, onOpen }: { p: typeof pairs[number]; onOpen: (s: Screen) => void }) {
  const [view, setView] = useState<'design' | 'shipped'>('design');
  return (
    <Box component="figure" sx={{ m: 0, minWidth: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 1.5, mb: 1.5 }}>
        <Typography variant="h4" component="h3">{p.title}</Typography>
        <ToggleButtonGroup exclusive size="small" value={view} onChange={(_, v) => v && setView(v)} aria-label={`${p.title}: original design or after the redesign`}>
          <ToggleButton value="design">Before: {p.year}</ToggleButton>
          <ToggleButton value="shipped">After: redesign</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Crossfade active={view} views={[
        { id: 'design', node: <Img s={p.design} onOpen={onOpen} /> },
        { id: 'shipped', node: <Img s={p.shipped} onOpen={onOpen} /> },
      ]} />
      <Typography variant="prose" component="figcaption" color="text.secondary" sx={{ mt: 1.5 }}>
        {p.body}
      </Typography>
    </Box>
  );
}

export function CoreConnectScreens() {
  const [open, setOpen] = useState<Screen | null>(null);
  const [theme, setTheme] = useState('botanico');
  const [redo, setRedo] = useState<'redesign' | 'shipped'>('redesign');
  const [more, setMore] = useState(false);
  return (
    <>
      <Box component="section" aria-labelledby="cc-real" sx={{ mt: 8 }}>
        <Typography id="cc-real" variant="h3" component="h2" sx={{ mb: 1 }}>The product itself</Typography>
        <Measure as={Typography} color="text.secondary" sx={{ mb: 3 }}>
          The product belongs to my employer, so I don&rsquo;t show its screens. Every screen here is a re-creation I drew from it: the same
          layouts, components and flows, with fictional companies and data and no product branding. Two are shown before and after the product&rsquo;s redesign.
        </Measure>
        <Box component="figure" sx={{ m: 0, maxWidth: 880 }}>
          <Img s={hub} />
          <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            One sign-in opens every portal: policy, rating, claims, agent, insured, billing, BI/MI, admin and shopper. They all draw from the same design system.
          </Typography>
        </Box>
      </Box>

      <Box component="section" aria-labelledby="cc-pairs" sx={{ mt: 7 }}>
        <Typography id="cc-pairs" variant="h3" component="h2" sx={{ mb: 3 }}>The same screens, before and after the redesign</Typography>
        <Box sx={{ display: 'grid', gap: 6 }}>
          {pairs.map((p) => <Pair key={p.id} p={p} onOpen={setOpen} />)}
        </Box>
      </Box>

      <Box component="section" aria-labelledby="cc-portals" sx={{ mt: 7 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <Typography id="cc-portals" variant="h3" component="h2">Agent and policy portals</Typography>
          <Button variant="text" onClick={() => setMore((m) => !m)} aria-expanded={more} aria-controls="cc-portal-list">
            {more ? 'Hide screens' : `Show ${gallery.length} screens`}
          </Button>
        </Box>
        <Collapse in={more} id="cc-portal-list">
        <Columns as="ul" preset="halvesEarly" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {gallery.map((s) => (
            <Box component="li" key={s.src} sx={{ minWidth: 0 }}>
              <Img s={s} onOpen={setOpen} />
              <Typography variant="body2" sx={{ mt: 1 }}><strong>{s.caption}</strong></Typography>
            </Box>
          ))}
        </Columns>
        </Collapse>
      </Box>

      <Section id="cc-themes" title={<>One product, each carrier&rsquo;s brand</>} intro={<>
          A carrier sets its brand in the admin portal&rsquo;s theme editor: primary, accent and background colors, text on each, and the banner.
          The preview beside the fields is a sample policy page, so they see the result before saving. These are three of the themes that come with the product.
      </>}>
        <Columns align="start">
          <Box component="figure" sx={{ m: 0 }}>
            <Img s={{ src: cc('admin-theme-editor.jpg'), w: 1568, h: 668, alt: 'The admin theme editor: color fields with swatches on the left, a live theme preview of a policy page on the right.', caption: 'The admin theme editor' }} onOpen={setOpen} />
            <Typography component="figcaption" variant="body2" sx={{ mt: 1 }}><strong>The theme editor in the admin portal</strong></Typography>
          </Box>
          <Box component="figure" sx={{ m: 0 }}>
            <Crossfade active={theme} views={themes.map((t) => ({ id: t.id, node: <Img s={t.s} /> }))} />
            <Box component="figcaption" sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="body2"><strong>The same preview in</strong></Typography>
              <ToggleButtonGroup exclusive size="small" value={theme} onChange={(_, v) => v && setTheme(v)} aria-label="Theme shown in the preview">
                {themes.map((t) => <ToggleButton key={t.id} value={t.id}>{t.label}</ToggleButton>)}
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Columns>
      </Section>

      <CoreConnectProcess />

      <Box component="section" aria-labelledby="cc-flow" sx={{ mt: 8 }}>
        <Typography id="cc-flow" variant="h3" component="h2" sx={{ mb: 1 }}>Redesigned in 2026, with AI</Typography>
        <Measure as={Typography} color="text.secondary" sx={{ mb: 4 }}>
          Everything above I designed by hand, before AI tools. To see what AI changes in my process, I took one screen, the quote&rsquo;s
          Premium step, and redesigned it on Edge with AI coding assistants. I wrote the brief from the current screen, directed each pass
          and reviewed every change.
        </Measure>

        <Columns gap={{ xs: 3, md: 5 }} sx={{ mb: 5, maxWidth: 1080 }}>
          <Box>
            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>The problem</Typography>
            <Typography color="text.secondary">
              An agent usually prices a quote with the customer on the phone. On the current Premium step the price is a read-only receipt:
              the total scrolls away under a long table, changing a limit means going back to an earlier step and rating again, and nothing
              explains why the price moved since the last version or what would bring it down.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>The goal</Typography>
            <Typography color="text.secondary">
              One screen where the agent can see the price, change it and explain it without leaving the step, so &ldquo;why is it this
              much?&rdquo; and &ldquo;can we bring it down?&rdquo; get answered during the call.
            </Typography>
          </Box>
        </Columns>

        <Typography variant="h5" component="h3" sx={{ mb: 2 }}>What&rsquo;s on the screen</Typography>
        <Columns as="dl" template={{ xs: '1fr', sm: '14rem 1fr' }} gap={4} rowGap={{ xs: 0.5, sm: 2 }}
          sx={{ m: 0, mb: 5, maxWidth: 1080, '& dt': { mt: { xs: 1.5, sm: 0 } }, '& dd': { m: 0, color: 'text.secondary' } }}>
          {screenParts.map(([t, d]) => <Fragment key={t}><Typography variant="label" component="dt">{t}</Typography><dd>{d}</dd></Fragment>)}
        </Columns>

        <Typography variant="h5" component="h3" sx={{ mb: 2 }}>Try it</Typography>
        <Measure as="ol" sx={{ m: 0, mb: 3, pl: 2.5, display: 'grid', gap: 1, color: 'text.secondary', '& b': { color: 'text.primary' } }}>
          <li>Change the <b>Deductible</b> to $1,000. The total in the header and the comparison with the last version update.</li>
          <li>Accept <b>Add water backup</b>. The option row and its subtotal change; Undo takes it back.</li>
          <li>Open the <b>Insured</b> tab and turn <b>Go paperless</b> off, then return to Premium. The $12 paperless credit is gone.</li>
          <li>Set the demo&rsquo;s rating service to <b>Down</b> and change any limit. You get the error, your choices are kept, and Try again recovers.</li>
        </Measure>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <ToggleButtonGroup exclusive size="small" value={redo} onChange={(_, v) => v && setRedo(v)} aria-label="Premium step: current product or the 2026 AI redesign">
            <ToggleButton value="shipped">Before: current product</ToggleButton>
            <ToggleButton value="redesign">After: 2026 AI redesign</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="body2" color="text.secondary">Sample data and a sample price model.</Typography>
        </Box>
        <Crossfade active={redo} views={[
          { id: 'redesign', node: <CoreConnectRedesign /> },
          { id: 'shipped', node: <Img s={gallery[1]} onOpen={setOpen} /> },
        ]} />
      </Box>

      <Dialog open={!!open} onClose={() => setOpen(null)} maxWidth={false} aria-label={open?.caption ?? open?.alt}
        slotProps={{ paper: { sx: { m: { xs: 1, md: 4 }, maxWidth: 'min(1600px, 100%)', bgcolor: 'background.paper' } } }}>
        {open && (
          <Box sx={{ position: 'relative' }}>
            <Box component="img" src={open.src} alt={open.alt} sx={{ display: 'block', width: '100%', height: 'auto', maxHeight: '86vh', objectFit: 'contain' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, px: 2, py: 1 }}>
              <Typography variant="body2" color="text.secondary">{open.caption ?? open.alt}</Typography>
              <IconButton onClick={() => setOpen(null)} aria-label="Close" size="small"><CloseIcon fontSize="small" /></IconButton>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}
