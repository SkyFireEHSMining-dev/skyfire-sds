# SkyFire SDS — Dedicated Thread Handoff (current)

**Project phase:** Discovery; documentation migrated November 22, 2026. **Private repository created by owner; no application code, production database, mine SDS content, deployment, or approved implementation sprint.**

## Read these in order

1. [Product Charter & Decision Register](DECISION_REGISTER.md) — the complete 13-section source, with **CONFIRMED**, **WORKING**, **OPEN**, and **DEFERRED** statuses retained.
2. [Original handoff snapshot](archive/ORIGINAL_THREAD_HANDOFF_2026-11-21.md) — historical detail and the earlier start-of-thread message.
3. [Original Google Drive decision register](https://docs.google.com/document/d/1N-HRrLrOuaWT_Ma1rNlNss1zoTdYZtzzEzeWLQ9_5Qw/edit) and [Original Google Drive thread handoff](https://docs.google.com/document/d/1RDhhPzMsYnklu4Ae5MzxrXyvB5J7cLV7N6P7xmu3PAs/edit) — original Google Drive copies, retained separately.

## Current direction (source-derived summary, not new approvals)

- **Separate and complementary products:** SkyFire SDS for chemical/SDS records, SkyFire Education for learning, SkyFire Safety for public field safety reference; avoid building a rival Lynx work-management platform. Any collaboration/integration is a future discussion.
- **Worker experience:** Read approved, exact manufacturer SDS documents without individual login; find them by name/manufacturer search, supplemental QR code, or site/work-area browse. Support offline copies after successful sync, personal and company devices, and printed SDSs/binders. No worker should be required to own a phone.
- **Administration:** Authorized users manage actual PDF uploads, revisions, approved publication, site/work-area associations, printable QR labels and physical binders, and actionable missing/inconsistent-document indicators. Never imply an unverified record is a verified SDS or that a verified SDS automatically authorizes chemical use.
- **Worker reports:** Flag an existing discrepancy or report a missing/new chemical through two paths (propose basic product information, or flag for administrator identification). Permit photos/video. Keep pending submissions with the reporter and authorized reviewers rather than showing every draft publicly. Worker account/identity for reporting is a **WORKING** design, with enrollment and shared-device security still OPEN; ordinary SDS reading remains login-free.
- **Notifications:** Administrative review alerts and worker-facing chemical hazard/update information are desired; targeted in-app notices are a working starting point. Push notifications are a later-phase exploration, not a currently approved build deliverable.
- **Operational safeguards:** Maintain correct original documents, no AI-generated replacement SDS, QR labels as a supplement rather than replacement for regulated labels, auditability, backups, and a reliable offline/paper fallback. Site/operator policies and detailed MSHA/OSHA compliance interpretation require separate verification; software is not itself proof of HazCom compliance.

## Confirmed November 22 decision and active discovery step

**CONFIRMED D-022:** Mandatory administrator safety triage is the first stage for every newly reported chemical. The reviewer records whether the chemical is **in use**, **present/stored not known in use**, or **unknown**, considers potential worker exposure, and directs prompt Safety/supervisor communication when warranted. Triage is not proof of chemical-use authorization and is not a substitute for the mine's real-world hazard response. Detailed escalation ownership and stop-work rules are not prescribed here.

**CONFIRMED D-023:** One master chemical/product record for each **verified exact manufacturer/product identity**; separate assignments and use-authorization status per mine site/work area. Search for duplicates across sites, but do not automatically merge potential matches or treat approval at one site as approval at another.

**CONFIRMED D-024:** One authorized administrator is sufficient to verify and publish a complete, correct manufacturer SDS with documented product match, provenance, reviewer, date and version history. Unresolved discrepancies stay pending; a routine second approver is **not** required. Whether exceptions mandate second review is OPEN. Document verification remains separate from operator permission to use a chemical.

**CONFIRMED D-025:** A verified SDS remains accessible in the worker library even when site-specific authorization to use that chemical has not been confirmed. Show **SDS verified** and **use authorization unconfirmed** as separate concepts; never imply document publication permits use.

**CONFIRMED D-026:** Workers should have a quick action on a chemical/SDS record to report **observed use, presence at a work area, or a wrong/uncertain status**. Prefill known product/location, allow brief optional context, and route to admin review without directly changing authorization. Potentially unsafe/unapproved use flows through D-022 safety triage; identity and offline submission constraints remain unresolved.

**CONFIRMED D-027:** Workers can report observed chemical use or a potentially incorrect status in **two actions:** select “Report chemical in use” from the chemical/SDS record, then “Submit” on a concise confirmation view. Prefill product/site/area where known, permit location correction, make notes/photos optional, and issue a receipt only after server confirmation. This is a pending administrator report, not an automatic change to authorization or inventory. Worker attribution and offline delivery remain unresolved.

**CONFIRMED D-028:** Worker-reported chemical use is immediately trackable as **“Observed use — pending verification”** and subject to safety triage, but an administrator must verify the actual product and location before changing an official inventory/site assignment record. Verified use is not itself proof of chemical-use authorization; that status remains subject to operator control. Keep audit and disposition history.

**CONFIRMED D-029:** Administrator closeout requires a documented investigation outcome, with cases such as verified use, not found, corrected product identification, or further investigation needed (which stays open). Upon actual resolution, automatically notify the submitting worker with a short outcome. Confirmed use with **unresolved site-use authorization** leaves a separately tracked concern even if the original observed-use report is closed; no automatic approval or silent disappearance. Exact escalation/notification channel is still OPEN.

**CONFIRMED D-030:** New SDS and material hazard-change notices target relevant **sites/work areas by default**, with administrator ability to widen the audience; avoid global notices for trivial edits. Supervisor notices may differ from field-worker notices. Notifications do not substitute for direct hazard communication or training.

**CONFIRMED D-031:** Signed-in user profiles should support **site, department/work area, role, and supervisor/reporting relationship** for differentiated routing and oversight. Admins should be able to grant supervisors selected SDS administrative functions; scope and exact grantable powers remain to be designed. Approved SDS lookup remains login-free.

**WORKING D-032:** The owner's suggested **Field User / Supervisor / Admin** three-role model with **individual delegated admin permissions** for supervisors is a candidate, not yet an approved fixed permissions matrix. Never infer corporate authorization to use a chemical from SDS app privileges.

**Next discovery step:** Agree on a **granular delegated supervisor permission model versus an all-or-nothing admin switch**. Present one proposed capability boundary at a time; do not choose site personnel hierarchy, mine policy, or build code.

## What remains undecided

Use the full register's **OPEN Q-001 through Q-007** for identity/access policy, review authority, offline sync and device scope, notice delivery, architecture/cost, retention and security, and the minimum viable prototype. Do not invent company-wide policy on behalf of mine leadership. Former SkyFire Safety issue #18 remains a historical lightweight SDS concept until an explicit migration decision.

## Resume the next thread here

Continue **one fictional maintenance-shop chemical submission** after the now-confirmed mandatory administrator safety-triage step: exact product identification, duplicate checks, the correct manufacturer SDS, rejection or approval, publication, affected-worker notice, and offline device/binder synchronization. Separate **document verification** from **approval to use a chemical**. Make one product decision at a time and update the register with date/status/rationale.

**No implementation until separately authorized.** Preserve this repo as private, documentation-only during discovery. Keep sensitive mine or personnel records out of GitHub unless storage/security requirements have been explicitly evaluated.

## Ready-to-use new-thread message

> Continue SkyFire SDS discovery from the private repository https://github.com/SkyFireEHSMining-dev/skyfire-sds. First review `docs/DECISION_REGISTER.md` and `docs/THREAD_HANDOFF.md`; the exact prior Drive planning is preserved. Distinguish confirmed decisions from working recommendations and unanswered questions. Resume with the administrator workflow for a newly reported chemical. Do not write app code or deploy yet. Guide one decision at a time.
