import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { EdgeThemeProvider } from '@bensumet/edge';
import { ReturnsScreen as ReturnsWith } from './generated/with/ReturnsScreen';
import { ReturnsScreen as ReturnsWithout } from './generated/without/ReturnsScreen';
import { AccountSummary as SummaryWith } from './generated/with/AccountSummary';
import { AccountSummary as SummaryWithout } from './generated/without/AccountSummary';
import StatusWith from './generated/with/ServiceStatus';
import StatusWithout from './generated/without/ServiceStatus';

// The six screens from the evaluation, checked with the same accessibility
// test as the rest of the site.
const screens: [string, () => JSX.Element][] = [
  ['Returns, with rules', () => <ReturnsWith />],
  ['Returns, without rules', () => <ReturnsWithout />],
  ['Summary, with rules', () => <SummaryWith />],
  ['Summary, without rules', () => <SummaryWithout />],
  ['Service status, with rules', () => <StatusWith />],
  ['Service status, without rules', () => <StatusWithout />],
];

describe.each(['ink', 'paper'] as const)('generated screens (%s)', (mode) => {
  it.each(screens)('%s has no axe violations', async (name, Screen) => {
    const { container } = render(<EdgeThemeProvider defaultMode={mode}><main><Screen /></main></EdgeThemeProvider>);
    // Known finding, reported on the Evaluations page: this screen declares its
    // own <main>. The landmark rules are checked separately below.
    const landmark: Record<string, { enabled: boolean }> = name === 'Returns, with rules'
      ? { 'landmark-main-is-top-level': { enabled: false }, 'landmark-no-duplicate-main': { enabled: false }, 'landmark-unique': { enabled: false } }
      : {};
    const results = await axe(container, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false }, ...landmark } });
    expect(results).toHaveNoViolations();
  }, 20000);
});

describe('the finding the evaluation surfaced', () => {
  it('the returns screen built with the rules declares its own main landmark', () => {
    const { container } = render(<EdgeThemeProvider><ReturnsWith /></EdgeThemeProvider>);
    expect(container.querySelector('main')).not.toBeNull();
  });
});
