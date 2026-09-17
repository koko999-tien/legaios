# LegalOS V14 architecture plan

## Baseline

Production currently uses a single `index.html` of roughly 600 KB. It contains markup, styles, application logic, built-in legal metadata/content, browser-storage logic, import/export logic, and UI rendering.

That file is the working baseline and should remain recoverable throughout the refactor.

## Goals

1. Keep production behavior stable while code is reorganized.
2. Separate presentation, application logic, storage, and legal data.
3. Add automated checks before merging to `main`.
4. Make future backend/database/AI work possible without rewriting the UI again.
5. Keep legal-content changes separate from code-only refactors.

## Staged migration

### Stage 0 — safety rails

- `main` remains production.
- `dev` is the integration branch.
- Add automated structural and JavaScript syntax validation.
- Add Netlify configuration and response security headers.
- Document rollback and test workflow.
- Generate a disposable split-file preview in CI before production files are reorganized.

### Stage 1 — extract static CSS

Target structure:

```text
assets/
  css/
    app.css
```

Only move style rules. Do not redesign at this stage. Verify desktop/mobile layout and dark mode before merging.

### Stage 2 — extract application JavaScript

Target structure:

```text
assets/
  js/
    storage.js
    search.js
    documents.js
    workspace.js
    procedures.js
    ui.js
    app.js
```

Keep behavior unchanged first. Split by responsibility only after a clean baseline is verified.

### Stage 3 — extract built-in legal data

Target structure:

```text
assets/
  data/
    topics.js
    laws.js
    metadata.js
    procedures.js
```

This stage is structural only. Do not alter legal wording, dates, relationships, or cited sources as part of the extraction.

### Stage 4 — typed data contracts and migrations

Introduce versioned schemas for:

- workspace export/import;
- legal packs;
- imported-document metadata;
- saved cases and notes.

Add migration functions so older local data remains readable.

### Stage 5 — online services

Only after the front-end split is stable:

- authentication;
- PostgreSQL/Supabase data model;
- multi-device sync;
- server-side document processing;
- AI features;
- controlled legal-data update pipeline.

## Current refactor-preview mechanism

`tools/extract-single-file.mjs` reads the current `index.html`, extracts inline styles and executable inline scripts to a disposable `.tmp/refactor-preview/` tree, and rewrites references only inside that generated preview. Production `index.html` is not changed.

This mechanism is intentionally transitional: it lets CI prove that the single-file source can be split mechanically before we commit a permanent multi-file layout.

## Release discipline

For each structural stage:

1. implement on `dev`;
2. run `node tools/check-html.mjs`;
3. generate the split preview and validate it;
4. test core flows manually;
5. review the diff;
6. merge to `main` only after the current production behavior is preserved.

## Minimum manual smoke test

Before a production merge, verify:

- home page and navigation;
- document search/filtering;
- document detail opening;
- official-source links;
- dark/light theme;
- workspace save/load;
- notes;
- case screening;
- import/export;
- mobile navigation;
- browser refresh with existing local data.
