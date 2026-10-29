import puppeteer from 'file:///C:/Users/sweep/.agents/skills/browser-tools/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs/promises';
const out=new URL('./',import.meta.url);
const base='http://127.0.0.1:4322/';
const browser=await puppeteer.launch({executablePath:'C:/Users/sweep/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const path=name=>new URL(name,out).pathname.replace(/^\/(\w:)/,'$1');
const results={widths:[],requests:[],errors:[],motion:{},metadata:{},fallback:{}};
try {
 const page=await browser.newPage();
 page.on('pageerror',e=>results.errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)results.errors.push(`${r.status()} ${r.url()}`)});
 page.on('request',r=>results.requests.push(r.url()));
 for(const width of [320,390,430,800,1440]){
  console.log("Checking width",width);
  await page.setViewport({width,height:844,deviceScaleFactor:1});
  const start=results.requests.length;await page.goto(base,{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
  const initialVideo=results.requests.slice(start).some(url=>url.endsWith('fish-loop.webm'));
  const before=await page.evaluate(()=>getComputedStyle(document.querySelector('[data-depth-subject]')).transform);await delay(350);const after=await page.evaluate(()=>getComputedStyle(document.querySelector('[data-depth-subject]')).transform);
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,frame:document.querySelector('[data-depth-frame]').getBoundingClientRect().toJSON(),links:[...document.querySelectorAll('.actions a')].map(a=>({label:a.getAttribute('aria-label')||a.textContent.trim(),href:a.getAttribute('href'),width:a.getBoundingClientRect().width,height:a.getBoundingClientRect().height})),h1:document.querySelector('h1').textContent,samples:document.querySelectorAll('tr[data-sample]').length}));
  if(width===390)await page.screenshot({path:path('site-390-hero.png')});
  await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  await page.waitForFunction(()=>document.querySelector('[data-fish-container]').dataset.playing==='true',{timeout:8000});
  const fish=await page.evaluate(()=>({playing:document.querySelector('[data-fish-container]').dataset.playing,muted:document.querySelector('video').muted,time:document.querySelector('video').currentTime,paused:document.querySelector('video').paused,videoDisplay:getComputedStyle(document.querySelector('video')).visibility}));
  if(width===390)await page.screenshot({path:path('site-fish-playing.png')});
  await page.evaluate(()=>scrollTo(0,0));await delay(200);const offscreenFish=await page.evaluate(()=>document.querySelector('video').paused);
  await page.screenshot({path:path(`site-${width}.png`),fullPage:true});
  results.widths.push({width,initialVideo,heroMoves:before!==after,fish,offscreenFish,...metrics});
 }
 await page.setViewport({width:390,height:844,deviceScaleFactor:1});await page.goto(base,{waitUntil:'networkidle0'});await page.keyboard.press('Tab');
 results.focus=await page.evaluate(()=>({text:document.activeElement.textContent,outline:getComputedStyle(document.activeElement).outlineStyle,rect:document.activeElement.getBoundingClientRect().toJSON()}));
 await page.keyboard.press('Enter');results.skip=await page.evaluate(()=>({hash:location.hash,active:document.activeElement.id}));
 await page.evaluate(()=>scrollTo(0,0));await delay(200);
 const other=await browser.newPage();await other.goto('about:blank');await other.bringToFront();await delay(150);const h1=await page.evaluate(()=>({hidden:document.hidden,transform:document.querySelector('[data-depth-subject]').style.transform}));await delay(350);const h2=await page.evaluate(()=>document.querySelector('[data-depth-subject]').style.transform);results.motion.hiddenStops=h1.hidden&&h1.transform===h2;await other.close();await page.bringToFront();
 const reduced=await browser.newPage();await reduced.setViewport({width:390,height:844});await reduced.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await reduced.goto(base,{waitUntil:'networkidle0'});await reduced.evaluate(()=>scrollTo(0,document.body.scrollHeight));await delay(400);results.motion.reduced=await reduced.evaluate(()=>({transform:getComputedStyle(document.querySelector('[data-depth-subject]')).transform,src:document.querySelector('video').getAttribute('src'),playing:document.querySelector('[data-fish-container]').dataset.playing||null}));
 const failed=await browser.newPage();await failed.setViewport({width:390,height:844});await failed.setRequestInterception(true);failed.on('request',r=>r.url().endsWith('fish-loop.webm')?r.abort():r.continue());await failed.goto(base,{waitUntil:'networkidle0'});await failed.evaluate(()=>scrollTo(0,document.body.scrollHeight));await delay(600);results.fallback.failedVideo=await failed.evaluate(()=>({playing:document.querySelector('[data-fish-container]').dataset.playing||null,still:getComputedStyle(document.querySelector('[data-fish-still]')).visibility,paused:document.querySelector('video').paused}));
 const nojs=await browser.newPage();await nojs.setJavaScriptEnabled(false);await nojs.setViewport({width:390,height:844});await nojs.goto(base,{waitUntil:'networkidle0'});await nojs.evaluate(()=>scrollTo(0,document.body.scrollHeight));await nojs.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));await nojs.screenshot({path:path('site-390-no-js.png'),fullPage:true});results.fallback.nojs=await nojs.evaluate(()=>({h1:document.querySelector('h1').textContent,links:document.querySelectorAll('.actions a').length,src:document.querySelector('video').getAttribute('src'),still:getComputedStyle(document.querySelector('[data-fish-still]')).visibility}));
 await page.bringToFront();await page.goto(base,{waitUntil:'networkidle0'});results.metadata=await page.evaluate(()=>({robots:document.querySelector('meta[name=robots]').content,title:document.title,identity:JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),canonical:document.querySelector('link[rel=canonical]')?.href||null}));
 results.metadata.robotsFile=await (await page.goto(base+'robots.txt')).text();results.metadata.sitemap=await (await page.goto(base+'sitemap.xml')).text();
 await page.goto(base,{waitUntil:'networkidle0'});await page.evaluate(()=>{const sizes=[...document.querySelectorAll('body *')].map(e=>[e,getComputedStyle(e).fontSize]);for(const [e,size]of sizes)e.style.fontSize=parseFloat(size)*2+'px'});results.zoom=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,controls:[...document.querySelectorAll('.actions a')].map(e=>e.getBoundingClientRect().toJSON())}));await page.screenshot({path:path('site-390-text-200.png'),fullPage:true});
 console.log('Checking text zoom at320');await page.bringToFront();await page.setViewport({width:320,height:844});await page.goto(base,{waitUntil:'networkidle0'});await page.evaluate(()=>{const sizes=[...document.querySelectorAll('body *')].map(e=>[e,getComputedStyle(e).fontSize]);for(const [e,size]of sizes)e.style.fontSize=parseFloat(size)*2+'px'});results.zoom320=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));await page.screenshot({path:path('site-320-text-200.png'),fullPage:true});
 await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify(results,null,2));
 console.log(JSON.stringify({...results,requests:results.requests.length},null,2));
}finally{await browser.close()}
