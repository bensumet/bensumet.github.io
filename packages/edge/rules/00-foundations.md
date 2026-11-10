```json
{ "name": "Foundations", "kind": "global", "summary": "Rules every screen follows: color only from the theme, AA contrast, type voices, spacing, square corners, one primary action." }
```

# Foundations

These apply to every screen built with Edge. Read them first.

## Color
- Read every color from the theme (`primary.main`, `text.secondary`, `background.paper`, `palette.edge.*`). Never hard-code a hex value in a component.
- One accent per screen. The accent marks focus, selection and the single primary action. Everything else is neutral.
- Status colors (`success`, `warning`, `error`, `info`) are for status only, never decoration.
- Never use color as the only signal. Pair it with a word, an icon shape, or position.
- Contrast: text and secondary text 4.5:1 on every surface; control outlines 3:1 against their surface. `contrast.json` lists the measured pairs.

## Type
- Three voices. **Poster** (Archivo, condensed, heavy, uppercase) for page and section headlines only. **Display** (EB Garamond) for reading text, italic counterpoints and small caps. **Body** (Inter) for interface labels, buttons and numbers.
- Pair a heavy poster line with a Garamond italic line for openers; don't stack two poster lines of the same weight.
- Reading text: hold lines to about 66 characters (`measure`) with 1.65 leading.
- Numbers in columns use tabular figures.

## Space and shape
- Spacing comes from the 4px-based scale (`space`): 4, 8, 12, 16, 24, 32, 48, 64.
- Corners are square (`radius` is 0). Don't round cards, buttons or inputs.

## Motion
- Motion answers something a person did or a page arriving: opening, switching a view, landing on a page. Nothing loops, and nothing moves just to decorate.
- Use the `motion` tokens: `quick` (140ms) for state changes like hover and press, `base` (240ms) for switching views, `enter` (420ms) for content arriving. Ease with `motion.ease.enter`.
- Arriving content fades and rises `motion.rise` (8px). It moves into place; it doesn't fly in.
- One arrival per page. Don't stagger every card or animate each section as it scrolls into view.
- Under `prefers-reduced-motion: reduce`, every transition becomes an instant change; meaning never depends on movement.

## Composition
- One primary (filled) button per view; other actions are outlined or text buttons.
- Every input has a visible label. Errors appear in words directly under the field.
- Decorative details (stripes, stitch lines, wall-art shapes, ghost words) are `aria-hidden` and never carry meaning.
- Every screen has one focus ring style: the theme's. Don't remove outlines.
- A screen is a part of a page, so it never declares page landmarks: no `<main>`, `component="main"` or `role="main"`. The app shell owns `main`, the header and navigation; use `section` with a heading or `aria-label` instead.

## States beyond the happy path
Design these for every data view: loading, empty (with a next step), error (with a recovery action), partial data, long text, and no permission.
