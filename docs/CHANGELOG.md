# Documentation change log

## 2026-11-22 — D-032 confirmed: three roles and granular delegated supervisor permissions

- Product owner approved the three-role architecture **Field User, Supervisor, Admin** and permission-by-permission supervisor delegation instead of an all-or-nothing Admin elevation.
- Scoped, auditable and revocable delegation is confirmed as design direction; exact grantable permissions and baseline Supervisor actions are still OPEN.
- The earlier **WORKING D-032** entry below is retained as the previous status for traceability.
- Next discovery step: supervisor default visibility/action boundaries. No code, deployment, organizational assignments or operator chemical-use policy authorized.

## 2026-11-22 — Decisions D-030/D-031; working D-032: targeted notices and supervisor empowerment

- **D-030 confirmed:** Target newly published SDS and significant hazard-change notices by affected mine site/work area by default; authorized administrators can broaden audiences as safety requires.
- **D-031 confirmed:** Plan organization-aware signed-in profiles (site, department/work area, role and supervisor relationship), differentiated supervisor alerts, and administrator-delegated SDS management capabilities for supervisors. Preserve login-free approved SDS viewing.
- **D-032 working:** Owner floated three base roles (Field User, Supervisor, Admin). Proposed granular, revocable scoped permissions for selected supervisors rather than a blanket automatic admin elevation; exact permission schema and grant rules remain open.
- Advance discovery to supervisor permission delegation and notification boundaries. No code, mine-wide authority policy or deployment authorized.

## 2026-11-22 — Decision D-029: documented report closeout and worker feedback

- Product owner approved documenting a resolution outcome for worker-reported chemical use/status (verified use, not found, misidentified chemical, or further investigation needed; unresolved investigation stays open).
- Notify the reporting worker automatically upon actual resolution, without assuming notification delivery technology.
- Keep any unresolved site chemical-use authorization concern separately trackable when an observed-use report is closed; no implicit authorization or uncommitted Lynx integration.
- Next discovery step: worker notification targeting for new SDSs and significant hazard updates. Documentation-only; no application code or mine policy authorized.

## 2026-11-22 — Decision D-028: verify observed use before official status change

- Product owner approved retaining reported chemical use as **Observed use — pending verification** until an administrator verifies real-world presence/use before changing official site inventory or assignments.
- Keep verified inventory presence separate from the operator's chemical-use authorization. Record investigation and resolution history; unresolved reports remain trackable.
- Next step: agree on administrative disposition/closeout choices and worker feedback for observed-use reports.
- Documentation-only discovery; no mine use policy, code or deployment authorized.

## 2026-11-22 — Decision D-027: two-action worker status report

- Product owner approved a two-action worker flow: **Report chemical in use → Submit**, with prefilled product and known location, optional location correction, and optional notes/photos.\n- Admin receives an auditable review report only upon confirmed submission; worker reporting does not approve chemical use or silently change official statuses.\n- Individual reporting identity, shared-device attribution and offline submission/receipt semantics remain open per D-012 and D-013.\n- Next discovery step: admin review/disposition of a chemical reported in use. No code, deployment or operational policy authorized.

## 2026-11-22 — Decisions D-025 and D-026: access versus authorization; worker status reports

- **D-025 confirmed:** Keep verified SDS documents available to workers when site-specific permission to use the chemical is unconfirmed; clearly separate SDS verification/publication from chemical-use authorization.
- **D-026 confirmed:** Provide a quick worker action to report chemical use, location or status discrepancies for administrator review. Reports do not directly change use authorization; potentially unsafe situations route to safety triage and real-world escalation.
- Keep workflow details (worker sign-in, offline reporting, reviewer ownership, precise form fields and status categories) open for further design. Advance discovery to the low-friction worker reporting interaction.
- Documentation only; no code, mine-wide use policy, deployment or real mine data.

## 2026-11-22 — Decision D-024: single-administrator SDS verification

- Product owner approved one authorized administrator as sufficient to verify the correct manufacturer SDS before its publication; routine second-person approval is not required.
- Recorded traceable product/document matching and controlled revision history; unresolved matches remain pending, with discretionary review exceptions still open.
- Next discovery step is separation of worker document availability from site-specific chemical-use authorization.
- Documentation-only decision; no code, deployment, chemical-use policy or production-data approval.

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
