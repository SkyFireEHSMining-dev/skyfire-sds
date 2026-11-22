# Documentation change log

## 2026-11-22 — Decision D-023: cross-site product master and assignment model

- Product owner approved a **single controlled master record per verified manufacturer/product identity**, with independent site/work-area assignments and use-authorization status.
- Require exact identity checks and cross-site duplicate review; near matches stay unresolved and must not auto-merge.
- Updated handoff to resume at correct manufacturer SDS/document verification.
- Documentation-only discovery update; no application code, hosting or operator HazCom policy authorized.

## 2026-11-22 — Decision D-022: new-chemical administrator triage

- Product owner approved **mandatory administrator safety triage** as the first review step for newly reported chemicals.
- Recorded the confirmed use-status choices and exposure/urgent-escalation considerations in the decision register; kept operator-controlled stop-work, chemical-use approval and detailed notification policy unresolved.
- Updated the dedicated-thread handoff to resume with product identification and duplicate checks for fictional report SDS-0001.
- Documentation only: no application code, deployment, real mine data or prototype authorization.

## 2026-11-22 — Repository initialization and source migration

- Product owner created the **private** `SkyFireEHSMining-dev/skyfire-sds` GitHub repository with a README. No application code exists.
- Migrated the two existing, individually grounded Google Drive documents into Markdown while preserving their substantive text, headings, status labels, original links, and the 13-section decision register's **7 explicit open questions**.
- Added a current thread handoff that reflects the repository's creation while retaining the original handoff under `docs/archive/` for historical accuracy.
- Updated README with scope, status labels, privacy boundaries, source links, and a one-step resumption plan.
- This migration does **not** approve development, settle working/open decisions, change the existing SkyFire Safety backlog, establish mine-wide policy, or publish SDS data.

**Source versions read during migration:**
- Google Drive decision register `1N-HRrLrOuaWT_Ma1rNlNss1zoTdYZtzzEzeWLQ9_5Qw`, revision `AHj4eMTY8N9HVyYjF4K6KJXc7mKM6B3LkOa-FRxJdq43GvGU5Pzk8_g-eV7yk6Y9B7sHP-RwxlYcztVlJkEeZi1dakExPjlD9jM4qq4oqnBy`
- Google Drive thread handoff `1RDhhPzMsYnklu4Ae5MzxrXyvB5J7cLV7N6P7xmu3PAs`, revision `AHj4eMQLeP4CCQe4A_yIWq5ePzuZuPBajVmGf3gWztxAcuU_ff_tTkD4SabjEj1CXXSYg9d3o2lr4nOQcMfSOpG8jyi88iaNuSgnRAWDduK8`

## Updating this register in future

Record dated decisions and their status in the decision register, list unresolved work explicitly, update this log, and keep source/history notes. If a decision changes, mark the prior decision as superseded instead of quietly erasing it.
