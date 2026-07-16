import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const isolatedModulesByDomain = {
  numbers: ['dnb_01', 'dnb_02', 'dnb_02b', 'dnb_03', 'dnb_03b', 'dnb_04', 'dnb_05', 'dnb_06', 'dnb_07', 'dnb_08', 'dnb_09', 'dnb_10', 'dnb_11', 'dnb_12', 'dnb_13', 'dnb_14', 'dnb_38'],
  geometry: ['dnb_15', 'dnb_16', 'dnb_17', 'dnb_18', 'dnb_19', 'dnb_20', 'dnb_21', 'dnb_22', 'dnb_23', 'dnb_24', 'dnb_24b', 'dnb_25', 'dnb_26', 'dnb_26b', 'dnb_27'],
  data: ['dnb_28', 'dnb_29', 'dnb_30', 'dnb_31', 'dnb_32', 'dnb_33', 'dnb_34', 'dnb_35', 'dnb_36'],
  algorithm: ['dnb_37']
};
const isolatedModuleIds = Object.values(isolatedModulesByDomain).flat();
const sources = [
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/numbers/number-line.js',
  'auto/scripts/shared/visuals/numbers/place-value-table.js',
  'auto/scripts/shared/visuals/numbers/square-area.js',
  'auto/scripts/shared/visuals/geometry/coordinate-plane.js',
  'auto/scripts/modules/00-runtime-registry.js',
  'auto/scripts/00-module-manifest.js',
  ...isolatedModulesByDomain.numbers.map(id => `auto/scripts/modules/numbers/${id}.js`),
  'auto/scripts/modules/numbers/dnb_08/generate.js',
  'auto/scripts/modules/numbers/dnb_08/selection.js',
  'auto/scripts/modules/numbers/dnb_08/render.js',
  'auto/scripts/modules/numbers/dnb_02b/generate.js',
  'auto/scripts/modules/numbers/dnb_02b/selection.js',
  'auto/scripts/modules/numbers/dnb_02b/render.js',
  'auto/scripts/modules/numbers/dnb_14/generate.js',
  'auto/scripts/modules/numbers/dnb_14/selection.js',
  'auto/scripts/modules/numbers/dnb_14/render.js',
  ...isolatedModulesByDomain.geometry.map(id => `auto/scripts/modules/geometry/${id}.js`),
  ...isolatedModulesByDomain.data.map(id => `auto/scripts/modules/data/${id}.js`),
  ...isolatedModulesByDomain.algorithm.map(id => `auto/scripts/modules/algorithm/${id}.js`),
  'auto/scripts/01-modules.js',
  'auto/scripts/shared/visuals/arithmetic/relation-bar.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-percent-bar.js',
  'auto/scripts/shared/visuals/arithmetic/equal-sharing-board.js',
  'auto/scripts/shared/visuals/measures/conversion-table.js',
  'auto/scripts/shared/visuals/algebra/equation-splat.js',
  'auto/scripts/shared/visuals/algebra/relation-tiles.js',
  'auto/scripts/shared/visuals/geometry/thales-configuration.js',
  'auto/scripts/shared/visuals/geometry/triangle-angle-sum.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-mill.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-bar.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-reasoning.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-builder.js',
  'auto/scripts/02-question-engine.js'
];

const selectionSource = fs.readFileSync(new URL('auto/scripts/04-app.js', root), 'utf8')
  .split('let currentSeriesDefinition=null;')[0];
const code = sources
  .map(path => fs.readFileSync(new URL(path, root), 'utf8'))
  .join('\n') + '\n' + selectionSource + `
globalThis.__bank = RAW_MODULES.map(module => ({
  id: module.id,
  title: module.title,
  questions: module.questions.map(question => question.n)
}));
globalThis.__bankSnapshot = JSON.stringify(RAW_MODULES);
globalThis.__renderThalesModule = renderThalesModule;
globalThis.__renderPythagorasModule = renderPythagorasModule;
globalThis.__renderAngleSumModule = renderAngleSumModule;
globalThis.__relativeModule = MODULE_DNB_38;
globalThis.__pythagorasTactileModule = MODULE_DNB_24_TACTILE;
globalThis.__divisibilityModule = MODULE_DNB_08;
globalThis.__placeValueModule = MODULE_DNB_02B;
globalThis.__numberLineModule = MODULE_DNB_14;
globalThis.__makeInstance = makeInstance;
globalThis.__makeGenericInstance = makeGenericInstance;
globalThis.__renderQuestion = renderQuestion;
globalThis.__renderGenericQuestion = renderGenericQuestion;
globalThis.__setSeed = setSeed;
globalThis.__beginQuizBank = beginQuizBank;
globalThis.__drawFromQuestionDeck = drawFromQuestionDeck;
globalThis.__drawRuntimeModuleQuestions = drawRuntimeModuleQuestions;
globalThis.__shuffledCopy = shuffledCopy;
globalThis.__moduleManifest = MATHSGO_MODULE_MANIFEST;
globalThis.__moduleFiles = MATHSGO_MODULE_FILES;`;

