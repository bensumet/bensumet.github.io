// Renders one generated screen on its own, for the evaluation screenshots.
import '@fontsource/eb-garamond/latin-400.css';
import '@fontsource/eb-garamond/latin-400-italic.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource-variable/archivo/wdth.css';
import { createRoot } from 'react-dom/client';
import { Box } from '@mui/material';
import { EdgeThemeProvider } from '@bensumet/edge';
import { ReturnsScreen as RW } from './generated/with/ReturnsScreen';
import { ReturnsScreen as RO } from './generated/without/ReturnsScreen';
import { AccountSummary as SW } from './generated/with/AccountSummary';
import { AccountSummary as SO } from './generated/without/AccountSummary';
import TW from './generated/with/ServiceStatus';
import TO from './generated/without/ServiceStatus';

const screens: Record<string, () => JSX.Element> = { 'returns-with': RW, 'returns-without': RO, 'summary-with': SW, 'summary-without': SO, 'status-with': TW, 'status-without': TO };
const id = new URLSearchParams(location.search).get('s') ?? 'returns-with';
const Screen = screens[id];
createRoot(document.getElementById('root')!).render(
  <EdgeThemeProvider defaultMode="ink"><Box sx={{ p: 3 }}><Screen /></Box></EdgeThemeProvider>,
);
