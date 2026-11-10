import { scenarios } from './data';
import { applyFilters, facetsFor, groupItems, valueOf } from './logic';

const sc = (id: string) => scenarios.find((s) => s.id === id)!;

describe('search filters that fit the answer', () => {
  it('never offers a filter with only one value, except Product line', () => {
    for (const s of scenarios) {
      for (const f of facetsFor(s)) {
        if (f.facet !== 'line') expect(f.options.length, `${s.id}/${f.facet}`).toBeGreaterThan(1);
      }
    }
  });

  it('hides facets a search excludes on purpose', () => {
    const facets = facetsFor(sc('tasks')).map((f) => f.facet);
    expect(facets).not.toContain('assignee');
    expect(facets).not.toContain('account');
    expect(facets).toContain('due');
  });

  it('offers Ref No only when results hang off records', () => {
    expect(facetsFor(sc('activity')).map((f) => f.facet)).toContain('record');
    expect(facetsFor(sc('records')).map((f) => f.facet)).not.toContain('record');
  });

  it('orders due groups by urgency, overdue first', () => {
    const groups = groupItems(sc('tasks').items, 'due').map((g) => g.value);
    expect(groups[0]).toBe('overdue');
    expect(groups.indexOf('today')).toBeLessThan(groups.indexOf('week'));
  });

  it('puts the record with the most urgent task first', () => {
    const [first] = groupItems(sc('activity').items, 'record');
    expect(first.overdue).toBeGreaterThan(0);
  });

  it('combines filters with AND across facets and OR within one', () => {
    const items = sc('activity').items;
    const out = applyFilters(items, { type: ['task', 'email'], record: ['Q-4417'] });
    expect(out.every((i) => ['task', 'email'].includes(i.type) && valueOf(i, 'record') === 'Q-4417')).toBe(true);
    expect(out.length).toBe(2);
  });
});
