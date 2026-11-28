import test from 'node:test';
import assert from 'node:assert/strict';

// Functional DOM-stub regression for the fictional Inbox → Report → Triage
// prototype. This test does not establish production authentication/security.
test('role-specific navigation, focused report triage and separate use authorization', async () => {
  const originalWindow=globalThis.window;
  const originalDocument=globalThis.document;
  const listeners=new Map();
  const root={innerHTML:'', addEventListener(name,cb){listeners.set(name,cb);}};
  const fields={
    'triage-use': { value:'in-use' },
    'triage-note': { value:'Fictional maintenance supervisor to verify chemical use.' },
    'close-outcome': { value:'confirmed' }
  };
  globalThis.document={getElementById(id){return id==='app'?root:fields[id]||null;}};
  globalThis.window={
    scrollTo(){}, requestAnimationFrame(cb){cb();}, addEventListener(){},
    confirm(){return true;}
  };
  const click=(action,data={})=>listeners.get('click')({
    target:{closest(selector){return selector==='[data-action]'?{dataset:{action,...data}}:null;}}
  });
  const change=(id,value,checked)=>listeners.get('change')({target:{id,value,checked}});
  try {
    await import(`../app.mjs?ux-workflow=${Date.now()}`);
    assert.match(root.innerHTML,/Find chemical safety information/);
    assert.doesNotMatch(root.innerHTML,/data-page="settings"/,'Field User has no admin nav');

    change('role-switch','admin');
    assert.match(root.innerHTML,/data-page="settings"/);
    assert.match(root.innerHTML,/data-page="queue"/);

    click('nav',{page:'queue'});
    assert.match(root.innerHTML,/Reports inbox/);
    assert.match(root.innerHTML,/R-001/);
    assert.doesNotMatch(root.innerHTML,/Representative delegation/);

    click('open-queue-report',{id:'R-001'});
    assert.match(root.innerHTML,/What was reported\?/);
    assert.match(root.innerHTML,/Use authorization unconfirmed/);
    assert.match(root.innerHTML,/Shared Shop Tablet/);
    assert.match(root.innerHTML,/Review & record triage/);

    click('open-queue-triage');
    assert.match(root.innerHTML,/Initial safety triage/);
    assert.doesNotMatch(root.innerHTML,/data-action="resolve-report"/,
      'Disposition should wait until triage is recorded');

    click('triage-report',{id:'R-001'});
    assert.match(root.innerHTML,/data-action="resolve-report"/);
    assert.match(root.innerHTML,/Disposition/);

    click('resolve-report',{id:'R-001'});
    assert.match(root.innerHTML,/Closed \(demo\)/);
    assert.match(root.innerHTML,/Use authorization unconfirmed/,
      'Report resolution cannot silently authorize chemical use');

    click('nav',{page:'settings'});
    assert.match(root.innerHTML,/Supervisor may record triage/);
    assert.doesNotMatch(root.innerHTML,/R-001 · MX-42 Cleaner/);

    change('role-switch','field');
    assert.match(root.innerHTML,/Find chemical safety information/);
    assert.doesNotMatch(root.innerHTML,/data-page="settings"/);
  } finally {
    globalThis.document=originalDocument;
    globalThis.window=originalWindow;
  }
});