const context = { console };
context.globalThis = context;
vm.createContext(context);
vm.runInContext(code, context, { timeout: 5000 });

const bank = context.__bank;
const bankHash = createHash('sha256').update(context.__bankSnapshot).digest('hex');
const expectedBankHash = 'db0eaa3c6c321ed1b04488d1fc3533209c43f35b6fa42970a2b19d4b30f34c81';
const fail = message => {
  console.error(`ÉCHEC — ${message}`);
  process.exitCode = 1;
};

const requiredModuleFields = ['id', 'num', 'title', 'level_tags', 'source', 'has_svg', 'questions'];

if (bank.length !== 42) fail(`42 modules attendus, ${bank.length} trouvés.`);

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
if (questionCount !== 473) fail(`473 gabarits attendus, ${questionCount} trouvés.`);
if (bankHash !== expectedBankHash) {
  fail(`Le contenu ou l’ordre de la banque V1.17 a changé (${bankHash}).`);
}

const runtime=context.MATHSGO_MODULE_RUNTIME?.get('dnb_08');
if(!runtime?.generator||!runtime?.selection||!runtime?.renderer) fail('Le pilote dnb_08 doit enregistrer génération, sélection et rendu.');
const placeValueRuntime=context.MATHSGO_MODULE_RUNTIME?.get('dnb_02b');
if(!placeValueRuntime?.generator||!placeValueRuntime?.selection||!placeValueRuntime?.renderer) fail('Le pilote dnb_02b doit enregistrer génération, sélection et rendu.');

function comparableInstance(instance){
  const scope=instance.scope||{};
  return {
    answers:instance.answers,
    answerChoices:instance.answerChoices,
    rawStatement:instance.rawStatement,
    rawFooter:instance.rawFooter,
    hasSvg:instance.hasSvg,
    parameters:Object.fromEntries(['P','ka','kc','a','b','cc','e'].filter(key=>Object.prototype.hasOwnProperty.call(scope,key)).map(key=>[key,scope[key]]))
  };
}

for(const seed of [1,2,42,999,233279]){
  for(const question of context.__divisibilityModule.questions){
    context.__setSeed(seed);
    const legacy=comparableInstance(context.__makeGenericInstance(context.__divisibilityModule,question));
    context.__setSeed(seed);
    const pilot=comparableInstance(context.__makeInstance(context.__divisibilityModule,question));
    if(JSON.stringify(pilot)!==JSON.stringify(legacy)) fail(`Le pilote dnb_08 change le gabarit ${question.n} avec la seed ${seed}.`);
    for(const correction of [false,true]){
      const genericHtml=context.__renderGenericQuestion(pilot,correction,'with');
      const pilotHtml=context.__renderQuestion(pilot,correction,'with');
      if(Number(question.n)!==10&&pilotHtml!==genericHtml) fail(`Le rendu extrait de dnb_08 change le gabarit ${question.n}.`);
    }
  }
}

context.__setSeed(42);
const sharingQuestion=context.__makeInstance(context.__divisibilityModule,context.__divisibilityModule.questions.find(question=>Number(question.n)===10));
const sharingTotal=Number(sharingQuestion.scope.P)*3;
const sharingPart=Number(sharingQuestion.scope.P);
const sharingWithAid=context.__renderQuestion(sharingQuestion,false,'with');
const sharingCorrection=context.__renderQuestion(sharingQuestion,true,'with');
const sharingWithoutAid=context.__renderQuestion(sharingQuestion,false,'without');
const sharingReveal=context.__renderQuestion(sharingQuestion,false,'without-reveal');
if(!sharingWithAid.includes('equal-sharing-svg')||!sharingWithAid.includes(`>${sharingTotal}<`)) fail('La question de partage dnb_08 doit montrer la quantité connue dans le gabarit commun.');
if(sharingWithAid.includes(`>${sharingPart}<`)) fail('La question de partage dnb_08 ne doit pas révéler la valeur d’une part.');
if(!sharingCorrection.includes(`>${sharingPart}<`)||!sharingCorrection.includes('class="opt correct"')) fail('La correction de partage dnb_08 doit montrer les parts égales et la bonne réponse.');
if(sharingWithoutAid.includes('equal-sharing-svg')||sharingWithoutAid.includes('visual-placeholder')) fail('Le partage doit être totalement absent en mode sans aide.');
if(sharingReveal.includes('equal-sharing-svg')||!sharingReveal.includes('divisibility-sharing-placeholder')) fail('Le partage facultatif doit pouvoir être révélé seul.');

