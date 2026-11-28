import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(resolve(root, 'styles.css'), 'utf8');
const app = readFileSync(resolve(root, 'app.mjs'), 'utf8');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const sw = readFileSync(resolve(root, 'service-worker.js'), 'utf8');

test('small screens wrap header instead of forcing horizontal width', () => {
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /\.topbar\s*\{\s*display: grid/);
  assert.match(css, /\.header-tools\s*\{[^}]*width: 100%/);
  assert.match(css, /\.header-control select\s*\{[^}]*min-width: 0/);
});

test('demo warning is preserved but can wrap on phones', () => {
  assert.match(app, /DEMO ONLY/);
  assert.match(app, /Not a real SDS library, reporting system, or safety control/);
  assert.match(app, /demo-warning-copy/);
  assert.match(css, /\.global-warning \.demo-warning-copy\s*\{[^}]*min-width: 0/);
});

test('report cards can wrap longer names and receipt labels', () => {
  assert.match(css, /\.report-meta\s*\{[^}]*overflow-wrap: anywhere/);
  assert.match(css, /\.report-card-head\s*\{[^}]*flex-wrap: wrap/);
  assert.match(css, /\.report-card-head \.tag\s*\{[^}]*white-space: normal/);
});

test('updated shell asset references are versioned for installed PWA', () => {
  assert.match(html, /styles\.css\?v=skyfire-ux-preview-v1/);
  assert.match(html, /app\.mjs\?v=skyfire-ux-preview-v1/);
  assert.match(sw, /v0\.1-uxpreview-1/);
  assert.match(sw, /styles\.css\?v=skyfire-ux-preview-v1/);
  assert.match(sw, /app\.mjs\?v=skyfire-ux-preview-v1/);
});
