import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const sources=[
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/numbers/number-line.js',
  'auto/scripts/shared/visuals/numbers/order-cards.js',
  'auto/scripts/shared/visuals/numbers/place-value-table.js',
  'auto/scripts/shared/visuals/numbers/square-area.js',
  'auto/scripts/shared/visuals/numbers/relative-tokens.js',
  'auto/scripts/shared/visuals/geometry/coordinate-plane.js',
  'auto/scripts/shared/visuals/geometry/angle-vocabulary.js',
  'auto/scripts/shared/visuals/measures/conversion-table.js',
  'auto/scripts/shared/visuals/geometry/thales-configuration.js',
  'auto/scripts/shared/visuals/geometry/triangle-angle-sum.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-mill.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-bar.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-reasoning.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-builder.js',
  'auto/scripts/shared/visuals/arithmetic/relation-bar.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-percent-bar.js',
  'auto/scripts/shared/visuals/arithmetic/equal-sharing-board.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-wall.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-decimal-grid.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-operations.js',
  'auto/scripts/shared/visuals/algebra/equation-splat.js',
  'auto/scripts/shared/visuals/algebra/algebra-tiles.js',
  'auto/scripts/shared/visuals/algebra/area-model.js',
  'auto/scripts/shared/visuals/algebra/relation-tiles.js',
  'auto/scripts/shared/pedagogy/00-registry.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_01.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_02.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_02b.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_03.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_03b.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_04.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_05.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_06.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_07.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_08.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_09.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_10.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_11.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_12.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_13.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_14.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_15.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_16.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_17.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_18.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_19.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_20.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_21.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_22.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_23.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_24.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_24b.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_25.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_26.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_26b.js',
  'auto/scripts/shared/pedagogy/geometry/dnb_27.js',
  'auto/scripts/shared/pedagogy/data/dnb_28.js',
  'auto/scripts/shared/pedagogy/data/dnb_29.js',
  'auto/scripts/shared/pedagogy/data/dnb_30.js',
  'auto/scripts/shared/pedagogy/data/dnb_31.js',
  'auto/scripts/shared/pedagogy/data/dnb_32.js',
  'auto/scripts/shared/pedagogy/data/dnb_33.js',
  'auto/scripts/shared/pedagogy/data/dnb_34.js',
  'auto/scripts/shared/pedagogy/data/dnb_35.js',
  'auto/scripts/shared/pedagogy/data/dnb_36.js',
  'auto/scripts/shared/pedagogy/algorithm/dnb_37.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_38.js',
  'auto/scripts/shared/pedagogy/numbers/dnb_39.js',
  'auto/scripts/modules/numbers/dnb_01.js',
  'auto/scripts/modules/numbers/dnb_02.js',
  'auto/scripts/modules/numbers/dnb_02b.js',
  'auto/scripts/modules/numbers/dnb_03.js',
  'auto/scripts/modules/numbers/dnb_03b.js',
  'auto/scripts/modules/numbers/dnb_04.js',
  'auto/scripts/modules/numbers/dnb_05.js',
  'auto/scripts/modules/numbers/dnb_06.js',
  'auto/scripts/modules/numbers/dnb_07.js',
  'auto/scripts/modules/numbers/dnb_08.js',
  'auto/scripts/modules/numbers/dnb_10.js',
  'auto/scripts/modules/numbers/dnb_11.js',
  'auto/scripts/modules/numbers/dnb_12.js',
  'auto/scripts/modules/numbers/dnb_13.js',
  'auto/scripts/modules/numbers/dnb_14.js',
  'auto/scripts/modules/geometry/dnb_15.js',
  'auto/scripts/modules/geometry/dnb_16.js',
  'auto/scripts/modules/geometry/dnb_17.js',
  'auto/scripts/modules/geometry/dnb_18.js',
  'auto/scripts/modules/geometry/dnb_19.js',
  'auto/scripts/modules/geometry/dnb_20.js',
  'auto/scripts/modules/geometry/dnb_21.js',
  'auto/scripts/modules/geometry/dnb_22.js',
  'auto/scripts/modules/geometry/dnb_23.js',
  'auto/scripts/modules/geometry/dnb_24.js',
  'auto/scripts/modules/geometry/dnb_24b.js',
  'auto/scripts/modules/geometry/dnb_25.js',
  'auto/scripts/modules/geometry/dnb_26.js',
  'auto/scripts/modules/geometry/dnb_26b.js',
  'auto/scripts/modules/geometry/dnb_27.js',
  'auto/scripts/modules/data/dnb_28.js',
  'auto/scripts/modules/data/dnb_29.js',
  'auto/scripts/modules/data/dnb_30.js',
  'auto/scripts/modules/data/dnb_31.js',
  'auto/scripts/modules/data/dnb_32.js',
  'auto/scripts/modules/data/dnb_33.js',
  'auto/scripts/modules/data/dnb_34.js',
  'auto/scripts/modules/data/dnb_35.js',
  'auto/scripts/modules/data/dnb_36.js',
  'auto/scripts/modules/algorithm/dnb_37.js',
  'auto/scripts/modules/numbers/dnb_38.js',
  'auto/scripts/modules/numbers/dnb_39.js',
  'auto/scripts/modules/numbers/dnb_09.js'
];
const code=sources.map(path=>fs.readFileSync(new URL(path,root),'utf8')).join('\n')+`
globalThis.__fractionDecimalQuestionNumbers=MODULE_DNB_01.questions.map(question=>Number(question.n));
globalThis.__decimalQuestionNumbers=MODULE_DNB_02.questions.map(question=>Number(question.n));
globalThis.__decimalRelativeQuestionNumbers=MODULE_DNB_39.questions.map(question=>Number(question.n));
globalThis.__placeValueQuestionNumbers=MODULE_DNB_02B.questions.map(question=>Number(question.n));
globalThis.__fractionOperationQuestionNumbers=MODULE_DNB_03.questions.map(question=>Number(question.n));
globalThis.__fractionMultiplyDivideQuestionNumbers=MODULE_DNB_03B.questions.map(question=>Number(question.n));
globalThis.__fractionPercentQuestionNumbers=MODULE_DNB_04.questions.map(question=>Number(question.n));
globalThis.__equivalentFormsQuestionNumbers=MODULE_DNB_05.questions.map(question=>Number(question.n));
globalThis.__scientificQuestionNumbers=MODULE_DNB_06.questions.map(question=>Number(question.n));
globalThis.__squareQuestionNumbers=MODULE_DNB_07.questions.map(question=>Number(question.n));
globalThis.__divisibilityQuestionNumbers=MODULE_DNB_08.questions.map(question=>Number(question.n));
globalThis.__reductionQuestionNumbers=MODULE_DNB_10.questions.map(question=>Number(question.n));
globalThis.__substitutionQuestionNumbers=MODULE_DNB_11.questions.map(question=>Number(question.n));
globalThis.__expandFactorQuestionNumbers=MODULE_DNB_12.questions.map(question=>Number(question.n));
globalThis.__equationQuestionNumbers=MODULE_DNB_13.questions.map(question=>Number(question.n));
globalThis.__numberLineQuestionNumbers=MODULE_DNB_14.questions.map(question=>Number(question.n));
globalThis.__coordinateQuestionNumbers=MODULE_DNB_15.questions.map(question=>Number(question.n));
globalThis.__figureCodingQuestionNumbers=MODULE_DNB_16.questions.map(question=>Number(question.n));
globalThis.__angleVocabularyQuestionNumbers=MODULE_DNB_17.questions.map(question=>Number(question.n));
globalThis.__conversionQuestionNumbers=MODULE_DNB_19.questions.map(question=>Number(question.n));
globalThis.__angleQuestionNumbers=MODULE_DNB_18.questions.map(question=>Number(question.n));
globalThis.__solidQuestionNumbers=MODULE_DNB_20.questions.map(question=>Number(question.n));
globalThis.__perimeterQuestionNumbers=MODULE_DNB_21.questions.map(question=>Number(question.n));
globalThis.__areaQuestionNumbers=MODULE_DNB_22.questions.map(question=>Number(question.n));
globalThis.__volumeQuestionNumbers=MODULE_DNB_23.questions.map(question=>Number(question.n));
globalThis.__thalesQuestionNumbers=MODULE_DNB_25.questions.map(question=>Number(question.n));
globalThis.__trigonometryReasoningQuestionNumbers=MODULE_DNB_26.questions.map(question=>Number(question.n));
globalThis.__trigonometryCalculationQuestionNumbers=MODULE_DNB_26B.questions.map(question=>Number(question.n));
globalThis.__transformationQuestionNumbers=MODULE_DNB_27.questions.map(question=>Number(question.n));
globalThis.__probabilityQuestionNumbers=MODULE_DNB_28.questions.map(question=>Number(question.n));
globalThis.__frequencyQuestionNumbers=MODULE_DNB_29.questions.map(question=>Number(question.n));
globalThis.__meanQuestionNumbers=MODULE_DNB_30.questions.map(question=>Number(question.n));
globalThis.__medianQuestionNumbers=MODULE_DNB_31.questions.map(question=>Number(question.n));
globalThis.__readDataQuestionNumbers=MODULE_DNB_32.questions.map(question=>Number(question.n));
globalThis.__recognizeProportionQuestionNumbers=MODULE_DNB_33.questions.map(question=>Number(question.n));
globalThis.__solveProportionQuestionNumbers=MODULE_DNB_34.questions.map(question=>Number(question.n));
globalThis.__percentChangeQuestionNumbers=MODULE_DNB_35.questions.map(question=>Number(question.n));
globalThis.__readGraphQuestionNumbers=MODULE_DNB_36.questions.map(question=>Number(question.n));
globalThis.__algorithmQuestionNumbers=MODULE_DNB_37.questions.map(question=>Number(question.n));
globalThis.__relativeQuestionNumbers=MODULE_DNB_38.questions.map(question=>Number(question.n));
globalThis.__pythagorasQuestionNumbers=MODULE_DNB_24.questions.map(question=>Number(question.n));
globalThis.__pythagorasTactileQuestionNumbers=MODULE_DNB_24_TACTILE.questions.map(question=>Number(question.n));
globalThis.__relationQuestionNumbers=MODULE_DNB_09.questions.map(question=>Number(question.n));`;
const context={};context.globalThis=context;vm.createContext(context);vm.runInContext(code,context,{timeout:5000});

