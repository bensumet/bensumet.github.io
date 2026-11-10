// The rules behind the search page, kept apart from the UI so they can be
// tested. The core idea: the filters and grouping come from the response.
// A filter only appears when it would narrow what came back.
import { ME, TODAY, records, type ActivityItem, type Item, type Kind, type RecordItem, type Scenario } from './data';

export const FACETS = ['type', 'account', 'record', 'due', 'assignee', 'status', 'change', 'priority', 'line', 'match'] as const;
export type Facet = (typeof FACETS)[number];

export const isRecord = (it: Item): it is RecordItem => 'account' in it;
// Narrow to tasks only, so a false result still leaves notes and emails.
export const isTask = (it: Item): it is ActivityItem & { type: 'task' } => it.type === 'task';

export const TYPE_LABEL: Record<Kind, string> = { quote: 'Quote', order: 'Order', invoice: 'Invoice', return: 'Return', task: 'Task', note: 'Note', email: 'Email' };

/** A plain-language hint for each grouping: the question it answers. */
export const GROUP_HINT: Record<Facet | 'none', string> = {
  none: 'flat, by relevance', type: 'what kind of result', account: 'what else we have for this buyer', record: 'what is pending on this order or quote',
  due: 'what do I do first', assignee: 'whose work is this', status: 'what is still active', change: 'what kind of change', priority: 'what matters most',
  line: 'which product line', match: 'how strong the match is',
};

const VALUE_LABEL: Partial<Record<Facet, Record<string, string>>> = {
  due: { overdue: 'Overdue', today: 'Due today', week: 'Next 7 days', later: 'Later' },
  assignee: { me: 'You', unassigned: 'Unassigned' },
  priority: { high: 'High', medium: 'Medium', low: 'Low' },
  match: { exact: 'Exact match', strong: 'Strong match', related: 'Related' },
};

// Fixed orders where alphabetical would be wrong ("Overdue" before "Later").
const RANK: Partial<Record<Facet, Record<string, number>>> = {
  due: { overdue: 0, today: 1, week: 2, later: 3 },
  assignee: { me: 0, unassigned: 1 },
  priority: { high: 0, medium: 1, low: 2 },
  match: { exact: 0, strong: 1, related: 2 },
};

export function daysUntil(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Math.round((new Date(y, m - 1, d).getTime() - TODAY.getTime()) / 864e5);
}

export function dueBucket(it: Item): string {
  if (!isTask(it) || !it.due) return '';
  const d = daysUntil(it.due);
  return d < 0 ? 'overdue' : d === 0 ? 'today' : d <= 7 ? 'week' : 'later';
}

/** The value an item has for a facet, or '' when the facet doesn't apply to it. */
export function valueOf(it: Item, f: Facet): string {
  switch (f) {
    case 'type': return it.type;
    case 'account': return isRecord(it) ? it.account : records[it.ref]?.account ?? '';
    case 'record': return isRecord(it) ? '' : it.ref;
    case 'due': return dueBucket(it);
    case 'assignee': return isTask(it) ? (it.assignee === ME ? 'me' : it.assignee || 'unassigned') : '';
    case 'status': return isRecord(it) ? it.status : '';
    case 'change': return isRecord(it) ? it.change ?? '' : '';
    case 'priority': return isTask(it) ? it.priority ?? '' : '';
    case 'line': return isRecord(it) ? it.line : records[it.ref]?.line ?? '';
    case 'match': return it.tier;
  }
}

export function labelOf(f: Facet, v: string): string {
  if (f === 'type') return TYPE_LABEL[v as Kind] ?? v;
  return VALUE_LABEL[f]?.[v] ?? v;
}

/** "Account" becomes "Account / Bill-to" when a result is billed to someone else. */
export function facetLabel(f: Facet, items: Item[]): string {
  if (f === 'account') return items.some((i) => isRecord(i) && i.billTo === 'distributor') ? 'Account / Bill-to' : 'Account';
  return { type: 'Type', account: 'Account', record: 'Ref No', due: 'Due', assignee: 'Assignee', status: 'Status', change: 'Change', priority: 'Priority', line: 'Product line', match: 'Match' }[f];
}

export interface FacetOptions { facet: Facet; options: { value: string; count: number }[] }

/**
 * The filters this response supports. A facet is offered only when it has at
 * least two values (one value would filter nothing). Product line is the
 * exception: one value still tells you what the search matched. Account only
 * appears when some account repeats, or grouping by it would be one per row.
 */
export function facetsFor(sc: Scenario): FacetOptions[] {
  const out: FacetOptions[] = [];
  for (const f of FACETS) {
    if (sc.hide?.includes(f)) continue;
    const counts = new Map<string, number>();
    for (const it of sc.items) {
      const v = valueOf(it, f);
      if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    if (counts.size === 0 || (counts.size < 2 && f !== 'line')) continue;
    if (f === 'account' && ![...counts.values()].some((n) => n > 1)) continue;
    const r = RANK[f];
    const options = [...counts].map(([value, count]) => ({ value, count })).sort((a, b) =>
      r ? (r[a.value] ?? 99) - (r[b.value] ?? 99) : b.count - a.count || labelOf(f, a.value).localeCompare(labelOf(f, b.value)));
    out.push({ facet: f, options });
  }
  return out;
}

export type Selection = Partial<Record<Facet, string[]>>;

export function applyFilters(items: Item[], sel: Selection): Item[] {
  const active = (Object.keys(sel) as Facet[]).filter((f) => sel[f]?.length);
  return items.filter((it) => active.every((f) => sel[f]!.includes(valueOf(it, f))));
}

export interface Group { value: string; items: Item[]; overdue: number }

export function groupItems(items: Item[], by: Facet | 'none'): Group[] {
  if (by === 'none') return [{ value: 'all', items, overdue: 0 }];
  const map = new Map<string, Item[]>();
  for (const it of items) {
    const v = valueOf(it, by);
    map.set(v, [...(map.get(v) ?? []), it]);
  }
  const worstDue = (xs: Item[]) => Math.min(...xs.map((i) => RANK.due![dueBucket(i)] ?? 9));
  const r = RANK[by];
  return [...map].map(([value, xs]) => ({ value, items: xs, overdue: xs.filter((i) => dueBucket(i) === 'overdue').length }))
    .sort((a, b) => {
      if (!a.value !== !b.value) return a.value ? -1 : 1; // empty values last
      if (r) return (r[a.value] ?? 99) - (r[b.value] ?? 99);
      if (by === 'record') return worstDue(a.items) - worstDue(b.items) || b.items.length - a.items.length;
      return b.items.length - a.items.length || labelOf(by, a.value).localeCompare(labelOf(by, b.value));
    });
}
