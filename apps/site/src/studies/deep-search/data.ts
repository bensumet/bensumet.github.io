// Sample data for the search prototype. Everything here is fictional: a small
// leather goods maker, Harbor & Pine, and its wholesale accounts.

export type RecordKind = 'quote' | 'order' | 'invoice' | 'return';
export type ActivityKind = 'task' | 'note' | 'email';
export type Kind = RecordKind | ActivityKind;
export type Tier = 'exact' | 'strong' | 'related';
export type Priority = 'high' | 'medium' | 'low';

export const TODAY = new Date(2026, 9, 29); // Oct 29, 2026
export const ME = 'You';

/** Records the activity items hang off. Refs are invented, in no real format. */
export const records: Record<string, { kind: RecordKind; account: string; line: string; region: string }> = {
  'Q-4417': { kind: 'quote', account: 'Juniper & Co. Outfitters', line: 'Wallets', region: 'CO' },
  'O-2208': { kind: 'order', account: 'Juniper & Co. Outfitters', line: 'Wallets', region: 'CO' },
  'INV-731': { kind: 'invoice', account: 'Juniper & Co. Outfitters', line: 'Wallets', region: 'CO' },
  'R-118': { kind: 'return', account: 'Juniper & Co. Outfitters', line: 'Wallets', region: 'CO' },
  'O-2195': { kind: 'order', account: 'Fernhill Market', line: 'Bags', region: 'OR' },
  'Q-4402': { kind: 'quote', account: 'Saltmarsh Goods', line: 'Card holders', region: 'ME' },
  'O-2171': { kind: 'order', account: 'Saltmarsh Goods', line: 'Wallets', region: 'ME' },
};

export interface RecordItem {
  type: RecordKind;
  ref: string;
  account: string;
  status: string;
  tier: Tier;
  line: string;
  change?: string;
  billTo?: 'direct' | 'distributor';
  facts: [string, string][];
}

export interface ActivityItem {
  type: ActivityKind;
  id: string;
  title: string;
  ref: string;
  tier: Tier;
  snippet?: string;
  due?: string; // yyyy-mm-dd, tasks only
  priority?: Priority;
  assignee?: string; // tasks only; '' = unassigned
  by?: string; // notes and emails
  date?: string;
}

export type Item = RecordItem | ActivityItem;

export interface Scenario {
  id: string;
  label: string;
  query: string;
  interpreted: string[];
  /** The grouping the page opens with, chosen for the question this search usually asks. */
  defaultGroup: string;
  /** Facets left out on purpose for this search, because every result would share one value. */
  hide?: string[];
  why: string;
  items: Item[];
}

const task = (id: string, title: string, ref: string, due: string, priority: Priority, snippet = '', extra: Partial<ActivityItem> = {}): ActivityItem => ({
  type: 'task', id, title, ref, due, priority, snippet, assignee: ME, tier: 'related', ...extra,
});

