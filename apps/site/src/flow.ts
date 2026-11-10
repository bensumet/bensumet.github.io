// The reading order of the whole site, so every page can offer a next step and
// no one has to go back to the start. Titles are kept here, not imported from
// the pages, so the shell doesn't load every page to draw two links.
// flow.test.ts checks this list against the pages themselves.
export interface FlowItem { path: string[]; title: string; section: string }

export const flow: FlowItem[] = [
  { path: ['work'], title: 'Work', section: 'work' },
  { path: ['work', 'coreconnect'], title: 'CoreConnect', section: 'work' },
  { path: ['work', 'immersive-ai'], title: 'P&C Immersive AI', section: 'work' },
  { path: ['system', 'foundations'], title: 'Design system: Foundations', section: 'system' },
  { path: ['system', 'components'], title: 'Design system: Components', section: 'system' },
  { path: ['system', 'states'], title: 'Design system: States', section: 'system' },
  { path: ['system', 'ai-patterns'], title: 'Design system: AI patterns', section: 'system' },
  { path: ['system', 'console'], title: 'Design system: Console demo', section: 'system' },
  { path: ['system', 'agents'], title: 'Design system: For agents', section: 'system' },
  { path: ['system', 'evals'], title: 'Design system: Evaluations', section: 'system' },
  { path: ['ai'], title: 'Prototypes', section: 'ai' },
  { path: ['ai', 'deep-search'], title: 'Search filters that fit the answer', section: 'ai' },
  { path: ['ai', 'admin-portal'], title: 'From mockup to product', section: 'ai' },
  { path: ['ai', 'palette'], title: 'A palette, measured', section: 'ai' },
  { path: ['ai', 'ai-estimate'], title: 'Showing an AI estimate', section: 'ai' },
  { path: ['ai', 'build-log'], title: 'This site, built with Claude Code', section: 'ai' },
  { path: ['ai', 'process'], title: 'How I work with AI', section: 'ai' },
  { path: ['craft'], title: 'Craft', section: 'craft' },
  { path: ['about'], title: 'About', section: 'about' },
];

const key = (p: string[]) => p.join('/');

/** The flow entry for a route; "#/system" is its first tab. Unknown sub-pages fall back to their section. */
export function flowIndex(path: string[]): number {
  const p = path[0] === 'system' && path.length === 1 ? ['system', 'foundations'] : path;
  const exact = flow.findIndex((f) => key(f.path) === key(p));
  if (exact >= 0) return exact;
  return flow.findIndex((f) => key(f.path) === key(p.slice(0, 1)));
}
