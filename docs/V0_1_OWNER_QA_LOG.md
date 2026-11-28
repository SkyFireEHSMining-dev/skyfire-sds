# SkyFire SDS v0.1 — Owner Functional Acceptance Log

**Status:** IN PROGRESS — not final UI signoff or operational SDS approval
**Test platform:** Installed iPhone Home Screen web app, demo Field User role
**Test date:** November 28, 2026

## Test 1 — Worker chemical selection and document discoverability

**Evidence:** Owner-provided screenshots of the fictional Cinder Ridge Library and MX-42 Cleaner detail page in the project conversation. Screenshots are not uploaded to the repository to avoid personal-device metadata.

| Acceptance point | Result | Visible evidence |
| --- | --- | --- |
| Chemical selected from library and correct detail page opens | PASS | Library lists MX-42 Cleaner; detail page shows MX-42 Cleaner, ExampleWorks (fictional), Maintenance Shop. |
| Current SDS action is prominent | PASS (discoverability only) | Large blue **Open demo document** button, under Revision 2. Actual document opening/content is not yet tested. |
| Demo/non-operational information clearly identified | PASS | “DEMO ONLY” notice and “NOT A SAFETY DATA SHEET” warning visible. |
| Historical revisions are accessible without dominating screen | PASS (entry visible only) | **Version history** appears as secondary link beneath primary document card; expansion not yet tested. |
| Verification status and use authorization are distinct | PENDING | “Simulated verified” visible; chemical-use authorization is below screenshot viewport and not yet inspected. |
| Current/cached/last-sync state visible | PARTIAL | Illustrative sync time and “Online catalog (simulated)” visible; actual stale/offline behavior untested. |

**Result:** Chemical selection PASS; larger Test 1 verification IN PROGRESS until document-view behavior and authorization status are observed.

**Next owner action:** In MX-42 Cleaner detail view, tap **Open demo document**, verify that an unmistakably fictional document screen opens, then share screenshot. After that, expand Version history and scroll to view the separate use-authorization state.

**Boundaries:** All SDSs and chemical records are fictional; prototype receipt, authentication, revision and offline sync are simulations. No live hazard communication, real mine data or production compliance acceptance.