const fail=message=>{console.error(`ÉCHEC — ${message}`);process.exitCode=1;};
const registry=context.MATHSGO_PEDAGOGY;
if(!registry) fail('Le registre pédagogique global est absent.');
const modules=registry?registry.list():[];
if(modules.length!==43) fail(`Quarante-trois modules pédagogiques attendus, ${modules.length} trouvé(s).`);

function assertClassifiedModule(id,bankNumbers,courseKind,expected){
  const module=registry?.getModule(id);
  if(!module) return fail(`Le classement pédagogique de ${id} est absent.`);
  if(module.courseKind!==courseKind) fail(`Cours incorrect pour ${id} (${module.courseKind}).`);
  const classified=module.questionTypes.flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
  const bank=[...(bankNumbers||[])].sort((a,b)=>a-b);
  if(JSON.stringify(classified)!==JSON.stringify(bank)) fail(`Le catalogue pédagogique doit couvrir chaque gabarit de ${id} exactement une fois.`);
  for(const [questionNumber,[typeId,response,policy,component]] of Object.entries(expected)){
    const type=registry.getQuestionType(id,Number(questionNumber));
    if(!type||type.id!==typeId) fail(`Type incorrect pour ${id}, question ${questionNumber}.`);
    if(type&&type.response!==response) fail(`Réponse incorrecte pour ${id}, question ${questionNumber}.`);
    if(type&&type.visual.policy!==policy) fail(`Politique visuelle incorrecte pour ${id}, question ${questionNumber}.`);
    if(type&&type.visual.component!==component) fail(`Composant incorrect pour ${id}, question ${questionNumber}.`);
    if(component&&!context.MATHSGO_VISUALS.get(component)) fail(`Composant visuel absent pour ${id}, question ${questionNumber}.`);
  }
}

function expectedQuestions(...groups){
  return Object.fromEntries(groups.flatMap(([questions,type,response,policy,component])=>questions.map(question=>[question,[type,response,policy,component]])));
}

assertClassifiedModule('dnb_02',context.__decimalQuestionNumbers,'decimal_numbers',{
  1:['comparer-decimaux-positifs','qcm-one','none',null],
  3:['ranger-decimaux','manipulation','essential','numbers.order-cards'],
  4:['encadrer-decimal','manipulation','essential','numbers.number-line'],
  6:['addition-unite','numeric','optional','arithmetic.fraction-decimal-grid'],
  7:['soustraction-decimale','numeric','none',null],
  8:['complement-unite','numeric','optional','arithmetic.fraction-decimal-grid'],
  9:['multiplication-decimale','numeric','optional','algebra.area-model'],
  10:['division-decimale','numeric','optional','arithmetic.relation-bar'],
  11:['partage-decimal-contexte','numeric','optional','arithmetic.relation-bar'],
  12:['raisonnement-distributivite','manipulation','essential','algebra.area-model']
});

assertClassifiedModule('dnb_39',context.__decimalRelativeQuestionNumbers,'decimal_relative_numbers',{
  1:['comparer-decimaux-negatifs','qcm-one','none',null],
  2:['encadrer-decimal-negatif','manipulation','essential','numbers.number-line'],
  3:['addition-decimaux-relatifs','numeric','none',null]
});

assertClassifiedModule('dnb_06',context.__scientificQuestionNumbers,'scientific_notation',{
  1:['grand-vers-scientifique','numeric','optional','numbers.glisse-nombre'],
  2:['grand-vers-scientifique','numeric','optional','numbers.glisse-nombre'],
  3:['petit-vers-scientifique','numeric','optional','numbers.glisse-nombre'],
  4:['petit-vers-scientifique','numeric','optional','numbers.glisse-nombre'],
  5:['grand-vers-scientifique','numeric','optional','numbers.glisse-nombre'],
  6:['petit-vers-scientifique','numeric','optional','numbers.glisse-nombre'],
  7:['grand-vers-scientifique','numeric','optional','numbers.glisse-nombre'],
  8:['scientifique-vers-grand','numeric','optional','numbers.glisse-nombre'],
  9:['choisir-ecriture-scientifique','qcm-one','optional','numbers.glisse-nombre'],
  10:['reconnaitre-ecriture-scientifique','qcm-one','none',null],
  11:['scientifique-vers-petit','numeric','optional','numbers.glisse-nombre']
});

assertClassifiedModule('dnb_07',context.__squareQuestionNumbers,'integer_squares',{
  1:['calculer-carre','numeric','essential','numbers.square-area'],
  2:['calculer-carre','numeric','essential','numbers.square-area'],
  3:['retrouver-cote','numeric','essential','numbers.square-area'],
  4:['retrouver-cote','numeric','essential','numbers.square-area'],
  5:['ecrire-produit','numeric','essential','numbers.square-area'],
  6:['choisir-valeur-carre','qcm-one','essential','numbers.square-area'],
  7:['reconnaitre-carres-parfaits','qcm-multiple','optional','numbers.square-area'],
  8:['encadrer-carre','qcm-one','essential','numbers.square-area'],
  9:['calculer-expression-avec-carre','numeric','essential','numbers.square-area'],
  10:['choisir-valeur-carre','qcm-one','essential','numbers.square-area']
});

assertClassifiedModule('dnb_08',context.__divisibilityQuestionNumbers,'divisibility_rules',{
  1:['identifier-critere-simple','qcm-multiple','none',null],
  2:['identifier-critere-simple','qcm-multiple','none',null],
  3:['identifier-critere-simple','qcm-multiple','none',null],
  4:['identifier-plusieurs-criteres','qcm-multiple','none',null],
  5:['identifier-plusieurs-criteres','qcm-multiple','none',null],
  6:['identifier-plusieurs-criteres','qcm-multiple','none',null],
  7:['identifier-plusieurs-criteres','qcm-multiple','none',null],
  8:['choisir-divisibles-par-cinq','qcm-multiple','none',null],
  9:['justifier-par-somme-chiffres','qcm-one','none',null],
  10:['partage-sans-reste','qcm-one','optional','arithmetic.equal-sharing-board']
});

assertClassifiedModule('dnb_28',context.__probabilityQuestionNumbers,'probability',expectedQuestions(
  [[1,2,3,5,9],'calculer-equiprobabilite','numeric','none',null],
  [[4],'reconnaitre-probabilite-de-pair','qcm-multiple','none',null],
  [[6],'reconnaitre-probabilite-mot','qcm-one','none',null],
  [[7],'composer-deux-epreuves','numeric','none',null],
  [[8],'reconnaitre-evenement-impossible','qcm-one','none',null],
  [[10],'calculer-evenement-contraire','numeric','none',null]
));

assertClassifiedModule('dnb_29',context.__frequencyQuestionNumbers,'frequency',expectedQuestions(
  [[1,2,5,6],'calculer-frequence-fraction','numeric','none',null],
  [[3],'calculer-frequence-decimale','numeric','none',null],
  [[4],'reconnaitre-formule-frequence','qcm-one','none',null],
  [[7],'retrouver-effectif','numeric','none',null],
  [[8],'reconnaitre-frequence-fraction','qcm-one','none',null],
  [[9],'convertir-en-pourcentage','numeric','none',null],
  [[10],'choisir-population-reference','qcm-one','none',null]
));

