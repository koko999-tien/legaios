# LegalOS V14 architecture

LegalOS is being migrated from one large HTML file into ordered, testable static modules without changing production behavior prematurely.

## Deployment model

- `main` is production and is deployed to `https://legalos-vn.netlify.app`.
- `dev` is the refactor branch.
- Pull request #1 provides a Netlify Deploy Preview before anything is merged to production.
- Structural changes must pass `.github/workflows/validate.yml` and the Netlify preview before merge.

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
    activity-workspace.js  # recent activity, comparison, workspace summary
    project-tools.js       # update feed, screening helpers, case export
    library.js             # library filters, saved/recent docs, article reader
    procedures.js          # procedure checklist/progress/detail runtime
    app.js                 # remaining workspace, legal-pack, expert, boot/events
```

The scripts intentionally remain **ordered classic scripts** for now. This preserves the existing global lexical model while responsibilities are made explicit. ES modules should only be introduced after cross-module dependencies are mapped and stabilized.

## Migration stages

### Completed on `dev`

1. Externalized CSS from the single-file application.
2. Externalized the original JavaScript runtime.
3. Added structural/security validation and Netlify preview deployment.
4. Isolated core legal data and legal knowledge-base data.
5. Isolated persistent/shared state and the document-import subsystem.
6. Isolated legal-search utilities, structured search data, and search/memo runtime.
7. Isolated shell UI, activity/comparison/workspace summary, project tools, document library/reader, and procedure runtime.

### Remaining before V14 merge

1. Split the remaining `app.js` by responsibility: workspace + command palette, legal-pack/data-vault, expert review, other domain UI, and boot/event delegation.
2. Regenerate the dependency inventory after the final split.
3. Run manual smoke tests in the Netlify Deploy Preview on desktop and mobile.
4. Merge only after the preview behaves like production for the supported flows.

## Safety rules

- Never refactor legal content and verify legal accuracy in the same change set.
- Legal-data verification is tracked separately in Issue #2.
- One-time write-enabled GitHub Actions workflows are deleted immediately after their successful extraction commit.
- Prefer byte/marker-preserving moves before semantic rewrites.
- Do not merge the draft PR merely because syntax/CI passes; manual behavior testing is still required.

## Minimum manual smoke test

Before a production merge, verify:

- home page and navigation;
- document search/filtering;
- document detail opening and in-document search;
- official-source links;
- dark/light theme;
- workspace save/load and notes;
- procedure progress;
- case screening;
- imported document flows;
- mobile navigation;
- browser refresh with existing local data.
