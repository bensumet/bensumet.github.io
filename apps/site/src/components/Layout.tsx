import { Box, Link, Stack, Typography } from '@mui/material';
import { Columns, Headline, Measure, RuleItem, RuleList, Section, Tag } from '@bensumet/edge';

/**
 * Site-level compositions of Edge pieces. Nothing here sets a font, size,
 * color or grid: those come from the theme's text roles and Edge's layout
 * primitives, so a change to the system shows up on every page at once.
 */

/** Page opener used by every section: running head, two-voice title, lead-in. */
export function Opener({ eyebrow, bold, italic, children }: { eyebrow: string; bold: string; italic?: string; children?: React.ReactNode }) {
  return (
    <Box component="section" sx={{ mb: { xs: 5, md: 8 } }}>
      <Typography variant="eyebrow">{eyebrow}</Typography>
      <Box sx={{ mt: 2 }}><Headline bold={bold} italic={italic} /></Box>
      {children && <Measure sx={{ mt: 3 }}>{children}</Measure>}
    </Box>
  );
}

export interface IndexItem {
  to: string;
  number: string;
  title: string;
  kind?: string;
  blurb: string;
}

/** A numbered index, set like a book's contents page: number, title, a rule, a note. */
export function IndexList({ items, label }: { items: IndexItem[]; label: string }) {
  return (
    <RuleList as="ol" aria-label={label}>
      {items.map((it) => (
        <RuleItem key={it.to} space={0}>
          <Link href={it.to} underline="none" color="inherit" sx={{ display: 'block', py: { xs: 2.5, md: 3 } }}>
            <Columns as="span" preset="contents" gap={2} rowGap={0.5} baseline>
              <Typography variant="data">{it.number}</Typography>
              <Box component="span">
                <Typography variant="indexTitle" sx={{ display: 'block' }}>{it.title}</Typography>
                {it.kind && <Stack component="span" direction="row" sx={{ mt: 1 }}><Tag>{it.kind}</Tag></Stack>}
              </Box>
              <Typography variant="prose" component="span" color="text.secondary" sx={{ gridColumn: { xs: '2', md: '3' } }}>{it.blurb}</Typography>
            </Columns>
          </Link>
        </RuleItem>
      ))}
    </RuleList>
  );
}

/** Numbered points set as a contents page: number, the point, why. For decisions and gates. */
export function NumberedList({ id, title, items }: { id: string; title: string; items: React.ReactNode[][] }) {
  return (
    <Section id={id} title={title}>
      <RuleList as="ol">
        {items.map(([head, body], i) => (
          <RuleItem key={i} preset="numbered">
            <Typography variant="data">{String(i + 1).padStart(2, '0')}</Typography>
            <Typography variant="label">{head}</Typography>
            <Typography variant="prose" color="text.secondary" sx={{ gridColumn: { xs: 2, md: 3 } }}>{body}</Typography>
          </RuleItem>
        ))}
      </RuleList>
    </Section>
  );
}

/** Points in two columns: a bold head over its explanation. */
export function Points({ items }: { items: React.ReactNode[][] }) {
  return (
    <Columns gap={4}>
      {items.map(([head, body], i) => (
        <Box key={i}>
          <Typography variant="label">{head}</Typography>
          <Typography variant="prose" color="text.secondary" sx={{ mt: 0.5 }}>{body}</Typography>
        </Box>
      ))}
    </Columns>
  );
}

/** A labelled passage of reading text: a running head over a paragraph. */
export function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="eyebrow">{label}</Typography>
      <Typography variant="prose" sx={{ mt: 1.5 }}>{children}</Typography>
    </Box>
  );
}

/** Marks a page whose content is still being written. Removed before launch. */
export function Pending({ what }: { what: string }) {
  return (
    <Measure role="note" sx={{ border: '1px dashed', borderColor: 'text.secondary', p: 3 }}>
      <Typography variant="eyebrow">In progress</Typography>
      <Typography sx={{ mt: 1 }}>{what}</Typography>
    </Measure>
  );
}
