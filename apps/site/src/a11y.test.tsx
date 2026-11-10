import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { EdgeThemeProvider } from '@bensumet/edge';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import CraftPage from './pages/CraftPage';
import { DeepSearchStudy } from './studies/deep-search/DeepSearchStudy';
import { AdminPortalStudy } from './studies/admin-portal/AdminPortalStudy';
import { PaletteStudy } from './studies/palette/PaletteStudy';
import { AiEstimateStudy } from './studies/ai-estimate/AiEstimateStudy';
import { ProcessEssay } from './studies/process/ProcessEssay';
import { BuildLogStudy } from './studies/build-log/BuildLogStudy';
import EvalsPage from './pages/system/EvalsPage';
import StatesPage from './pages/system/StatesPage';
import ConsolePage from './pages/system/ConsolePage';

// Automated accessibility checks on every page, in both color modes. Color
// contrast is left to the token tests (jsdom can't compute rendered colors).
const pages: [string, () => JSX.Element][] = [
  ['Home', () => <HomePage />],
  ['Work index', () => <WorkPage path={[]} />],
  ['CoreConnect', () => <WorkPage path={['coreconnect']} />],
  ['Immersive AI', () => <WorkPage path={['immersive-ai']} />],
  ['Search study', () => <DeepSearchStudy />],
  ['Admin study', () => <AdminPortalStudy />],
  ['Palette study', () => <PaletteStudy />],
  ['Estimate study', () => <AiEstimateStudy />],
  ['Build log', () => <BuildLogStudy />],
  ['Process essay', () => <ProcessEssay />],
  ['Evaluations', () => <EvalsPage />],
  ['States', () => <StatesPage />],
  ['Console demo', () => <ConsolePage />],
  ['Craft', () => <CraftPage />],
  ['About', () => <AboutPage />],
];

describe.each(['ink', 'paper'] as const)('accessibility (%s)', (mode) => {
  it.each(pages)('%s has no axe violations', async (_, Page) => {
    const { container } = render(<EdgeThemeProvider defaultMode={mode}><main><Page /></main></EdgeThemeProvider>);
    // Embedded original designs (iframes) are standalone pages, checked on their own; axe in jsdom can't enter frames.
    const results = await axe(container, { iframes: false, rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
    expect(results).toHaveNoViolations();
  }, 20000);
});
