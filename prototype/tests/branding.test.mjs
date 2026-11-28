import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname,resolve } from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const css=readFileSync(resolve(root,'styles.css'),'utf8');
const app=readFileSync(resolve(root,'app.mjs'),'utf8');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const manifest=JSON.parse(readFileSync(resolve(root,'manifest.webmanifest'),'utf8'));
test('SkyFire design tokens match established Safety/Education brand',()=>{
  assert.match(css,/--skyfire-blue:\s*#0b84ff/);
  assert.match(css,/--skyfire-orange:\s*#f97316/);
  assert.match(css,/--bg:\s*#eef3f7/);
  assert.match(css,/\.primary-document\s*\{\s*border-top: 5px solid var\(--skyfire-orange\)/);
});
test('original phoenix logo replaces generic shield without changing navigation',()=>{
  assert.match(app,/class=\"brand-logo\" src=\"\.\/icons\/skyfire-logo-192\.jpg\"/);
  assert.doesNotMatch(app,/class=\"brand-symbol\"/);
  assert.match(app,/navButton\('library','Library','search'\)/);
  assert.match(app,/navButton\('distribution','Updates','layers'\)/);
});
test('iPhone Home Screen logo uses original source asset',()=>{
  assert.match(html,/rel=\"apple-touch-icon\"[^>]*href=\"\.\/icons\/skyfire-home-icon-v2\.jpg/);
  assert.deepEqual(manifest.icons.map(icon=>icon.src),['./icons/skyfire-home-icon-v2.jpg','./icons/skyfire-logo-512.jpg']);
  assert.equal(manifest.theme_color,'#f8fbfe');
});