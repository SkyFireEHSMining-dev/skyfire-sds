import {
  createDemoState, findProduct, currentVersion, versionForDisplay, authorizationAt,
  canPerform, submitDemoReport, setConnection, recordTriage, acknowledgeReport,
  resolveReport, publishDemoRevision, synchronizeDemoDevice, confirmDemoBinder,
  setDemoDelegation, DEMO_WARNING, SITES, CLASSIFICATIONS
} from './model.mjs';

let demo = createDemoState();
let ui = {
  page: 'library', productId: 'chem-001', siteId: 'cinder', query: '', history: false,
  modalVersion: null, reportId: 'R-001', adminProductId: 'chem-001',
  fixtureChecked: false, classification: 'uncertain', toast: '', queueFilter: 'review',
};
const root = document.getElementById('app');
const TOAST_AUTO_DISMISS_MS = 6000;
let toastDismissTimer = null;
let toastRenderToken = 0;

// A new toast replaces the previous timer. Old timers cannot close a newer
// message, including when the same confirmation appears twice in a row.
function refreshToastTimer() {
  if (toastDismissTimer !== null) clearTimeout(toastDismissTimer);
  toastDismissTimer = null;
  const token = ++toastRenderToken;
  if (!ui.toast || ui.toastCritical) return;
  const message = ui.toast;
  toastDismissTimer = setTimeout(() => {
    if (token !== toastRenderToken || ui.toast !== message || ui.toastCritical) return;
    toastDismissTimer = null;
    ui.toast = '';
    render();
  }, TOAST_AUTO_DISMISS_MS);
  // Avoid holding open Node's model/DOM regression test process.
  toastDismissTimer?.unref?.();
}

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const txt = escapeHTML;
const siteName = id => SITES.find(s => s.id === id)?.name || 'Unknown site';
const areaName = (product, siteId) => product.assignments.find(a=>a.siteId===siteId)?.area || 'Not assigned';
const labelForAuthorization = x => ({approved:'Approved by site (demo)',unconfirmed:'Use authorization unconfirmed','not-assigned':'Not assigned to this site'})[x] || 'Unknown';
const authTone = x => x === 'approved' ? 'positive' : 'amber';
const revisionLabel = x => x?.label || 'Not cached';
const icon = (name, size=18) => {
  const paths={
    book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 4.5v14A2.5 2.5 0 0 1 6.5 16H20"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    shield:'<path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    wifi:'<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0"/><circle cx="12" cy="20" r="1"/>',
    alert:'<path d="M10.3 3.4 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    flag:'<path d="M5 22V3m0 2c5-4 9 4 14 0v11c-5 4-9-4-14 0"/>',
    layers:'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 5a3 3 0 0 1 0 6m5 10v-3a7 7 0 0 0-4-6.4"/>',
    check:'<path d="m4 12 5 5L20 6"/>',
    close:'<path d="M5 5 19 19M19 5 5 19"/>',
    refresh:'<path d="M20 11a8 8 0 0 0-14.8-4L3 9m0-6v6h6M4 13a8 8 0 0 0 14.8 4L21 15m0 6v-6h-6"/>',
    lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    clipboard:'<path d="M9 2h6l1 2h3v18H5V4h3l1-2zM9 8h6M9 13h6M9 18h4"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/>'
  };
  return `<svg class="ico" width="${size}" height="${size}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.info}</svg>`;
};

function toast(message) { ui.toast=message; render(); }
const demoChip = text => `<span class="chip demo-chip">${escapeHTML(text)}</span>`;
const statuses = (p,siteId) => {
  const use=authorizationAt(p,siteId);
  return `<div class="status-grid"><div class="status-block"><small>Document status</small><strong class="text-positive">${icon('shield',15)} Verified fixture <em>(simulated)</em></strong></div><div class="status-block"><small>Site use authorization</small><strong class="text-${authTone(use)}">${escapeHTML(labelForAuthorization(use))}</strong></div></div>`;
};
function navButton(page,name,glyph) {
  const active=ui.page===page || (page==='library' && ['detail','report'].includes(ui.page)) || (page==='queue' && ['queue-detail','queue-triage'].includes(ui.page));
  return `<button type="button" class="nav-item ${active?'is-active':''}" data-action="nav" data-page="${page}" ${active?'aria-current="page"':''}>${icon(glyph)}<span>${name}</span></button>`;
}
function shell(content) {
  const online=demo.connection==='online';
  const siteOptions=SITES.map(s=>`<option value="${s.id}" ${ui.siteId===s.id?'selected':''}>${txt(s.name)}</option>`).join('');
  const links = demo.role==='admin'
    ? [['library','Library','search'],['queue','Inbox','clipboard'],['documents','SDS','file'],['distribution','Updates','layers'],['settings','Settings','users']]
    : demo.role==='supervisor'
      ? [['library','Library','search'],['reports','Reports','flag'],['queue','Team','clipboard']]
      : [['library','Library','search'],['reports','Reports','flag']];
  const navigation = links.map(([page,label,glyph])=>navButton(page,label,glyph)).join('');
  return `<div class="shell">
    <header class="topbar">
      <div class="brand-lockup"><img class="brand-logo" src="./icons/skyfire-logo-192.jpg" alt="SkyFire phoenix logo" width="52" height="52" /><div><div class="brand">SkyFire <b>SDS</b></div><div class="brand-note">Navigation UX preview · v0.1</div></div></div>
      <div class="header-tools">
        <label class="header-control">Role preview <select id="role-switch" aria-label="Simulated user role"><option value="field" ${demo.role==='field'?'selected':''}>Field User</option><option value="supervisor" ${demo.role==='supervisor'?'selected':''}>Supervisor</option><option value="admin" ${demo.role==='admin'?'selected':''}>Admin</option></select></label>
        <button class="network ${online?'connected':'disconnected'}" data-action="toggle-network" type="button" aria-label="Toggle simulated connectivity">${icon('wifi',17)} ${online?'Online demo':'Offline demo'}</button>
      </div>
    </header>
    <div class="global-warning" role="note">${icon('alert',16)} <span class="demo-warning-copy"><strong>DEMO ONLY</strong><span> — Fictional records and mock documents. Not a real SDS library, reporting system, or safety control.</span></span></div>
    <div class="shell-grid">
      <aside class="sidebar"><div class="side-title">${demo.role==='admin'?'ADMIN WORKSPACE':'YOUR WORK'}</div>
        ${navigation}
        <div class="sidebar-bottom"><small>Selected mine site</small><select id="site-switch" aria-label="Select fictional mine site">${siteOptions}</select>
        <div class="microcopy">No live accounts, server, or SDS documents.</div>
        <button type="button" class="text-button" data-action="reset">Reset fictional demo</button></div>
      </aside>
      <main class="main-content" id="main-content" tabindex="-1">${content}</main>
    </div>
    <nav class="mobile-nav" aria-label="Demo navigation">${navigation}</nav>
    ${ui.toast?`<div class="toast" role="${ui.toastCritical?'alert':'status'}">${icon('info',18)}<span>${txt(ui.toast)}</span><button type="button" data-action="dismiss-toast" aria-label="Close message">${icon('close',16)}</button></div>`:''}
    ${ui.modalVersion?renderDocumentModal():''}
  </div>`;
}

