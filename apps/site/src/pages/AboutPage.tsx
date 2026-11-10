import { Box, Link, Typography } from '@mui/material';
import { Lead, typography } from '@bensumet/edge';
import { Eyebrow, Opener } from '../components/Layout';

const facts: [string, React.ReactNode][] = [
  ['Now', 'Director, Product Engineering at Majesco. I lead the frontend for Immersive AI, manage a team of four engineers, and stay hands-on.'],
  ['Before', 'Twelve years at Decision Research Corporation (acquired by Majesco) as UX lead and UI architect for CoreConnect, leading three frontend developers.'],
  ['Education', 'BFA in Graphic Design, BS in Computer Science, and a master’s in Software Engineering. Thirteen UX certifications from the Interaction Design Foundation.'],
  ['Recognition', 'Outstanding design student award. Typography work featured in the book Design School Confidential and on the website for James Craig’s Designing with Type.'],
  ['Tools', 'React, TypeScript, MUI, design systems and WCAG accessibility, Figma, and AI-assisted development with Claude Code, GitHub Copilot and Devin.'],
];

const lead: [string, string][] = [
  ['A team that grows.', 'I lead four engineers, grown from one direct report. One was promoted, and every project has been delivered on time.'],
  ['Mentoring for years before the title.', 'I\u2019ve managed and mentored as a team lead since 2021, and mentored junior developers before that, through code reviews, knowledge sharing and training.'],
];

const stories: [string, string][] = [
  ['Leading the Immersive AI frontend', 'On Immersive AI I lead the frontend: two full-time developers and a third at half time. I had worked with all three on other projects before they joined my team, helping them through problems and getting them clear on requirements and priorities, so I wasn\u2019t starting from scratch. I assign the work and let each person estimate their own tasks, since they know best how long the work will take them. I step in when someone isn\u2019t sure, and suggest a shorter estimate when one looks too long. I write their mid-year and year-end reviews against their OKRs and go through them one on one, and I pushed for the promotion one of them recently earned. I also make sure the team has what it needs to do its best work: AI coding assistants with enough tokens to use them properly, and laptops powerful enough for the work, which I kept following up on until the two who needed them had them. Every change, whoever or whatever wrote it, is tested and reviewed before it goes in.'],
  ['Hiring my team at DRC', 'I helped hire the three frontend developers I led at DRC. Each had a group interview with me and other senior developers, then a final interview with our VP of Product. In 2021, when I needed another engineer for CoreConnect, I reached out to someone I had worked with on earlier projects, who had left DRC several years before. I interviewed her about her work since, she met with our VP of Product, and she rejoined DRC to work directly with me. She is still on my team, working on CoreConnect, where we both design and code and I review her UI design work.'],
  ['Choosing and mentoring interns', 'Each year at DRC I chose two to three interns. I read through the applications, picked five to seven people, and interviewed them as a group with one of my developers, asking about their projects, their experience and what they wanted from the internship. Every intern worked on a real project that shipped in the product, and we met every day for the two to three months they were with us. This was before AI coding assistants. When they were stuck on how our system worked or how to build something, I gave them the answer; for things they could look up, like what a plugin could do, its latest version or a replacement, or the right syntax, I taught them how to research it. I also taught them to debug a web page in the browser\u2019s developer tools, which most had never done and found valuable. Every year, the interns finished their projects on deadline.'],
];

export default function AboutPage() {
  return (
    <>
      <Opener eyebrow="About" bold="Ben" italic="Viwatmanitsakul">
        <Lead opening="I studied graphic design">
          before computer science, and I've never stopped doing both. I design the interfaces I build, write the frontend architecture behind
          them, and lead the engineers who build them with me. When a problem is hard, I keep working until I find the actual cause rather than patch around it.
        </Lead>
      </Opener>
      <Box component="dl" sx={{ m: 0, borderTop: 1, borderColor: 'text.primary' }}>
        {facts.map(([k, v]) => (
          <Box key={k} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '12rem 1fr' }, gap: 1, py: 2.5, borderBottom: 1, borderColor: 'divider' }}>
            <Box component="dt"><Eyebrow>{k}</Eyebrow></Box>
            <Typography component="dd" sx={{ m: 0, fontFamily: typography.display, fontSize: '1.15rem', lineHeight: 1.55, maxWidth: typography.measure }}>{v}</Typography>
          </Box>
        ))}
      </Box>
      <Box component="section" aria-labelledby="lead" sx={{ mt: 8 }}>
        <Typography id="lead" variant="h3" component="h2" sx={{ mb: 2.5 }}>How I lead</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {lead.map(([h, b]) => (
            <Box key={h}>
              <Typography sx={{ fontWeight: 650 }}>{h}</Typography>
              <Typography sx={{ mt: 0.5, fontFamily: typography.display, fontSize: '1.12rem', lineHeight: 1.55, color: 'text.secondary' }}>{b}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 5, borderTop: 1, borderColor: 'divider' }}>
          {stories.map(([h, b]) => (
            <Box key={h} component="article" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '12rem 1fr' }, gap: 1, py: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h4" component="h3" sx={{ fontSize: '1.05rem', fontWeight: 650 }}>{h}</Typography>
              <Typography sx={{ m: 0, fontFamily: typography.display, fontSize: '1.15rem', lineHeight: 1.6, maxWidth: typography.measure }}>{b}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Eyebrow>Contact</Eyebrow>
        <Typography sx={{ mt: 1, fontSize: '1.1rem' }}>
          <Link href="mailto:bensumet@gmail.com">bensumet@gmail.com</Link> · <Link href="https://www.linkedin.com/in/ben-viwatmanitsakul/">LinkedIn</Link> · <Link href="https://github.com/bensumet">GitHub</Link> · <Link href="https://github.com/bensumet/bensumet.github.io">View the code</Link>
        </Typography>
      </Box>
    </>
  );
}
