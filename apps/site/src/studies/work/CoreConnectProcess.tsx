import { Fragment } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Columns, Measure, RuleItem, RuleList, Section, Tag } from '@bensumet/edge';
import { Figure, Node } from './diagrams';
import { PaperlessPrototype } from './PaperlessPrototype';

// How Ben designed a feature, from his 2024 research boards and Axure prototypes.
// Redrawn from the boards: no client name, no product screens, no board figures.
// The success measures on the boards were illustrative targets, so no numbers appear here.

/** An arrow between two steps: across on wide screens, down on narrow ones. */
function Arrow() {
  return (
    <Typography component="span" aria-hidden="true" color="primary.main" sx={{ display: 'block', width: 'fit-content', alignSelf: 'center', justifySelf: 'center', px: { md: 0.5 }, transform: { xs: 'rotate(90deg)', md: 'none' } }}>
      &rarr;
    </Typography>
  );
}

/** Steps in order, read left to right (top to bottom on a phone). */
function Flow({ label, steps, mark }: { label: string; steps: string[][]; mark?: string }) {
  return (
    <Box>
      <Typography variant="label" component="p" sx={{ mb: 1 }}>{label}</Typography>
      <Stack component="ol" direction={{ xs: 'column', md: 'row' }} alignItems="stretch" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {steps.map(([t, n], i) => (
          <Fragment key={t}>
            {i > 0 && <Arrow />}
            <Box component="li" sx={{ flex: 1, minWidth: 0, display: 'grid' }}><Node title={t} note={n} strong={t === mark} /></Box>
          </Fragment>
        ))}
      </Stack>
    </Box>
  );
}

function Today() {
  return (
    <Figure label="Today, by persona" caption="Before designing anything new, I mapped how each persona works today. Paperless had to fit where insured customers already find their documents and where agents already enter a customer's details.">
      <Stack spacing={3}>
        <Flow label="Insured customer: find and download a document" steps={[
          ['Sign in', 'Insured portal'], ['Summary', 'Key documents'], ['Documents tab', 'Every document'], ['Download', 'From the table'],
        ]} />
        <Flow label="Agent: add a new customer" steps={[
          ['Sign in', 'Agent portal'], ['Customers tab', ''], ['New customer form', 'Required fields'], ['Save', 'Or Save New'],
        ]} />
      </Stack>
    </Figure>
  );
}

const day1 = [
  'Insured customers as the primary persona',
  'Paperless on or off, with a default the carrier sets',
  'One opt-in or opt-out for the whole account',
  'Terms and conditions, agreed before enrolling',
  'Email verification and notifications',
  'Tracking adoption, delivery failures and downloads',
];
const day2 = [
  'Agent, broker and underwriter workflows',
  'Email delivery and paperless adoption reports',
  'Text message delivery',
  'Opting in by document category',
  'Settings per product',
  'Consolidated bills',
];

function Scope() {
  return (
    <Columns preset="halvesEarly" gap={3}>
      {([['Day 1', day1], ['Day 2', day2]] as const).map(([t, items]) => (
        <Box key={t} sx={{ borderTop: 1, borderColor: 'text.primary', pt: 1.5 }}>
          <Tag>{t}</Tag>
          <Box component="ul" sx={{ m: 0, mt: 1.5, pl: 2.5, '& li': { mb: 0.75 } }}>
            {items.map((i) => <Typography key={i} component="li" variant="body2">{i}</Typography>)}
          </Box>
        </Box>
      ))}
    </Columns>
  );
}

const ways = [
  ['Invitation bar', 'On the Summary page after sign-in: Yes, Remind Me Later, or No'],
  ['Key documents', 'The Go Paperless switch on the Summary page'],
  ['Documents tab', 'The same switch, where every document is listed'],
  ['Email invitation', 'A ZIP code confirms the policy, so no sign-in or account is needed'],
];

function WaysIn() {
  return (
    <Figure label="Four ways in, one agreement" caption="Every way in leads to the same review-and-agree step, so the terms and the wording are written once. Opting out asks for confirmation; Remind Me Later and No close the invitation and change nothing.">
      <Columns template={{ xs: '1fr', md: '1.3fr auto 1fr auto 1fr' }} gap={1.5} align="center">
        <Stack spacing={1}>{ways.map(([t, n]) => <Node key={t} title={t} note={n} />)}</Stack>
        <Arrow />
        <Node title="Review and agree" note="What paperless gives you, what still comes by mail, and the terms" strong />
        <Arrow />
        <Stack spacing={1}>
          <Node title="Enrolled" note="A success message, the switch shows On, and a confirmation email" />
          <Node title="Opt out" note="Switch off, then confirm: Yes, Unenroll Me or No, Keep Me Enrolled" />
        </Stack>
      </Columns>
    </Figure>
  );
}

