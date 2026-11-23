# SkyFire SDS — Home Screen demo preparation (not yet deployed)

**Date:** November 22, 2026 (Pacific)  
**Phase:** App-shell / static-site preparation on private prototype branch; separate publication approval pending.

## Why

The owner could not use the downloaded standalone HTML in the iPhone viewer and asked for a normal HTTPS webpage that can be added to the Home Screen, as with SkyFire Safety. This document records a safe deployment pathway without misrepresenting prototype capabilities or authorizing public hosting.

## Prepared browser-app features

- Installable web-app metadata (`manifest.webmanifest`) and dedicated SDS demo icon.
- iPhone Home Screen metadata and relative paths to support a GitHub Pages project subpath.
- Service worker to cache **static mock UI files only** after first online visit.
- Tests for manifest, assets, and visible demo disclaimers.
- Existing fictional prototype worker/admin UI retained; no production authentication, persistent reports, or real SDS document storage added.

## Publication isolation and security

**Never use the documentation repository's `main` or the full development-branch root as the Pages source.** They include private design/decision documents. If publishing is approved, use a separate branch with **only** static demonstration files at its root. Never make production-style security claims.

**GitHub Pages is ordinarily public**, even when the repository is private. GitHub Pages from a private repository also requires a qualifying GitHub plan; on GitHub Free, a separate public demo-only repository or another approved hosting strategy would be necessary. Neither a visibility change to the SDS repository nor moving private content into a public repo is authorized.

**Publication permission is a separate gate.** A request to make the demo accessible via webpage is not a blanket authorization to reveal private planning docs or deploy a production SDS tool.

## User-facing next steps after approved HTTPS publication

1. Open the verified live demo URL in Safari on iPhone (not a local HTML attachment).
2. Choose Safari Share → Add to Home Screen → Open as Web App → Add.
3. Test the Library, demo SDS viewer and Admin role preview. Expect state reset on reload and no backend delivery.

## Validation and limitations

- Node model and PWA static tests verify software-level and asset-level consistency.
- Browser/service-worker offline interaction requires end-to-end verification in a reachable HTTPS environment before claiming offline loading works on iOS.
- Do not merge to `main`, activate GitHub Pages, change repository visibility, or publish until specifically approved.