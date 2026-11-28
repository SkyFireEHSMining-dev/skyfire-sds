/**
 * SkyFire SDS v0.1 — FICTIONAL / NON-OPERATIONAL MODEL.
 * All values are volatile, in-browser simulation data. No real SDS, server,
 * user authentication, secure sync, or compliance service exists here.
 */

export const DEMO_WARNING = 'DEMO — NOT A SAFETY DATA SHEET — DO NOT USE FOR HAZARD COMMUNICATION';
export const SITES = Object.freeze([
  { id: 'cinder', name: 'Cinder Ridge', subtitle: 'Fictional surface mine', areas: ['Maintenance Shop', 'Processing', 'Mine Operations'] },
  { id: 'silver', name: 'Silver Hollow', subtitle: 'Fictional underground mine', areas: ['Underground Maintenance', 'Development', 'Surface Services'] }
]);
export const CLASSIFICATIONS = ['routine', 'significant', 'uncertain'];
export const TRIAGE = ['in-use', 'stored', 'unknown'];
export const OUTCOMES = ['confirmed', 'not-found', 'misidentified'];

const initialProducts = [
  {
    id: 'chem-001', name: 'MX-42 Cleaner', manufacturer: 'ExampleWorks (fictional)', code: 'MX-42',
    versions: [
      { id: 'r1', label: 'Revision 1', published: '2026-10-12', classification: 'routine' },
      { id: 'r2', label: 'Revision 2', published: '2026-11-20', classification: 'uncertain' }
    ],
    assignments: [
      { siteId: 'cinder', area: 'Maintenance Shop', authorization: 'unconfirmed' },
      { siteId: 'silver', area: 'Underground Maintenance', authorization: 'approved' }
    ]
  },
  {
    id: 'chem-002', name: 'HX-8 Equipment Lubricant', manufacturer: 'Westhaven Demo Supply (fictional)', code: 'HX-8',
    versions: [{ id: 'r1', label: 'Revision 1', published: '2026-09-01', classification: 'routine' }],
    assignments: [{ siteId: 'cinder', area: 'Processing', authorization: 'approved' }]
  },
  {
    id: 'chem-003', name: 'AR-9 Shop Rinse', manufacturer: 'Fictional Materials Co.', code: 'AR-9',
    versions: [{ id: 'r1', label: 'Revision 1', published: '2026-10-25', classification: 'routine' }],
    assignments: [{ siteId: 'silver', area: 'Surface Services', authorization: 'unconfirmed' }]
  }
];
const initialReports = [
  {
    id: 'R-001', clientId: 'seed-r-001', productId: 'chem-001', siteId: 'cinder', area: 'Maintenance Shop',
    type: 'Observed chemical use', reporter: 'Avery Example', identity: 'self-reported', account: 'Shared Shop Tablet',
    notes: 'Fictional report: the cleaner was observed in the shop.', created: 'Nov 22, 2026', status: 'received',
    triage: null, disposition: null, receivedAt: 'Demo receipt (simulated)',
    audit: ['Demo submission received in simulated queue.']
  }
];

export function createDemoState() {
  return {
    products: structuredClone(initialProducts), reports: structuredClone(initialReports),
    nextReport: 2, role: 'field', connection: 'online', sessionMode: 'shared',
    sessionAccount: 'Shared Shop Tablet', delegated: { triageCinder: false },
    cache: { cinder: { 'chem-001': 'r1', 'chem-002': 'r1' }, silver: { 'chem-001': 'r1' } },
    lastSync: { cinder: 'Nov 20, 2026 · 09:15 (demo)', silver: 'Nov 18, 2026 · 08:45 (demo)' },
    distribution: [], eventLog: [],
  };
}

export function findProduct(state, productId) {
  return state.products.find(p => p.id === productId) || null;
}

export function currentVersion(product) {
  return product?.versions?.at(-1) || null;
}

