# SkyFire SDS — v0.1 Functional Prototype Scope

**Status:** APPROVED SCOPE, **NOT YET AUTHORIZED TO BUILD**  
**Owner approval:** November 22, 2026 (Pacific) — Decision D-051  
**Repository:** Private `SkyFireEHSMining-dev/skyfire-sds`  
**Prototype purpose:** Enable hands-on review of an integrated worker, administrator, and shared-device SDS experience before finalizing visual design.

## Safety and evidence boundaries

- Demonstration only. **NOT an operational SDS/HazCom system.**
- Use **two fully fictional mine sites**, a small curated set of fictional chemical names/manufacturers, fictional workers, and clearly labeled non-operational mock document fixtures. Never fabricate a PDF presented as a genuine manufacturer's SDS.
- Any demo SDS/document viewer must conspicuously say **DEMO — NOT A SAFETY DATA SHEET — DO NOT USE FOR HAZARD COMMUNICATION**. No real mine inventories, worker identities, credentials, confidential data, or field attachments.
- Interface views may simulate permission, offline, synchronization, notifications and report-receipt behavior; they must not claim to provide production authentication, secure offline synchronization, regulatory compliance or actual server receipts when simulated.
- A future live system must undergo separate architecture, security, legal/regulatory, document integrity, offline availability and data-protection verification.

## Approved bounded prototype areas

### 1. Worker experience

- Responsive integrated worker view navigable on a phone and shared-tablet-size screen.
- Search/browse a small fictional product catalog and open a clearly labeled demo document.
- Show product identity; **SDS verified** status separately from **chemical authorized for use** status.
- Show illustrative current/cached revision and last successful synchronization indicator; keep version history accessible through a secondary control.
- Provide a concise chemical-use/discrepancy report journey with an administrator-received versus local pending state visibly distinguished.

### 2. Worker reporting and shared-device attribution

- Demonstrate the approved quick two-action submission concept where practicable.
- Show account/session used separately from a self-identified reporter; prefill for simulated individual sessions and request a name on simulated shared sessions.
- Demonstrate local pending versus acknowledged/received states without claiming real offline background delivery.

### 3. Minimum administrator journey

- See an incoming fictional report, review basic safety triage/use state and record a proposed resolution.
- Demonstrate cross-site matching of a fictional product and verification of a **demo document fixture** (not real manufacturer SDS authenticity).
- Classify an illustrative revision as routine, significant or uncertain; simulate publication reflected in the worker view.
- See a compact status of simulated synchronization/distribution gaps.

### 4. Roles and representative permissions

- Simulate the **Field User / Supervisor / Admin** roles, including a small representative delegated Supervisor permission.
- Demonstrate allowed versus blocked controls at the UI/prototype level **only**; not production authorization or identity security.

## Functional acceptance checks

1. On a phone-size viewport, a person can find a fictional chemical and open the prominent demo document without a worker sign-in.
2. On a shared-tablet-size viewport, a report can be created with the session account and self-identified reporter clearly separated.
3. The interface never conflates verified SDS status with authorization to use a chemical.
4. The current document dominates the worker UI; history is accessible but visually subordinate.
5. The report journey clearly differentiates a saved/pending local report from a mock acknowledged/received report, and does not imply an offline report was delivered.
6. A simulated administrator can triage a fictional report, verify an illustrative document record, classify an update and publish it; worker view changes accordingly.
7. The demo shows a stale/offline copy and last-sync time accurately as **simulated**, not a real device-sync guarantee.
8. Representative permissions prevent an ordinary Field User from using simulated protected administrator controls; delegated Supervisor controls demonstrate a scoped exception.
9. At least one user walkthrough on an iPhone-size screen and one on a shared-tablet-size screen can exercise the connected flows before final visual-design approval.
10. No actual manufacturer SDS, mine-sensitive data, real worker accounts or production infrastructure is required for the demonstration.

## Explicitly out of scope for v0.1

- Production hosting/deployment, real chemical records or active mine use.
- Production authentication/SSO, real user provisioning, security certification, backups or permission enforcement.
- Guaranteed true-offline PWA delivery, remote device management, background synchronization or push notifications.
- Full enterprise-grade custom form builder, binder-print fulfillment, inventory purchasing workflows, complete QR label lifecycle and real training/notification delivery.
- Lynx or SkyFire Education integrations, regulated label replacement, regulatory-compliance claims.
- Final visual design approval (intentionally postponed until hands-on review).

## Stage gate

**D-051 approves this scope and the acceptance checks only.** No application code, branch, deployment or hosting is authorized by scope approval. The next decision is whether the owner **explicitly authorizes implementation** of this limited private-repository demonstration. If authorized, develop in an isolated feature branch and review the navigable prototype before any merge or deployment; deployment, even of a demo, is a separate decision.
