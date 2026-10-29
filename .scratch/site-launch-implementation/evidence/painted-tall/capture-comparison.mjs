import puppeteer from 'file:///C:/Users/sweep/.agents/skills/browser-tools/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs/promises';
const output='C:/Users/sweep/projects/LeifNevMusic/.scratch/site-launch-implementation/evidence/painted-tall/';
const browser=await puppeteer.launch({executablePath:'C:/Users/sweep/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
try {
 const page=await browser.newPage();
 await page.setViewport({width:1300,height:1030,deviceScaleFactor:1});
 await page.goto('http://127.0.0.1:4321/proof/painted-width-compare.html',{waitUntil:'networkidle0'});
 for(const frame of page.frames())await frame.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:output+'comparison.png',fullPage:true});
 const results=[];
 for(const kind of ['bridge-painted','bridge-painted-wide','bridge-painted-tall'])for(const width of [320,390,430,800,1440]){
  await page.setViewport({width,height:844,deviceScaleFactor:1});
  await page.goto(`http://127.0.0.1:4321/proof/${kind}.html`,{waitUntil:'networkidle0'});
  results.push({kind,width,...await page.evaluate(()=>{const r=document.querySelector('.depth-frame').getBoundingClientRect();return {photo:{left:r.left,top:r.top,width:r.width,height:r.height,right:r.right},scrollWidth:document.documentElement.scrollWidth,visibleMotionControls:[...document.querySelectorAll('.motion-control')].filter(e=>getComputedStyle(e).display!=='none').length,visibleName:document.querySelector('h1').className!=='sr-only',tagline:!!document.querySelector('.tagline')}})});
 }
 await fs.writeFile(output+'frame-measurements.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results.filter(r=>r.width===390||r.width===1440),null,2));
}finally{await browser.close()}
