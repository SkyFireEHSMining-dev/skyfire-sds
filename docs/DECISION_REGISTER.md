# SkyFire SDS — Product Charter & Decision Register

> **Archival migration note (November 22, 2026):** This is a faithful paragraph-level Markdown copy of the November 21 Google Drive discovery record, not a revised requirements approval. References below to a repository not yet existing describe the **historical situation**; the owner has since created the private `SkyFireEHSMining-dev/skyfire-sds` repository. See [THREAD_HANDOFF.md](THREAD_HANDOFF.md) for current status. The original Drive document remains preserved: [Original Google Drive decision register](https://docs.google.com/document/d/1N-HRrLrOuaWT_Ma1rNlNss1zoTdYZtzzEzeWLQ9_5Qw/edit).


*Discovery v0.1 • November 21, 2026 (Pacific) • Planning only — no SDS code or repository created*

## 1. Purpose and status legend

This is the durable source of truth for the SDS-management concept developed in the SkyFire Safety sprint conversation. Carry the entire register into a dedicated SkyFire SDS project thread. The user asked for accurate continuity across chats and a future separate GitHub repository. This file records confirmed direction separately from CTO recommendations and unresolved design choices.

CONFIRMED = user explicitly agreed or described the requirement; WORKING = discussed design direction not yet frozen; OPEN = requires decision, technical/legal verification or mine leadership input; DEFERRED = intentionally not in the initial scope. Nothing in this document authorizes deployment, production use, a new repository, or mine-wide HazCom policy.

## 2. Mission and SkyFire product boundaries

CONFIRMED: Build a dedicated SkyFire SDS system complementary to SkyFire Safety (public/offline field safety references) and SkyFire Education (separate learning management system already underway). The user values independent modules but wants miners to experience convenient, simple access. Keep official mine work management, inspections, incidents, hazard findings, corrective actions, JHAs, work permits and coordination aligned with Lynx when Trevor and Matt elect to implement them; do not duplicate systems or imply Lynx has committed to a delivery date. Trevor/Matt reportedly do not plan to build an SDS or LMS product. Any later business partnership, integration or shared development is exploratory; respect Lynx IP/confidentiality and clarify ownership before collaboration.

CONFIRMED: The SDS system serves mine Safety/HazCom administrators and workers. Product/administration separation does not require separate worker-facing apps: one SDS product can provide a simple worker view and a controlled administration view. Do not assume a separate portal, unified SkyFire login, or Lynx integration is approved.

## 3. Worker access — confirmed direction

CONFIRMED D-001: Ordinary workers should be able to look up approved chemical information and view the actual SDS without individual login or routine cellular service. SDS access is read-only. Design for worker speed, simple navigation, exact chemical identity, and no invented AI-generated SDS/hazard substitutions.

CONFIRMED D-002: Support three lookup modes: product/manufacturer/name search; QR-code scan; browsing by mine site and work area. Provide a manual name/product-ID fallback when QR scanning or a network link fails. QR is a supplemental shortcut and must not replace required chemical hazard labels.

CONFIRMED D-003: Support both optional personal worker phones and company-owned shared devices/computers. Personal-device access is a practical startup bridge; move toward company-issued devices as operations grow. No miner should be required to provide a personal smartphone for required SDS access. Plan paper binder/shared-device fallback and accessibility when devices are missing, discharged or broken.

CONFIRMED D-004: Offline capability matters. Appropriately published SDS documents must be synchronized/downloaded before connectivity is lost, and a device should show its last successful sync. If an SDS is not cached, say so rather than promising offline availability. A QR code alone does not provide data offline. Design an appropriate update/reconciliation process and printed backup.

## 4. SDS lifecycle and administration

CONFIRMED D-005: Administrators can create/revise a chemical record, upload the exact original manufacturer SDS, associate it with relevant site/work areas, review and publish updates, and retain controlled document history. Avoid silently replacing content without traceability. The worker-facing approved library should not expose unreviewed submissions as if they were verified SDS records.

CONFIRMED D-006: Printing is a first-class feature. Allow printing original SDS PDFs, printable product QR-code labels, and organized site/work-area SDS binder packages or indexes for physical backup. Use stable product IDs/links rather than encoding a particular PDF revision in the QR code, so updated approved SDSs do not require every code to be replaced.

CONFIRMED D-007: Management needs an actionable gap dashboard: missing SDSs, product/label mismatches, new document revisions requiring review, unassigned/uncertain work area, duplicate or unidentified products, and unresolved worker reports. Each gap should lead to its underlying record and next review action. Do not label an SDS 'expired' based solely on age or claim that an overall green dashboard proves legal compliance.

WORKING D-008: Distinguish 'SDS/product document verified' from 'chemical approved for use by the mine.' The company's chemical-purchasing/use approval process and authority still require operator leadership decisions. Drafting a record, possessing an SDS, and approving chemical use are not equivalent states.

**CONFIRMED D-022 (2026-11-22) — Mandatory administrator safety triage for newly reported chemicals.** When a new-chemical report enters the administrator review queue, an authorized reviewer must complete and record initial safety triage **before routine product/SDS verification**. The triage captures reported use status (**currently being used**, **present/stored but not known to be in use**, or **unknown—field verification needed**) and considers potential worker exposure and whether immediate supervisor/Safety communication or field follow-up is needed. An unknown use status is not evidence of no exposure. For potentially urgent hazards the interface must direct timely real-world notification/escalation, rather than leave workers relying only on a digital report. Keep an auditable triage outcome associated with the report. This is a **software workflow requirement**, not a decision about mine-wide chemical-use approval, stop-work thresholds, or escalation ownership; those operator procedures remain **OPEN** under Q-002 and Q-004. **Rationale:** identify active exposure risks early while keeping SDS document review distinct from operational hazard response and authorization to use a chemical.

**CONFIRMED D-023 (2026-11-22) — One controlled master product record per verified manufacturer/product identity, with separate site and work-area assignments.** When a worker reports a chemical, the administrator compares manufacturer, exact product name, product identifiers and available label evidence with existing records, including records associated with another mine site. A verified same-product match reuses the existing controlled master product record and its SDS version history rather than creating another master product record solely because the product is present at another site. Each site/work-area maintains its own assignment and independent operational authorization/use status; a verified SDS or record at Spirit Mountain does **not** automatically approve use at Quartette. Similar names, labels or potentially different formulations are only **possible matches**, never automatically merged; uncertain identity stays in a pending-review state. **Rationale:** avoid document duplication, keep revisions traceable across sites and preserve local operational control. The precise matching fields, reviewer authority and approval policy remain part of OPEN Q-002 and Q-006.

**CONFIRMED D-024 (2026-11-22) — One authorized administrator can verify an SDS for publication.** Before an SDS enters the approved worker-facing document library, one authorized administrator must document verification that the complete, unmodified manufacturer SDS corresponds to the exact identified product, using available manufacturer name, product name and identifiers/label evidence. Preserve the source SDS and document-control metadata (source, available issue/revision information, verification date and responsible reviewer) and retain version history rather than silently overwriting. If identity or document authenticity is unresolved, mark the submission pending clarification and do not present it as a verified published SDS. A **second administrator approval is not routinely required** to publish a successfully verified SDS. Whether particular discrepancies or significant revisions should trigger an additional reviewer is **OPEN**, not approved as an automatic rule. Document verification does not grant chemical-use authorization; operator approval authority remains OPEN under Q-002. **Rationale:** maintain traceability and product accuracy without an unnecessary mandatory two-person review bottleneck.

## 5. Worker gap reports and discrepancy review

CONFIRMED D-009: Workers should be able to identify gaps, mark an existing SDS or record for administrator follow-up, or report a new chemical missing from the library. Two explicit new-chemical paths: (A) supply basic product/manufacturer/location details, evidence, optional SDS and submit a proposed chemical entry for review; (B) flag an unknown or missing chemical with whatever information is available and let an administrator identify/add it. Either way the item enters an administrator review queue, not the published worker catalog.

CONFIRMED D-010: Workers may attach product/label photographs and video recordings, with optional context and work area. Reports should have an ID, date/status, assigned review owner, ability to request clarification, resolution record, and change/audit history. Photos/videos may capture sensitive people, equipment and sites, so plan controlled media access, size/retention rules and a nonpublic storage design.

CONFIRMED D-011: Ordinary workers should NOT see every pending/unverified chemical proposal or administrative edit. Approved chemical records/SDSs are available to everyone; pending submissions/discrepancies are visible to the submitting worker, authorized administrators and designated reviewers/supervisors. The worker can track their own report, and relevant safety warnings are communicated separately if immediate hazard information is needed. Do not let hidden review queues suppress necessary direct hazard communication.

WORKING D-012: Reporting is tied to a signed-in individual worker so name/contact can be captured automatically without redundant entry. SDS lookup remains login-free. Shared-device sessions must identify the actual reporting worker rather than attributing a report to the prior user. Authentication/enrollment specifics have NOT been chosen; shared identity with SkyFire Education is only a possible future integration.

WORKING D-013: Offline drafting of a discrepancy report may be supported, but it must display 'saved locally — not yet received' until the server confirms submission. A pending offline report cannot substitute for immediate supervisor/Safety notification of a serious hazard.

## 6. Notifications and workforce communication

CONFIRMED D-014: The user wants a notice system that alerts administrators to new chemical submissions/SDS discrepancies and can notify affected workers of newly added chemicals, important hazard changes or SDS updates when warranted. They also want to explore opt-in push notifications and perhaps app-wide notices. Notifications must be relevant rather than broadcasting every minor administrative edit.

WORKING D-015: Suggested hierarchy: administrator action alerts; important chemical hazard/SDS changes targeting affected areas or the mine as appropriate; routine publication/update notices in an in-app center or digest. Store notice history and read/acknowledgment metadata where legitimately needed. A notification is not proof that required training or other communication occurred; possible referral/assignment through SkyFire Education is future integration.

DEFERRED D-016: Push notifications are a later-phase candidate due to permissions, device/platform support, hosting, and inability to deliver fresh push alerts to disconnected devices. An in-app notification center and administrator review queue are preferred initial targets, subject to requirements review.

## 7. Safety, security, regulatory and record integrity boundaries

CONFIRMED D-017: Do not put passwords in front of ordinary SDS viewing. MSHA Part 47 focuses on providing timely SDS access; no blanket MSHA requirement to encrypt or password-protect each SDS has been established. Administrative write access must be protected to avoid accidental/malicious record changes. Do not automatically publish site-specific detailed inventories, quantities, private attachments or restricted locations to the open internet.

CONFIRMED D-018: The system must provide exact manufacturer/product SDSs, no false confidence about unverified records, no AI-authored replacement SDSs, and original-PDF integrity. Confirm MSHA 30 CFR Part 47 requirements (written HazCom program, chemical list cross-reference, access, update and retention) and any applicable OSHA requirements as part of legal/regulatory QA before build or production claim. Electronic access does not remove the operator's training, labeling or contingency obligations. An SDS is not universally 'expired' after a fixed number of years.

WORKING D-019: Use an authoritative, backed-up management source with approved offline copies on worker devices and printable backups. Repository hosting and a working UI prototype are not in themselves secure production SDS record storage. Choose appropriate hosting, access control, backups, offline sync, change audit, media storage, and privacy controls in technical discovery. Validate SDS redistribution/licensing before broad public hosting.

## 8. Multi-site and interoperability

WORKING D-020: Support distinct mine sites and chemical use areas from the beginning (Quartette and Spirit Mountain are proposed initial examples), including an approved product potentially used at more than one location. Do not assume actual inventories or company-approved workflows exist yet.

WORKING D-021: Lynx remains preferred for inspection/incident/corrective-action/work coordination, subject to Trevor/Matt's real product commitments; do not create a competing mine work-management system from this project. SkyFire SDS handles SDS document-quality reports internally; genuine workplace hazards may later be linked to Lynx actions. Training-related changes may later link to Education. These are future integration concepts, not committed APIs.

## 9. Data objects and states — candidate schema, NOT finalized

Candidate entities: Site; Work Area; Chemical/Product (stable ID, exact name, manufacturer and identifiers); Controlled SDS Version (source, file/hash, issue/revision data and approval); Inventory Assignment (site, area, perhaps quantity later); Supplemental QR Label; Worker Report/Discrepancy (submitter, evidence, received status, review/closeout); Notification/Acknowledgment; Audit Entry; Device Sync State; Printed Binder Manifest. These are planning constructs pending minimal first-version scoping.

Suggested lifecycle: Worker report or admin draft → Pending review → Identity/document verified → Published to worker catalog → Synced to devices / added to print distribution. A rejected/duplicate submission retains a documented resolution rather than vanishing. 'Published SDS' is not automatically 'approved for use'.

## 10. Scope boundaries and unmade decisions

OPEN Q-001: Which organizational identity/roles administer chemicals? Is a named, authenticated worker report mandatory or can trusted temporary/contractor users report? How does no-login public worker access coexist with protected site data?

OPEN Q-002: Minimum verification/publish workflow: who can verify product identity/SDS authenticity, approve publication, request revision, and identify a chemical as permitted for use? Do not decide mine-wide operating policy without mine leadership.

OPEN Q-003: What does 'always available offline' mean operationally? Which sites/areas are cached, maximum library size, media/offline upload limits, re-sync intervals, device-loss response, printing/binder update procedures?

OPEN Q-004: Notifications: exact triggers, affected audiences, push vs. in-app priorities, acknowledgment obligations, supervisor escalation, and whether a chemical addition triggers training. Company site policy still needed.

OPEN Q-005: Technical hosting and vendor choices, secure central database/file store, role-based access, backup/restore, security review, retention and estimated ongoing cost. Avoid promising free enterprise hosting before evaluation.

OPEN Q-006: Product schema/permissions for site inventories, labeling details, restricted locations, external contractors, chemical disposal/record archiving; verify applicable retention/regulatory interpretations with authoritative sources.

OPEN Q-007: Define smallest usable v0.1 prototype, actual mock data, worker interface and admin interface, acceptance tests, implementation milestone, and repository governance. Do not deploy or enter mine data during early prototyping.

DEFERRED: Automatic web-wide SDS scraping, AI-generated SDS summaries, broad QR code replacements for regulated labels, purchasing workflows, full Lynx integration, SSO across SkyFire apps, server push, enterprise analytics and generalized EHS suites until separately scoped.

## 11. Required acceptance principles before eventual mine use

Use complete verified SDS PDFs; prove a worker can search and retrieve an approved SDS on iPhone and shared tablet completely offline after sync; prove QR label lookup and printed fallback; verify administrator-only editing and version audit; verify that worker drafts remain outside approved public catalog; verify exact report attribution on shared devices; verify notification targeting and correct offline/pending messages; simulate document replacement and ensure stale-device indicator and print binder update notice; test backup and recovery. Operational training, labeling and other legally required access must remain established outside the software itself.

## 12. Provenance and continuity

This register consolidates design statements from the SkyFire Safety project conversation as of November 21, 2026. It is a design record, not a verified law memorandum or completed software requirements specification. Related SkyFire Safety GitHub backlog: issue #18 lightweight SDS tracker (older design that this replaces conceptually), #16 Chemical & Hazmat, #17 ERG, and #13 architecture guardrails. Keep their existing history intact until a formal migration decision. SkyFire Safety current production v0.19 Beta; SkyFire Education LMS is independently under development.

GitHub issues: https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/18 | https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/16 | https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/17 | https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/13

Next conversation: verify this charter, then walk through the exact administrator workflow for a newly reported chemical, from pending report through identity verification, document control, publication and worker notice. Only then choose an MVP, technical architecture and build authorization.

## 13. Change-control rules for future sessions

Treat this document as the working decision register. Whenever the user agrees to a change, add a dated decision with CONFIRMED/WORKING/OPEN status and rationale; preserve superseded decisions rather than silently rewriting history. A recommendation made by the assistant alone is not an approved requirement. Keep the final release/implementation record separate from discovery notes. A separate GitHub repository is recommended, but has NOT been created by this discovery; migrate this document and handoff to that repository once created.