export function versionForDisplay(state, productId, siteId = 'cinder') {
  const p = findProduct(state, productId);
  if (!p) return null;
  const current = currentVersion(p);
  const cached = p.versions.find(v => v.id === state.cache[siteId]?.[p.id]) || null;
  if (state.connection === 'online') {
    return { version: current, current, cached, source: 'online demo catalog', currentness: 'latest-known', lastSync: state.lastSync[siteId] };
  }
  return {
    version: cached, current: null, cached, source: 'simulated offline cache',
    currentness: 'unconfirmed-offline', lastSync: state.lastSync[siteId]
  };
}

export function authorizationAt(product, siteId) {
  return product?.assignments.find(a => a.siteId === siteId)?.authorization || 'not-assigned';
}

/** All role checks here are UX demonstrations, NOT security enforcement. */
export function canPerform(state, action, siteId = 'cinder') {
  if (action === 'read-sds' || action === 'submit-report') return true;
  if (action === 'view-queue') return state.role === 'admin' || state.role === 'supervisor';
  if (action === 'acknowledge') return state.connection === 'online' && (state.role === 'admin' || state.role === 'supervisor');
  if (state.connection !== 'online') return false;
  if (state.role === 'admin') return ['triage','resolve','publish','delegate','sync','binder'].includes(action);
  if (state.role === 'supervisor' && action === 'triage' && siteId === 'cinder') return Boolean(state.delegated.triageCinder);
  return false;
}

function nextReportId(state) {
  return `R-${String(state.nextReport).padStart(3, '0')}`;
}

/** Returns a fresh state; throws if the minimum report input is absent. */
export function submitDemoReport(state, input) {
  if (!findProduct(state, input.productId)) throw new Error('Choose a demo chemical.');
  if (!SITES.some(s => s.id === input.siteId)) throw new Error('Choose a site.');
  const reporter = String(input.reporter || '').trim();
  if (!reporter) throw new Error('Enter who is reporting this observation.');
  const s = structuredClone(state);
  const report = {
    id: nextReportId(s), clientId: `demo-client-${s.nextReport}`,
    productId: input.productId, siteId: input.siteId, area: String(input.area || 'Unknown area').trim().slice(0, 100),
    type: input.type === 'Discrepancy / missing document' ? input.type : 'Observed chemical use',
    reporter: reporter.slice(0, 100), identity: 'self-reported',
    account: s.sessionAccount, notes: String(input.notes || '').slice(0, 600),
    created: 'Demo session', status: s.connection === 'online' ? 'received' : 'local',
    triage: null, disposition: null,
    receivedAt: s.connection === 'online' ? 'Demo receipt (simulated)' : null,
    audit: [s.connection === 'online' ? 'Simulated receipt into in-memory administrator queue.' : 'Saved only in local demo session; not received.']
  };
  s.nextReport++;
  s.reports.unshift(report);
  return { state: s, report };
}

export function retryLocalReports(state) {
  const s = structuredClone(state);
  if (s.connection !== 'online') return { state: s, retried: 0 };
  let retried = 0;
  for (const r of s.reports) {
    if (r.status === 'local' && r.reporter.trim()) {
      r.status = 'received';
      r.receivedAt = 'Demo receipt after reconnect (simulated)';
      r.audit.push('Auto-retry: simulated queue receipt. Same client report ID retained.');
      retried++;
    }
  }
  return { state: s, retried };
}

export function setConnection(state, connection) {
  const s = structuredClone(state);
  if (!['online','offline'].includes(connection)) throw new Error('Unknown demo network mode.');
  s.connection = connection;
  if (connection === 'online') return retryLocalReports(s);
  return { state: s, retried: 0 };
}

export function recordTriage(state, reportId, useState, note) {
  const s = structuredClone(state);
  const report = s.reports.find(r => r.id === reportId);
  if (!report || report.status === 'local') throw new Error('Report is not in the simulated administrator queue.');
  if (!TRIAGE.includes(useState)) throw new Error('Select a triage use status.');
  if (!canPerform(s, 'triage', report.siteId)) throw new Error('Current demo role has no online triage permission for this site.');
  report.triage = { useState, note: String(note || '').slice(0, 500), by: s.role, at: 'Demo session' };
  report.audit.push(`Triage recorded: ${useState} (${s.role}, simulated).`);
  return s;
}

