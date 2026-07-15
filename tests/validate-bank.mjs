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
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/numbers/number-line.js',
  'auto/scripts/shared/visuals/numbers/place-value-table.js',
  'auto/scripts/shared/visuals/geometry/coordinate-plane.js',
  ...isolatedModulesByDomain.numbers.map(id => `auto/scripts/modules/numbers/${id}.js`),
  'auto/scripts/data/01-numbers.js',
  ...isolatedModulesByDomain.geometry.map(id => `auto/scripts/modules/geometry/${id}.js`),
  'auto/scripts/data/02-geometry.js',
  ...isolatedModulesByDomain.data.map(id => `auto/scripts/modules/data/${id}.js`),
  'auto/scripts/data/03-data.js',
  ...isolatedModulesByDomain.algorithm.map(id => `auto/scripts/modules/algorithm/${id}.js`),
  'auto/scripts/data/04-algorithm.js',
  'auto/scripts/01-modules.js',
  'auto/scripts/shared/visuals/arithmetic/relation-bar.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-percent-bar.js',
  'auto/scripts/shared/visuals/measures/conversion-table.js',
  'auto/scripts/shared/visuals/algebra/equation-splat.js',
  'auto/scripts/shared/visuals/geometry/thales-configuration.js',
  'auto/scripts/shared/visuals/geometry/triangle-angle-sum.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-mill.js',
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
globalThis.__bankSnapshot = JSON.stringify(RAW_MODULES);
globalThis.__renderThalesModule = renderThalesModule;
globalThis.__renderAngleSumModule = renderAngleSumModule;`;

const context = { console };
context.globalThis = context;
vm.createContext(context);
vm.runInContext(code, context, { timeout: 5000 });

const bank = context.__bank;
const bankHash = createHash('sha256').update(context.__bankSnapshot).digest('hex');
const expectedBankHash = 'c0b9baabe0b20755daaf9825292ae971238b80e5e6d670c9c19d0c95cc20dfb5';
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
  fail(`Le contenu ou l’ordre de la banque V1.16 a changé (${bankHash}).`);
}

const angleInstance={
  module:{id:'dnb_18'},q:{n:9},answers:['51'],
  rawStatement:'Lis les deux angles donnés et calcule la mesure de l’angle C.',
  rawFooter:'[[formula]]°',angleSum:{kind:'figure',bar:{view:'combined',values:[58,71,51],unknown:[2]}}
};
const angleQuestion=context.__renderAngleSumModule(angleInstance,false,'with');
const angleCorrection=context.__renderAngleSumModule(angleInstance,true,'with');
if(!angleQuestion.includes('angle-triangle-svg')||!angleQuestion.includes('angle-bar-svg')) fail('La question Angles 9 doit assembler la figure et la barre partagées.');
if(!angleQuestion.includes('𝑥')||!angleCorrection.includes('51°')) fail('Le composant Angles doit masquer puis révéler la mesure inconnue.');
if(angleQuestion.includes('<polygon points="80,230')) fail('L’ancien SVG de la banque Angles ne doit plus être utilisé.');

const thalesInstance={
  module:{id:'dnb_25'},q:{n:1},answers:['1'],
  rawStatement:'Conditions.<br><div style="text-align:center"><svg width="320"><path d="M0 0"/></svg></div><br>Peut-on appliquer Thalès ?&&Oui&&Non&&',
  rawFooter:'[[qcm1]]'
};
const thalesQuestion=context.__renderThalesModule(thalesInstance,false,'with');
const thalesCorrection=context.__renderThalesModule(thalesInstance,true,'with');
if(!thalesQuestion.includes('thales-question-figure')) fail('Le module Thalès doit utiliser sa figure partagée.');
if(thalesQuestion.includes('width="320"')||!thalesQuestion.includes('stroke="#111111"')) fail('La question Thalès doit remplacer l’ancien dessin par une figure d’exercice noire.');
if(!thalesCorrection.includes('#ff9114')||!thalesCorrection.includes('#11468c')) fail('La correction Thalès doit utiliser les couleurs d’aide pour les côtés correspondants.');
const thalesAidInstance={
  module:{id:'dnb_25'},q:{n:8},scope:{AD:4,AB:8,AC:16},answers:['1'],
  rawStatement:'Énoncé long&&$$\\dfrac{AD}{AB}=\\dfrac{x}{AC}$$&&Autre réponse&&',rawFooter:'[[qcm1]]'
};
const thalesWithAid=context.__renderThalesModule(thalesAidInstance,false,'with');
const thalesWithoutAid=context.__renderThalesModule(thalesAidInstance,false,'without');
if(!thalesWithAid.includes('thales-task-card')||!thalesWithAid.includes('Choisir l’égalité adaptée')) fail('La question Thalès 8 doit utiliser un énoncé structuré.');
if(!thalesWithAid.includes('thales-question-figure')||!thalesWithAid.includes('AD = 4 cm')) fail('La question Thalès 8 doit afficher la figure et ses longueurs avec aide.');
if(thalesWithoutAid.includes('thales-question-figure')) fail('La figure d’étayage Thalès doit être totalement absente sans aide.');

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
  console.log(`OK — ${bank.length} modules, ${questionCount} gabarits, banque V1.16 figée, registre MG1 cohérent.`);
}
