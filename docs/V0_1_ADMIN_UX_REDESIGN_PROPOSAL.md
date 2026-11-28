# SkyFire SDS — Administrator UX Redesign Proposal

**Status:** OWNER APPROVED DIRECTION FOR PROTOTYPING (November 28, 2026); final visual layout approval still pending hands-on testing.  
**Date:** November 28, 2026  
**Source:** Owner's installed-iPhone v0.1 review; source code `queueView()`.

## Problem

The current Queue page stacks the report inbox, report identity, observation, triage, disposition, audit history and supervisor delegation into one long mobile page. Typography and status emphasis vary. The owner reports difficulty scanning and identifying the next action, despite the value of the underlying information.

## Proposed design direction

**SkyFire look, task-oriented organization:** Retain the established SkyFire Safety/Education colors and readable white surfaces. Use more consistent hierarchy, purpose-based navigation and progressive disclosure.

**Mobile: Inbox → Report → Triage**
1. **Inbox:** Show short actionable cards, prioritized by status/safety significance; simple filter labels such as Needs Review / In Progress / Closed. Tap one report to open detail.
2. **Report detail:** Display a concise summary first: product, site/work area, current report state, worker observation and visible unresolved chemical-use authorization. Account/session and self-reported worker remain separately identified. Display the prominent **Review / Record triage** action and a secondary audit-history control.
3. **Triage / resolve:** Present the focused safety-triage dropdown and notes, followed by an explicit action. Only after required triage should disposition/resolution become available. Resolution never grants chemical-use authorization.

**Admin Settings** handles supervisor permission delegation, not the bottom of an unrelated report detail page.

**Worker navigation** prioritizes SDS Library and My Reports; **Admin navigation** prioritizes Inbox, Chemicals/SDS, Distribution and Settings. Don't surface all privileged modules equally to ordinary field workers. Demo-only role preview remains possible for testing.

**Tablet/Desktop:** Inbox and report detail may be side-by-side. Mobile uses focused pages to avoid long stacked panels.

## Visual hierarchy

- Clear, consistent page title.
- Consistent section headings and body/metadata sizes instead of many unrelated font scales.
- One primary next-step action per workflow stage; secondary actions visually quieter.
- Status labels indicate what matters, without relying on color alone.
- Display important hazard/authorization information before optional details.
- Keep the DEMO ONLY warning while the prototype is fictional; later production release may remove it only after actual operational readiness and approval.

## Conceptual mobile sequence (not an approved UI)

```
Admin / Reports
Needs review (1) | In progress | Closed
R-001 · MX-42 Cleaner       Needs review
Cinder Ridge · Maintenance Shop
[Open report]

R-001 · MX-42 Cleaner
Use authorization: Unconfirmed
Observed in maintenance shop
Reporter: Demo Worker
Session: Shared Shop Tablet
[Review / Record triage]
[Audit history ▾] [Other details ▾]
```

## Product and safety controls to preserve

- Manufacturer document verification is never the same as permission to use a chemical.
- Unresolved hazards, required safety triage, and urgent field communication cannot be buried behind optional menus.
- Preserve reporter/session distinction, original observations, timestamps, audit trail, and honest online/offline report state.
- Acknowledging, triaging or resolving an issue must not silently authorize use.
- Keep critical information accessible, contrast readable, and touch controls practical on iPhone and shared shop tablets.
- Do not include live mine, chemical or worker information in the fictional prototype.

## Suggested acceptance checks after scope approval

1. User can identify the report requiring attention and the next action immediately.
2. Inbox selection opens an individual mobile report without a long scroll.
3. Triage, notes and resolution stay functionally equivalent; prerequisites still enforced.
4. The account/session and self-reported worker remain separate.
5. Permission delegation is in Admin Settings rather than attached to each report.
6. Worker SDS lookup and reporting remain simple.
7. No horizontal overflow on iPhone or shared tablets.
8. Current v0.1 QA behaviors remain intact, including demo warnings and separate authorization.

**Stage gate update:** The owner authorized implementation of this working direction on November 28, 2026. A functional comparison was implemented on a separate development branch, with an isolated public UX preview planned. No final design approval, production data integration or merge into the existing root application is implied. See [UX Implementation Log](V0_1_UX_IMPLEMENTATION_LOG.md).