export function acknowledgeReport(state, reportId) {
  const s = structuredClone(state);
  const report = s.reports.find(r=>r.id===reportId);
  if(!report || report.status === 'local' || !canPerform(s,'acknowledge',report.siteId)) throw new Error('Cannot acknowledge that report.');
  report.audit.push(`Acknowledged by ${s.role} (simulated).`);
  return s;
}

export function resolveReport(state, reportId, outcome) {
  const s = structuredClone(state);
  const report = s.reports.find(r=>r.id===reportId);
  if (!report || report.status !== 'received' || !OUTCOMES.includes(outcome)) throw new Error('Select an eligible report and outcome.');
  if (!canPerform(s, 'resolve', report.siteId)) throw new Error('Only an online demo Admin can resolve the report.');
  if (!report.triage) throw new Error('Record safety triage before resolution.');
  report.status = 'resolved';
  report.disposition = outcome;
  report.audit.push(`Resolved: ${outcome}. Fictional reporter notified in demo only. Authorization not changed.`);
  return s;
}

export function publishDemoRevision(state, productId, { classifiedAs, fixtureChecked } = {}) {
  const s = structuredClone(state);
  const product = findProduct(s, productId);
  if (!product) throw new Error('Select a product.');
  if (!canPerform(s, 'publish')) throw new Error('Only an online demo Admin can publish a mock revision.');
  if (!fixtureChecked) throw new Error('Confirm the fictional document fixture has been reviewed.');
  if (!CLASSIFICATIONS.includes(classifiedAs)) throw new Error('Choose the illustrative change classification.');
  const index = product.versions.length + 1;
  const version = {id: `r${index}`, label: `Revision ${index}`, published: 'Demo session', classification: classifiedAs};
  product.versions.push(version);
  for (const assignment of product.assignments) {
    s.distribution.push({id:`d-${productId}-${version.id}-${assignment.siteId}-digital`,productId,versionId:version.id,siteId:assignment.siteId,type:'device',status:'pending'});
    s.distribution.push({id:`d-${productId}-${version.id}-${assignment.siteId}-binder`,productId,versionId:version.id,siteId:assignment.siteId,type:'binder',status:'pending'});
  }
  s.eventLog.unshift(`${product.name} ${version.label} published in simulation (${classifiedAs}); offline copies/binders remain pending.`);
  return {state:s, version};
}

export function synchronizeDemoDevice(state, productId, siteId = 'cinder') {
  const s = structuredClone(state);
  const product = findProduct(s, productId);
  if (!product) throw new Error('Unknown product.');
  if (s.connection !== 'online') throw new Error('Demo device cannot synchronize while offline.');
  if (!s.cache[siteId]) s.cache[siteId] = {};
  s.cache[siteId][productId] = currentVersion(product).id;
  s.lastSync[siteId] = 'Just now (simulated)';
  for (const d of s.distribution) {
    if (d.productId === productId && d.siteId === siteId && d.type === 'device') d.status = 'confirmed';
  }
  return s;
}

export function confirmDemoBinder(state, distributionId) {
  const s=structuredClone(state);
  if(!canPerform(s,'binder')) throw new Error('Online demo Admin permission required.');
  const task=s.distribution.find(t=>t.id===distributionId && t.type==='binder');
  if(!task) throw new Error('Binder task not found.');
  task.status='confirmed';
  return s;
}

export function setDemoDelegation(state, enabled) {
  const s=structuredClone(state);
  if(!canPerform(s,'delegate')) throw new Error('Only an online demo Admin can change delegated controls.');
  s.delegated.triageCinder=Boolean(enabled);
  s.eventLog.unshift(`Cinder Ridge supervisor triage permission ${enabled?'granted':'revoked'} (simulated).`);
  return s;
}