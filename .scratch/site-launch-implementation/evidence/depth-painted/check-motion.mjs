import puppeteer from 'file:///C:/Users/sweep/.agents/skills/browser-tools/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs/promises';
const root='C:/Users/sweep/projects/LeifNevMusic/.scratch/site-launch-implementation/evidence/';
const browser=await puppeteer.launch({executablePath:'C:/Users/sweep/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const result=[];
try {
 for(const kind of ['painted']) {
  const page=await browser.newPage();
  await page.setViewport({width:390,height:844,deviceScaleFactor:1});
  await page.goto(`http://127.0.0.1:4321/proof/bridge-${kind}.html`,{waitUntil:'networkidle0'});
  const read=()=>page.evaluate(()=>({transform:getComputedStyle(document.querySelector('[data-depth-subject]')).transform,frame:document.querySelector('[data-depth-frame]').getBoundingClientRect().toJSON(),title:document.querySelector('h1').getBoundingClientRect().toJSON(),label:document.querySelector('[data-motion-toggle]').textContent,hidden:document.hidden}));
  const before=await read();await wait(350);const after=await read();
  await page.click('[data-motion-toggle]');const paused=await read();await wait(350);const pausedAfter=await read();
  await page.click('[data-motion-toggle]');await wait(350);const resumed=await read();
  await page.evaluate(()=>scrollTo(0,1000));await wait(150);const offscreen=await read();await wait(350);const offscreenAfter=await read();
  await page.evaluate(()=>scrollTo(0,0));await wait(150);
  const other=await browser.newPage();await other.goto('about:blank');await other.bringToFront();await wait(150);const hidden=await read();await wait(350);const hiddenAfter=await read();await other.close();await page.bringToFront();
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.waitForFunction(()=>document.querySelector('[data-motion-toggle]').textContent==='Motion off',{timeout:3000});const reduced=await read();
  const checks={kind,moves:before.transform!==after.transform,titleAnchored:before.title.x===after.title.x&&before.title.y===after.title.y,frameAnchored:before.frame.x===after.frame.x&&before.frame.y===after.frame.y,pauses:paused.transform===pausedAfter.transform,resumes:resumed.transform!==paused.transform,offscreenPauses:offscreen.transform===offscreenAfter.transform,hiddenObserved:hidden.hidden,hiddenPauses:hidden.hidden?hidden.transform===hiddenAfter.transform:null,reducedStops:reduced.transform==='none'&&reduced.label==='Motion off',states:{before,after,paused,pausedAfter,resumed,offscreen,offscreenAfter,hidden,hiddenAfter,reduced}};
  result.push(checks);

  if(!checks.moves||!checks.titleAnchored||!checks.frameAnchored||!checks.pauses||!checks.resumes||!checks.offscreenPauses||!checks.reducedStops||(checks.hiddenObserved&&!checks.hiddenPauses))throw new Error('Motion verification failed: '+kind);
  await page.close();
 }
 const page=await browser.newPage();await page.setViewport({width:1300,height:1030,deviceScaleFactor:1});await page.goto('http://127.0.0.1:4321/proof/depth-compare.html',{waitUntil:'networkidle0'});for(const frame of page.frames())await frame.evaluate(()=>document.fonts.ready);await page.screenshot({path:root+'depth-painted/comparison.png',fullPage:true});
 await fs.writeFile(root+'depth-painted/motion-checks.json',JSON.stringify(result,null,2));
 console.log(JSON.stringify(result.map(({states,...checks})=>checks),null,2));
}finally{await browser.close()}