function libraryView() {
  const q=ui.query.trim().toLowerCase();
  const siteOptions=SITES.map(site=>`<option value="${site.id}" ${ui.siteId===site.id?'selected':''}>${txt(site.name)}</option>`).join('');
  const products=demo.products.filter(p=> {
    const match=!q||`${p.name} ${p.manufacturer} ${p.code}`.toLowerCase().includes(q);
    return match && (Boolean(q)||p.assignments.some(a=>a.siteId===ui.siteId));
  });
  return `<div class="page-header"><div class="eyebrow">WORKER VIEW <span class="eyebrow-sep">/</span> ${txt(siteName(ui.siteId))}</div><h1>Find chemical safety information</h1><p>Search the fictional catalog or choose a product. Approved SDS viewing would not require sign-in.</p></div>
    <div class="mobile-site-picker"><label for="mobile-site-switch">Fictional mine site</label><select id="mobile-site-switch">${siteOptions}</select></div>
    <div class="hero-search"><label for="chemical-search" class="sr-only">Search chemical name, manufacturer or product ID</label>${icon('search',22)}<input id="chemical-search" type="search" autocomplete="off" placeholder="Chemical, manufacturer, or product ID" value="${txt(ui.query)}" /><span class="shortcut">DEMO LIBRARY</span></div>
    <div class="section-heading"><div><h2>${q?'Search results':'Chemicals at '+txt(siteName(ui.siteId))}</h2><span class="subtitle">${products.length} fictional product${products.length!==1?'s':''}</span></div><span class="helper">Select a product to view its document</span></div>
    <div class="product-list">${products.length?products.map(p=>{
      const assigned=p.assignments.some(a=>a.siteId===ui.siteId);
      return `<button class="product-row" type="button" data-action="product" data-id="${p.id}"><div class="product-icon">${icon('file',21)}</div><div class="product-info"><strong>${txt(p.name)}</strong><small>${txt(p.manufacturer)} · ${txt(p.code)}</small></div><div class="product-end"><span class="tiny-state">${assigned?'In selected site':'Other site'}</span>${icon('arrow',17)}</div></button>`;
    }).join(''):`<div class="empty">No fictional products matched this search.</div>`}</div>
    <div class="aside-tip">${icon('info',18)}<div><strong>Have a chemical that's missing?</strong><p>In this v0.1 demo, start from any fictional chemical to practice the report flow. Real unknown-product entry is a later milestone.</p></div></div>`;
}

