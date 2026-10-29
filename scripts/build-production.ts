import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { site, validateSite } from '../src/data/site.ts';

const errors = validateSite(site, { production: true });
if (errors.length) {
  console.error(`Production build blocked:\n${errors.map(error => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
} else {
  const command = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [command, 'build'], {
    stdio: 'inherit',
    env: { ...process.env, SITE_RELEASE: 'production' },
  });
  if (result.error) console.error(result.error.message);
  process.exitCode = result.status ?? 1;
}
