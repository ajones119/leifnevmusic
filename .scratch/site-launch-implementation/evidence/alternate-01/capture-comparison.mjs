import puppeteer from 'file:///C:/Users/sweep/.agents/skills/browser-tools/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
const browser=await puppeteer.launch({executablePath:'C:/Users/sweep/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
try {
 const page=await browser.newPage();
 await page.setViewport({width:880,height:1030,deviceScaleFactor:1});
 await page.goto('http://127.0.0.1:4321/proof/compare.html',{waitUntil:'networkidle0'});
 for(const frame of page.frames())await frame.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'C:/Users/sweep/projects/LeifNevMusic/.scratch/site-launch-implementation/evidence/alternate-01/comparison.png',fullPage:true});
 console.log(JSON.stringify(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,frames:[...document.querySelectorAll('iframe')].map(e=>({width:e.getBoundingClientRect().width,src:e.src}))}))));
}finally{await browser.close()}
