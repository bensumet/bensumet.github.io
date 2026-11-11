import { Box, Typography } from '@mui/material';
import { ArrowRule, Lead, Tag, typography } from '@bensumet/edge';
import { Opener } from '../../components/Layout';

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
function BranchRule() {
  return (
    <Box aria-hidden="true" sx={{ position: 'relative', height: 64, my: 4, display: { xs: 'none', md: 'block' } }}>
      <Box sx={{ position: 'absolute', left: '50%', top: 0, height: 24, width: '1px', bgcolor: 'edge.line' }} />
      <Box sx={{ position: 'absolute', left: '25%', right: '25%', top: 24, height: '1px', bgcolor: 'edge.line' }} />
      {['25%', '75%'].map((l) => <Box key={l} sx={{ position: 'absolute', left: l, top: 24, height: 16, width: '1px', bgcolor: 'edge.line' }} />)}
      {[['25%', 'Design'], ['75%', 'Code']].map(([l, t]) => (
        <Typography key={t} sx={{ position: 'absolute', left: l, top: 44, transform: 'translateX(-50%)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.42em', textTransform: 'uppercase' }}>{t}</Typography>
      ))}
    </Box>
  );
}

function Points({ items }: { items: Point[] }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 2.5 }}>
      {items.map((p) => (
        <Box component="li" key={p.head}>
          <Typography sx={{ fontWeight: 650 }}>{p.head}</Typography>
          <Typography sx={{ mt: 0.5, fontFamily: typography.display, fontSize: '1.12rem', lineHeight: 1.55, color: 'text.secondary' }}>{p.body}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function H2({ children, id }: { children: React.ReactNode; id: string }) {
  return <Typography id={id} variant="h3" component="h2" sx={{ mb: 2.5 }}>{children}</Typography>;
}

export function CaseStudy({ c }: { c: CaseStudyContent }) {
  return (
    <>
      <Opener eyebrow={c.eyebrow} bold={c.bold} italic={c.italic}>
        <Lead opening={c.leadOpening}>{c.lead}</Lead>
      </Opener>

      <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: `repeat(${c.header.length}, 1fr)` }, gap: 3, py: 3, borderTop: 1, borderBottom: 1, borderColor: 'text.primary' }}>
        {c.header.map((f) => (
          <Box key={f.label} sx={{ minWidth: 0 }}>
            <Box component="dt"><Typography variant="eyebrow">{f.label}</Typography></Box>
            <Typography component="dd" sx={{ m: 0, mt: 0.75, fontSize: '0.95rem' }}>{f.value}</Typography>
          </Box>
        ))}
      </Box>

      {c.showcase}

      <Box component="section" aria-labelledby="problem" sx={{ mt: 7 }}>
        <H2 id="problem">The problem</H2>
        <Typography sx={{ fontFamily: typography.display, fontSize: '1.25rem', lineHeight: 1.6, maxWidth: typography.measure }}>{c.problem}</Typography>
      </Box>

      {c.team && (
        <Box component="section" aria-labelledby="team" sx={{ mt: 7 }}>
          <H2 id="team">How I lead the team</H2>
          <Typography sx={{ fontFamily: typography.display, fontSize: '1.25rem', lineHeight: 1.6, maxWidth: typography.measure }}>{c.team}</Typography>
        </Box>
      )}

      <BranchRule />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 6, md: 6 }, mt: { xs: 7, md: 0 } }}>
        <Box component="section" aria-labelledby="design" sx={{ minWidth: 0 }}>
          <Stack2 tag="Design" />
          <H2 id="design">How it looks and works</H2>
          <Points items={c.design} />
        </Box>
        <Box component="section" aria-labelledby="code" sx={{ minWidth: 0 }}>
          <Stack2 tag="Code" />
          <H2 id="code">How it&rsquo;s built</H2>
          <Points items={c.code} />
        </Box>
      </Box>
      {(c.designVisual || c.codeVisual) && (
        <Box sx={{ mt: 6, display: 'grid', gap: 4 }}>
          {c.designVisual}
          {c.codeVisual}
        </Box>
      )}

      {c.extra}

      <Box component="section" aria-labelledby="decisions" sx={{ mt: 8 }}>
        <H2 id="decisions">Key decisions</H2>
        <Box component="ol" sx={{ m: 0, p: 0, listStyle: 'none', borderTop: 1, borderColor: 'text.primary' }}>
          {c.decisions.map((d, i) => (
            <Box component="li" key={d.head} sx={{ display: 'grid', gridTemplateColumns: { xs: '2.5rem 1fr', md: '3rem 1fr 1.3fr' }, columnGap: 2, rowGap: 0.5, py: 2.5, borderBottom: 1, borderColor: 'divider' }}>
              <Typography sx={{ color: 'primary.main', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</Typography>
              <Typography sx={{ fontWeight: 650 }}>{d.head}</Typography>
              <Typography color="text.secondary" sx={{ gridColumn: { xs: 2, md: 3 }, fontFamily: typography.display, fontSize: '1.1rem', lineHeight: 1.5 }}>{d.body}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box component="section" aria-labelledby="result" sx={{ mt: 8 }}>
        <H2 id="result">The result</H2>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: `repeat(${c.results.length % 4 === 0 ? 4 : 3}, 1fr)` }, gap: 0, borderTop: 1, borderColor: 'text.primary' }}>
          {c.results.map((s) => (
            <Box key={s.label} sx={{ py: 3, pr: 2, borderBottom: 1, borderColor: 'divider', minWidth: 0 }}>
              <Typography sx={{ fontFamily: typography.poster, fontStretch: '72%', fontWeight: 850, fontSize: { xs: '2.2rem', md: '3rem' }, lineHeight: 0.9, color: 'primary.main', fontVariantNumeric: 'tabular-nums' }}>{s.figure}</Typography>
              <Typography sx={{ mt: 1, fontSize: '0.95rem' }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
        {c.resultNote && <Typography color="text.secondary" sx={{ mt: 2, maxWidth: typography.measure }}>{c.resultNote}</Typography>}
      </Box>

      {c.differently && (
        <Box component="section" aria-labelledby="differently" sx={{ mt: 8 }}>
          <H2 id="differently">What I&rsquo;d do differently</H2>
          <Typography sx={{ fontFamily: typography.display, fontSize: '1.2rem', lineHeight: 1.6, maxWidth: typography.measure }}>{c.differently}</Typography>
        </Box>
      )}
    </>
  );
}

function Stack2({ tag }: { tag: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Tag>{tag}</Tag>
      <ArrowRule sx={{ flex: 1, maxWidth: 120 }} />
    </Box>
  );
}
