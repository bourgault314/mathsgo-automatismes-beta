import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const sources=[
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/numbers/relative-tokens.js',
  'auto/scripts/shared/visuals/geometry/thales-configuration.js',
  'auto/scripts/shared/visuals/geometry/triangle-angle-sum.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-mill.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-bar.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-reasoning.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-builder.js',
  'auto/scripts/shared/visuals/arithmetic/relation-bar.js',
  'auto/scripts/shared/visuals/algebra/relation-tiles.js',
  'auto/scripts/shared/pedagogy/00-registry.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_09.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_18.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_24.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_24b.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_25.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_38.js',
  'auto/scripts/modules/geometry/dnb_18.js',
  'auto/scripts/modules/geometry/dnb_24.js',
  'auto/scripts/modules/geometry/dnb_24b.js',
  'auto/scripts/modules/geometry/dnb_25.js',
  'auto/scripts/modules/numbers/dnb_38.js',
  'auto/scripts/modules/numbers/dnb_09.js'
];
const code=sources.map(path=>fs.readFileSync(new URL(path,root),'utf8')).join('\n')+`
globalThis.__angleQuestionNumbers=MODULE_DNB_18.questions.map(question=>Number(question.n));
globalThis.__thalesQuestionNumbers=MODULE_DNB_25.questions.map(question=>Number(question.n));
globalThis.__relativeQuestionNumbers=MODULE_DNB_38.questions.map(question=>Number(question.n));
globalThis.__pythagorasQuestionNumbers=MODULE_DNB_24.questions.map(question=>Number(question.n));
globalThis.__pythagorasTactileQuestionNumbers=MODULE_DNB_24_TACTILE.questions.map(question=>Number(question.n));
globalThis.__relationQuestionNumbers=MODULE_DNB_09.questions.map(question=>Number(question.n));`;
const context={};context.globalThis=context;vm.createContext(context);vm.runInContext(code,context,{timeout:5000});

const fail=message=>{console.error(`ÉCHEC — ${message}`);process.exitCode=1;};
const registry=context.MATHSGO_PEDAGOGY;
if(!registry) fail('Le registre pédagogique global est absent.');
const modules=registry?registry.list():[];
if(modules.length!==6) fail(`Six modules pédagogiques pilotes attendus, ${modules.length} trouvé(s).`);

