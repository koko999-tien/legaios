# LegalOS

LegalOS is an experimental Vietnamese environmental-law web application for legal lookup, procedure tracking, local case/workspace notes, document import, and screening support.

## Live site

Production is deployed from `main` to Netlify at `https://legalos-vn.netlify.app`.

## Branch workflow

- `main`: production branch. Netlify publishes this branch automatically.
- `dev`: development branch. Changes should be tested here before they are merged to `main`.

Do not make large refactors directly on `main`.

## Current architecture

The current application is intentionally preserved as a single-file web app:

- `index.html` — HTML, CSS, JavaScript, and built-in legal metadata/content.
- Browser storage — `localStorage` and `IndexedDB` for local user data and imported documents.

The single-file build remains the production baseline while the V14 refactor is prepared on `dev`.

## Local run

No build step is required. Open `index.html` directly in a browser, or serve the repository with any simple static HTTP server.

## Validation

The repository includes a dependency-free Node validation script at `tools/check-html.mjs`. GitHub Actions runs it on pushes and pull requests to catch basic structural and JavaScript syntax regressions.

Run locally with:

```bash
node tools/check-html.mjs
```

## Split-file preview

`tools/extract-single-file.mjs` generates a disposable refactor preview that extracts inline `<style>` and executable inline `<script>` blocks while preserving their position in the HTML. It does **not** modify production `index.html`.

```bash
node tools/extract-single-file.mjs index.html .tmp/refactor-preview
```

GitHub Actions generates and validates this preview automatically. This gives us a safer path to the future multi-file V14 structure before production is changed.

## Refactor rule

Code refactoring must not silently rewrite, correct, or replace legal content. Legal-data verification is a separate task from code/architecture refactoring.

See `docs/ARCHITECTURE.md` for the staged V14 plan.
