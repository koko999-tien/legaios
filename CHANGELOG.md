# Changelog

## Unreleased — V14 modularization (`dev`)

### Foundation
- Connected GitHub validation and Netlify Deploy Preview.
- Added `netlify.toml`, baseline response-security headers, `.gitignore`, architecture docs, and structural/security checks.
- Kept `main` as the untouched production branch while V14 work continues on `dev`.

### Structural extraction completed
- Extracted CSS to `assets/css/app.css`.
- Extracted the original application JavaScript to external scripts.
- Split built-in legal catalog data into `assets/js/legal-data.js`.
- Split legal metadata/guides into `assets/js/knowledge-base.js`.
- Split persistent/shared local state into `assets/js/state.js`.
- Split IndexedDB/file import logic into `assets/js/import.js`.
- Split search sanitization/query helpers into `assets/js/search-utils.js`.
- Split structured clause/trail data into `assets/js/search-data.js`.
- Split legal search, clause rendering and citation-memo logic into `assets/js/search-runtime.js`.
- Split shell UI/preferences/drawers/wizard logic into `assets/js/ui-shell.js`.
- Split recent activity/comparison/workspace summary UI into `assets/js/activity-workspace.js`.
- Split update feed/screening helpers/case export into `assets/js/project-tools.js`.
- Split library/document reader logic into `assets/js/library.js`.
- Split procedure checklist/progress logic into `assets/js/procedures.js`.

### Search V3
- Reworked browser-side legal search from mostly lexical scoring into a lightweight semantic-ranking layer with corpus-frequency (IDF) weighting.
- Added natural-language concept and goal detection for environmental-law queries without sending search text to an external service.
- Added explicit legal-document-kind ranking for QCVN, consolidated documents, decrees, circulars, laws, decisions and resolutions.
- Added shorthand legal-reference recognition such as `NĐ 08`, `TT 02` and `Luật 72`.
- Added semantic snippets and visible concept/intent metadata on result cards.
- Hardened Vietnamese fuzzy matching against short-token collisions after accent folding.
- Expanded search-quality regression coverage for current wastewater standards, consolidated NĐ 08, wastewater-monitoring questions and rare phrases such as “chì trong sơn”.

### Hardening
- Fixed Search V2 acronym expansion so “ĐMC” can rank the core environmental-law corpus from its recognized expanded phrase, with an engine/UI regression test.
- Made the legal-data freshness gate age against the actual CI date instead of a fixed 20/09/2026 baseline.
- Bumped the PWA shell cache after the search-engine fix and added a deployment Content-Security-Policy compatible with the current static/Blob preview model.
- Synchronized PR/preview, workspace-v8 and module-location documentation.

### Safety
- Each permanent extraction is validated before commit.
- Temporary write-enabled extraction workflows are removed immediately after use.
- Legal-content verification is intentionally tracked separately from code refactoring.
- The V14 pull request remains draft until manual smoke testing is complete.

## V13.2.6 — Security & stability baseline

- Hardened imported workspace and Legal Pack handling.
- Added safer handling for user-controlled content rendered into the UI.
- Improved IndexedDB failure handling.
- Added browser-side CSP/referrer protections while preserving the original static deployment model.

> Legal-content verification is tracked separately from code/security refactoring.
