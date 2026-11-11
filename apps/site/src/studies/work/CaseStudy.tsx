import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowRule, Columns, Lead, Measure, Section, Stat, StatGrid, Tag } from '@bensumet/edge';
import { NumberedList, Opener, Points } from '../../components/Layout';

export interface Fact { label: string; value: string }
export interface Point { head: string; body: string }
export interface Stat { figure: string; label: string }

export interface CaseStudyContent {
  eyebrow: string;
  bold: string;
  italic: string;
  leadOpening: string;
  lead: string;
  header: Fact[];
  problem: string;
  /** How I lead the team on this work; shown right after the problem. */
  team?: string;
  design: Point[];
  designVisual?: React.ReactNode;
  code: Point[];
  codeVisual?: React.ReactNode;
  decisions: Point[];
  results: Stat[];
  resultNote?: string;
  differently?: string;
  extra?: React.ReactNode;
  /** Shown right under the header, before the problem: the work at a glance. */
  showcase?: React.ReactNode;
}

/** The branching rule from the Space and Place books: one line splits to Design and Code. */
const Branch = styled('div')(({ theme }) => {
  const line = theme.vars.palette.edge.line;
  const stroke = (left: string, top: number, height: number) => ({ position: 'absolute' as const, left, top, height, width: 1, backgroundColor: line });
  return {
    display: 'none',
    position: 'relative',
    height: 64,
    marginBlock: theme.spacing(4),
    [theme.breakpoints.up('md')]: { display: 'block' },
    '& .trunk': stroke('50%', 0, 24),
    '& .bar': { position: 'absolute', left: '25%', right: '25%', top: 24, height: 1, backgroundColor: line },
    '& .twig': stroke('0', 24, 16),
    '& .label': { position: 'absolute', top: 44, transform: 'translateX(-50%)' },
  };
});

function BranchRule() {
  return (
    <Branch aria-hidden="true">
      <span className="trunk" />
      <span className="bar" />
      {[['25%', 'Design'], ['75%', 'Code']].map(([l, t]) => (
        <span key={t}>
          <span className="twig" style={{ left: l }} />
          <Typography variant="kicker" className="label" style={{ left: l }}>{t}</Typography>
        </span>
      ))}
    </Branch>
  );
}

const points = (items: Point[]) => items.map((p) => [p.head, p.body]);

export function CaseStudy({ c }: { c: CaseStudyContent }) {
  return (
    <>
      <Opener eyebrow={c.eyebrow} bold={c.bold} italic={c.italic}>
        <Lead opening={c.leadOpening}>{c.lead}</Lead>
      </Opener>

      <Columns as="dl" template={{ xs: '1fr', sm: '1fr 1fr', md: `repeat(${c.header.length}, 1fr)` }} sx={{ m: 0, py: 3, borderTop: 1, borderBottom: 1, borderColor: 'text.primary' }}>
        {c.header.map((f) => (
          <div key={f.label}>
            <Typography variant="eyebrow" component="dt">{f.label}</Typography>
            <Typography variant="body2" component="dd" sx={{ mt: 0.75 }}>{f.value}</Typography>
          </div>
        ))}
      </Columns>

      {c.showcase}

      <Section id="problem" title="The problem">
        <Typography variant="lead">{c.problem}</Typography>
      </Section>

      {c.team && (
        <Section id="team" title="How I lead the team">
          <Typography variant="lead">{c.team}</Typography>
        </Section>
      )}

      <BranchRule />
      <Columns gap={6} sx={{ mt: { xs: 7, md: 0 } }}>
        <Box component="section" aria-labelledby="design">
          <Stack2 tag="Design" />
          <Typography id="design" variant="h3" component="h2" sx={{ mb: 2.5 }}>How it looks and works</Typography>
          <Points stacked items={points(c.design)} />
        </Box>
        <Box component="section" aria-labelledby="code">
          <Stack2 tag="Code" />
          <Typography id="code" variant="h3" component="h2" sx={{ mb: 2.5 }}>How it&rsquo;s built</Typography>
          <Points stacked items={points(c.code)} />
        </Box>
      </Columns>
      {(c.designVisual || c.codeVisual) && (
        <Stack spacing={4} sx={{ mt: 6 }}>
          {c.designVisual}
          {c.codeVisual}
        </Stack>
      )}

      {c.extra}

      <NumberedList id="decisions" title="Key decisions" items={points(c.decisions)} />

      <Section id="result" title="The result">
        <StatGrid count={c.results.length % 4 === 0 ? 4 : 3}>
          {c.results.map((s) => <Stat key={s.label} figure={s.figure} label={s.label} />)}
        </StatGrid>
        {c.resultNote && <Measure as={Typography} color="text.secondary" sx={{ mt: 2 }}>{c.resultNote}</Measure>}
      </Section>

      {c.differently && (
        <Section id="differently" title={<>What I&rsquo;d do differently</>}>
          <Typography variant="lead">{c.differently}</Typography>
        </Section>
      )}
    </>
  );
}

function Stack2({ tag }: { tag: string }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
      <Tag>{tag}</Tag>
      <ArrowRule sx={{ flex: 1, maxWidth: 120 }} />
    </Stack>
  );
}
