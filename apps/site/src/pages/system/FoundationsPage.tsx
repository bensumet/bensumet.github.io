import {
  Box, Chip, Link, Stack, Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { EdgeCard, StitchDivider } from '@bensumet/edge';
import { useEdgeSettings } from '@bensumet/edge';
import { contrastRatio, wcagLevel } from '@bensumet/edge';
import { chapters, edgeColor, edgeLabel, edges, space, surfacesFor, typography, type EdgeName } from '@bensumet/edge';
import { img } from '../../data/studio';
import { art } from '../../data/craft';
import { href } from '../../router';
import { Lead } from '@bensumet/edge';
import { GhostWord, PageHero, posterSx } from '@bensumet/edge';

function Swatch({ name, color, against, note, nonText = false }: { name: string; color: string; against: string; note: string; nonText?: boolean }) {
  const ratio = contrastRatio(color, against);
  // Controls and borders need 3:1 (WCAG 1.4.11); text needs 4.5:1 (1.4.3).
  const level = nonText ? (ratio >= 3 ? 'Pass 3:1' : 'Fail') : wcagLevel(ratio);
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1 }}>
      <Box aria-hidden="true" sx={{ width: 44, height: 44, bgcolor: color, border: 1, borderColor: 'divider', flexShrink: 0 }} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h5" component="p">{name}</Typography>
        <Typography variant="body2" color="text.secondary">{color.toUpperCase()} · {note}</Typography>
      </Box>
      <Chip
        size="small"
        variant="outlined"
        label={`${ratio.toFixed(1)}:1 ${level}`}
        color={level === 'Fail' ? 'error' : level === 'AA large' ? 'warning' : 'success'}
      />
    </Stack>
  );
}

/** The cover: four real screens built only from Edge, each labeled with what it proves. */
function CoverPlate() {
  const plates = [
    { src: 'system/cover-console-paper.jpg', label: 'A dense product screen, in Paper', alt: 'The Console demo in the light theme: a services table with status chips and a failed-deploy alert.' },
    { src: 'system/cover-console-ink.jpg', label: 'The same screen in Ink, with a different accent', alt: 'The same Console demo in the dark theme with a mint accent.' },
    { src: 'system/cover-states.jpg', label: 'Every state, in both themes', alt: 'Button states from default to loading, shown in the light and dark themes side by side.' },
    { src: 'system/cover-ai.jpg', label: 'AI output a person approves', alt: 'Suggested fixes for a failed build, each with its reasoning and Accept and Dismiss buttons.' },
  ];
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 0.25, bgcolor: 'divider', border: 1, borderColor: 'divider' }}>
        {plates.map((pl) => (
          <Box key={pl.src} sx={{ bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
            <Box component="img" src={art(pl.src)} alt={pl.alt} loading="lazy"
              sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', objectPosition: 'left top', display: 'block' }} />
            <Typography variant="body2" sx={{ px: 2, py: 1.25, fontWeight: 600, borderTop: 1, borderColor: 'divider' }}>{pl.label}</Typography>
          </Box>
        ))}
      </Box>
      <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
        Built only from Edge, with sample data.{' '}
        <Link href={href('system', 'console')} sx={{ fontWeight: 600 }}>Try the Console demo</Link>{' '}or{' '}
        <Link href={href('system', 'states')} sx={{ fontWeight: 600 }}>see every state</Link>.
      </Typography>
    </Box>
  );
}