const relations=registry?.getModule('dnb_09');
if(!relations) fail('Le classement pédagogique de dnb_09 est absent.');
if(relations&&relations.topic!=='Relations autour d’un nombre') fail('La notion principale de dnb_09 doit décrire les relations autour d’un nombre.');
if(relations&&relations.questionTypes.length!==8) fail('Les huit types de questions de relations doivent être explicitement classés.');
const relationBankNumbers=[...(context.__relationQuestionNumbers||[])].sort((a,b)=>a-b);
const relationClassifiedNumbers=(relations?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(relationClassifiedNumbers)!==JSON.stringify(relationBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit de relations exactement une fois.');
const expectedRelations={
  1:['synthese-relations','numeric','algebra.relation-tiles'],
  2:['multiple-direct','numeric','arithmetic.relation-bar'],3:['multiple-direct','numeric','arithmetic.relation-bar'],
  4:['fraction-unitaire','numeric','arithmetic.relation-bar'],5:['nombre-voisin','numeric','arithmetic.relation-bar'],6:['nombre-voisin','numeric','arithmetic.relation-bar'],
  8:['reconnaitre-multiple','qcm-one','algebra.relation-tiles'],9:['multiple-inverse','numeric','arithmetic.relation-bar'],
  10:['multiple-direct','numeric','arithmetic.relation-bar'],11:['multiple-direct','numeric','arithmetic.relation-bar'],
  12:['fraction-unitaire','numeric','arithmetic.relation-bar'],13:['fraction-unitaire','numeric','arithmetic.relation-bar'],
  14:['reconnaitre-multiple','qcm-one','algebra.relation-tiles'],15:['reconnaitre-multiple','qcm-one','algebra.relation-tiles'],
  16:['reconnaitre-fraction','qcm-one','algebra.relation-tiles'],17:['reconnaitre-fraction','qcm-one','algebra.relation-tiles'],
  18:['reconnaitre-voisin','qcm-one','algebra.relation-tiles'],19:['reconnaitre-voisin','qcm-one','algebra.relation-tiles']
};
for(const [questionNumber,[id,response,component]] of Object.entries(expectedRelations)){
  const type=registry?.getQuestionType('dnb_09',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Relations ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Relations ${questionNumber}.`);
  if(type&&type.visual.policy!=='optional') fail(`La figure de la question Relations ${questionNumber} doit rester une aide facultative.`);
  if(type&&type.visual.component!==component) fail(`Composant incorrect pour la question Relations ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(component)) fail(`Composant visuel absent pour la question Relations ${questionNumber}.`);
}

const pythagoras=registry?.getModule('dnb_24');
if(!pythagoras) fail('Le classement pédagogique de dnb_24 est absent.');
if(pythagoras&&pythagoras.courseKind!=='pythagoras') fail('dnb_24 doit appeler le cours Pythagore.');
if(pythagoras&&pythagoras.questionTypes.length!==10) fail('Les dix types de questions Pythagore doivent être explicitement classés.');
const pythagorasBankNumbers=[...(context.__pythagorasQuestionNumbers||[])].sort((a,b)=>a-b);
const pythagorasClassifiedNumbers=(pythagoras?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(pythagorasClassifiedNumbers)!==JSON.stringify(pythagorasBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Pythagore exactement une fois.');
const expectedPythagoras={
  1:['verifier-angle-droit','qcm-one','essential',null],2:['refuser-apparence','qcm-one','essential',null],
  3:['choisir-egalite','qcm-one','aid-only','geometry.pythagoras-bar'],4:['identifier-hypotenuse','qcm-one','aid-only','geometry.pythagoras-mill'],
  5:['calculer-carre-hypotenuse','numeric','aid-only','geometry.pythagoras-bar'],6:['calculer-hypotenuse','numeric','aid-only','geometry.pythagoras-reasoning'],
  7:['calculer-cote','numeric','aid-only','geometry.pythagoras-reasoning'],8:['appliquer-reciproque','qcm-one','none',null],
  9:['refuter-reciproque','qcm-one','none',null],10:['controler-hypotenuse','qcm-one','none',null]
};
for(const [questionNumber,[id,response,policy,component]] of Object.entries(expectedPythagoras)){
  const type=registry?.getQuestionType('dnb_24',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Pythagore ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Pythagore ${questionNumber}.`);
  if(type&&type.visual.policy!==policy) fail(`Rôle visuel incorrect pour la question Pythagore ${questionNumber}.`);
  if(type&&type.visual.component!==component) fail(`Composant incorrect pour la question Pythagore ${questionNumber}.`);
  if(component&&!context.MATHSGO_VISUALS.get(component)) fail(`Composant visuel absent pour la question Pythagore ${questionNumber}.`);
}

const pythagorasTactile=registry?.getModule('dnb_24b');
if(!pythagorasTactile) fail('Le classement pédagogique de dnb_24b est absent.');
if(pythagorasTactile&&pythagorasTactile.generatorContract.representation!=='pythagoras-builder') fail('Le module tactile doit déclarer son composant de manipulation.');
const tactileBankNumbers=[...(context.__pythagorasTactileQuestionNumbers||[])].sort((a,b)=>a-b);
const tactileClassifiedNumbers=(pythagorasTactile?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(tactileClassifiedNumbers)!==JSON.stringify(tactileBankNumbers)) fail('Le catalogue pédagogique doit couvrir les cinq gabarits Pythagore tactiles.');
for(const questionNumber of tactileBankNumbers){
  const type=registry?.getQuestionType('dnb_24b',questionNumber);
  if(!type||type.response!=='pythagoras-builder'||type.visual.component!=='geometry.pythagoras-builder'||type.visual.policy!=='essential') fail(`Classement incorrect pour la question Pythagore tactile ${questionNumber}.`);
}

const angles=registry?.getModule('dnb_18');
if(!angles) fail('Le classement pédagogique de dnb_18 est absent.');
if(angles&&angles.topic!=='Somme des angles d’un triangle') fail('La notion principale de dnb_18 doit être la somme des angles d’un triangle.');
if(angles&&angles.questionTypes.length!==9) fail('Les types de questions Angles doivent être explicitement classés.');
const angleBankNumbers=[...(context.__angleQuestionNumbers||[])].sort((a,b)=>a-b);
const angleClassifiedNumbers=(angles?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(angleClassifiedNumbers)!==JSON.stringify(angleBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Angles exactement une fois.');
const expectedAngles={
  1:['connaitre-somme','numeric','none',['sum-180']],
  2:['calculer-angle','numeric','optional',['sum-180','bar-model']],
  3:['calculer-angle','numeric','optional',['sum-180','bar-model']],
  4:['triangle-rectangle','numeric','optional',['right-angle','bar-model']],
  5:['isoscele-angle-base','numeric','optional',['isosceles','bar-model']],
  6:['isoscele-angle-sommet','numeric','optional',['isosceles','bar-model']],
  7:['triangle-equilateral','numeric','optional',['equilateral','bar-model']],
  8:['verifier-trois-angles','qcm-one','optional',['coherence','bar-model']],
  9:['lire-figure','numeric','essential',['sum-180','bar-model']],
  10:['detecter-impossibilite','qcm-one','optional',['coherence','bar-model']]
};
for(const [questionNumber,[id,response,policy,helpSections]] of Object.entries(expectedAngles)){
  const type=registry?.getQuestionType('dnb_18',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Angles ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Angles ${questionNumber}.`);
  if(type&&type.visual.policy!==policy) fail(`Rôle visuel incorrect pour la question Angles ${questionNumber}.`);
  if(type&&JSON.stringify([...type.helpSections])!==JSON.stringify(helpSections)) fail(`Aide incorrecte pour la question Angles ${questionNumber}.`);
  if(type&&policy!=='none'&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Angles ${questionNumber}.`);
}

const thales=registry?.getModule('dnb_25');
if(!thales) fail('Le classement pédagogique de dnb_25 est absent.');
if(thales&&thales.topic!=='Théorème de Thalès') fail('La notion principale de dnb_25 doit être le théorème de Thalès.');
if(thales&&thales.courseKind!=='thales') fail('dnb_25 doit appeler le cours Thalès.');
if(thales&&thales.questionTypes.length!==10) fail('Les dix types de questions Thalès doivent être explicitement classés.');

const bankNumbers=[...(context.__thalesQuestionNumbers||[])].sort((a,b)=>a-b);
const classifiedNumbers=(thales?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(classifiedNumbers)!==JSON.stringify(bankNumbers)){
  fail('Le catalogue pédagogique doit couvrir chaque gabarit Thalès exactement une fois.');
}

const expected={
  1:['verifier-conditions','qcm-one','essential',['conditions']],
  2:['reconnaitre-rapports','qcm-one','essential',['ratios']],
  3:['calculer-ae','numeric','essential',['ratios','calculation','coherence']],
  4:['calculer-ab','numeric','essential',['ratios','calculation','coherence']],
  5:['calculer-de','numeric','essential',['ratios','calculation','coherence']],
  6:['tester-parallelisme','qcm-one','aid-only',['parallelism-test','coherence']],
  7:['reperer-condition-manquante','qcm-one','essential',['conditions']],
  8:['choisir-egalite','qcm-one','aid-only',['ratios','calculation']],
  9:['controler-coherence','qcm-one','none',['coherence']],
  10:['calculer-bc','numeric','essential',['ratios','calculation','coherence']]
};
for(const [questionNumber,[id,response,policy,helpSections]] of Object.entries(expected)){
  const type=registry?.getQuestionType('dnb_25',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Thalès ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Thalès ${questionNumber}.`);
  if(type&&type.visual.policy!==policy) fail(`Rôle visuel incorrect pour la question Thalès ${questionNumber}.`);
  if(type&&JSON.stringify([...type.helpSections])!==JSON.stringify(helpSections)) fail(`Aide incorrecte pour la question Thalès ${questionNumber}.`);
  if(type&&policy==='essential'&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Thalès ${questionNumber}.`);
}

const index=fs.readFileSync(new URL('auto/index.html',root),'utf8');
const catalogue=fs.readFileSync(new URL('auto/dev/visual-library.html',root),'utf8');
const app=fs.readFileSync(new URL('auto/scripts/04-app.js',root),'utf8');
const slideshow=fs.readFileSync(new URL('auto/scripts/03-slideshow.js',root),'utf8');
const functionBlock=(source,name,nextName)=>source.slice(source.indexOf(`function ${name}(`),source.indexOf(`function ${nextName}(`));
const thalesTemplateBlock=slideshow.slice(slideshow.indexOf('function courseThalesTemplateVisual('),slideshow.indexOf('const courseCatalog='));
const registryPosition=index.indexOf('scripts/shared/pedagogy/00-registry.js');
const relationMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_09.js');
const angleMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_18.js');
const pythagorasMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_24.js');
const thalesMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_25.js');
const slideshowPosition=index.indexOf('scripts/03-slideshow.js');
const appPosition=index.indexOf('scripts/04-app.js');
if(registryPosition<0||relationMetadataPosition<registryPosition||angleMetadataPosition<registryPosition||pythagorasMetadataPosition<registryPosition||thalesMetadataPosition<registryPosition||slideshowPosition<relationMetadataPosition||slideshowPosition<angleMetadataPosition||slideshowPosition<pythagorasMetadataPosition||slideshowPosition<thalesMetadataPosition||appPosition<relationMetadataPosition||appPosition<angleMetadataPosition||appPosition<pythagorasMetadataPosition||appPosition<thalesMetadataPosition){
  fail('Le registre pédagogique doit être chargé avant le diaporama et l’application.');
}
if(!catalogue.includes('id="pedagogyCatalogue"')||!catalogue.includes('MATHSGO_PEDAGOGY.list()')) fail('Le catalogue pédagogique doit être visible dans la bibliothèque.');
for(const script of [...catalogue.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(match=>match[1]).filter(Boolean)){
  try{new vm.Script(script);}catch(error){fail('Un script intégré du catalogue est invalide : '+error.message);}
}
if(!app.includes('MATHSGO_PEDAGOGY.getQuestionType(m.id,q.n)')) fail('La politique visuelle doit consulter le registre pédagogique.');
if(!slideshow.includes('MATHSGO_PEDAGOGY.getModule(moduleId)')||!slideshow.includes('sections.includes(rule[3])')) fail('Les aides doivent être choisies à partir du registre pédagogique.');
if(!slideshow.includes("coursePythagorasLibraryVisual('bar')")||!slideshow.includes("slide.courseKind==='pythagoras'")) fail('Le cours Pythagore doit utiliser la bibliothèque et filtrer ses rubriques.');

context.courseCatalog={thales:{title:'Thalès',rules:[
  ['Conditions','',false,'conditions'],['Rapports','',false,'ratios'],['Calcul','',false,'calculation'],
  ['Parallélisme','',false,'parallelism-test'],['Cohérence','',false,'coherence']
]},relative_addition:{title:'Additionner des nombres entiers relatifs',rules:[
  ['Les jetons','',false,'tokens'],['Rassembler','',false,'tokens'],['Paire nulle','',false,'zero-pair'],['Méthode','',false,'method']
]}};
vm.runInContext(
  thalesTemplateBlock+
  functionBlock(slideshow,'courseForSlide','fitNavNumbers')+
  functionBlock(slideshow,'courseKindForModule','courseContextForInstance')+
  functionBlock(slideshow,'courseContextForInstance','slidesDataForQuiz')+
  functionBlock(app,'visualPolicyForQuestion','questionEligibleForVisualMode'),
  context,{timeout:5000}
);
const q6Context=context.courseContextForInstance({module:{id:'dnb_25'},q:{n:6}});
const q6Course=context.courseForSlide({courseKind:context.courseKindForModule('dnb_25','with'),courseContext:q6Context});
if(q6Course.rules[0]?.[0]!=='La méthode'||q6Course.rules.slice(1).map(rule=>rule[3]).join(',')!=='parallelism-test,coherence') fail('La question 6 doit proposer le gabarit puis seulement l’aide sur le parallélisme et la cohérence.');
const q3Context=context.courseContextForInstance({module:{id:'dnb_25'},q:{n:3}});
const q3Course=context.courseForSlide({courseKind:'thales',courseContext:q3Context});
if(q3Course.rules[0]?.[0]!=='La méthode'||q3Course.rules.slice(1).map(rule=>rule[3]).join(',')!=='ratios,calculation,coherence') fail('La question 3 doit proposer le gabarit puis seulement rapports, calcul et cohérence.');
if(context.visualPolicyForQuestion({id:'dnb_25'},{n:1})!=='essential'||context.visualPolicyForQuestion({id:'dnb_25'},{n:6})!=='aid-only') fail('La politique visuelle Thalès n’est pas appliquée par l’application.');

const relative=registry?.getModule('dnb_38');
if(!relative) fail('Le classement pédagogique de dnb_38 est absent.');
if(relative&&relative.topic!=='Addition de nombres entiers relatifs') fail('La notion principale de dnb_38 doit être l’addition de nombres entiers relatifs.');
if(relative&&relative.courseKind!=='relative_addition') fail('dnb_38 doit appeler le cours Addition de nombres entiers relatifs.');
if(relative&&relative.generatorContract.operation!=='addition') fail('dnb_38 doit déclarer une opération d’addition.');
const relativeBankNumbers=[...(context.__relativeQuestionNumbers||[])].sort((a,b)=>a-b);
const relativeClassifiedNumbers=(relative?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(relativeClassifiedNumbers)!==JSON.stringify(relativeBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Relatifs exactement une fois.');
const expectedRelative={
  1:['addition-manipuler','relative-tokens','essential',['tokens','zero-pair']],
  2:['addition-resultat','qcm-one','optional',['tokens','opposite-signs']],
  3:['addition-manipuler','relative-tokens','essential',['tokens','zero-pair']],
  4:['addition-paire-nulle','qcm-one','optional',['zero-pair']],
  5:['addition-manipuler','relative-tokens','essential',['tokens','zero-pair']],
  6:['addition-resultat','qcm-one','optional',['tokens','opposite-signs']],
  7:['addition-manipuler','relative-tokens','essential',['tokens','zero-pair']],
  8:['addition-methode','qcm-one','optional',['method','zero-pair']]
};
for(const [questionNumber,[id,response,policy,helpSections]] of Object.entries(expectedRelative)){
  const type=registry?.getQuestionType('dnb_38',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Relatifs ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Relatifs ${questionNumber}.`);
  if(type&&type.visual.policy!==policy) fail(`Rôle visuel incorrect pour la question Relatifs ${questionNumber}.`);
  if(type&&JSON.stringify([...type.helpSections])!==JSON.stringify(helpSections)) fail(`Aide incorrecte pour la question Relatifs ${questionNumber}.`);
  if(type&&policy!=='none'&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Relatifs ${questionNumber}.`);
}
const relativeCourse=context.courseForSlide({courseKind:'relative_addition',courseContext:{}});
if(!relativeCourse||relativeCourse.title!=='Additionner des nombres entiers relatifs') fail('Le cours des relatifs doit être disponible dans le diaporama.');
if(relativeCourse&&!relativeCourse.rules.some(rule=>rule[0]==='Paire nulle')) fail('Le cours des relatifs doit expliquer les paires nulles.');

if(!process.exitCode) console.log('OK — les 18 questions Relations, les 10 questions Pythagore, les questions Angles, les 10 types Thalès et l’Addition de relatifs, leurs réponses, leurs visuels et leurs aides sont classés et branchés.');
