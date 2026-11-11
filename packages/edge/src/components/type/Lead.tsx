import { Box, Typography, type TypographyProps } from '@mui/material';

/**
 * An opening paragraph set like the first lines of a book chapter: the `lead`
 * text role (Garamond at reading size, generous leading, a reading measure),
 * with the first few words in true small caps. The small caps come from the
 * font's own glyphs (font-variant-caps), not from shrunken capitals.
 */
export function Lead({ opening, children, sx, ...rest }: { opening: string; children: React.ReactNode } & TypographyProps) {
  return (
    <Typography variant="lead" sx={[{ hangingPunctuation: 'first' }, ...(Array.isArray(sx) ? sx : [sx])]} {...rest}>
      <Box component="span" sx={{ fontVariantCaps: 'all-small-caps', letterSpacing: '0.06em', fontWeight: 500, color: 'primary.main' }}>
        {opening}
      </Box>{' '}
      {children}
    </Typography>
  );
}