/** A type specimen set like a poster: one word across the grotesque's widths, against Garamond italic. */
function TypePoster() {
  const widths = [62, 75, 90, 110, 125];
  return (
    <EdgeCard sx={{ p: { xs: 3, md: 5 }, overflow: 'hidden' }}>
      <Grid container spacing={4} alignItems="flex-end">
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="overline" color="primary">poster · Archivo, width 62 to 125</Typography>
          <Box aria-hidden="true" sx={{ mt: 1 }}>
            {widths.map((w, i) => (
              <Box
                key={w}
                sx={{
                  ...posterSx(w, 300 + i * 150),
                  fontSize: { xs: '2.6rem', sm: '3.6rem', md: '4.4rem' },
                  lineHeight: 0.92,
                  whiteSpace: 'nowrap',
                  color: i === widths.length - 1 ? 'primary.main' : 'text.primary',
                } as object}
              >
                Deploy
              </Box>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            One variable font, five settings: width and weight change together from condensed light to expanded black.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="overline" color="primary">text · EB Garamond</Typography>
          <Typography
            aria-hidden="true"
            sx={{ fontFamily: typography.display, fontStyle: 'italic', fontSize: { xs: '6rem', md: '9rem' }, lineHeight: 0.85, mt: 1, color: 'text.primary' }}
          >
            Aa<Box component="span" sx={{ color: 'primary.main' }}>&</Box>
          </Typography>
          <Typography sx={{ fontFamily: typography.display, fontSize: '1.35rem', mt: 2, lineHeight: 1.4 }}>
            <Box component="span" sx={{ fontVariantCaps: 'all-small-caps', letterSpacing: '0.06em' }}>Small caps,</Box>{' '}
            <em>italics</em> and old-style figures 1234567890.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Interface · Inter, with tabular figures: <span className="tabular">$184.20 · $86.75 · $341.10</span>
          </Typography>
        </Grid>
      </Grid>
    </EdgeCard>
  );
}

export function FoundationsPage() {
  const { mode, edge } = useEdgeSettings();
  const s = surfacesFor(mode, edge);

  return (
    <Stack spacing={6}>
      <PageHero folio="one" label="Ground" bold="Quiet surfaces," italic="one bright edge.">
        <Lead opening="Edge keeps surfaces">
          navy and near-black so a single accent can mark focus, selection and the primary action. Pick an edge
          color above and every screen follows. Paper mode applies the same rules on ivory.
        </Lead>
      </PageHero>

      <EdgeCard sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="overline" color="primary">what Edge is</Typography>
        <Typography variant="h3" component="h2" sx={{ mt: 0.5, mb: 2 }}>A design system, shown working</Typography>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography sx={{ maxWidth: typography.measure }}>
              A design system is the shared set of colors, type, spacing and components a product team builds every
              screen from, so the product stays consistent and accessible as it grows. Edge is one I designed and
              built in React, TypeScript and MUI. The examples use a fictional cloud platform project, Northpine
              Retail, with services, deploys, environments and billing, so every part is shown in the kind of
              product it was built for.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <li><b>Foundations:</b> the colors, type and spacing everything is built from</li>
              <li><b>Components:</b> the reusable parts, all usable by keyboard</li>
              <li><b>AI patterns:</b> how to present AI output people can trust</li>
              <li><b>For agents:</b> the same rules as data, so coding assistants build with Edge correctly</li>
              <li><b>This whole site</b> is built only from these parts</li>
            </Stack>
          </Grid>
        </Grid>
      </EdgeCard>

      <CoverPlate />

      <Box component="section" aria-labelledby="color-heading" sx={{ position: 'relative', '& > :not([aria-hidden])': { position: 'relative', zIndex: 1 } }}>
        <GhostWord word="INK" align="right" />
        <Typography id="color-heading" variant="h2" sx={{ mb: 1 }}>Color</Typography>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: typography.measure }}>
          Every ratio below is calculated live from the tokens. The same pairs are checked in automated tests, so a
          color change that breaks WCAG AA fails the build.
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <EdgeCard sx={{ p: 3, height: '100%' }}>
              <Typography variant="h4" component="h3" sx={{ mb: 1 }}>{mode === 'ink' ? 'Ink' : 'Paper'} surfaces</Typography>
              <Swatch name="Primary text" color={s.text} against={s.background} note="on background" />
              <Swatch name="Secondary text" color={s.muted} against={s.background} note="on background" />
              <Swatch name="Control outline" color={s.control} against={s.surface} note="input borders, needs 3:1" nonText />
              <Swatch name="Surface" color={s.surface} against={s.text} note="cards and app bar" />
              <Swatch name="Background" color={s.background} against={s.text} note={mode === 'paper' ? 'ivory stock' : 'page'} />
              {mode === 'paper' && <Swatch name="Chapter tint" color={chapters[edge].tint} against={s.text} note="page openers" />}
            </EdgeCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <EdgeCard sx={{ p: 3, height: '100%' }}>
              <Typography variant="h4" component="h3" sx={{ mb: 1 }}>Edge colors</Typography>
              {(Object.keys(edges) as EdgeName[]).map((name) => {
                const c = edgeColor(name, mode);
                return (
                  <Swatch
                    key={name}
                    name={`${edgeLabel(name, mode)}${name === edge ? ' (active)' : ''}`}
                    color={c}
                    against={s.background}
                    note="as text on background"
                  />
                );
              })}
            </EdgeCard>
          </Grid>
        </Grid>
      </Box>

      <StitchDivider aria-hidden="true" />

      <Box component="section" aria-labelledby="type-heading" sx={{ position: 'relative', '& > :not([aria-hidden])': { position: 'relative', zIndex: 1 } }}>
        <GhostWord word="TYPE" align="right" />
        <Typography id="type-heading" variant="h2" sx={{ mb: 1 }}>Type</Typography>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: typography.measure }}>
          Set the way I set my type study: contrast does the work. Archivo, a variable grotesque, runs from
          hairline to black, so headlines pair a heavy line with a light one at poster scale. EB Garamond carries
          the reading text and chapter marks, with true small caps. Inter handles interface labels and numbers.
          Reading text holds to about 66 characters a line.
        </Typography>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TypePoster />
          </Grid>
          <Grid size={12}>
            <EdgeCard sx={{ p: 3 }}>
              <Stack spacing={2.5}>
                {([
                  ['h1', 'Display, 38–54px, fluid', 'Production, Northpine Retail'],
                  ['h2', 'Heading 2, 32–44px, fluid', 'Billing and usage'],
                  ['h3', 'Heading 3, 26px', 'Environment variables'],
                  ['h4', 'Heading 4, 20px', '3 services in Ohio'],
                  ['body1', 'Body, 16px', 'Changes to environment variables apply on the next deploy. Redeploy orders-api to use the new DATABASE_URL, or wait for the next push to main.'],
                  ['body2', 'Small, 14px', 'Deployed 12 min ago by Priya Shah from main at 4e1c9a2.'],
                ] as const).map(([variant, label, sample]) => (
                  <Grid container key={variant} spacing={2} alignItems="baseline">
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Typography variant="body2" color="text.secondary">{label}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 9 }}>
                      <Typography variant={variant} component="p">{sample}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </EdgeCard>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <EdgeCard sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="overline" color="primary">a page of reading text</Typography>
              <Lead opening="Every deploy starts" sx={{ mt: 1.5, fontSize: '1.2rem' }}>
                with a push to the branch a service tracks. The platform builds that commit, runs the pre-deploy
                command, then starts the new instance next to the old one. Traffic moves over only after the health
                check passes, so a failed build never takes the live service down. If it fails, the build log shows
                the first error at the top.
              </Lead>
              <Typography aria-hidden="true" sx={{ fontFamily: typography.display, fontStyle: 'italic', color: 'text.secondary', mt: 'auto', pt: 3, textAlign: 'center', fontSize: '1.05rem' }}>
                thirteen
              </Typography>
            </EdgeCard>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <EdgeCard sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
              <Typography variant="overline" color="primary">details that matter</Typography>
              <Stack component="dl" spacing={1.75} sx={{ m: 0, mt: 1.5, '& dt': { fontWeight: 600 }, '& dd': { m: 0, color: 'text.secondary' } }}>
                <div>
                  <dt>True small caps</dt>
                  <dd><Box component="span" sx={{ fontFamily: typography.display, fontVariantCaps: 'all-small-caps', letterSpacing: '0.06em', fontSize: '1.15rem', color: 'text.primary' }}>API, TLS and CPU</Box>, drawn from the font, not shrunken capitals.</dd>
                </div>
                <div>
                  <dt>Aligned figures</dt>
                  <dd>
                    Costs and usage line up in columns.
                    <Box component="span" className="tabular"
                      sx={{ display: 'grid', justifyItems: 'end', width: 'fit-content', mt: 0.75, pl: 1.5, borderLeft: 1, borderColor: 'divider', color: 'text.primary', lineHeight: 1.5 }}>
                      {['$184.20', '$86.75', '$341.10'].map((v) => <span key={v}>{v}</span>)}
                    </Box>
                  </dd>
                </div>
                <div>
                  <dt>Real punctuation</dt>
                  <dd>Curly quotes “like these,” apostrophes in can’t, and en dashes for ranges, 2–4 minutes.</dd>
                </div>
                <div>
                  <dt>Balanced headings</dt>
                  <dd>Headlines balance across lines and paragraphs avoid one-word last lines.</dd>
                </div>
              </Stack>
            </EdgeCard>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" aria-labelledby="space-heading" sx={{ position: 'relative', '& > :not([aria-hidden])': { position: 'relative', zIndex: 1 } }}>
        <GhostWord word="GRID" align="right" />
        <Typography id="space-heading" variant="h2" sx={{ mb: 3 }}>Spacing</Typography>
        <EdgeCard sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            {space.slice(1).map((px) => (
              <Stack key={px} direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" color="text.secondary" sx={{ width: 48 }}>{px}px</Typography>
                <Box aria-hidden="true" sx={{ height: 12, width: px * 3, bgcolor: 'primary.main' }} />
              </Stack>
            ))}
          </Stack>
        </EdgeCard>
      </Box>

      <Box component="figure" sx={{ m: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' }, gap: 3, alignItems: 'center', pt: 4, borderTop: 1, borderColor: 'divider' }}>
        <Box component="img" src={img('leather/edge-color-collection.jpg')} loading="lazy"
          alt="Navy and black leather wallets, each with a different painted edge: blue, orange, lime and red"
          sx={{ width: '100%', maxWidth: 200, aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }} />
        <Box component="figcaption">
          <Typography sx={{ fontWeight: 650 }}>Where the look came from</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5, maxWidth: typography.measure }}>
            Edge started at my workbench. I make leather goods in dark hides and paint each edge one bright color, and that rule carried
            over: quiet surfaces, one bright accent.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
