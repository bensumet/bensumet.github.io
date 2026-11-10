import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, FormControl, IconButton,
  InputLabel, MenuItem, Select, Skeleton, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { EdgeCard, Lead, typography } from '@bensumet/edge';
import { Opener } from '../../components/Layout';
import { useVisitState } from '../../useVisitState';

// A cloud-console screen for a fictional platform, built only from Edge and the
// MUI parts Edge themes. Sample data throughout. Every control does something.

type Status = 'live' | 'deploying' | 'failed' | 'suspended';
type Env = 'production' | 'staging' | 'preview';
interface Service { id: string; name: string; kind: string; region: string; status: Status; deployed: string; cpu: number; repo: string }

const seeds: Record<Env, Service[]> = {
  production: [
    { id: 'p1', name: 'storefront-web', kind: 'Web service', region: 'Oregon', status: 'live', deployed: '12 min ago', cpu: 38, repo: 'northpine/storefront' },
    { id: 'p2', name: 'orders-api', kind: 'Web service', region: 'Ohio', status: 'live', deployed: '2 hr ago', cpu: 61, repo: 'northpine/orders' },
    { id: 'p3', name: 'queue-worker', kind: 'Background worker', region: 'Ohio', status: 'failed', deployed: '4 min ago', cpu: 0, repo: 'northpine/orders' },
    { id: 'p4', name: 'nightly-report', kind: 'Cron job', region: 'Frankfurt', status: 'live', deployed: 'yesterday', cpu: 4, repo: 'northpine/reports' },
    { id: 'p5', name: 'search-index', kind: 'Private service', region: 'Oregon', status: 'deploying', deployed: 'now', cpu: 22, repo: 'northpine/search' },
    { id: 'p6', name: 'legacy-admin', kind: 'Web service', region: 'Singapore', status: 'suspended', deployed: '31 days ago', cpu: 0, repo: 'northpine/admin' },
    { id: 'p7', name: 'postgres-main', kind: 'Database', region: 'Ohio', status: 'live', deployed: '9 days ago', cpu: 47, repo: '—' },
  ],
  staging: [
    { id: 's1', name: 'storefront-web', kind: 'Web service', region: 'Oregon', status: 'live', deployed: '3 min ago', cpu: 9, repo: 'northpine/storefront' },
    { id: 's2', name: 'orders-api', kind: 'Web service', region: 'Ohio', status: 'deploying', deployed: 'now', cpu: 14, repo: 'northpine/orders' },
    { id: 's3', name: 'queue-worker', kind: 'Background worker', region: 'Ohio', status: 'live', deployed: '1 hr ago', cpu: 6, repo: 'northpine/orders' },
    { id: 's4', name: 'postgres-staging', kind: 'Database', region: 'Ohio', status: 'live', deployed: '2 days ago', cpu: 11, repo: '—' },
  ],
  preview: [
    { id: 'v1', name: 'storefront-pr-412', kind: 'Web service', region: 'Oregon', status: 'live', deployed: '25 min ago', cpu: 3, repo: 'northpine/storefront' },
    { id: 'v2', name: 'storefront-pr-415', kind: 'Web service', region: 'Oregon', status: 'failed', deployed: '8 min ago', cpu: 0, repo: 'northpine/storefront' },
    { id: 'v3', name: 'orders-pr-88', kind: 'Web service', region: 'Ohio', status: 'live', deployed: '2 hr ago', cpu: 2, repo: 'northpine/orders' },
  ],
};
const envStats: Record<Env, [string, string]> = { production: ['14', '$1,284'], staging: ['31', '$212'], preview: ['9', '$46'] };

const statusLook: Record<Status, { word: string; mark: string; color: 'success' | 'info' | 'error' | 'warning' }> = {
  live: { word: 'Live', mark: '✓', color: 'success' },
  deploying: { word: 'Deploying', mark: '↻', color: 'info' },
  failed: { word: 'Deploy failed', mark: '×', color: 'error' },
  suspended: { word: 'Suspended', mark: '‖', color: 'warning' },
};

const logLines = (name: string) => [
  '==> Cloning from main at a41c9e2',
  '==> Installing dependencies with npm ci',
  'added 812 packages in 41s',
  `==> Building ${name}`,
  'Compiling 214 modules…',
  '<--- Last few GCs --->',
  'FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory',
  '==> Build failed after 2m 14s (exit code 134)',
  '==> The previous deploy is still serving traffic',
];

type Scenario = 'normal' | 'empty' | 'error';
type Panel = { kind: 'detail'; id: string } | { kind: 'logs'; id: string } | null;

