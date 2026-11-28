import test from 'node:test';
import assert from 'node:assert/strict';

// Regression: entering the report form from a scrolled chemical detail page
// used to preserve the old scroll offset and land the worker near the bottom.
test('navigation resets scroll to the top without jumping on in-page updates', async () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  const listeners = new Map();
  const scrollCalls = [];
  const appRoot = {
    innerHTML: '',
    addEventListener(type, callback) { listeners.set(type, callback); }
  };
  globalThis.document = {
    getElementById(id) { return id === 'app' ? appRoot : null; }
  };
  globalThis.window = {
    scrollTo(left, top) { scrollCalls.push([left, top]); },
    requestAnimationFrame(callback) { callback(); },
    addEventListener() {},
    confirm() { return true; }
  };

  const click = (action, dataset = {}) => {
    const target = {
      closest(selector) {
        return selector === '[data-action]'
          ? { dataset: { action, ...dataset } }
          : null;
      }
    };
    listeners.get('click')({ target });
  };
  try {
    await import(`../app.mjs?scroll-regression=${Date.now()}`);
    assert.equal(scrollCalls.length, 0, 'first app render must not scroll');

    click('product', { id: 'chem-001' });
    assert.match(appRoot.innerHTML, /MX-42 Cleaner/);
    assert.deepEqual(scrollCalls, [[0, 0], [0, 0]], 'opening a new page restores top');

    scrollCalls.length = 0;
    click('toggle-history');
    assert.deepEqual(scrollCalls, [], 'expanding an in-page history panel leaves scroll intact');

    click('start-report', { id: 'chem-001' });
    assert.match(appRoot.innerHTML, /Report chemical use/);
    assert.deepEqual(scrollCalls, [[0, 0], [0, 0]], 'report form opens at top');

    scrollCalls.length = 0;
    click('nav', { page: 'library' });
    assert.deepEqual(scrollCalls, [[0, 0], [0, 0]], 'bottom navigation opens at top');

    click('product', { id: 'chem-001' });
    scrollCalls.length = 0;
    listeners.get('change')({ target: { id: 'site-switch', value: 'cinder' } });
    assert.deepEqual(scrollCalls, [[0, 0], [0, 0]], 'site change into the library resets scroll');
  } finally {
    if (originalDocument === undefined) delete globalThis.document;
    else globalThis.document = originalDocument;
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
