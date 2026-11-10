import { Box, Typography } from '@mui/material';
import { Lead, typography } from '@bensumet/edge';
import { Opener } from '../../components/Layout';
import { DemoFrame } from '../../components/DemoFrame';

const decisions = [
  ['Judge a palette on real screens, in both themes.', 'The bench paints every candidate onto the same product screens, light and dark, so the choice is made where the colors actually live, not on a swatch sheet.'],
  ['Measure, don’t eyeball.', 'Every text pair’s contrast and every tone pair’s color distance is computed live from the values. A palette that looks balanced can still fail; the numbers say where.'],
  ['Re-measure every revision.', 'Revision 1 fixed the input border (1.74 to 3.47:1), but made dark error text worse (3.84 to 3.14:1) and left light warning text at 2.79:1. Both looked fine by eye; measuring caught them.'],
  ['Push the closest pair apart.', 'A palette is only as clear as its two most similar tones. Revision 1 left its closest pair at a color distance of 4.8; the proposals push it to 15.2.'],
  ['Color is never the only signal.', 'Every status keeps its word. Color speeds up scanning; the label is what makes it accessible.'],
];

export function PaletteStudy() {
  return (
    <>
      <Opener eyebrow="Designing with AI · Decision study" bold="A palette," italic="measured.">
        <Lead opening="Status colors carry meaning:">
          a person scanning a quote should tell an error from a warning without reading the word. A palette can look balanced and still fail,
          so I built a bench with an AI assistant that renders each candidate onto the product&rsquo;s screens and measures every pair live. This is that bench, with
          the product renamed.
        </Lead>
      </Opener>

      <DemoFrame src="palette.html" title="Palette Bench: candidate palettes measured on product screens" height={1100}
        note="The original bench, with the product renamed. Switch palette, mode and screen; scroll inside the frame, or open it full page." />

      <Box component="section" aria-labelledby="pal-decisions" sx={{ mt: 8 }}>
        <Typography id="pal-decisions" variant="h3" component="h2" sx={{ mb: 3 }}>What I decided, and why</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {decisions.map(([h, b]) => (
            <Box key={h}>
              <Typography sx={{ fontWeight: 650 }}>{h}</Typography>
              <Typography sx={{ mt: 0.5, fontFamily: typography.display, fontSize: '1.12rem', lineHeight: 1.55, color: 'text.secondary' }}>{b}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
