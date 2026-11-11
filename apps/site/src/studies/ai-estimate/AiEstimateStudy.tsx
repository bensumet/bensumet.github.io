import { Lead, Section } from '@bensumet/edge';
import { Opener, Points } from '../../components/Layout';
import { DemoFrame } from '../../components/DemoFrame';

const decisions = [
  ['Draw only what the model returns.', 'A low, an estimate and a high. The bell curves and heat strips I explored implied a "most likely" shape the model doesn’t produce, so they went.'],
  ['Call it variability, not confidence.', 'The score says how much the price could still move. "Confidence" would have promised something the model can’t back up.'],
  ['One signal for AI, and only for AI.', 'The blue-to-violet treatment and the AI mark appear on AI output and nowhere else, so people learn them once.'],
  ['The real price wins, visibly.', 'Once the quote is rated, the estimate gives way to a solid figure with no AI treatment. The two never sit side by side as equals.'],
];

export function AiEstimateStudy() {
  return (
    <>
      <Opener eyebrow="Designing with AI · Decision study" bold="Showing an" italic="AI estimate.">
        <Lead opening="The AI estimate started as one number,">
          a large premium figure in one of the quote&rsquo;s header banners. It was easy to overlook, and it told people nothing about how
          far to trust it. The redesign makes the estimate stand out as AI output and shows how close it is likely to land to the rated
          premium, given what has been entered so far: a low and a high around the estimate, and how much the price could still move as more
          is filled in. I worked it out with an AI assistant; this is the working file from that design, round by round, with the controls
          I used to test each option in light and dark, at each level of variability, and when the estimate is out of date.
        </Lead>
      </Opener>

      <DemoFrame src="ai-estimate.html" title="AI estimated premium: header options, round by round" height={960}
        note="The original working file, newest round first, with the product renamed. The chosen option is at the top; scroll inside the frame, or open it full page." />

      <Section id="est-decisions" title="What I decided, and why">
        <Points items={decisions} />
      </Section>
    </>
  );
}
