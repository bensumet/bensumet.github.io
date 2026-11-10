import { Box, Link, Stack, Typography } from '@mui/material';
import { Tag, typography } from '@bensumet/edge';

/** Small letterspaced label, like a running head. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Typography component="p" sx={{ fontFamily: typography.body, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'text.secondary', m: 0 }}>
      {children}
    </Typography>
  );
}

/** A section title: heavy condensed grotesque over a Garamond italic line. */
export function Title({ bold, italic, as = 'h1' }: { bold: string; italic?: string; as?: 'h1' | 'h2' }) {
  const big = as === 'h1';
  return (
    <Box component={as} sx={{ m: 0, textWrap: 'balance' }}>
      <Box component="span" sx={{ display: 'block', fontFamily: typography.poster, fontStretch: '72%', fontWeight: 850, textTransform: 'uppercase', lineHeight: 0.88, fontSize: big ? 'clamp(2.8rem, 1.2rem + 6vw, 6.4rem)' : 'clamp(2rem, 1.2rem + 3vw, 3.4rem)' }}>
        {bold}
      </Box>
      {italic && (
        <Box component="span" sx={{ display: 'block', fontFamily: typography.display, fontStyle: 'italic', fontWeight: 400, color: 'primary.main', lineHeight: 1.05, mt: 0.5, fontSize: big ? 'clamp(2rem, 1rem + 4vw, 4.4rem)' : 'clamp(1.5rem, 1rem + 2vw, 2.4rem)' }}>
          {italic}
        </Box>
      )}
    </Box>
  );
}

/** Page opener used by every section. */
export function Opener({ eyebrow, bold, italic, children }: { eyebrow: string; bold: string; italic?: string; children?: React.ReactNode }) {
  return (
    <Box component="section" sx={{ mb: { xs: 5, md: 8 } }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Box sx={{ mt: 2 }}><Title bold={bold} italic={italic} /></Box>
      {children && <Box sx={{ mt: 3, maxWidth: typography.measure }}>{children}</Box>}
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
    <Box component="ol" aria-label={label} sx={{ listStyle: 'none', m: 0, p: 0, borderTop: 1, borderColor: 'text.primary' }}>
      {items.map((it) => (
        <Box component="li" key={it.to} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Link href={it.to} underline="none" color="inherit" sx={{ display: 'grid', gridTemplateColumns: { xs: '3rem 1fr', md: '4rem 1fr 1.2fr' }, columnGap: 2, rowGap: 0.5, py: { xs: 2.5, md: 3 }, alignItems: 'baseline', '&:hover .t, &:focus-visible .t': { color: 'primary.main' } }}>
            <Typography component="span" sx={{ fontFamily: typography.body, fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: 'primary.main' }}>{it.number}</Typography>
            <Box>
              <Typography className="t" component="span" sx={{ display: 'block', fontFamily: typography.poster, fontStretch: '80%', fontWeight: 750, textTransform: 'uppercase', fontSize: { xs: '1.5rem', md: '1.9rem' }, lineHeight: 1 }}>{it.title}</Typography>
              {it.kind && <Stack direction="row" sx={{ mt: 1 }}><Tag>{it.kind}</Tag></Stack>}
            </Box>
            <Typography component="span" sx={{ gridColumn: { xs: '2', md: '3' }, fontFamily: typography.display, fontSize: '1.15rem', lineHeight: 1.5, color: 'text.secondary' }}>{it.blurb}</Typography>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

/** Marks a page whose content is still being written. Removed before launch. */
export function Pending({ what }: { what: string }) {
  return (
    <Box role="note" sx={{ border: '1px dashed', borderColor: 'text.secondary', p: 3, maxWidth: typography.measure }}>
      <Eyebrow>In progress</Eyebrow>
      <Typography sx={{ mt: 1 }}>{what}</Typography>
    </Box>
  );
}
