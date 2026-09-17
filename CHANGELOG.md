# Changelog

## Unreleased — V14 foundation (`dev`)

- Added a protected `dev` workflow for refactoring before production merges.
- Added automated HTML/inline-JavaScript validation with GitHub Actions.
- Added a reproducible split-file refactor preview generator.
- Configured Netlify Deploy Previews to serve the generated split-file version for pull requests.
- Added baseline Netlify response security headers.
- Added repository architecture/refactor documentation.
- Removed the temporary `version.txt` file used to verify Netlify auto-deploy.

## V13.2.6 — Security & stability baseline

- Hardened imported workspace and Legal Pack handling.
- Added safer handling for user-controlled content rendered into the UI.
- Improved IndexedDB failure handling.
- Added browser-side CSP/referrer protections while preserving the single-file deployment model.

> Legal-content verification is tracked separately from code/security refactoring.
