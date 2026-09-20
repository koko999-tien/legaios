# Căn cứ Pháp lý Môi trường V14 architecture

Căn cứ Pháp lý Môi trường is being migrated from one large HTML file into ordered, testable static modules while production behavior remains isolated on `main`.

## Deployment model

- `main` is production and deploys to `https://legalos-vn.netlify.app`.
- `dev` is the V14 refactor branch.
- Draft pull request #3 provides the Netlify Deploy Preview at `https://deploy-preview-3--legalos-vn.netlify.app`.
- Release candidates must pass both `.github/workflows/validate.yml` and `.github/workflows/browser-smoke.yml` before merge.

## Current dev structure

```text
index.html
assets/
  css/
    app.css               # legacy/base visual system
    v14-product.css       # V14 task-first/product refinements + product-page overrides migrated out of app.css
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
    permits.js              # Sổ giấy phép UI, file/obligation links and permit actions
    compliance.js           # compliance rendering, editors and workspace integration
    workspace.js           # workspace/case runtime + lazy data-management loader
    legal-hub.js           # legal-pack, data-vault and update-hub runtime
    expert.js              # expert dossier review runtime
    navigation.js          # page navigation runtime
    oss-upgrades.js        # diagnostics, accessibility and PWA integration
    library-search.js      # document-library search result rendering
    classifier.js          # project screening/classifier runtime
    boot.js                # final application initialization and event wiring
  lazy/
    search-engine.js       # local semantic Search V3, loaded on focus/idle
    workspace-data.js      # backup v8 + recovery, loaded on first data-management use
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
11. Added the task-first compliance layer: locally stored profiles, user-entered deadlines, signal-driven review branches, profile-aware legal updates and workspace-v8 backup compatibility.
12. Made progressive runtime dependencies explicit in `index.html`, split V14/compliance CSS from the legacy stylesheet, and separated compliance model/state logic from rendering/editor code.
13. Added a dedicated `permits.js` layer and workspace-v8 backup: multi-permit registry, legacy GPMT migration, file/original-document references, obligation links, review/expiry calendar items and audit/undo support.

## Compliance workspace boundaries

- `compliance-core.js` owns `ccplmt_compliance_profiles_v1` and loads before `compliance.js` / `workspace.js` so backup/import can include normalized profiles.
- `compliance-core.js` also owns `ccplmt_compliance_audit_v1`: a capped append-only audit list with before/after snapshots for undoable compliance mutations. Workspace v8 exports/imports this log separately from profile data.
- A profile stores declared context and tracking dates; it does **not** represent a finding of legal compliance.
- Automatic branches are review priorities derived from user-declared signals. They must not be phrased as definitive applicability or non-applicability.
- The system does not invent statutory deadlines. Manual tasks and user-entered permit dates are labeled as tracking data and should be checked against original records.
- `ccplmt-workspace-v8` exports compliance profiles, Sổ giấy phép data, quick notes, citation baskets, reading progress, interface preferences and the local recovery list. The importer still accepts older backups; imported PDF/Word bytes remain outside JSON.
- `tools/compliance-smoke.mjs` covers create → legacy-GPMT migration → Sổ giấy phép CRUD/file/obligation links → audit/undo → structured legal reference → recurring deadline → profile-aware legal update → workspace-v8 export → reload → mobile geometry.
- The Sổ giấy phép is nested inside each compliance profile and stores user-managed permit status, number, issuer, issue/expiry/review dates, imported-file references, tracked conditions and obligation links. Permit dates remain tracking metadata until checked against the original record.
- The obligation register is nested inside each compliance profile and stores user-managed status, legal source, ownership, deadline basis/source, evidence references and notes. Imported evidence file bytes are not embedded in workspace JSON.
- Structured legal references are stored separately as article/clause/point/appendix fields. Where the repository has an indexed clause pack, the editor offers those refs directly; otherwise the free-form legal note remains available.
- Recurring obligations use a user-configured cadence (`monthly`, `quarterly`, `yearly`). Completing a period appends occurrence history and advances the next due date. Calendar projections are explicitly labeled as projected tracking dates, not inferred statutory deadlines.

## Remaining before V14 merge

1. Run a full manual smoke test in the Netlify Deploy Preview on desktop and mobile, including existing local browser data.
2. Confirm the final smoke-tested commit still has green GitHub validation and Netlify Deploy Preview status.
3. Keep PR #3 as draft and do **not** merge to `main` until the preview behaves like production for supported flows.

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

The separate Browser smoke workflow covers browser behavior, search quality, legal comparison, sanitizer hardening, IndexedDB/data safety, compliance flows, mobile layout/navigation, reading progress, PWA behavior and accessibility. Structural validation alone is not treated as release approval.

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


### Lazy data management

Backup v8 and “Đã xóa gần đây” are isolated in `assets/lazy/workspace-data.js`. The main shell loads a small wrapper only; the optional chunk is fetched when the work area or backup/recovery actions are first used. The service worker caches same-origin static assets after that first request. CI budgets shell JavaScript and lazy JavaScript separately.


### Search engine V3

The ordered shell keeps a small `search-fuzzy.js` loader. Search V3 lives in `assets/lazy/search-engine.js` and remains fully browser-side/offline-capable: it does not send queries to an external AI/search service.

The engine combines corpus-frequency (IDF) weighting, typo tolerance, phrase/proximity scoring, environmental-law concept aliases, user-goal detection, explicit document-kind intent, shorthand legal-reference matching and semantic snippet selection. Query interpretation is surfaced in the result UI so users can see which concepts/goals affected ranking. The chunk is loaded on search focus or idle time and can rerank an active query without blocking initial application startup.


### Search V4 — official-source discovery

V15 adds an opt-in web-discovery layer without changing the trust level of the local legal corpus. `search-fuzzy.js` lazily loads `assets/lazy/official-search.js` and its CSS. Only an explicit user click sends the current query to `/.netlify/functions/official-search`; workspace/profile/note/imported-file data is not included. The function only returns HTTPS links on a strict government/legal-source allowlist and marks the payload `verified:false`. Web results remain visually separate from Search V3 results and cannot silently become verified corpus entries. See `docs/SEARCH_V4.md`.

Workspace restore now uses an in-app preview before replacement, including counts for profiles, permits, obligations, saved documents, citations and reading progress. The compliance calendar supports 30-day, 90-day and 12-month horizons; the chosen horizon is stored locally.
