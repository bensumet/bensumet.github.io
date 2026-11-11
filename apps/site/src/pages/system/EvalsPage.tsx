import { Box, Link, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Lead, typography } from '@bensumet/edge';
import { Opener } from '../../components/Layout';
import { art } from '../../data/craft';
import { href } from '../../router';
import { useVisitState } from '../../useVisitState';

// Results from two runs on Nov 1, 2026. Each cell is one fresh agent, one attempt.
// Rules counts use the current checker, which gained the spacing and status checks
// between the runs.
const runs = [
  { task: 'Returns screen', cond: 'Without rules', rules: '11 of 11', states: 'None', good: false, a11y: 'Pass', note: '' },
  { task: 'Returns screen', cond: 'With rules', rules: '10 of 11', states: 'Loading, empty, error', good: true, a11y: 'Landmark issue', note: 'Declared its own main landmark' },
  { task: 'Account summary (AI)', cond: 'Without rules', rules: '14 of 14', states: 'None', good: false, a11y: 'Pass', note: '' },
  { task: 'Account summary (AI)', cond: 'With rules', rules: '14 of 14', states: 'Loading, empty, error', good: true, a11y: 'Pass', note: '' },
  { task: 'Service status', cond: 'Without rules', rules: '11 of 11', states: 'Restart error, empty', good: false, a11y: 'Pass', note: '', stateNote: 'No loading or load-failure state; its empty state can\u2019t be reached with its own data' },
  { task: 'Service status', cond: 'With rules', rules: '11 of 11', states: 'Loading, empty, error', good: true, a11y: 'Pass', note: '' },
];

const findings = [
  ['The codebase teaches the visual rules on its own.', 'Every screen, with or without the rules file, took its colors from the theme, kept square corners, labeled every input and used Edge\u2019s AI components for the summary. Agents learn a lot from the code around them, so good examples in the repo are part of the system.'],
  ['The rules file made the difference on what code can\u2019t show.', 'Only the agents given the rules built loading, empty and error states for the first two tasks. Nothing in the existing screens demanded them; the written rule did.'],
  ['The gap narrowed on the third task.', 'By the third task the repo held more screens with good states, and the agent without the rules handled a failed restart well. It still skipped the loading and load-failure states, and its empty state was unreachable with its own data. Better examples raise the floor; the written rules still cover what examples don\u2019t.'],
  ['My checker overcounted.', 'It looks for the words a person would see, so it credited the third screen without rules with loading and error states that only cover the restart button. I read every screen to fill in the table; a stronger check would render each state and test it.'],
  ['With the rules, agents checked their own work.', 'The instructions tell agents to run the rules check, and they did before handing back. That\u2019s part of the treatment, and it also means they could see the test they were graded on.'],
  ['The test found a gap in the rules.', 'One screen built with the rules declared its own main landmark, which breaks when it sits inside a page. The rules didn\u2019t cover landmarks, so I added the rule and a check for it.'],
];

const tasks = [
  { id: 'returns', label: 'Returns screen', name: 'returns screen' },
  { id: 'summary', label: 'Account summary', name: 'account summary' },
  { id: 'status', label: 'Service status', name: 'service status screen' },
] as const;
type TaskId = (typeof tasks)[number]['id'];

