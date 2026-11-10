import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box, Button, Chip, CircularProgress, Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { EdgeCard } from '@bensumet/edge';

// ---------------------------------------------------------------------------
// Sample data. There's no real API: `loadServices` and `restartService` stand
// in for it, with the same shape (async, can fail) a real client would have.
// ---------------------------------------------------------------------------

type Status = 'healthy' | 'degraded' | 'down';
type Filter = Status | 'all';

interface Service {
  id: string;
  name: string;
  region: string;
  status: Status;
  /** ISO timestamp of the last deploy. */
  lastDeployed: string;
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const ago = (ms: number) => new Date(Date.now() - ms).toISOString();

const SAMPLE_SERVICES: Service[] = [
  { id: 'api-gateway', name: 'api-gateway', region: 'us-east-1', status: 'healthy', lastDeployed: ago(42 * MINUTE) },
  { id: 'auth', name: 'auth', region: 'us-east-1', status: 'healthy', lastDeployed: ago(3 * DAY) },
  { id: 'billing-worker', name: 'billing-worker', region: 'us-west-2', status: 'down', lastDeployed: ago(5 * HOUR) },
  { id: 'image-resizer', name: 'image-resizer', region: 'eu-west-1', status: 'degraded', lastDeployed: ago(26 * HOUR) },
  { id: 'search-indexer', name: 'search-indexer', region: 'eu-west-1', status: 'down', lastDeployed: ago(9 * DAY) },
  { id: 'web-frontend', name: 'web-frontend', region: 'us-east-1', status: 'healthy', lastDeployed: ago(2 * HOUR) },
  { id: 'email-sender', name: 'email-sender', region: 'ap-southeast-2', status: 'degraded', lastDeployed: ago(14 * DAY) },
  { id: 'metrics-collector', name: 'metrics-collector', region: 'us-west-2', status: 'healthy', lastDeployed: ago(6 * DAY) },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadServices(): Promise<Service[]> {
  await wait(700);
  return SAMPLE_SERVICES.map((s) => ({ ...s }));
}

// billing-worker fails its first restart so the failure path can be seen;
// a second attempt succeeds.
const failuresLeft: Record<string, number> = { 'billing-worker': 1 };

async function restartService(id: string): Promise<void> {
  await wait(1200);
  if ((failuresLeft[id] ?? 0) > 0) {
    failuresLeft[id] -= 1;
    throw new Error('The health check timed out after 60 seconds.');
  }
}

// ---------------------------------------------------------------------------
// Presentation helpers
// ---------------------------------------------------------------------------

const STATUS_META: Record<Status, { label: string; color: 'success' | 'warning' | 'error'; Icon: typeof CheckCircleOutlineIcon }> = {
  healthy: { label: 'Healthy', color: 'success', Icon: CheckCircleOutlineIcon },
  degraded: { label: 'Degraded', color: 'warning', Icon: WarningAmberIcon },
  down: { label: 'Down', color: 'error', Icon: ErrorOutlineIcon },
};

const FILTERS: Filter[] = ['all', 'healthy', 'degraded', 'down'];

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const absolute = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' });

function timeAgo(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  const abs = Math.abs(diff);
  if (abs < HOUR) return relative.format(Math.round(diff / MINUTE), 'minute');
  if (abs < DAY) return relative.format(Math.round(diff / HOUR), 'hour');
  return relative.format(Math.round(diff / DAY), 'day');
}

function StatusChip({ status }: { status: Status }) {
  const { label, color, Icon } = STATUS_META[status];
  // Color is paired with an icon shape and a word, never on its own.
  return <Chip size="small" variant="outlined" color={color} icon={<Icon fontSize="small" />} label={label} />;
}

type RestartState = { phase: 'idle' } | { phase: 'restarting' } | { phase: 'failed'; message: string };

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export default function ServiceStatus() {
  const [services, setServices] = useState<Service[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [restarts, setRestarts] = useState<Record<string, RestartState>>({});
  const [announcement, setAnnouncement] = useState('');

  const load = useCallback(() => {
    setServices(null);
    setLoadError(null);
    loadServices()
      .then(setServices)
      .catch((e: unknown) => setLoadError(e instanceof Error ? e.message : 'Something went wrong.'));
  }, []);

  useEffect(load, [load]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: 0, healthy: 0, degraded: 0, down: 0 };
    for (const s of services ?? []) { c.all += 1; c[s.status] += 1; }
    return c;
  }, [services]);

  const visible = useMemo(
    () => (services ?? []).filter((s) => filter === 'all' || s.status === filter),
    [services, filter],
  );

  const restart = async (svc: Service) => {
    setRestarts((r) => ({ ...r, [svc.id]: { phase: 'restarting' } }));
    setAnnouncement(`Restarting ${svc.name}…`);
    try {
      await restartService(svc.id);
      setServices((list) => list && list.map((s) => (s.id === svc.id ? { ...s, status: 'healthy' } : s)));
      setRestarts((r) => ({ ...r, [svc.id]: { phase: 'idle' } }));
      setAnnouncement(`${svc.name} restarted and is healthy.`);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong.';
      setRestarts((r) => ({ ...r, [svc.id]: { phase: 'failed', message } }));
      setAnnouncement(`Couldn't restart ${svc.name}. ${message}`);
    }
  };

  return (
    <Box component="section" aria-labelledby="service-status-title">
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 2, alignItems: 'baseline', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h4" component="h2" id="service-status-title">Service status</Typography>
          <Typography variant="body2" color="text.secondary">
            {services ? `${counts.all} services across ${new Set(services.map((s) => s.region)).size} regions` : 'Checking your services'}
          </Typography>
        </Box>
        <Button variant="outlined" size="small" onClick={load} disabled={!services && !loadError}>Refresh</Button>
      </Stack>

      <ToggleButtonGroup
        exclusive size="small" value={filter} aria-label="Filter by status"
        onChange={(_, v: Filter | null) => v && setFilter(v)}
        sx={{ mb: 2, flexWrap: 'wrap', '& .Mui-selected, & .Mui-selected:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' } }}
      >
        {FILTERS.map((f) => (
          <ToggleButton key={f} value={f} sx={{ px: 2, textTransform: 'none', gap: 0.75 }}>
            {f === 'all' ? 'All' : STATUS_META[f].label}
            {services && <Box component="span" className="tabular">{counts[f]}</Box>}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Typography role="status" aria-live="polite" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
        {announcement}
      </Typography>

      <EdgeCard sx={{ overflowX: 'auto' }}>
        {loadError ? (
          <Box sx={{ p: 4, textAlign: 'center' }} role="alert">
            <Typography sx={{ fontWeight: 700 }}>Couldn&rsquo;t load your services.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>{loadError}</Typography>
            <Button variant="outlined" onClick={load}>Try again</Button>
          </Box>
        ) : (
          <Table size="small" aria-labelledby="service-status-title" aria-busy={!services} sx={{ minWidth: 640 }}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="col">Service</TableCell>
                <TableCell component="th" scope="col">Region</TableCell>
                <TableCell component="th" scope="col">Status</TableCell>
                <TableCell component="th" scope="col">Last deployed</TableCell>
                <TableCell component="th" scope="col" align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!services && Array.from({ length: 4 }, (_, i) => (
                <TableRow key={i} aria-hidden="true">
                  {Array.from({ length: 5 }, (_, j) => <TableCell key={j}><Skeleton variant="text" /></TableCell>)}
                </TableRow>
              ))}

              {services && visible.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 4, textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 700 }}>
                      {filter === 'all' ? 'No services yet.' : `No ${STATUS_META[filter].label.toLowerCase()} services right now.`}
                    </Typography>
                    {filter !== 'all' && (
                      <Button variant="text" onClick={() => setFilter('all')} sx={{ mt: 1 }}>Show all services</Button>
                    )}
                  </TableCell>
                </TableRow>
              )}

              {services && visible.map((svc) => {
                const r = restarts[svc.id] ?? { phase: 'idle' };
                return (
                  <TableRow key={svc.id} sx={{ verticalAlign: 'top' }}>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 600, wordBreak: 'break-word' }}>{svc.name}</TableCell>
                    <TableCell>{svc.region}</TableCell>
                    <TableCell><StatusChip status={svc.status} /></TableCell>
                    <TableCell>
                      <Box component="time" dateTime={svc.lastDeployed} title={absolute.format(new Date(svc.lastDeployed))} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                        {timeAgo(svc.lastDeployed)}
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 180 }}>
                      {svc.status === 'down' && r.phase === 'restarting' && (
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" sx={{ minHeight: 44 }}>
                          <CircularProgress size={16} aria-hidden="true" />
                          <Typography variant="body2" color="text.secondary">Restarting…</Typography>
                        </Stack>
                      )}
                      {svc.status === 'down' && r.phase !== 'restarting' && (
                        <Button
                          variant="outlined" size="small" startIcon={<RestartAltIcon />}
                          onClick={() => restart(svc)} aria-label={r.phase === 'failed' ? `Try restarting ${svc.name} again` : `Restart ${svc.name}`}
                        >
                          {r.phase === 'failed' ? 'Try again' : 'Restart'}
                        </Button>
                      )}
                      {svc.status === 'down' && r.phase === 'failed' && (
                        <Typography variant="body2" color="error" sx={{ mt: 0.5, textAlign: 'right', maxWidth: 260, ml: 'auto' }}>
                          Couldn&rsquo;t restart {svc.name}. {r.message}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </EdgeCard>
      {!services && !loadError && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Loading services…</Typography>
      )}
    </Box>
  );
}
