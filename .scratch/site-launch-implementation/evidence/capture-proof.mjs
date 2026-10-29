import puppeteer from 'file:///C:/Users/sweep/.agents/skills/browser-tools/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs/promises';
const output = new URL(process.argv[3] || './', import.meta.url);
const base = process.argv[2] || 'http://127.0.0.1:4321/proof/mobile.html';
const browser = await puppeteer.launch({executablePath:'C:/Users/sweep/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true,args:['--no-first-run']});
const results=[];
async function loadLowerImages(page){
 await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
 await page.evaluate(()=>scrollTo(0,0));
 await new Promise(r=>setTimeout(r,100));
}
try {
 const page=await browser.newPage();
 const errors=[];
 page.on('pageerror', e=>errors.push(e.message));
 page.on('response', r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 for(const width of [320,390,430,800,1440]) {
  await page.setViewport({width,height:844,deviceScaleFactor:1});
  await page.goto(base,{waitUntil:'networkidle0'});
  await page.evaluate(()=>document.fonts.ready);
  await loadLowerImages(page);
  const metrics=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,column:(()=>{const r=document.querySelector('.page-column').getBoundingClientRect();return {left:r.left,width:r.width,right:r.right}})(),illustrativeTargets:[...document.querySelectorAll('.illustrative')].map(e=>({label:e.getAttribute('aria-label') || e.textContent.trim(),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})),fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),links:[...document.querySelectorAll('a')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')})),overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left<-.5||r.right>innerWidth+.5)}).map(e=>({tag:e.tagName,class:e.getAttribute('class')}))}));
  await page.screenshot({path:new URL(`mobile-proof-${width}.png`,output).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
  if(width===390)await page.screenshot({path:new URL('mobile-proof-390-hero.png',output).pathname.replace(/^\/(\w:)/,'\u00241'),fullPage:false});
  results.push({width,...metrics});
 }
 await page.setViewport({width:390,height:844,deviceScaleFactor:1});
 await page.setJavaScriptEnabled(false);
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.goto(base,{waitUntil:'networkidle0'});
 await loadLowerImages(page);
 await page.screenshot({path:new URL('mobile-proof-390-no-js.png',output).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
 await fs.writeFile(new URL('width-checks.json',output),JSON.stringify({url:base,errors,results},null,2));
 console.log(JSON.stringify({errors,results},null,2));
}finally{await browser.close()}
