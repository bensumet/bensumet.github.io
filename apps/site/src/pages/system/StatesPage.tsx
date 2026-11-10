import { useMemo } from 'react';
import {
  Box, Button, Checkbox, Chip, CircularProgress, FormControlLabel, Skeleton, Stack, Switch, TextField, Typography,
} from '@mui/material';
import { alpha, ThemeProvider, useTheme } from '@mui/material/styles';
import { createEdgeTheme, Lead, typography, useEdgeSettings, type Mode } from '@bensumet/edge';
import { Eyebrow, Opener } from '../../components/Layout';

// Every core component in every state, in both modes side by side. Hover and
// pressed can't be held still in a browser, so they're drawn with the theme's
// own hover and pressed values; everything else is the real state.

function State({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '6.5rem 1fr', alignItems: 'center', gap: 1.5, py: 1.25, borderBottom: 1, borderColor: 'divider', minWidth: 0 }}>
      <Typography variant="body2" color="text.secondary">{name}</Typography>
      <Box sx={{ minWidth: 0 }}>{children}</Box>
    </Box>
  );
}

function Buttons() {
  const t = useTheme();
  const hover = { contained: { bgcolor: 'primary.dark' }, outlined: { bgcolor: alpha(t.palette.primary.main, t.palette.action.hoverOpacity) } };
  const pressed = { contained: { bgcolor: 'primary.dark', boxShadow: `inset 0 0 0 100vmax ${alpha(t.palette.common.black, 0.12)}` }, outlined: { bgcolor: alpha(t.palette.primary.main, t.palette.action.selectedOpacity + 0.08) } };
  const row = (v: 'contained' | 'outlined', label: string) => (
    <>
      <State name="Default"><Button variant={v} tabIndex={-1}>{label}</Button></State>
      <State name="Hover"><Button variant={v} tabIndex={-1} sx={hover[v]}>{label}</Button></State>
      <State name="Focus"><Button variant={v} tabIndex={-1} className="Mui-focusVisible">{label}</Button></State>
      <State name="Pressed"><Button variant={v} tabIndex={-1} sx={pressed[v]}>{label}</Button></State>
      <State name="Disabled"><Button variant={v} disabled>{label}</Button></State>
      <State name="Loading"><Button variant={v} tabIndex={-1} disabled startIcon={<CircularProgress size={16} color="inherit" aria-hidden="true" />}>Saving…</Button></State>
    </>
  );
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, columnGap: 3 }}>
      <Box>{row('contained', 'Save changes')}</Box>
      <Box>{row('outlined', 'Cancel')}</Box>
    </Box>
  );
}

function Fields() {
  return (
    <>
      <State name="Default"><TextField label="Policy number" size="small" fullWidth inputProps={{ tabIndex: -1 }} /></State>
      <State name="Hover"><TextField label="Policy number" size="small" fullWidth inputProps={{ tabIndex: -1 }} sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary' } }} /></State>
      <State name="Focus"><TextField label="Policy number" size="small" fullWidth focused inputProps={{ tabIndex: -1 }} /></State>
      <State name="Filled"><TextField label="Policy number" size="small" fullWidth defaultValue="HP-2048-117" inputProps={{ tabIndex: -1 }} /></State>
      <State name="Error"><TextField label="Policy number" size="small" fullWidth defaultValue="HP-20" error helperText="Enter the full policy number, like HP-2048-117." inputProps={{ tabIndex: -1 }} /></State>
      <State name="Disabled"><TextField label="Policy number" size="small" fullWidth disabled defaultValue="HP-2048-117" /></State>
      <State name="Read only"><TextField label="Policy number" size="small" fullWidth defaultValue="HP-2048-117" helperText="Set when the policy was issued." InputProps={{ readOnly: true }} inputProps={{ tabIndex: -1 }} /></State>
    </>
  );
}

function Choices() {
  return (
    <>
      <State name="Off"><FormControlLabel control={<Checkbox inputProps={{ tabIndex: -1 }} />} label="Email documents" /></State>
      <State name="On"><FormControlLabel control={<Checkbox defaultChecked inputProps={{ tabIndex: -1 }} />} label="Email documents" /></State>
      <State name="Mixed"><FormControlLabel control={<Checkbox indeterminate inputProps={{ tabIndex: -1 }} />} label="Select all rows" /></State>
      <State name="Disabled"><FormControlLabel control={<Checkbox disabled defaultChecked />} label="Email documents" disabled /></State>
      <State name="Switch"><FormControlLabel control={<Switch defaultChecked inputProps={{ tabIndex: -1 }} />} label="Go paperless" /></State>
    </>
  );
}

