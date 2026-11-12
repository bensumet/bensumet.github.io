# Ben Viwatmanitsakul: portfolio

My portfolio, built on **Edge**, the design system it documents.

- `apps/site`: the portfolio site, built only from Edge.
- Edge itself lives in its own repo, [bensumet/edge-design-system](https://github.com/bensumet/edge-design-system), and this site installs it as a versioned package, `@bensumet/edge`, from GitHub Packages. The build copies Edge's published token files, rules and `llms.txt` into the site, so agents can read them at `/edge/`.

## Run it

Installing Edge from GitHub Packages needs a GitHub token with the `read:packages` scope. Add it once to your user `~/.npmrc`:

```
//npm.pkg.github.com/:_authToken=<your token>
```

Then:

```bash
npm install
npm run dev        # start the site
npm test           # accessibility on every page, and Edge's rules check on every screen
npm run build      # production build in apps/site/dist
```

To move to a new Edge version: `npm install @bensumet/edge@latest -w @bensumet/site`, then read Edge's changelog for anything a screen has to change for.

The site and Edge were built with AI coding assistants; I review and test every change.

## Publishing

`.github/workflows/deploy.yml` type-checks, tests and builds the site on every push to `main`, then publishes it with GitHub Pages at https://bensumet.github.io (repository Settings > Pages > Source: GitHub Actions). It installs Edge with the workflow's own token, which works because this repository has read access in the Edge package's settings.

## License

Code is MIT. Images, paintings, book designs, logos and other artwork are all rights reserved. See [LICENSE](LICENSE).
