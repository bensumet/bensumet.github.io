import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box, Button, Chip, CircularProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { EdgeCard, typography } from '@bensumet/edge';

// Service status for a small cloud-hosting team. Sample data only: restarts
// are simulated, and two of the down services fail so the error path shows.

type Status = 'healthy' | 'degraded' | 'down';
type Filter = Status | 'all';

interface Service {
  id: string;
  name: string;
  region: string;
  status: Status;
  lastDeployed: Date;
  /** Sample only: how many restart attempts fail before one works (Infinity: never works). */
  failingRestarts?: number;
  /** Sample only: why the simulated restart fails. */
  failureReason?: string;
}

type RestartState =
  | { kind: 'restarting' }
  | { kind: 'failed'; reason: string };

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000);

const SAMPLE_SERVICES: Service[] = [
  { id: 'api-gateway', name: 'api-gateway', region: 'us-east-1', status: 'healthy', lastDeployed: minutesAgo(42) },
  { id: 'auth', name: 'auth-service', region: 'eu-west-1', status: 'healthy', lastDeployed: minutesAgo(60 * 26) },
  { id: 'billing', name: 'billing-worker', region: 'us-east-1', status: 'down', lastDeployed: minutesAgo(60 * 3 + 12), failingRestarts: 1, failureReason: 'the health check timed out after 30 seconds' },
  { id: 'search', name: 'search-indexer', region: 'ap-southeast-2', status: 'down', lastDeployed: minutesAgo(60 * 24 * 4), failingRestarts: Infinity, failureReason: 'the container ran out of memory while starting' },
  { id: 'metrics', name: 'metrics-collector', region: 'eu-west-1', status: 'down', lastDeployed: minutesAgo(8) },
  { id: 'images', name: 'image-resizer', region: 'us-west-2', status: 'degraded', lastDeployed: minutesAgo(60 * 5) },
  { id: 'cache', name: 'edge-cache', region: 'sa-east-1', status: 'degraded', lastDeployed: minutesAgo(60 * 24 * 2 + 90) },
  { id: 'db', name: 'postgres-primary', region: 'eu-central-1', status: 'healthy', lastDeployed: minutesAgo(60 * 24 * 12) },
  { id: 'notify', name: 'notifications', region: 'us-east-2', status: 'healthy', lastDeployed: minutesAgo(3) },
];

const STATUS: Record<Status, { label: string; color: 'success' | 'warning' | 'error'; Icon: typeof CheckCircleOutlineIcon; rank: number }> = {
  down: { label: 'Down', color: 'error', Icon: ErrorOutlineIcon, rank: 0 },
  degraded: { label: 'Degraded', color: 'warning', Icon: ReportProblemOutlinedIcon, rank: 1 },
  healthy: { label: 'Healthy', color: 'success', Icon: CheckCircleOutlineIcon, rank: 2 },
};
const FILTERS: Filter[] = ['all', 'down', 'degraded', 'healthy'];
const RESTART_MS = 1500;

/** Simulated restart. Rejects with a reason while the sample says it should fail. */
function restartService(service: Service, attempt: number): Promise<void> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (attempt <= (service.failingRestarts ?? 0)) reject(new Error(service.failureReason ?? 'the restart didn’t finish'));
      else resolve();
    }, RESTART_MS);
  });
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const absolute = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

function relative(date: Date, now: number): string {
  const mins = Math.round((date.getTime() - now) / 60_000);
  if (Math.abs(mins) < 1) return 'just now';
  if (Math.abs(mins) < 60) return rtf.format(mins, 'minute');
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  return rtf.format(Math.round(hours / 24), 'day');
}

function StatusChip({ status }: { status: Status }) {
  const { label, color, Icon } = STATUS[status];
  return <Chip size="small" variant="outlined" color={color} icon={<Icon fontSize="small" />} label={label} />;
}

