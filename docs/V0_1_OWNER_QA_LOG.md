# SkyFire SDS v0.1 — Owner Functional Acceptance Log

**Status:** IN PROGRESS — not final UI signoff or operational SDS approval
**Test platform:** Installed iPhone Home Screen web app, demo Field User role
**Test date:** November 28, 2026

## Test 1 — Worker chemical selection and document discoverability

**Evidence:** Owner-provided screenshots of the fictional Cinder Ridge Library and MX-42 Cleaner detail page in the project conversation. Screenshots are not uploaded to the repository to avoid personal-device metadata.

| Acceptance point | Result | Visible evidence |
| --- | --- | --- |
| Chemical selected from library and correct detail page opens | PASS | Library lists MX-42 Cleaner; detail page shows MX-42 Cleaner, ExampleWorks (fictional), Maintenance Shop. |
| Current SDS action is prominent | PASS | Large blue **Open demo document** button under Revision 2; owner then opened the mock document viewer successfully. |
| Demo/non-operational information clearly identified | PASS | “DEMO ONLY” notice and “NOT A SAFETY DATA SHEET” warning visible. |
| Historical revisions are accessible without dominating screen | PASS | **Version history** expands as a secondary section; Revision 2 is latest and Revision 1 is explicitly superseded. Both open fictional previews (Test 3). |
| Verification status and use authorization are distinct | PASS | Subsequent owner screenshot shows **Verified fixture (simulated)** independently from **Use authorization unconfirmed** and explicitly says that document verification does not authorize use. |
| Current/cached/last-sync state visible | PARTIAL | Illustrative sync time and “Online catalog (simulated)” visible; actual stale/offline behavior untested. |

**Result:** Chemical selection, document/status discoverability and historical version access PASS. Offline/stale behavior remains untested.

## Test 2 — Open fictional manufacturer-document preview

**Evidence:** Owner-provided November 28, 2026 screenshots of the MX-42 record status and open fictional Revision 2 document modal.

| Acceptance point | Result | Visible evidence |
| --- | --- | --- |
| Current demo document opens from its prominent action | PASS | Responsive modal opens with **MX-42 Cleaner · Revision 2**. |
| Document is legible on phone | PASS (visual) | Text, fictional supplier, revision heading and explanation are legible at phone scale; no layout clipping observed in screenshot. |
| Document is unmistakably non-operational | PASS | Header reads **FICTIONAL DOCUMENT PREVIEW** and document prominently warns **DEMO — NOT A SAFETY DATA SHEET — DO NOT USE FOR HAZARD COMMUNICATION**. |
| Closing viewer and returning to record | PASS (observed navigation) | Owner returned from the Revision 2 modal to the detail page, expanded history, then reopened the viewer for different revisions. Exact choice of close control not established. |
| SDS verification and site-use authorization remain distinct | PASS | Separate card shows **Verified fixture (simulated)** and **Use authorization unconfirmed**. |
| True PDF display or full genuine manufacturer SDS | NOT IN SCOPE | This v0.1 is explicitly a mock fixture; no production PDF test is implied. |

**Result:** Test 2 document opening, demo labeling, and navigation back to record PASS based on screenshots; historical revision behavior PASS in Test 3.

**Next owner action:** Continue to worker reporting flow after Test 3.

## Test 3 — Version history and superseded document viewer

**Evidence:** Three owner-provided iPhone screenshots, November 28, 2026, showing expanded history on MX-42 Cleaner and fictional preview modals for both revisions.

| Acceptance point | Result | Visible evidence |
| --- | --- | --- |
| Secondary version-history control expands | PASS | Controlled version history appears below main document card, leaving primary current-SDS action prominent. |
| Current and superseded revisions distinguished | PASS | Revision 2: **Latest server record · 2026-11-20**. Revision 1: **Superseded · 2026-10-12**. |
| Latest revision opens from history | PASS | Modal shows **MX-42 Cleaner · Revision 2**, correctly marked as latest published demo revision. |
| Historical revision opens from history | PASS | Modal shows **MX-42 Cleaner · Revision 1**, labeled **Historical or cached demo revision**. |
| Mock documents remain clearly non-operational | PASS | Both modal previews retain the **DEMO — NOT A SAFETY DATA SHEET** warning. |
| Viewer navigation back to chemical page | PASS (observed) | The owner returned to detail page between views; exact close control used not demonstrated. |

**Result:** Test 3 PASS. Current document remains visually primary; history is available without obscuring its status.

