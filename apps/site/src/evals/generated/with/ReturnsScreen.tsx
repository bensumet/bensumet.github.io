import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Alert, Box, Button, Chip, MenuItem, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography,
} from '@mui/material';
import { EdgeCard } from '@bensumet/edge';

type ReturnStatus = 'Requested' | 'Received' | 'Inspecting' | 'Repaired' | 'Refunded';

interface ReturnItem {
  reference: string;
  account: string;
  product: string;
  reason: string;
  status: ReturnStatus;
}

const STATUSES: ReturnStatus[] = ['Requested', 'Received', 'Inspecting', 'Repaired', 'Refunded'];

// Status chips pair a theme status color with the word, so color is never the only signal.
const STATUS_COLOR: Record<ReturnStatus, 'default' | 'info' | 'warning' | 'success'> = {
  Requested: 'default',
  Received: 'info',
  Inspecting: 'warning',
  Repaired: 'success',
  Refunded: 'success',
};

const ACCOUNTS = ['Fernwood Outfitters', 'Lantern & Loom', 'Copper Kettle Goods', 'North Fork Supply', 'Walk-in customer'];
const PRODUCTS = ['Bridle wallet', 'Card sleeve', 'Field tote', 'Watch strap', 'Belt, 1.5 in', 'Key fob'];
const REASONS = ['Stitching came loose', 'Wrong size', 'Edge paint cracked', 'Hardware defect', 'Colour not as pictured', 'Other'];

const SAMPLE_RETURNS: ReturnItem[] = [
  { reference: 'RT-1042', account: 'Fernwood Outfitters', product: 'Bridle wallet', reason: 'Stitching came loose', status: 'Inspecting' },
  { reference: 'RT-1041', account: 'Walk-in customer', product: 'Belt, 1.5 in', reason: 'Wrong size', status: 'Refunded' },
  { reference: 'RT-1040', account: 'Lantern & Loom', product: 'Field tote', reason: 'Hardware defect', status: 'Received' },
  { reference: 'RT-1039', account: 'North Fork Supply', product: 'Watch strap', reason: 'Edge paint cracked', status: 'Repaired' },
  { reference: 'RT-1038', account: 'Copper Kettle Goods', product: 'Card sleeve', reason: 'Colour not as pictured', status: 'Requested' },
  { reference: 'RT-1037', account: 'Fernwood Outfitters', product: 'Key fob', reason: 'Hardware defect', status: 'Requested' },
];

/** Stands in for the API call; the sample data loads after a short delay. */
function loadReturns(): Promise<ReturnItem[]> {
  return new Promise((resolve) => setTimeout(() => resolve(SAMPLE_RETURNS), 500));
}

type Filter = ReturnStatus | 'All';
interface Draft { account: string; product: string; reason: string }
type DraftErrors = Partial<Record<keyof Draft, string>>;
const EMPTY_DRAFT: Draft = { account: '', product: '', reason: '' };

function validate(d: Draft): DraftErrors {
  const e: DraftErrors = {};
  if (!d.account) e.account = 'Choose the account that sent the item back.';
  if (!d.product) e.product = 'Choose the product being returned.';
  if (!d.reason.trim()) e.reason = 'Describe why the item came back.';
  return e;
}

