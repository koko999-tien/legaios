# Permit Register

Permit Register is a nested part of each Hồ sơ tuân thủ. It is a work-tracking layer, not a legal-status engine.

## Data model

Each permit record stores:

- type and user-managed tracking status;
- title, number and issuing authority;
- issue date, expiry date and an internal review date;
- references to imported local files (ID + name only);
- links to obligation-register entries;
- conditions / follow-up notes;
- created / updated timestamps.

The legacy single GPMT fields remain readable for compatibility. A profile that has never had a `permits` array is migrated once into the new register. An existing empty `permits` array is respected and will not recreate deleted legacy data.

## Boundaries

- Dates are treated as user-declared tracking metadata until checked against the original permit.
- The app does not infer a statutory renewal deadline from a permit expiry date.
- File references in workspace JSON do not include the file bytes stored in IndexedDB.
- Creating an obligation from a permit seeds a review item; it is not a legal finding.
- Create/update/delete operations are written to the compliance audit trail and can participate in the existing undo flow.

## Runtime ownership

- `compliance-core.js`: normalization, legacy migration, calendar/task projection and permit snapshot undo.
- `permits.js`: Permit Register rendering/editor/actions.
- `compliance.js`: embeds Permit Register in the profile detail and includes it in Markdown reports.
- `workspace.js`: lazy-loads data-management actions; `assets/lazy/workspace-data.js` exports normalized profile data (including nested permits) under `ccplmt-workspace-v8`.
