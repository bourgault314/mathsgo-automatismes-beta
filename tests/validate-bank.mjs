import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const sources = [
  'auto/scripts/modules/numbers/dnb_08.js',
  'auto/scripts/data/01-numbers.js',
  'auto/scripts/data/02-geometry.js',
  'auto/scripts/data/03-data.js',
  'auto/scripts/data/04-algorithm.js',
  'auto/scripts/01-modules.js',
  'auto/scripts/02-question-engine.js'
];

const code = sources
  .map(path => fs.readFileSync(new URL(path, root), 'utf8'))
  .join('\n') + `
globalThis.__bank = RAW_MODULES.map(module => ({
  id: module.id,
  title: module.title,
  questions: module.questions.map(question => question.n)
}));
globalThis.__bankSnapshot = JSON.stringify(RAW_MODULES);`;

const context = { console };
context.globalThis = context;
vm.createContext(context);
vm.runInContext(code, context, { timeout: 5000 });

const bank = context.__bank;
const bankHash = createHash('sha256').update(context.__bankSnapshot).digest('hex');
const expectedBankHash = '0ad9d9e7fdc750c7f5c403f268b10285d7277229ddbf34bd40fdc0e5a6210733';
const fail = message => {
  console.error(`ÉCHEC — ${message}`);
  process.exitCode = 1;
};

if (bank.length !== 40) fail(`40 modules attendus, ${bank.length} trouvés.`);

const moduleIds = bank.map(module => module.id);
if (new Set(moduleIds).size !== moduleIds.length) fail('Un identifiant de module est utilisé plusieurs fois.');

for (const module of bank) {
  if (!module.id || !module.title) fail(`Métadonnées incomplètes pour ${module.id || 'un module sans identifiant'}.`);
  if (!module.questions.length) fail(`Le module ${module.id} ne contient aucun gabarit.`);
  if (new Set(module.questions.map(String)).size !== module.questions.length) {
    fail(`Le module ${module.id} contient deux gabarits portant le même numéro.`);
  }
}

const questionCount = bank.reduce((sum, module) => sum + module.questions.length, 0);
if (questionCount !== 460) fail(`460 gabarits attendus, ${questionCount} trouvés.`);
if (bankHash !== expectedBankHash) {
  fail(`Le contenu ou l’ordre de la banque V1.15 a changé (${bankHash}).`);
}

const contracts = fs.readFileSync(new URL('auto/scripts/core/01-series-contracts.js', root), 'utf8');
const registeredLegacyIds = [...contracts.matchAll(/\['[^']+','(dnb_[^']+)',\d+\]/g)].map(match => match[1]);
if (registeredLegacyIds.length !== 40) fail(`40 entrées MG1 attendues, ${registeredLegacyIds.length} trouvées.`);

const missingFromRegistry = moduleIds.filter(id => !registeredLegacyIds.includes(id));
const missingFromBank = registeredLegacyIds.filter(id => !moduleIds.includes(id));
if (missingFromRegistry.length) fail(`Modules absents du registre MG1 : ${missingFromRegistry.join(', ')}.`);
if (missingFromBank.length) fail(`Entrées MG1 sans module : ${missingFromBank.join(', ')}.`);

const indexHtml = fs.readFileSync(new URL('auto/index.html', root), 'utf8');
const moduleScriptPosition = indexHtml.indexOf('scripts/modules/numbers/dnb_08.js');
const domainScriptPosition = indexHtml.indexOf('scripts/data/01-numbers.js');
if (moduleScriptPosition < 0 || domainScriptPosition < 0 || moduleScriptPosition > domainScriptPosition) {
  fail('Le module dnb_08 doit être chargé avant le fichier du domaine nombres.');
}

if (!process.exitCode) {
  console.log(`OK — ${bank.length} modules, ${questionCount} gabarits, banque V1.15 inchangée, registre MG1 cohérent.`);
}