export default function EvalsPage() {
  const [task, setTask] = useVisitState<TaskId>('evals.task', 'returns');
  const current = tasks.find((t) => t.id === task) ?? tasks[0];
  return (
    <>
      <Opener eyebrow="Evaluations" bold="Does an AI assistant" italic="follow Edge? I tested it.">
        <Lead opening="Publishing rules for agents">
          is only worth it if it changes what they build. So I gave fresh AI agents the same three tasks in two copies of this repo: one with the
          rules and instructions file, one with them removed. Then I scored every screen the same way.
        </Lead>
      </Opener>

      <Box component="section" aria-labelledby="ev-method" sx={{ mb: 7, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <Typography id="ev-method" variant="h3" component="h2" sx={{ mb: 1.5 }}>How it was run</Typography>
          <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { mb: 1 } }}>
            <li>Three tasks: a returns screen (a list, a status filter and a form), an AI-written account summary with suggested next steps, and a service status screen with a restart that can fail.</li>
            <li>Two conditions, with identical prompts: the repo with the <code>CLAUDE.md</code> instructions and Edge&rsquo;s rules files, and the same repo with both removed.</li>
            <li>Six fresh agents, one per cell, each working only in its own copy. The third task ran later the same day, on the repo as it was then.</li>
          </Box>
        </Box>
        <Box>
          <Typography variant="eyebrow">How it was scored</Typography>
          <Box component="ul" sx={{ pl: 2.5, mt: 1, mb: 0, '& li': { mb: 1 } }}>
            <li><b>Rules check:</b> a script that reads the screen&rsquo;s code for hard-coded colors and fonts, rounded corners, raw pixel spacing, status shown by color alone, unlabeled inputs, extra primary buttons, page landmarks, and AI output without a label, sources or feedback.</li>
            <li><b>States:</b> whether the screen handles loading, empty and error, checked by reading the code, not just by the script.</li>
            <li><b>Type check</b> and the <b>accessibility test</b> used on every page of this site.</li>
          </Box>
        </Box>
      </Box>

      <Box component="section" aria-labelledby="ev-results" sx={{ mb: 7 }}>
        <Typography id="ev-results" variant="h3" component="h2" sx={{ mb: 2 }}>Results</Typography>
        <Box tabIndex={0} role="region" aria-label="Scrollable table" sx={{ overflowX: 'auto', border: 1, borderColor: 'divider' }}>
          <Box component="table" sx={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums', '& th, & td': { textAlign: 'left', px: 2, py: 1.25, borderBottom: 1, borderColor: 'divider', verticalAlign: 'top' }, '& th': { bgcolor: 'edge.raised', fontWeight: 600, fontSize: '0.85rem' } }}>
            <Box component="caption" sx={{ captionSide: 'bottom', textAlign: 'left', px: 2, py: 1.5 }}>
              <Typography component="span" variant="body2" color="text.secondary">One agent per cell, one attempt each, run on November 1, 2026. Every screen is scored with the current checker, including checks added after the first run.</Typography>
            </Box>
            <thead><tr><th scope="col">Task</th><th scope="col">Condition</th><th scope="col">Rules check</th><th scope="col">States beyond the happy path</th><th scope="col">Types</th><th scope="col">Accessibility</th></tr></thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.task + r.cond}>
                  <td>{r.task}</td>
                  <td style={{ fontWeight: 600 }}>{r.cond}</td>
                  <td>{r.rules}{r.note && <Typography variant="body2" color="text.secondary">{r.note}</Typography>}</td>
                  <td><Box component="span" sx={{ color: r.good ? 'success.main' : 'error.main', fontWeight: 600 }}>{r.states}</Box>{'stateNote' in r && <Typography variant="body2" color="text.secondary">{r.stateNote}</Typography>}</td>
                  <td>Pass</td>
                  <td><Box component="span" sx={{ color: r.a11y === 'Pass' ? 'text.primary' : 'error.main', fontWeight: r.a11y === 'Pass' ? 400 : 600 }}>{r.a11y}</Box></td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </Box>

      <Box component="section" aria-labelledby="ev-screens" sx={{ mb: 7 }}>
        <Typography id="ev-screens" variant="h3" component="h2">What they built</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2.5, maxWidth: typography.measure }}>
          Six screens: each task was built twice, once without the rules and once with them. Pick a task to see its two screens side by side.
        </Typography>
        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1.5, alignItems: 'center', mb: 3 }}>
          <Typography id="ev-task" variant="body2" sx={{ fontWeight: 600 }}>Task</Typography>
          <ToggleButtonGroup exclusive size="small" value={task} onChange={(_, v) => v && setTask(v)} aria-labelledby="ev-task">
            {tasks.map((t, i) => <ToggleButton key={t.id} value={t.id} sx={{ textTransform: 'none' }}>{i + 1}. {t.label}</ToggleButton>)}
          </ToggleButtonGroup>
        </Stack>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, alignItems: 'start' }}>
          {(['without', 'with'] as const).map((c) => {
            const run = runs.find((r) => r.task.startsWith(current.label.split(' ')[0]) && r.cond === (c === 'with' ? 'With rules' : 'Without rules'));
            return (
              <Box component="figure" key={c} sx={{ m: 0, minWidth: 0 }}>
                <Box component="figcaption" sx={{ mb: 1.25 }}>
                  <Typography sx={{ fontWeight: 650 }}>{c === 'with' ? 'With the rules' : 'Without the rules'}</Typography>
                  {run && (
                    <Typography variant="body2" color="text.secondary">
                      Rules check {run.rules} · States: <Box component="span" sx={{ color: run.good ? 'success.main' : 'error.main', fontWeight: 600 }}>{run.states.toLowerCase()}</Box>
                      {run.a11y !== 'Pass' && <> · <Box component="span" sx={{ color: 'error.main', fontWeight: 600 }}>{run.a11y.toLowerCase()}</Box></>}
                    </Typography>
                  )}
                </Box>
                <Link href={art(`evals/${task}-${c}.png`)} target="_blank" rel="noopener" sx={{ display: 'block', border: 1, borderColor: 'divider', bgcolor: 'edge.tint', p: 1 }}>
                  <Box component="img" src={art(`evals/${task}-${c}.png`)} loading="lazy"
                    alt={`The ${current.name} an agent built ${c} Edge's rules, rendered on its own. Opens full size.`}
                    sx={{ display: 'block', width: '100%', height: 'auto' }} />
                </Link>
              </Box>
            );
          })}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>Each screen is rendered on its own, exactly as its agent wrote it, in the Ink theme. Screens show their first state, so loading and error states don&rsquo;t appear here. Click a screen to see it full size.</Typography>
      </Box>

      <Box component="section" aria-labelledby="ev-findings" sx={{ mb: 7 }}>
        <Typography id="ev-findings" variant="h3" component="h2" sx={{ mb: 3 }}>What I learned</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {findings.map(([h, b]) => (
            <Box key={h}>
              <Typography sx={{ fontWeight: 650 }}>{h}</Typography>
              <Typography sx={{ mt: 0.5, fontFamily: typography.display, fontSize: '1.12rem', lineHeight: 1.55, color: 'text.secondary' }}>{b}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box component="section" aria-labelledby="ev-limits" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <Typography id="ev-limits" variant="h3" component="h2" sx={{ mb: 1.5 }}>Limits</Typography>
          <Typography sx={{ maxWidth: typography.measure }}>
            Six screens is a demonstration, not a benchmark: one attempt per cell, one model family, three tasks. The rules check reads code, so it
            can&rsquo;t judge how a screen looks; that&rsquo;s what the screenshots and a person are for.
          </Typography>
        </Box>
        <Box>
          <Typography variant="eyebrow">Next</Typography>
          <Typography sx={{ mt: 1, maxWidth: typography.measure }}>
            Run more tasks, several attempts each, on every change to the rules, render each state instead of reading for it, and add a third condition with the MCP server connected. The rules, the instructions file
            and the check are in the repo; see <Link href={href('system', 'agents')}>For agents</Link>.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
