# Working in this repo

This is Ben Viwatmanitsakul's portfolio. Every screen is built with **Edge**, Ben's design system, installed as the package `@bensumet/edge` (source: [bensumet/edge-design-system](https://github.com/bensumet/edge-design-system)). Change Edge in its own repo and release a new version; don't patch it here.

## Before writing any UI

1. Read `node_modules/@bensumet/edge/rules/00-foundations.md`. It applies to every screen.
2. Read the rules file for each Edge component you're about to use (`node_modules/@bensumet/edge/rules/*.md`). The index is the `## Rules` list in `node_modules/@bensumet/edge/dist/llms.txt`.
3. Import components and tokens from `@bensumet/edge`. Use an Edge component before writing a new one.
4. If the `edge` MCP server is connected (this repo's `.mcp.json` registers it), use `get_component_guidance` and `get_tokens` instead of guessing, and `check_contrast` before introducing any new color pair.

## Rules that are easy to get wrong

- Read every color from the theme (`primary.main`, `text.secondary`, `background.paper`, `edge.*`). Never write a hex, `rgb()` or `hsl()` value in a component. In `styled()` and theme callbacks, use `theme.vars.palette.*`, not `theme.palette.*` or `alpha()`: both modes are CSS variables.
- Text is a text role: `<Typography variant="prose">`, `label`, `eyebrow`, `lead`, `mono`… Never set `fontFamily`, `fontSize`, `lineHeight` or `letterSpacing` on a screen. Missing a role? It belongs in Edge's `textRoles`, as a change to the Edge repo.
- Grids are `<Columns preset="…">`; sections are `<Section>`; contents lists are `RuleList`/`RuleItem`. Never write `gridTemplateColumns` on a screen.
- Keep `sx` for spacing between blocks. A look that repeats belongs in Edge's theme or an Edge primitive, not in page `sx`.
- Corners are square. Don't set `borderRadius`.
- One filled (`variant="contained"`) button per view.
- Every input has a visible `label`. Errors are written as a sentence in `helperText`, directly under the field.
- Mark AI-written content with `AiLabel` until a person edits or accepts it; cite sources with `SummaryCard`; put suggestions in `SuggestionList`; add `FeedbackBar` under AI output.
- Decorative pieces (`ChapterStripes`, `WallArt`, `GhostWord`, `DotRule`) never go inside data views, and never carry meaning.
- Design the states beyond the happy path: loading, empty with a next step, error with a recovery action.
- A screen never declares `<main>`; the app shell owns the page landmarks.

## Checking your work

```bash
npx edge-check-ui path/to/Screen.tsx                        # rules check
npm run typecheck && npm test                               # types, accessibility, and the rules check on every screen
```

Every change, whoever or whatever wrote it, is tested and reviewed by Ben before it ships.
