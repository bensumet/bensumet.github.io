// edge-allow-file edge-first: frame pieces read the Edge theme through styled(); nothing to import
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * The site frame: skip link, masthead and footer. Each is a styled component
 * that reads the theme's CSS variables, so the frame follows the mode and the
 * accent with no per-page styling.
 */

/** Hidden until focused; the first stop for keyboard users. */
export const SkipLink = styled(Link)(({ theme }) => ({
  position: 'absolute',
  left: 8,
  top: -48,
  zIndex: 2000,
  padding: theme.spacing(1),
  backgroundColor: theme.vars.palette.primary.main,
  color: theme.vars.palette.primary.contrastText,
  '&:focus': { top: 8 },
}));

/** Sticky header with a strong rule under it. */
export const Masthead = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  paddingTop: 'env(safe-area-inset-top, 0px)',
  backgroundColor: theme.vars.palette.background.default,
  borderBottom: `1px solid ${theme.vars.palette.text.primary}`,
}));

/** Wordmark, sections and mode picker in one row; sections drop to their own row on phones. */
export const MastheadRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  columnGap: theme.spacing(3),
  rowGap: theme.spacing(1),
  paddingBlock: theme.spacing(1.5),
}));

/**
 * The section list. On phones it scrolls sideways, and the last link fades
 * to say so. The mask only uses alpha; its color never shows.
 */
export const SectionNav = styled('nav')(({ theme }) => ({
  order: 3,
  width: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  padding: theme.spacing(1),
  margin: theme.spacing(-1),
  // edge-allow theme-colors: a mask reads only alpha.
  maskImage: 'linear-gradient(90deg, black 88%, transparent)',
  [theme.breakpoints.up('md')]: { order: 0, width: 'auto', maskImage: 'none' },
  '& ul': {
    display: 'flex',
    gap: theme.spacing(2),
    listStyle: 'none',
    margin: 0,
    padding: 0,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('md')]: { gap: theme.spacing(2.5) },
  },
}));

export const Footer = styled('footer')(({ theme }) => ({
  overflow: 'hidden',
  backgroundColor: theme.vars.palette.edge.tint,
  paddingBlock: theme.spacing(6),
  [theme.breakpoints.up('md')]: { paddingBlock: theme.spacing(8) },
}));