assertClassifiedModule('dnb_30',context.__meanQuestionNumbers,'mean',expectedQuestions(
  [[1,2,10],'calculer-moyenne-simple','numeric','optional',null],
  [[3,9],'calculer-moyenne-ponderee','numeric','optional',null],
  [[4],'reconnaitre-formule-moyenne','qcm-one','none',null],
  [[5],'retrouver-valeur-manquante','numeric','optional',null],
  [[6],'passer-somme-moyenne','numeric','optional',null],
  [[7],'passer-moyenne-somme','numeric','optional',null],
  [[8],'controler-bornes-moyenne','qcm-one','optional',null]
));

assertClassifiedModule('dnb_31',context.__medianQuestionNumbers,'median',expectedQuestions(
  [[1,2,9],'mediane-impaire-non-ordonnee','numeric','none',null],
  [[3],'mediane-paire-non-ordonnee','numeric','none',null],
  [[4,10],'mediane-paire-ordonnee','numeric','none',null],
  [[5],'reconnaitre-methode-mediane','qcm-one','none',null],
  [[6,7],'mediane-donnees-tableau','numeric','none',null],
  [[8],'refuter-position-ecrite','qcm-one','none',null],
  [[11,12],'calculer-etendue','numeric','none',null]
));

assertClassifiedModule('dnb_32',context.__readDataQuestionNumbers,'read_data',expectedQuestions(
  [[1,6,10],'calculer-depuis-tableau','numeric','essential',null],
  [[2],'comparer-tableau','qcm-one','essential',null],
  [[3],'lire-diagramme-batons','numeric','essential',null],
  [[7],'comparer-diagramme-batons','qcm-one','essential',null],
  [[4],'calculer-evolution','numeric','essential',null],
  [[8],'comparer-graphique-evolution','qcm-one','essential',null],
  [[5],'lire-diagramme-circulaire','qcm-one','essential',null],
  [[9],'lire-pictogramme','numeric','essential',null]
));

assertClassifiedModule('dnb_33',context.__recognizeProportionQuestionNumbers,'recognize_proportion',expectedQuestions(
  [[1,2,8],'reconnaitre-tableau','qcm-one','essential',null],
  [[3,4,9,10],'reconnaitre-contexte','qcm-one','none',null],
  [[5],'reconnaitre-formule','qcm-one','none',null],
  [[6,7],'reconnaitre-graphique','qcm-one','essential',null]
));

assertClassifiedModule('dnb_34',context.__solveProportionQuestionNumbers,'solve_proportion',expectedQuestions(
  [[1,2,7,9],'resoudre-par-facteur','numeric','optional',null],
  [[3,4,6,8],'resoudre-par-unite','numeric','optional',null],
  [[5,11],'completer-tableau','numeric','optional',null],
  [[10],'choisir-procedure','qcm-one','none',null]
));

assertClassifiedModule('dnb_35',context.__percentChangeQuestionNumbers,'percent_change',expectedQuestions(
  [[1,3],'calculer-valeur-apres-hausse','numeric','optional',null],
  [[2,4,9],'calculer-valeur-apres-baisse','numeric','optional',null],
  [[5,6],'calculer-coefficient','numeric','optional',null],
  [[7,8],'choisir-expression','qcm-one','optional',null],
  [[10],'calculer-montant-hausse','numeric','optional',null]
));

assertClassifiedModule('dnb_36',context.__readGraphQuestionNumbers,'read_graph',expectedQuestions(
  [[1,3,5,7],'lire-image','numeric','essential',null],
  [[2,4,6,8,9],'lire-antecedent','numeric','essential',null],
  [[10],'interpreter-point','qcm-one','essential',null]
));

assertClassifiedModule('dnb_37',context.__algorithmQuestionNumbers,'algorithm',expectedQuestions(
  [[1,2,3,4],'executer-programme-calcul','numeric','essential',null],
  [[5,7],'suivre-deplacement','qcm-one','essential',null],
  [[6],'determiner-orientation','qcm-one','essential',null],
  [[8],'reconnaitre-trace-boucle','qcm-one','essential',null],
  [[9],'deduire-propriete-construction','qcm-one','essential',null],
  [[10],'deduire-nature-triangle','qcm-one','essential',null]
));
const algorithmContract=registry?.getModule('dnb_37')?.generatorContract?.interactionContract;
if(!algorithmContract||algorithmContract.state.length!==5||algorithmContract.actions.length!==4){
  fail('Le contrat Algorithmique doit décrire l’état et les actions de la future manipulation.');
}
if(!algorithmContract?.reset||!algorithmContract?.correction){
  fail('Le contrat Algorithmique doit définir la réinitialisation et la correction pas à pas.');
}

assertClassifiedModule('dnb_16',context.__figureCodingQuestionNumbers,'figure_coding',expectedQuestions(
  [[1,2,3],'reconnaitre-triangle-code','qcm-one','essential',null],
  [[4,5,6,7],'reconnaitre-quadrilatere-code','qcm-one','essential',null],
  [[8],'reconnaitre-mediatrice','qcm-one','essential',null],
  [[9],'justifier-isocelite','qcm-one','essential',null],
  [[10],'propriete-mediatrice','qcm-one','essential',null]
));

assertClassifiedModule('dnb_17',context.__angleVocabularyQuestionNumbers,'angle_vocabulary',expectedQuestions(
  [[1,2],'reconnaitre-nature-figure','qcm-one','essential','geometry.angle-vocabulary'],
  [[3],'connaitre-angle-droit','numeric','none',null],
  [[4],'connaitre-angle-plat','numeric','none',null],
  [[5],'reconnaitre-opposes','qcm-one','essential','geometry.angle-vocabulary'],
  [[6],'reconnaitre-adjacents','qcm-one','essential','geometry.angle-vocabulary'],
  [[7,10],'calculer-supplement','numeric','none',null],
  [[8],'calculer-complement','numeric','none',null],
  [[9],'reconnaitre-nature-mesure','qcm-one','none',null]
));

assertClassifiedModule('dnb_20',context.__solidQuestionNumbers,'solid_recognition',expectedQuestions(
  [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,26,27],'reconnaitre-solide-dessine','qcm-one','essential',null],
  [[15,16,17,18,19,20,21,31,32,33,34,35],'modeliser-objet','qcm-one','essential',null],
  [[22,23,24,25,28,29,30],'compter-elements','qcm-one','essential',null]
));

assertClassifiedModule('dnb_21',context.__perimeterQuestionNumbers,'perimeter_formulas',expectedQuestions(
  [[1,5],'rectangle-parallelogramme','numeric','essential',null],
  [[2,4,10],'polygone-regulier','numeric','essential',null],
  [[3,9],'somme-cotes','numeric','essential',null],
  [[6],'contour-compose','numeric','essential',null],
  [[7],'disque-rayon','numeric','essential',null],
  [[8],'disque-diametre','numeric','essential',null],
  [[11],'disque-valeur-exacte','expression','essential',null],
  [[12],'choisir-formule-disque','qcm-one','essential',null]
));

assertClassifiedModule('dnb_22',context.__areaQuestionNumbers,'area',expectedQuestions(
  [[1,2],'aire-rectangle','numeric','optional',null],
  [[3,4],'aire-carre','numeric','optional','numbers.square-area'],
  [[5,6,17],'aire-triangle-general','numeric','optional',null],
  [[7,8],'aire-triangle-rectangle','numeric','optional',null],
  [[9,10,11],'aire-disque','numeric','essential',null],
  [[12,13,14,15],'aire-composee','numeric','essential',null],
  [[16],'choisir-longueurs-utiles','numeric','essential',null],
  [[18],'reconnaitre-formule','qcm-one','essential',null]
));

assertClassifiedModule('dnb_23',context.__volumeQuestionNumbers,'volume',expectedQuestions(
  [[1,5,10],'volume-cube','numeric','optional',null],
  [[2,6],'volume-pave','numeric','optional',null],
  [[3],'volume-prisme-triangulaire','numeric','essential',null],
  [[7,8],'volume-prisme-aire-base','numeric','optional',null],
  [[4],'volume-cylindre-rayon','numeric','essential',null],
  [[9],'volume-cylindre-diametre','numeric','essential',null]
));

