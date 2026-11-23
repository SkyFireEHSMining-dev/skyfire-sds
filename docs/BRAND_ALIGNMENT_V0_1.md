# SkyFire SDS v0.1 — Brand alignment pass

**Status:** Implemented in prototype branch and preview-only publishing branch; final visual design remains provisional pending owner hands-on review.

## Reference sources

- `SkyFireEHSMining-dev/skyfire-safety-library` at `main`: original phoenix identity as rendered by `Icons/icon-192.png` and `Icons/icon-512.png` in the Safety header; authoritative palette from `styles.css` (`#eef3f7` background, `#111827` text, `#0b84ff` interactive accent, `#f97316` secondary safety cue).
- `SkyFireEHSMining-dev/skyfire-education-hub` at `main`: matching light header, white cards, cyan/blue actions, orange card accent and original phoenix branding.
- User instruction on 2026-11-22: preserve SDS navigation/layout, use original logo and make colors/look/feel match other SkyFire apps.

## Implemented

1. **Exact original raster logo files copied**, without edits: source Safety repository `Icons/icon-192.png` / `Icons/icon-512.png` are JPEG-encoded despite their historic `.png` filenames. They are copied under `prototype/icons/skyfire-logo-192.jpg` and `skyfire-logo-512.jpg` with byte-identical Git blob SHAs (`a6c8e4cc111afc6da31b29c6278567a453da56cd`, `d0d16bb913557e9bee7831ade1a4432b3ad12da6`).
2. Header changes from dark charcoal/placeholder shield to light SkyFire header featuring the phoenix artwork. `SkyFire SDS` title retained.
3. Core palette uses Safety/Education icy-blue-gray background, white cards, blue interactive elements and minor orange hazard accents. Danger/warning semantic colors and demo-only banners retained.
4. PWA manifest/browser/iOS icon references use exact phoenix assets; theme-color updated to match the light SkyFire family.
5. Cache namespace increased and CSS/JS references versioned so the installed Home Screen demo can refresh its shell. Offline report delivery is **still simulated only**.
6. Existing SDS pages, hierarchy, worker/admin journeys, document view, navigation and access model remain unchanged.

## Verification and scope

- `npm test` — 15/15 (12 existing plus 3 branding checks), after referencing the newly copied original logo assets.
- `npm run check` — JavaScript syntax checks.
- Browser rendering cannot be fully exercised in this code container; actual iPhone Home Screen review is required once Pages completes.
- Public preview remains **fictional and non-operational**. No real safety data, credentials, or worker reports.
- For an iPhone that retains the original orange-shield Home Screen artwork, remove the old Home Screen shortcut and add the live site again to refresh the app icon after verifying the new website.

**Final design sign-off is not implied by this brand alignment change.**