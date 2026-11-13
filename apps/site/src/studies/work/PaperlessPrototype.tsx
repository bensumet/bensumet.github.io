import { useId, useState } from 'react';
import {
  Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Link, Stack, Switch, Tab, Tabs,
  TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography,
} from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { visuallyHidden } from '@mui/utils';
import { Columns, DataTable, Tag } from '@bensumet/edge';

// A working re-creation of the paperless opt-in flows from Ben's 2024 Axure prototype.
// The steps, buttons and wording come from the prototype; the insurer, the insured and
// the policy are fictional, and the screen is drawn with this site's components.

const benefits = [
  '24/7 online access to eligible policy documents, such as ID cards, billing statements and renewal notices, which can be downloaded from Documents.',
  'Once your documents are ready, you’ll receive an email notification at your primary email.',
  'Legally required documents will still be mailed to you.',
];
const tip = 'Enrolling in our Paperless Service ensures 24/7 online access to eligible policy documents, such as ID cards, billing statements and renewal notices, which can be downloaded from Documents.';
const docs = [
  ['Mar 1, 2024', 'Declarations page', 'Policy'],
  ['Mar 1, 2024', 'ID card', 'Policy'],
  ['Mar 4, 2024', 'Billing statement', 'Billing'],
  ['Jan 30, 2025', 'Renewal notice', 'Policy'],
];
const policyZip = '04101';

function Benefits() {
  return (
    <>
      <Typography variant="body2">Enrolling in our Paperless Service, you&rsquo;ll enjoy:</Typography>
      <Box component="ul" sx={{ mt: 1, mb: 1.5, pl: 2.5, '& li': { mb: 0.75 } }}>
        {benefits.map((b) => <Typography key={b} component="li" variant="body2">{b}</Typography>)}
      </Box>
    </>
  );
}

function Terms() {
  const [shown, setShown] = useState(false);
  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="body2">By clicking &lsquo;Agree &amp; Enroll&rsquo;, you are agreeing to our Terms and Conditions.</Typography>
      <Link component="button" type="button" variant="body2" onClick={() => setShown((s) => !s)} aria-expanded={shown} sx={{ mt: 0.5 }}>
        View Terms and Conditions
      </Link>
      {shown && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>In the prototype, the full terms open in a new window.</Typography>}
    </Box>
  );
}

function PaperlessSwitch({ on, onChange }: { on: boolean; onChange: (next: boolean) => void }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <FormControlLabel control={<Switch checked={on} onChange={(e) => onChange(e.target.checked)} />} label={on ? 'Go Paperless: On' : 'Go Paperless: Off'} />
      <Tooltip title={tip}>
        <IconButton size="small" aria-label="About Paperless Service"><InfoOutlined fontSize="small" /></IconButton>
      </Tooltip>
    </Stack>
  );
}

