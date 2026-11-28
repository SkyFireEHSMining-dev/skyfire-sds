import test from 'node:test';
import assert from 'node:assert/strict';

// This is a DOM-stub test for the fictional prototype's notification lifecycle.
// It does not claim to validate iPhone service-worker behavior or accessibility.
test('routine toasts expire; newer messages and manual close work; errors remain', async () => {
  const previousDocument = globalThis.document;
  const previousWindow = globalThis.window;
  const previousSetTimeout = globalThis.setTimeout;
  const previousClearTimeout = globalThis.clearTimeout;

  const listeners = new Map();
  const root = {
    innerHTML: '',
    addEventListener(type, callback) { listeners.set(type, callback); }
  };
  let nextTimerId = 0;
  const timers = new Map();

  globalThis.document = {
    getElementById(id) { return id === 'app' ? root : null; }
  };
  globalThis.window = {
    scrollTo() {},
    requestAnimationFrame(callback) { callback(); },
    addEventListener() {},
    confirm() { return true; }
  };
  globalThis.setTimeout = (callback, delay) => {
    const id = ++nextTimerId;
    timers.set(id, { callback, delay });
    return id;
  };
  globalThis.clearTimeout = id => { timers.delete(id); };
  const changeRole = value => listeners.get('change')({ target: { id: 'role-switch', value } });
  const click = action => listeners.get('click')({
    target: {
      closest(selector) {
        return selector === '[data-action]' ? { dataset: { action } } : null;
      }
    }
  });

  try {
    await import(`../app.mjs?toast-lifecycle-test=${Date.now()}`);
    assert.equal(timers.size, 0, 'initial screen has no notification timer');

    changeRole('admin');
    assert.match(root.innerHTML, /Role preview changed/);
    assert.match(root.innerHTML, /role="status"/);
    assert.equal(timers.size, 1);
    const [[oldId, staleTimer]] = [...timers.entries()];
    assert.equal(staleTimer.delay, 6000, 'normal notifications last 6 seconds');

    changeRole('supervisor');
    assert.ok(!timers.has(oldId), 'new toast clears old timer');
    assert.equal(timers.size, 1);
    const [[newId, latestTimer]] = [...timers.entries()];

    staleTimer.callback();
    assert.match(root.innerHTML, /Role preview changed/, 'stale callback does not hide a newer toast');

    timers.delete(newId);
    latestTimer.callback();
    assert.doesNotMatch(root.innerHTML, /Role preview changed/, 'timer automatically clears routine toast');
    assert.equal(timers.size, 0);

    changeRole('admin');
    click('dismiss-toast');
    assert.doesNotMatch(root.innerHTML, /Role preview changed/, 'X immediately closes the toast');
    assert.equal(timers.size, 0, 'manual dismissal cancels timer');

    // Missing reporter input triggers a demo form error.
    click('submit-report');
    assert.match(root.innerHTML, /role="alert"/, 'error has urgent announcement semantics');
    assert.equal(timers.size, 0, 'errors remain visible without a timer');
    click('dismiss-toast');
    assert.doesNotMatch(root.innerHTML, /role="alert"/, 'error can be dismissed with X');
  } finally {
    globalThis.document = previousDocument;
    globalThis.window = previousWindow;
    globalThis.setTimeout = previousSetTimeout;
    globalThis.clearTimeout = previousClearTimeout;
  }
});