**Next owner action — Test 4:** From MX-42 Cleaner detail page, tap **Report use or discrepancy** in the **Notice a problem?** card. Capture the worker report form *before submitting*. Next test will verify account-versus-reporter attribution and local-versus-received demonstration states; do not input real employee names or actual chemical records.

## Test 4 — Worker reporting form and navigation

**Evidence:** Owner screenshots from November 28, 2026, showing the MX-42 Cleaner worker report form at the top and lower portions, plus first-hand report that the form initially opened at the **bottom of the page**.

| Acceptance point | Result | Evidence |
| --- | --- | --- |
| Correct chemical and mine site carried into reporting | PASS | MX-42 Cleaner, ExampleWorks (fictional), and Cinder Ridge appear on form. |
| Report category and session type visible | PASS | Observed chemical use and Shared shop tablet are selected in simulation. |
| Shared-session reporter attribution | PASS (display) | Reporter name marked required; typed identity correctly described as self-reported rather than authenticated. |
| Site work area and optional context | PASS | Maintenance Shop is populated; additional details are optional. |
| Distinguish session account from reporting worker | PASS (display) | Separate labels for Account/session used and Person reporting. |
| Non-operational warning | PASS | Submission clearly described as an in-memory demo entry and not a real server report. |
| Navigation lands at top of the new form | **PASS — owner retest** | November 28 iPhone screenshots show **Report chemical use** at the top after tapping **Report use or discrepancy**; the owner explicitly confirmed the fix worked. |
| Submit receipt and offline draft handling | NOT TESTED | No report submitted during this check. |

**Fix (November 28, 2026):** Added a page-transition-specific scroll-to-top operation in `app.mjs` after rendering a new view, with a second requestAnimationFrame reset for iOS. The fix is limited to page transitions; in-page controls such as Version History do not reset scrolling. Updated the static app-script URL and service-worker cache namespace to fetch new JavaScript for the Home Screen PWA. Changes are committed to the development branch and public Pages preview branch.

**Retest (November 28, 2026): PASS.** Owner returned to the report form, provided screenshots of the heading at the top and the remainder of the form, and confirmed “Good fix, thanks.” Close scroll-position defect as resolved for the tested iPhone route. Other navigation paths remain subject to ongoing QA.

**Next acceptance check — Test 5:** In the **Online demo** reporting form, enter a **fictional reporter name** (for example, “Demo Miner”), leave work area as Maintenance Shop, optionally add a fictional note, then tap **Submit demo report**. Confirm the demo's reports view shows a simulated receipt while separately preserving the shared-session account and self-reported worker. **No real worker/chemical information.**

## Test 5 — Simulated online report submission

**Evidence:** Two owner-provided iPhone screenshots, November 28, 2026: one with a populated Shared shop tablet report form and one showing My demo reports after submission. The screenshot contains a real person's name, so **do not copy personal identity values or upload screenshots into this public repository**.

| Acceptance point | Result | Visible evidence |
| --- | --- | --- |
| Submit a new report for the selected product | PASS | New simulated report **R-002 · MX-42 Cleaner**, category Observed chemical use at fictional Cinder Ridge. |
| Track session separately from self-reported person | PASS | Report shows a populated Reporter field and **Session: Shared Shop Tablet** separately. Reporter name is self-reported, not verified authentication. |
| Report appears in list beside existing demo record | PASS | R-002 listed above R-001 without replacing it. |
| Simulated online receipt is unambiguous | PASS | **Received (simulated)** and **Demo receipt (simulated)** appear. Toast explicitly states no real administrator or server received it. |
| Retained or remotely delivered after refresh | OUT OF SCOPE | App says reports live in browser-tab memory and disappear on refresh; no production server or persistence. |
| Mobile width and text fit on Reports screen | OPEN — potential issue | Owner's second screenshot appears to clip some report text and upper-right header. Cause unconfirmed: screen zoom/pan versus responsive overflow. A local Chromium smoke test with the earlier layout at 375, 390 and 430 px showed no document overflow even with a longer fictional name; this does **not** reproduce or disprove an iPhone-specific issue. Capture a fresh unzoomed phone screenshot and confirm if horizontal scrolling is possible before changing production styles. |

**Result:** Test 5 **PASS** for simulated online receipt and dual attribution. **Possible mobile clipping remains OPEN as a separate UX observation**, not an established application defect. Do not store actual employee names in this public GitHub documentation.