assertClassifiedModule('dnb_26',context.__trigonometryReasoningQuestionNumbers,'trigonometry_reasoning',expectedQuestions(
  [[1],'condition-utilisation','qcm-one','none',null],
  [[2],'nommer-cote','qcm-one','essential',null],
  [[3,4],'definir-rapport','qcm-one','essential',null],
  [[5],'rapport-longueurs','qcm-one','essential',null],
  [[6],'choisir-formule','qcm-one','essential',null],
  [[7],'analyser-formules','qcm-variable','essential',null],
  [[8],'invariance-rapport','qcm-one','essential',null],
  [[9,10],'choisir-methode','qcm-one','essential',null],
  [[11],'controler-coherence','qcm-one','none',null],
  [[12],'premiere-etape','qcm-one','essential',null]
));

assertClassifiedModule('dnb_26b',context.__trigonometryCalculationQuestionNumbers,'trigonometry_calculation',expectedQuestions(
  [[1],'calculer-rapport-decimal','numeric','essential',null],
  [[2,3],'cote-avec-cosinus','numeric','essential',null],
  [[4,9],'cote-avec-sinus','numeric','essential',null],
  [[5,10],'cote-avec-tangente','numeric','essential',null],
  [[6,7,8],'calculer-angle','numeric','essential',null],
  [[11,12],'application-aire-perimetre','numeric','essential',null]
));

assertClassifiedModule('dnb_27',context.__transformationQuestionNumbers,'transformations',expectedQuestions(
  [[1,2,3],'coordonnees-symetrie-axes','numeric','essential',null],
  [[4,5],'coordonnees-symetrie-generale','numeric','essential',null],
  [[6],'coordonnees-translation','numeric','essential',null],
  [[7],'proprietes-conservees','qcm-multiple','none',null],
  [[8,9,10],'reconnaitre-transformation','qcm-one','essential',null],
  [[11,12,13],'placer-point-image','point-placement','essential',null]
));

