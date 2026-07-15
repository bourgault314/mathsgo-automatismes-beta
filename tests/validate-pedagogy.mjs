import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const sources=[
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/geometry/thales-configuration.js',
  'auto/scripts/shared/pedagogy/00-registry.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_25.js',
  'auto/scripts/modules/geometry/dnb_25.js'
];
const code=sources.map(path=>fs.readFileSync(new URL(path,root),'utf8')).join('\n')+`
globalThis.__thalesQuestionNumbers=MODULE_DNB_25.questions.map(question=>Number(question.n));`;
const context={};context.globalThis=context;vm.createContext(context);vm.runInContext(code,context,{timeout:5000});

const fail=message=>{console.error(`ÉCHEC — ${message}`);process.exitCode=1;};
const registry=context.MATHSGO_PEDAGOGY;
if(!registry) fail('Le registre pédagogique global est absent.');
const modules=registry?registry.list():[];
if(modules.length!==1) fail(`Un module pédagogique pilote attendu, ${modules.length} trouvé(s).`);

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
  6:['tester-parallelisme','qcm-one','none',['parallelism-test','coherence']],
  7:['reperer-condition-manquante','qcm-one','essential',['conditions']],
  8:['choisir-egalite','qcm-one','none',['ratios','calculation']],
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
const registryPosition=index.indexOf('scripts/shared/pedagogy/00-registry.js');
const metadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_25.js');
const slideshowPosition=index.indexOf('scripts/03-slideshow.js');
const appPosition=index.indexOf('scripts/04-app.js');
if(registryPosition<0||metadataPosition<registryPosition||slideshowPosition<metadataPosition||appPosition<metadataPosition){
  fail('Le registre pédagogique doit être chargé avant le diaporama et l’application.');
}
if(!catalogue.includes('id="pedagogyCatalogue"')||!catalogue.includes('MATHSGO_PEDAGOGY.list()')) fail('Le catalogue pédagogique doit être visible dans la bibliothèque.');
for(const script of [...catalogue.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(match=>match[1]).filter(Boolean)){
  try{new vm.Script(script);}catch(error){fail('Un script intégré du catalogue est invalide : '+error.message);}
}
if(!app.includes('MATHSGO_PEDAGOGY.getQuestionType(m.id,q.n)')) fail('La politique visuelle doit consulter le registre pédagogique.');
if(!slideshow.includes('MATHSGO_PEDAGOGY.getModule(moduleId)')||!slideshow.includes('sections.includes(rule[3])')) fail('Les aides doivent être choisies à partir du registre pédagogique.');

context.courseCatalog={thales:{title:'Thalès',rules:[
  ['Conditions','',false,'conditions'],['Rapports','',false,'ratios'],['Calcul','',false,'calculation'],
  ['Parallélisme','',false,'parallelism-test'],['Cohérence','',false,'coherence']
]}};
vm.runInContext(
  functionBlock(slideshow,'courseForSlide','fitNavNumbers')+
  functionBlock(slideshow,'courseKindForModule','courseContextForInstance')+
  functionBlock(slideshow,'courseContextForInstance','slidesDataForQuiz')+
  functionBlock(app,'visualPolicyForQuestion','questionEligibleForVisualMode'),
  context,{timeout:5000}
);
const q6Context=context.courseContextForInstance({module:{id:'dnb_25'},q:{n:6}});
const q6Course=context.courseForSlide({courseKind:context.courseKindForModule('dnb_25','with'),courseContext:q6Context});
if(q6Course.rules.map(rule=>rule[3]).join(',')!=='parallelism-test,coherence') fail('La question 6 doit proposer seulement l’aide sur le parallélisme et la cohérence.');
const q3Context=context.courseContextForInstance({module:{id:'dnb_25'},q:{n:3}});
const q3Course=context.courseForSlide({courseKind:'thales',courseContext:q3Context});
if(q3Course.rules.map(rule=>rule[3]).join(',')!=='ratios,calculation,coherence') fail('La question 3 doit proposer seulement rapports, calcul et cohérence.');
if(context.visualPolicyForQuestion({id:'dnb_25'},{n:1})!=='essential'||context.visualPolicyForQuestion({id:'dnb_25'},{n:6})!=='none') fail('La politique visuelle Thalès n’est pas appliquée par l’application.');

if(!process.exitCode) console.log('OK — les 10 types Thalès, leurs réponses, leurs figures et leurs aides sont classés et branchés.');
