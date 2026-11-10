import { Box, Link, Typography } from '@mui/material';
import { motion, typography } from '@bensumet/edge';
import { href } from '../../router';
import { art } from '../../data/craft';
import type { CaseStudyContent } from './CaseStudy';
import { ArchitectureSketch, PrinciplesFlow, SystemMap } from './diagrams';
import { CoreConnectScreens } from './CoreConnectScreens';

// Facts come only from Ben's resume. Items still waiting on Ben are left out.

export const coreconnect: CaseStudyContent = {
  eyebrow: 'Work · CoreConnect · 2012–2026',
  bold: 'One framework,',
  italic: 'every client.',
  leadOpening: 'CoreConnect grew',
  lead: 'one client project at a time. I designed its UI and UX across every portal, designed its design system, and built the UI framework that let every client share it, with each brand applied as a theme instead of separate code.',
  header: [
    { label: 'Role', value: 'UX lead and UI architect at Decision Research Corporation; Principal Engineer at Majesco after the acquisition' },
    { label: 'Team', value: 'Led three frontend developers; frontend consultant to about 60 client-side engineers' },
    { label: 'Product', value: 'CoreConnect, a policy, quoting and portal platform for property and casualty insurers, used by about 25 carriers' },
  ],
  problem: 'Each new screen was built close to the last one but not from it, so the same patterns were rebuilt again and again: forms, grids, notes, document lists, portal themes. That cost us twice. Developers spent time rebuilding what already existed, and every client saw slightly different versions of the same thing.',
  design: [
    { head: 'One design language for three audiences.', body: 'Agents, underwriters and policyholders use different portals, but they shouldn’t feel like different products. I designed one system of layout, type, color and components that every portal draws from, with each client’s brand applied through theming.' },
    { head: 'A shared way to design, not just shared parts.', body: 'I introduced collaborative design tools and a shared design system with components the designers and developers both worked from, so a new screen started from pieces we already had instead of from scratch, and designing and building UI moved much faster.' },
    { head: 'Every screen, and the features on them.', body: 'I designed the UI and UX across the portals, and led research, design and development for client-facing features including Premium Override, Paperless opt-in, Universal Notes, Multi-Carrier Quoting, Save Progress, Upload Match and Loss History.' },
    { head: 'Accessible by default.', body: 'The system was built to meet WCAG, so every screen built from it started accessible.' },
  ],
  code: [
    { head: 'Reusable frameworks instead of copy-and-adapt.', body: 'Shared components and page frameworks replaced per-screen code, and each client\u2019s brand became theme settings instead of separate code. We stopped duplicating code and recreating assets for every client, which removed a large amount of code, and rebranding or theming the product for a new or existing client went from about two weeks to a few days.' },
    { head: 'Adopted across the whole suite.', body: 'I led the strategy and delivery of a scalable UI framework adopted across the CoreConnect product suite and used by every client.' },
    { head: 'Support for the engineers using it.', body: 'I was lead frontend consultant to up to 60 client-side engineers: developers across the company came to me and my team with frontend questions.' },
    { head: 'A team that delivered.', body: 'I led three frontend developers using Scrum, delivering every project on time.' },
  ],
  codeVisual: <SystemMap />,
  extra: <CoreConnectScreens />,
  decisions: [
    { head: 'Theme the brand; don’t fork the product.', body: 'Every client wanted its own look. Applying brand through theme settings instead of separate code is what let one framework serve every client.' },
    { head: 'Design and build owned by the same person.', body: 'Because I designed and built most of these features myself, problems found during the build were fixed in the design right away, and the design and the code never drifted apart.' },
  ],
  results: [
    { figure: '100%', label: 'of clients adopted the framework' },
    { figure: 'Weeks \u2192 days', label: 'to rebrand and theme the product for a new or existing client' },
    { figure: '~90%', label: 'of the features built for CoreConnect were my designs' },
    { figure: '~25', label: 'carriers using CoreConnect' },
  ],
  resultNote: 'DRC grew from 40 to 100 employees while I was there, and I was a member of the team behind that growth.',
};