function detailView() {
  const p=findProduct(demo,ui.productId);
  if(!p)return `<div class="empty">Product not found.</div>`;
  const shown=versionForDisplay(demo,p.id,ui.siteId);
  const offline=demo.connection==='offline';
  const other=ui.history?`<div class="history-panel"><h3>Controlled version history <span class="muted">(fictional)</span></h3>${[...p.versions].filter(v=>!offline||v.id===demo.cache[ui.siteId]?.[p.id]).reverse().map(v=>`<button type="button" class="history-row" data-action="view-revision" data-id="${p.id}" data-version="${v.id}"><span>${txt(v.label)}</span><small>${v.id===currentVersion(p).id?'Latest server record':'Superseded'} · ${txt(v.published)}</small>${icon('arrow',14)}</button>`).join('')}</div>`:'';
  return `<button class="breadcrumb" type="button" data-action="nav" data-page="library">← Chemical library</button>
    <div class="detail-header"><div><div class="eyebrow">FICTIONAL PRODUCT · ${txt(p.code)}</div><h1>${txt(p.name)}</h1><p>${txt(p.manufacturer)} · ${txt(areaName(p,ui.siteId))}</p></div>${demoChip('Demo identity')}</div>
    <div class="detail-layout"><div>
      <section class="primary-document">
        <div class="document-title"><div>${icon('file',24)}<span>Manufacturer document viewer</span></div><span class="tag safe">Simulated verified</span></div>
        <div class="document-version"><strong>${txt(revisionLabel(shown?.version))}</strong><span>${offline?'Offline cache — latest version unconfirmed':'Latest published demo revision'}</span></div>
        <div class="document-action"><button type="button" class="primary-btn big" data-action="view-current" ${shown?.version?'':'disabled'}>${icon('file',20)} ${shown?.version?'Open demo document':'No offline copy available'} ${icon('arrow',18)}</button></div>
        <div class="document-disclaimer">${txt(DEMO_WARNING)}</div>
        <div class="sync-row"><span>${icon(offline?'clock':'refresh',15)} ${txt(shown?.lastSync||'Not synchronized')}</span><span class="sync-pill ${offline?'stale':'fresh'}">${offline?'Offline — currentness unconfirmed':'Online catalog (simulated)'}</span></div>
        <div class="sync-actions"><button class="quiet-btn" type="button" data-action="sync-device" ${offline?'disabled':''}>${icon('refresh',16)} Simulate device sync</button></div>
      </section>
      <div class="secondary-line"><button type="button" data-action="toggle-history" class="subtle-link" aria-expanded="${ui.history}">${icon('history',15)} Version history ${ui.history?'▴':'▾'}</button><span>Less-used archive</span></div>${other}
    </div><div class="detail-side">
      <section class="surface-card"><h2>Record status</h2>${statuses(p,ui.siteId)}<p class="helper-caption">The document status does not authorize chemical use. These statuses are fictional.</p></section>
      <section class="surface-card issue-card"><div class="issue-title">${icon('flag',21)}<h2>Notice a problem?</h2></div><p>Report observed chemical use, a mismatch, or an incorrect site status.</p><button type="button" class="secondary-btn wide" data-action="start-report" data-id="${p.id}">Report use or discrepancy ${icon('arrow',17)}</button></section>
      <div class="aside-tip compact">${icon('info',17)}<div>Printed binders and field Safety contact remain necessary backups in real operations.</div></div>
    </div></div>`;
}

function reportView() {
  const p=findProduct(demo,ui.productId);if(!p)return '<div class="empty">Select a product first.</div>';
  const shared=demo.sessionMode==='shared';
  return `<button class="breadcrumb" data-action="product" data-id="${p.id}">← Back to chemical</button>
    <div class="page-header narrow"><div class="eyebrow">QUICK FIELD REPORT</div><h1>Report chemical use</h1><p>Two actions: open this form, then submit. Additional context is optional. This is a simulation.</p></div>
    <div class="form-card"><div class="form-highlight">${icon('file',18)} <div><strong>${txt(p.name)}</strong><small>${txt(p.manufacturer)} · ${txt(siteName(ui.siteId))}</small></div></div>
      <div class="field-grid"><div class="field"><label for="report-type">Report type</label><select id="report-type"><option>Observed chemical use</option><option>Discrepancy / missing document</option></select></div>
      <div class="field"><label for="session-mode">Session type <span class="field-note">(simulation)</span></label><select id="session-mode"><option value="shared" ${shared?'selected':''}>Shared shop tablet</option><option value="personal" ${!shared?'selected':''}>Individual worker session</option></select></div></div>
      <div class="field"><label for="report-name">Who is reporting? <span class="required">Required</span></label><input id="report-name" maxlength="100" placeholder="Your name" value="${shared?'':'Jordan Demo'}"/><div class="field-caption">A typed name is self-reported; it is not proof of authenticated identity.</div></div>
      <div class="field"><label for="report-area">Work area</label><input id="report-area" maxlength="100" value="${txt(areaName(p,ui.siteId)==='Not assigned'?'Unknown area':areaName(p,ui.siteId))}"/></div>
      <div class="field"><label for="report-notes">Details <span class="field-note">Optional</span></label><textarea id="report-notes" maxlength="600" rows="3" placeholder="What did you observe? Any label or SDS mismatch?"></textarea></div>
      <div class="session-facts"><div><small>Account / session used</small><strong id="session-account-text">${txt(demo.sessionAccount)}</strong></div><div><small>Person reporting</small><strong>Entered above · self-reported</strong></div></div>
      <div class="form-alert">${icon('alert',18)}<span>${demo.connection==='offline'?'OFFLINE: Submit will save locally only. No administrator is notified.':'ONLINE SIMULATION: Submit creates only an in-memory demo queue entry, not a real server report.'} For urgent hazards, contact supervision/Safety directly.</span></div>
      <button class="primary-btn wide" type="button" data-action="submit-report">${demo.connection==='offline'?'Save local draft':'Submit demo report'} ${icon('arrow',18)}</button>
    </div>`;
}