function Statuses() {
  const items = [
    { color: 'success', word: 'Healthy', mark: '✓' },
    { color: 'warning', word: 'Degraded', mark: '!' },
    { color: 'error', word: 'Down', mark: '×' },
    { color: 'info', word: 'Deploying', mark: '↻' },
  ] as const;
  return (
    <>
      {items.map((i) => (
        <State key={i.word} name={i.word}>
          <Chip size="small" variant="outlined" color={i.color} label={<><Box component="span" aria-hidden="true" sx={{ mr: 0.75, fontWeight: 800 }}>{i.mark}</Box>{i.word}</>} />
        </State>
      ))}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>Every status has a word and a mark, so it never depends on color alone.</Typography>
    </>
  );
}

function DataStates() {
  const frame = (children: React.ReactNode) => <Box sx={{ border: 1, borderColor: 'divider', p: 1.5, bgcolor: 'background.paper' }}>{children}</Box>;
  return (
    <>
      <State name="Loading">{frame(<Stack spacing={1} role="status" aria-label="Loading services"><Skeleton height={18} /><Skeleton height={18} width="80%" /><Skeleton height={18} width="60%" /></Stack>)}</State>
      <State name="Empty">{frame(<><Typography sx={{ fontWeight: 600 }}>No services yet</Typography><Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Deploy one to see its status here.</Typography><Button size="small" variant="outlined" tabIndex={-1}>Deploy a service</Button></>)}</State>
      <State name="Error">{frame(<><Typography sx={{ fontWeight: 600, color: 'error.main' }}>Couldn&rsquo;t load your services.</Typography><Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Your data is safe. Check your connection and try again.</Typography><Button size="small" variant="outlined" tabIndex={-1}>Try again</Button></>)}</State>
      <State name="Partial">{frame(<><Typography variant="body2">8 services shown.</Typography><Typography variant="body2" color="text.secondary">Two regions didn&rsquo;t answer; their services are missing. <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>Retry those regions</Box></Typography></>)}</State>
    </>
  );
}

const galleries = [
  { id: 'buttons', name: 'Buttons', note: 'Filled for the one primary action, outlined for the rest.', C: Buttons },
  { id: 'fields', name: 'Text fields', note: 'Visible labels always; errors in words under the field.', C: Fields },
  { id: 'choices', name: 'Checkboxes and switches', note: 'Checked, unchecked, mixed and disabled.', C: Choices },
  { id: 'status', name: 'Status', note: 'A word and a mark with every color.', C: Statuses },
  { id: 'data', name: 'Data regions', note: 'What a list or table shows besides its rows.', C: DataStates },
];

function Column({ mode, edge, children }: { mode: Mode; edge: Parameters<typeof createEdgeTheme>[1]; children: React.ReactNode }) {
  const theme = useMemo(() => createEdgeTheme(mode, edge), [mode, edge]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: { xs: 1.5, md: 2.5 }, border: 1, borderColor: 'divider', minWidth: 0 }}>
        <Eyebrow>{mode === 'ink' ? 'Ink · dark' : 'Paper · light'}</Eyebrow>
        <Box sx={{ mt: 1 }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}

export default function StatesPage() {
  const { edge } = useEdgeSettings();
  return (
    <>
      <Opener eyebrow="States" bold="Every state," italic="in both modes.">
        <Lead opening="The happy path is the easy part.">
          These are Edge&rsquo;s core components in each state they can be in, light and dark side by side. Hover and pressed are drawn with the
          theme&rsquo;s own values, since a browser can&rsquo;t hold a real hover still; every other state is the real one. The accent follows the
          picker above.
        </Lead>
      </Opener>
      {galleries.map(({ id, name, note, C }) => (
        <Box component="section" key={id} aria-labelledby={`st-${id}`} sx={{ mb: 7 }}>
          <Typography id={`st-${id}`} variant="h3" component="h2">{name}</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2.5, maxWidth: typography.measure }}>{note}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 2 }}>
            <Column mode="paper" edge={edge}><C /></Column>
            <Column mode="ink" edge={edge}><C /></Column>
          </Box>
        </Box>
      ))}
    </>
  );
}