const quoteStart = [['General info', ''], ['Shared questions', 'Only what rating needs'], ['Compare carriers', 'Tiles or a grid'], ['Pick one', 'Every screen reloads for it']];
const options: [string, string[][]][] = [
  ['Option 1: after the premium', [['Quote options', ''], ['Premium', ''], ['Carrier questions', ''], ['Underwriting', ''], ['Billing and payment', '']]],
  ['Option 2: before the premium', [['Quote options', ''], ['Carrier questions', ''], ['Premium', ''], ['Underwriting', ''], ['Billing and payment', '']]],
  ['Option 3: right after picking', [['Carrier questions', ''], ['Quote options', 'More questions if a carrier needs them'], ['Premium', ''], ['Underwriting', ''], ['Billing and payment', '']]],
];

function QuoteOptions() {
  return (
    <Figure label="Three orders, compared before choosing" caption="Every option starts the same way. The question was where each carrier's own questions belong once the agent has picked a carrier: after the premium, before it, or straight away.">
      <Stack spacing={3}>
        <Flow label="Every option starts the same" steps={quoteStart} />
        {options.map(([label, steps]) => <Flow key={label} label={label} steps={steps} mark="Carrier questions" />)}
      </Stack>
    </Figure>
  );
}

const steps: { head: string; body: React.ReactNode; visual?: React.ReactNode }[] = [
  {
    head: 'Ask four questions first.',
    body: <>Every feature on my research boards starts with the same four questions: what&rsquo;s the problem, what data supports it, how we&rsquo;ll know it worked, and how we&rsquo;ll measure that. For paperless, the problem was simple: policyholders got every document by mail, and the insured portal had no paperless option. I set the success measures before any design: cost saved, adoption rate, how long documents take to arrive, and how many emails are delivered.</>,
  },
  {
    head: 'See how others do it.',
    body: <>I went through the paperless sign-up at some of the largest property and casualty insurers, including State Farm, Farmers and Berkshire Hathaway GUARD, and looked outside insurance too: how a payroll service handles paperless settings, and how a healthcare company invites people by email.</>,
  },
  {
    head: 'Map today, for every persona.',
    body: <>I listed who the feature is for and what each of them needs: policyholders, then agents, brokers and underwriters. Then I mapped how each one works now, so the new flows would build on what they already know.</>,
    visual: <Today />,
  },
  {
    head: 'Cut the scope on purpose.',
    body: <>Policyholders were the primary persona, so the first release was theirs. Everything for agents, brokers and underwriters moved to a second release. I kept the cut flows on the board, greyed out, so the decision stayed visible to everyone.</>,
    visual: <Scope />,
  },
  {
    head: 'Design every way in.',
    body: <>Then I mapped the new flows, one per way a policyholder can opt in or out, before drawing any screen.</>,
    visual: <WaysIn />,
  },
  {
    head: 'Prototype it, screen by screen.',
    body: <>I built the flows as a clickable prototype in Axure with real interface copy, so the flows could be tried and changed before anything was built. Try the re-creation below: enroll from the invitation bar, switch it off again from Documents, or start from the email.</>,
  },
];

export function CoreConnectProcess() {
  return (
    <Section id="cc-process" title="How I designed a feature: paperless documents" intro={<>
      The screens above show the finished product. This is the work behind one feature, redrawn from my research board and 2024 prototype:
      the same steps I used for each feature I researched.
    </>}>
      <RuleList as="ol">
        {steps.map((s, i) => (
          <RuleItem key={s.head} preset="numbered">
            <Typography variant="data">{String(i + 1).padStart(2, '0')}</Typography>
            <Typography variant="label">{s.head}</Typography>
            <Box sx={{ gridColumn: { xs: 2, md: 3 }, minWidth: 0 }}>
              <Measure><Typography variant="prose" color="text.secondary">{s.body}</Typography></Measure>
              {s.visual && <Box sx={{ mt: 2.5 }}>{s.visual}</Box>}
            </Box>
          </RuleItem>
        ))}
      </RuleList>

      <Box sx={{ mt: 4 }}><PaperlessPrototype /></Box>

      <Box component="section" aria-labelledby="cc-process-quote" sx={{ mt: 8 }}>
        <Typography id="cc-process-quote" variant="h4" component="h3" sx={{ mb: 1 }}>The same method on a harder feature</Typography>
        <Measure as={Typography} color="text.secondary" sx={{ mb: 3 }}>
          Agents and underwriters could quote a product from only one carrier at a time. Multi-carrier quoting lets them rate several carriers
          at once and pick one. I followed the same steps: the four questions, a review of the comparative raters agents already use, today&rsquo;s
          flows for agents, underwriters and admins, and a map of how agents, commissions, carriers and rates relate. The hard part was the
          order of the screens, so I drew three versions before choosing.
        </Measure>
        <QuoteOptions />
      </Box>
    </Section>
  );
}
