import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const sources=[
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/numbers/number-line.js',
  'auto/scripts/shared/visuals/numbers/order-cards.js',
  'auto/scripts/shared/visuals/numbers/place-value-table.js',
  'auto/scripts/shared/visuals/numbers/relative-tokens.js',
  'auto/scripts/shared/visuals/algebra/area-model.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-builder.js',
  'auto/scripts/shared/manipulations/00-registry.js',
  'auto/scripts/shared/manipulations/contracts.js'
];
const context={};context.globalThis=context;vm.createContext(context);
vm.runInContext(sources.map(path=>fs.readFileSync(new URL(path,root),'utf8')).join('\n'),context,{timeout:5000});

const fail=message=>{console.error(`ÉCHEC — ${message}`);process.exitCode=1;};
const registry=context.MATHSGO_MANIPULATIONS;
if(!registry) fail('Le registre de manipulations est absent.');
const contracts=registry?.list()||[];
if(contracts.length!==8) fail(`Huit contrats de manipulation attendus, ${contracts.length} trouvé(s).`);

for(const contract of contracts){
  if(contract.status==='active'&&!context.MATHSGO_VISUALS.get(contract.componentId)) fail(`Le composant actif ${contract.id} est absent.`);
  if(!contract.state.length||!contract.actions.length) fail(`État ou actions absents pour ${contract.id}.`);
  if(contract.serialization.version!=='MG-MANIP-1') fail(`Sérialisation incorrecte pour ${contract.id}.`);
  const stateIds=new Set(contract.state.map(item=>item.id));
  const serializableIds=new Set(contract.state.filter(item=>item.serializable===true).map(item=>item.id));
  for(const field of contract.serialization.fields){if(!stateIds.has(field)) fail(`Le champ sérialisé ${field} n’existe pas dans ${contract.id}.`);}
  if(contract.serialization.fields.length!==serializableIds.size||contract.serialization.fields.some(field=>!serializableIds.has(field))) fail(`Les champs sérialisés ne correspondent pas à l’état reconstructible de ${contract.id}.`);
  for(const field of contract.reset.preserves||[]){if(!stateIds.has(field)) fail(`La réinitialisation de ${contract.id} conserve un champ d’état inconnu : ${field}.`);}
  if(!contract.inputMethods.includes('keyboard')) fail(`Une alternative clavier est requise pour ${contract.id}.`);
}

const glisse=registry?.get('numbers.glisse-nombre');
if(glisse?.validation.mode!=='derived-value'||glisse?.correction.mode!=='target-state') fail('Le Glisse-nombre doit valider une valeur dérivée et montrer l’état cible.');
if(!glisse?.actions.some(action=>action.id==='select-units-digit')||!glisse?.actions.some(action=>action.id==='select-target-column')) fail('Le Glisse-nombre doit déclarer son alternative tactile sans glissement.');
const numberLine=registry?.get('numbers.number-line-point');
if(numberLine?.validation.mode!=='state-equivalence'||numberLine?.correction.mode!=='target-state') fail('Le point sur droite doit valider une position aimantée et montrer l’état cible.');
if(!numberLine?.actions.some(action=>action.id==='select-point')||!numberLine?.actions.some(action=>action.id==='select-tick')) fail('La droite tactile doit déclarer son alternative sans glissement.');
if(!numberLine?.actions.some(action=>action.id==='move-left')||!numberLine?.actions.some(action=>action.id==='move-right')) fail('La droite tactile doit déclarer son déplacement clavier.');
const relative=registry?.get('numbers.relative-tokens');
if(relative?.reset.mode!=='initial-state'||relative?.actions.some(action=>action.id==='validate')!==true) fail('Les jetons relatifs doivent être réinitialisables et validables.');
const pythagoras=registry?.get('geometry.pythagoras-builder');
if(pythagoras?.validation.mode!=='ordered-slots'||pythagoras?.supports.includes('projection')) fail('Le constructeur Pythagore doit valider ses cases et rester une manipulation individuelle.');
for(const id of ['numbers.order-cards','numbers.frame-integers','numbers.distributivity-cards']){
  const contract=registry?.get(id);
  if(contract?.status!=='active'||contract?.validation.mode!=='ordered-slots'||!contract?.actions.some(action=>action.id==='select-card')||!contract?.actions.some(action=>action.id==='place-card')) fail(`La manipulation ${id} doit fonctionner par sélection puis placement ordonné.`);
}
const algorithm=registry?.get('algorithm.block-sequence');
if(algorithm?.status!=='planned'||algorithm?.componentId!==null||algorithm?.correction.mode!=='replay') fail('La suite de blocs doit rester planifiée avec une correction rejouée pas à pas.');

const catalogue=fs.readFileSync(new URL('auto/dev/visual-library.html',root),'utf8');
if(!catalogue.includes('id="manipulationCatalogue"')||!catalogue.includes('MATHSGO_MANIPULATIONS.list()')) fail('Les contrats de manipulation doivent être visibles dans le catalogue.');
for(const source of ['scripts/shared/manipulations/00-registry.js','scripts/shared/manipulations/contracts.js']){
  if(!catalogue.includes(source)) fail(`Le catalogue ne charge pas ${source}.`);
}
const documentation=fs.readFileSync(new URL('docs/CONTRAT-MANIPULATION.md',root),'utf8');
for(const section of ['État sémantique','Gestes et accessibilité','Réinitialisation','Validation','Correction','Sérialisation']){
  if(!documentation.includes(section)) fail(`La documentation des manipulations doit contenir « ${section} ».`);
}

if(!process.exitCode) console.log('OK — 8 contrats de manipulation : 7 actifs et 1 planifié, état MG-MANIP-1 cohérent.');
