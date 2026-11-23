# SkyFire SDS v0.1 — Functional demo

**UNSAFE FOR OPERATIONAL USE.** This is a navigable browser demonstration of the approved SkyFire SDS prototype scope. It uses fictional mines, fictional people and fictional chemical records, and a deliberately non-SDS document placeholder. It is **not** a manufacturer SDS repository, a production HazCom program or an operational incident-reporting channel.

## Run locally

From the repository root:

```bash
python3 -m http.server 8000 --directory prototype
```

Visit `http://localhost:8000` on the same computer. It uses only browser-standard HTML, CSS and JavaScript ES modules; no build step, packages, server database or third-party services.

For automated model tests:

```bash
node --test prototype/tests/*.test.mjs
node --check prototype/app.mjs
node --check prototype/model.mjs
```

## Walkthrough

1. **Worker** (default role): search for MX-42 Cleaner, open the demo document, confirm that document verification differs from chemical-use authorization. Look for the secondary **Version history** link.
2. **Offline reporting:** switch to *Offline demo* in the header, open a chemical report, enter a self-reported name, save the local draft. Verify that My reports says **not received**. Switch to Online demo and see the **simulated** auto-retry receipt.
3. **Admin:** choose *Admin* in the **Role preview** selector, open **Report queue**, triage R-001, and optionally resolve it. Then in **Document review** check the fictional fixture, choose classification and publish a demo revision.
4. **Distribution:** see pending device/binder tasks. Confirm a mock device sync; confirm a fictional binder update. Return to worker product view to see the new online version and distinct offline cached state.
5. **Supervisor delegation:** Admin grants **Supervisor may triage Cinder Ridge reports** on the queue screen, then role preview switches to Supervisor to test scoped triage and blocked publication. Field User cannot change protected records.

## Deliberate limitations

- All changes exist **only inside the current page session**. Refreshing or resetting recreates the original fixtures. No real server acknowledges any submission.
- Online/offline is a **simulated switch**; no service worker, PWA installation, background sync, or guaranteed offline support. Server receipt, cache status, distribution tracking and permissions are demonstrative UI states, not operational safeguards.
- The document viewer is an **HTML demonstration fixture**, not a genuine manufacturer PDF or a generated safety data sheet. It includes no chemical-specific hazard claims.
- Role switching is a simulated preview and cannot provide security. There is no real login, database, or audit record persistence.
- The admin and worker screens demonstrate only the subset of decisions listed in [the approved scope](../docs/V0_1_SCOPE.md). Full configurable forms, real QR integration, printing/binder workflows, push notifications, SDS authenticity verification and production architecture are excluded.
- **Do not deploy or merge this branch without separate product-owner approval.**

### One-file, no-server preview

Open **`preview-standalone.html`** to explore the same fictional in-memory experience without setting up a local web server. This is a convenience build with its CSS/JavaScript bundled inside the HTML, not a hosted application or true offline PWA. Browsers and mobile file viewers vary in how they handle locally opened HTML; for predictable behavior, run `index.html` via the local server instructions above.

## Home Screen website preparation (not published)

The **PWA-ready app shell** now includes a `manifest.webmanifest`, app icons, and a small `service-worker.js` that caches only the static demo interface files. Once the **demo-only site** is separately approved and served over HTTPS, Safari on iPhone can use **Share → Add to Home Screen → Open as Web App**. The demo icon will be labeled **SkyFire SDS**.

**Important:** The service worker permits re-opening the previously loaded *static mock interface* without a network connection. It does **not** make simulated reports real or durable, does not send reports from a disconnected phone, and does not provide an approved offline manufacturer SDS library. Refreshing the demonstration resets its state. First open online to cache the shell.

**Never publish this repository's `main` or development branch root as a GitHub Pages website.** Those branches contain private discovery documents that are not intended as public site files. A dedicated **static-preview-only branch** must contain only fictional, non-sensitive site assets; GitHub Pages will expose published website files to the public even if the GitHub repository itself remains private. On a GitHub Free account, Pages for a private repository may be unavailable. Keep any public demonstration and eventual production SDS hosting separated. Publication must have separate owner approval.