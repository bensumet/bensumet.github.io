// edge-allow-file edge-first: composes the site's Edge-built Opener, IndexList and CaseStudy
import { IndexList, Opener } from '../components/Layout';
import { href } from '../router';
import { CaseStudy } from '../studies/work/CaseStudy';
import { coreconnect, immersive } from '../studies/work/content';

export const studies = [
  {
    id: 'coreconnect',
    title: 'CoreConnect',
    kind: 'Design system · UI framework',
    blurb: 'One UI framework across the CoreConnect suite, adopted by every client, so rebranding the product for a client took days instead of weeks.',
    content: coreconnect,
  },
  {
    id: 'immersive-ai',
    title: 'P&C Immersive AI',
    kind: 'Frontend architecture · AI features',
    blurb: 'The frontend architecture for a next-generation insurance platform, and AI features people can check, not just trust.',
    content: immersive,
  },
];

export default function WorkPage({ path }: { path: string[] }) {
  const study = studies.find((s) => s.id === path[0]);
  if (study) {
    return (
      <>
        <CaseStudy c={study.content} />
      </>
    );
  }
  return (
    <>
      <Opener eyebrow="Work" bold="Two products," italic="designed and built end to end." />
      <IndexList label="Case studies" items={studies.map((s, i) => ({ to: href('work', s.id), number: String(i + 1).padStart(2, '0'), title: s.title, kind: s.kind, blurb: s.blurb }))} />
    </>
  );
}
