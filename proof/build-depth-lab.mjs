import fs from 'node:fs';
// Throwaway A/B lab. Rebuild dist, then run this script after changing the main page.
let html=fs.readFileSync('dist/index.html','utf8').replace('data-depth-mode="layered"','data-depth-mode="baseline"');
const style=`<style>body[data-study=depth] [data-depth-float]{animation:lab-camera 32s ease-in-out infinite;animation-play-state:var(--lab-play,running)}@keyframes lab-camera{0%,50%,100%{transform:translate3d(0,0,0)}25%{transform:translate3d(2.5px,-5.5px,0)}75%{transform:translate3d(-2.5px,5.5px,0)}}@media(prefers-reduced-motion:reduce){[data-depth-float]{animation:none!important}}
.depth-lab{position:fixed;z-index:100;bottom:18px;left:50%;transform:translateX(-50%);max-width:calc(100vw - 24px);padding:10px 12px;border-radius:10px;background:#26332c;color:#f0e9dc;box-shadow:0 4px 22px #171d1920;font:12px/1.4 'DM Sans',sans-serif}.depth-lab p{margin:0 0 8px;opacity:.8}.depth-lab-controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.depth-lab button,.depth-lab a{font:inherit;padding:9px 10px;color:inherit;background:transparent;border:1px solid #f0e9dc55;border-radius:5px;text-decoration:none;cursor:pointer}.depth-lab button[aria-pressed=true]{background:#f0e9dc;color:#171d19}.depth-lab :focus-visible{outline:2px solid #72b8c9;outline-offset:3px}.footer{padding-bottom:150px}
body[data-study=depth] .musician-plane{animation:depth-subject 28s ease-in-out infinite;animation-play-state:var(--lab-play,running)}body[data-study=depth] .bridge-plane{animation:depth-background 34s ease-in-out infinite;animation-play-state:var(--lab-play,running)}
@keyframes depth-subject{0%,100%{transform:translate3d(-2px,1px,0)}25%{transform:translate3d(3px,-2px,0)}50%{transform:translate3d(4px,2px,0)}75%{transform:translate3d(-1px,3px,0)}}
@keyframes depth-background{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-1.5px,1px,0)}}
@media(prefers-reduced-motion:reduce){body[data-study=depth] .musician-plane,body[data-study=depth] .bridge-plane{animation:none!important;transform:none!important}}
</style>`;
const controls=`<aside class="depth-lab" aria-label="Experimental hero depth"><p>Approved slow layer motion · baseline comparison</p><div class="depth-lab-controls"><button data-study-choice="baseline">1 · Safe baseline</button><button data-study-choice="depth">3 · Layer study</button><a href="http://127.0.0.1:4322/">Main site ↗</a></div></aside><script>
const buttons=[...document.querySelectorAll('[data-study-choice]')];
function choose(study){if(study!=='depth')study='baseline';document.body.dataset.study=study;buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.studyChoice===study)));const url=new URL(location.href);url.searchParams.set('study',study);history.replaceState(null,'',url.href);}
buttons.forEach(button=>button.addEventListener('click',()=>choose(button.dataset.studyChoice)));choose(new URLSearchParams(location.search).get('study'));
let heroVisible=true;function pauseLab(){document.body.style.setProperty('--lab-play',document.hidden||!heroVisible?'paused':'running');}document.addEventListener('visibilitychange',pauseLab);new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;pauseLab();}).observe(document.querySelector('[data-depth-frame]'));
</script>`;
html=html.replace('<head>','<head><base href="http://127.0.0.1:4322/">').replace('</head>',style+'</head>').replace('</body>',controls+'</body>');
fs.writeFileSync('proof/depth-lab.html',html);