export default function ServiceStatus() {
  const [services, setServices] = useState<Service[]>(SAMPLE_SERVICES);
  const [filter, setFilter] = useState<Filter>('all');
  const [restarts, setRestarts] = useState<Record<string, RestartState>>({});
  const [announcement, setAnnouncement] = useState('');
  const [now, setNow] = useState(() => Date.now());
  const attempts = useRef<Record<string, number>>({});
  const mounted = useRef(true);

  // Keep "x minutes ago" current, and ignore restarts that finish after the screen closes.
  useEffect(() => {
    mounted.current = true;
    const tick = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => { mounted.current = false; window.clearInterval(tick); };
  }, []);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: services.length, healthy: 0, degraded: 0, down: 0 };
    services.forEach((s) => { c[s.status] += 1; });
    return c;
  }, [services]);

  // Worst first, so what needs attention sits at the top.
  const rows = useMemo(
    () => services
      .filter((s) => filter === 'all' || s.status === filter)
      .sort((a, b) => STATUS[a.status].rank - STATUS[b.status].rank || a.name.localeCompare(b.name)),
    [services, filter],
  );

  async function restart(service: Service) {
    const attempt = (attempts.current[service.id] ?? 0) + 1;
    attempts.current[service.id] = attempt;
    setRestarts((r) => ({ ...r, [service.id]: { kind: 'restarting' } }));
    setAnnouncement(`Restarting ${service.name}…`);
    try {
      await restartService(service, attempt);
      if (!mounted.current) return;
      setServices((list) => list.map((s) => (s.id === service.id ? { ...s, status: 'healthy' } : s)));
      setRestarts((r) => { const next = { ...r }; delete next[service.id]; return next; });
      setAnnouncement(`${service.name} restarted and is healthy.`);
    } catch (e) {
      if (!mounted.current) return;
      const reason = e instanceof Error ? e.message : 'the restart didn’t finish';
      setRestarts((r) => ({ ...r, [service.id]: { kind: 'failed', reason } }));
      setAnnouncement(`Couldn’t restart ${service.name}: ${reason}. It’s still down.`);
    }
  }

  const filterLabel = (f: Filter) => (f === 'all' ? 'All' : STATUS[f].label);

  return (
    <Box component="section" aria-labelledby="service-status-title">
      <Typography id="service-status-title" variant="h3" component="h2" sx={{ mb: 1 }}>Service status</Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: typography.measure }}>
        {counts.all} services: {counts.down} down, {counts.degraded} degraded, {counts.healthy} healthy. Down services can be restarted from here.
      </Typography>

      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1.5, alignItems: 'center', mb: 2 }}>
        <Typography id="status-filter-label" variant="body2" sx={{ fontWeight: 700 }}>Show</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={filter}
          onChange={(_, v: Filter | null) => v && setFilter(v)}
          aria-labelledby="status-filter-label"
          sx={{ flexWrap: 'wrap', '& .Mui-selected, & .Mui-selected:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' } }}
        >
          {FILTERS.map((f) => (
            <ToggleButton key={f} value={f} sx={{ px: 2, textTransform: 'none', fontVariantNumeric: 'tabular-nums' }}>
              {filterLabel(f)} ({counts[f]})
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      <Typography variant="body2" color="text.secondary" role="status" aria-live="polite" sx={{ minHeight: '1.5em', mb: 1 }}>
        {announcement}
      </Typography>

      <EdgeCard>
        {rows.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 700 }}>No services match &ldquo;{filterLabel(filter)}&rdquo;.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
              {filter === 'down' ? 'Everything is running.' : 'Nothing has this status right now.'}
            </Typography>
            <Button variant="outlined" onClick={() => setFilter('all')}>Show all services</Button>
          </Box>
        ) : (
          <TableContainer>
            <Table size="small" sx={{ minWidth: 680 }}>
              <Box component="caption" sx={{ captionSide: 'top', textAlign: 'left', px: 2, pt: 2, pb: 1, color: 'text.secondary' }}>
                {filter === 'all' ? 'All services' : `${filterLabel(filter)} services`}, worst status first
              </Box>
              <TableHead>
                <TableRow>
                  <TableCell scope="col">Service</TableCell>
                  <TableCell scope="col">Region</TableCell>
                  <TableCell scope="col">Status</TableCell>
                  <TableCell scope="col">Last deployed</TableCell>
                  <TableCell scope="col" align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((s) => {
                  const r = restarts[s.id];
                  const busy = r?.kind === 'restarting';
                  return (
                    <TableRow key={s.id} aria-busy={busy || undefined} sx={{ verticalAlign: 'top' }}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 700, py: 1.5 }}>{s.name}</TableCell>
                      <TableCell sx={{ fontFamily: typography.mono, fontSize: '0.85rem', py: 1.5 }}>{s.region}</TableCell>
                      <TableCell sx={{ py: 1.5 }}><StatusChip status={s.status} /></TableCell>
                      <TableCell sx={{ py: 1.5, fontVariantNumeric: 'tabular-nums' }}>
                        <Box component="time" dateTime={s.lastDeployed.toISOString()} sx={{ display: 'block' }}>
                          {relative(s.lastDeployed, now)}
                        </Box>
                        <Typography variant="caption" color="text.secondary">{absolute.format(s.lastDeployed)}</Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 1.5, width: 260 }}>
                        {s.status === 'down' ? (
                          <Stack spacing={0.75} sx={{ alignItems: 'flex-end' }}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => restart(s)}
                              disabled={busy}
                              startIcon={busy ? <CircularProgress size={16} color="inherit" aria-hidden /> : <RestartAltIcon />}
                              aria-label={`${r?.kind === 'failed' ? 'Try restarting' : 'Restart'} ${s.name}`}
                            >
                              {busy ? 'Restarting…' : r?.kind === 'failed' ? 'Try again' : 'Restart'}
                            </Button>
                            {r?.kind === 'failed' && (
                              <Stack direction="row" spacing={0.75} sx={{ color: 'error.main', textAlign: 'left', maxWidth: 240 }}>
                                <ErrorOutlineIcon fontSize="small" aria-hidden />
                                <Typography variant="caption" sx={{ color: 'inherit', lineHeight: 1.4 }}>
                                  Couldn&rsquo;t restart: {r.reason}. Try again, or check the service logs.
                                </Typography>
                              </Stack>
                            )}
                          </Stack>
                        ) : (
                          <Typography variant="body2" color="text.secondary">No action needed</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </EdgeCard>
    </Box>
  );
}