/** The insured portal: Summary with the invitation bar and Key Documents, and the Documents tab. */
function Portal({ announce, on, setOn }: { announce: (s: string) => void; on: boolean; setOn: (on: boolean) => void }) {
  const [tab, setTab] = useState<'summary' | 'documents'>('summary');
  const [invite, setInvite] = useState(true);
  const [dialog, setDialog] = useState<null | 'agree' | 'unenroll'>(null);
  const [notice, setNotice] = useState<null | 'enrolled' | 'unenrolled'>(null);
  const tabs = useId();

  const agree = () => {
    setOn(true); setInvite(false); setDialog(null); setNotice('enrolled');
    announce('Enrolled in Paperless Service. Go Paperless is on.');
  };
  const unenroll = () => {
    setOn(false); setDialog(null); setNotice('unenrolled');
    announce('Unenrolled from Paperless Service. Go Paperless is off.');
  };
  const toggle = (next: boolean) => setDialog(next ? 'agree' : 'unenroll');
  const closeInvite = (msg: string) => { setInvite(false); announce(msg); };

  return (
    <>
      <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ px: 2, py: 1.25, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="label">Harbor &amp; Pine <Typography component="span" variant="body2" color="text.secondary">Insured portal</Typography></Typography>
        <Typography variant="body2" color="text.secondary">June Alder</Typography>
      </Stack>

      {invite && !on && (
        <Alert severity="info" icon={false} sx={{ m: 2, mb: 0 }}>
          <Typography variant="body2">Would you like to enroll in Paperless Service and to access all of your eligible policy and billing documents online?</Typography>
          <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
            <Button size="small" variant="text" onClick={() => closeInvite('Invitation closed. Paperless stays off.')}>No, Don&rsquo;t Enroll Me</Button>
            <Button size="small" variant="outlined" onClick={() => closeInvite('Invitation closed until later.')}>Remind Me Later</Button>
            <Button size="small" variant="contained" onClick={() => setDialog('agree')}>Yes, Enroll Me</Button>
          </Stack>
        </Alert>
      )}
      {notice === 'enrolled' && (
        <Alert severity="success" onClose={() => setNotice(null)} sx={{ m: 2, mb: 0 }}>
          Thank you for enrolling in our Paperless Service. You can access all eligible policy and billing documents by visiting Documents.
        </Alert>
      )}
      {notice === 'unenrolled' && (
        <Alert severity="info" onClose={() => setNotice(null)} sx={{ m: 2, mb: 0 }}>
          You&rsquo;re unenrolled from Paperless Service. Your documents will be mailed to you.
        </Alert>
      )}

      <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="Insured portal" sx={{ px: 2, mt: 1 }}>
        <Tab value="summary" label="Summary" id={`${tabs}-summary`} aria-controls={`${tabs}-panel`} />
        <Tab value="documents" label="Documents" id={`${tabs}-documents`} aria-controls={`${tabs}-panel`} />
      </Tabs>
      <Box id={`${tabs}-panel`} role="tabpanel" aria-labelledby={`${tabs}-${tab}`} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        {tab === 'summary' ? (
          <Columns preset="halvesEarly" gap={3}>
            <Box>
              <Typography variant="eyebrow" component="p">Insured summary</Typography>
              <Box component="dl" sx={{ m: 0, mt: 1, '& dd': { m: 0, mb: 1 } }}>
                <Typography variant="body2" component="dt" color="text.secondary">Policy</Typography>
                <Typography variant="body2" component="dd">HP-0205-0171, Homeowners</Typography>
                <Typography variant="body2" component="dt" color="text.secondary">Insured</Typography>
                <Typography variant="body2" component="dd">June Alder, 18 Wharf Street, Portland, ME 04101</Typography>
                <Typography variant="body2" component="dt" color="text.secondary">Term</Typography>
                <Typography variant="body2" component="dd">Mar 1, 2024 to Mar 1, 2025</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="eyebrow" component="p">Key documents</Typography>
              <Stack spacing={0.75} sx={{ mt: 1, mb: 1 }}>
                {docs.slice(0, 3).map(([, name]) => (
                  <Stack key={name} direction="row" spacing={1} alignItems="center"><Tag>PDF</Tag><Typography variant="body2">{name}</Typography></Stack>
                ))}
              </Stack>
              <PaperlessSwitch on={on} onChange={toggle} />
            </Box>
          </Columns>
        ) : (
          <>
            <PaperlessSwitch on={on} onChange={toggle} />
            <Box sx={{ mt: 1 }}><DataTable dense label="Policy and billing documents">
              <caption>Documents for policy HP-0205-0171</caption>
              <thead><tr><th scope="col">Date</th><th scope="col">Document</th><th scope="col">Type</th></tr></thead>
              <tbody>{docs.map(([d, n, t]) => <tr key={n}><td>{d}</td><td>{n}</td><td>{t}</td></tr>)}</tbody>
            </DataTable></Box>
          </>
        )}
      </Box>

      <Dialog open={dialog === 'agree'} onClose={() => setDialog(null)} aria-labelledby={`${tabs}-agree`}>
        <DialogTitle id={`${tabs}-agree`}>Enroll in Paperless Service</DialogTitle>
        <DialogContent><Benefits /><Terms /></DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Cancel</Button>
          <Button variant="contained" onClick={agree}>Agree &amp; Enroll</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialog === 'unenroll'} onClose={() => setDialog(null)} aria-labelledby={`${tabs}-out`}>
        <DialogTitle id={`${tabs}-out`}>Unenroll from Paperless Service</DialogTitle>
        <DialogContent><Typography>Are you sure you want to unenroll from the Paperless Service?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>No, Keep Me Enrolled</Button>
          <Button variant="contained" onClick={unenroll}>Yes, Unenroll Me</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/** The email path: a link in the invitation email, a ZIP code instead of a password, then the same agreement. */
function EmailPath({ announce, onEnrolled, toPortal }: { announce: (s: string) => void; onEnrolled: () => void; toPortal: () => void }) {
  const [step, setStep] = useState<'inbox' | 'verify' | 'done'>('inbox');
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) { setError('Enter the 5-digit ZIP code on your policy.'); return; }
    if (zip !== policyZip) { setError('We couldn’t find a policy with that ZIP code. Check the ZIP code on your policy documents and try again.'); return; }
    setError(''); setStep('done'); onEnrolled(); announce('Enrolled in Paperless Service.');
  };

  if (step === 'inbox') {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">From: Harbor &amp; Pine</Typography>
        <Typography variant="label" component="p" sx={{ mt: 0.5 }}>Go paperless with your policy documents</Typography>
        <Typography variant="body2" sx={{ mt: 1.5, mb: 2 }}>Dear June Alder, you can now get your policy and billing documents online instead of by mail.</Typography>
        <Button variant="outlined" onClick={() => setStep('verify')}>Review and enroll</Button>
      </Box>
    );
  }
  if (step === 'done') {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="success">You&rsquo;re enrolled in Paperless Service. We&rsquo;ll email you each time a new document is ready.</Alert>
        <Typography variant="body2" sx={{ mt: 1.5 }}>
          Your documents are in the insured portal. Sign in to view and download them. No account yet? You can create one from the sign-in page.
        </Typography>
        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, mt: 2 }}>
          <Button variant="outlined" onClick={toPortal}>Go to the insured portal</Button>
          <Button variant="text" onClick={() => { setStep('inbox'); setZip(''); }}>Start over</Button>
        </Stack>
      </Box>
    );
  }
  return (
    <Box component="form" noValidate onSubmit={submit} sx={{ p: 2 }}>
      <Typography variant="label" component="p">Enroll in Paperless Service</Typography>
      <Typography variant="body2" sx={{ mt: 1.5 }}>First, confirm this is your policy. You don&rsquo;t need to sign in.</Typography>
      <TextField label="ZIP code" value={zip} onChange={(e) => setZip(e.target.value)} error={!!error}
        helperText={error || 'Enter the 5-digit ZIP code on your policy. For this demo: 04101.'}
        slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 5, autoComplete: 'postal-code' } }} size="small" sx={{ mt: 1.5, mb: 2, maxWidth: 320 }} fullWidth />
      <Benefits />
      <Terms />
      {/* edge-allow one-primary: the email path is a separate view from the portal above */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Agree &amp; Enroll</Button>
    </Box>
  );
}

