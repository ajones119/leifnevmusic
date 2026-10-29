import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const root=process.cwd();
const fixture=path.join(root,'.scratch/site-launch-implementation/runtime-production');
fs.mkdirSync(fixture,{recursive:true});
for(const directory of ['src','public'])fs.cpSync(path.join(root,directory),path.join(fixture,directory),{recursive:true});
for(const file of ['astro.config.mjs','package.json','tsconfig.json'])fs.copyFileSync(path.join(root,file),path.join(fixture,file));
const original=fs.readFileSync(path.join(root,'src/data/site.ts'),'utf8');
let data=original.replace(/  shows: \[[\s\S]*?\n  \],/, '  shows: [],')
.replace("siteUrl: '',","siteUrl: 'https://release-fixture.invalid',")
.replaceAll('placeholder: true','placeholder: false')
.replace("portrait: { src: '',", "portrait: { src: '/media/social-preview.jpg',")
.replace('approved: false','approved: true')
.replace('A few words about Leif, his music, and what brings him to the stage will live here.', 'This sentence belongs only to the isolated release verification fixture.');
fs.writeFileSync(path.join(fixture,'src/data/site.ts'),data);
const built=spawnSync(process.execPath,[path.join(root,'node_modules/astro/bin/astro.mjs'),'build'],{cwd:fixture,env:{...process.env,SITE_RELEASE:'production',ASTRO_TELEMETRY_DISABLED:'1'},encoding:'utf8'});
assert.equal(built.status,0,built.stderr||built.stdout);
const html=fs.readFileSync(path.join(fixture,'dist/index.html'),'utf8');
assert.match(html,/name="robots" content="index, follow"/);
assert.match(html,/rel="canonical" href="https:\/\/release-fixture.invalid\/"/);
assert.match(html,/property="og:image" content="https:\/\/release-fixture.invalid\/media\/social-preview.jpg"/);
assert.doesNotMatch(html,/<a class="tip"/);
assert.match(html,/More shows soon/);
assert.doesNotMatch(html,/data-sample=/);
const identity=JSON.parse(html.match(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1]);
assert.equal(identity['@id'],'https://release-fixture.invalid/#artist');
assert.equal(identity.url,'https://release-fixture.invalid/');assert.equal(identity.sameAs.length,3);
assert.match(fs.readFileSync(path.join(fixture,'dist/robots.txt'),'utf8'),/Allow: \//);
assert.match(fs.readFileSync(path.join(fixture,'dist/sitemap.xml'),'utf8'),/<loc>https:\/\/release-fixture.invalid\/<\/loc>/);
assert.equal(fs.readFileSync(path.join(root,'src/data/site.ts'),'utf8'),original);
assert.match(fs.readFileSync(path.join(root,'dist/robots.txt'),'utf8'),/Disallow: \//);
const result={fixture:'Isolated synthetic release verification only; not a public site',passed:true,checks:['indexable production HTML','canonical','absolute sharing image','stable MusicGroup identity and supplied sameAs','no missing-account root fallbacks','empty show state','no sample rows','production robots and sitemap','root source and preview preserved'],productionUrl:'https://release-fixture.invalid'};
fs.writeFileSync(path.join(root,'.scratch/site-launch-implementation/evidence/implemented-site/production-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
