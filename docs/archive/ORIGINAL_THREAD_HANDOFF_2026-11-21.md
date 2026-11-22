# SkyFire SDS — Dedicated Thread Handoff

> **Archival copy:** Wording reflects the November 21, 2026 source document, before repository creation. The current handoff is [docs/THREAD_HANDOFF.md](../THREAD_HANDOFF.md). Original: [Original Google Drive thread handoff](https://docs.google.com/document/d/1RDhhPzMsYnklu4Ae5MzxrXyvB5J7cLV7N6P7xmu3PAs/edit).


*Discovery v0.1 • November 21, 2026 • Start a new thread with this document and the master decision register*

## Source of truth

MASTER REGISTER: https://docs.google.com/document/d/1N-HRrLrOuaWT_Ma1rNlNss1zoTdYZtzzEzeWLQ9_5Qw/edit

DISCOVERY FOLDER: https://drive.google.com/drive/folders/1CdgSKOpJZoYj2IxmwF70jpviSm4p8lD0

The master register is a comprehensive, 13-section consolidation of our discovery. Do not start from scratch, infer that every suggestion was approved, or silently replace the latest documented decisions with an old lightweight SDS tracker concept. This handoff is only an orientation; the register is authoritative for all details.

## Context and product boundary

SkyFire SDS is intended as an independent, complementary chemical inventory/Safety Data Sheet management product alongside SkyFire Education LMS and the existing SkyFire Safety v0.19 public field reference. Lynx is preferred for inspections, incidents and possible future maintenance/work coordination where the actual Lynx roadmap permits. The user prefers to partner rather than compete with Trevor and Matt. No repo, production database, SDS content, or code has been created.

## Established worker and management requirements

WORKERS: No-login approved SDS lookup; search product/name/manufacturer, scan printed supplemental QR, browse by site/work area; exact manufacturer PDF accessible offline after sync; support personal phones and shared/company devices plus paper binders; no personal device requirement. Avoid releasing chemical inventory details unnecessarily to the open web.

MANAGEMENT: Authenticated upload and review of chemical/SDS records, controlled revisions, publication, site/work-area assignment, audit trail, printable original PDFs, printable QR labels with stable IDs, binder generation and a clear gap dashboard. A stale review date is not a legal SDS 'expiration' date.

REPORTING: Workers can flag an existing SDS discrepancy or submit a new chemical by either (1) adding basic details/evidence for admin verification or (2) flagging an unknown/missing product and requesting investigation. Allow photos/videos. Reports enter an admin queue; only verified published SDS records enter the general worker catalog. Reporter and designated reviewers can track the pending item. All workers see published SDSs and relevant verified safety alerts, not every draft.

IDENTITY: Worker reports are associated with an authenticated individual so the name is captured automatically; ordinary SDS viewing remains login-free. Shared device and offline submission behavior require further design. Offline report drafts must not look submitted until acknowledged by server. Urgent hazards must be reported via operator procedure, not solely through software.

NOTICES: Admin alerts on discrepancies/new items; in-app worker updates when hazard information matters. Opt-in push is desired but not an approved initial build requirement. New chemical information is not automatically permission to use the product or proof that training occurred.

## Important safety and scope guardrails

Do not replace original manufacturer SDSs with AI-generated summaries or arbitrary close chemical matches. A QR code is supplemental, not a substitute for regulated chemical labeling. The product is not itself proof of MSHA Part 47 compliance. The operator determines written HazCom program, labeling, training, required access/fallback, approvals and real-world use. Separate 'document verified' from 'chemical approved for use' in discovery, without inventing an operator policy.

Protect administrative edits and worker-submitted attachments. Worker no-login lookup does not automatically authorize exposing mine-specific inventories, equipment or sensitive work locations publicly. Select secure data storage, roles, backups, licensed file hosting, offline sync and retention after planning—not by defaulting to public GitHub Pages for production records.

## Still open — do not assume decided

Administrator review/publish steps and permissions; worker account enrollment and SSO vs Education; offline library selection/sync cadence and failure handling; roles and chemical-use approval distinctions; notification targeting/escalation and push architecture; printed binder synchronization; retention/regulatory verification; hosting cost and data/privacy controls; scope of prototype vs production.

## Where to resume

Begin with ONE fictional new chemical reported in a maintenance shop. Walk through administrator receipt, product identity verification, matching manufacturer SDS, detecting duplicates, disposition/rejection or publication, required worker alert and synchronization to offline worker devices. Ask for a decision on the next real uncertainty, no more than one or two steps at a time.

After the administrative workflow is agreed, scope the smallest safe v0.1 prototype, then discuss repository creation, implementation authorization, testing and hosting. Preserve the older SkyFire Safety issue #18 as historical lightweight SDS concept; don't automatically close or migrate it until the user approves.

## Suggested opening message in the new thread

Continue SkyFire SDS discovery using the approved decision register here: https://docs.google.com/document/d/1N-HRrLrOuaWT_Ma1rNlNss1zoTdYZtzzEzeWLQ9_5Qw/edit . Read it first, distinguish confirmed decisions from proposals and open questions, and resume with the administrator workflow for a newly reported chemical. We want the worker experience to remain login-free for viewing approved SDSs, support offline access, QR codes and printing, and provide authenticated reporting and review. Do not create code or a production system yet; guide one decision at a time.
