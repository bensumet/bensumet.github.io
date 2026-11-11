import { Box, Link, Typography } from '@mui/material';
import { EdgeCard, Lead, typography } from '@bensumet/edge';
import { Opener } from '../../components/Layout';
import { href } from '../../router';

const mine = [
  'Who the site is for and what it has to prove: design, code and designing with AI, in one link.',
  'Which work to show, and which to leave out because it was old, thin or not mine to publish.',
  'The rules for company work: rebuilt on a fictional product, with names, data and branding replaced.',
  'Design calls on every page, from the Ink theme as the default to how each study is laid out.',
  'Corrections: when the CoreConnect screens it worked from were years out of date, I set it to the current build.',
  'That its instructions stay in this repo, so they can’t reach my work projects.',
];

const theirs = [
  'Wrote the code: the site, the studies, and the changes to Edge.',
  'Wrote the tests, the rules checker and the evaluation.',
  'Drafted the copy from what I told it, for me to edit.',
  'Ran every check below after each change, and fixed what failed.',
];

const gates = [
  { gate: 'Type check', checks: 'Strict TypeScript across Edge and the site.', caught: 'A type mistake in the search results and a missing test-matcher type, before either ran.' },
  { gate: 'Unit tests', checks: 'The logic behind the studies, such as search grouping and color math.', caught: '' },
  { gate: 'Accessibility tests', checks: 'Every site page, in light and dark, with the axe tool by Deque. The embedded mockups aren’t covered by this gate.', caught: 'Three issues in an earlier, in-page version of the admin mockup: a dropdown without a label, a skipped heading level and a landmark nested inside another.' },
  { gate: 'Contrast check', checks: 'Every text, control and accent pair, measured on each build; a pair below AA fails the tests.', caught: '' },
  { gate: 'Rules coverage', checks: 'Every Edge component has a rules file an AI assistant can read.', caught: '' },
  { gate: 'Rules checker', checks: 'Screens, read for hard-coded colors, rounded corners, unlabeled inputs and more.', caught: 'Its own mistakes first: it misread arrow functions and counted dialog buttons against the page.' },
  { gate: 'Evaluation', checks: 'Whether fresh agents follow Edge, with and without the rules.', caught: 'A rule Edge was missing, about page landmarks. It’s in the rules now.' },
  { gate: 'My review', checks: 'Every page in the preview before anything goes live.', caught: 'Copy that claimed more than I’d done was cut or rewritten.' },
];

const numbers = [
  { value: '117', label: 'automated tests, run on every change' },
  { value: '15', label: 'pages tested for accessibility, in both themes' },
  { value: '11', label: 'rules files an AI assistant reads' },
  { value: '8', label: 'gates before anything goes live' },
];

const commits = [
  'Start the portfolio on Edge',
  'Add case studies, How I lead and the work strip; default to Ink',
  'Stop tracking generated Edge data',
  'Finish Designing with AI and add accessibility tests',
  'Embed Edge rules for assistants and evaluate them',
];

export function BuildLogStudy() {
  return (
    <>
      <Opener eyebrow="Designing with AI · Build log" bold="This site," italic="built with Claude Code.">
        <Lead opening="I built this portfolio with Claude Code.">
          I set the direction and made the calls. It wrote the code, the tests and first drafts of the copy, and ran the checks. Here&rsquo;s who
          did what, and what kept the quality where I want it.
        </Lead>
      </Opener>

      <Box component="section" aria-labelledby="bl-split" sx={{ mb: 7 }}>
        <Typography id="bl-split" variant="h3" component="h2" sx={{ mb: 3 }}>Who did what</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <EdgeCard variant="outlined" sx={{ p: 3 }}>
            <Typography variant="eyebrow">Me</Typography>
            <Box component="ul" sx={{ pl: 2.5, mt: 1.5, mb: 0, '& li': { mb: 1.25 } }}>
              {mine.map((m) => <li key={m}>{m}</li>)}
            </Box>
          </EdgeCard>
          <EdgeCard variant="outlined" sx={{ p: 3 }}>
            <Typography variant="eyebrow">The assistant</Typography>
            <Box component="ul" sx={{ pl: 2.5, mt: 1.5, mb: 0, '& li': { mb: 1.25 } }}>
              {theirs.map((t) => <li key={t}>{t}</li>)}
            </Box>
          </EdgeCard>
        </Box>
      </Box>

      <Box component="section" aria-label="By the numbers" sx={{ mb: 7, display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, borderTop: 1, borderBottom: 1, borderColor: 'text.primary', py: 3 }}>
        {numbers.map((n) => (
          <Box key={n.label}>
            <Typography sx={{ fontFamily: typography.poster, fontWeight: 800, fontSize: '2.6rem', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{n.value}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>{n.label}</Typography>
          </Box>
        ))}
      </Box>

      <Box component="section" aria-labelledby="bl-gates" sx={{ mb: 7 }}>
        <Typography id="bl-gates" variant="h3" component="h2" sx={{ mb: 1 }}>The gates every change goes through</Typography>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: typography.measure }}>
          Writing code got fast. These are what make it safe to ship, and each one has earned its place on this site.
        </Typography>
        <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: 1, borderColor: 'text.primary' }}>
          {gates.map((g, i) => (
            <Box component="li" key={g.gate} sx={{ display: 'grid', gridTemplateColumns: { xs: '2.5rem 1fr', md: '2.5rem 12rem 1fr 1fr' }, gap: 2, py: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</Typography>
              <Typography sx={{ fontWeight: 650 }}>{g.gate}</Typography>
              <Typography color="text.secondary" sx={{ gridColumn: { xs: '2', md: 'auto' } }}>{g.checks}</Typography>
              <Typography sx={{ gridColumn: { xs: '2', md: 'auto' } }}>
                {g.caught ? <><Box component="span" sx={{ fontWeight: 600 }}>Caught: </Box>{g.caught}</> : <Box component="span" sx={{ color: 'text.secondary' }}>Nothing yet. It runs on every change.</Box>}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box component="section" aria-labelledby="bl-history" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <Typography id="bl-history" variant="h3" component="h2" sx={{ mb: 2 }}>The history</Typography>
          <Box component="ol" sx={{ pl: 2.5, m: 0, '& li': { mb: 1 } }}>
            {commits.map((c) => <li key={c}>{c}</li>)}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            The early commits. I review each version in a private preview before anything goes live. Edge itself was built the same way, earlier.
          </Typography>
        </Box>
        <Box>
          <Typography variant="eyebrow">What I took from it</Typography>
          <Typography sx={{ mt: 1, fontFamily: typography.display, fontSize: '1.2rem', lineHeight: 1.6, maxWidth: typography.measure }}>
            The assistant is fastest when the standards are written down and tested, and slowest when they live only in my head. Most of my time
            went into deciding, reviewing and correcting, which is where I want it. More on that in{' '}
            <Link href={href('ai', 'process')}>How I work with AI</Link> and the <Link href={href('system', 'evals')}>Evaluations</Link>.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
