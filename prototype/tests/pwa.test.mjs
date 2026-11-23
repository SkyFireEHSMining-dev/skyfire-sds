import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'manifest.webmanifest'),'utf8'));
const html = readFileSync(resolve(root, 'index.html'),'utf8');
const sw = readFileSync(resolve(root,'service-worker.js'),'utf8');

test('PWA stays within its hosted project path and uses standalone display', () => {
  assert.equal(manifest.start_url, './index.html');
  assert.equal(manifest.scope, './');
  assert.equal(manifest.display, 'standalone');
  assert.match(html, /rel="manifest" href="\.\/manifest.webmanifest"/);
  assert.match(html, /rel="apple-touch-icon"/);
  assert.match(html, /serviceWorker\.register\('\.\/service-worker\.js'\)/);
});

test('all manifest icons and shell assets exist', () => {
  for (const i of manifest.icons) assert.ok(existsSync(resolve(root, i.src)), i.src);
  for (const asset of ['./index.html','./styles.css?v=skyfire-brand-v1','./app.mjs?v=skyfire-brand-v1','./model.mjs','./manifest.webmanifest','./icons/skyfire-logo-192.jpg','./icons/skyfire-logo-512.jpg']) {
    assert.ok(existsSync(resolve(root, asset.split('?')[0])), asset);
    assert.ok(sw.includes(`'${asset}'`), `Cache manifest missing ${asset}`);
  }
});

test('offline code remains explicitly demo-only and does not imply real report delivery', () => {
  assert.match(sw, /NOT production SDS storage/);
  assert.match(sw, /no real SDS documents/);
  assert.match(html, /SkyFire SDS · v0\.1 demo/);
  const app = readFileSync(resolve(root,'app.mjs'),'utf8');
  assert.match(app, /DEMO ONLY/);
  assert.match(app, /Not a real SDS library/);
});