export const scenarios: Scenario[] = [
  {
    id: 'records',
    label: 'Quotes and orders',
    query: 'Wallet orders with custom edge paint',
    interpreted: ['Product line: Wallets', 'Custom edge paint: Yes'],
    defaultGroup: 'none',
    hide: ['status'],
    why: 'Every result is its own record, so Ref No is hidden. Change (new, reorder, revision) replaces Status because it is what a buyer scans for. Group by starts at None, so the relevance order stays as the search returned it.',
    items: [
      { type: 'quote', ref: 'Q-4417', account: 'Juniper & Co. Outfitters', status: 'In review', tier: 'exact', line: 'Wallets', change: 'New quote', facts: [['Quantity', '240'], ['Ship by', 'Nov 15, 2026'], ['Total', '$14,300']] },
      { type: 'quote', ref: 'Q-4409', account: 'Fernhill Market', status: 'Approved', tier: 'strong', line: 'Wallets', change: 'Revision', facts: [['Quantity', '120'], ['Ship by', 'Dec 1, 2026'], ['Total', '$6,980']] },
      { type: 'order', ref: 'O-2208', account: 'Juniper & Co. Outfitters', status: 'In production', tier: 'strong', line: 'Wallets', change: 'Reorder', facts: [['Quantity', '180'], ['Ship by', 'Nov 20, 2026'], ['Total', '$10,750']] },
      { type: 'order', ref: 'O-2171', account: 'Saltmarsh Goods', status: 'Shipped', tier: 'strong', line: 'Wallets', change: 'New order', facts: [['Quantity', '60'], ['Shipped', 'Oct 12, 2026'], ['Total', '$3,420']] },
      { type: 'quote', ref: 'Q-4398', account: 'Granite Peak Supply', status: 'Draft', tier: 'related', line: 'Wallets', change: 'New quote', facts: [['Quantity', '90'], ['Ship by', 'Feb 1, 2027'], ['Total', '$5,100']] },
      { type: 'quote', ref: 'Q-4391', account: 'Northshore Mercantile', status: 'Draft', tier: 'related', line: 'Wallets', change: 'Revision', facts: [['Quantity', '150'], ['Ship by', 'Mar 15, 2027'], ['Total', '$8,250']] },
    ],
  },
  {
    id: 'activity',
    label: 'Tasks, notes, emails',
    query: 'Juniper & Co.',
    interpreted: ['Account: Juniper & Co. Outfitters', 'Tasks, notes, emails'],
    defaultGroup: 'record',
    why: 'Tasks, notes and emails belong to a record, so Ref No filters by that record and is the default grouping. The record shows once in the group header instead of on every row, with its overdue count. Due, Assignee and Priority apply to tasks only.',
    items: [
      task('T-41', 'Confirm hide color for the reorder', 'O-2208', '2026-10-31', 'high', 'The buyer asked to match last season’s navy. Pull a swatch from lot 12.', { tier: 'strong' }),
      { type: 'note', id: 'N-22', title: 'Buyer call: asks for a 5% volume break', ref: 'Q-4417', tier: 'related', by: 'A. Rivera', date: 'Oct 27', snippet: 'Juniper would commit to 240 units if the break holds.' },
      { type: 'email', id: 'E-31', title: 'RE: Edge paint samples', ref: 'Q-4417', tier: 'strong', by: 'Dana Whit (Juniper & Co.)', date: 'Oct 27', snippet: 'Orange and mint both work; we prefer the orange.' },
      task('T-33', 'Send revised quote with the volume break', 'Q-4417', '2026-11-12', 'medium', 'Waiting on the buyer’s final count.'),
      task('T-29', 'Chase the late payment', 'INV-731', '2026-10-26', 'medium', 'Second installment is three days late.', { assignee: 'L. Chen', tier: 'strong' }),
      { type: 'note', id: 'N-19', title: 'Payment plan moved to quarterly', ref: 'INV-731', tier: 'related', by: 'L. Chen', date: 'Oct 15', snippet: 'Juniper moved from monthly to quarterly payments.' },
      task('T-44', 'Inspect returned card holders', 'R-118', '2026-10-28', 'high', 'Six units came back with stitching gaps.', { tier: 'strong' }),
      { type: 'email', id: 'E-34', title: 'Photos of the stitching', ref: 'R-118', tier: 'strong', by: 'Sam Ortiz (Juniper & Co.)', date: 'Oct 25', snippet: 'Attached are photos of the six units.' },
      task('T-46', 'Assign a maker to the reorder', 'O-2208', '2026-11-02', 'medium', 'No one is assigned yet.', { assignee: '' }),
    ],
  },
  {
    id: 'tasks',
    label: 'My open tasks',
    query: 'My open tasks',
    interpreted: ['Type: Task', 'State: Open', 'Assigned to: you'],
    defaultGroup: 'due',
    hide: ['assignee', 'account'],
    why: 'When every result is your own open task, the page opens grouped by Due, so the list answers "what do I do first." Assignee and Account are hidden because they wouldn’t narrow anything. Match is kept so the strongest hits lead within each group.',
    items: [
      task('T-50', 'Cut panels for the Fernhill tote', 'O-2195', '2026-10-27', 'high', 'Hides arrived Monday.', { tier: 'exact' }),
      task('T-51', 'Burnish edges, batch 7', 'O-2208', '2026-10-29', 'medium', '', { tier: 'strong' }),
      task('T-52', 'Photograph the new card holder', 'Q-4402', '2026-10-31', 'low', 'For the Saltmarsh line sheet.', { tier: 'strong' }),
      task('T-53', 'Reply to Saltmarsh about lead times', 'Q-4402', '2026-11-02', 'medium', '', { tier: 'related' }),
      task('T-54', 'Order more mint edge paint', 'O-2171', '2026-11-04', 'low', '', { tier: 'related' }),
      task('T-55', 'Update the wholesale price sheet', 'Q-4417', '2026-11-20', 'low', 'New prices start in January.', { tier: 'related' }),
    ],
  },
  {
    id: 'name',
    label: 'Name search, many lines',
    query: 'Juniper',
    interpreted: ['Name contains: Juniper', 'Types: Quotes, Orders'],
    defaultGroup: 'account',
    hide: ['status'],
    why: 'A name search returns records for several similar accounts and product lines. Account is the default grouping, so everything for one buyer sits together; Product line splits the same results the other way. One invoice is billed through a distributor, so the Account filter becomes Account / Bill-to and marks that name.',
    items: [
      { type: 'quote', ref: 'Q-4417', account: 'Juniper & Co. Outfitters', status: 'In review', tier: 'exact', line: 'Wallets', change: 'New quote', facts: [['Quantity', '240'], ['Total', '$14,300']] },
      { type: 'order', ref: 'O-2208', account: 'Juniper & Co. Outfitters', status: 'In production', tier: 'exact', line: 'Wallets', change: 'Reorder', facts: [['Quantity', '180'], ['Total', '$10,750']] },
      { type: 'quote', ref: 'Q-4420', account: 'Juniper & Co. Outfitters', status: 'Approved', tier: 'strong', line: 'Belts', change: 'New quote', facts: [['Quantity', '80'], ['Total', '$4,450']] },
      { type: 'order', ref: 'O-2166', account: 'Juniper & Co. Outfitters', status: 'Shipped', tier: 'strong', line: 'Bags', change: 'New order', facts: [['Quantity', '24'], ['Total', '$7,200']] },
      { type: 'quote', ref: 'Q-4425', account: 'Juniper Trail Supply', status: 'Draft', tier: 'strong', line: 'Bags', change: 'New quote', facts: [['Quantity', '30'], ['Total', '$8,900']] },
      { type: 'order', ref: 'O-2150', account: 'Juniper Trail Supply', status: 'Shipped', tier: 'strong', line: 'Card holders', change: 'Reorder', facts: [['Quantity', '200'], ['Total', '$5,640']] },
      { type: 'quote', ref: 'Q-4380', account: 'Old Juniper Mill', status: 'Draft', tier: 'related', line: 'Wallets', change: 'New quote', facts: [['Quantity', '40'], ['Total', '$2,300']] },
      { type: 'return', ref: 'R-118', account: 'Juniper & Co. Outfitters', status: 'Inspecting', tier: 'strong', line: 'Card holders', facts: [['Units', '6'], ['Reason', 'Stitching']] },
      { type: 'invoice', ref: 'INV-731', account: 'Juniper & Co. Outfitters', status: 'Past due', tier: 'strong', line: 'Wallets', billTo: 'direct', facts: [['Balance', '$5,375'], ['Plan', 'Quarterly']] },
      { type: 'invoice', ref: 'INV-744', account: 'Coastline Distributors', status: 'Current', tier: 'related', line: 'Wallets', billTo: 'distributor', facts: [['Balance', '$1,210'], ['Orders', '3']] },
    ],
  },
];
