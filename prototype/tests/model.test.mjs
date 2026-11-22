import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createDemoState,findProduct,currentVersion,versionForDisplay,authorizationAt,canPerform,
  submitDemoReport,setConnection,recordTriage,resolveReport,publishDemoRevision,
  synchronizeDemoDevice,confirmDemoBinder,setDemoDelegation
} from '../model.mjs';

const reportInput={productId:'chem-001',siteId:'cinder',area:'Maintenance Shop',reporter:'Taylor Example',type:'Observed chemical use',notes:'Fictional report'};

test('two sites share master product identity but have different use authorization',()=>{
 const state=createDemoState(),p=findProduct(state,'chem-001');
 assert.equal(p.assignments.length,2);
 assert.equal(authorizationAt(p,'cinder'),'unconfirmed');
 assert.equal(authorizationAt(p,'silver'),'approved');
});

test('offline local report cannot appear received until reconnect, and retries are idempotent',()=>{
 let state=setConnection(createDemoState(),'offline').state;
 const submitted=submitDemoReport(state,reportInput);state=submitted.state;
 assert.equal(submitted.report.status,'local');assert.equal(submitted.report.receivedAt,null);
 const receipt=setConnection(state,'online');state=receipt.state;
 assert.equal(receipt.retried,1);
 const sameReport=state.reports.find(r=>r.id===submitted.report.id);
 assert.equal(sameReport.status,'received');assert.match(sameReport.receivedAt,/simulated/i);
 const again=setConnection(state,'online');assert.equal(again.retried,0);
 assert.equal(again.state.reports.filter(r=>r.id===sameReport.id).length,1);
});

test('shared-session reporting preserves account and separate claimed reporter name',()=>{
 let s=createDemoState();
 const result=submitDemoReport(s,reportInput);
 assert.equal(result.report.account,'Shared Shop Tablet');
 assert.equal(result.report.reporter,'Taylor Example');
 assert.equal(result.report.identity,'self-reported');
 assert.throws(()=>submitDemoReport(s,{...reportInput,reporter:''}),/Enter who/);
});

test('field user may read but cannot triage, publish or delegate',()=>{
 const s=createDemoState();assert.equal(canPerform(s,'read-sds'),true);
 assert.equal(canPerform(s,'triage','cinder'),false);
 assert.equal(canPerform(s,'publish'),false);
 assert.throws(()=>publishDemoRevision(s,'chem-001',{fixtureChecked:true,classifiedAs:'routine'}),/Admin/);
});

test('supervisor has default visibility and scoped triage only when delegated',()=>{
 let s=createDemoState();s.role='admin';s=setDemoDelegation(s,true);
 s.role='supervisor';assert.equal(canPerform(s,'view-queue','cinder'),true);
 assert.equal(canPerform(s,'triage','cinder'),true);
 assert.equal(canPerform(s,'triage','silver'),false);
 assert.equal(canPerform(s,'publish'),false);
 s=setConnection(s,'offline').state;
 assert.equal(canPerform(s,'triage','cinder'),false);
});

test('admin may only triage and publish while online; resolve requires triage',()=>{
 let s=createDemoState();s.role='admin';
 assert.throws(()=>resolveReport(s,'R-001','confirmed'),/triage/i);
 s=recordTriage(s,'R-001','in-use','Field follow-up required.');
 s=resolveReport(s,'R-001','confirmed');
 assert.equal(s.reports[0].status,'resolved');
 assert.equal(authorizationAt(findProduct(s,'chem-001'),'cinder'),'unconfirmed');
 s=setConnection(s,'offline').state;
 assert.throws(()=>publishDemoRevision(s,'chem-001',{fixtureChecked:true,classifiedAs:'routine'}),/online/);
});

test('publication advances revision and creates separate pending device and binder tasks',()=>{
 let s=createDemoState();s.role='admin';
 const oldRevision=currentVersion(findProduct(s,'chem-001'));
 assert.throws(()=>publishDemoRevision(s,'chem-001',{classifiedAs:'routine',fixtureChecked:false}),/Confirm/);
 const result=publishDemoRevision(s,'chem-001',{classifiedAs:'uncertain',fixtureChecked:true});s=result.state;
 assert.notEqual(currentVersion(findProduct(s,'chem-001')).id,oldRevision.id);
 assert.equal(s.distribution.length,4);
 assert.equal(s.distribution.filter(d=>d.status==='pending').length,4);
 s=synchronizeDemoDevice(s,'chem-001');
 assert.equal(s.distribution.filter(d=>d.type==='device'&&d.status==='confirmed').length,1);
 assert.equal(s.distribution.filter(d=>d.type==='device'&&d.status==='pending').length,1);
 assert.equal(s.distribution.filter(d=>d.type==='binder'&&d.status==='pending').length,2);
 s=confirmDemoBinder(s,s.distribution.find(d=>d.type==='binder').id);
 assert.equal(s.distribution.filter(d=>d.type==='binder'&&d.status==='confirmed').length,1);
});

test('offline viewer shows cached revision without claiming newest version',()=>{
 const online=createDemoState(),p=findProduct(online,'chem-001');
 assert.equal(versionForDisplay(online,p.id).version.id,'r2');
 const offline=setConnection(online,'offline').state;
 const displayed=versionForDisplay(offline,p.id);
 assert.equal(displayed.version.id,'r1');
 assert.equal(displayed.currentness,'unconfirmed-offline');
 assert.equal(displayed.current,null);
 assert.equal(versionForDisplay(offline,'chem-003').version,null);
});

test('publishing does not change live baseline input or imply authorization',()=>{
 const baseline=createDemoState();let admin=structuredClone(baseline);admin.role='admin';
 const result=publishDemoRevision(admin,'chem-001',{fixtureChecked:true,classifiedAs:'significant'});
 assert.equal(findProduct(baseline,'chem-001').versions.length,2);
 assert.equal(authorizationAt(findProduct(result.state,'chem-001'),'cinder'),'unconfirmed');
});