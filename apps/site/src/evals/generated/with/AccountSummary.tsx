import { useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, Stack, Typography } from '@mui/material';
import { AiLabel, EdgeCard, FeedbackBar, Lead, SuggestionList, SummaryCard, type Source, type Suggestion, type SummaryPoint } from '@bensumet/edge';

// Sample data, inline. Harbor & Pine (leather goods) and its wholesale buyer
// Juniper & Co. Outfitters are fictional.

const account = {
  name: 'Juniper & Co. Outfitters',
  buyer: 'Dana Whitlock, head buyer',
  stores: '6 stores in Oregon and Washington',
  since: 'Wholesale account since March 2023',
  lastOrder: 'PO 2291, Sept 18: 240 units',
  openBalance: '$4,860 due Nov 15',
};

const sources: Source[] = [
  {
    id: 'email-oct-28',
    label: 'Email from Dana Whitlock, Oct 28',
    excerpt:
      'The Field Tote in saddle sold through in under five weeks at our Bend and Portland stores. Can we get another 60 before Thanksgiving?',
  },
  {
    id: 'email-oct-22',
    label: 'Email from Dana Whitlock, Oct 22',
    excerpt:
      'Two of the bifolds from the September order came in with the edge paint cracking along the fold. Customers noticed. I’ve set them aside rather than sending them back.',
  },
  {
    id: 'note-oct-15',
    label: 'Call note by Maya (account manager), Oct 15',
    excerpt:
      'Dana mentioned they are reviewing spring vendors in early December. Wants to see the new colorways before then. Asked whether we can do a co-branded key fob for their tenth anniversary.',
  },
  {
    id: 'email-oct-09',
    label: 'Email from Juniper accounts payable, Oct 9',
    excerpt: 'Confirming invoice 1187 is scheduled for payment on net-60 terms, Nov 15.',
  },
];

const points: SummaryPoint[] = [
  {
    text: 'Demand is strong: the Field Tote in saddle sold out in under five weeks, and Dana wants 60 more before Thanksgiving.',
    sources: ['email-oct-28'],
  },
  {
    text: 'There is an open quality complaint. Two bifolds from the September order arrived with cracked edge paint; Juniper is holding them rather than returning them.',
    sources: ['email-oct-22'],
  },
  {
    text: 'Juniper reviews spring vendors in early December and wants to see new colorways first. Dana also asked about a co-branded key fob for their tenth anniversary.',
    sources: ['note-oct-15'],
  },
  {
    text: 'Payment is on track: invoice 1187 is scheduled for Nov 15 on net-60 terms.',
    sources: ['email-oct-09'],
  },
];

const suggestions: Suggestion[] = [
  {
    id: 'replace-bifolds',
    title: 'Offer to replace the two bifolds and cover return shipping',
    reason: 'Dana flagged the cracked edge paint on Oct 22 and hasn’t had a reply, and the spring vendor review is about five weeks away.',
  },
  {
    id: 'confirm-totes',
    title: 'Confirm whether 60 saddle Field Totes can ship by Nov 20',
    reason: 'Dana asked for them before Thanksgiving; a firm date lets her plan holiday floor space.',
  },
  {
    id: 'send-colorways',
    title: 'Send spring colorway samples before Dec 1',
    reason: 'Dana said Juniper reviews spring vendors in early December and wants to see new colors before then.',
  },
  {
    id: 'quote-key-fob',
    title: 'Quote a co-branded key fob for the anniversary',
    reason: 'Dana raised it on the Oct 15 call; a quote keeps the idea alive without committing to tooling.',
  },
];

type Status = 'ready' | 'loading' | 'empty' | 'error';

const facts: [string, string][] = [
  ['Buyer', account.buyer],
  ['Stores', account.stores],
  ['Relationship', account.since],
  ['Last order', account.lastOrder],
  ['Open balance', account.openBalance],
];

export function AccountSummary() {
  const [status, setStatus] = useState<Status>('ready');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  // Simulates asking the model for a fresh summary.
  const refresh = () => {
    setStatus('loading');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('ready'), 1200);
  };

  return (
    <Box component="section" aria-labelledby="account-summary-title" sx={{ maxWidth: 880, mx: 'auto', py: 4, px: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-end' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="overline" color="primary" component="p">Harbor &amp; Pine · Wholesale accounts</Typography>
          <Typography id="account-summary-title" variant="h3" component="h2">{account.name}</Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* Lets a reviewer see each state of the screen with sample data. */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="preview-state-label">Preview state</InputLabel>
            <Select
              labelId="preview-state-label"
              label="Preview state"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <MenuItem value="ready">Summary</MenuItem>
              <MenuItem value="loading">Loading</MenuItem>
              <MenuItem value="empty">No messages</MenuItem>
              <MenuItem value="error">Error</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={refresh} disabled={status === 'loading'}>
            Refresh summary
          </Button>
        </Stack>
      </Stack>

      <EdgeCard sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>Account at a glance</Typography>
        <Box
          component="dl"
          sx={{ m: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '140px 1fr' }, columnGap: 2, rowGap: { xs: 0.25, sm: 1 } }}
        >
          {facts.map(([term, value]) => (
            <Box key={term} sx={{ display: 'contents' }}>
              <Typography component="dt" variant="body2" color="text.secondary" sx={{ mt: { xs: 1, sm: 0 } }}>{term}</Typography>
              <Typography component="dd" variant="body2" sx={{ m: 0, fontVariantNumeric: 'tabular-nums' }}>{value}</Typography>
            </Box>
          ))}
        </Box>
      </EdgeCard>

      {status === 'loading' && (
        <EdgeCard sx={{ p: 3 }} aria-busy="true">
          <Typography role="status" variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Loading: reading 4 recent emails and notes…
          </Typography>
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="85%" />
          <Skeleton variant="text" width="70%" />
        </EdgeCard>
      )}

      {status === 'error' && (
        <Alert
          severity="error"
          action={<Button color="inherit" size="small" onClick={refresh}>Try again</Button>}
        >
          We couldn’t write a summary just now. The emails and notes are safe; try again in a moment.
        </Alert>
      )}

      {status === 'empty' && (
        <EdgeCard sx={{ p: 3 }}>
          <Typography variant="h5" component="h3">No emails or notes yet</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: '66ch' }}>
            There's nothing from the last 60 days to summarize. Log a call note or forward an email from the buyer, then refresh
            the summary.
          </Typography>
        </EdgeCard>
      )}

      {status === 'ready' && (
        <Stack spacing={4}>
          <Box>
            <Lead opening="From the last four weeks." sx={{ mb: 2, maxWidth: '66ch' }}>
              A summary of 3 emails and 1 call note about this account. Each point cites where it came from, so you can check it
              before you act.
            </Lead>
            <SummaryCard title="What's happening with Juniper" points={points} sources={sources} />
          </Box>

          <Box component="section" aria-labelledby="next-steps-title">
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 0.5 }}>
              <Typography id="next-steps-title" variant="h4" component="h3">Suggested next steps</Typography>
              <AiLabel />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '66ch' }}>
              Drafted by AI from the same sources. Nothing is sent or scheduled until you accept a step, and you can undo either choice.
            </Typography>
            <SuggestionList suggestions={suggestions} />
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <FeedbackBar />
            </Box>
          </Box>
        </Stack>
      )}
    </Box>
  );
}