function reportsView() {
  return `<div class="page-header"><div class="eyebrow">REPORT TRACKING</div><h1>My demo reports</h1><p>Local-only drafts are separate from submissions acknowledged in the simulated administrator queue.</p></div>
  <div class="report-stack">${demo.reports.length?demo.reports.map(r=>{
   const p=findProduct(demo,r.productId);const local=r.status==='local';
   return `<div class="report-card"><div class="report-card-head"><div><strong>${txt(r.id)} · ${txt(p?.name||'Unknown')}</strong><p>${txt(r.type)} · ${txt(siteName(r.siteId))}</p></div><span class="tag ${local?'warn':r.status==='resolved'?'safe':'neutral'}">${local?'Saved locally — not received':r.status==='resolved'?'Resolved (demo)':'Received (simulated)'}</span></div><div class="report-meta">Reporter: ${txt(r.reporter)} <span>·</span> Session: ${txt(r.account)}</div>${local?`<p class="local-warning">${icon('alert',15)} The administrator has NOT received this report. Reconnect with the demo open to simulate auto-retry.</p>`:`<p class="demo-receipt">${icon('check',15)} ${txt(r.receivedAt||'Simulated administrator receipt')}</p>`}</div>`;
  }).join(''):'<div class="empty">No reports yet.</div>'}</div>
  <div class="aside-tip">${icon('info',18)}<div><strong>Prototype limitation</strong><p>Reports live only in this browser tab and disappear when reset or refreshed. No real notifications are sent.</p></div></div>`;
}


