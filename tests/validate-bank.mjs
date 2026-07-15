import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const isolatedModulesByDomain = {
  numbers: ['dnb_01', 'dnb_02', 'dnb_02b', 'dnb_03', 'dnb_03b', 'dnb_04', 'dnb_05', 'dnb_06', 'dnb_07', 'dnb_08', 'dnb_09', 'dnb_10', 'dnb_11', 'dnb_12', 'dnb_13', 'dnb_14'],
  geometry: ['dnb_15', 'dnb_16', 'dnb_17', 'dnb_18', 'dnb_19', 'dnb_20', 'dnb_21', 'dnb_22', 'dnb_23', 'dnb_24', 'dnb_25', 'dnb_26', 'dnb_26b', 'dnb_27'],
  data: ['dnb_28', 'dnb_29', 'dnb_30', 'dnb_31', 'dnb_32', 'dnb_33', 'dnb_34', 'dnb_35', 'dnb_36'],
  algorithm: ['dnb_37']
};
const isolatedModuleIds = Object.values(isolatedModulesByDomain).flat();
const sources = [
  ...isolatedModulesByDomain.numbers.map(id => `auto/scripts/modules/numbers/${id}.js`),
  'auto/scripts/data/01-numbers.js',
  ...isolatedModulesByDomain.geometry.map(id => `auto/scripts/modules/geometry/${id}.js`),
  'auto/scripts/data/02-geometry.js',
  ...isolatedModulesByDomain.data.map(id => `auto/scripts/modules/data/${id}.js`),
  'auto/scripts/data/03-data.js',
  ...isolatedModulesByDomain.algorithm.map(id => `auto/scripts/modules/algorithm/${id}.js`),
  'auto/scripts/data/04-algorithm.js',
  'auto/scripts/01-modules.js',
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/algebra/equation-splat.js',
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

const requiredModuleFields = ['id', 'num', 'title', 'level_tags', 'source', 'has_svg', 'questions'];

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

for (const id of isolatedModuleIds) {
  const module = context.__bankSnapshot
    ? JSON.parse(context.__bankSnapshot).find(item => item.id === id)
    : null;
  if (!module) {
    fail(`Le module isolé ${id} est absent de la banque.`);
    continue;
  }
  const missingFields = requiredModuleFields.filter(field => !Object.prototype.hasOwnProperty.call(module, field));
  if (missingFields.length) fail(`Champs manquants dans ${id} : ${missingFields.join(', ')}.`);
  if (!module.questions.every(question => Number.isFinite(Number(question.n)))) {
    fail(`Chaque gabarit de ${id} doit conserver un numéro stable.`);
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
const domainFiles = {
  numbers: '01-numbers',
  geometry: '02-geometry',
  data: '03-data',
  algorithm: '04-algorithm'
};
for (const [domain, ids] of Object.entries(isolatedModulesByDomain)) {
  const dataPath = `auto/scripts/data/${domainFiles[domain]}.js`;
  const domainScriptPosition = indexHtml.indexOf(`scripts/data/${domainFiles[domain]}.js`);
  const bankSource = fs.readFileSync(new URL(dataPath, root), 'utf8');
  for (const id of ids) {
    const moduleScriptPosition = indexHtml.indexOf(`scripts/modules/${domain}/${id}.js`);
    if (moduleScriptPosition < 0 || domainScriptPosition < 0 || moduleScriptPosition > domainScriptPosition) {
      fail(`Le module ${id} doit être chargé avant le fichier du domaine ${domain}.`);
    }
    const constant = `MODULE_${id.toUpperCase()}`;
    if (!bankSource.includes(constant)) {
      fail(`Le domaine ${domain} doit référencer la constante ${constant}.`);
    }
  }
}

if (!process.exitCode) {
  console.log(`OK — ${bank.length} modules, ${questionCount} gabarits, banque V1.15 inchangée, registre MG1 cohérent.`);
}
