# Căn cứ Pháp lý Môi trường

Căn cứ Pháp lý Môi trường is a browser-based environmental compliance workspace and legal-research interface. Its product direction is task-first: profile the facility/project, identify branches that need verification, open the governing source, track work/deadlines, and monitor relevant legal changes. The current production site remains on the stable `main` branch while the V14 modular refactor is developed on `dev`.

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

The front end is split into ordered classic scripts. The legacy `app.js` has been retired:

```text
index.html
assets/css/app.css
assets/css/v14-product.css
assets/css/compliance.css
assets/css/oss-upgrades.css
assets/js/legal-data.js
assets/js/knowledge-base.js
assets/js/state.js
assets/js/import.js
assets/js/idb-resilience.js
assets/js/search-utils.js
assets/js/search-data.js
assets/js/search-runtime.js
assets/js/search-fuzzy.js
assets/js/ui-shell.js
assets/js/activity-workspace.js
assets/js/project-tools.js
assets/js/library.js
assets/js/procedures.js
assets/js/compliance-core.js
assets/js/permits.js
assets/js/compliance.js
assets/js/workspace.js
assets/js/legal-hub.js
assets/js/expert.js
assets/js/navigation.js
assets/js/oss-upgrades.js
assets/js/library-search.js
assets/js/classifier.js
assets/js/boot.js
```

`boot.js` connects the modules. Progressive enhancements, fuzzy search and IndexedDB resilience are declared explicitly in `index.html`; `navigation.js` no longer injects hidden runtime dependencies. `index.html` is the source of truth for the complete stylesheet and script order.

See [product priorities](docs/PRODUCT_PRIORITIES.md) for the current improvements, backup limitations and remaining release checks.

## Product model

The application deliberately avoids presenting automated screening as a legal conclusion.

- **Hồ sơ tuân thủ** stores facility/project context locally.
- **Sổ giấy phép** stores multiple GPMT/related permits per profile, including permit number, issuer, issue/expiry/review dates, original-file references, conditions and obligation links. Legacy single-GPMT fields migrate into the register.
- **Sổ nghĩa vụ** stores user-managed obligation status, legal source, structured Điều/Khoản/Điểm/Phụ lục references, owner, sourced/manual deadline and evidence references.
- **Lịch tuân thủ** renders user-entered/sourced dates plus projected occurrences for user-configured monthly, quarterly or yearly tracking. Completing a recurring period records history and advances the next due date.
- **Audit trail + Undo** records create/update/delete/toggle/recurring-period actions for profiles, permits, obligations and manual deadlines. The most recent undoable change can be restored from its stored snapshot.
- **Nhánh cần đối chiếu** maps declared signals to legal topics/documents that should be reviewed.
- **Cập nhật pháp luật** prioritizes documents using the active compliance profile, but does not claim that a document certainly applies.
- **Kho Thuật ngữ** includes common environmental abbreviations such as ĐMC, ĐTM, GPMT, CTNH, TNN, CTR, BĐKH, BOD/COD/TSS and related technical/legal terms.
- Dates such as a GPMT expiry are treated as user-declared tracking data unless independently verified from an authoritative source.
- Dossier review and screening results can be converted into a compliance profile instead of being re-entered.
- Workspace export schema `ccplmt-workspace-v8` includes compliance profiles, Sổ giấy phép entries, obligation-register entries, recurring cadence/history, manual/user-declared deadlines, file/evidence references and the compliance audit trail. Older workspace exports remain importable. Workspace v8 also carries quick notes, citation baskets, reading progress, interface preferences and the local recovery list; imported file bytes remain outside the JSON backup. Imported file bytes remain outside the JSON backup.

## Validation

The permanent validator is `.github/workflows/validate.yml`. The supporting checker is:

```bash
node tools/check-html.mjs index.html
```

It checks structural HTML assumptions, referenced local assets, JavaScript syntax, and selected security-regression conditions.

## Legal-data note

Structural refactoring does **not** certify the accuracy or currency of the built-in legal content. Legal-data verification is tracked separately in Issue #2 and should not be mixed into code-only refactor commits.

See `docs/ARCHITECTURE.md` for the migration plan and safety rules.