function StatusChip({ status }: { status: Status }) {
  const s = statusLook[status];
  return <Chip size="small" variant="outlined" color={s.color} label={<><Box component="span" aria-hidden="true" sx={{ mr: 0.75, fontWeight: 800 }}>{s.mark}</Box>{s.word}</>} />;
}

const blankForm = { name: '', repo: '', kind: 'Web service', region: 'Oregon' };

export default function ConsolePage() {
  const [scenario, setScenario] = useVisitState<Scenario>('console.scenario', 'normal');
  const [env, setEnv] = useVisitState<Env>('console.env', 'production');
  const [phase, setPhase] = useState<'loading' | 'ready' | 'error'>('loading');
  const [services, setServices] = useState<Service[]>([]);
  const [retrying, setRetrying] = useState(false);
  const [deployAttempts, setDeployAttempts] = useState(0);
  const [announce, setAnnounce] = useState('');
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all');
  const [panel, setPanel] = useState<Panel>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [tried, setTried] = useState(false);
  const rows = useRef<(HTMLTableRowElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const load = useCallback((which: Scenario, where: Env) => {
    setPhase('loading');
    const t = window.setTimeout(() => {
      if (which === 'error') { setPhase('error'); setAnnounce('Couldn’t load services.'); return; }
      const list = which === 'empty' ? [] : seeds[where];
      setServices(list);
      setPhase('ready');
      setAnnounce(which === 'empty' ? 'No services yet.' : `${list.length} services loaded in ${where}.`);
    }, 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => { setDeployAttempts(0); setActive(0); setPanel(null); return load(scenario, env); }, [scenario, env, load]);

  const failed = services.find((s) => s.status === 'failed');
  const shown = useMemo(() => services.filter((s) =>
    (statusFilter === 'all' || s.status === statusFilter) && s.name.toLowerCase().includes(query.trim().toLowerCase())), [services, statusFilter, query]);
  const filtering = query.trim() !== '' || statusFilter !== 'all';
  const current = panel ? services.find((s) => s.id === panel.id) : undefined;

  const setStatus = (id: string, status: Status, extra: Partial<Service> = {}) =>
    setServices((list) => list.map((s) => (s.id === id ? { ...s, status, ...extra } : s)));

  // The first retry fails again, so the recovery path is visible; the second works.
  const retryDeploy = () => {
    if (!failed) return;
    setRetrying(true);
    setAnnounce(`Retrying deploy of ${failed.name}.`);
    later(() => {
      setRetrying(false);
      const attempt = deployAttempts + 1;
      setDeployAttempts(attempt);
      if (attempt === 1) setAnnounce(`Deploy of ${failed.name} failed again.`);
      else { setStatus(failed.id, 'live', { deployed: 'just now', cpu: 12 }); setAnnounce(`${failed.name} is live.`); }
    }, 1100);
  };

  const redeploy = (s: Service) => {
    setStatus(s.id, 'deploying', { deployed: 'now' });
    setAnnounce(`Deploying ${s.name}.`);
    later(() => { setStatus(s.id, 'live', { deployed: 'just now', cpu: 10 }); setAnnounce(`${s.name} is live.`); }, 2200);
  };
  const toggleSuspend = (s: Service) => {
    if (s.status === 'suspended') { redeploy(s); return; }
    setStatus(s.id, 'suspended', { cpu: 0 });
    setAnnounce(`${s.name} is suspended.`);
  };

  // New service form: a short form, validated on submit and then as you type.
  const nameError = !form.name ? 'Enter a name.' : !/^[a-z][a-z0-9-]{2,39}$/.test(form.name) ? 'Use 3 to 40 lowercase letters, numbers and dashes, starting with a letter.' : services.some((s) => s.name === form.name) ? 'A service with this name already exists here.' : '';
  const repoError = !form.repo ? 'Enter a repository, like owner/name.' : !/^[\w.-]+\/[\w.-]+$/.test(form.repo) ? 'Write it as owner/name.' : '';
  const openCreate = () => { setForm(blankForm); setTried(false); setCreating(true); };
  const create = () => {
    setTried(true);
    if (nameError || repoError) return;
    const s: Service = { id: `n${Date.now()}`, name: form.name, kind: form.kind, region: form.region, status: 'deploying', deployed: 'now', cpu: 0, repo: form.repo };
    setServices((list) => [s, ...list]);
    setQuery(''); setStatusFilter('all');
    setCreating(false);
    setAnnounce(`${s.name} created. First deploy started.`);
    later(() => { setStatus(s.id, 'live', { deployed: 'just now', cpu: 5 }); setAnnounce(`${s.name} is live.`); }, 3000);
  };

  // Arrow keys move between rows; Home and End jump; Enter opens; one tab stop for the whole table.
  const onRowKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPanel({ kind: 'detail', id: shown[i].id }); return; }
    const last = shown.length - 1;
    const next = e.key === 'ArrowDown' ? Math.min(i + 1, last) : e.key === 'ArrowUp' ? Math.max(i - 1, 0) : e.key === 'Home' ? 0 : e.key === 'End' ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    rows.current[next]?.focus();
  };

  const live = services.filter((s) => s.status === 'live').length;
  const field = (k: keyof typeof form) => ({ value: form[k], onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value })) });

  return (
    <>
      <Opener eyebrow="Demo" bold="A console," italic="built only from Edge.">
        <Lead opening="A design system earns its keep on dense, busy screens.">
          This is a cloud console for a fictional platform, with sample data. Everything in it works: switch environments, search and
          filter, open a service, read a failed build&rsquo;s logs, create a service and watch it deploy. The demo controls above it switch the
          console into the states a real one has to handle.
        </Lead>
      </Opener>

      <Box component="section" aria-labelledby="cn-demo" sx={{ mb: 3, p: 2, bgcolor: 'edge.raised', border: 1, borderColor: 'divider' }}>
        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
          <Box sx={{ mr: 1 }}>
            <Typography id="cn-demo" variant="body2" sx={{ fontWeight: 650 }}>Demo controls</Typography>
            <Typography variant="body2" color="text.secondary">Not part of the console. They choose which state it&rsquo;s in.</Typography>
          </Box>
          <ToggleButtonGroup exclusive size="small" value={scenario} aria-labelledby="cn-demo" onChange={(_, v: Scenario | null) => { if (v) setScenario(v); }}>
            <ToggleButton value="normal" sx={{ textTransform: 'none' }}>With services</ToggleButton>
            <ToggleButton value="empty" sx={{ textTransform: 'none' }}>New project</ToggleButton>
            <ToggleButton value="error" sx={{ textTransform: 'none' }}>Load fails</ToggleButton>
          </ToggleButtonGroup>
          <Button size="small" variant="text" onClick={() => load(scenario, env)}>Reload</Button>
        </Stack>
      </Box>

      <Box role="status" aria-live="polite" sx={{ position: 'absolute', left: -9999 }}>{announce}</Box>

      <Box component="section" aria-labelledby="cn-title" sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 3 }, py: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <Typography id="cn-title" variant="h4" component="h2">Services</Typography>
            <Typography variant="body2" color="text.secondary">Northpine Retail, sample data</Typography>
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="cn-env-label">Environment</InputLabel>
              <Select labelId="cn-env-label" label="Environment" value={env} onChange={(e) => setEnv(e.target.value as Env)}>
                <MenuItem value="production">Production</MenuItem>
                <MenuItem value="staging">Staging</MenuItem>
                <MenuItem value="preview">Preview</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={openCreate} disabled={phase !== 'ready'}>New service</Button>
          </Stack>
        </Stack>

        {phase === 'ready' && services.length > 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, borderBottom: 1, borderColor: 'divider' }}>
            {[
              ['Services', String(services.length)],
              ['Live', `${live} of ${services.length}`],
              ['Deploys today', envStats[env][0]],
              ['Spend this month', envStats[env][1]],
            ].map(([k, v]) => (
              <Box key={k} sx={{ px: { xs: 2, md: 3 }, py: 1.5, borderRight: 1, borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">{k}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', fontVariantNumeric: 'tabular-nums' }}>{v}</Typography>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {phase === 'ready' && failed && (
            <Alert severity="error" sx={{ mb: 2 }} action={
              <Stack direction="row" spacing={1}>
                <Button size="small" variant="outlined" color="inherit" onClick={retryDeploy} disabled={retrying} startIcon={retrying ? <CircularProgress size={14} color="inherit" aria-hidden="true" /> : undefined}>
                  {retrying ? 'Retrying…' : 'Retry deploy'}
                </Button>
                <Button size="small" color="inherit" onClick={() => setPanel({ kind: 'logs', id: failed.id })}>View logs</Button>
              </Stack>
            }>
              {deployAttempts === 0
                ? <><b>{failed.name}</b> didn&rsquo;t deploy: the build ran out of memory. The previous version is still serving traffic.</>
                : <><b>{failed.name}</b> failed again with the same error. Try a larger instance, or check the build logs.</>}
            </Alert>
          )}

          {phase === 'loading' && (
            <Stack spacing={1.25} aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => <Skeleton key={i} variant="rectangular" height={36} />)}
            </Stack>
          )}

          {phase === 'error' && (
            <EdgeCard variant="outlined" sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 650, color: 'error.main' }}>Couldn&rsquo;t load your services.</Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2, maxWidth: typography.measure }}>
                Nothing is down; the console couldn&rsquo;t reach the platform. Your services keep running while we retry.
              </Typography>
              <Button variant="outlined" onClick={() => setScenario('normal')}>Try again</Button>
            </EdgeCard>
          )}

          {phase === 'ready' && services.length === 0 && (
            <EdgeCard variant="outlined" sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 650 }}>No services yet</Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2, maxWidth: typography.measure }}>
                Connect a repository and the platform builds and deploys it on every push. Most first deploys take about two minutes.
              </Typography>
              <Button variant="outlined" onClick={openCreate}>Connect a repository</Button>
            </EdgeCard>
          )}

          {phase === 'ready' && services.length > 0 && (
            <>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
                <TextField size="small" label="Search services" value={query} onChange={(e) => { setQuery(e.target.value); setActive(0); }} sx={{ minWidth: 240 }} />
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <InputLabel id="cn-status-label">Status</InputLabel>
                  <Select labelId="cn-status-label" label="Status" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as 'all' | Status); setActive(0); }}>
                    <MenuItem value="all">All statuses</MenuItem>
                    {(Object.keys(statusLook) as Status[]).map((k) => <MenuItem key={k} value={k}>{statusLook[k].word}</MenuItem>)}
                  </Select>
                </FormControl>
                {filtering && <Button variant="text" onClick={() => { setQuery(''); setStatusFilter('all'); }}>Clear filters</Button>}
              </Stack>

              {shown.length === 0 ? (
                <EdgeCard variant="outlined" sx={{ p: 3 }}>
                  <Typography sx={{ fontWeight: 650 }}>No services match</Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>Nothing in {env} matches those filters.</Typography>
                  <Button variant="outlined" onClick={() => { setQuery(''); setStatusFilter('all'); }}>Clear filters</Button>
                </EdgeCard>
              ) : (
                <Box tabIndex={0} role="region" aria-label="Services table" sx={{ overflowX: 'auto', border: 1, borderColor: 'divider' }}>
                  <Box component="table" sx={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums', fontSize: '0.9rem',
                    '& th, & td': { textAlign: 'left', px: 1.5, py: 0.9, borderBottom: 1, borderColor: 'divider', whiteSpace: 'nowrap' },
                    '& th': { bgcolor: 'edge.raised', fontWeight: 600, fontSize: '0.8rem' },
                    '& tbody tr': { cursor: 'pointer', outline: 'none' },
                    '& tbody tr:hover': { bgcolor: 'action.hover' },
                    '& tbody tr:focus-visible': { boxShadow: (t) => `inset 3px 0 0 ${t.palette.primary.main}`, bgcolor: 'action.selected' } }}>
                    <caption style={{ position: 'absolute', left: -9999 }}>Services in {env}. Use the arrow keys to move between rows, and Enter to open one.</caption>
                    <thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Region</th><th scope="col">Status</th><th scope="col">Last deploy</th><th scope="col">CPU</th></tr></thead>
                    <tbody>
                      {shown.map((s, i) => (
                        <tr key={s.id} ref={(el) => { rows.current[i] = el; }} tabIndex={i === Math.min(active, shown.length - 1) ? 0 : -1}
                          onKeyDown={(e) => onRowKey(e, i)} onFocus={() => setActive(i)} onClick={() => setPanel({ kind: 'detail', id: s.id })}
                          aria-label={`${s.name}, ${statusLook[s.status].word}. Press Enter to open.`}>
                          <td style={{ fontWeight: 600 }}>{s.name}</td>
                          <td>{s.kind}</td>
                          <td>{s.region}</td>
                          <td><StatusChip status={s.status} /></td>
                          <td>{s.deployed}</td>
                          <td>{s.status === 'live' || s.status === 'deploying' ? `${s.cpu}%` : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
        Keyboard: Tab into the table, use the arrow keys, Home and End, and Enter to open a service. The first retry fails on purpose, so you can see the second error.
      </Typography>

      <Drawer anchor="right" open={!!panel && !!current} onClose={() => setPanel(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 460 }, p: 3 } } }}>
        {current && panel?.kind === 'detail' && (
          <Stack spacing={2.5} component="section" aria-labelledby="cn-detail">
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography id="cn-detail" variant="h4" component="h2">{current.name}</Typography>
                <Typography variant="body2" color="text.secondary">{current.kind} in {current.region}, {env}</Typography>
              </Box>
              <IconButton aria-label="Close" onClick={() => setPanel(null)}><Box component="span" aria-hidden="true">×</Box></IconButton>
            </Stack>
            <Box><StatusChip status={current.status} /></Box>
            <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1, columnGap: 3, '& dt': { color: 'text.secondary' }, '& dd': { m: 0, fontVariantNumeric: 'tabular-nums' } }}>
              <dt>Repository</dt><dd>{current.repo}</dd>
              <dt>Last deploy</dt><dd>{current.deployed}</dd>
              <dt>CPU</dt><dd>{current.status === 'live' || current.status === 'deploying' ? `${current.cpu}%` : 'Not running'}</dd>
              <dt>Address</dt><dd style={{ fontFamily: typography.mono, fontSize: '0.85rem' }}>{current.name}.northpine.example</dd>
            </Box>
            <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
              <Button variant="outlined" onClick={() => redeploy(current)} disabled={current.status === 'deploying'}>
                {current.status === 'deploying' ? 'Deploying…' : 'Deploy latest commit'}
              </Button>
              {current.kind !== 'Database' && (
                <Button variant="text" onClick={() => toggleSuspend(current)} disabled={current.status === 'deploying'}>
                  {current.status === 'suspended' ? 'Resume' : 'Suspend'}
                </Button>
              )}
              {current.status === 'failed' && <Button variant="text" onClick={() => setPanel({ kind: 'logs', id: current.id })}>View logs</Button>}
            </Stack>
          </Stack>
        )}
        {current && panel?.kind === 'logs' && (
          <Stack spacing={2} component="section" aria-labelledby="cn-logs">
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography id="cn-logs" variant="h4" component="h2">Build logs</Typography>
                <Typography variant="body2" color="text.secondary">{current.name}, latest deploy</Typography>
              </Box>
              <IconButton aria-label="Close" onClick={() => setPanel(null)}><Box component="span" aria-hidden="true">×</Box></IconButton>
            </Stack>
            <Box component="pre" tabIndex={0} aria-label="Log output" sx={{ m: 0, p: 2, bgcolor: 'edge.raised', border: 1, borderColor: 'divider', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: typography.mono, fontSize: '0.8rem', lineHeight: 1.7 }}>
              {logLines(current.name).map((l) => (
                <Box key={l} component="span" sx={{ display: 'block', color: l.startsWith('FATAL') ? 'error.main' : 'text.primary', fontWeight: l.startsWith('FATAL') ? 700 : 400 }}>{l}</Box>
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">The build needed more memory than its instance has. A larger instance, or a smaller build step, fixes it.</Typography>
            <Box><Button variant="outlined" onClick={() => setPanel({ kind: 'detail', id: current.id })}>Back to {current.name}</Button></Box>
          </Stack>
        )}
      </Drawer>

      <Dialog open={creating} onClose={() => setCreating(false)} aria-labelledby="cn-new" fullWidth maxWidth="sm">
        <Box component="form" noValidate onSubmit={(e: React.FormEvent) => { e.preventDefault(); create(); }}>
          <DialogTitle id="cn-new">New service in {env}</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ pt: 1 }}>
              <TextField label="Repository" placeholder="owner/name" required {...field('repo')} error={tried && !!repoError} helperText={tried && repoError ? repoError : 'The platform deploys it on every push to main.'} />
              <TextField label="Service name" required {...field('name')} error={tried && !!nameError} helperText={tried && nameError ? nameError : 'Lowercase letters, numbers and dashes.'} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="cn-kind">Type</InputLabel>
                  <Select labelId="cn-kind" label="Type" value={form.kind} onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value }))}>
                    {['Web service', 'Private service', 'Background worker', 'Cron job'].map((k) => <MenuItem key={k} value={k}>{k}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="cn-region">Region</InputLabel>
                  <Select labelId="cn-region" label="Region" value={form.region} onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}>
                    {['Oregon', 'Ohio', 'Frankfurt', 'Singapore'].map((k) => <MenuItem key={k} value={k}>{k}</MenuItem>)}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button variant="text" onClick={() => setCreating(false)}>Cancel</Button>
            <Button variant="contained" type="submit">Create service</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
