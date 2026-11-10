# Ben Viwatmanitsakul: portfolio

My portfolio, built on **Edge**, the design system it documents.

- `packages/edge`: Edge's tokens, theme and components, its rules files for coding assistants, and the script that publishes them as data (tokens JSON and CSS, a contrast report, `llms.txt`).
- `apps/site`: the portfolio site, built only from Edge.

## Run it

```bash
npm install
npm run dev        # start the site
npm test           # Edge's contrast, rules and component tests, and the site's tests
npm run build      # production build in apps/site/dist
```

The site and Edge were built with AI coding assistants; I review and test every change.

## Publishing

`.github/workflows/deploy.yml` type-checks, tests and builds the site on every push to `main`, then publishes it with GitHub Pages at https://bensumet.github.io (repository Settings > Pages > Source: GitHub Actions).

## License

Code is MIT. Images, paintings, book designs, logos and other artwork are all rights reserved. See [LICENSE](LICENSE).
