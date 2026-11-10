import { contrastRatio } from '@bensumet/edge';

// Color distance in CIE Lab (ΔE 1976). Close to how different two colors look:
// around 2 is barely noticeable; status colors that must be told apart at a
// glance need far more.
function lin(c: number) { return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }
function hex(h: string) { const s = h.replace('#', ''); return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255); }

export function lab(h: string): [number, number, number] {
  const [r, g, b] = hex(h).map(lin);
  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

export function deltaE(a: string, b: string): number {
  const [l1, a1, b1] = lab(a), [l2, a2, b2] = lab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
}

export { contrastRatio };

export interface Tone { name: string; bg: string; fg: string }

export function closestPairs(tones: Tone[], n = 3) {
  const out: { a: string; b: string; d: number }[] = [];
  for (let i = 0; i < tones.length; i++) for (let j = i + 1; j < tones.length; j++) out.push({ a: tones[i].name, b: tones[j].name, d: deltaE(tones[i].bg, tones[j].bg) });
  return out.sort((x, y) => x.d - y.d).slice(0, n);
}

export const minLabelContrast = (tones: Tone[]) => Math.min(...tones.map((t) => contrastRatio(t.fg, t.bg)));
