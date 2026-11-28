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
| Historical revisions are accessible without dominating screen | PASS (entry visible only) | **Version history** appears as secondary link beneath primary document card; expansion not yet tested. |
| Verification status and use authorization are distinct | PASS | Subsequent owner screenshot shows **Verified fixture (simulated)** independently from **Use authorization unconfirmed** and explicitly says that document verification does not authorize use. |
| Current/cached/last-sync state visible | PARTIAL | Illustrative sync time and “Online catalog (simulated)” visible; actual stale/offline behavior untested. |

**Result:** Chemical selection and document/status discoverability PASS. Offline/stale behavior and expanding version history remain untested.

## Test 2 — Open fictional manufacturer-document preview

**Evidence:** Owner-provided November 28, 2026 screenshots of the MX-42 record status and open fictional Revision 2 document modal.

| Acceptance point | Result | Visible evidence |
| --- | --- | --- |
| Current demo document opens from its prominent action | PASS | Responsive modal opens with **MX-42 Cleaner · Revision 2**. |
| Document is legible on phone | PASS (visual) | Text, fictional supplier, revision heading and explanation are legible at phone scale; no layout clipping observed in screenshot. |
| Document is unmistakably non-operational | PASS | Header reads **FICTIONAL DOCUMENT PREVIEW** and document prominently warns **DEMO — NOT A SAFETY DATA SHEET — DO NOT USE FOR HAZARD COMMUNICATION**. |
| Close control is available | PARTIAL | Close icon and **Close viewer** button are visible; actual close action has not been observed yet. |
| SDS verification and site-use authorization remain distinct | PASS | Separate card shows **Verified fixture (simulated)** and **Use authorization unconfirmed**. |
| True PDF display or full genuine manufacturer SDS | NOT IN SCOPE | This v0.1 is explicitly a mock fixture; no production PDF test is implied. |

**Result:** Test 2 document opening and demo labeling PASS based on screenshots; close interaction remains to be confirmed, and historical revision expansion remains pending.

**Next owner action:** Close the document modal using **Close viewer**, expand **Version history** on MX-42, and share screenshot of the expanded list. Verify a superseded version can be opened without being presented as current.

**Boundaries:** All SDSs and chemical records are fictional; prototype receipt, authentication, revision and offline sync are simulations. No live hazard communication, real mine data or production compliance acceptance.

