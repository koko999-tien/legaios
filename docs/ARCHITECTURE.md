# Căn cứ Pháp lý Môi trường V14 architecture

Căn cứ Pháp lý Môi trường is being migrated from one large HTML file into ordered, testable static modules while production behavior remains isolated on `main`.

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
    app.css               # legacy/base visual system
    v14-product.css       # V14 task-first/product refinements
    compliance.css        # compliance workspace/calendar/register styles
    oss-upgrades.css      # accessibility/PWA progressive enhancement layer
  js/
    legal-data.js          # legal document/topic catalog
    knowledge-base.js      # metadata, deep guides, official-source knowledge
    state.js               # localStorage wrapper + shared mutable state
    import.js              # IndexedDB/file import subsystem
    idb-resilience.js      # explicit resilient IndexedDB wrapper
    search-utils.js        # sanitization + query helpers
    search-data.js         # structured clause/trail search data
    search-runtime.js      # legal search, clause rendering, citation memo
    search-fuzzy.js        # typo-tolerant search enhancement
    ui-shell.js            # shell UI, drawers, preferences, procedure wizard
    ui-utils.js            # shared UI rendering/utilities
    activity-workspace.js  # recent activity, comparison, workspace summary
    project-tools.js       # update feed, case helpers and exports
    library.js             # library filters, saved/recent docs, article reader
    procedures.js          # procedure checklist/progress/detail runtime
    compliance-core.js      # compliance state, normalization, audit, due-date/calendar model
    compliance.js           # compliance rendering, editors and workspace integration
    workspace.js           # workspace and command-palette runtime
    legal-hub.js           # legal-pack, data-vault and update-hub runtime
    expert.js              # expert dossier review runtime
    navigation.js          # page navigation runtime
    oss-upgrades.js         # diagnostics, accessibility and PWA integration
    library-search.js      # document-library search result rendering
    classifier.js          # project screening/classifier runtime
    boot.js                # final application initialization and event wiring
```

`assets/js/app.js` has been fully retired on `dev`.

The scripts intentionally remain **ordered classic scripts** for V14. This preserves the existing global lexical model while responsibilities are made explicit. Runtime dependencies are now declared directly in `index.html` and validated in CI; navigation code must not inject hidden JavaScript/CSS dependencies. ES modules should only be introduced after runtime behavior is stable and the cross-module dependencies are intentionally redesigned.

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
10. Added `tools/check-v14-structure.mjs`, which locks the ordered script load, required module markers, the absence of legacy `app.js`, and removal of temporary write-enabled extraction workflows.
11. Added the task-first compliance layer: locally stored profiles, user-entered deadlines, signal-driven review branches, profile-aware legal updates and workspace-v6 backup compatibility.
12. Made progressive runtime dependencies explicit in `index.html`, split V14/compliance CSS from the legacy stylesheet, and separated compliance model/state logic from rendering/editor code.

## Compliance workspace boundaries

- `compliance-core.js` owns `ccplmt_compliance_profiles_v1` and loads before `compliance.js` / `workspace.js` so backup/import can include normalized profiles.
- `compliance-core.js` also owns `ccplmt_compliance_audit_v1`: a capped append-only audit list with before/after snapshots for undoable compliance mutations. Workspace v6 exports/imports this log separately from profile data.
- A profile stores declared context and tracking dates; it does **not** represent a finding of legal compliance.
- Automatic branches are review priorities derived from user-declared signals. They must not be phrased as definitive applicability or non-applicability.
- The system does not invent statutory deadlines. Manual tasks and user-entered permit dates are labeled as tracking data and should be checked against original records.
- `ccplmt-workspace-v6` exports compliance profiles with the existing workspace data. The importer still accepts backups that predate this field.
- `tools/compliance-smoke.mjs` covers create → signal mapping → structured legal reference → recurring deadline → profile-aware legal update → export → reload → mobile geometry.
- The obligation register is nested inside each compliance profile and stores user-managed status, legal source, ownership, deadline basis/source, evidence references and notes. Imported evidence file bytes are not embedded in workspace JSON.
- Structured legal references are stored separately as article/clause/point/appendix fields. Where the repository has an indexed clause pack, the editor offers those refs directly; otherwise the free-form legal note remains available.
- Recurring obligations use a user-configured cadence (`monthly`, `quarterly`, `yearly`). Completing a period appends occurrence history and advances the next due date. Calendar projections are explicitly labeled as projected tracking dates, not inferred statutory deadlines.

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

## Glossary coverage

- `knowledge-base.js` owns the `TERMS` dataset used by the Thuật ngữ page.
- Common environmental abbreviations are searchable by abbreviation and full phrase; `search-utils.js` carries selected abbreviations into global legal-search expansion (including ĐMC).