for(const seed of [3,17,81,2026]){
  context.__setSeed(seed);
  context.__beginQuizBank([context.__divisibilityModule]);
  const legacy=context.__drawFromQuestionDeck('dnb_08:all',context.__divisibilityModule.questions,24).map(question=>question.n);
  context.__setSeed(seed);
  context.__beginQuizBank([context.__divisibilityModule]);
  const pilot=context.__drawFromQuestionDeck(
    'dnb_08:all',
    context.__divisibilityModule.questions,
    24,
    ()=>runtime.selection.buildCycle({module:context.__divisibilityModule,questions:context.__divisibilityModule.questions,shuffle:context.__shuffledCopy})
  ).map(question=>question.n);
  if(JSON.stringify(pilot)!==JSON.stringify(legacy)) fail(`La sélection extraite de dnb_08 change la seed ${seed}.`);
}

const divisibilityManifest=context.__moduleManifest.find(module=>module.id==='dnb_08');
if(!divisibilityManifest||divisibilityManifest.runtimeFiles?.length!==3) fail('Le manifeste doit charger les trois extensions fonctionnelles de dnb_08.');
if(context.__moduleFiles.get('dnb_08')?.length!==4) fail('Le chargeur doit préparer la banque et les trois extensions de dnb_08.');
const placeValueManifest=context.__moduleManifest.find(module=>module.id==='dnb_02b');
if(!placeValueManifest||placeValueManifest.runtimeFiles?.length!==3) fail('Le manifeste doit charger les trois extensions fonctionnelles de dnb_02b.');
if(context.__moduleFiles.get('dnb_02b')?.length!==4) fail('Le chargeur doit préparer dnb_02b et ses trois extensions fonctionnelles.');
const numberLineRuntime=context.MATHSGO_MODULE_RUNTIME.get('dnb_14');
const numberLineManifest=context.__moduleManifest.find(module=>module.id==='dnb_14');
if(!numberLineRuntime?.generator||!numberLineRuntime?.selection||!numberLineRuntime?.renderer) fail('Les trois extensions fonctionnelles de dnb_14 doivent être enregistrées.');
if(!numberLineManifest||numberLineManifest.runtimeFiles?.length!==3) fail('Le manifeste doit charger les trois extensions fonctionnelles de dnb_14.');
if(context.__moduleFiles.get('dnb_14')?.length!==4) fail('Le chargeur doit préparer dnb_14 et ses trois extensions fonctionnelles.');

for(let seed=0;seed<1000;seed++){
  for(const count of [5,10,15,20]){
    context.__setSeed(seed);
    context.__beginQuizBank([context.__placeValueModule]);
    const selected=context.__drawRuntimeModuleQuestions(context.__placeValueModule,context.__placeValueModule.questions,count);
    const families=selected.map(question=>placeValueRuntime.selection.familyForQuestion(question));
    const counts=Object.fromEntries(['direct','qcm','inverse','context','reasoning'].map(family=>[family,families.filter(value=>value===family).length]));
    if(selected.length!==count) fail(`La série dnb_02b de ${count} questions est incomplète avec la seed ${seed}.`);
    if(families.some((family,index)=>family===families[index-1]&&family===families[index-2])) fail(`Trois questions de la même famille se suivent dans dnb_02b (${count} questions, seed ${seed}) : ${families.join(', ')}.`);
    if(count===5&&(counts.direct!==3||new Set(families.filter(family=>family!=='direct')).size!==2)) fail(`La série courte dnb_02b doit contenir trois fondamentaux et deux familles variées distinctes (seed ${seed}).`);
    if(count===10&&JSON.stringify(counts)!==JSON.stringify({direct:5,qcm:2,inverse:1,context:1,reasoning:1})) fail(`Répartition incorrecte de dnb_02b avec la seed ${seed}.`);
    if(count===15&&(counts.direct!==8||Object.values(counts).reduce((sum,value)=>sum+value,0)!==15)) fail(`Répartition incorrecte de la série dnb_02b de 15 questions avec la seed ${seed}.`);
    if(count===20&&JSON.stringify(counts)!==JSON.stringify({direct:10,qcm:4,inverse:2,context:2,reasoning:2})) fail(`Répartition incorrecte de la série dnb_02b de 20 questions avec la seed ${seed}.`);
    if(selected.filter(question=>[7,8].includes(Number(question.n))).some(question=>Number(question.options?.template_version)!==2)) fail('Les nouvelles variantes 7 et 8 de dnb_02b doivent porter la version de gabarit 2.');
  }
}

