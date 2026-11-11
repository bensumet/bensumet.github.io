// Redrawn, generic diagrams for the case studies. No product screens, names or
// internal details: boxes, arrows and labels only, drawn from the theme.
import { Box, Typography } from '@mui/material';
import { typography } from '@bensumet/edge';

function Node({ title, note, strong }: { title: string; note?: string; strong?: boolean }) {
  return (
    <Box sx={{ border: 1, borderColor: strong ? 'primary.main' : 'divider', bgcolor: strong ? 'action.selected' : 'background.paper', p: 1.75, minWidth: 0 }}>
      <Typography sx={{ fontWeight: 650, fontSize: '0.95rem' }}>{title}</Typography>
      {note && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>{note}</Typography>}
    </Box>
  );
}

function Down() {
  return <Box aria-hidden="true" sx={{ mx: 'auto', width: '1px', height: 22, bgcolor: 'edge.line', position: 'relative', '&::after': { content: '""', position: 'absolute', left: -4, bottom: -1, borderTop: '6px solid', borderTopColor: 'edge.line', borderLeft: '4.5px solid transparent', borderRight: '4.5px solid transparent' } }} />;
}

function Figure({ label, caption, children }: { label: string; caption: string; children: React.ReactNode }) {
  return (
    <Box component="figure" sx={{ m: 0, p: { xs: 2, md: 3.5 }, bgcolor: 'edge.tint', border: 1, borderColor: 'divider' }}>
      <Typography variant="eyebrow">{label}</Typography>
      <Box sx={{ mt: 2.5 }}>{children}</Box>
      <Typography component="figcaption" color="text.secondary" sx={{ mt: 2.5, fontFamily: typography.display, fontSize: '1.05rem', maxWidth: typography.measure }}>{caption}</Typography>
    </Box>
  );
}

/** Layers of the CoreConnect system, from shared settings down to the three portals. */
export function SystemMap() {
  return (
    <Figure label="System map" caption="One design language for three audiences. Each portal draws from the same components; a client's brand is a theme layer on top, not separate code.">
      <Box sx={{ maxWidth: 720, mx: 'auto' }}>
        <Node title="Design settings" note="Color, type, spacing, layout" />
        <Down />
        <Node title="Theme" note="A client's brand applied once, everywhere" strong />
        <Down />
        <Node title="Components and page frameworks" note="Built once, reused on every screen" />
        <Down />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5 }}>
          <Node title="Agent portal" />
          <Node title="Underwriter portal" />
          <Node title="Policyholder portal" />
        </Box>
      </Box>
    </Figure>
  );
}

/** The path every AI output takes: four rules after the output itself. */
export function PrinciplesFlow() {
  const steps = [
    ['AI output', 'A summary, prediction, recommendation or draft'],
    ['Label it', 'One visual signal, used only for AI'],
    ['Show the source', 'What it’s based on, checkable in place'],
    ['Person decides', 'Accept, edit or dismiss; nothing applied silently'],
    ['Say it’s wrong', 'Quick feedback that goes somewhere'],
  ];
  return (
    <Figure label="One path for every AI output" caption="Every AI output, whether a summary, prediction, recommendation or draft, follows the same four rules, so people learn once how to read and correct AI output anywhere in the product.">
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(5, 1fr)' }, gap: { xs: 1, md: 0 } }}>
        {steps.map(([t, n], i) => (
          <Box component="li" key={t} sx={{ display: 'flex', alignItems: 'stretch', minWidth: 0 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}><Node title={t} note={n} strong={i === 0} /></Box>
            {i < steps.length - 1 && <Typography aria-hidden="true" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', px: 0.75, color: 'primary.main' }}>&rarr;</Typography>}
          </Box>
        ))}
      </Box>
    </Figure>
  );
}

/** The frontend architecture, generalized: no hostnames, package names or ports. */
export function ArchitectureSketch() {
  const modules = ['Policy', 'Billing', 'Claims', 'Tasks', 'Documents', 'Communication', 'Analytics', 'Forms', 'Dashboard'];
  return (
    <Figure label="Architecture" caption="One shell composes nine separately built domain modules at runtime. A shared runtime keeps them one application; a manifest read at startup lets one module ship a new version without rebuilding the rest.">
      <Box sx={{ maxWidth: 820, mx: 'auto' }}>
        <Node title="Application shell" note="Reads a runtime manifest of module versions, then routing, sign-in, theme, language and layout" strong />
        <Down />
        <Box sx={{ border: 1, borderStyle: 'dashed', borderColor: 'divider', p: 1.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Domain modules, each built and versioned on its own, loaded when a route needs it</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }, gap: 1 }}>
            {modules.map((m) => <Node key={m} title={m} />)}
          </Box>
        </Box>
        <Down />
        <Node title="Shared runtime, one copy each" note="React, routing, state, MUI and DataGrid, plus the shared store and shell contracts, so context and theme cross module boundaries" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.5, mt: 1.5 }}>
          <Node title="State split by ownership" note="Shared: theme, locale, auth, feature flags, notifications, density. Each module owns its own data APIs." />
          <Node title="One API foundation" note="Session cookie, sign-in on expiry, retries on server and network errors, never on a write" />
        </Box>
        <Down />
        <Node title="Build once, promote the same image" note="Dev, QA and UAT run the identical build; a client layer adds configuration, branding and translations on top" />
      </Box>
    </Figure>
  );
}
