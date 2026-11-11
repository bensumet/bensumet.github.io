import { Box } from '@mui/material';
import { Lead } from '@bensumet/edge';
import { Note, NumberedList, Opener } from '../../components/Layout';
import { DemoFrame } from '../../components/DemoFrame';

const decisions = [
  ['Areas follow where a setting lives.', 'The rail lists each portal’s own area first, then the tools every portal shares. People find a setting by asking "does this belong to one portal or all of them?", which is also the question that decides what a change will affect.'],
  ['Every page says what a change will touch.', 'On settings that more than one portal uses, a chip beside the title says whether you’re editing this portal’s own copy, one setting for every portal, or entries tagged per portal. It answers the question admins were afraid to ask before saving.'],
  ['Your role decides what you see, not what you’re refused.', 'Areas and settings you can’t use don’t appear at all, instead of showing locked. Switch "Preview as" to a Billing admin in the mockup controls: the rail and the menus shrink to what that person can change.'],
  ['The sidebar fits the screen and the person.', 'When areas don’t fit, the rest move behind More, with at least four always shown. People can reorder and hide areas, by dragging or with the arrow keys on the grip; Home always stays first.'],
  ['A second menu that scales.', 'Each area opens a menu with collapsible sections, item counts and a filter, so an area with dozens of settings stays scannable.'],
  ['Density and theme from the start.', 'A compact mode for people who live in admin screens, and light and dark from the same tokens. Built in from the first prototype rather than added later.'],
];

export function AdminPortalStudy() {
  return (
    <>
      <Opener eyebrow="Designing with AI · Working mockup" bold="From mockup" italic="to product.">
        <Lead opening="Admin settings were scattered">
          across separate policy, billing and claims apps, each with its own menu, its own copy of some settings and shared tools that lived somewhere else again.
          I designed one admin that brings them together, as a working mockup made with an AI assistant. Then I built the admin shell
          to that design on our architecture: the navigation, sidebar, menus and roles. The team built the content of each page to the
          current system&rsquo;s design.
        </Lead>
      </Opener>

      <DemoFrame src="admin-portal.html" title="Harbor & Pine Admin, the working mockup" height={760}
        note="The original mockup, with the product renamed. It designs the shell and navigation; the screens inside keep the current system’s design, so each page body here only describes what it holds. Try Preview as, Compact and Theme in the mockup controls, and Customize Sidebar at the bottom of the rail." />

      <NumberedList id="ap-decisions" title="The decisions" items={decisions} />

      <Box component="section" aria-label="From mockup to product" sx={{ mt: 8 }}>
        <Note label="From mockup to product">
          The mockup is my design: I brought the requirements, the structure and the design calls, the AI
          assistant drafted options in code on the product&rsquo;s own theme, and we went round by round, with me choosing, tweaking and pushing
          back, until it was right.
          Because the mockup works, people could click through it and judge the real thing before anything was built. I then built the admin
          shell to the design on our own architecture, theme and component library, and the team built each page&rsquo;s content to the
          current system&rsquo;s design, wired to the real API.
        </Note>
      </Box>
    </>
  );
}