for(let seed=0;seed<300;seed++){
  context.__setSeed(seed);
  for(const questionNumber of [9,10]){
    const question=context.__placeValueModule.questions.find(item=>Number(item.n)===questionNumber);
    const instance=context.__makeInstance(context.__placeValueModule,question);
    const details=instance.placeValue.qcm.optionDetails;
    if(details.length!==4||new Set(details.map(detail=>detail.value)).size!==4) fail(`Les quatre propositions de dnb_02b ${questionNumber} doivent être distinctes.`);
    if(details.some(detail=>Number(String(detail.value).replace(',','.'))<0)) fail(`Un distracteur négatif subsiste dans dnb_02b ${questionNumber}.`);
    if(details.filter(detail=>detail.errorCode==='correct').length!==1) fail(`La bonne réponse de dnb_02b ${questionNumber} doit être repérée une seule fois.`);
    if(details.some(detail=>!detail.errorCode)) fail(`Chaque proposition de dnb_02b ${questionNumber} doit porter un code diagnostique.`);
  }
}

context.__setSeed(21);
const contextQuestion=context.__makeInstance(context.__placeValueModule,context.__placeValueModule.questions.find(question=>Number(question.n)===7));
const reasoningQuestion=context.__makeInstance(context.__placeValueModule,context.__placeValueModule.questions.find(question=>Number(question.n)===8));
if(contextQuestion.placeValue.family!=='context'||!contextQuestion.placeValue.prompt.includes('Quel est le prix')) fail('La question 7 de dnb_02b doit proposer un contexte monétaire court.');
if(reasoningQuestion.placeValue.family!=='reasoning'||reasoningQuestion.placeValue.qcm.numeric!==false||!reasoningQuestion.placeValue.prompt.includes('Lina affirme')) fail('La question 8 de dnb_02b doit faire analyser la fausse règle « ajouter un zéro ».');
const numericQcm=context.__makeInstance(context.__placeValueModule,context.__placeValueModule.questions.find(question=>Number(question.n)===9));
const numericQcmHtml=context.__renderQuestion(numericQcm,false,'with');
const reasoningHtml=context.__renderQuestion(reasoningQuestion,false,'with');
if(!numericQcmHtml.includes('options-compact')||!numericQcmHtml.includes('data-error-code=')) fail('Le QCM numérique dnb_02b doit réutiliser la grille compacte et exposer ses codes diagnostiques.');
if(reasoningHtml.includes('options-compact')||!reasoningHtml.includes('place-value-options options-4 is-reasoning')) fail('Le QCM de raisonnement dnb_02b doit conserver des propositions longues sur une colonne.');

for(let seed=0;seed<1000;seed++){
  for(const count of [5,10,15,20]){
    context.__setSeed(seed);context.__beginQuizBank([context.__numberLineModule]);
    const selected=context.__drawRuntimeModuleQuestions(context.__numberLineModule,context.__numberLineModule.questions,count);
    const fresh=selected.filter(question=>Number(question.n)>=19),expected=count===5?1:(count===10?3:(count===15?4:6));
    if(selected.length!==count||fresh.length!==expected) fail(`Répartition incorrecte des nouveaux formats dnb_14 (${count} questions, seed ${seed}).`);
    if(selected.some((question,index)=>index>0&&Number(question.n)>=19&&Number(question.n)===Number(selected[index-1].n))) fail(`Deux nouveaux formats identiques se suivent dans dnb_14 (seed ${seed}).`);
    if(count===10&&new Set(fresh.map(question=>Number(question.n))).size!==3) fail(`La série dnb_14 de dix questions doit contenir les trois nouveaux formats (seed ${seed}).`);
  }
}