export function PaperlessPrototype() {
  const [path, setPath] = useState<'portal' | 'email'>('portal');
  const [key, setKey] = useState(0);
  const [live, setLive] = useState('');
  const [on, setOn] = useState(false);
  const reset = () => { setKey((k) => k + 1); setOn(false); setLive('Demo reset.'); };
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <ToggleButtonGroup exclusive size="small" value={path} onChange={(_, v) => v && setPath(v)} aria-label="Way into paperless">
          <ToggleButton value="portal">In the portal</ToggleButton>
          <ToggleButton value="email">From the email invitation</ToggleButton>
        </ToggleButtonGroup>
        <Button size="small" variant="text" onClick={reset}>Reset the demo</Button>
      </Stack>
      <Box sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        {path === 'portal'
          ? <Portal key={`p${key}`} announce={setLive} on={on} setOn={setOn} />
          : <EmailPath key={`e${key}`} announce={setLive} onEnrolled={() => setOn(true)} toPortal={() => setPath('portal')} />}
      </Box>
      <Box role="status" aria-live="polite" sx={visuallyHidden}>{live}</Box>
      <Typography variant="body2" component="figcaption" color="text.secondary" sx={{ mt: 1.5 }}>
        A working re-creation of my 2024 prototype: the same steps, buttons and wording, with a fictional insurer and policy. The email, the
        opt-out notice, the ZIP code errors and the message after enrolling from the email are written for this demo.
      </Typography>
    </Box>
  );
}
