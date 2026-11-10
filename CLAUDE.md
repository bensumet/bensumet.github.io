# Working in this repo

This is Ben Viwatmanitsakul's portfolio. Every screen is built with **Edge**, the design system in `packages/edge`.

## Before writing any UI

1. Read `packages/edge/rules/00-foundations.md`. It applies to every screen.
2. Read the rules file for each Edge component you're about to use (`packages/edge/rules/*.md`). The index is in the `## Rules` list that `packages/edge/scripts/build-tokens.mjs` writes to `llms.txt`; the files themselves are the source.
3. Import components and tokens from `@bensumet/edge`. Use an Edge component before writing a new one.
4. If the `edge` MCP server is connected (this repo's `.mcp.json` registers it), use `get_component_guidance` and `get_tokens` instead of guessing, and `check_contrast` before introducing any new color pair.

## Rules that are easy to get wrong

- Read every color from the theme (`primary.main`, `text.secondary`, `background.paper`, `edge.*`). Never write a hex, `rgb()` or `hsl()` value in a component.
- Corners are square. Don't set `borderRadius`.
- Fonts come from `typography` in `@bensumet/edge`; don't write font names.
- One filled (`variant="contained"`) button per view.
- Every input has a visible `label`. Errors are written as a sentence in `helperText`, directly under the field.
- Mark AI-written content with `AiLabel` until a person edits or accepts it; cite sources with `SummaryCard`; put suggestions in `SuggestionList`; add `FeedbackBar` under AI output.
- Decorative pieces (`ChapterStripes`, `WallArt`, `GhostWord`, `DotRule`) never go inside data views, and never carry meaning.
- Design the states beyond the happy path: loading, empty with a next step, error with a recovery action.
- A screen never declares `<main>`; the app shell owns the page landmarks.

## Checking your work

```bash
node packages/edge/scripts/check-ui.mjs path/to/Screen.tsx   # rules check
npm run typecheck && npm test                               # types, contrast, rules coverage, accessibility
```

Every change, whoever or whatever wrote it, is tested and reviewed by Ben before it ships.
