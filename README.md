# SkyFire SDS

**Status: private-branch v0.1 functional demo implemented (D-052); NOT merged or deployed.** This remains a discovery/prototype project, not a production SDS management application or mine HazCom system.

SkyFire SDS is a proposed offline-ready Safety Data Sheet and chemical inventory management product for mining operations. The goal is fast, no-login access to approved chemical safety information for workers, alongside a controlled administrator experience for managing source documents, discrepancies, changes, printable labels, and site inventories.

## Start here

- [Product Charter & Decision Register](docs/DECISION_REGISTER.md) — **13 sections** copied from the original Drive source, retaining confirmed decisions, working recommendations, open questions, and deferred ideas.
- [Approved v0.1 Prototype Scope](docs/V0_1_SCOPE.md) — scope and tests approved; coding separately authorized under D-052 (no merge/deployment approval).
- [v0.1 prototype development branch](https://github.com/SkyFireEHSMining-dev/skyfire-sds/tree/prototype/v0.1-functional-demo/prototype) — navigable fictional browser demo, source and tests (not live hosted).
- [Implementation log](https://github.com/SkyFireEHSMining-dev/skyfire-sds/blob/prototype/v0.1-functional-demo/docs/V0_1_IMPLEMENTATION_LOG.md) — tests, scope boundaries and pending owner review.
- [Dedicated Thread Handoff](docs/THREAD_HANDOFF.md) — current status and exact starting point for a new SDS conversation.
- [Archived original handoff](docs/archive/ORIGINAL_THREAD_HANDOFF_2026-11-21.md) — verbatim-in-substance historical snapshot (as of November 21, before repository creation).
- [Documentation change log](docs/CHANGELOG.md) — migration notes and future updates.

## Product boundaries

- **SkyFire SDS:** SDS document management, approved worker library, chemical inventory, worker reporting, administrative verification, offline access, printable SDSs/binders and supplemental QR labels.
- **SkyFire Safety:** Public safety and regulatory references. Its old [lightweight SDS idea #18](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/18) is *historical context*, not the new product specification.
- **SkyFire Education:** Separate learning management system.
- **Lynx:** The preferred place to discuss inspection, incident, corrective-action and potential work-management features; no development commitment or integration has been assumed.

## Change-control rules

1. **CONFIRMED** = explicitly chosen by the product owner; **WORKING** = recommended but not frozen; **OPEN** = unresolved or requires verification/leadership decision; **DEFERRED** = held for later consideration.
2. Document decisions with dates and rationale. Do not silently turn recommendations into requirements or erase superseded decisions.
3. No real chemical inventory, personal media, credentials, mine-sensitive locations, or worker data should be committed here during discovery.
4. **No application code, deployment, purchasing commitment, or mine HazCom policy is authorized by establishing this repository.**

## Original planning sources

- [Original Google Drive decision register](https://docs.google.com/document/d/1N-HRrLrOuaWT_Ma1rNlNss1zoTdYZtzzEzeWLQ9_5Qw/edit)
- [Original Google Drive thread handoff](https://docs.google.com/document/d/1RDhhPzMsYnklu4Ae5MzxrXyvB5J7cLV7N6P7xmu3PAs/edit)
- [SkyFire SDS discovery folder](https://drive.google.com/drive/folders/1CdgSKOpJZoYj2IxmwF70jpviSm4p8lD0)

**Next milestone:** product-owner navigation and usability review of the fictional v0.1 prototype; any merge into `main` and any deployment require separate approval.
