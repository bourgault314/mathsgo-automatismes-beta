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
  'auto/scripts/shared/visuals/geometry/coordinate-plane.js',
  'auto/scripts/shared/visuals/geometry/triangle-angle-sum.js',
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
if(contracts.length!==11) fail(`Onze contrats de manipulation attendus, ${contracts.length} trouvé(s).`);

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
const coordinatePoints=registry?.get('geometry.coordinate-points');
if(coordinatePoints?.validation.mode!=='state-equivalence'||coordinatePoints?.correction.mode!=='target-state') fail('Le placement dans un repère doit valider les coordonnées et montrer les points cibles.');
if(!coordinatePoints?.actions.some(action=>action.id==='select-point')||!coordinatePoints?.actions.some(action=>action.id==='select-intersection')) fail('Le repère tactile doit permettre de choisir le point puis l’intersection.');
const relative=registry?.get('numbers.relative-tokens');
if(relative?.reset.mode!=='initial-state'||relative?.actions.some(action=>action.id==='validate')!==true) fail('Les jetons relatifs doivent être réinitialisables et validables.');
const pythagoras=registry?.get('geometry.pythagoras-builder');
if(pythagoras?.validation.mode!=='ordered-slots'||pythagoras?.supports.includes('projection')) fail('Le constructeur Pythagore doit valider ses cases et rester une manipulation individuelle.');
const angleBuilder=registry?.get('geometry.triangle-angle-builder');
if(angleBuilder?.validation.mode!=='two-stage'||angleBuilder?.supports.includes('projection')) fail('La manipulation des angles doit valider le placement puis le calcul et rester individuelle.');
if(!angleBuilder?.actions.some(action=>action.id==='drag-card')||!angleBuilder?.actions.some(action=>action.id==='select-card')||!angleBuilder?.actions.some(action=>action.id==='place-card')) fail('La manipulation des angles doit proposer le glisser et le toucher carte puis case.');
for(const id of ['numbers.order-cards','numbers.frame-integers','numbers.distributivity-cards']){
  const contract=registry?.get(id);
  if(contract?.status!=='active'||contract?.validation.mode!=='ordered-slots'||!contract?.actions.some(action=>action.id==='drag-card')||!contract?.actions.some(action=>action.id==='select-card')||!contract?.actions.some(action=>action.id==='place-card')) fail(`La manipulation ${id} doit fonctionner par glisser ou par sélection puis placement ordonné.`);
}
const algebraArea=registry?.get('algebra.area-model-cards');
if(algebraArea?.status!=='active'||algebraArea?.validation.mode!=='ordered-slots'||!algebraArea?.actions.some(action=>action.id==='drag-card')||!algebraArea?.actions.some(action=>action.id==='select-card')||!algebraArea?.actions.some(action=>action.id==='place-card')) fail('Le modèle d’aire algébrique doit fonctionner par glisser ou par sélection puis placement.');
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

const slideshow=fs.readFileSync(new URL('auto/scripts/03-slideshow.js',root),'utf8');
if(!slideshow.includes('card.onpointerdown=event=>')||!slideshow.includes('document.elementsFromPoint(endEvent.clientX,endEvent.clientY)')) fail('Les cartes décimales doivent réellement gérer un glisser-déposer par pointeur.');
if(!slideshow.includes('card.onclick=()=>')||!slideshow.includes('place(decimalSelectedCard,index)')) fail('Le toucher carte puis case doit rester disponible avec le glisser-déposer.');
if(!slideshow.includes('setupAngleSumTactileInteraction(spec)')||!slideshow.includes('placeAngleSumBuilderToken(spec,value,Number(target.dataset.angleSumSlot))')) fail('Les cartes des angles doivent réutiliser le double geste glisser ou toucher puis toucher.');
if(!slideshow.includes("angleSumPlacementValidated=true")||!slideshow.includes("'Valider le placement'")||!slideshow.includes("'Valider 𝑥'")) fail('La manipulation des angles doit séparer la validation du placement et celle du calcul.');

if(!process.exitCode) console.log('OK — 11 contrats de manipulation : 10 actifs et 1 planifié, état MG-MANIP-1 cohérent.');
