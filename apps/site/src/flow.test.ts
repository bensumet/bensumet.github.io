import { flow, flowIndex } from './flow';
import { aiStudies } from './pages/AiPage';
import { tabs } from './pages/SystemPage';
import { studies } from './pages/WorkPage';

// The reading order must cover every study and tab, in the order the pages list them.
describe('site flow', () => {
  it('lists every Designing with AI study, in order', () => {
    expect(flow.filter((f) => f.path[0] === 'ai' && f.path[1]).map((f) => f.path[1])).toEqual(aiStudies.map((s) => s.id));
  });
  it('lists every System tab and case study, in order', () => {
    expect(flow.filter((f) => f.path[0] === 'system').map((f) => f.path[1])).toEqual(tabs.map((t) => t.id));
    expect(flow.filter((f) => f.path[0] === 'work' && f.path[1]).map((f) => f.path[1])).toEqual(studies.map((s) => s.id));
  });
  it('has no duplicates', () => {
    const keys = flow.map((f) => f.path.join('/'));
    expect(new Set(keys).size).toBe(keys.length);
  });
  it('maps section roots and unknown pages to a place in the flow', () => {
    expect(flow[flowIndex(['system'])].path).toEqual(['system', 'foundations']);
    expect(flow[flowIndex(['work', 'nope'])].path).toEqual(['work']);
  });
});