function queueBucket(report) {
  if (report.status === 'resolved') return 'closed';
  return report.triage ? 'progress' : 'review';
}
function queueBucketLabel(report) {
  return ({ review:'Needs review', progress:'In progress', closed:'Closed (demo)' })[queueBucket(report)];
}
function scopedQueueReports() {
  return demo.reports.filter(r => r.status !== 'local' &&
    (demo.role === 'admin' || r.siteId === 'cinder'));
}
function chosenQueueReport() {
  const items = scopedQueueReports();
  return items.find(r => r.id === ui.reportId) || items[0] || null;
}
function queueView() {
  if (!canPerform(demo, 'view-queue')) return noAccess('Reports inbox', 'Choose Supervisor or Admin in role preview to see fictional reports.');
  const reports = scopedQueueReports();
  const active = ui.queueFilter || 'review';
  const counts = {
    review: reports.filter(r => queueBucket(r) === 'review').length,
    progress: reports.filter(r => queueBucket(r) === 'progress').length,
    closed: reports.filter(r => queueBucket(r) === 'closed').length
  };
  const tabs = [
    ['review','Needs review'],
    ['progress','In progress'],
    ['closed','Closed']
  ].map(([key,label]) => `<button type="button" class="ux-filter ${active===key?'is-active':''}" data-action="queue-filter" data-filter="${key}" aria-pressed="${active===key}">${label} <span>${counts[key]}</span></button>`).join('');
  const visible = reports.filter(r => queueBucket(r) === active);
  const entries = visible.map(r => {
    const p = findProduct(demo,r.productId);
    return `<button type="button" class="ux-report-row" data-action="open-queue-report" data-id="${txt(r.id)}">
      <span class="ux-row-main"><strong>${txt(r.id)} · ${txt(p?.name||'Chemical')}</strong>
      <small>${txt(siteName(r.siteId))} · ${txt(r.area)}</small></span>
      <span class="ux-row-end"><span class="ux-status ${queueBucket(r)}">${queueBucketLabel(r)}</span>${icon('arrow',16)}</span>
    </button>`;
  }).join('');
  const focus = visible.find(r => r.id===ui.reportId) || visible[0];
  return `<div class="ux-queue">
    <div class="page-header ux-page-header"><div class="eyebrow">ADMIN / REPORTS</div>
      <h1>Reports inbox</h1><p>See what needs attention. Open a report to review the facts, then take action.</p></div>
    <div class="ux-filter-list" role="group" aria-label="Filter reports by status">${tabs}</div>
    <div class="ux-inbox-grid">
      <section class="ux-panel ux-inbox-panel" aria-label="Reports in selected category">
        <div class="ux-panel-heading"><h2>${active==='review'?'Needs review':active==='progress'?'In progress':'Closed reports'}</h2><span>${visible.length} report${visible.length===1?'':'s'}</span></div>
        ${entries || '<p class="ux-empty">No fictional reports in this category.</p>'}
      </section>
      <aside class="ux-panel ux-desktop-peek" aria-label="Selected report summary">
        <div class="ux-panel-heading"><h2>At a glance</h2><span>Selected item</span></div>
        ${focus ? `<div class="ux-peek-body"><strong>${txt(focus.id)} · ${txt(findProduct(demo,focus.productId)?.name||'Chemical')}</strong>
          <p>${txt(siteName(focus.siteId))} · ${txt(focus.area)}</p>
          <div class="ux-fact-row"><span>Status</span><strong>${queueBucketLabel(focus)}</strong></div>
          <div class="ux-fact-row"><span>Chemical use</span><strong>${txt(labelForAuthorization(authorizationAt(findProduct(demo,focus.productId),focus.siteId)))}</strong></div>
          <button type="button" class="primary-btn wide" data-action="open-queue-report" data-id="${txt(focus.id)}">Open report ${icon('arrow',16)}</button></div>` :
          '<p class="ux-empty">Select a report to see its details.</p>'}
      </aside>
    </div>
    <p class="ux-footnote">Fictional queue · No reports are delivered to a real administrator.</p>
  </div>`;
}
function queueDetailView() {
  if(!canPerform(demo,'view-queue')) return noAccess('Report detail','Select Supervisor or Admin in role preview.');
  const r = chosenQueueReport();
  if(!r) return `<button class="breadcrumb" data-action="nav" data-page="queue">← Reports inbox</button><p class="ux-empty">No received reports in scope.</p>`;
  const p = findProduct(demo,r.productId);
  const authorization = labelForAuthorization(authorizationAt(p,r.siteId));
  const state = queueBucket(r);
  return `<div class="ux-queue ux-compact-flow">
    <button type="button" class="breadcrumb" data-action="nav" data-page="queue">← Reports inbox</button>
    <div class="ux-step-line"><span>01 Inbox</span><strong>02 Report</strong><span>03 Triage</span></div>
    <header class="ux-report-heading"><div class="eyebrow">REPORT REVIEW · ${txt(r.id)}</div>
      <h1>${txt(p?.name||'Chemical')}</h1>
      <p>${txt(siteName(r.siteId))} · ${txt(r.area)}</p>
      <span class="ux-status ${state}">${queueBucketLabel(r)}</span></header>
    <section class="ux-panel ux-risk-panel" aria-label="Chemical use authorization">
      <div class="ux-panel-heading"><h2>Use authorization</h2><span>Site status</span></div>
      <strong>${txt(authorization)}</strong>
      <p>Verifying a manufacturer document or reviewing this report does not authorize chemical use.</p>
    </section>
    <section class="ux-panel ux-summary-panel">
      <div class="ux-panel-heading"><h2>What was reported?</h2><span>${txt(r.type)}</span></div>
      <p class="ux-observation">${txt(r.notes||'No additional details provided.')}</p>
      <div class="ux-identity-grid">
        <div><small>Person reporting</small><strong>${txt(r.reporter)}</strong><span>Self-reported, not authenticated</span></div>
        <div><small>Account / session</small><strong>${txt(r.account)}</strong><span>Actual demo session used</span></div>
      </div>
    </section>
    <section class="ux-panel ux-next-panel">
      <div class="ux-panel-heading"><h2>Next action</h2><span>${state==='closed'?'Completed (demo)':r.triage?'Continue review':'Step 3 of 3'}</span></div>
      ${state==='closed'?'<p>This fictional report has been closed. Its audit history remains available below.</p>':
        `<p>${r.triage?'Initial triage was recorded. Review disposition or update the follow-up.':'Confirm the situation and document the initial safety triage.'}</p>
        <button type="button" class="primary-btn wide ux-large-action" data-action="open-queue-triage"> ${r.triage?'Continue to disposition':'Review & record triage'} ${icon('arrow',17)}</button>
        ${canPerform(demo,'acknowledge',r.siteId)?
          `<button type="button" class="ux-text-action" data-action="ack-report" data-id="${txt(r.id)}">Acknowledge this report</button>`:''}`}
    </section>
    <details class="ux-panel ux-disclosure"><summary>Report history and additional details</summary>
      <p>Report type: ${txt(r.type)}</p><p>Received: ${txt(r.receivedAt||'Simulated')}</p>
      <ul>${r.audit.map(event=>`<li>${txt(event)}</li>`).join('')}</ul></details>
    <p class="ux-footnote">This is a demonstration. Urgent hazards require direct contact with supervision or Safety.</p>
  </div>`;
}
function queueTriageView() {
  if(!canPerform(demo,'view-queue')) return noAccess('Safety triage','Select Supervisor or Admin in role preview.');
  const r = chosenQueueReport();
  if(!r) return `<button type="button" class="breadcrumb" data-action="nav" data-page="queue">← Reports inbox</button><p class="ux-empty">No report selected.</p>`;
  const p = findProduct(demo,r.productId);
  const canTriage = canPerform(demo,'triage',r.siteId);
  const canResolve = canPerform(demo,'resolve',r.siteId);
  const done = r.status === 'resolved';
  return `<div class="ux-queue ux-compact-flow">
    <button type="button" class="breadcrumb" data-action="nav" data-page="queue-detail">← Report summary</button>
    <div class="ux-step-line"><span>01 Inbox</span><span>02 Report</span><strong>03 Triage</strong></div>
    <header class="ux-report-heading"><div class="eyebrow">SAFETY REVIEW · ${txt(r.id)}</div>
      <h1>Initial safety triage</h1>
      <p>${txt(p?.name||'Chemical')} · ${txt(siteName(r.siteId))}</p></header>
    <section class="ux-panel ux-risk-panel ux-risk-compact">
      <div class="ux-fact-row"><span>Use authorization</span><strong>${txt(labelForAuthorization(authorizationAt(p,r.siteId)))}</strong></div>
      <p>Report observations and use authorization are separate. Field communication is still required for urgent hazards.</p>
    </section>
    <section class="ux-panel ux-triage-card">
      <div class="ux-panel-heading"><h2>Document field verification</h2><span>Demo only</span></div>
      <div class="field"><label for="triage-use">What is known about chemical use?</label>
        <select id="triage-use" ${done?'disabled':''}>
          <option value="unknown" ${r.triage?.useState==='unknown'?'selected':''}>Unknown — field verification needed</option>
          <option value="in-use" ${r.triage?.useState==='in-use'?'selected':''}>Currently reported in use</option>
          <option value="stored" ${r.triage?.useState==='stored'?'selected':''}>Stored / not known to be in use</option>
        </select></div>
      <div class="field"><label for="triage-note">Follow-up notes</label>
        <textarea id="triage-note" rows="3" placeholder="Document what must be checked and who should follow up" ${done?'disabled':''}>${txt(r.triage?.note||'')}</textarea></div>
      ${!done?`<button type="button" class="primary-btn wide ux-large-action" data-action="triage-report" data-id="${txt(r.id)}" ${canTriage?'':'disabled'}>Record triage ${icon('check',17)}</button>`:''}
      ${!canTriage&&!done?'<p class="help-warning">This role does not have permission to change the triage record.</p>':''}
    </section>
    ${r.triage?`<section class="ux-panel ux-disposition-card">
      <div class="ux-panel-heading"><h2>Disposition</h2><span>${done?'Closed':'After triage'}</span></div>
      <p>Closing this report does not approve the chemical for use.</p>
      ${!done?`<div class="field"><label for="close-outcome">Review outcome</label>
        <select id="close-outcome"><option value="confirmed">Confirmed in use (authorization remains separate)</option>
          <option value="not-found">Not found</option><option value="misidentified">Incorrect chemical identified</option></select></div>
        <button class="secondary-btn wide" type="button" data-action="resolve-report" data-id="${txt(r.id)}" ${canResolve?'':'disabled'}>Resolve demo report</button>`:
        '<p class="ux-footnote">Resolved in demo. Check report history for its audit trail.</p>'}
      </section>`:
      '<p class="ux-footnote">Disposition becomes available after triage is recorded.</p>'}
    <details class="ux-panel ux-disclosure"><summary>Audit history</summary>
      <ul>${r.audit.map(entry=>`<li>${txt(entry)}</li>`).join('')}</ul></details>
  </div>`;
}
function settingsView() {
  if(demo.role!=='admin') return noAccess('Admin settings','Select Admin role preview to inspect fictional permission controls.');
  return `<div class="ux-queue">
    <div class="page-header ux-page-header"><div class="eyebrow">ADMIN / SETTINGS</div>
      <h1>Permissions</h1><p>Configure who can carry out administrator tasks. This is a role preview, not real account security.</p></div>
    <section class="ux-panel ux-settings-card">
      <div class="ux-panel-heading"><h2>Delegated supervisor access</h2><span>Fictional</span></div>
      <p>Allow the Cinder Ridge supervisor to record initial safety triage for reports at that site.</p>
      <label class="ux-setting-toggle"><input id="grant-triage" type="checkbox" ${demo.delegated.triageCinder?'checked':''} ${demo.connection==='online'?'':'disabled'}/>
        <span><strong>Supervisor may record triage</strong><small>Cinder Ridge only · Can be revoked</small></span></label>
    </section>
    <p class="ux-footnote">Application permissions never grant authority to approve a chemical for use.</p>
  </div>`;
}