for(let seed=0;seed<10000;seed++){
  context.__setSeed(seed);
  for(const template of numberLineRuntime.selection.virtualTemplates){
    const instance=context.__makeInstance(context.__numberLineModule,template),data=instance.numberLineData;
    if(!data||data.kind!==template.options.numberline_kind) fail(`Le gabarit fonctionnel dnb_14 ${template.n} n’a pas produit son modèle.`);
    if(data.kind==='place-point'){
      const labels=new Set(data.references.map(reference=>reference.index));
      if(labels.has(data.startIndex)||labels.has(data.targetIndex)||data.startIndex===data.targetIndex) fail(`Le point tactile dnb_14 utilise une graduation déjà chiffrée (seed ${seed}).`);
      if(!context.__renderQuestion(instance,false,'with').includes('data-number-line-placement="1"')) fail('La question tactile dnb_14 doit afficher sa droite manipulable.');
    }else{
      const details=data.qcm.optionDetails;
      if(details.length<3||details.length>4||details.filter(detail=>detail.errorCode==='correct').length!==1) fail(`Le QCM dnb_14 ${template.n} doit avoir une seule réponse correcte.`);
      const values=details.map(detail=>detail.value??detail.pointIndex);
      if(new Set(values.map(String)).size!==values.length||details.some(detail=>!detail.errorCode)) fail(`Les distracteurs dnb_14 ${template.n} doivent être distincts et diagnostiques.`);
      if(data.kind==='choose-line'){
        const labeled=new Set(data.references.map(reference=>reference.index));
        if(details.some(detail=>labeled.has(detail.pointIndex))) fail(`Le QCM dnb_14 ${template.n} place un point sur une graduation déjà chiffrée.`);
      }
      if(data.kind==='determine-step'&&details.some(detail=>(String(detail.value).split(',')[1]||'').length>3)) fail('Le QCM du pas ne doit pas afficher de décimale inutilement longue.');
      const html=context.__renderQuestion(instance,false,'with');
      if(!html.includes('data-error-code=')) fail(`Le rendu dnb_14 ${template.n} doit exposer les erreurs visées.`);
    }
  }
}

context.__setSeed(14);
const legacyNumberLine=context.__makeInstance(context.__numberLineModule,context.__numberLineModule.questions[0]);
const legacyNumberLineHtml=context.__renderQuestion(legacyNumberLine,false,'with');
if(!legacyNumberLineHtml.includes('A&nbsp;:')) fail('La lettre et les deux-points doivent rester insécables dans le libellé de dnb_14.');

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

const relativeExpectedAnswers=['7','1','0','2','2','2','3','1'];
for (const [index, question] of context.__relativeModule.questions.entries()) {
  const instance=context.__makeInstance(context.__relativeModule,question);
  if(String(instance.answers?.[0])!==relativeExpectedAnswers[index]) fail(`Réponse incorrecte pour l’addition relative ${question.n}.`);
  const questionHtml=context.__renderQuestion(instance,false,'with');
  const correctionHtml=context.__renderQuestion(instance,true,'with');
  if(!questionHtml.includes('relative-token')) fail(`Le visuel de jetons manque pour l’addition relative ${question.n}.`);
  if(index%2===0&&!questionHtml.includes('data-relative-board')) fail(`Le plateau tactile manque pour l’addition relative ${question.n}.`);
  if(index%2===1&&!questionHtml.includes('class="opt')) fail(`Les propositions manquent pour l’addition relative ${question.n}.`);
  if(index%2===0&&!correctionHtml.includes('relative-token-result')) fail(`La correction du plateau tactile manque pour l’addition relative ${question.n}.`);
  if(index%2===1&&!correctionHtml.includes('relative-token')) fail(`La correction visuelle manque pour l’addition relative ${question.n}.`);
}

for(const question of context.__pythagorasTactileModule.questions){
  const instance=context.__makeInstance(context.__pythagorasTactileModule,question);
  const questionHtml=context.__renderQuestion(instance,false,'with');
  const correctionHtml=context.__renderQuestion(instance,true,'with');
  if(!questionHtml.includes('data-pythagoras-builder')) fail(`Le plateau Pythagore tactile manque pour la question ${question.n}.`);
  if(!questionHtml.includes('data-pythagoras-token')) fail(`Les étiquettes manipulables manquent pour la question ${question.n}.`);
  if(!correctionHtml.includes('pythagoras-builder-feedback is-success')) fail(`La solution Pythagore tactile manque pour la question ${question.n}.`);
  if(instance.answers.length!==instance.pythagorasTactile.expected.length) fail(`La réponse tactile ${question.n} ne correspond pas au nombre de cases.`);
}

