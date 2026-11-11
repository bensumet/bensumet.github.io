import { Box, Link, Typography } from '@mui/material';
import { Lead, typography } from '@bensumet/edge';
import { Opener } from '../../components/Layout';
import { href } from '../../router';

const P = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontFamily: typography.display, fontSize: '1.2rem', lineHeight: 1.65, maxWidth: typography.measure, mb: 2.5 }}>{children}</Typography>
);
const H = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h3" component="h2" sx={{ mt: 6, mb: 2 }}>{children}</Typography>
);

export function ProcessEssay() {
  return (
    <>
      <Opener eyebrow="Designing with AI · Essay" bold="How I work" italic="with AI.">
        <Lead opening="I started using AI coding assistants">
          in early 2023, a few months after ChatGPT came out, and I now use them every day: Claude Code, GitHub Copilot and Devin.
          This is how that actually works for me, including the parts that don&rsquo;t.
        </Lead>
      </Opener>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '12rem 1fr' }, gap: { md: 4 } }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ position: 'sticky', top: 120 }}>
            <Typography variant="eyebrow">In this essay</Typography>
            <Box component="ol" sx={{ pl: 2.5, mt: 1, color: 'text.secondary', '& li': { mb: 0.75 } }}>
              <li>Design in code</li><li>Options are cheap</li><li>Every change is reviewed</li><li>Where it fails</li><li>Leading a team with it</li>
            </Box>
          </Box>
        </Box>
        <Box>
          <H>I design in code, not in pictures</H>
          <P>
            I trained as a designer, and my mockups are now working code. I bring the problem, the requirements and my own ideas to an AI
            assistant, it drafts options, and I choose, tweak and push back round after round until the design is right. People can click
            through the result, change roles, switch to dark mode and try the empty states, so feedback is about what the thing does, not what a
            picture implies.
          </P>
          <P>
            The finished mockup is the design we build from. The <Link href={href('ai', 'admin-portal')}>admin mockup</Link> is one: we
            designed it together, round by round. I then built the admin shell to that design on our own architecture, and the team built
            each page&rsquo;s content to the current system&rsquo;s design.
          </P>

          <H>Options are cheap, so judgment is the work</H>
          <P>
            An AI assistant can give me six treatments of a header or three palettes in minutes. That changes my job: I spend less time drawing
            options and more time deciding between them, with evidence where I can get it. For the <Link href={href('ai', 'palette')}>status palette</Link>,
            that meant measuring contrast and color distance instead of trusting how balanced it looked. For the <Link href={href('ai', 'ai-estimate')}>AI estimate</Link>,
            it meant rejecting attractive visuals that claimed more than the model knows.
          </P>

          <H>Every change is reviewed by a person</H>
          <P>
            Speed is only worth it if quality holds. Every AI-written change I ship, I test by hand and with test scripts, then review against our
            code conventions before it goes in. On larger work I run several agents in parallel on separate pieces, and the review step doesn&rsquo;t
            get shorter because the writing did.
          </P>
          <P>
            I also make the standards readable by the assistant. This site&rsquo;s design system publishes <Link href={href('system', 'agents')}>its
            rules as data</Link>, so an AI assistant building with it reads the same rules a person would, and the tests fail when a color pair doesn&rsquo;t meet contrast standards.
          </P>

          <H>Where it fails</H>
          <P>
            Assistants are confident about things they haven&rsquo;t checked. They drift toward generic layouts and default colors, they
            even out a palette by eye, and they will happily draw a chart that implies data you don&rsquo;t have. They also lose track of decisions
            made earlier in a long piece of work. The fixes are unglamorous: written rules, small reviewable changes, tests that encode what
            &ldquo;right&rdquo; means, and a person who knows the product looking at every result.
          </P>

          <H>Leading a team with it</H>
          <P>
            On my team, AI-assisted development is part of daily work, with clear rules about how it&rsquo;s used and the same review bar for every
            change, whoever or whatever wrote it. The aim isn&rsquo;t to write more code. It&rsquo;s to spend more of our time on the decisions that
            make a product good, and less on typing them out.
          </P>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            This site and its design system were built the same way: with AI coding assistants, every change tested and reviewed by me. The{' '}
            <Link href={href('ai', 'build-log')}>build log</Link> shows who did what.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