export function ReturnsScreen() {
  const [returns, setReturns] = useState<ReturnItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState<Filter>('All');
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [logged, setLogged] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setLoadError(false);
    loadReturns()
      .then((rows) => setReturns(rows))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { All: returns.length, Requested: 0, Received: 0, Inspecting: 0, Repaired: 0, Refunded: 0 };
    returns.forEach((r) => { c[r.status] += 1; });
    return c;
  }, [returns]);

  const visible = filter === 'All' ? returns : returns.filter((r) => r.status === filter);

  const setField = (field: keyof Draft, value: string) => {
    setDraft((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate(draft);
    setErrors(found);
    if (Object.keys(found).length) { setLogged(null); return; }
    const next = Math.max(1000, ...returns.map((r) => Number(r.reference.slice(3)))) + 1;
    const reference = `RT-${next}`;
    setReturns((rs) => [{ reference, account: draft.account, product: draft.product, reason: draft.reason.trim(), status: 'Requested' }, ...rs]);
    setDraft(EMPTY_DRAFT);
    setLogged(reference);
    // Show the new return even if a different status was selected.
    if (filter !== 'All' && filter !== 'Requested') setFilter('All');
  };

  return (
    <Box component="main" sx={{ p: { xs: 2, md: 3 }, display: 'grid', gap: 3 }}>
      <Box>
        <Typography variant="overline" color="text.secondary">Harbor &amp; Pine Workshop</Typography>
        <Typography variant="h4" component="h1">Returns</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: '66ch' }}>
          Items sent back by wholesale accounts and walk-in customers, from request to refund or repair.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 2fr) minmax(280px, 1fr)' }, alignItems: 'start' }}>
        <Box component="section" aria-labelledby="returns-list-heading" sx={{ minWidth: 0 }}>
          <Typography id="returns-list-heading" variant="h6" component="h2" sx={{ mb: 1.5 }}>Returned items</Typography>

          <Stack direction="row" useFlexGap role="group" aria-label="Filter by status" sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {(['All', ...STATUSES] as Filter[]).map((s) => (
              <Chip
                key={s}
                label={`${s} (${counts[s]})`}
                onClick={() => setFilter(s)}
                color={filter === s ? 'primary' : 'default'}
                variant={filter === s ? 'filled' : 'outlined'}
                aria-pressed={filter === s}
                disabled={loading || loadError}
              />
            ))}
          </Stack>

          {loadError ? (
            <Alert
              severity="error"
              action={<Button color="inherit" size="small" onClick={load}>Try again</Button>}
            >
              We couldn&rsquo;t load returns. Check your connection, then try again.
            </Alert>
          ) : (
            <TableContainer sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Table size="small" aria-label="Returned items" aria-busy={loading}>
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
                  {loading && [0, 1, 2, 3].map((i) => (
                    <TableRow key={`loading-${i}`}>
                      {[0, 1, 2, 3, 4].map((c) => <TableCell key={c}><Skeleton aria-hidden="true" /></TableCell>)}
                    </TableRow>
                  ))}
                  {!loading && visible.map((r) => (
                    <TableRow key={r.reference} hover selected={r.reference === logged}>
                      <TableCell sx={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.reference}</TableCell>
                      <TableCell>{r.account}</TableCell>
                      <TableCell>{r.product}</TableCell>
                      <TableCell sx={{ maxWidth: 240, overflowWrap: 'anywhere' }}>{r.reason}</TableCell>
                      <TableCell><Chip size="small" label={r.status} color={STATUS_COLOR[r.status]} variant="outlined" /></TableCell>
                    </TableRow>
                  ))}
                  {!loading && visible.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ py: 4, textAlign: 'center' }}>
                        <Typography>
                          {returns.length === 0 ? 'No returns yet.' : `No returns found with status ${filter}.`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {returns.length === 0 ? 'Log the first one with the form.' : 'Show every status, or log a new return.'}
                        </Typography>
                        {returns.length > 0 && <Button variant="outlined" size="small" onClick={() => setFilter('All')}>Show all returns</Button>}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {loading && <Typography variant="body2" color="text.secondary" role="status" sx={{ mt: 1 }}>Loading returns…</Typography>}
        </Box>

        <EdgeCard component="section" aria-labelledby="log-return-heading" sx={{ p: 3 }}>
          <Typography id="log-return-heading" variant="h6" component="h2" sx={{ mb: 2 }}>Log a return</Typography>
          <Box component="form" noValidate onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              select
              label="Account"
              value={draft.account}
              onChange={(e) => setField('account', e.target.value)}
              error={!!errors.account}
              helperText={errors.account}
              required
              fullWidth
            >
              {ACCOUNTS.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
            </TextField>
            <TextField
              select
              label="Product"
              value={draft.product}
              onChange={(e) => setField('product', e.target.value)}
              error={!!errors.product}
              helperText={errors.product}
              required
              fullWidth
            >
              {PRODUCTS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
            <TextField
              label="Reason"
              value={draft.reason}
              onChange={(e) => setField('reason', e.target.value)}
              error={!!errors.reason}
              helperText={errors.reason ?? `For example: ${REASONS.slice(0, 2).join(', ').toLowerCase()}.`}
              required
              fullWidth
              multiline
              minRows={2}
            />
            <Box>
              <Button type="submit" variant="contained">Log return</Button>
            </Box>
            {logged && (
              <Alert severity="success" role="status" onClose={() => setLogged(null)}>
                Return {logged} logged as Requested.
              </Alert>
            )}
          </Box>
        </EdgeCard>
      </Box>
    </Box>
  );
}