const pythagorasInstance={
  module:{id:'dnb_24'},q:{n:7},scope:{a:3,b:4,c:5},answers:['4'],
  rawStatement:'Dans un triangle rectangle, l’hypoténuse mesure 5 cm et un côté mesure 3 cm. Calcule l’autre côté.',
  rawFooter:'$$[[formula]]\\text{ cm}$$'
};
const pythagorasQuestion=context.__renderPythagorasModule(pythagorasInstance,false,'with');
const pythagorasCorrection=context.__renderPythagorasModule(pythagorasInstance,true,'with');
const pythagorasWithoutAid=context.__renderPythagorasModule(pythagorasInstance,false,'without');
if(!pythagorasQuestion.includes('pythagoras-bar-svg')||!pythagorasQuestion.includes('?²')||!pythagorasQuestion.includes('5²')) fail('La question Pythagore 7 doit proposer PythaBarre avec le bon côté inconnu.');
if(!pythagorasCorrection.includes('pythagoras-reasoning-svg')||!pythagorasCorrection.includes('b = √16 = 4')) fail('La correction Pythagore 7 doit utiliser le chemin guidé avec soustraction puis racine.');
if(pythagorasWithoutAid.includes('pythagoras-bar-svg')||pythagorasWithoutAid.includes('pythagoras-reasoning-svg')) fail('PythaBarre doit être totalement absente sans aide.');

const contracts = fs.readFileSync(new URL('auto/scripts/core/01-series-contracts.js', root), 'utf8');
const registeredLegacyIds = [...contracts.matchAll(/\['[^']+','(dnb_[^']+)',\d+\]/g)].map(match => match[1]);
if (registeredLegacyIds.length !== 42) fail(`42 entrées MG1 attendues, ${registeredLegacyIds.length} trouvées.`);

const missingFromRegistry = moduleIds.filter(id => !registeredLegacyIds.includes(id));
const missingFromBank = registeredLegacyIds.filter(id => !moduleIds.includes(id));
if (missingFromRegistry.length) fail(`Modules absents du registre MG1 : ${missingFromRegistry.join(', ')}.`);
if (missingFromBank.length) fail(`Entrées MG1 sans module : ${missingFromBank.join(', ')}.`);

const indexHtml = fs.readFileSync(new URL('auto/index.html', root), 'utf8');
const slideshowSource = fs.readFileSync(new URL('auto/scripts/03-slideshow.js', root), 'utf8');
if (!indexHtml.includes('scripts/00-module-manifest.js')) fail('Le catalogue léger doit être chargé par la page.');
if (!indexHtml.includes('scripts/modules/00-runtime-registry.js')) fail('Le registre fonctionnel doit être chargé par la page.');
if (indexHtml.indexOf('scripts/modules/00-runtime-registry.js')>indexHtml.indexOf('scripts/02-question-engine.js')) fail('Le registre fonctionnel doit précéder le moteur de questions.');
if (!slideshowSource.includes('divisibility-sharing-mode')||!slideshowSource.includes('.equal-sharing-svg')) fail('Le partage dnb_08 doit avoir un cadrage téléphone et projection dédié.');
if (indexHtml.includes('scripts/data/01-numbers.js')||indexHtml.includes('scripts/data/02-geometry.js')||indexHtml.includes('scripts/data/03-data.js')||indexHtml.includes('scripts/data/04-algorithm.js')) {
  fail('Les banques complètes ne doivent plus être chargées au démarrage.');
}
for (const domain of Object.keys(isolatedModulesByDomain)) {
  for (const id of isolatedModulesByDomain[domain]) {
    if (indexHtml.includes(`scripts/modules/${domain}/${id}.js`)) fail(`Le module ${id} ne doit plus être chargé directement par index.html.`);
  }
}
if ((indexHtml.match(/<script defer src=/g)||[]).length < 30) fail('Les scripts de démarrage doivent rester non bloquants pour le premier affichage.');

if (!process.exitCode) {
  console.log(`OK — ${bank.length} modules, ${questionCount} gabarits, banque V1.17 figée, registre MG1 cohérent.`);
}
