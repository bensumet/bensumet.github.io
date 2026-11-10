import { Box, Stack, Typography } from '@mui/material';
import { EdgeCard, SuggestionList, SummaryCard, Tag, type Source, type Suggestion, type SummaryPoint } from '@bensumet/edge';

// Sample data: a fictional wholesale account at Harbor & Pine, a small
// leather goods maker. In a real product the points and sources would come
// back from the model together, so every claim can be traced to a message.

const ACCOUNT = {
  buyer: 'Juniper & Co. Outfitters',
  contact: 'Dana Whitfield, Head Buyer',
  since: 'Wholesale since March 2024',
  facts: [
    { label: 'Open order', value: 'PO-2291 · 240 bifolds' },
    { label: 'Ship date', value: 'Nov 18' },
    { label: 'Last 12 months', value: '$38,400' },
    { label: 'Last contact', value: '2 days ago' },
  ],
};

const SOURCES: Source[] = [
  {
    id: 'e1',
    label: 'Email from Dana, Oct 28',
    excerpt: 'Holiday sell-through on the navy bifolds has been strong. Can we add 60 units to PO-2291 if they still ship by the 18th?',
  },
  {
    id: 'e2',
    label: 'Email from Dana, Oct 22',
    excerpt: 'Two customers returned card holders this month because the edge paint was chipping near the corners.',
  },
  {
    id: 'n1',
    label: 'Call note, Oct 24',
    excerpt: 'Dana is planning a spring display around natural veg-tan. Wants samples before the line review on Dec 9.',
  },
  {
    id: 'e3',
    label: 'Email from accounts, Oct 30',
    excerpt: 'Invoice 1187 ($6,120) is 12 days past due. Juniper says payment is queued for the next cycle.',
  },
  {
    id: 'n2',
    label: 'Workshop note, Oct 29',
    excerpt: 'Navy hide stock covers about 280 bifolds at current cutting yield.',
  },
];

const POINTS: SummaryPoint[] = [
  { text: 'Navy bifolds are selling well, and Dana wants 60 more units added to the open order, provided it still ships on Nov 18.', sources: ['e1'] },
  { text: 'Current navy stock covers about 280 bifolds, so the extra 60 fit with roughly 20 to spare.', sources: ['e1', 'n2'] },
  { text: 'Two card holders came back for chipped edge paint. Dana raised it plainly but has not asked for a credit.', sources: ['e2'] },
  { text: 'She is planning a spring display around natural veg-tan and wants samples before her Dec 9 line review.', sources: ['n1'] },
  { text: 'Invoice 1187 is 12 days late; Juniper says it is queued for their next payment run.', sources: ['e3'] },
];

const NEXT_STEPS: Suggestion[] = [
  {
    id: 'add-units',
    title: 'Confirm the 60 extra bifolds',
    reason: 'Stock covers it and the ship date holds. A quick yes keeps the order moving before hides are cut for other work.',
  },
  {
    id: 'edge-paint',
    title: 'Offer replacements for the chipped card holders',
    reason: 'Only two returns, but it touches finish quality. Ask which batch they came from so the workshop can check it.',
  },
  {
    id: 'samples',
    title: 'Send veg-tan samples by Dec 2',
    reason: 'Gives Dana a week with them before the Dec 9 line review, which is where spring orders get decided.',
  },
  {
    id: 'invoice',
    title: 'Hold the invoice reminder for one week',
    reason: 'Juniper has already said payment is queued. A reminder now could sour an order that is about to grow.',
  },
];

export function AccountSummary() {
  return (
    <Stack spacing={4} sx={{ maxWidth: 820, mx: 'auto', py: { xs: 3, md: 5 }, px: { xs: 2, md: 0 } }}>
      <Box component="header">
        <Tag>Account</Tag>
        <Typography variant="h3" component="h2" sx={{ mt: 1.5 }}>{ACCOUNT.buyer}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {ACCOUNT.contact} · {ACCOUNT.since}
        </Typography>
      </Box>

      <EdgeCard stitched sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Box
          component="dl"
          sx={{ m: 0, display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2.5 }}
        >
          {ACCOUNT.facts.map((f) => (
            <Box key={f.label}>
              <Typography component="dt" variant="body2" color="text.secondary">{f.label}</Typography>
              <Typography component="dd" sx={{ m: 0, mt: 0.25, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{f.value}</Typography>
            </Box>
          ))}
        </Box>
      </EdgeCard>

      <Box component="section" aria-label="Account summary">
        <SummaryCard title="Where things stand" points={POINTS} sources={SOURCES} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Drawn from 3 emails and 2 notes from the last 10 days. Check the sources before acting on it.
        </Typography>
      </Box>

      <Box component="section" aria-labelledby="next-steps-heading">
        <Typography id="next-steps-heading" variant="h4" component="h3" sx={{ mb: 0.5 }}>Suggested next steps</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Nothing happens until you accept a step, and a dismissed step can be brought back.
        </Typography>
        <SuggestionList suggestions={NEXT_STEPS} />
      </Box>
    </Stack>
  );
}
