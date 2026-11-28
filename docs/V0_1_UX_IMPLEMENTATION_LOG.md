# SkyFire SDS — v0.1 UX Comparison Build Log

**Status:** Functional prototype redesign implemented in an isolated branch; not final design approval.  
**Authorized by owner:** November 28, 2026 — owner approved the Inbox → Report → Triage direction and requested a navigable version for feedback.  
**Development branch:** `prototype/v0.1-ux-redesign`.  
**Review URL (after successful Pages deployment):** https://skyfireehsmining-dev.github.io/skyfire-sds/ux-preview/  
**Previous live demo remains at:** https://skyfireehsmining-dev.github.io/skyfire-sds/

## Scope completed

- Reorganized Admin queue into a **Reports Inbox**, **Report Summary**, and **focused Initial Safety Triage** screens.
- Current and closed fictional report groups have distinct filter controls; each report displays a status and work area.
- The report summary highlights the original worker observation, the reporter-versus-account distinction, and separate **site chemical-use authorization**.
- Initial triage and its notes are in a focused step. Resolution stays unavailable until triage is recorded. Resolving still does **not** authorize chemical use.
- Moved **Supervisor triage delegation** to **Admin Settings / Permissions** instead of the report detail page.
- Updated demo navigation by role: Field User has Library/Reports; Supervisor has Library/Reports/Team; Admin has Library/Inbox/SDS/Updates/Settings.
- Added a coherent SkyFire typography and responsive style layer for the new pages, while retaining original phoenix, light blue-gray palette, existing worker SDS viewer, and the **DEMO ONLY** warnings.
- Existing demo data remains fictional and volatile. No authentication, actual chemical/safety operations, persistent reporting, or genuinely delivered notifications.

## Acceptance objectives for owner review

1. On an iPhone, opening Inbox should reveal what needs review without a long scroll.
2. Tapping R-001 should open the **report summary**, which immediately shows the observed concern and use-authorization status.
3. **Review & record triage** should open its own short workflow, with clear next action.
4. Recording triage should unlock the demo disposition step. Resolution should never imply chemical-use approval.
5. **Settings** should hold delegation controls separately.
6. Role changes should not reveal admin controls to Field Users.
7. On a shared-tablet viewport, inbox and selection summary should be usable side by side.
8. Existing worker library, report creation, mock document viewer, offline simulation, and safety disclaimers should remain intact.

## Developer checks

- Parsed the transformed application JS successfully.
- Dynamic V8 DOM-stub walkthrough **passed**: field/admin nav, filtered inbox, report selection, use-authorization label, triage gate, triage recording, demo resolution without authorization change, permissions under Settings, and worker access after switching roles.
- Added `prototype/tests/ux-workflow.test.mjs` to the branch. This plus existing suite is **not a substitute for owner iPhone acceptance**; full Node suite execution is not independently confirmed in this environment.
- CSS and mobile layout require hands-on review of the published preview. Do not claim a browser/device pass before testing.

## Release boundary

The current root GitHub Pages demo must remain unchanged. Publish the redesign **only as a separate `/ux-preview/` subfolder** within the preview branch and do not merge the redesign into `main` or overwrite the existing Pages root application. Public demo access is already approved, but no production SDS data or operational use is authorized.

**Decision pending:** Owner compares the old and new experiences and decides which changes to retain or revise. Final UX signoff follows that comparison, not this implementation.