function documentsView() {
  if(demo.role!=='admin')return noAccess('Document review','Switch to Admin role preview to test fictional document verification and publication.');
  const p=findProduct(demo,ui.adminProductId);
  const classNames={routine:'Routine document update',significant:'Safety-significant change',uncertain:'Uncertain — further review required'};
  const online=demo.connection==='online';
  return `<div class="page-header"><div class="eyebrow">SIMULATED DOCUMENT CONTROL</div><h1>Review & publish a demo revision</h1><p>One fictitious administrator can review a mock fixture, classify a change, and publish an illustrative revision. No real SDSs are processed.</p></div>
    <div class="review-layout"><div class="form-card">
      <div class="field"><label for="admin-product">Fictional product</label><select id="admin-product">${demo.products.map(x=>`<option value="${x.id}" ${p.id===x.id?'selected':''}>${txt(x.name)}</option>`).join('')}</select></div>
      <div class="fixture-warning">${icon('alert',20)}<div><strong>DEMO DOCUMENT FIXTURE ONLY</strong><p>${txt(DEMO_WARNING)}. This is not manufacturer SDS verification.</p></div></div>
      <div class="field checkline"><label><input type="checkbox" id="fixture-check" ${ui.fixtureChecked?'checked':''}/> I reviewed this fictional document fixture against the fictional product identity</label></div>
      <div class="field"><label for="classification">Illustrative revision classification</label><select id="classification">${CLASSIFICATIONS.map(c=>`<option value="${c}" ${ui.classification===c?'selected':''}>${txt(classNames[c])}</option>`).join('')}</select></div>
      <button type="button" class="primary-btn wide" data-action="publish-revision" ${online&&ui.fixtureChecked?'':'disabled'}>${icon('check',18)} Publish demo revision</button>
      <p class="field-caption">Publication here changes this tab's demo catalog only. It does not change GitHub, any server, or a real SDS.</p>
    </div><div><section class="surface-card"><h2>Product / document control</h2><p class="small-muted">${txt(p.manufacturer)} · ${txt(p.code)}</p><div class="stat-row"><span>Latest demo revision</span><strong>${txt(currentVersion(p).label)}</strong></div><div class="stat-row"><span>Recorded revisions</span><strong>${p.versions.length}</strong></div><div class="stat-row"><span>Mine site assignments</span><strong>${p.assignments.length}</strong></div></section>
      <section class="surface-card"><h2>What publication demonstrates</h2><ol class="light-list"><li>Controlled revision advances.</li><li>Worker's current online document changes.</li><li>Simulated device and binder update tasks appear.</li><li>Earlier cached copy stays unchanged until a demo sync.</li></ol></section></div></div>`;
}