**Next owner action — Test 6:** With the simulated report still in memory, change **Role preview → Admin**, tap **Queue**, and view the newly submitted R-002 report. Verify the account/session and self-reported worker are both visible, along with the initial safety-triage controls. Do **not** submit another report or use real names.

## Test 6 — Administrator queue and iPhone horizontal clipping

**Evidence:** Owner screenshots, November 28, 2026, after switching role preview to Admin and opening Queue. The reports view and administrator queue include a real self-reported name; **do not upload screenshots or copy personal identity into this public QA log**.

| Acceptance point | Result | Evidence |
| --- | --- | --- |
| Role preview changes to Admin | PASS (simulation) | Role chooser shows Admin; confirmation explains no authentication occurred. |
| Newly submitted report available in administrative queue | PASS (list visibility only) | R-002 appears above the fictional R-001 with **Needs review**. |
| Admin record shows separate account and reporting worker | PARTIAL | The selected R-001 record displays both distinct fields. R-002 is listed but has not yet been opened in the admin detail pane. |
| Initial triage controls for the newly submitted report | PENDING | Not visible in submitted screenshots; must inspect selected R-002. |
| Header and demo warning fit the iPhone screen | **PARTIAL — functional, minor polish deferred** | Owner rechecked the two-row header and wrapping demo banner. A little clipping remains but is accepted for v0.1. Keep the demo-only warning visible. |
| Small-screen report text wraps cleanly | **PARTIAL — polish deferred** | Updated screenshot shows improved horizontal fit; owner accepts deferring residual clipping. Exact responsive fit remains a later QA item. |

**Mobile layout correction (November 28, 2026):** The app's original header arranged branding, role selector and online status side-by-side, while the warning used anonymous flex text that could overflow a narrow viewport. Updated the UI to a **two-row header on phone widths**, explicit wrapping of the still-visible **DEMO ONLY** warning, and wrapping of longer report labels/names. Retained the functional page structure, role settings, report receipts and safety disclaimers. CSS and app-shell asset URL/cache versions were updated in the prototype and Pages branches. Updated existing PWA/branding asset tests and added `prototype/tests/mobile-layout.test.mjs`. These tests are **committed but not independently executed yet**; the live deployment and owner visual retest must be checked separately.

**Owner follow-up (November 28, 2026):** The iPhone screenshots show the new two-row header and readable, persistent demo warning. The owner reports minor residual clipping but accepts deferring polish while this remains a fictional demo. **This is not final mobile UI design approval.** After reopening the demo, the Queue contains only seeded report R-001. The earlier R-002 no longer appears because in-memory demo reports reset on reload; this is a known v0.1 limitation, not actual persistent storage. R-002 administrator review remains untested.

**Next functional test:** Continue with R-001 for simulated administrative triage, or create a new fictional report without reloading to test new-report processing. Do not use real worker names.

## Test 7 — Notification lifetime (role-preview confirmation)

**Owner feedback (November 28, 2026):** The bottom "Role preview changed" notification remained visible indefinitely until X was tapped. Owner requests timed automatic dismissal of routine notifications and retention of X for immediate dismissal. Owner accepts minor screen clipping until a later visual-polish phase; the DEMO ONLY warning must remain while the product is not operational.

**Implemented — developer runtime smoke checked, iPhone user retest pending:**
- Routine informational notifications automatically hide after **6 seconds**.
- X still closes any notification immediately.
- Repeated notifications restart the countdown; an older timer cannot hide a newer notification.
- Error notifications (ARIA alert role) are persistent until the user dismisses them.
- No changes to SDS records, permissions, chemical-use authorization or demo report submission behavior.
- App script version: **skyfire-toasttimer-v1**. PWA app-shell cache: **v0.1-toasttimer-5**.
- Lightweight JavaScript runtime smoke test using fake timers passed role notification, repeat messages, expiration, X dismissal and error persistence. Regression test committed at prototype/tests/toast.test.mjs; full Node test-suite execution has not been independently verified.
- GitHub Pages build [46177128316](https://github.com/SkyFireEHSMining-dev/skyfire-sds/actions/runs/46177128316) completed successfully.

**Next owner action:** Toggle Role preview to Admin and watch the confirmation without tapping X. Confirm that it disappears after roughly six seconds. Afterward, continue the seeded R-001 Admin report safety-triage test.

**Boundaries:** All SDSs and chemical records are fictional; prototype receipt, authentication, revision and offline sync are simulations. No live hazard communication, real mine data or production compliance acceptance.