export const immersive: CaseStudyContent = {
  eyebrow: 'Work · P&C Immersive AI · 2026–present',
  bold: 'AI that shows',
  italic: 'its work.',
  leadOpening: 'Underwriters and agents',
  lead: 'make money decisions. An AI that hands them a confident number without showing how it got there is worse than no AI at all. I build the AI features people use in Immersive AI so they can check them, not just trust them.',
  header: [
    { label: 'Role', value: 'Director, Product Engineering at Majesco; I lead the frontend for Immersive AI' },
    { label: 'Team', value: 'Two full-time UI developers and a third at half time, working with product, UX, backend and AI teams, and with the Billing and Claims teams' },
    { label: 'Product', value: 'Immersive AI, a next-generation property and casualty platform spanning policy, billing and claims' },
  ],
  problem: 'People either over-trust an AI or ignore it. The job was to make AI output useful at the moment of decision while keeping it clearly separate from facts the system knows for certain.',
  team: 'I lead the frontend team on Immersive AI: two full-time developers and a third at half time. I assign the work and let each person estimate their own tasks, since they know best how long the work will take them. I step in when someone isn\u2019t sure, and suggest a shorter estimate when one looks too long. I answer implementation questions so nobody stays blocked. I make sure the team has what it needs: AI coding assistants with enough tokens to use them properly, and laptops powerful enough for the work, which I kept following up on until the two who needed them had them. Every change, whoever or whatever wrote it, is tested and reviewed before it goes in.',
  design: [
    { head: 'What I designed.', body: 'I redesigned two parts of the product end to end: the quote workspace and the admin portal. Elsewhere I designed features and parts of pages, like the search filters that adapt to results, how an AI estimate sits next to real prices, and the status palette. The UX team designed the other pages, and my team and I built them. What I designed, I built myself.' },
    { head: 'The AI features people use.', body: 'I build the frontend for the product\u2019s AI features: creating a quote from an uploaded document, an underwriting summary with recommendations, AI-evaluated underwriting results, a premium estimate shown as a range, ranked form recommendations, AI tasks, AI notes, an email-writing assistant, semantic global search, and a page for monitoring AI agents.' },
    { head: 'Label it.', body: 'The rules I build AI features to: AI output always looks like AI output, with one consistent visual signal used for nothing else, so a prediction can never pass for a rated price.' },
    { head: 'Show the source, and keep people in control.', body: 'Summaries and recommendations say what they’re based on. AI suggests and people decide: suggestions are accepted, edited or dismissed, and nothing is applied silently.' },
    { head: 'Make “wrong” easy to say.', body: 'Every AI output has a quick way to flag it as flawed, and that feedback goes somewhere.' },
  ],
  code: [
    { head: 'Micro-frontends, composed at runtime.', body: 'One shell hosts nine domain modules, policy through dashboard, each built and versioned on its own. The shell reads a manifest of module versions before it loads anything, so a team can ship a new version of its module without rebuilding or redeploying the rest.' },
    { head: 'One application, not nine.', body: 'Modules share a single copy of React, routing, state, MUI and the DataGrid, plus the shared store and shell contracts. That is what lets theme, language and sign-in flow across module boundaries instead of each module drifting into its own app.' },
    { head: 'State split by ownership.', body: 'Cross-cutting state like theme, locale, auth, feature flags and density is shared; each module owns its own data APIs. Every API builds on one foundation that handles the session, sends people to sign in when it expires, and retries reads on server or network errors but never retries a write.' },
    { head: 'Clients configure; they don\u2019t fork.', body: 'The product lives in one base monorepo: shell, modules and shared packages, changed together in one pull request with one set of tools and one pipeline. Each client gets its own repository that holds only configuration: navigation, feature flags, branding, translations and theme overrides, validated against a schema at startup and layered over the same build. That protects the base code, keeps each client\u2019s setup private, and means every client runs the same tested code.' },
    { head: 'A design system where there was none.', body: 'The project had no design system yet, so I set one up in the codebase. Styling lives in MUI theme overrides, not wrapper components, so teams use MUI directly and it still looks right. On top sits a thin layer of form fields wired to react-hook-form, translations and error display, and behavioral pieces like a submit button that knows its loading state. Light and dark come from shared tokens, with contrast checked rather than eyeballed; AI styling is a token, not a hard-coded gradient.' },
    { head: 'Gates before anything ships.', body: 'Lint, type checks, unit and integration tests, end-to-end tests and accessibility checks run on every change. The same build is then promoted from dev to QA to UAT, so what was tested is what goes out.' },
    { head: 'Built with AI coding assistants, with guardrails.', body: 'The platform is built with Claude Code, GitHub Copilot and Devin. I test every change by hand and review it against our code conventions, and I set the team\u2019s standards for how assistants are used.' },
    { head: 'Legacy screens rebuilt.', body: 'I lead the rebuild of the quoting screens from legacy JSP to React and MUI, including the Premium Summary page, MUI X DataGrid Premium grids and metadata-driven forms with react-hook-form validation.' },
  ],
  designVisual: <PrinciplesFlow />,
  codeVisual: <ArchitectureSketch />,
  showcase: (
    <Box component="section" aria-labelledby="mockups" sx={{ mt: 6 }}>
      <Typography id="mockups" component="h2" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>Four of my mockups for this platform</Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2, maxWidth: typography.measure }}>
        Designed with an AI assistant and shown as they were made, with the product renamed. Each one runs; open it to use it.
      </Typography>
      <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 1.5, md: 2 } }}>
        {[
          ['deep-search', 'AI search whose filters adapt to what came back'],
          ['ai-estimate', 'An AI premium estimate that can’t pass for a rated price'],
          ['admin-portal', 'One admin portal for policy, billing and claims settings'],
          ['palette', 'Status colors measured on the product’s screens'],
        ].map(([slug, text]) => (
          <li key={slug}>
            <Link href={href('ai', slug)} underline="none" color="inherit" sx={{ display: 'block', '&:hover .t, &:focus-visible .t': { color: 'primary.main' }, '& img': { transition: `transform ${motion.duration.base}ms ${motion.ease.enter}` }, '&:hover img, &:focus-visible img': { transform: 'translateY(-3px)' }, [motion.reduced]: { '& img': { transition: 'none' }, '&:hover img, &:focus-visible img': { transform: 'none' } } }}>
              <Box sx={{ border: 1, borderColor: 'divider', overflow: 'hidden', bgcolor: 'common.white' }}>
                <Box component="img" src={art(`work/immersive/${slug}.jpg`)} alt="" width={800} height={600} loading="lazy" sx={{ display: 'block', width: '100%', height: 'auto' }} />
              </Box>
              <Typography className="t" variant="body2" sx={{ mt: 1, fontWeight: 600, transition: `color ${motion.duration.quick}ms` }}>{text}</Typography>
            </Link>
          </li>
        ))}
      </Box>
    </Box>
  ),
  decisions: [
    { head: 'Show a range, not false precision.', body: 'Draw only what the model returns. Where a visual would imply a “most likely” value the model doesn’t produce, leave it out.' },
    { head: 'Reserve one visual signal for AI.', body: 'Keeping AI styling distinct from system facts is a design-system rule, not a choice made screen by screen.' },
    { head: 'The shell stays thin.', body: 'If a feature belongs to no single domain, like global search, activity or notifications, the shell owns it. If it\u2019s reused across domains, like tasks, documents or notes, it\u2019s a shared module that can open as a full page or sit inside another page as a panel. Everything else belongs to its domain.' },
    { head: 'Pay for independence with a shared runtime.', body: 'Separate modules let teams ship on their own schedule, but only if the pieces that must be one, like the store, the theme and the shell contracts, are shared deliberately. Everything else stays private to its module.' },
    { head: 'Version at runtime, not at build time.', body: 'When the platform starts, it reads a manifest that says which version of each module to load. That adds one request before the first screen appears, but it means a team can release a new version of its module without rebuilding or redeploying the rest of the platform.' },
    { head: 'Review every AI-written change.', body: 'Speed from coding assistants is only worth it if quality holds, so testing and review stay human.' },
  ],
  results: [
    { figure: '1–2 days', label: 'to design a feature as a working mockup with an AI assistant' },
    { figure: 'Every', label: 'AI mockup I designed became a real screen or feature' },
    { figure: '< 2 hours', label: 'for a new engineer to set up the project, with AI help' },
    { figure: '1 → 4', label: 'engineers on my team; one promoted, every project on time' },
  ],
  resultNote: 'I retest every ticket and task an AI assistant produces before it moves on, and I evaluated and corrected the platform’s theme the same way, with AI measuring every color pair.',
};