function distributionView() {
  if(demo.role!=='admin')return noAccess('Distribution','Switch to Admin role preview to see the fictional device and binder update queue.');
  return `<div class="page-header"><div class="eyebrow">SIMULATED DOCUMENT DELIVERY</div><h1>Distribution tracking</h1><p>Publishing a mock revision creates outstanding device and binder tasks. This panel does not track real equipment or physical binders.</p></div>
    <div class="metrics"><div><small>Pending updates</small><strong>${demo.distribution.filter(d=>d.status==='pending').length}</strong></div><div><small>Confirmed in demo</small><strong>${demo.distribution.filter(d=>d.status==='confirmed').length}</strong></div><div><small>Sites represented</small><strong>${SITES.length}</strong></div></div>
    <div class="distribution-list">${demo.distribution.length?demo.distribution.map(d=>{
      const product=findProduct(demo,d.productId), pending=d.status==='pending';
      return `<div class="distribution-row"><div class="distribution-symbol">${icon(d.type==='binder'?'book':'refresh',18)}</div><div><strong>${txt(product?.name||'Chemical')} · ${txt(d.versionId)}</strong><small>${txt(siteName(d.siteId))} · ${d.type==='binder'?'Printed binder':'Managed demo device'}</small></div><span class="tag ${pending?'warn':'safe'}">${pending?'Pending':'Confirmed (demo)'}</span>${d.type==='binder'&&pending?`<button class="quiet-btn" data-action="confirm-binder" data-id="${txt(d.id)}" ${demo.connection==='online'?'':'disabled'}>Confirm replacement</button>`:''}${d.type==='device'&&pending?`<button class="quiet-btn" data-action="sync-device" data-id="${d.productId}" data-site="${d.siteId}" ${demo.connection==='online'?'':'disabled'}>Simulate sync</button>`:''}</div>`;
    }).join(''):'<div class="empty">No demo revisions have been published yet. Use Document review to create a distribution example.</div>'}</div>
    ${demo.eventLog.length?`<section class="surface-card"><h2>Illustrative event history</h2><ul class="light-list">${demo.eventLog.map(e=>`<li>${txt(e)}</li>`).join('')}</ul></section>`:''}`;
}

function noAccess(title,help){return `<div class="empty-permission">${icon('lock',32)}<h1>${txt(title)}</h1><p>${txt(help)}</p><div class="microcopy">This role switch is a visual demonstration, not real authentication.</div></div>`;}

function renderDocumentModal(){
  const p=findProduct(demo,ui.productId);
  const v=p?.versions.find(v=>v.id===ui.modalVersion);
  if(!p||!v)return '';
  const latest=v.id===currentVersion(p)?.id;
  const offline=demo.connection==='offline';
  return `<div class="modal-backdrop" data-action="close-modal"><section class="document-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><div><div class="eyebrow">FICTIONAL DOCUMENT PREVIEW</div><h2 id="modal-title">${txt(p.name)} · ${txt(v.label)}</h2></div><button class="icon-btn" type="button" data-action="close-modal" aria-label="Close document">${icon('close',22)}</button></header><div class="modal-body"><div class="fixture-masthead">${txt(DEMO_WARNING)}</div><div class="fixture-sheet"><div class="fixture-brand">MOCK DOCUMENT · DEMO FIXTURE</div><h3>${txt(p.name)}</h3><p>${txt(p.manufacturer)}</p><div class="fixture-rule"></div><strong>${txt(v.label)} ${latest&&!offline?'· Latest published demo revision':'· Historical or cached demo revision'}</strong><p>Sample screen to test navigation, revision labels and hierarchy. It intentionally contains <strong>no chemical hazards, exposure limits, protective equipment instructions or emergency procedures</strong>.</p><div class="fake-line wide-line"></div><div class="fake-line"></div><div class="fake-line short-line"></div><div class="faux-disclaimer">This preview is not a Safety Data Sheet and is not suitable for safety decisions.</div></div></div><footer><span>${txt(v.published)} · ${offline?'Offline demo cache':'Online demo catalog'}</span><button type="button" class="secondary-btn" data-action="close-modal">Close viewer</button></footer></section></div>`;
}
function render() {
  let content;
  switch(ui.page){
    case 'detail':content=detailView();break;
    case 'report':content=reportView();break;
    case 'reports':content=reportsView();break;
    case 'queue':content=queueView();break;
    case 'queue-detail':content=queueDetailView();break;
    case 'queue-triage':content=queueTriageView();break;
    case 'settings':content=settingsView();break;
    case 'documents':content=documentsView();break;
    case 'distribution':content=distributionView();break;
    default:content=libraryView();
  }
  root.innerHTML=shell(content);
  refreshToastTimer();
}

// Route changes should never inherit scroll position from the previous screen.
// In-page changes (history expansion, demo controls) retain the current scroll.
function resetScrollOnPageChange(previousPage) {
  if (ui.page === previousPage) return;
  window.scrollTo(0, 0);
  window.requestAnimationFrame(() => window.scrollTo(0, 0));
}

