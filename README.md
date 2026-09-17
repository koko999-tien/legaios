# LegalOS

LegalOS is a browser-based environmental-law workspace and research interface. The current production site remains on the stable `main` branch while the V14 modular refactor is developed on `dev`.

## Live environments

- Production: `https://legalos-vn.netlify.app`
- V14 Deploy Preview: `https://deploy-preview-1--legalos-vn.netlify.app`

## Branch workflow

```text
main  -> production Netlify deploy
dev   -> V14 refactor + CI + Deploy Preview
```

Do not merge structural refactors directly to `main`. Work on `dev`, let GitHub Actions validate the static application, verify the Netlify Deploy Preview, then merge through the draft pull request only after manual smoke testing.

## V14 front-end layout

The old single-file application is being split gradually while retaining classic-script execution order:

```text
index.html
assets/css/app.css
assets/js/legal-data.js
assets/js/knowledge-base.js
assets/js/state.js
assets/js/import.js
assets/js/search-utils.js
assets/js/search-data.js
assets/js/search-runtime.js
assets/js/ui-shell.js
assets/js/activity-workspace.js
assets/js/project-tools.js
assets/js/library.js
assets/js/procedures.js
assets/js/app.js
```

`app.js` is still the final compatibility/runtime layer and will shrink further as remaining responsibilities are isolated.

## Validation

The permanent validator is `.github/workflows/validate.yml`. The supporting checker is:

```bash
node tools/check-html.mjs index.html
```

It checks structural HTML assumptions, referenced local assets, JavaScript syntax, and selected security-regression conditions.

## Legal-data note

Structural refactoring does **not** certify the accuracy or currency of the built-in legal content. Legal-data verification is tracked separately in Issue #2 and should not be mixed into code-only refactor commits.

See `docs/ARCHITECTURE.md` for the migration plan and safety rules.
