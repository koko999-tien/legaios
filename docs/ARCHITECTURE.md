# LegalOS V14 architecture

LegalOS is being migrated from one large HTML file into ordered, testable static modules while production behavior remains isolated on `main`.

## Deployment model

- `main` is production and deploys to `https://legalos-vn.netlify.app`.
- `dev` is the V14 refactor branch.
- Pull request #1 provides the Netlify Deploy Preview at `https://deploy-preview-1--legalos-vn.netlify.app`.
- Structural changes must pass `.github/workflows/validate.yml` before merge.

## Current dev structure

```text
index.html
assets/
  css/
    app.css
  js/
    legal-data.js          # legal document/topic catalog
    knowledge-base.js      # metadata, deep guides, official-source knowledge
    state.js               # localStorage wrapper + shared mutable state
    import.js              # IndexedDB/file import subsystem
    search-utils.js        # sanitization + query helpers
    search-data.js         # structured clause/trail search data
    search-runtime.js      # legal search, clause rendering, citation memo
    ui-shell.js            # shell UI, drawers, preferences, procedure wizard
    ui-utils.js            # shared UI rendering/utilities
    activity-workspace.js  # recent activity, comparison, workspace summary
    project-tools.js       # update feed, case helpers and exports
    library.js             # library filters, saved/recent docs, article reader
    procedures.js          # procedure checklist/progress/detail runtime
    workspace.js           # workspace and command-palette runtime
    legal-hub.js           # legal-pack, data-vault and update-hub runtime
    expert.js              # expert dossier review runtime
    navigation.js          # page navigation runtime
    library-search.js      # document-library search result rendering
    classifier.js          # project screening/classifier runtime
    boot.js                # final application initialization and event wiring
```

`assets/js/app.js` has been fully retired on `dev`.

The scripts intentionally remain **ordered classic scripts** for V14. This preserves the existing global lexical model while responsibilities are made explicit. ES modules should only be introduced after runtime behavior is stable and the cross-module dependencies are intentionally redesigned.

## Migration stages

### Completed on `dev`

1. Externalized CSS from the original single-file application.
2. Externalized the original JavaScript runtime.
3. Added structural/security validation and Netlify Deploy Preview.
4. Isolated legal data and knowledge-base data.
5. Isolated persistent/shared state and the document-import subsystem.
6. Isolated search utilities, structured search data, search runtime and citation memo.
7. Isolated shell UI, UI utilities, activity/comparison UI, project tools, library/reader and procedure runtime.
8. Isolated workspace/command palette, legal hub/data vault, expert review, navigation, library search and project classifier.
9. Moved the remaining initialization/event wiring into `boot.js`; the legacy `app.js` no longer exists.
10. Added `tools/check-v14-structure.mjs`, which locks the 20-script load order, required module markers, the absence of legacy `app.js`, and removal of temporary write-enabled extraction workflows.
11. Regenerated `docs/JS_DEPENDENCIES.md` from the final 20-module script order.

## Remaining before V14 merge

1. Run a full manual smoke test in the Netlify Deploy Preview on desktop and mobile, including existing local browser data.
2. Confirm the final smoke-tested commit still has green GitHub validation and Netlify Deploy Preview status.
3. Keep PR #1 as draft and do **not** merge to `main` until the preview behaves like production for supported flows.

## Safety rules

- Never refactor legal content and verify legal accuracy in the same change set.
- Legal-data verification remains tracked separately in Issue #2.
- Temporary write-enabled extraction workflows are removed immediately after their successful extraction commit.
- Prefer marker/byte-preserving moves before semantic rewrites.
- `main` remains production-only during the V14 refactor.
- Do not merge merely because syntax/CI passes; browser behavior must still be manually checked.

## Automated validation

The permanent validator currently checks:

- HTML basics, duplicate IDs and referenced local assets;
- JavaScript syntax for every local classic script;
- selected unsafe execution patterns (`eval`, `new Function`, `document.write`, string timers, `javascript:` URLs);
- the reviewed `innerHTML` sink ceiling;
- exact V14 JavaScript load order;
- required module files and key runtime markers;
- absence of legacy `assets/js/app.js`;
- absence of temporary `apply-stage*` workflows;
- a self-contained static preview copy;
- whitespace errors.

This is structural validation, not a browser end-to-end test.

## Minimum manual smoke test

Before a production merge, verify:

- home page and navigation;
- document search/filtering;
- document detail opening and in-document search;
- official-source links;
- dark/light theme;
- workspace save/load and notes;
- procedure progress;
- project screening;
- expert dossier workflow;
- imported PDF/Word document flows;
- command palette and keyboard shortcuts;
- mobile navigation;
- browser refresh with existing local data.