const fractionDecimal=registry?.getModule('dnb_01');
if(!fractionDecimal) fail('Le classement pédagogique de dnb_01 est absent.');
if(fractionDecimal&&fractionDecimal.courseKind!=='fraction_decimal') fail('dnb_01 doit appeler le cours Fractions et décimaux.');
if(fractionDecimal&&fractionDecimal.questionTypes.length!==5) fail('Les cinq types de questions Fractions et décimaux doivent être explicitement classés.');
const fractionDecimalBankNumbers=[...(context.__fractionDecimalQuestionNumbers||[])].sort((a,b)=>a-b);
const fractionDecimalClassifiedNumbers=(fractionDecimal?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(fractionDecimalClassifiedNumbers)!==JSON.stringify(fractionDecimalBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Fractions et décimaux exactement une fois.');
const expectedFractionDecimal={
  1:'fraction-usuelle-vers-decimal',2:'fraction-usuelle-vers-decimal',3:'fraction-usuelle-vers-decimal',
  4:'fraction-superieure-un-vers-decimal',5:'fraction-superieure-un-vers-decimal',6:'fraction-superieure-un-vers-decimal',
  7:'fraction-usuelle-vers-decimal',8:'fraction-variable-vers-decimal',
  9:'decimal-usuel-vers-fraction',10:'decimal-usuel-vers-fraction',11:'decimal-usuel-vers-fraction',
  12:'decimal-superieur-un-vers-fraction',13:'decimal-superieur-un-vers-fraction',
  14:'decimal-usuel-vers-fraction',15:'decimal-usuel-vers-fraction',16:'fraction-variable-vers-decimal'
};
for(const [questionNumber,id] of Object.entries(expectedFractionDecimal)){
  const type=registry?.getQuestionType('dnb_01',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Fractions et décimaux ${questionNumber}.`);
  if(type&&type.response!=='numeric') fail(`La question Fractions et décimaux ${questionNumber} doit attendre une réponse numérique.`);
  if(type&&type.visual.policy!=='optional') fail(`Le mur de la question Fractions et décimaux ${questionNumber} doit rester facultatif.`);
  if(type&&type.visual.component!=='arithmetic.fraction-decimal-grid') fail(`Composant incorrect pour la question Fractions et décimaux ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Fractions et décimaux ${questionNumber}.`);
}

const placeValue=registry?.getModule('dnb_02b');
if(!placeValue) fail('Le classement pédagogique de dnb_02b est absent.');
if(placeValue&&placeValue.courseKind!=='place_value_shift') fail('dnb_02b doit appeler le cours du glisse-nombre.');
if(placeValue&&placeValue.questionTypes.length!==7) fail('Les sept types de questions du glisse-nombre doivent être explicitement classés.');
const placeValueBankNumbers=[...(context.__placeValueQuestionNumbers||[])].sort((a,b)=>a-b);
const placeValueClassifiedNumbers=(placeValue?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(placeValueClassifiedNumbers)!==JSON.stringify(placeValueBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit du glisse-nombre exactement une fois.');
const expectedPlaceValue={
  1:['multiplier-puissance-dix','numeric'],2:['multiplier-puissance-dix','numeric'],3:['multiplier-puissance-dix','numeric'],
  4:['diviser-puissance-dix','numeric'],5:['diviser-puissance-dix','numeric'],6:['diviser-puissance-dix','numeric'],
  7:['contexte-monnaie','numeric'],8:['analyser-erreur','qcm-one'],9:['choisir-resultat','qcm-one'],10:['choisir-resultat','qcm-one'],
  11:['retrouver-facteur','numeric'],12:['retrouver-nombre','numeric']
};
for(const [questionNumber,[id,response]] of Object.entries(expectedPlaceValue)){
  const type=registry?.getQuestionType('dnb_02b',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour le glisse-nombre ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour le glisse-nombre ${questionNumber}.`);
  if(type&&type.visual.policy!=='optional') fail(`Le glisse-nombre ${questionNumber} doit rester une aide facultative.`);
  if(type&&type.visual.component!=='numbers.glisse-nombre') fail(`Composant incorrect pour le glisse-nombre ${questionNumber}.`);
}

const fractionOperationsPedagogy=registry?.getModule('dnb_03');
if(!fractionOperationsPedagogy) fail('Le classement pédagogique de dnb_03 est absent.');
if(fractionOperationsPedagogy&&fractionOperationsPedagogy.courseKind!=='fraction_ops') fail('dnb_03 doit appeler le cours Opérations sur les fractions.');
if(fractionOperationsPedagogy&&fractionOperationsPedagogy.questionTypes.length!==7) fail('Les sept types de questions Opérations sur les fractions doivent être explicitement classés.');
const fractionOperationBankNumbers=[...(context.__fractionOperationQuestionNumbers||[])].sort((a,b)=>a-b);
const fractionOperationClassifiedNumbers=(fractionOperationsPedagogy?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(fractionOperationClassifiedNumbers)!==JSON.stringify(fractionOperationBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Opérations sur les fractions exactement une fois.');
const expectedFractionOperations={
  1:['simplifier-fraction-simple','numeric'],2:['simplifier-fraction','numeric'],
  3:['comparer-meme-denominateur','qcm-one'],4:['comparer-meme-numerateur','qcm-one'],
  5:['additionner-meme-denominateur','numeric'],6:['soustraire-meme-denominateur','numeric'],
  7:['additionner-denominateurs-multiples','numeric']
};
for(const [questionNumber,[id,response]] of Object.entries(expectedFractionOperations)){
  const type=registry?.getQuestionType('dnb_03',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Opérations sur les fractions ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Opérations sur les fractions ${questionNumber}.`);
  if(type&&type.visual.policy!=='optional') fail(`La construction de la question Opérations sur les fractions ${questionNumber} doit rester facultative.`);
  if(type&&type.visual.component!=='arithmetic.fraction-operations') fail(`Composant incorrect pour la question Opérations sur les fractions ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Opérations sur les fractions ${questionNumber}.`);
}

const fractionMultiplyDivide=registry?.getModule('dnb_03b');
if(!fractionMultiplyDivide) fail('Le classement pédagogique de dnb_03b est absent.');
if(fractionMultiplyDivide&&fractionMultiplyDivide.courseKind!=='fraction_mul_div') fail('dnb_03b doit appeler le cours Multiplier et diviser des fractions.');
if(fractionMultiplyDivide&&fractionMultiplyDivide.questionTypes.length!==5) fail('Les cinq types de questions Produit et quotient de fractions doivent être explicitement classés.');
const fractionMultiplyDivideBankNumbers=[...(context.__fractionMultiplyDivideQuestionNumbers||[])].sort((a,b)=>a-b);
const fractionMultiplyDivideClassifiedNumbers=(fractionMultiplyDivide?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(fractionMultiplyDivideClassifiedNumbers)!==JSON.stringify(fractionMultiplyDivideBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Produit et quotient de fractions exactement une fois.');
const expectedFractionMultiplyDivide={
  1:'multiplier-fractions',2:'multiplier-en-simplifiant',3:'diviser-fractions',4:'diviser-fractions',5:'diviser-avec-entier',6:'compter-fractions-unitaires'
};
for(const [questionNumber,id] of Object.entries(expectedFractionMultiplyDivide)){
  const type=registry?.getQuestionType('dnb_03b',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Produit et quotient de fractions ${questionNumber}.`);
  if(type&&type.response!=='numeric') fail(`La question Produit et quotient de fractions ${questionNumber} doit attendre une réponse numérique.`);
  if(type&&type.visual.policy!=='optional') fail(`La construction de la question Produit et quotient de fractions ${questionNumber} doit rester facultative.`);
  if(type&&type.visual.component!=='arithmetic.fraction-operations') fail(`Composant incorrect pour la question Produit et quotient de fractions ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Produit et quotient de fractions ${questionNumber}.`);
}

const fractionPercent=registry?.getModule('dnb_04');
if(!fractionPercent) fail('Le classement pédagogique de dnb_04 est absent.');
if(fractionPercent&&fractionPercent.courseKind!=='fraction_quantity_percent') fail('dnb_04 doit appeler le cours Fractions d’une quantité et pourcentages.');
if(fractionPercent&&fractionPercent.questionTypes.length!==6) fail('Les six types de questions Fractions et pourcentages doivent être explicitement classés.');
const fractionPercentBankNumbers=[...(context.__fractionPercentQuestionNumbers||[])].sort((a,b)=>a-b);
const fractionPercentClassifiedNumbers=(fractionPercent?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(fractionPercentClassifiedNumbers)!==JSON.stringify(fractionPercentBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Fractions et pourcentages exactement une fois.');
const expectedFractionPercent={
  1:'fraction-unitaire',2:'plusieurs-parts',3:'fraction-variee',
  4:'pourcentage-repere',5:'pourcentage-repere',6:'pourcentage-repere',7:'pourcentage-repere',8:'pourcentage-repere',
  9:'pourcentage-variable',10:'pourcentage-contexte',11:'pourcentage-repere'
};
for(const [questionNumber,id] of Object.entries(expectedFractionPercent)){
  const type=registry?.getQuestionType('dnb_04',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Fractions et pourcentages ${questionNumber}.`);
  if(type&&type.response!=='numeric') fail(`La question Fractions et pourcentages ${questionNumber} doit attendre une réponse numérique.`);
  if(type&&type.visual.policy!=='optional') fail(`La barre de la question Fractions et pourcentages ${questionNumber} doit rester facultative.`);
  if(type&&type.visual.component!=='arithmetic.fraction-percent-bar') fail(`Composant incorrect pour la question Fractions et pourcentages ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Fractions et pourcentages ${questionNumber}.`);
}

const equivalentForms=registry?.getModule('dnb_05');
if(!equivalentForms) fail('Le classement pédagogique de dnb_05 est absent.');
if(equivalentForms&&equivalentForms.courseKind!=='equivalent_forms') fail('dnb_05 doit appeler le cours Écritures équivalentes.');
if(equivalentForms&&equivalentForms.questionTypes.length!==9) fail('Les neuf types de questions Écritures équivalentes doivent être explicitement classés.');
const equivalentFormsBankNumbers=[...(context.__equivalentFormsQuestionNumbers||[])].sort((a,b)=>a-b);
const equivalentFormsClassifiedNumbers=(equivalentForms?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(equivalentFormsClassifiedNumbers)!==JSON.stringify(equivalentFormsBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Écritures équivalentes exactement une fois.');
const expectedEquivalentForms={
  1:['decimal-vers-fraction','numeric'],2:['decimal-vers-fraction','numeric'],3:['decimal-vers-pourcentage','numeric'],
  4:['pourcentage-vers-decimal','numeric'],5:['fraction-vers-decimal','numeric'],6:['fraction-vers-pourcentage','numeric'],
  7:['pourcentage-vers-fraction-cent','numeric'],8:['fraction-equivalente-cent','numeric'],9:['simplifier-fraction-decimale','numeric'],
  10:['reconnaitre-ecritures-equivalentes','qcm-multiple']
};
for(const [questionNumber,[id,response]] of Object.entries(expectedEquivalentForms)){
  const type=registry?.getQuestionType('dnb_05',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Écritures équivalentes ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Écritures équivalentes ${questionNumber}.`);
  if(type&&type.visual.policy!=='optional') fail(`Le mur de la question Écritures équivalentes ${questionNumber} doit rester facultatif.`);
  if(type&&type.visual.component!=='arithmetic.fraction-wall') fail(`Composant incorrect pour la question Écritures équivalentes ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Écritures équivalentes ${questionNumber}.`);
}

const reduction=registry?.getModule('dnb_10');
if(!reduction) fail('Le classement pédagogique de dnb_10 est absent.');
if(reduction&&reduction.courseKind!=='reduce_expression') fail('dnb_10 doit appeler le cours Réduire une expression.');
if(reduction&&reduction.questionTypes.length!==6) fail('Les six types de questions Réduction doivent être explicitement classés.');
const reductionBankNumbers=[...(context.__reductionQuestionNumbers||[])].sort((a,b)=>a-b);
const reductionClassifiedNumbers=(reduction?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(reductionClassifiedNumbers)!==JSON.stringify(reductionBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Réduction exactement une fois.');
const expectedReduction={
  1:['reduire-une-famille','optional'],2:['reduire-une-famille-avec-annulation','optional'],
  3:['reduire-plusieurs-familles','optional'],4:['reduire-plusieurs-familles-avec-annulation','optional'],
  5:['lire-tuiles','essential'],6:['reconnaitre-deja-reduite','optional']
};
for(const [questionNumber,[id,policy]] of Object.entries(expectedReduction)){
  const type=registry?.getQuestionType('dnb_10',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Réduction ${questionNumber}.`);
  if(type&&type.response!=='expression') fail(`La question Réduction ${questionNumber} doit attendre une expression.`);
  if(type&&type.visual.policy!==policy) fail(`Rôle visuel incorrect pour la question Réduction ${questionNumber}.`);
  if(type&&type.visual.component!=='algebra.algebra-tiles') fail(`Composant incorrect pour la question Réduction ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Réduction ${questionNumber}.`);
}

const substitution=registry?.getModule('dnb_11');
if(!substitution) fail('Le classement pédagogique de dnb_11 est absent.');
if(substitution&&substitution.courseKind!=='substitution') fail('dnb_11 doit appeler le cours Substitution.');
if(substitution&&substitution.questionTypes.length!==7) fail('Les sept types de questions Substitution doivent être explicitement classés.');
const substitutionBankNumbers=[...(context.__substitutionQuestionNumbers||[])].sort((a,b)=>a-b);
const substitutionClassifiedNumbers=(substitution?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(substitutionClassifiedNumbers)!==JSON.stringify(substitutionBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Substitution exactement une fois.');
const expectedSubstitution={
  1:['substituer-expression-affine','numeric'],2:['substituer-polynome','numeric'],3:['substituer-polynome','numeric'],
  4:['substituer-expression-affine','numeric'],5:['substituer-polynome','numeric'],6:['substituer-deux-variables','numeric'],
  7:['calculer-puissance','numeric'],8:['substituer-expression-parenthesee','numeric'],
  9:['distinguer-coefficient-exposant','qcm-one'],10:['calculer-aire-carre','numeric'],11:['substituer-expression-parenthesee','numeric']
};
for(const [questionNumber,[id,response]] of Object.entries(expectedSubstitution)){
  const type=registry?.getQuestionType('dnb_11',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Substitution ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Substitution ${questionNumber}.`);
  if(type&&type.visual.policy!=='none') fail(`La question Substitution ${questionNumber} ne doit pas déclarer une figure artificielle.`);
  if(type&&type.visual.component!==null) fail(`La question Substitution ${questionNumber} ne doit pas appeler un composant visuel.`);
}

const expandFactor=registry?.getModule('dnb_12');
if(!expandFactor) fail('Le classement pédagogique de dnb_12 est absent.');
if(expandFactor&&expandFactor.courseKind!=='expand_factor') fail('dnb_12 doit appeler le cours Développer et factoriser.');
if(expandFactor&&expandFactor.questionTypes.length!==7) fail('Les sept types de questions Développement et factorisation doivent être explicitement classés.');
const expandFactorBankNumbers=[...(context.__expandFactorQuestionNumbers||[])].sort((a,b)=>a-b);
const expandFactorClassifiedNumbers=(expandFactor?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(expandFactorClassifiedNumbers)!==JSON.stringify(expandFactorBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Développement et factorisation exactement une fois.');
const expectedExpandFactor={
  1:['developper-forme-simple','expression'],2:['developper-forme-simple','expression'],3:['developper-forme-simple','expression'],
  4:['developper-coefficient-variable','expression'],5:['choisir-developpement','qcm-one'],
  6:['factoriser-entier','expression'],7:['factoriser-entier','expression'],8:['factoriser-par-x','expression'],
  9:['choisir-factorisation','qcm-one'],10:['developper-aire-rectangle','expression']
};
for(const [questionNumber,[id,response]] of Object.entries(expectedExpandFactor)){
  const type=registry?.getQuestionType('dnb_12',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Développement et factorisation ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Développement et factorisation ${questionNumber}.`);
  if(type&&type.visual.policy!=='optional') fail(`Le modèle d’aire de la question Développement et factorisation ${questionNumber} doit rester facultatif.`);
  if(type&&type.visual.component!=='algebra.area-model') fail(`Composant incorrect pour la question Développement et factorisation ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Développement et factorisation ${questionNumber}.`);
}

const equations=registry?.getModule('dnb_13');
if(!equations) fail('Le classement pédagogique de dnb_13 est absent.');
if(equations&&equations.courseKind!=='equations') fail('dnb_13 doit appeler le cours Équations.');
if(equations&&equations.questionTypes.length!==9) fail('Les neuf types de questions Équations doivent être explicitement classés.');
const equationBankNumbers=[...(context.__equationQuestionNumbers||[])].sort((a,b)=>a-b);
const equationClassifiedNumbers=(equations?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(equationClassifiedNumbers)!==JSON.stringify(equationBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit Équations exactement une fois.');
const expectedEquations={
  1:['resoudre-multiplication-positive','numeric'],2:['resoudre-addition-soustraction','numeric'],3:['resoudre-addition-soustraction','numeric'],
  4:['resoudre-affine-positive','numeric'],5:['resoudre-signee','numeric'],6:['resoudre-signee','numeric'],
  7:['resoudre-deux-membres','numeric'],8:['resoudre-deux-membres','numeric'],9:['choisir-solution','qcm-one'],
  10:['choisir-operation','qcm-one'],11:['probleme-taxi','numeric'],12:['programme-calcul','numeric']
};
for(const [questionNumber,[id,response]] of Object.entries(expectedEquations)){
  const type=registry?.getQuestionType('dnb_13',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la question Équations ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la question Équations ${questionNumber}.`);
  if(type&&type.visual.policy!=='optional') fail(`Les Splats de la question Équations ${questionNumber} doivent rester facultatifs.`);
  if(type&&type.visual.component!=='algebra.equation-splat') fail(`Composant incorrect pour la question Équations ${questionNumber}.`);
  if(type&&!context.MATHSGO_VISUALS.get(type.visual.component)) fail(`Composant visuel absent pour la question Équations ${questionNumber}.`);
}

const numberLines=registry?.getModule('dnb_14');
if(!numberLines) fail('Le classement pédagogique de dnb_14 est absent.');
if(numberLines&&numberLines.courseKind!=='number_line') fail('dnb_14 doit appeler le cours Droite graduée.');
if(numberLines&&numberLines.questionTypes.length!==11) fail('Les onze types de questions de droites graduées doivent être explicitement classés.');
const numberLineBankNumbers=[...(context.__numberLineQuestionNumbers||[]),19,20,21].sort((a,b)=>a-b);
const numberLineClassifiedNumbers=(numberLines?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(numberLineClassifiedNumbers)!==JSON.stringify(numberLineBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit de droite graduée exactement une fois.');
const expectedNumberLines={
  1:['lire-unite','numeric'],2:['lire-unite','numeric'],3:['lire-unite','numeric'],
  4:['lire-entier-relatif','numeric'],5:['lire-pas-decimal','numeric'],6:['lire-pas-decimal','numeric'],7:['lire-entier-relatif','numeric'],
  8:['lire-deux-points','numeric'],9:['lire-entier-relatif','numeric'],10:['choisir-abscisse-entiere','qcm-one'],
  11:['choisir-abscisse-decimale','qcm-one'],12:['choisir-abscisse-decimale','qcm-one'],
  13:['deduire-pas-variable','numeric'],14:['deduire-pas-variable','numeric'],15:['deduire-pas-variable','numeric'],16:['lire-pas-decimal','numeric'],
  17:['deduire-pas-variable','numeric'],18:['choisir-pas-variable','qcm-one'],
  19:['placer-point-tactile','manipulation'],20:['determiner-pas-explicite','qcm-one'],21:['choisir-droite-correcte','qcm-one']
};
for(const [questionNumber,[id,response]] of Object.entries(expectedNumberLines)){
  const type=registry?.getQuestionType('dnb_14',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la droite graduée ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour la droite graduée ${questionNumber}.`);
  if(type&&type.visual.policy!=='essential') fail(`La droite graduée ${questionNumber} doit appartenir à l’énoncé.`);
  if(type&&type.visual.component!=='numbers.number-line') fail(`Composant incorrect pour la droite graduée ${questionNumber}.`);
}

const coordinates=registry?.getModule('dnb_15');
if(!coordinates) fail('Le classement pédagogique de dnb_15 est absent.');
if(coordinates&&coordinates.courseKind!=='coordinates') fail('dnb_15 doit appeler le cours Coordonnées.');
if(coordinates&&coordinates.questionTypes.length!==7) fail('Les sept types de questions de coordonnées doivent être explicitement classés.');
const coordinateBankNumbers=[...(context.__coordinateQuestionNumbers||[])].sort((a,b)=>a-b);
const coordinateClassifiedNumbers=(coordinates?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(coordinateClassifiedNumbers)!==JSON.stringify(coordinateBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit de coordonnées exactement une fois.');
const expectedCoordinates={
  1:['lire-coordonnees-entieres','numeric'],2:['lire-coordonnees-entieres','numeric'],3:['lire-point-sur-axe','numeric'],
  4:['lire-coordonnees-entieres','numeric'],5:['lire-deux-points','numeric'],6:['lire-demi-unites','numeric'],
  7:['lire-abscisse','numeric'],8:['lire-ordonnee','numeric'],9:['choisir-couple','qcm-one']
};
for(const [questionNumber,[id,response]] of Object.entries(expectedCoordinates)){
  const type=registry?.getQuestionType('dnb_15',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour le repère ${questionNumber}.`);
  if(type&&type.response!==response) fail(`Mode de réponse incorrect pour le repère ${questionNumber}.`);
  if(type&&type.visual.policy!=='essential') fail(`Le repère ${questionNumber} doit appartenir à l’énoncé.`);
  if(type&&type.visual.component!=='geometry.coordinate-plane') fail(`Composant incorrect pour le repère ${questionNumber}.`);
}

const conversions=registry?.getModule('dnb_19');
if(!conversions) fail('Le classement pédagogique de dnb_19 est absent.');
if(conversions&&conversions.courseKind!=='conversions') fail('dnb_19 doit appeler le cours Conversions.');
if(conversions&&conversions.questionTypes.length!==6) fail('Les six types de questions de conversion doivent être explicitement classés.');
const conversionBankNumbers=[...(context.__conversionQuestionNumbers||[])].sort((a,b)=>a-b);
const conversionClassifiedNumbers=(conversions?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(conversionClassifiedNumbers)!==JSON.stringify(conversionBankNumbers)) fail('Le catalogue pédagogique doit couvrir chaque gabarit de conversion exactement une fois.');
const expectedConversions={
  1:['convertir-longueur','measures.conversion-table'],2:['convertir-longueur','measures.conversion-table'],
  3:['convertir-aire','measures.conversion-table'],4:['convertir-aire','measures.conversion-table'],
  5:['relier-volume-capacite','measures.conversion-table'],6:['convertir-masse','measures.conversion-table'],
  7:['convertir-capacite','measures.conversion-table'],8:['convertir-duree',null],
  9:['relier-volume-capacite','measures.conversion-table'],10:['convertir-longueur','measures.conversion-table']
};
for(const [questionNumber,[id,component]] of Object.entries(expectedConversions)){
  const type=registry?.getQuestionType('dnb_19',Number(questionNumber));
  if(!type||type.id!==id) fail(`Type incorrect pour la conversion ${questionNumber}.`);
  if(type&&type.response!=='numeric') fail(`La conversion ${questionNumber} doit attendre une réponse numérique.`);
  if(type&&type.visual.policy!=='optional') fail(`La représentation de conversion ${questionNumber} doit rester facultative.`);
  if(type&&type.visual.component!==component) fail(`Composant incorrect pour la conversion ${questionNumber}.`);
}

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
if(angles&&angles.questionTypes.length!==10) fail('Les dix types de questions Angles doivent être explicitement classés.');
const angleBankNumbers=[...(context.__angleQuestionNumbers||[])].sort((a,b)=>a-b);
const angleClassifiedNumbers=(angles?.questionTypes||[]).flatMap(type=>[...type.questions]).sort((a,b)=>a-b);
if(JSON.stringify(angleClassifiedNumbers)!==JSON.stringify([...angleBankNumbers,11])) fail('Le catalogue pédagogique doit couvrir les dix gabarits historiques et le format tactile des Angles exactement une fois.');
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
  10:['detecter-impossibilite','qcm-one','optional',['coherence','bar-model']],
  11:['placer-puis-calculer','angle-sum-builder','essential',['sum-180','bar-model']]
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
const questionEngine=fs.readFileSync(new URL('auto/scripts/02-question-engine.js',root),'utf8');
const functionBlock=(source,name,nextName)=>source.slice(source.indexOf(`function ${name}(`),source.indexOf(`function ${nextName}(`));
const thalesTemplateBlock=slideshow.slice(slideshow.indexOf('function courseThalesTemplateVisual('),slideshow.indexOf('const courseCatalog='));
const registryPosition=index.indexOf('scripts/shared/pedagogy/00-registry.js');
const fractionDecimalMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_01.js');
const placeValueMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_02b.js');
const fractionOperationsMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_03.js');
const fractionMultiplyDivideMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_03b.js');
const fractionPercentMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_04.js');
const equivalentFormsMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_05.js');
const relationMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_09.js');
const reductionMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_10.js');
const substitutionMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_11.js');
const expandFactorMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_12.js');
const equationMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_13.js');
const numberLineMetadataPosition=index.indexOf('scripts/shared/pedagogy/numbers/dnb_14.js');
const coordinateMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_15.js');
const figureCodingMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_16.js');
const angleVocabularyMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_17.js');
const angleMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_18.js');
const conversionMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_19.js');
const solidMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_20.js');
const perimeterMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_21.js');
const areaMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_22.js');
const volumeMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_23.js');
const pythagorasMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_24.js');
const thalesMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_25.js');
const trigonometryReasoningMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_26.js');
const trigonometryCalculationMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_26b.js');
const transformationMetadataPosition=index.indexOf('scripts/shared/pedagogy/geometry/dnb_27.js');
const probabilityMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_28.js');
const frequencyMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_29.js');
const meanMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_30.js');
const medianMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_31.js');
const readDataMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_32.js');
const recognizeProportionMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_33.js');
const solveProportionMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_34.js');
const percentChangeMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_35.js');
const readGraphMetadataPosition=index.indexOf('scripts/shared/pedagogy/data/dnb_36.js');
const algorithmMetadataPosition=index.indexOf('scripts/shared/pedagogy/algorithm/dnb_37.js');
const slideshowPosition=index.indexOf('scripts/03-slideshow.js');
const appPosition=index.indexOf('scripts/04-app.js');
const pedagogyPositions=[fractionDecimalMetadataPosition,placeValueMetadataPosition,fractionOperationsMetadataPosition,fractionMultiplyDivideMetadataPosition,fractionPercentMetadataPosition,equivalentFormsMetadataPosition,relationMetadataPosition,reductionMetadataPosition,substitutionMetadataPosition,expandFactorMetadataPosition,equationMetadataPosition,numberLineMetadataPosition,coordinateMetadataPosition,figureCodingMetadataPosition,angleVocabularyMetadataPosition,angleMetadataPosition,conversionMetadataPosition,solidMetadataPosition,perimeterMetadataPosition,areaMetadataPosition,volumeMetadataPosition,pythagorasMetadataPosition,thalesMetadataPosition,trigonometryReasoningMetadataPosition,trigonometryCalculationMetadataPosition,transformationMetadataPosition,probabilityMetadataPosition,frequencyMetadataPosition,meanMetadataPosition,medianMetadataPosition,readDataMetadataPosition,recognizeProportionMetadataPosition,solveProportionMetadataPosition,percentChangeMetadataPosition,readGraphMetadataPosition,algorithmMetadataPosition];
if(registryPosition<0||pedagogyPositions.some(position=>position<registryPosition||slideshowPosition<position||appPosition<position)){
  fail('Le registre pédagogique doit être chargé avant le diaporama et l’application.');
}
if(!catalogue.includes('id="pedagogyCatalogue"')||!catalogue.includes('MATHSGO_PEDAGOGY.list()')) fail('Le catalogue pédagogique doit être visible dans la bibliothèque.');
for(const path of sources.filter(path=>path.startsWith('auto/scripts/shared/pedagogy/')&&!path.endsWith('/00-registry.js'))){
  const catalogueSource='../'+path.slice('auto/'.length);
  if(!catalogue.includes(catalogueSource)) fail(`Le catalogue ne charge pas ${catalogueSource}.`);
}
for(const script of [...catalogue.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(match=>match[1]).filter(Boolean)){
  try{new vm.Script(script);}catch(error){fail('Un script intégré du catalogue est invalide : '+error.message);}
}
if(!app.includes('MATHSGO_PEDAGOGY.getQuestionType(m.id,q.n)')) fail('La politique visuelle doit consulter le registre pédagogique.');
if(!slideshow.includes('MATHSGO_PEDAGOGY.getModule(moduleId)')||!slideshow.includes('sections.includes(rule[3])')) fail('Les aides doivent être choisies à partir du registre pédagogique.');
if(!slideshow.includes("coursePythagorasLibraryVisual('bar')")||!slideshow.includes("slide.courseKind==='pythagoras'")) fail('Le cours Pythagore doit utiliser la bibliothèque et filtrer ses rubriques.');
if(!slideshow.includes("'read-data-mode':['dnb_32']")||!slideshow.includes('.diapo.read-data-mode .stage>.slide{width:100%;max-width:1180px;margin-top:auto;margin-bottom:auto}')) fail('Le module de lecture de données doit disposer de son centrage local.');
if(!slideshow.includes('courseReadDataTableVisual()')||!slideshow.includes('courseReadDataChartVisual()')||!slideshow.includes('courseReadDataPictogramVisual()')) fail('Le cours de lecture de données doit proposer ses trois exemples explicites.');
if(!slideshow.includes('variation = valeur finale − valeur initiale')) fail('Le cours de lecture de données doit expliciter le sens de la variation.');
if(!slideshow.includes('<strong>Équation :</strong> trouver la valeur de l’inconnue qui rend l’égalité vraie.')||
   !slideshow.includes('<strong>Splat :</strong> trouver la valeur qui se cache sous chaque tache.')||
   !slideshow.includes('même opération dans les deux membres pour conserver l’équilibre')) {
  fail('Le cours Équations doit distinguer équation et Splat, puis expliciter la conservation de l’équilibre.');
}
if(slideshow.includes('On défait les opérations')||!slideshow.includes('equationCourseExamplePayload')||!slideshow.includes("equationBuildResolution(3,5,0,17,4)")) {
  fail('Le cours Équations doit réutiliser la rédaction détaillée de la correction et les opérations inverses.');
}
if(!slideshow.includes('equationCourseSplatPayload')||
   !slideshow.includes("a:3,b:5,c:0,d:17,solution:4")||
   !slideshow.includes('course-equation-splat')) {
  fail('Le cours Équations doit montrer le mini-plateau Splat correspondant à son exemple.');
}
if(!questionEngine.includes('equation-mobile-resolve-button-row')||
   !slideshow.includes('.equation-resolve-button-row:not(.equation-mobile-resolve-button-row){display:none}')||
   !slideshow.includes('equation-qcm-solution-layout')||
   !slideshow.includes('equation-qcm-operation-layout')||
   !slideshow.includes("inst.equationData.qcm.kind==='operation'")||
   !slideshow.includes('min-height:54px')||
   !slideshow.includes('transform:scale(1.18)')) {
  fail('Le bouton et le plateau Équations doivent utiliser leur présentation agrandie réservée au téléphone.');
}
const readDataRendererSource=fs.readFileSync(new URL('auto/scripts/modules/data/dnb_32/render.js',root),'utf8');
let readDataRenderer=null;
const readDataRendererContext=vm.createContext({
  globalThis:null,
  MATHSGO_MODULE_RUNTIME:{register(moduleId,extension){if(moduleId==='dnb_32') readDataRenderer=extension.renderer;}}
});
readDataRendererContext.globalThis=readDataRendererContext;
vm.runInContext(readDataRendererSource,readDataRendererContext,{timeout:5000});
const expectedReadDataFamilies=['table-total','table-compare','bar-read','line-difference','pie-part','table-column-total','bar-compare','line-compare','pictogram','table-difference'];
const actualReadDataFamilies=expectedReadDataFamilies.map((_,index)=>readDataRenderer?.aidSpecForQuestion(index+1)?.family);
if(JSON.stringify(actualReadDataFamilies)!==JSON.stringify(expectedReadDataFamilies)) fail('Chaque variante de lecture de données doit disposer d’une aide visuelle adaptée.');
const expectedReadDataTouch={1:['row',1],2:['row',1],6:['column',2],9:['row',1],10:['column',1,2]};
for(const [questionNumber,expected] of Object.entries(expectedReadDataTouch)){
  const touch=readDataRenderer?.aidSpecForQuestion(questionNumber)?.touch;
  const actual=touch?[touch.axis,...touch.required]:[];
  if(JSON.stringify(actual)!==JSON.stringify(expected)) fail(`Le repérage tactile de la question ${questionNumber} ne cible pas les bonnes données.`);
}
if(!readDataRendererSource.includes("renderGenericQuestion(instance,correction,'with')")||!readDataRendererSource.includes("mode==='without-essential'")) fail('Le support de données essentiel doit rester visible quand l’aide est masquée.');
if(!readDataRendererSource.includes('completeTemperatureScale(question,number)')||!readDataRendererSource.includes('[30,35,40].forEach')) fail('L’échelle des températures doit rester complète jusqu’à la valeur maximale générée.');
if(!readDataRendererSource.includes('data-read-data-choice')||!readDataRendererSource.includes('read-data-star-value')) fail('Les tableaux guidés doivent fournir des cibles tactiles et le pictogramme doit révéler la valeur sous chaque étoile.');
if(!slideshow.includes('function setupReadDataTools')||!slideshow.includes("Ce choix n’est pas utile ici. Essaie encore.")||!slideshow.includes('read-data-observation-pending')) fail('Le diaporama doit gérer le repérage tactile, le nouvel essai neutre et la réponse après observation.');
if(!slideshow.includes("const readDataAid=mode==='without'&&inst.module.id==='dnb_32'")||!slideshow.includes("const hiddenMode=readDataAid?'without-essential'")) fail('Le mode sans aide doit permettre de révéler le chemin de lecture sans masquer le support.');
if(!slideshow.includes("slide.courseKind==='angle_vocabulary'")||!slideshow.includes("MATHSGO_VISUALS.get('geometry.angle-vocabulary')")) fail('Le cours Angles doit être contextuel et appeler le composant partagé.');

context.courseCatalog={thales:{title:'Thalès',rules:[
  ['Conditions','',false,'conditions'],['Rapports','',false,'ratios'],['Calcul','',false,'calculation'],
  ['Parallélisme','',false,'parallelism-test'],['Cohérence','',false,'coherence']
]},relative_addition:{title:'Additionner des nombres entiers relatifs',rules:[
  ['Les jetons','',false,'tokens'],['Rassembler','',false,'tokens'],['Paire nulle','',false,'zero-pair'],['Méthode','',false,'method']
]}};
vm.runInContext(
  thalesTemplateBlock+
  functionBlock(slideshow,'courseAngleVisual','angleVocabularyCourse')+
  functionBlock(slideshow,'angleVocabularyCourse','courseForSlide')+
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
if(context.courseKindForModule('dnb_02b','without')!=='place_value_shift') fail('Le cours du glisse-nombre doit rester accessible sans aide.');
const rightAngleContext=context.courseContextForInstance({module:{id:'dnb_17'},q:{n:3},scope:{}});
const rightAngleCourse=context.courseForSlide({courseKind:'angle_vocabulary',courseContext:rightAngleContext});
if(rightAngleCourse.title!=="L’angle droit"||!rightAngleCourse.rules[0][1].includes('90°')||rightAngleCourse.rules.length!==1) fail('La question sur l’angle droit doit ouvrir uniquement son cours visuel à 90°.');
const supplementaryContext=context.courseContextForInstance({module:{id:'dnb_17'},q:{n:7},scope:{a:73}});
const supplementaryCourse=context.courseForSlide({courseKind:'angle_vocabulary',courseContext:supplementaryContext});
if(supplementaryCourse.title!=='Angles supplémentaires'||!supplementaryCourse.rules[0][1].includes('73°')||!supplementaryCourse.rules[0][1].includes('107°')) fail('La question sur les angles supplémentaires doit ouvrir le schéma calculé de sa question.');
const compareContext=context.courseContextForInstance({module:{id:'dnb_17'},q:{n:13},angleData:{kind:'compare-opening',courseSections:['compare-opening']}});
const compareCourse=context.courseForSlide({courseKind:'angle_vocabulary',courseContext:compareContext});
if(compareCourse.title!=='Comparer deux angles'||!compareCourse.rules[0][1].includes('pas la longueur des côtés')) fail('La comparaison doit ouvrir uniquement le cours sur l’ouverture des angles.');
const namedContext=context.courseContextForInstance({module:{id:'dnb_17'},q:{n:12},angleData:{kind:'name-angle',letters:['C','E','D'],courseSections:['angle-name']}});
const namedCourse=context.courseForSlide({courseKind:'angle_vocabulary',courseContext:namedContext});
if(namedCourse.title!=='Nommer un angle'||!namedCourse.rules[0][1].includes('CED')||!namedCourse.rules[0][1].includes('sommet E')) fail('Le cours sur le nom doit reprendre les lettres et le sommet de la question.');
const protractorContext=context.courseContextForInstance({module:{id:'dnb_17'},q:{n:20},angleData:{kind:'protractor-reading',degrees:40,courseSections:['protractor-reading']}});
const protractorCourse=context.courseForSlide({courseKind:'angle_vocabulary',courseContext:protractorContext});
if(protractorCourse.title!=='Mesurer avec un rapporteur'||!protractorCourse.rules[0][1].includes('On part du 0° à droite : 40°.')) fail('La lecture du rapporteur doit ouvrir son cours visuel avec la bonne échelle.');
const correspondingContext=context.courseContextForInstance({module:{id:'dnb_17'},q:{n:17},angleData:{kind:'parallel-relations',relation:'corresponding',courseSections:['parallel-relations']}});
const correspondingCourse=context.courseForSlide({courseKind:'angle_vocabulary',courseContext:correspondingContext});
if(!correspondingCourse.rules[0][0].includes('correspondants')||!correspondingCourse.rules[0][1].includes('Correspondants : même position')) fail('La variante correspondante doit ouvrir un cours différent de la variante alterne-interne.');

const angleSelectionSource=fs.readFileSync(new URL('auto/scripts/modules/geometry/dnb_17/selection.js',root),'utf8');
let angleSelection=null;
const angleSelectionContext={MATHSGO_MODULE_RUNTIME:{register(moduleId,extension){if(moduleId==='dnb_17') angleSelection=extension.selection;}}};
angleSelectionContext.globalThis=angleSelectionContext;
vm.createContext(angleSelectionContext);
vm.runInContext(angleSelectionSource,angleSelectionContext,{timeout:5000});
const legacyAngleQuestions=Array.from({length:10},(_,index)=>({n:index+1,options:{}}));
function selectAngleQuestions(count){
  const orderQueues=new Map();
  return angleSelection.selectQuestions({
    module:{id:'dnb_17'},questions:legacyAngleQuestions,count,
    shuffle:values=>[...values],
    draw:(_key,pool,poolCount,cycleBuilder)=>[...(cycleBuilder?cycleBuilder():pool)].slice(0,poolCount),
    drawOrder:(key,keys)=>{
      let queue=orderQueues.get(key);
      if(!queue||!queue.length){queue=[...keys];orderQueues.set(key,queue);}
      return queue.shift();
    }
  });
}
const expectedFreshCounts=new Map([[5,1],[10,4],[15,7],[20,10]]);
for(const [count,freshCount] of expectedFreshCounts){
  const selected=selectAngleQuestions(count);
  const actualFresh=selected.filter(question=>Number(question.n)>10).length;
  if(selected.length!==count||actualFresh!==freshCount) fail(`La série Angles de ${count} questions doit contenir ${freshCount} format(s) fonctionnel(s).`);
}
const fullAngleSeries=selectAngleQuestions(20);
if(new Set(fullAngleSeries.map(question=>Number(question.n))).size!==20) fail('La série maximale Angles doit contenir vingt formats distincts sans répétition.');
const fullAngleFamilies=fullAngleSeries.map(angleSelection.familyForQuestion);
if(new Set(fullAngleFamilies).size!==9) fail('Les vingt formats Angles doivent rester regroupés dans neuf familles pédagogiques.');
if(fullAngleFamilies.some((family,index)=>index>0&&family===fullAngleFamilies[index-1])) fail('Deux familles Angles identiques ne doivent pas se suivre lorsqu’une autre reste disponible.');
if(angleSelection.virtualTemplates.length!==10||!angleSelection.virtualTemplates.some(template=>template.options.angle_kind==='protractor-reading')) fail('Les dix formats fonctionnels Angles doivent inclure la lecture du rapporteur.');

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

if(!process.exitCode) console.log('OK — 43 modules classés : Nombres et calculs 18/18, Espace et géométrie 15/15, Données 9/9, Algorithmique 1/1.');
