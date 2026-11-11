import { useEffect, useId, useRef, useState } from 'react';
import {
  Alert, Box, Button, Chip, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch, Tab, Table,
  TableBody, TableCell, TableHead, TableRow, Tabs, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { AiLabel, Columns, EdgeCard, SuggestionList, SummaryCard } from '@bensumet/edge';

import { useTween } from '../../components/Motion';

// The CoreConnect agent quote, redesigned on Edge. Same information and steps as the
// shipped Premium step; sample data, fictional insured, prices from a simple sample model.

const money = (n: number) => (n < 0 ? `−$${Math.abs(n).toLocaleString('en-US')}` : `$${n.toLocaleString('en-US')}`);
const num = { fontVariantNumeric: 'tabular-nums', textAlign: 'right', whiteSpace: 'nowrap' } as const;

interface Choices { dwelling: number; liability: number; deductible: number; water: number; paperless: boolean }
const start: Choices = { dwelling: 350000, liability: 100000, deductible: 500, water: 0, paperless: true };
// The version the agent quoted last week, for the "since last version" comparison.
const lastVersion = 1094;

function price(c: Choices) {
  const coverages = [
    { name: 'A · Dwelling', limit: c.dwelling, premium: Math.round(c.dwelling * 0.0026), edit: 'dwelling' as const },
    { name: 'B · Other structures', limit: c.dwelling * 0.1, premium: Math.round(c.dwelling * 0.1 * 0.0011) },
    { name: 'C · Personal property', limit: c.dwelling * 0.5, premium: Math.round(c.dwelling * 0.5 * 0.0004) },
    { name: 'D · Loss of use', limit: c.dwelling * 0.2, premium: 0 },
    { name: 'E · Personal liability', limit: c.liability, premium: ({ 100000: 20, 300000: 38, 500000: 52 } as Record<number, number>)[c.liability], edit: 'liability' as const },
    { name: 'F · Medical payments to others', limit: 2000, premium: 3 },
  ];
  const options = [
    { name: 'Extended replacement cost', limit: '25% over Coverage A', premium: 36 },
    { name: 'Water backup', limit: c.water ? money(c.water) : 'Not added', premium: ({ 0: 0, 5000: 50, 10000: 72 } as Record<number, number>)[c.water], edit: 'water' as const },
    { name: 'Roof replacement cost', limit: 'Included', premium: 0 },
  ];
  const credits = [
    { name: 'Deductible', limit: money(c.deductible), premium: ({ 500: 0, 1000: -64, 2500: -138 } as Record<number, number>)[c.deductible], edit: 'deductible' as const },
    { name: 'Roof age, 10 years', limit: 'Credit', premium: -18 },
    { name: 'Claims free, 5 years', limit: 'Credit', premium: -41 },
    { name: 'Paperless', limit: c.paperless ? 'On' : 'Off', premium: c.paperless ? -12 : 0 },
  ];
  const sum = (rows: { premium: number }[]) => rows.reduce((a, r) => a + r.premium, 0);
  const groups = { coverages: sum(coverages), options: sum(options), credits: sum(credits) };
  return { coverages, options, credits, groups, total: groups.coverages + groups.options + groups.credits };
}

const steps = ['Insured', 'Dwelling', 'Coverage', 'Questions', 'Loss history', 'Premium', 'Purchase'];
const redesigned = ['Insured', 'Premium'];

const suggestions = [
  { id: 'water', title: 'Add water backup, $5,000', reason: 'The dwelling record lists a finished basement with a sump pump, and the quote has no water backup. Adds $50 a year.' },
  { id: 'liability', title: 'Raise personal liability to $300,000', reason: 'The questionnaire says the home has a pool; $100,000 is the lowest limit. Adds $18 a year.' },
  { id: 'deductible', title: 'Raise the deductible to $1,000', reason: 'No claims in five years of loss history, so a higher deductible is a fair trade. Saves $64 a year.' },
];
const applies: Record<string, Partial<Choices>> = { water: { water: 5000 }, liability: { liability: 300000 }, deductible: { deductible: 1000 } };

function LimitSelect({ label, value, options, onChange }: { label: string; value: number; options: [number, string][]; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <FormControl size="small" sx={{ minWidth: 0, width: '100%' }}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select labelId={id} label={label} value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map(([v, t]) => <MenuItem key={v} value={v}>{t}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export function CoreConnectRedesign() {
  const [c, setC] = useState<Choices>(start);
  const [tab, setTab] = useState('Premium');
  const [rating, setRating] = useState<'up' | 'down'>('up');
  const [phase, setPhase] = useState<'ready' | 'repricing' | 'error'>('ready');
  const [shown, setShown] = useState(() => price(start));
  const [announce, setAnnounce] = useState('');
  const [email, setEmail] = useState('june.alder@example.com');
  const [bound, setBound] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Every change goes to the (sample) rating service; the numbers update when it answers.
  const reprice = (fresh: Choices, ratingNow = rating) => {
    window.clearTimeout(timer.current);
    setPhase('repricing'); setAnnounce('Repricing the quote.');
    timer.current = window.setTimeout(() => {
      if (ratingNow === 'down') { setPhase('error'); setAnnounce('Couldn’t reprice the quote.'); return; }
      const p = price(fresh); setShown(p); setPhase('ready'); setAnnounce(`Annual premium is now ${money(p.total)}.`);
    }, 700);
  };
  const change = (patch: Partial<Choices>) => { const fresh = { ...c, ...patch }; setC(fresh); setBound(false); reprice(fresh); };
  const onDecide = (id: string, d: 'accepted' | 'dismissed' | null) => {
    if (d === 'accepted') change(applies[id]);
    if (d === null) { const k = Object.keys(applies[id])[0] as keyof Choices; change({ [k]: start[k] } as Partial<Choices>); }
  };
  const p = shown;
  const total = useTween(p.total);
  const delta = p.total - lastVersion;
  const emailError = !email ? 'Enter an email so the quote and policy documents can be sent.' : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? 'Write the email like name@example.com.' : '';

  const groupRows = (title: string, rows: ReturnType<typeof price>['coverages'] | ReturnType<typeof price>['options'] | ReturnType<typeof price>['credits'], subtotal: number) => (
    <>
      <TableRow><TableCell colSpan={3} sx={{ pt: 3, pb: 1, borderBottom: 2, borderColor: 'text.primary' }}>
        <Typography variant="h5" component="h4">{title}</Typography>
      </TableCell></TableRow>
      {rows.map((r) => {
        const edit = 'edit' in r ? r.edit : undefined;
        return (
          <TableRow key={r.name}>
            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{r.name}</TableCell>
            <TableCell sx={{ width: { xs: '42%', sm: '38%' } }}>
              {edit === 'dwelling' && <LimitSelect label="Dwelling limit" value={c.dwelling} onChange={(v) => change({ dwelling: v })} options={[[300000, '$300,000'], [350000, '$350,000'], [400000, '$400,000']]} />}
              {edit === 'liability' && <LimitSelect label="Liability limit" value={c.liability} onChange={(v) => change({ liability: v })} options={[[100000, '$100,000'], [300000, '$300,000'], [500000, '$500,000']]} />}
              {edit === 'water' && <LimitSelect label="Water backup" value={c.water} onChange={(v) => change({ water: v })} options={[[0, 'Not added'], [5000, '$5,000'], [10000, '$10,000']]} />}
              {edit === 'deductible' && <LimitSelect label="Deductible" value={c.deductible} onChange={(v) => change({ deductible: v })} options={[[500, '$500'], [1000, '$1,000'], [2500, '$2,500']]} />}
              {!edit && <Typography variant="body2" sx={{ fontVariantNumeric: 'tabular-nums' }}>{typeof r.limit === 'number' ? money(r.limit) : r.limit}</Typography>}
            </TableCell>
            <TableCell sx={{ ...num, color: r.premium < 0 ? 'success.main' : 'text.primary' }}>{r.premium !== 0 ? money(r.premium) : edit === 'water' || edit === 'deductible' ? '$0' : 'Included'}</TableCell>
          </TableRow>
        );
      })}
      <TableRow><TableCell colSpan={2} sx={{ color: 'text.secondary' }}>{title} subtotal</TableCell><TableCell sx={{ ...num, fontWeight: 700 }}>{money(subtotal)}</TableCell></TableRow>
    </>
  );

  return (
    <Box sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
      <Box role="status" aria-live="polite" sx={visuallyHidden}>{announce}</Box>

      {/* Quote header: who, what, the total and the next action stay in view. */}
      <Columns template={{ xs: '1fr', md: '1fr auto' }} align="end" sx={{ px: { xs: 2, md: 3 }, pt: 3, pb: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" useFlexGap sx={{ flexWrap: 'wrap', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Quote QCA-2059637 · Homeowners HO-3</Typography>
            <Chip size="small" variant="outlined" color={bound ? 'success' : 'info'} label={bound ? 'Ready to bind' : 'Quoted'} />
          </Stack>
          <Typography variant="h3">June Alder</Typography>
          <Typography color="text.secondary">18 Wharf Street, Portland, ME · Nov 3, 2026 to Nov 3, 2027</Typography>
        </Box>
        <Box sx={{ textAlign: { md: 'right' } }}>
          <Typography variant="body2" color="text.secondary">Annual premium</Typography>
          <Stack direction="row" spacing={1.5} alignItems="center" justifyContent={{ md: 'flex-end' }}>
            {phase === 'repricing' && <CircularProgress size={18} aria-label="Repricing" />}
            <Typography variant="amount" sx={{ opacity: phase === 'repricing' ? 0.45 : 1 }}>
              {money(total)}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {delta === 0 ? 'Same as the last version' : `${money(Math.abs(delta))} ${delta < 0 ? 'less' : 'more'} than the last version`}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent={{ md: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setAnnounce('Quote PDF is ready to download in the product; not in this sample.')}>Quote PDF</Button>
            <Button variant="contained" disabled={phase !== 'ready' || !!emailError} onClick={() => { setBound(true); setAnnounce('Quote is ready to bind. Purchase is the next step.'); }}>
              Continue to purchase
            </Button>
          </Stack>
        </Box>
      </Columns>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" allowScrollButtonsMobile aria-label="Quote steps"
        sx={{ px: { xs: 1, md: 2 }, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        {steps.map((s, i) => (
          <Tab key={s} value={s} label={<Box component="span"><Box component="span" aria-hidden="true" sx={{ mr: 0.75 }}>{i < 5 ? '✓' : s === 'Premium' ? '●' : '○'}</Box>{s}</Box>} />
        ))}
      </Tabs>

      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        {tab === 'Premium' && (
          <Columns template={{ xs: '1fr', lg: '3fr 2fr' }} align="start">
            <EdgeCard sx={{ p: { xs: 1.5, md: 3 }, minWidth: 0 }}>
              <Typography variant="h4" component="h3">Premium</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Change a limit or the deductible and the quote reprices.</Typography>
              {phase === 'error' && (
                <Alert severity="error" sx={{ mt: 2 }} action={<Button color="inherit" size="small" onClick={() => { setRating('up'); reprice(c, 'up'); }}>Try again</Button>}>
                  Couldn&rsquo;t reprice. The rating service didn&rsquo;t answer; your changes are kept and the numbers below are from the last price.
                </Alert>
              )}
              <Box tabIndex={0} role="region" aria-label="Premium table" sx={{ overflowX: 'auto', mt: 1 }}>
                <Table size="small" aria-label="Coverages, options and credits" sx={{ minWidth: { xs: 0, sm: 480 }, opacity: phase === 'repricing' ? 0.55 : 1, '& td, & th': { px: { xs: 0.75, sm: 2 } }, '& .MuiSelect-select': { pr: { xs: 3, sm: 4 } } }}>
                  <TableHead><TableRow>
                    <TableCell>Coverage</TableCell><TableCell>Limit</TableCell><TableCell sx={num}>Premium</TableCell>
                  </TableRow></TableHead>
                  <TableBody>
                    {groupRows('Coverages', p.coverages, p.groups.coverages)}
                    {groupRows('Options', p.options, p.groups.options)}
                    {groupRows('Credits and discounts', p.credits, p.groups.credits)}
                    <TableRow>
                      <TableCell colSpan={2} sx={{ borderTop: 2, borderColor: 'text.primary', pt: 2 }}><Typography variant="h5" component="span">Annual premium</Typography></TableCell>
                      <TableCell sx={{ ...num, borderTop: 2, borderColor: 'text.primary', pt: 2, fontWeight: 800 }}>{money(p.total)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Typography variant="caption" sx={{ mt: 2 }}>
                Coverage applies only where a premium or &ldquo;Included&rdquo; is shown, up to the limit listed, under the terms of the policy.
              </Typography>
            </EdgeCard>

            <Stack spacing={3} sx={{ minWidth: 0 }}>
              <SummaryCard title="Since the last version"
                points={[
                  { text: 'Coverage A went from $300,000 to $350,000 after the dwelling value update.', sources: ['dv'] },
                  { text: 'The roof age credit now applies: the roof was replaced in 2016.', sources: ['dv', 'note'] },
                  { text: 'Paperless was turned on, which takes $12 off.', sources: ['ins'] },
                ]}
                sources={[
                  { id: 'dv', label: 'Dwelling value step, Nov 3', excerpt: 'Replacement cost estimate $350,000. Roof: architectural shingle, replaced 2016.' },
                  { id: 'note', label: 'Agent note, Oct 30', excerpt: 'Insured says roof was redone in 2016, receipt on file.' },
                  { id: 'ins', label: 'Insured step, Nov 3', excerpt: 'Go paperless: On.' },
                ]} />
              <Box>
                <Stack direction="row" spacing={1} alignItems="center"><Typography variant="h5" component="h4">Suggestions for this quote</Typography><AiLabel /></Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5 }}>From this quote&rsquo;s own records. Nothing changes until you accept.</Typography>
                <SuggestionList suggestions={suggestions} onDecide={onDecide} />
              </Box>
            </Stack>
          </Columns>
        )}

        {tab === 'Insured' && (
          <EdgeCard sx={{ p: { xs: 2, md: 3 }, maxWidth: 760 }}>
            <Typography variant="h4" component="h3" sx={{ mb: 2 }}>Insured</Typography>
            <Columns preset="halvesEarly" gap={2}>
              <TextField label="First name" defaultValue="June" />
              <TextField label="Last name" defaultValue="Alder" />
              <TextField label="Birth date" defaultValue="10/10/1980" helperText="MM/DD/YYYY" />
              <TextField label="Mobile phone" defaultValue="(555) 014-2290" />
              <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError || 'Quote and policy documents go here.'} sx={{ gridColumn: { sm: '1 / -1' } }} />
            </Columns>
            <FormControlLabel sx={{ mt: 2 }} control={<Switch checked={c.paperless} onChange={(e) => change({ paperless: e.target.checked })} />}
              label="Go paperless: documents by email, $12 off the premium" />
          </EdgeCard>
        )}

        {!redesigned.includes(tab) && (
          <EdgeCard sx={{ p: { xs: 2, md: 3 }, maxWidth: 760 }}>
            <Typography variant="h4" component="h3">{tab}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>This step isn&rsquo;t part of the redesign. Insured and Premium are.</Typography>
            <Button variant="outlined" onClick={() => setTab('Premium')}>Go to Premium</Button>
          </EdgeCard>
        )}
      </Box>

      <Box sx={{ px: { xs: 2, md: 3 }, py: 1.5, borderTop: 1, borderColor: 'divider', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="body2" color="text.secondary">Demo control · rating service</Typography>
        <ToggleButtonGroup size="small" exclusive value={rating} onChange={(_, v) => v && setRating(v)} aria-label="Rating service for this demo">
          <ToggleButton value="up">Answering</ToggleButton>
          <ToggleButton value="down">Down</ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="caption" color="text.secondary">Set it to Down, then change a limit, to see the error and recovery.</Typography>
      </Box>
    </Box>
  );
}
