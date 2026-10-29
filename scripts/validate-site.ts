import { site, validateSite } from '../src/data/site.ts';

const production = process.argv.includes('--production');
const errors = validateSite(site, { production });
if (errors.length) {
  console.error(`Site ${production ? 'production' : 'preview'} validation failed:\n${errors.map(error => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
} else console.log(`Site ${production ? 'production' : 'preview'} validation passed.`);
