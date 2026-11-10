import { useMemo, useState, type FormEvent } from 'react';
import {
  Alert, Box, Button, Chip, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { EdgeCard, Tag } from '@bensumet/edge';

// Sample data for the Workshop returns screen. Everything here is fictional:
// Harbor & Pine, a small leather goods maker, and its wholesale accounts.

type ReturnStatus = 'requested' | 'received' | 'inspecting' | 'refunded' | 'repaired';

interface ReturnItem {
  ref: string;
  account: string;
  product: string;
  reason: string;
  status: ReturnStatus;
}

const STATUS_LABEL: Record<ReturnStatus, string> = {
  requested: 'Requested',
  received: 'Received',
  inspecting: 'Inspecting',
  refunded: 'Refunded',
  repaired: 'Repaired',
};

// Status color comes from the Edge theme's status palette; the label always
// carries the meaning, so color is never the only cue.
const STATUS_COLOR: Record<ReturnStatus, 'default' | 'info' | 'warning' | 'success'> = {
  requested: 'default',
  received: 'info',
  inspecting: 'warning',
  refunded: 'success',
  repaired: 'success',
};

const STATUSES = Object.keys(STATUS_LABEL) as ReturnStatus[];

const ACCOUNTS = ['Juniper & Co. Outfitters', 'Fernhill Market', 'Saltmarsh Goods', 'Copper Kettle Mercantile', 'Northbank Supply'];
const PRODUCTS = ['Bifold wallet, tan', 'Card holder, black', 'Field tote, natural', 'Key fob, oxblood', 'Belt, 38 mm chestnut', 'Passport cover, navy'];
const REASONS = ['Stitching came loose', 'Edge paint cracked', 'Wrong color shipped', 'Hardware defect', 'Damaged in transit', 'Customer changed mind'];

const SAMPLE_RETURNS: ReturnItem[] = [
  { ref: 'R-118', account: 'Juniper & Co. Outfitters', product: 'Bifold wallet, tan', reason: 'Stitching came loose', status: 'inspecting' },
  { ref: 'R-117', account: 'Fernhill Market', product: 'Field tote, natural', reason: 'Damaged in transit', status: 'received' },
  { ref: 'R-116', account: 'Saltmarsh Goods', product: 'Card holder, black', reason: 'Wrong color shipped', status: 'refunded' },
  { ref: 'R-115', account: 'Copper Kettle Mercantile', product: 'Belt, 38 mm chestnut', reason: 'Hardware defect', status: 'repaired' },
  { ref: 'R-114', account: 'Northbank Supply', product: 'Key fob, oxblood', reason: 'Edge paint cracked', status: 'requested' },
  { ref: 'R-113', account: 'Juniper & Co. Outfitters', product: 'Passport cover, navy', reason: 'Customer changed mind', status: 'refunded' },
];

type Filter = ReturnStatus | 'all';

interface Draft {
  account: string;
  product: string;
  reason: string;
}

const EMPTY_DRAFT: Draft = { account: '', product: '', reason: '' };

function nextRef(items: ReturnItem[]): string {
  const max = items.reduce((m, it) => Math.max(m, Number(it.ref.replace(/\D/g, '')) || 0), 0);
  return `R-${max + 1}`;
}

export function ReturnsScreen() {
  const [returns, setReturns] = useState<ReturnItem[]>(SAMPLE_RETURNS);
  const [filter, setFilter] = useState<Filter>('all');
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [submitted, setSubmitted] = useState(false);
  const [logged, setLogged] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: returns.length, requested: 0, received: 0, inspecting: 0, refunded: 0, repaired: 0 };
    returns.forEach((r) => { c[r.status] += 1; });
    return c;
  }, [returns]);

  const visible = filter === 'all' ? returns : returns.filter((r) => r.status === filter);

  const errors: Partial<Record<keyof Draft, string>> = {
    account: draft.account ? undefined : 'Choose an account.',
    product: draft.product ? undefined : 'Choose a product.',
    reason: draft.reason.trim() ? undefined : 'Give a reason for the return.',
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const update = (field: keyof Draft) => (value: string) => {
    setDraft((d) => ({ ...d, [field]: value }));
    setLogged(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;
    const ref = nextRef(returns);
    // New returns start as requested and go to the top of the list.
    setReturns((list) => [{ ref, account: draft.account, product: draft.product, reason: draft.reason.trim(), status: 'requested' }, ...list]);
    setDraft(EMPTY_DRAFT);
    setSubmitted(false);
    setLogged(ref);
    // Make sure the new return is visible under the current filter.
    if (filter !== 'all' && filter !== 'requested') setFilter('all');
  };

  const showError = (field: keyof Draft) => submitted && !!errors[field];

  return (
    <Box component="section" aria-labelledby="returns-title" sx={{ display: 'grid', gap: 3 }}>
      <Box>
        <Tag>Workshop</Tag>
        <Typography id="returns-title" variant="h3" component="h1" sx={{ mt: 1.5 }}>Returns</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Items wholesale accounts have sent back to Harbor &amp; Pine, and where each one stands.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 340px' }, alignItems: 'start' }}>
        <EdgeCard sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Stack spacing={2}>
            <Box>
              <Typography id="status-filter-label" variant="h6" component="h2" sx={{ mb: 1 }}>Filter by status</Typography>
              <ToggleButtonGroup
                exclusive
                size="small"
                value={filter}
                onChange={(_, v: Filter | null) => { if (v) setFilter(v); }}
                aria-labelledby="status-filter-label"
                sx={{ flexWrap: 'wrap' }}
              >
                <ToggleButton value="all">All ({counts.all})</ToggleButton>
                {STATUSES.map((s) => (
                  <ToggleButton key={s} value={s}>{STATUS_LABEL[s]} ({counts[s]})</ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <TableContainer>
              <Table size="small" aria-label="Returned items">
                <TableHead>
                  <TableRow>
                    <TableCell>Reference</TableCell>
                    <TableCell>Account</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visible.map((r) => (
                    <TableRow key={r.ref} hover selected={r.ref === logged}>
                      <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }} className="tabular">{r.ref}</TableCell>
                      <TableCell>{r.account}</TableCell>
                      <TableCell>{r.product}</TableCell>
                      <TableCell>{r.reason}</TableCell>
                      <TableCell>
                        <Chip size="small" variant="outlined" color={STATUS_COLOR[r.status]} label={STATUS_LABEL[r.status]} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {visible.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
                        No returns are {STATUS_LABEL[filter as ReturnStatus].toLowerCase()} right now.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body2" color="text.secondary" role="status">
              Showing {visible.length} of {returns.length} returns
              {filter === 'all' ? '' : ` with status ${STATUS_LABEL[filter]}`}.
            </Typography>
          </Stack>
        </EdgeCard>

        <EdgeCard painted sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Box component="form" noValidate onSubmit={handleSubmit} aria-labelledby="log-return-title">
            <Stack spacing={2}>
              <Typography id="log-return-title" variant="h4" component="h2">Log a return</Typography>
              <TextField
                select
                required
                label="Account"
                value={draft.account}
                onChange={(e) => update('account')(e.target.value)}
                error={showError('account')}
                helperText={showError('account') ? errors.account : ' '}
              >
                {ACCOUNTS.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
              </TextField>
              <TextField
                select
                required
                label="Product"
                value={draft.product}
                onChange={(e) => update('product')(e.target.value)}
                error={showError('product')}
                helperText={showError('product') ? errors.product : ' '}
              >
                {PRODUCTS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </TextField>
              <TextField
                select
                required
                label="Reason"
                value={draft.reason}
                onChange={(e) => update('reason')(e.target.value)}
                error={showError('reason')}
                helperText={showError('reason') ? errors.reason : ' '}
              >
                {REASONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </TextField>
              <Stack direction="row" spacing={1.5}>
                <Button type="submit" variant="contained">Log return</Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => { setDraft(EMPTY_DRAFT); setSubmitted(false); setLogged(null); }}
                >
                  Clear
                </Button>
              </Stack>
              <Box aria-live="polite">
                {logged && <Alert severity="success">Return {logged} logged as Requested.</Alert>}
              </Box>
            </Stack>
          </Box>
        </EdgeCard>
      </Box>
    </Box>
  );
}