function act(action,element) {
  ui.toastCritical = false;
  const previousPage = ui.page;
  const id=element.dataset.id;
  switch(action){
    case 'nav': ui.page=element.dataset.page; ui.toast=''; break;
    case 'product': ui.productId=id;ui.page='detail';ui.history=false;ui.toast=''; break;
    case 'start-report': ui.productId=id;ui.page='report';ui.toast=''; break;
    case 'view-current': {const shown=versionForDisplay(demo,ui.productId,ui.siteId);if(shown?.version)ui.modalVersion=shown.version.id;break;}
    case 'view-revision': ui.productId=id;ui.modalVersion=element.dataset.version;break;
    case 'close-modal': ui.modalVersion=null;break;
    case 'toggle-history': ui.history=!ui.history;break;
    case 'dismiss-toast':ui.toast='';break;
    case 'toggle-network':{
      const next=demo.connection==='online'?'offline':'online';
      const update=setConnection(demo,next);demo=update.state;
      ui.toast=next==='offline'?'Offline simulation: server currentness and receipt cannot be verified.':`Online simulation resumed. ${update.retried} local draft${update.retried===1?'':'s'} moved to demo queue.`;
      break;
    }
    case 'submit-report': {
      const values={productId:ui.productId,siteId:ui.siteId,
        area:document.getElementById('report-area')?.value,type:document.getElementById('report-type')?.value,
        reporter:document.getElementById('report-name')?.value,notes:document.getElementById('report-notes')?.value};
      const res=submitDemoReport(demo,values);demo=res.state;ui.page='reports';
      ui.toast=res.report.status==='local'?'Saved locally only. Not received by an administrator.':'Simulated receipt created. No real administrator or server received this.';
      break;
    }
    case 'queue-filter': ui.queueFilter=element.dataset.filter;ui.page='queue';ui.toast='';break;
    case 'open-queue-report': ui.reportId=id;ui.page='queue-detail';ui.toast='';break;
    case 'open-queue-triage': ui.page='queue-triage';ui.toast='';break;
    case 'select-report': ui.reportId=id;ui.page='queue-detail';break;
    case 'triage-report': {
      demo=recordTriage(demo,id,document.getElementById('triage-use')?.value,document.getElementById('triage-note')?.value);
      ui.queueFilter='progress';ui.toast='Triage recorded in this demo session; field response remains outside the app.';break;
    }
    case 'ack-report':demo=acknowledgeReport(demo,id);ui.toast='Acknowledgment recorded in demo audit trail.';break;
    case 'resolve-report':demo=resolveReport(demo,id,document.getElementById('close-outcome')?.value);ui.page='queue-detail';ui.queueFilter='closed';ui.toast='Report resolved in demo. Any use-authorization concern remains separate.';break;
    case 'publish-revision': {
      const res=publishDemoRevision(demo,ui.adminProductId,{fixtureChecked:ui.fixtureChecked,classifiedAs:ui.classification});
      demo=res.state;ui.fixtureChecked=false;ui.toast=`${res.version.label} published in DEMO ONLY. Check Library and Distribution views.`;break;
    }
    case 'sync-device':demo=synchronizeDemoDevice(demo,id||ui.productId,element.dataset.site||ui.siteId);ui.toast='Simulated device cache updated. This does not sync a real device.';break;
    case 'confirm-binder':demo=confirmDemoBinder(demo,id);ui.toast='Simulated binder replacement confirmed. No physical binder was checked.';break;
    case 'reset':if(window.confirm('Reset the fictional demo data and discard in-tab reports?')){demo=createDemoState();ui={page:'library',productId:'chem-001',siteId:'cinder',query:'',history:false,modalVersion:null,reportId:'R-001',adminProductId:'chem-001',fixtureChecked:false,classification:'uncertain',toast:'Fictional demo reset.',queueFilter:'review'};}break;
  }
  render();
  resetScrollOnPageChange(previousPage);
}
root.addEventListener('click',e=>{
  const el=e.target.closest('[data-action]');if(!el)return;
  if(el.dataset.action==='close-modal' && e.target.closest('.document-modal') && !e.target.closest('button'))return;
  try{act(el.dataset.action,el);}catch(err){ui.toast=err.message;ui.toastCritical=true;render();}
});
root.addEventListener('change',e=>{
 const el=e.target;
 const previousPage = ui.page;
 ui.toastCritical = false;
 try{
  switch(el.id){
   case 'role-switch':demo.role=el.value;ui.page='library';ui.queueFilter='review';ui.toast='Role preview changed. No authentication occurred.';break;
   case 'mobile-site-switch':
   case 'site-switch':ui.siteId=el.value;ui.page='library';ui.query='';ui.toast='';break;
   case 'session-mode':demo.sessionMode=el.value;demo.sessionAccount=el.value==='shared'?'Shared Shop Tablet':'Jordan Demo Account';break;
   case 'admin-product':ui.adminProductId=el.value;ui.fixtureChecked=false;break;
   case 'classification':ui.classification=el.value;break;
   case 'fixture-check':ui.fixtureChecked=el.checked;break;
   case 'grant-triage':demo=setDemoDelegation(demo,el.checked);ui.toast='Simulated Supervisor Cinder Ridge triage permission updated.';break;
   default:return;
  }
  render();
  resetScrollOnPageChange(previousPage);
 }catch(err){ui.toast=err.message;ui.toastCritical=true;render();}
});
root.addEventListener('input',e=>{
 if(e.target.id==='chemical-search'){
  const pos=e.target.selectionStart;
  ui.query=e.target.value;
  render();const search=document.getElementById('chemical-search');
  if(search){search.focus();search.setSelectionRange(pos,pos);}
 }
});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&ui.modalVersion){ui.modalVersion=null;render();}});
render();