import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';

// Every screen on the site passes Edge's rules check: colors from the theme's
// variables, type from text roles, grids from layout presets. Agent-written
// evaluation screens are kept exactly as their agents wrote them, so they're
// left out; deliberate exceptions are written down in the file with a reason.
const root = join(__dirname);
// The checker ships with the installed Edge package (also runnable as `npx edge-check-ui`).
const script = join(dirname(createRequire(import.meta.url).resolve('@bensumet/edge/package.json')), 'scripts', 'check-ui.mjs');

function screens(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === 'generated' ? [] : screens(path);
    return name.endsWith('.tsx') && !name.endsWith('.test.tsx') ? [path] : [];
  });
}

describe('every screen follows Edge', () => {
  const results = JSON.parse(execFileSync('node', [script, ...screens(root)], { encoding: 'utf8' })) as { file: string; failed: { id: string; lines: number[] }[] }[];
  it.each(results.map((r) => [relative(root, r.file), r] as const))('%s', (_, r) => {
    expect(r.failed.map((f) => `${f.id} on lines ${f.lines.join(', ')}`)).toEqual([]);
  });
});
