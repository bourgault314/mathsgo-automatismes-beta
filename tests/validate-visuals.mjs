import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const visualSources = [
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/numbers/number-line.js',
  'auto/scripts/shared/visuals/numbers/order-cards.js',
  'auto/scripts/shared/visuals/numbers/place-value-table.js',
  'auto/scripts/shared/visuals/numbers/square-area.js',
  'auto/scripts/shared/visuals/numbers/relative-tokens.js',
  'auto/scripts/shared/visuals/data/cartesian-graph.js',
  'auto/scripts/shared/visuals/geometry/coordinate-plane.js',
  'auto/scripts/shared/visuals/geometry/angle-vocabulary.js',
  'auto/scripts/shared/visuals/arithmetic/relation-bar.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-percent-bar.js',
  'auto/scripts/shared/visuals/arithmetic/equal-sharing-board.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-wall.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-decimal-grid.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-operations.js',
  'auto/scripts/shared/visuals/measures/conversion-table.js',
  'auto/scripts/shared/visuals/algebra/equation-splat.js',
  'auto/scripts/shared/visuals/algebra/inquiry-bar.js',
  'auto/scripts/shared/visuals/algebra/algebra-tiles.js',
  'auto/scripts/shared/visuals/algebra/area-model.js',
  'auto/scripts/shared/visuals/algebra/relation-tiles.js',
  'auto/scripts/shared/visuals/geometry/thales-configuration.js',
  'auto/scripts/shared/visuals/geometry/triangle-angle-sum.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-mill.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-bar.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-reasoning.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-builder.js'
  ,'auto/scripts/shared/visuals/geometry/solid.js'
];
const code = visualSources
  .map(path => fs.readFileSync(new URL(path, root), 'utf8'))
  .join('\n');

const context = {};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(code, context, { timeout: 5000 });

const fail = message => {
  console.error(`ÉCHEC — ${message}`);
  process.exitCode = 1;
};
const hash = value => createHash('sha256').update(value).digest('hex');
const registry = context.MATHSGO_VISUALS;

if (!registry) fail('Le registre visuel global est absent.');
const components = registry ? registry.list() : [];
if (components.length !== 27) fail(`27 composants visuels attendus, ${components.length} trouvé(s).`);
for(const component of components){
  if(!Array.isArray(component.presets)||!component.presets.length) fail(`Le composant ${component.id} doit fournir au moins un préréglage au catalogue.`);
}

const cartesianGraph=registry?.get('data.cartesian-graph');
if(!cartesianGraph) fail('Le composant data.cartesian-graph est absent.');
if(cartesianGraph&&cartesianGraph.version!=='1.0.0') fail('Version 1.0.0 attendue pour le graphique cartésien.');
if(cartesianGraph&&cartesianGraph.presets.length!==6) fail('Six graphiques cartésiens de référence sont attendus.');
for(const preset of cartesianGraph?.presets||[]){
  const rendered=cartesianGraph.render(preset.data);
  if(!rendered.startsWith('<svg class="cartesian-graph-svg"')||!rendered.includes('role="img"')) fail(`Le graphique ${preset.id} doit produire un SVG accessible.`);
}
const cartesianBars=cartesianGraph?.render(cartesianGraph.presets.find(preset=>preset.id==='batons-ateliers').data)||'';
if((cartesianBars.match(/class="cartesian-bar"/g)||[]).length!==3) fail('Le diagramme en bâtons doit conserver ses trois catégories.');
const proportionalLimit=cartesianGraph?.model(cartesianGraph.presets.find(preset=>preset.id==='proportionnalite-limite').data);
if(proportionalLimit?.yAxis.max!==20) fail('La droite proportionnelle limite doit étendre le domaine vertical jusqu’à 20.');
const growthLimit=cartesianGraph?.model(cartesianGraph.presets.find(preset=>preset.id==='croissance-limite').data);
if(growthLimit?.yAxis.max!==25||!growthLimit.yAxis.ticks.some(tick=>tick.value===25)) fail('La croissance limite doit ajouter la graduation 25 sans dépasser l’axe.');
if(!cartesianGraph?.render(cartesianGraph.presets.find(preset=>preset.id==='billets-points').data).includes('data-point-id="point-5"')) fail('Le nuage de points doit conserver le cinquième billet.');

const solid=registry?.get('geometry.solid');
if(!solid) fail('Le composant geometry.solid est absent.');
if(solid&&solid.version!=='1.0.0') fail('Version 1.0.0 attendue pour le traceur de solides.');
if(solid&&solid.presets.length!==7) fail('Sept familles de solides sont attendues.');
for(const preset of solid?.presets||[]){
  const rendered=solid.render(preset.data);
  if(!rendered.startsWith('<svg class="solid-svg"')) fail(`Le solide ${preset.id} doit rester un SVG autonome.`);
  if(!rendered.includes('role="img"')) fail(`Le solide ${preset.id} doit rester accessible.`);
}
if(solid&&!solid.render({kind:'cylinder'}).includes('stroke-dasharray="6 5"')) fail('Les arêtes cachées des solides doivent rester pointillées.');

const angleVocabulary=registry?.get('geometry.angle-vocabulary');
if(!angleVocabulary) fail('Le composant geometry.angle-vocabulary est absent.');
if(angleVocabulary&&angleVocabulary.version!=='1.1.0') fail('Version 1.1.0 attendue pour le vocabulaire des angles.');
if(angleVocabulary&&angleVocabulary.presets.length!==13) fail('Treize représentations de référence sont attendues pour les angles.');
for(const preset of angleVocabulary?.presets||[]){
  const rendered=angleVocabulary.render(preset.data);
  if(!rendered.startsWith('<svg class="angle-vocabulary-svg')) fail(`Le visuel d’angles ${preset.id} doit produire un SVG autonome.`);
  if(!rendered.includes('role="img"')) fail(`Le visuel d’angles ${preset.id} doit rester accessible.`);
}
const fourAngles=angleVocabulary?.render({kind:'gallery'})||'';
if(!fourAngles.includes('aigu')||!fourAngles.includes('droit')||!fourAngles.includes('90°')||!fourAngles.includes('obtus')||!fourAngles.includes('plat')||!fourAngles.includes('180°')) fail('Le cours des quatre angles doit afficher les noms et les repères 90° et 180°.');
const sixAngles=angleVocabulary?.render({kind:'gallery',extended:true})||'';
if(!sixAngles.includes('nul')||!sixAngles.includes('plein')||!sixAngles.includes('360°')) fail('Le cours étendu doit inclure les angles nul et plein.');
if(!sixAngles.includes('viewBox="0 0 540 540"')||!sixAngles.includes('font-size="22"')) fail('Le tableau des six natures doit rester agrandi en deux colonnes avec de grands libellés.');
const namedAngle=angleVocabulary?.render({kind:'named'})||'';
if(!namedAngle.includes('AOB')||!namedAngle.includes('O, le sommet, est au milieu')) fail('Le cours doit nommer un angle avec trois lettres et le sommet au milieu.');
const variableNamedAngle=angleVocabulary?.render({kind:'named',letters:['C','E','D']})||'';
if(!variableNamedAngle.includes('CED')||!variableNamedAngle.includes('E, le sommet, est au milieu')) fail('Le schéma nommé doit reprendre les trois lettres de la question.');
const hiddenNature=angleVocabulary?.render({kind:'single',angleKind:'obtuse',showLabel:false,showMeasure:false})||'';
if(hiddenNature.includes('>obtus<')||hiddenNature.includes('Angle obtus')) fail('Une figure à identifier ne doit pas révéler sa nature dans le texte ou son libellé accessible.');
const isoscelesSetSquare=angleVocabulary?.render({kind:'set-square',known:45,reveal:true})||'';
if(!isoscelesSetSquare.includes('M 130 238 L 130 58 L 310 238 Z')||!isoscelesSetSquare.includes('45°–45°–90°')) fail('L’équerre à 45° doit être représentée par un triangle rectangle isocèle.');
const comparison=angleVocabulary?.render({kind:'compare'})||'';
if(!comparison.includes('pas la longueur des côtés')) fail('La comparaison doit rappeler que la longueur des côtés ne détermine pas l’angle.');
const corresponding=angleVocabulary?.render({kind:'parallel',relation:'corresponding'})||'';
if(!corresponding.includes('Correspondants : même position')) fail('Le cours doit représenter les angles correspondants, pas seulement les alternes-internes.');
const protractorQuestion=angleVocabulary?.render({kind:'protractor',degrees:40})||'';
const protractorCorrection=angleVocabulary?.render({kind:'protractor',degrees:40,reveal:true})||'';
if(!protractorQuestion.includes('Le premier côté est aligné sur le 0° à droite.')||protractorQuestion.includes('Angle de 40 degrés lu')) fail('Le rapporteur doit indiquer le zéro de départ sans révéler la réponse.');
if(!protractorCorrection.includes('On part du 0° à droite : 40°.')||!protractorCorrection.includes('Angle de 40 degrés lu')) fail('La correction du rapporteur doit révéler la mesure sur la même figure.');

const squareArea=registry?.get('numbers.square-area');
if(!squareArea) fail('Le composant numbers.square-area est absent.');
if(squareArea&&squareArea.version!=='1.0.0') fail('Version 1.0.0 attendue pour le carré côté–aire.');
if(squareArea&&squareArea.presets.length!==5) fail('Cinq constructions de référence sont attendues pour les carrés.');
if(squareArea&&context.squareAreaSvg!==squareArea.render) fail('Le point d’entrée historique des carrés doit utiliser le composant enregistré.');
const squareAreaHashes=new Map([
  ['aire-inconnue','ee8fc77d4b611b4a028fcb1978974189e9a462ead75305e67ad7213b4fae9120'],
  ['cote-inconnu','21396a0389cfd5fcc697c2d098c1a05d9565a65c76022cd8145b1735cce451c0'],
  ['produit','3b067df045e7f122415d39189a10806a184e6f8e72b65a2555c1aae753468a50'],
  ['calcul-voisin','61703ff612b8d057977a2d9451a6488756077e170cd388b528a58fd7093920bb'],
  ['deux-carres','e5772e034385972fe6821e4b7f92f4b4445e008ae71aacf93efbbf613e09f169']
]);
for(const preset of squareArea?.presets||[]){
  const actual=hash(squareArea.render(preset.data));
  if(actual!==squareAreaHashes.get(preset.id)) fail(`Le carré ${preset.id} a changé (${actual}).`);
  if(!preset.supports.includes('print')) fail(`Le carré ${preset.id} doit rester imprimable.`);
}
const squareModule=fs.readFileSync(new URL('auto/scripts/modules/numbers/dnb_07.js',root),'utf8');
if((squareModule.match(/squareAreaSvg\(/g)||[]).length!==9) fail('Les neuf figures de dnb_07 doivent appeler le carré partagé.');
if(squareModule.includes('<svg')) fail('dnb_07 ne doit plus embarquer de copie du SVG du carré.');


const fractionDecimalGrid=registry?.get('arithmetic.fraction-decimal-grid');
if(!fractionDecimalGrid) fail('Le composant arithmetic.fraction-decimal-grid est absent.');
if(fractionDecimalGrid&&fractionDecimalGrid.version!=='1.2.0') fail('Version 1.2.0 attendue pour le plateau fraction–décimal.');
if(fractionDecimalGrid&&fractionDecimalGrid.presets.length!==9) fail('Neuf constructions de référence sont attendues pour le plateau fraction–décimal.');
if(fractionDecimalGrid&&context.fractionDecimalGrid!==fractionDecimalGrid.render) fail('Le point d’entrée historique du plateau fraction–décimal doit utiliser le composant enregistré.');
const fractionDecimalHashes=new Map([
  ['demi',['f892b457ebcddff0997d2682e8f9b3b3abd2115320e919d56724b0bcc44c2f58','f892b457ebcddff0997d2682e8f9b3b3abd2115320e919d56724b0bcc44c2f58']],
  ['trois-quarts',['6dd30db0795c3dad22efe550c12f3cbc2e36e6fcacb449e2b9d8ad11b52decf4','6dd30db0795c3dad22efe550c12f3cbc2e36e6fcacb449e2b9d8ad11b52decf4']],
  ['deux-cinquiemes',['5b915a4a1cdb01b0e4c73056ae2d1f527b6bf2d88f0fb16238afd7be41406abc','5b915a4a1cdb01b0e4c73056ae2d1f527b6bf2d88f0fb16238afd7be41406abc']],
  ['seize-vingtiemes',['692778f8a72cb62924749c993f84aaef8db3cae2504237d16998e9239b55172d','692778f8a72cb62924749c993f84aaef8db3cae2504237d16998e9239b55172d']],
  ['dix-neuf-vingtiemes',['adc12afa8aec60bcf2182c4b6abc997685fd78ac15d35d0d2cdaa6d294d737c1','adc12afa8aec60bcf2182c4b6abc997685fd78ac15d35d0d2cdaa6d294d737c1']],
  ['sept-cinquiemes',['550a69f2a054cb1cc9a0ce55bf69f82a14cbe3ffceb3dca6b7c182354060ef67','550a69f2a054cb1cc9a0ce55bf69f82a14cbe3ffceb3dca6b7c182354060ef67']],
  ['ecriture-decimale',['854fe711e10b2a0a9e80861af5278afb0b1d4bc3bbfeb667621d33e0bb426a8b','854fe711e10b2a0a9e80861af5278afb0b1d4bc3bbfeb667621d33e0bb426a8b']],
  ['simplification',['948e2c45e30b6e8d3a8a3829fa3b4713f3e536a08710973a97916971052c623d','948e2c45e30b6e8d3a8a3829fa3b4713f3e536a08710973a97916971052c623d']]
]);
for(const preset of fractionDecimalGrid?.presets||[]){
  for(const correction of [false,true]){
    const actual=hash(fractionDecimalGrid.render(preset.data,correction));
    const expected=fractionDecimalHashes.get(preset.id)?.[correction?1:0];
    if(expected&&actual!==expected) fail(`Le plateau fraction–décimal ${preset.id} a changé (${actual}).`);
  }
}
const decimalComplement=fractionDecimalGrid?.render({kind:'decimal-complement',filledA:9,filledB:1,showSecond:true},true)||'';
if((decimalComplement.match(/decimal-complement-cell/g)||[]).length!==10||!decimalComplement.includes('1 unité')) fail('La bande décimale doit assembler dix dixièmes en une unité.');

const orderCards=registry?.get('numbers.order-cards');
if(!orderCards) fail('Le composant numbers.order-cards est absent.');
if(orderCards&&orderCards.version!=='1.1.0') fail('Version 1.1.0 attendue pour les cartes à ranger.');
if(orderCards&&orderCards.presets.length!==1) fail('Une situation de référence est attendue pour les cartes à ranger.');
const orderCardsQuestion=orderCards?.render({values:[4.7,4.09,4.68],solution:[4.09,4.68,4.7]},false)||'';
const orderCardsCorrection=orderCards?.render({values:[4.7,4.09,4.68],solution:[4.09,4.68,4.7]},true)||'';
if((orderCardsQuestion.match(/data-decimal-card=/g)||[]).length!==3||(orderCardsQuestion.match(/data-decimal-slot=/g)||[]).length!==3) fail('Le rangement doit fournir trois cartes et trois positions.');
if(!orderCardsCorrection.includes('4,09')||!orderCardsCorrection.includes('4,68')||!orderCardsCorrection.includes('4,7')) fail('La correction du rangement doit afficher l’ordre croissant.');

const fractionOperations=registry?.get('arithmetic.fraction-operations');
if(!fractionOperations) fail('Le composant arithmetic.fraction-operations est absent.');
if(fractionOperations&&fractionOperations.version!=='1.0.0') fail('Version 1.0.0 attendue pour les opérations sur les fractions.');
if(fractionOperations&&fractionOperations.presets.length!==10) fail('Dix constructions de référence sont attendues pour les opérations sur les fractions.');
if(fractionOperations&&context.fractionOperationsVisual!==fractionOperations.render) fail('Le point d’entrée historique des opérations sur les fractions doit utiliser le composant enregistré.');
const fractionOperationHashes=new Map([
  ['simplifier',['9aad8e4ef4bdb2b0913db49e708566d9f8a734c1058955c3c8448678962902d2','7464193debd5587e4c53208fa565e74ae2887d432749584e3cc16ee537ce1f2f']],
  ['comparer',['540b5f744ea044e607845f18361befa4bf8fa1277228a42650e326b7526c5123','8ca220996549ef3a186175c8e9196f1dd33d63d9ebe671a86e17103163dcc0d9']],
  ['additionner',['019d1748159d2daf3028f290b8d4ae94941fe13a0cd1873608a296ca3c3ab5a5','54768e28347db4d613b4297e4b4458041f4bf577612ccd0891cca7891c05819b']],
  ['soustraire',['5a80f7e380eee368a76b4925be03c343fb90ca47cddcb58d51563c5fca033ff2','f1e1eaf69b1d6cd553c6e35901cdf784b9cab8103378080d7a30f91c4795363f']],
  ['denominateur-commun',['22ed035cbe89cef5f7ffc1b63e38b65a4005830e1103b30790dd9a59ddfb2e79','8094de29f11c1ddccdf97a12147f09a6720e282937302cf8e8b3a661fadee0f5']],
  ['produit-aire',['4988a3e2ccd8ceae3f79b093a0a1e1e622d1a5917791d006a7a58f9f2a8ecbe2','91e2343aae753ea90863da1ef8fcd2855dfd5ce98c79e8458339394cc7d4712c']],
  ['simplifier-produit',['293bbeddd15c1f502fb6799ada7f802d8b4d452992ae893fa97771568d2fa881','293bbeddd15c1f502fb6799ada7f802d8b4d452992ae893fa97771568d2fa881']],
  ['diviser-fractions',['aa8b9c129fc6a068015761a8ec1cef0009d979f9087d4d861dfcb44b195de1fa','aa8b9c129fc6a068015761a8ec1cef0009d979f9087d4d861dfcb44b195de1fa']],
  ['compter-parts',['9c933c3e423ef85a56f50ef3729ff27d6b7ff505945897525101942a86d6e20a','404702dcdb3174121920a32cb0ce6a77653eba1d5a4e1e7a7ac2efbddb766e23']],
  ['division-mixte',['8686d56f233580cbf9998f669d737d9004acb7430ea1b182592bf52d31fe2144','8686d56f233580cbf9998f669d737d9004acb7430ea1b182592bf52d31fe2144']]
]);
for(const preset of fractionOperations?.presets||[]){
  for(const correction of [false,true]){
    const actual=hash(fractionOperations.render(preset.data,correction));
    if(actual!==fractionOperationHashes.get(preset.id)?.[correction?1:0]) fail(`Le rendu Fractions ${preset.id} a changé (${actual}).`);
  }
}

const pythagorasBuilder=registry?.get('geometry.pythagoras-builder');
if(!pythagorasBuilder) fail('Le composant geometry.pythagoras-builder est absent.');
if(pythagorasBuilder&&!pythagorasBuilder.supports.includes('phone')) fail('Le constructeur Pythagore doit être compatible téléphone.');
if(pythagorasBuilder&&pythagorasBuilder.supports.includes('projection')) fail('Le constructeur tactile ne doit pas être proposé comme visuel de projection.');
const builderQuestion=pythagorasBuilder?.render({task:'complete',rightAngle:'C',lengths:{legA:6,legB:8,hypotenuse:10}},false)||'';
const builderCorrection=pythagorasBuilder?.render({task:'complete',rightAngle:'C',lengths:{legA:6,legB:8,hypotenuse:10}},true)||'';
if(!builderQuestion.includes('data-pythagoras-token')||!builderQuestion.includes('AB²')) fail('Le constructeur tactile doit fournir les étiquettes du triangle rectangle en C.');
if(!builderCorrection.includes('100')||!builderCorrection.includes('36')||!builderCorrection.includes('64')) fail('La correction tactile doit afficher les trois aires exactes.');
const renamedBuilder=pythagorasBuilder?.render({task:'relation',vertices:'MNP',rightAnglePosition:'B',lengths:{legA:5,legB:12,hypotenuse:13}},false)||'';
if(!renamedBuilder.includes('Triangle MNP rectangle en N')||!renamedBuilder.includes('MP²')) fail('Le constructeur tactile doit adapter le triangle et son hypoténuse aux noms de sommets fournis.');

const relativeTokens = registry?.get('numbers.relative-tokens');
if (!relativeTokens) fail('Le composant numbers.relative-tokens est absent.');
if (relativeTokens && !relativeTokens.supports.includes('phone')) fail('Les jetons relatifs doivent être déclarés compatibles téléphone.');
if (relativeTokens && relativeTokens.presets.length!==3) fail('Trois situations de référence sont attendues pour les jetons relatifs.');
if (relativeTokens && !relativeTokens.render({positive:2,negative:1}).includes('relative-token-visual')) fail('Le composant jetons relatifs doit produire un visuel exploitable.');

const numberLine = registry?.get('numbers.number-line');
if (!numberLine) fail('Le composant numbers.number-line est absent.');
if (numberLine && numberLine.version !== '1.3.0') fail('Version 1.3.0 attendue pour le composant droite graduée.');
if (numberLine && numberLine.presets.length !== 9) fail('Neuf familles de droites graduées sont attendues.');
if (numberLine && context.numberLineSvg !== numberLine.render) {
  fail('Le module dnb_14 doit utiliser le composant droite graduée enregistré.');
}
const numberLineLayout=numberLine?.getScaleLayout?.({mode:'scale',min:1,max:2,step:1,width:560,height:154,axisPadding:.1});
if (!numberLineLayout || Math.abs(numberLineLayout.toX(1)/numberLineLayout.width*100-16.964286)>1e-6 || Math.abs(numberLineLayout.toX(2)/numberLineLayout.width*100-84.107143)>1e-6) {
  fail('La droite graduée doit exposer les coordonnées exactes de ses graduations.');
}
const numberLineHashes = new Map([
  ['unite', '9849822d67da6bf91ae191fc146b5fbbab5062c5f4e1eb40e17f3f5c1cb08390'],
  ['relatifs', '33181d27eafe25f16b802ecd378343cf9711375c48419f56615128730d0f3d79'],
  ['fraction', 'd6911fe60a2ea0267c827bc30bcf2cc247ec5ff7a92774d0e979fa06c25dd3fd'],
  ['echelle', 'fb1a0df975801b58bdc8418d0ba40034f4ee646b00206d2d945b78c87a3f7b16'],
  ['deux-points', '4bf638ad01681c48fd61d55091269a85d3a0eae451557a511b90a0e8972b1091'],
  ['courte-parametree','740e60f5405b92e12c2efe52b297e426addb1ae1eae9817b5d95346e402790c2'],
  ['longue-decimale','0f80e1e9f139db37c30a329ec9ab3351579cd4a55b783e8ade0c4bf45abd036c'],
  ['centiemes','ce71a186ddb1bfe90c8230bab0966f69ba676cfac2dfe94b887361a7094fb719'],
  ['huitiemes','eebffe9be8793498e7855904a2489c85ec87df0da34231a28e1913d9861458ce']
]);
for (const preset of numberLine?.presets || []) {
  const actual = hash(numberLine.render(preset.data));
  if (actual !== numberLineHashes.get(preset.id)) fail(`La droite graduée ${preset.id} a changé (${actual}).`);
}
if (!numberLine?.presets.find(preset=>preset.id==='courte-parametree')?.supports.includes('phone')) fail('La droite courte doit être déclarée compatible téléphone.');
if (numberLine?.presets.find(preset=>preset.id==='longue-decimale')?.supports.includes('phone')) fail('La droite longue ne doit pas être proposée telle quelle sur téléphone.');
const placementLine=numberLine?.renderPlacement({tickCount:10,step:1,zeroIndex:4,startIndex:1,targetIndex:6,currentIndex:1,letter:'C',references:[{index:4,label:'0'},{index:5,label:'1'}]},false)||'';
const placementCorrection=numberLine?.renderPlacement({tickCount:10,step:1,zeroIndex:4,startIndex:1,targetIndex:6,currentIndex:6,letter:'C',references:[{index:4,label:'0'},{index:5,label:'1'}]},true)||'';
if(!placementLine.includes('data-number-line-placement="1"')||!placementLine.includes('number-line-point-hit')||!placementLine.includes('number-line-point-grip')) fail('La droite tactile doit fournir une zone de saisie agrandie et une poignée discrète.');
if((placementLine.match(/number-line-tick-hit/g)||[]).length!==10) fail('Chaque graduation tactile doit proposer une cible de secours.');
if(placementLine.includes('<circle')&&!placementLine.includes('number-line-point-grip')) fail('Le point tactile ne doit pas devenir une grosse pastille.');
if(!placementCorrection.includes('#087a55')||placementCorrection.includes('number-line-point-hit')) fail('La correction tactile doit montrer la cible en vert sans rester manipulable.');
const numberLineModule = fs.readFileSync(new URL('auto/scripts/modules/numbers/dnb_14.js', root), 'utf8');
const numberLineCalls = [...numberLineModule.matchAll(/numberLineSvg\(/g)].length;
if (numberLineCalls !== 18) fail(`Les 18 gabarits de dnb_14 doivent utiliser la droite graduée commune (${numberLineCalls} appel(s)).`);
if (numberLineModule.includes('<svg')) fail('dnb_14 ne doit plus embarquer de copie du SVG de droite graduée.');

const coordinatePlane = registry?.get('geometry.coordinate-plane');
if (!coordinatePlane) fail('Le composant geometry.coordinate-plane est absent.');
if (coordinatePlane && coordinatePlane.version !== '1.2.0') fail('Version 1.2.0 attendue pour le repère du plan.');
if (coordinatePlane && coordinatePlane.presets.length !== 8) fail('Huit repères du plan de référence sont attendus.');
if (coordinatePlane && context.coordinatePlaneSvg !== coordinatePlane.render) {
  fail('Le module dnb_15 doit utiliser le repère du plan enregistré.');
}
const coordinateHashes = new Map([
  ['point','d5163af9569b4e32afaf8c4dd8804a91ab19b1647dd3f273045117c1fd297c26'],
  ['axe','d7f23e7bf63f3df863993805ed67ab39b0c151cf2cc2583b4f6705e3a3e4741b'],
  ['deux-points','7f1a8b99796674e4576e07c827dae9d68d076f2d4ef51f3a3c3d3c61b3cc7cab'],
  ['demi-unites','2ccf925860b3683bb9b1b632329f79424ed9f960d22c992325ef8f27dabfbc78'],
  ['compact-parametre','262cd86902737bf5fbe319b9b625b3bbf13a04d43621dfe59fed2f4c658a4d25'],
  ['grand-parametre','31ab6354de74a7c8888b69925c41bb49dbcd5ab25939ee191af4d4932be9437f'],
  ['demi-pas-parametre','101b6dcce0d98fda1ce39b41298a89807883450ad7e5d9ff867fdb6edc34e9ef'],
  ['rectangulaire','83fc90440e8b2e7bc62b646f2eaaa2f50c9d8fcf7535d2503e9b82fcd680754e']
]);
for (const preset of coordinatePlane?.presets || []) {
  const actual=hash(coordinatePlane.render(preset.data));
  if(actual!==coordinateHashes.get(preset.id)) fail(`Le repère du plan ${preset.id} a changé (${actual}).`);
}
const tracedPlane=coordinatePlane?.render(coordinatePlane.presets.find(preset=>preset.id==='compact-parametre').data)||'';
const placementPlane=coordinatePlane?.renderPlacement({bounds:{xMin:-3,xMax:3,yMin:-3,yMax:3},step:1,width:500,height:420,targets:[{x:-2,y:1,label:'M'}]},false)||'';
const coordinatePlacementCorrection=coordinatePlane?.renderPlacement({bounds:{xMin:-3,xMax:3,yMin:-3,yMax:3},step:1,width:500,height:420,targets:[{x:-2,y:1,label:'M'}]},true)||'';
if(!placementPlane.includes('data-coordinate-placement="1"')||(placementPlane.match(/class="coordinate-grid-hit"/g)||[]).length!==49) fail('Le repère tactile doit exposer ses 49 intersections entières.');
if(placementPlane.includes('coordinate-point-marker')||!coordinatePlacementCorrection.includes('coordinate-point-marker')||coordinatePlacementCorrection.includes('coordinate-grid-hit')) fail('Le point cible doit rester caché dans la question et apparaître seul dans la correction.');
if(!tracedPlane.includes('y1="160.5"')&&!tracedPlane.includes('stroke-width="1.5"')) fail('Le traceur de repère doit dessiner de petits traits de graduation sur les axes.');
const coordinateModule = fs.readFileSync(new URL('auto/scripts/modules/geometry/dnb_15.js', root), 'utf8');
const coordinateCalls = [...coordinateModule.matchAll(/coordinatePlaneSvg\(/g)].length;
if (coordinateCalls !== 9) fail(`Les 9 gabarits de dnb_15 doivent utiliser le repère commun (${coordinateCalls} appel(s)).`);
if (coordinateModule.includes('<svg')) fail('dnb_15 ne doit plus embarquer de copie du SVG de repère.');

const conversionTable = registry?.get('measures.conversion-table');
if (!conversionTable) fail('Le composant measures.conversion-table est absent.');
if (conversionTable && conversionTable.version !== '1.0.0') fail('Version 1.0.0 attendue pour le tableau de conversion.');
if (conversionTable && conversionTable.presets.length !== 5) fail('Cinq familles de tableaux de conversion sont attendues.');
if (conversionTable && context.conversionTableHtml !== conversionTable.render) {
  fail('Le moteur doit utiliser le tableau de conversion enregistré.');
}
const conversionHashes = new Map([
  ['longueur', ['8d176109af4b1ad3bea205de2462526b5bad4ae5824bd6404c91d66e6444129b','5333b51c584645db9ebb5494b1c797d1138e19534eabbb4819422ca916d27d64']],
  ['masse', ['41b6dd35ade28df34d99a5f1e5431c04ffb1cbaa48da8268e5feef8e41c5a644','2a7468026552f110f9fec2f3f4a4dc32fb5a41c0eee02928e4745940824a935b']],
  ['capacite', ['0772dd9ee4aa5fa0ef420c694ecaecee73fb796e0164f788bcf1c5befdddea2e','74989d521edc2feda31c23a630a1d68da18a6df612aa78dd7f6a57ce322aa0d7']],
  ['aire', ['4799ef5a6f4908adf706232dc0fa0ecd947a2da4670a71e691814c05cf2a83ac','86126629f51770d9ea250e3f26e13f04fb8a693cbe843ab5023af36630fd13fd']],
  ['volume', ['86bcc5fb2a3212621e1e23f7a7aa530a88302879c2cf3fd704102fc1a435eb61','f563a5f05e4ff35d4cdb5af1d1491c6d53f8fe749661576db264223192db3518']]
]);
for (const preset of conversionTable?.presets || []) {
  for (const correction of [false,true]) {
    const actual=hash(conversionTable.render(preset.data,correction));
    if(actual!==conversionHashes.get(preset.id)?.[correction?1:0]) fail(`Le tableau de conversion ${preset.id} a changé (${actual}).`);
  }
}
const questionEngine = fs.readFileSync(new URL('auto/scripts/02-question-engine.js', root), 'utf8');
if (!questionEngine.includes('const getThemeIconMarkup=globalThis.MATHSGO_SETUP_ICONS?.markup;') || !questionEngine.includes("const iconMarkup=typeof getThemeIconMarkup==='function'?getThemeIconMarkup(theme.id):'';")) {
  fail('Les icônes du menu doivent être intégrées directement lors de chaque reconstruction des catégories.');
}
const setupIcons = fs.readFileSync(new URL('auto/scripts/00-setup-icons.js', root), 'utf8');
if (!setupIcons.includes('const PAGE_SEED = pageSeed();') || !setupIcons.includes('const ICON_CACHE = new Map();') || setupIcons.includes('function dailySeed')) {
  fail('Les quatre pictogrammes doivent changer à chaque rechargement, puis rester stables pendant la séance.');
}
if (!setupIcons.includes('const routes = monotoneRoutes(3, 3);') || !setupIcons.includes('shuffled([8.5, 11, 14.5, 19], random)')) {
  fail('Le chemin informatique et l’histogramme doivent rester dans leurs variantes contrôlées.');
}
const commonIconFrames=(setupIcons.match(/<rect x="3\.5" y="3\.5" width="29" height="29" rx="4\.5"/g)||[]).length;
if (commonIconFrames < 5) {
  fail('Les quatre pictogrammes de domaines doivent partager exactement le même cadre.');
}
if (!setupIcons.includes('clipPath id="mathsgo-truchet-clip"') || !setupIcons.includes('clip-path="url(#mathsgo-truchet-clip)"')) {
  fail('Le tracé Truchet doit être coupé sous sa bordure extérieure.');
}
const setupIconApiForSeed = seed => {
  const iconContext = {
    crypto: { getRandomValues(values) { values[0] = seed; return values; } },
    document: { readyState: 'loading', addEventListener() {} }
  };
  iconContext.globalThis = iconContext;
  vm.createContext(iconContext);
  vm.runInContext(setupIcons, iconContext, { timeout: 1000 });
  return iconContext.MATHSGO_SETUP_ICONS;
};
const iconThemes = ['numbers', 'geometry', 'data', 'algorithm'];
const setupIconApi = setupIconApiForSeed(0x12345678);
const renderedSetupIcons = Object.fromEntries(iconThemes.map(theme => [theme, setupIconApi?.markup(theme) || '']));
for (const theme of iconThemes) {
  if (!renderedSetupIcons[theme].includes('<rect x="3.5" y="3.5" width="29" height="29" rx="4.5"')) {
    fail(`Le pictogramme ${theme} doit conserver le cadre commun.`);
  }
  if (setupIconApi?.markup(theme) !== renderedSetupIcons[theme]) {
    fail(`Le pictogramme ${theme} ne doit pas changer pendant la séance.`);
  }
}
const abacusBeads = [...renderedSetupIcons.numbers.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="2\.55" fill="(#[\da-f]+)"\/>/g)];
if (abacusBeads.length !== 9) fail('Le boulier doit conserver trois billes sur chacune de ses trois lignes.');
const abacusSlots = [9.5, 15, 20.5, 26];
const abacusRows = [11.5, 18, 24.5];
const emptyAbacusSlots = abacusRows.map(row => {
  const occupied = new Set(abacusBeads.filter(match => Number(match[2]) === row).map(match => Number(match[1])));
  return abacusSlots.findIndex(slot => !occupied.has(slot));
});
if (emptyAbacusSlots.some(slot => slot < 0) || new Set(emptyAbacusSlots).size !== 3) {
  fail('Les trois lignes du boulier doivent laisser trois emplacements vides différents.');
}
const histogramBars = [...renderedSetupIcons.data.matchAll(/<rect x="(?:8\.5|13\.55|18\.6|23\.65)" y="[\d.]+" width="4\.25" height="([\d.]+)" rx="\.8" fill="(#[\da-f]+)"\/>/g)];
if (histogramBars.length !== 4 || new Set(histogramBars.map(match => match[1])).size !== 4 || new Set(histogramBars.map(match => match[2])).size !== 4) {
  fail('L’histogramme doit afficher une fois chacune des quatre hauteurs et des quatre couleurs.');
}
const algorithmPath = renderedSetupIcons.algorithm.match(/<path d="(M9 27[^"]+)" fill="none" stroke="#6553b8"/)?.[1] || '';
const algorithmRoute = (algorithmPath.match(/h6|v-6/g) || []).map(move => move === 'h6' ? 'R' : 'U').join('');
if (algorithmRoute.length !== 6 || (algorithmRoute.match(/R/g) || []).length !== 3 || (algorithmRoute.match(/U/g) || []).length !== 3) {
  fail('Le chemin informatique doit relier le départ au drapeau avec trois pas à droite et trois pas vers le haut.');
}
for (const theme of iconThemes) {
  const variants = new Set(Array.from({ length: 12 }, (unused, index) => setupIconApiForSeed(index + 1)?.markup(theme) || ''));
  if (variants.size < 2) fail(`Le pictogramme ${theme} doit réellement varier entre plusieurs rechargements.`);
}
const algorithmVariants = new Set(Array.from({ length: 256 }, (unused, index) => setupIconApiForSeed(index + 1)?.markup('algorithm') || ''));
if (algorithmVariants.size !== 20) fail(`Les vingt chemins informatiques doivent être réellement accessibles (${algorithmVariants.size} trouvé(s)).`);
const setupStyles = fs.readFileSync(new URL('auto/styles/setup.css', root), 'utf8');
if (!setupStyles.includes('.header::before{content:"";position:absolute;top:0;right:0;left:0;')) {
  fail('La signature dégradée de l’en-tête doit occuper toute la largeur.');
}
const fineHoverMedia = setupStyles.indexOf('@media(hover:hover) and (pointer:fine){');
if (fineHoverMedia < 0 || setupStyles.indexOf(':hover') < fineHoverMedia || !setupStyles.includes('@media(hover:none),(pointer:coarse){') || !setupStyles.includes('.modrow:active{background:#eef6ff}')) {
  fail('Les survols du menu doivent être réservés à la souris et remplacés par un retour tactile bref.');
}
if (!setupStyles.includes('.theme-group[open]>.theme-summary{') || setupStyles.includes('.theme-summary:hover,.theme-group[open]')) {
  fail('Une catégorie ouverte doit rester identifiable sans réintroduire de survol tactile persistant.');
}
if(questionEngine.includes('function module01PartitionPalette')||questionEngine.includes('function module01HundredGridPart')||questionEngine.includes('function module01BoardSvgPart')){
  fail('Le plateau fraction–décimal ne doit plus être défini dans le gros moteur.');
}
if(!questionEngine.includes("MATHSGO_VISUALS.get('arithmetic.fraction-decimal-grid')")) fail('dnb_01 doit appeler le plateau fraction–décimal partagé.');
if(questionEngine.includes('function fractionOpsBandSvg')||questionEngine.includes('function fractionOpsComparisonWall')||questionEngine.includes('function fractionOpsAreaSvg')){
  fail('Les constructions visuelles de fractions ne doivent plus être définies dans le gros moteur.');
}
if(!questionEngine.includes("MATHSGO_VISUALS.get('arithmetic.fraction-operations')")) fail('Les modules de fractions doivent appeler le composant partagé.');
if (questionEngine.includes('function conversionTableHtml') || questionEngine.includes('function conversionTheme')) {
  fail('Le générateur de tableau de conversion ne doit plus être défini dans le gros moteur.');
}

const placeValueTable = registry?.get('numbers.glisse-nombre');
if (!placeValueTable) fail('Le composant numbers.glisse-nombre est absent.');
if (placeValueTable && placeValueTable.version !== '1.2.0') fail('Version 1.2.0 attendue pour le glisse-nombre.');
if (placeValueTable && placeValueTable.presets.length !== 5) fail('Cinq déplacements de référence sont attendus dans le glisse-nombre.');
if (placeValueTable && context.placeValueToolHtml !== placeValueTable.render) {
  fail('Le moteur doit utiliser le glisse-nombre enregistré.');
}
if (placeValueTable && context.setupPlaceValueTools !== placeValueTable.setup) fail('Le contrôleur animé doit appartenir au composant glisse-nombre.');
if(placeValueTable&&!placeValueTable.render(placeValueTable.presets[0].data,false).includes('data-place-value-source')) fail('Le glisse-nombre doit proposer le geste chiffre bleu puis colonne d’arrivée.');
if(placeValueTable&&!placeValueTable.render(placeValueTable.presets[0].data,true).includes('data-auto-shift="1"')) fail('La correction du glisse-nombre doit rejouer le déplacement.');
const placeValueHashes = new Map([
  ['fois-dix', ['74eb5a1fe3aa23e33ba75c58757e05438d4c30a8f918ec59a0074d8a6a92bb82','fc277ebe0d8b2d5d3b68cdeba90893bce8bd79dbdf5476da0201628ededd98ca']],
  ['fois-mille', ['f214ac87bd9a4a6eb544249243557be8f181be4a48ed9bae9d16b53fdf4ac4ba','79fde84f3ad9290184d1d1e80084e786d7c36dd009b1e589e8a712311b4bf850']],
  ['divise-dix', ['3c5bbc288056868e5103deb8cf226313a0e7c9457469860a36a5e36dedb0808e','5b6be66a4ae893fe1035c1f63b2b01ca37ca8ab8400e64cfc0c261ebd562b821']],
  ['divise-cent', ['f7121aceaa8bad2f4e446c5bf3dd81893ee8c40001f9917c25c62a45218e599b','c3612e7f15349ddc4e5deda3476caff1f24c7bf7b934c3326f8b0cc28afe3a44']],
  ['divise-mille', ['d48f6ce142e646b3b61a521dd28e0ca8cb0c4aff9ab34e79c16b1dd72b02e447','db4cd5bd4c59185fef9ffac7eee8df75e30de1975b41d185f41c64bf27490ff5']]
]);
for (const preset of placeValueTable?.presets || []) {
  for (const correction of [false,true]) {
    const actual=hash(placeValueTable.render(preset.data,correction));
    if(actual!==placeValueHashes.get(preset.id)?.[correction?1:0]) fail(`Le tableau de numération ${preset.id} a changé (${actual}).`);
  }
}
if (questionEngine.includes('function placeValueToolHtml') || questionEngine.includes('function digitsInPlaceValueColumns')) {
  fail('Le tableau de numération ne doit plus être construit dans le gros moteur.');
}

const equationSplat = registry?.get('algebra.equation-splat');
if (!equationSplat) fail('Le composant algebra.equation-splat est absent.');
if (equationSplat && equationSplat.version !== '1.0.0') fail('Version 1.0.0 attendue pour le composant équation/Splat.');
if (equationSplat && equationSplat.presets.length !== 2) fail('Deux préréglages de référence sont attendus.');
if (equationSplat && context.equationSplatSvg !== equationSplat.render) {
  fail('Le point d’entrée historique equationSplatSvg doit utiliser le composant enregistré.');
}

const cases = equationSplat ? [
  { data: { a: 2, b: 3, c: 1, d: 8, solution: 5 }, revealed: false, expected: 'f8b016987e4e469d9498957777e24c3bb3cecde2d76e0b2d719ad666754c733a' },
  { data: { a: 2, b: 3, c: 1, d: 8, solution: 5 }, revealed: true, expected: 'f60171cd9e2a904d913e97b775eaf0af801adca2a08d0a7eb5df3e0701362350' },
  { data: { a: -2, b: 3, c: 1, d: -6, solution: 3 }, revealed: false, expected: 'b67fafd9b0153b26b3abee739735cf38181445c8c8e830dd40932c0bc0f9c952' },
  { data: { a: -2, b: 3, c: 1, d: -6, solution: 3 }, revealed: true, expected: '73cdd0768d0c58bd9fea8f81294cb2e861cd565051724c0f1400d5e464a03b54' }
] : [];

for (const testCase of cases) {
  const rendered = equationSplat.render(testCase.data, testCase.revealed);
  if (!rendered.startsWith('<svg class="equation-splat-svg"')) fail('Le rendu équation/Splat doit rester un SVG autonome.');
  const actual = hash(rendered);
  if (actual !== testCase.expected) {
    fail(`Le rendu équation/Splat a changé (${actual} au lieu de ${testCase.expected}).`);
  }
}

const relationBar = registry?.get('arithmetic.relation-bar');
if (!relationBar) fail('Le composant arithmetic.relation-bar est absent.');
if (relationBar && relationBar.version !== '1.6.0') fail('Version 1.6.0 attendue pour les schémas de relations.');
if (relationBar && relationBar.presets.length !== 14) fail('Quatorze préréglages de schémas en barres sont attendus.');
if (relationBar && context.relationBarSvg !== relationBar.render) {
  fail('Le point d’entrée historique relationBarSvg doit utiliser le composant enregistré.');
}
const relationHashes=new Map([
  ['double',['cd9bff3f9fe7a844fd7929e1bdd20fc4973e59a7c03ac45a1fe3576870adc643','2048bb4ea1baad78c1b196abc0b195f902fe0a28b6a1cea2093e4dcd4284c162']],
  ['triple',['eb69c3c0f70c87d45faa4fc82ea43887582bc351cdfc4d789964966a650010e6','7a6505dfc9eb288ba6e41c71e419d9485c25882b2dcef1bd0da86b08f8c36b82']],
  ['quadruple',['71d161d8c5201250e4fe17f4ee72e642b346e2b16ea7c50f00fda9d7b0a7f630','4e964e788bbbf9d7619a62126c83f4cc99f64df95f67d738a7deb12f680fb0ae']],
  ['quintuple',['986b678494bbf473c3505b1ad63b3cf5023dd3f8267beba89bea7bd988c590b2','da8211352fd2a5a96e83f68aa39cf1668b4dc9b78cd5111945e46591db500237']],
  ['decuple',['526d80eba42898f40f11f3da839fef5d98b1a6cd9084bf2a446b0e6f3247f655','a821a9ebdd9fe79771af187f96f6d272e1863494c406a085205c135b5e8e4ab4']],
  ['triple-inverse',['1ee4d06332778d3c8d921c6e89f75a6b860573dbadf0887b6c805aca86580eb8','47d7667085b0e1d32d0904f2c1813a29145b5855b948c450a24600cce5704b83']],
  ['moitie',['9ea663724c5d57e8ed5857865ec87e68ca0c1c41093a4fad0f8bbdf3c9831c35','65231de6bf2a96749c6f13ed7d1e19579fee0127bd3a3ef8179dfce7a0bb011a']],
  ['tiers',['f730de2edbd49bfc36004238f2d15e752648c4b84a6f0b2b9fe45606bffba60b','e6b5348fe7c92b8275dfd0ab2ddc631bee3106360d3c14a7a003f52fcc666950']],
  ['quart',['fd354174fb4bbdec067c45367ca7f33eb679d132413e77d561dff56613d38a28','76cef285f14c785dda9ca78232fd6652cec14f58dfea6f8e8ca790bc80c8a099']],
  ['cinquieme',['106acd410b84fa7345182960212d7a53207650d484300cdb35b3cfb03b037da4','4eeb810ffed4c5609040a3050b6b6009737feb3eca4b3890bd2f4b6973b9096c']],
  ['dixieme',['50b2048c2cfe894b333bdafa01a5f558cebddab2aae4496563d75efee05c8751','e659e2d9e51f525f786a4b188bb031c2b3abc2c605c6415a2407aa1a4e7a989e']],
  ['predecesseur',['d16314da1b71fc16deda28af15ad7ac89e3abf00e49995ae3cecf01ce3664286','41244493ef0baf1d98a4f7ca3d07b5d19be312e77fc80d471f661dbf1db64ebd']],
  ['successeur',['d9f141188da706dc1a7acf03026242a6473405f087b5ef16cab89bf7cb405acb','07478579aa2159a68494f226bf4a7de47cbe3a553aa92171426a35429e844ee8']],
  ['partage-decimal',['d6e33206b6ccfa3f22dfecb96169391a837d5561f9c415c3619e28266af914bc','4f2038c85a86bcd808de440361faf34f0e74f671e24104ec38215bd82f93ce73']]
]);
for(const preset of relationBar?.presets||[]){
  for(const correction of [false,true]){
    const actual=hash(relationBar.render(preset.data,correction));
    if(actual!==relationHashes.get(preset.id)?.[correction?1:0]) fail(`Le schéma en barres ${preset.id} a changé (${actual}).`);
  }
}
for(const denseId of ['decuple','dixieme']) if(relationBar?.presets.find(preset=>preset.id===denseId)?.supports.includes('phone')) fail(`Le schéma dense ${denseId} ne doit pas être proposé tel quel sur téléphone.`);
const multipleModel=relationBar?.render({kind:'multiple_direct',factor:5,value:5,result:25},false)||'';
const fractionModel=relationBar?.render({kind:'fraction_direct',divisor:5,value:25,result:5},false)||'';
const decimalSharing=relationBar?.render({kind:'fraction_direct',divisor:3,value:2.1,result:.7,showValue:true,questionLabel:'une part ?'},false)||'';
const prominentDouble=relationBar?.render({kind:'multiple_direct',factor:2,value:12,result:24,prominent:true},true)||'';
const prominentTriple=relationBar?.render({kind:'multiple_direct',factor:3,value:7,result:21,prominent:true},true)||'';
if(!prominentDouble.includes('class="relation-bar-svg relation-bar-svg-prominent"')||!prominentDouble.includes('viewBox="0 0 720 192"')||!prominentDouble.includes('font-size="31"')) fail('Le grand schéma double/triple doit agrandir le tableau et ses nombres.');
if(!prominentTriple.includes('M54 52 C33 58 30 84 34 108 C37 123 47 132 54 134 L54 140')||!prominentTriple.includes('orient="auto"')||!prominentTriple.includes('M1 1L9 5L1 9')) fail('La flèche du grand schéma triple doit arriver verticalement avec une pointe orientée automatiquement.');
if(!prominentTriple.includes('<text x="18" y="96"')||!prominentTriple.includes('>× 3</text>')) fail('Le libellé × 3 doit rester séparé de l’arc de la flèche.');
if(!multipleModel.includes('× 5')||!multipleModel.includes('LE QUINTUPLE')) fail('Le modèle multiplicatif doit afficher le regroupement ×5.');
if(!fractionModel.includes('÷ 5')||!fractionModel.includes('le cinquième')) fail('Le modèle de fraction doit afficher le partage ÷5.');
if(!decimalSharing.includes('2,1')||!decimalSharing.includes('une part ?')||decimalSharing.includes('0,7')) fail('Le partage décimal doit montrer le total et garder la valeur d’une part inconnue.');

const thales = registry?.get('geometry.thales-configuration');
if (!thales) fail('Le composant geometry.thales-configuration est absent.');
if (thales && thales.version !== '0.4.0') fail('Version 0.4.0 attendue pour les configurations de Thalès.');
if (thales && thales.presets.length !== 5) fail('Les configurations de Thalès doivent couvrir les deux styles et le cas non parallèle.');
if (thales) {
  const nested = thales.render({ configuration: 'nested' });
  const butterfly = thales.render({ configuration: 'butterfly' });
  if (!nested.includes('stroke-linejoin="miter"') || !butterfly.includes('stroke-linejoin="miter"')) {
    fail('Les sommets des configurations de Thalès doivent rester nets et sans arrondi.');
  }
  if (hash(nested) !== '65dca6e1487ce1e02818f28501001518538c3295275e9a73e342d948a066d58e') fail('La configuration de Thalès emboîtée a changé.');
  if (hash(butterfly) !== '43161c04f1942ea7cbe243cb9fa8a048af45c1ef0e82042b68a655ab95eb3c81') fail('La configuration de Thalès en papillon a changé.');
  if(nested.includes('stroke="#11468c"')||nested.includes('stroke="#1daeae"')) fail('Les droites de la figure de cours Thalès ne doivent pas être colorées comme les points correspondants.');
  const exerciseNested=thales.render({configuration:'nested',style:'exercise'});
  const exerciseButterfly=thales.render({configuration:'butterfly',style:'exercise'});
  if(exerciseNested.includes('#11468c')||exerciseNested.includes('#1daeae')||exerciseButterfly.includes('#ff9114')) fail('Les figures de Thalès en mode exercice doivent être monochromes.');
  if(!exerciseNested.includes('stroke="#111111"')||!exerciseButterfly.includes('stroke="#111111"')) fail('Le mode exercice de Thalès doit tracer les figures en noir.');
  const nonParallel=thales.render({configuration:'nested',parallel:false});
  if(nonParallel===nested||!nonParallel.includes('Triangles emboîtés avec deux droites non parallèles')) fail('Le composant Thalès doit savoir tracer le cas non parallèle.');
  const withLengths=thales.render({configuration:'nested',lengths:{AM:'4 cm',AB:'8 cm',AN:'6 cm',AC:'12 cm'}});
  if(!withLengths.includes('AD = 4 cm')&&!withLengths.includes('AM = 4 cm')) fail('Le composant Thalès doit savoir placer les longueurs sur la figure d’aide.');
}

const triangleAngleSum=registry?.get('geometry.triangle-angle-sum');
if(!triangleAngleSum) fail('Le composant geometry.triangle-angle-sum est absent.');
if(triangleAngleSum&&triangleAngleSum.version!=='1.2.0') fail('Version 1.2.0 attendue pour le composant somme des angles.');
if(triangleAngleSum&&triangleAngleSum.presets.length!==6) fail('Six références sont attendues pour la somme des angles.');
if(triangleAngleSum&&context.triangleAngleSumVisual!==triangleAngleSum.render) fail('Le moteur doit utiliser le composant partagé de somme des angles.');
const angleReferenceBar=triangleAngleSum?.render({view:'bar',values:[60,60,60],unknown:[]},false)||'';
if(!angleReferenceBar.includes('viewBox="0 0 760 250"')||!angleReferenceBar.includes('x="30" y="18" width="700" height="104"')||!angleReferenceBar.includes('x="30" y="122" width="700" height="104"')) fail('La barre des angles doit garder la largeur de référence et augmenter uniformément la hauteur de ses deux rangées.');
const angleOverflowBar=triangleAngleSum?.render({view:'bar',values:[114,94],unknown:[],comparison:true},false)||'';
const angleOverflowWidths=[...angleOverflowBar.matchAll(/<rect x="60" y="(?:18|122)" width="([\d.]+)" height="104" fill="#fff"/g)].map(match=>Number(match[1]));
if(angleOverflowWidths.length!==2||!(angleOverflowWidths[0]<angleOverflowWidths[1])||angleOverflowWidths[1]!==640) fail('La comparaison supérieure à 180° doit rester plus courte que les tableaux ordinaires et ne pas dépasser son cadre centré.');
const angleBuilder=triangleAngleSum?.renderBuilder({known:[58,67],totalFirst:true,cards:['𝑥','180°','67°','58°']},false)||'';
const angleBuilderCorrection=triangleAngleSum?.renderBuilder({known:[58,67],totalFirst:true,cards:['𝑥','180°','67°','58°']},true)||'';
if((angleBuilder.match(/data-angle-sum-slot=/g)||[]).length!==4||(angleBuilder.match(/data-angle-sum-token=/g)||[]).length!==4||!angleBuilder.includes('data-angle-sum-reset="1"')) fail('Le composant Angles tactile doit fournir quatre cases, quatre cartes et une remise à zéro.');
if(!angleBuilder.includes('angle-triangle-svg')||!angleBuilderCorrection.includes('𝑥 = <strong>55</strong>°')) fail('La manipulation Angles doit garder le triangle et révéler le calcul de 𝑥 dans la correction.');
const angleHashes=new Map([
  ['fiche-exemple',['e16bfb651fafaacd78245529a0cd343519c6897a2301fb4e476201e846b4ce0d','3edf94fcd9f1e9123873779a59f9359ae2abab28ac65c87431955b37bad6a855']],
  ['triangle-rectangle',['346a8e9f3b98f8d4147554b930e9c7c34103d51fe56616a93dcbf7e6fadbb0d6','ab58eb5087c134fdd632af19cb19bda897124b0696a99b91d01beb1ddb67c0cc']],
  ['triangle-isoscele',['db664f14722585037e52235db0a2a39f7757cae0361996a7e8e909073f23cf54','30839b5613fed80dc68358a34b1d932eb70853baf387af7a21185df4f25abb60']],
  ['triangle-seul',['ad47d7092d948d481431c0176470d1e6c870782a09be4644f289997e98afbec2','7f66f5344593fc7919b97a12251cde913b7320e8457f5303609617c5ec24a106']],
  ['barre-seule',['dab040ff0c3078de9e7d3cf3ef313a784a0bfb5400a4d8254374b08e1959123e','82b31363f95f87a54382df4bce791d9ef25e9b9ad463d21087a458485e1a38ca']],
  ['triangle-impossible',['521741622b2a833bdf7aeadcc6e798591e2d3fcb9c3c6b05f6e76e708052ad07','521741622b2a833bdf7aeadcc6e798591e2d3fcb9c3c6b05f6e76e708052ad07']]
]);
for(const preset of triangleAngleSum?.presets||[]){
  for(const correction of [false,true]){
    const actual=hash(triangleAngleSum.render(preset.data,correction));
    if(actual!==angleHashes.get(preset.id)?.[correction?1:0]) fail(`Le rendu angles ${preset.id} a changé (${actual}).`);
  }
}
const angleModule=fs.readFileSync(new URL('auto/scripts/modules/geometry/dnb_18.js',root),'utf8');
if(angleModule.includes('<svg')) fail('dnb_18 ne doit plus embarquer son propre SVG de triangle.');
if(questionEngine.includes('function angleSumBarSvg')) fail('Le modèle en barres des angles ne doit plus être défini dans le gros moteur.');
if(!questionEngine.includes('triangleAngleSumVisual(bar,correction)')) fail('Le module angles doit appeler le composant partagé.');
if(!questionEngine.includes("const EQUABARRE_IMPORT_URL='https://mathsgo.re/outils/equabarre_import_splat.html'")||!questionEngine.includes("source:'automatismes_triangle_angles'")||!questionEngine.includes('Résoudre dans ÉquaBarre')) fail('Les barres résolubles de dnb_18 doivent conserver leur liaison vers ÉquaBarre import.');
if(!questionEngine.includes('if(!values.length||!unknownIndexes.length||data.comparison) return null;')) fail('Les tableaux sans inconnue et les cas impossibles ne doivent pas afficher le bouton ÉquaBarre.');

const pythagorasMill=registry?.get('geometry.pythagoras-mill');
if(!pythagorasMill) fail('Le composant geometry.pythagoras-mill est absent.');
if(pythagorasMill&&pythagorasMill.version!=='1.0.0') fail('Version 1.0.0 attendue pour le moulin de Pythagore.');
if(pythagorasMill&&pythagorasMill.presets.length!==4) fail('Quatre références sont attendues pour le moulin de Pythagore.');
const pythagorasHashes=new Map([
  ['vide',['ebcebeea95a9c411307a36fe6c567080851a69ee4d6ae5130d5e81292bd1b4b5','ebcebeea95a9c411307a36fe6c567080851a69ee4d6ae5130d5e81292bd1b4b5']],
  ['relation',['a7dff40295f8ba91d0e985b64a9db1a021d0b64f7e20022e03be8281afcb808d','a7dff40295f8ba91d0e985b64a9db1a021d0b64f7e20022e03be8281afcb808d']],
  ['hypotenuse',['dce1a82ab44a549d50de89766fc55dbcbe93da0dd8c5506a060996bced0dd335','2fa134b1acbcff5ceb6cf551700afbe385a1779f26725a6fdccf93cafc52a6b3']],
  ['cote',['86f9144523d870d4e3355f3270641e14a407f5f5d0ac81243cedc9b4ad7398d7','2fa134b1acbcff5ceb6cf551700afbe385a1779f26725a6fdccf93cafc52a6b3']]
]);
for(const preset of pythagorasMill?.presets||[]){
  for(const correction of [false,true]){
    const actual=hash(pythagorasMill.render(preset.data,correction));
    if(actual!==pythagorasHashes.get(preset.id)?.[correction?1:0]) fail(`Le moulin de Pythagore ${preset.id} a changé (${actual}).`);
  }
}

const pythagorasBar=registry?.get('geometry.pythagoras-bar');
if(!pythagorasBar) fail('Le composant geometry.pythagoras-bar est absent.');
if(pythagorasBar&&pythagorasBar.version!=='1.1.0') fail('Version 1.1.0 attendue pour PythaBarre.');
if(pythagorasBar&&pythagorasBar.presets.length!==6) fail('Six états de référence sont attendus pour PythaBarre.');
if(pythagorasBar&&context.pythagorasBar!==pythagorasBar.render) fail('Le point d’entrée pythagorasBar doit utiliser le composant enregistré.');
const pythagorasBarHashes=new Map([
  ['vierge',['561f1f401a3406f2e1f2ff93b0e2de2de9aa82be7e2e548aef5841d496157728','561f1f401a3406f2e1f2ff93b0e2de2de9aa82be7e2e548aef5841d496157728']],
  ['relation-lettres',['ac76ace00abd54c3b3d42d5ec4d864304404968fc1aebd5e9da4c7b6cc06cb65','ac76ace00abd54c3b3d42d5ec4d864304404968fc1aebd5e9da4c7b6cc06cb65']],
  ['hypotenuse-longueurs',['0545b6dc7f5bc4bd68273d3dada42d76751eb896cd91b746c4fd5b4a90735050','c5289e3a4fdd49a393cbec2701da5e7636b833cb200ce4d7999554f9e00b9a9c']],
  ['hypotenuse-carres',['a378350923495933aef11dcf09074f96fa501e528159a82e3f5623176db11cc6','cebdecb54eb58566dabb7983f0ece1ef80d315e209a77a4c94f71f850dee9283']],
  ['cote-longueurs',['668a41e4be76e01d4e1dd598baf5c7c534b7b9cec1443c0df1ff5e4b931f47bc','c5289e3a4fdd49a393cbec2701da5e7636b833cb200ce4d7999554f9e00b9a9c']],
  ['cote-carres',['4cc586c17fbc83d88fc9f010730a4f989b12d42c4c1a5e9762484cbb7d26a8bd','cebdecb54eb58566dabb7983f0ece1ef80d315e209a77a4c94f71f850dee9283']]
]);
for(const preset of pythagorasBar?.presets||[]){
  if(!preset.supports.includes('phone')||!preset.supports.includes('print')) fail(`PythaBarre ${preset.id} doit fonctionner sur téléphone et à l’impression.`);
  for(const correction of [false,true]){
    const actual=hash(pythagorasBar.render(preset.data,correction));
    if(actual!==pythagorasBarHashes.get(preset.id)?.[correction?1:0]) fail(`PythaBarre ${preset.id} a changé (${actual}).`);
  }
}
const touchingBar=pythagorasBar?.render({phase:'squares',target:'hypotenuse',values:{legA:3,legB:4,hypotenuse:5},proportional:true},false)||'';
if(!touchingBar.includes('y="114"')||!touchingBar.includes('x="289"')) fail('Les trois rectangles de PythaBarre doivent rester accolés et proportionnels aux carrés 9 et 16.');
const courseBar=pythagorasBar?.render({phase:'relation',sideNames:{hypotenuse:'a',legA:'b',legB:'c'},sharpCorners:true,plainEquation:true},true)||'';
if(!courseBar.includes('rx="0"')||!courseBar.includes('>a²</text>')||!courseBar.includes('>b²</text>')||!courseBar.includes('>c²</text>')) fail('Le cours de Pythagore doit utiliser des rectangles sans arrondi et l’égalité colorée a² = b² + c².');
if(courseBar.match(/<rect/g)?.length!==3) fail('Le schéma de cours ne doit pas ajouter de boîtes autour des termes de l’égalité.');

const pythagorasReasoning=registry?.get('geometry.pythagoras-reasoning');
if(!pythagorasReasoning) fail('Le composant geometry.pythagoras-reasoning est absent.');
if(pythagorasReasoning&&pythagorasReasoning.version!=='1.0.0') fail('Version 1.0.0 attendue pour la rédaction Pythagore.');
if(pythagorasReasoning&&pythagorasReasoning.presets.length!==12) fail('Douze étapes de rédaction Pythagore sont attendues.');
if(pythagorasReasoning&&context.pythagorasReasoning!==pythagorasReasoning.render) fail('Le point d’entrée pythagorasReasoning doit utiliser le composant enregistré.');
const pythagorasReasoningHashes=new Map([
  ['justifier',['0317529ed2346a86e8e1429862f5a2363b4608dcb63f8dca30714140a87cb9cf','e634eb9079b140fbd2badd4a99e83fba63565e32a573a3cc6f3bed64d3e50640']],
  ['relation',['3954cd14b981a564c3fa4338de1d7ffe6b2f6dc97932950640ec0e2776505062','d1315af5f0d338cad81332753bb18c30196f6ff987097e2ad7e1de304ab4d668']],
  ['hypotenuse-remplacer',['49d7c6b3aabff93947e786ffeff3180e72d69e03cb15933754e616215e7a8a3c','e80943a71acbf2a8aef994fbf48c86486a59f8453a62092d15911aa819bda91e']],
  ['hypotenuse-carres',['e7c1decaf63f16f1f54922f123fea09aa407624c9dcab1c97ed95635c38ccccf','e1ae3454e7d31d8b1de748b4b46c4b046e157051b95689b0e7ffd80056f9415b']],
  ['hypotenuse-regrouper',['6792311b502ff791720ba0a8ee5d5e6237200b24a11c59487dca2576cbdc51d6','495b8b36ec7322d46a290d3a26868c71a57780d74aaf3440d3152b4f6eaef610']],
  ['hypotenuse-racine',['923e2adc5462ba3c0d546fbd86321904f68e51bb1299b7108ee7c13efc8f560b','a00fbdb8e67193924cd101cf200f25b63c049d53caf3468ba4015d3331ccdb6e']],
  ['cote-remplacer',['49d7c6b3aabff93947e786ffeff3180e72d69e03cb15933754e616215e7a8a3c','49fd7d24e1b3d405c4afcbf0f9f43bba8657045efef2c5d82a69cd6cd128c6c8']],
  ['cote-carres',['e7c1decaf63f16f1f54922f123fea09aa407624c9dcab1c97ed95635c38ccccf','98f2605907e052434e042be7ba56e6ff5341812782c6cc932325ad8dbadec92d']],
  ['cote-soustraire',['9c4f19faa0f4d30fdcbd7c1df345a0ac74194149592ca33a28cb89b1896ed208','1d241bb0ab69fe85db7e6e36708c22e1d221cf0cf7f060dbfbe5a36f46cfbb5b']],
  ['cote-racine',['923e2adc5462ba3c0d546fbd86321904f68e51bb1299b7108ee7c13efc8f560b','0cd871f7a34ac40ba6c3081d1d4c7b1d1191e0d9e823315d2c1145468346d3e3']],
  ['reponse',['44edd234ca176eba8fdccfe08601208bcb7f482c0d3d2534d2b5af0633de9e4f','2b5526bf811e5ffb0d643435e8c79c8f4a4ef16e8b4af883fc31f80022b1afbd']],
  ['verification',['a744329070dea9e3ca3e1b21990fee4ff0b0f25e0b0bb1daca16d1e25229ab7e','038004603a83b51067acfd3ec326e6641276d920a3c1ed6482a41cb54246b34f']]
]);
for(const preset of pythagorasReasoning?.presets||[]){
  for(const correction of [false,true]){
    const actual=hash(pythagorasReasoning.render(preset.data,correction));
    if(actual!==pythagorasReasoningHashes.get(preset.id)?.[correction?1:0]) fail(`L’étape Pythagore ${preset.id} a changé (${actual}).`);
  }
}
const legPath=pythagorasReasoning?.render({step:'isolate',target:'legA',values:{legA:3,legB:4,hypotenuse:5}},true)||'';
const hypotenusePath=pythagorasReasoning?.render({step:'isolate',target:'hypotenuse',values:{legA:3,legB:4,hypotenuse:5}},true)||'';
if(!legPath.includes('25 − 16 = 9')) fail('Le chemin côté doit soustraire le carré connu.');
if(!hypotenusePath.includes('BC² = 25')) fail('Le chemin hypoténuse doit regrouper les deux carrés connus.');

const fractionPercent = registry?.get('arithmetic.fraction-percent-bar');
if (!fractionPercent) fail('Le composant arithmetic.fraction-percent-bar est absent.');
if (fractionPercent && fractionPercent.presets.length !== 7) fail('Sept préréglages fractions/pourcentages sont attendus.');
if (fractionPercent && context.fractionPercentBarSvg !== fractionPercent.render) {
  fail('Le moteur doit utiliser le composant fractions/pourcentages enregistré.');
}

const equalSharing=registry?.get('arithmetic.equal-sharing-board');
if(!equalSharing) fail('Le composant arithmetic.equal-sharing-board est absent.');
if(equalSharing&&equalSharing.version!=='1.1.0') fail('Version 1.1.0 attendue pour le partage équitable.');
if(equalSharing&&equalSharing.presets.length!==4) fail('Quatre gabarits de partage équitable sont attendus.');
if(equalSharing&&context.equalSharingBoard!==equalSharing.render) fail('Le point d’entrée equalSharingBoard doit utiliser le composant enregistré.');
const equalSharingHashes=new Map([
  ['deux-morceaux',['6381ae903bb916aab7a2709d59a1911b47fa0444a8f4d048794a2240099efebf','ffbe2ba11c217d2789f61a88a7091101f9115a2b0134024134cbce769811c8d1']],
  ['partage-trois',['1d5ebd51b598c191c3b32945760d835c74c917eaa56254d4321d731a6cde2554','8fc33ce6e65e738d03ffba12e3bbdd06f22f650b189027b03d92d37d4afcede1']],
  ['partage-quatre',['996bfc2ad23d75b66357496819aeda7a01eecd9baa580e44b270fded6d4b9d8e','27fd52c9bd03231b828f552247983b4f0dcefa7f36b2de39d96ae4c531eb066c']],
  ['partage-cinq',['0fc33ee026d40bb2332a6cafd68f13a99404a98c3221b825f85a884f453d226f','82ebcb93579c2f77b8cb54165f504564d491caafef09c7df3be993f772a1d92a']]
]);
for(const preset of equalSharing?.presets||[]){
  if(!preset.supports.includes('phone')||!preset.supports.includes('print')) fail(`Le partage ${preset.id} doit fonctionner sur téléphone et à l’impression.`);
  const question=equalSharing.render(preset.data,false),correction=equalSharing.render(preset.data,true);
  if(!question.includes('class="equal-sharing-svg"')) fail(`Le partage ${preset.id} doit produire le SVG commun.`);
  if(question===correction) fail(`Le partage ${preset.id} doit avoir un état de correction.`);
  for(const correctionState of [false,true]){
    const actual=hash(equalSharing.render(preset.data,correctionState));
    if(actual!==equalSharingHashes.get(preset.id)?.[correctionState?1:0]) fail(`Le partage ${preset.id} a changé (${actual}).`);
  }
}
const equalSharingKnownTotal=equalSharing?.render({shares:3,total:303,share:101,showTotal:true},false)||'';
if(!equalSharingKnownTotal.includes('>303<')||equalSharingKnownTotal.includes('>101<')) fail('Le partage doit pouvoir montrer le total connu sans révéler la valeur d’une part.');

const inquiryBar=registry?.get('algebra.inquiry-bar');
if(!inquiryBar) fail('Le composant algebra.inquiry-bar est absent.');
if(inquiryBar&&inquiryBar.version!=='1.0.0') fail('Version 1.0.0 attendue pour les schémas d’enquêtes.');
if(inquiryBar&&inquiryBar.presets.length!==15) fail('Quinze étapes de référence sont attendues pour les enquêtes.');
if(inquiryBar&&context.inquiryBar!==inquiryBar.render) fail('Le point d’entrée inquiryBar doit utiliser le composant enregistré.');
const inquiryHashes=new Map([
  ['additif-deux-representer',['62d75c7b59080a17309e0b3c0f5f02bc11e77f45456c2877abe0f66eb11687c9','2ab70fb7a7f59a019ff8a5a414c0cad458c8ef53d72902931b0bf163ddb6dfa3']],
  ['additif-deux-aligner',['bce2f110e0383901477d0a22f8b0e80ab230dae795bd42dc985a48f53f68c905','fb5c20f07a420145468bd34d8a561c3b5094dda4e669050972d1666687ea9596']],
  ['additif-deux-egaliser',['1bb742a3d2ffab840fcc898127e160e9fa8d0fd44dc23c9b9e64896a95966389','018e2ad60a46f794e0a05ec1fe0c274c5061243f1ce68fd00497be376cca6594']],
  ['additif-deux-diviser',['68e896941fe41ff570d5a9b40395f2890820256641f534136443d56b1acdaaf5','3aa860e919382a8e7d1311e8e70e0a605a89bb4d61eb2bbb6dd9a973ad4ad821']],
  ['additif-trois-representer',['3010fcf3fa307e7268d99153a40d2c0c050f1cbebc5b5a551e390a3485fad3c1','80e4fdf55a9c517bfca9d8567cdf6039bc7302e34c4e3e9ec4d60d47d02eb4bc']],
  ['additif-trois-aligner',['dd5f3c37ab57f4193c69995e7f3648d377f894c93b9f827cda2c2c0b0ee40e64','2e4d7168de8a8f1f3efcdcdffb03fe8bdc20a836961e64c3eeee4ad683aaa138']],
  ['additif-trois-egaliser',['e315b75f24830e90373919596e5e333a8d3af5a352a7d205d73ce1c722f9c9ce','e3a4046bae7e9b6c784ac99f8ccfbcfd30824875ea9a35680cec20546adec169']],
  ['additif-trois-diviser',['3c0f9b50e33f9e1154dad7b45c5550cbedfea9c34e822da5b66b770b5fdb6072','d26bef1c4f43a1f65f2ce1ea993b009f03097daab204687f1ad19339695ee922']],
  ['multiplicatif-x2-representer',['9c2c437d2c9baccfebee3e385620ca6511b9f18d7bb73f4d5dfe70281c6d26b2','8de775cdc52ea0463baeced187e845b318dbfa44c094d76586fe561cb8c4d48d']],
  ['multiplicatif-x2-aligner',['776df2b12b118d4707e560fc7dd2662dd10ba4fde9f9c496c90ac3afd23c24a8','8b3433490c640f9a32da0c89445b25b8cc010a04e9efe245e8718545ef69de11']],
  ['multiplicatif-x2-diviser',['8e7986e7db6f370dcb34680766b956fbddc12a51834a6e75a6b3ab9e45a7c8e2','6d60209671cac70b1b2953af84f1fe4c668c5faabe16e2c3891544324a4e72d2']],
  ['multiplicatif-x2-resultat',['124e546e056bc1cc02b9348d097eff86666ccbbef28f01e8a7bcae0602765518','894bbcda3477470346ff38cb748a47d9d562fd19bce5a8ab5ee496d700c4b4d1']],
  ['multiplicatif-x3-aligner',['47faec084d361ba53ee595216ee693d49d1b8c82df79d127b3eb10f26c583f6b','275938d157469a3583cc456e8f493d8f2c33761fd0d35a13f22ad0ec348106f6']],
  ['multiplicatif-x4-aligner',['79570bdf68534006db314cb9e20e650f3c363b9a2dc91a02d595c8c994abc086','cde5cc9fb51efddeae98059b915cdccf283e919db0f0e4d8f95d63f7c8226ea4']],
  ['multiplicatif-xn-aligner',['41e4b7eacf9bdc35113af78c10c66dd35e2ebf54ca4ef06e22a3d0a15da54fc5','4817aad33f7eb3abc45ffde69d2d6e727e59494f50c132dc3a2ace8a588599d1']]
]);
for(const preset of inquiryBar?.presets||[]){
  if(!preset.supports.includes('phone')||!preset.supports.includes('print')) fail(`L’enquête ${preset.id} doit fonctionner sur téléphone et à l’impression.`);
  const rendered=inquiryBar.render(preset.data,false);
  if(!rendered.includes('class="inquiry-bar-svg"')) fail(`L’enquête ${preset.id} doit produire le SVG commun.`);
  for(const correctionState of [false,true]){
    const actual=hash(inquiryBar.render(preset.data,correctionState));
    if(actual!==inquiryHashes.get(preset.id)?.[correctionState?1:0]) fail(`L’enquête ${preset.id} a changé (${actual}).`);
  }
}
const multiplicativeX2Align=inquiryBar?.render({family:'multiplicative',factor:2,step:'align',total:36},false)||'';
if(!multiplicativeX2Align.includes('Petite part')||!multiplicativeX2Align.includes('Grande part')) fail('L’étape ×2 alignée doit conserver les deux accolades nommées.');
if(multiplicativeX2Align.includes('Total')||multiplicativeX2Align.includes('unité')) fail('L’étape ×2 alignée ne doit afficher ni Total ni unités dans les barres.');
const multiplicativeX2Divide=inquiryBar?.render({family:'multiplicative',factor:2,step:'divide',total:36},false)||'';
if((multiplicativeX2Divide.match(/fill="#f4c99f"/g)||[]).length!==3) fail('L’étape ×2 de division doit afficher trois cases orange.');
if((multiplicativeX2Divide.match(/>…<\/text>/g)||[]).length!==3) fail('Les trois cases orange de l’étape ×2 doivent contenir seulement des points.');
const multiplicativeX2Result=inquiryBar?.render({family:'multiplicative',factor:2,step:'result',total:36},false)||'';
if((multiplicativeX2Result.match(/>…<\/text>/g)||[]).length!==2||multiplicativeX2Result.includes('Petite part')||multiplicativeX2Result.includes('Grande part')) fail('L’étape ×2 finale doit conserver uniquement les deux zones pointillées.');

const fractionWall=registry?.get('arithmetic.fraction-wall');
if(!fractionWall) fail('Le composant arithmetic.fraction-wall est absent.');
if(fractionWall&&fractionWall.version!=='1.0.0') fail('Version 1.0.0 attendue pour le mur de fractions.');
if(fractionWall&&fractionWall.presets.length!==6) fail('Six murs de fractions de référence sont attendus.');
if(fractionWall&&context.fractionWall!==fractionWall.render) fail('Le point d’entrée fractionWall doit utiliser le composant enregistré.');
const fractionWallHashes=new Map([
  ['compact',['ad9090df9cf57f981a709a8ae358ec2c349d258f05f55256b6e1883cf9cd4f56','f78fdc4f8e10299b398d40d6e4861c8383c7ac7881d7b4a06447ddc05a46a5cc']],
  ['equivalences',['7ca21bf182e99e6482ddaef1ba5d8d3d1c4672ad88347e47793ddd115461dbe9','a235e09e8d11a39f21b8e4cfccca617b116fd9114385e643eb92b2aab3c4e93f']],
  ['base',['f0b4dae3fa6a70ee5aadd81bfca567fcf3a2beab2d881c2c77847d349309300d','af74c55d5dfdafaba705b201c5597391449c31e0ba4d224f9887434183cb4389']],
  ['decimaux',['78111e80017b5c8be6d37f1c8c771678669091e96c4f5104f0e684930a0a0dd3','aac6a840255581dedd229bb3437f9ee6d562b1a9cdb03a45d705ee65e0cf8353']],
  ['pourcentages',['78111e80017b5c8be6d37f1c8c771678669091e96c4f5104f0e684930a0a0dd3','d722a4ad3d9f905f55936397939f744931c87ef07e7b340225dc84ff614ea18b']],
  ['impression-noir-blanc',['4b3dca4be37c6752502ade3b08db6fb8a9ea554116e501200e450d4b9fbc1f1b','b03664a908fb4d84f66278768026312fb4a94ea62cd870df230f2c57da4b340a']]
]);
for(const preset of fractionWall?.presets||[]){
  for(const correctionState of [false,true]){
    const actual=hash(fractionWall.render(preset.data,correctionState));
    if(actual!==fractionWallHashes.get(preset.id)?.[correctionState?1:0]) fail(`Le mur de fractions ${preset.id} a changé (${actual}).`);
  }
}
if(!fractionWall?.presets.find(preset=>preset.id==='compact')?.supports.includes('phone')) fail('Le mur compact doit être déclaré compatible téléphone.');
if(fractionWall?.presets.find(preset=>preset.id==='base')?.supports.includes('phone')) fail('Le mur de base dense ne doit pas être proposé tel quel sur téléphone.');
const wallUpTo24=fractionWall?.render({denominators:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]},true)||'';
if((wallUpTo24.match(/<rect x="28"/g)||[]).length!==24) fail('Le mur doit savoir générer les 24 lignes du générateur public.');

const algebraTiles=registry?.get('algebra.algebra-tiles');
if(!algebraTiles) fail('Le composant algebra.algebra-tiles est absent.');
if(algebraTiles&&algebraTiles.version!=='1.0.0') fail('Version 1.0.0 attendue pour les tuiles algébriques.');
if(algebraTiles&&algebraTiles.presets.length!==7) fail('Sept compositions de tuiles algébriques sont attendues.');
if(algebraTiles&&context.algebraTiles!==algebraTiles.render) fail('Le point d’entrée algebraTiles doit utiliser le composant enregistré.');
const algebraTileHashes=new Map([
  ['legende',['c9d9d492ad466668f604b23be129f7ef7bd7ad45eb7609f86d70d811c4c524b3','d22f0376760c96013b4f71897dc52e4dd8e8fb270b4e049f66fc3ff144b4e818']],
  ['expression-simple',['8981ea68ece003ba978fcf7b8681a58909dea21a513fd4a7a67cb3d84c592536','d68e5baab03b6b7261792da4393b8feb45c62c86fc5e978f34054fdfb8b85e82']],
  ['expression-mixte',['49105e163fb0abe933961930ce6be4f44e1a9f57a7e0238933c51be36f3e3be0','c6f04f2fffb915782f3833139705958444b3ab75670999076f32f99f6aaec02c']],
  ['reduire',['a9c9e7337d30bf8809facb5578341e9013e9ec434db962bdceef4cd477ff2dab','43e98dcc3f822ff2bd1ff4f92ae6c19ba5f714281fcc03930bff5f035984b321']],
  ['palette-bleu-jaune',['f0576db16b58d591dee80fd90e762029b789d070e0156827cc0292953a7df4b7','80f515006ee0eed5e3a3291494d53cb8eb11322041a81d8b4cc4ba5db7cd068a']],
  ['palette-mathigon',['a73bc967d39740536ce35e1a48503d4d972f5a528f9f8237031c257b7498e103','14425fbe34f5c7bec318131ae086267875fa4952c0aaac44d167146bc230c820']],
  ['palette-noir-gris',['ceb64ee8e220eb00d5444803be1524bfe6cd4b07222efd8f5dea25c66cbb668a','c10f124023b7d5097914bbe96ceb6f27528755b90284d601654c665dfc433c17']]
]);
for(const preset of algebraTiles?.presets||[]){
  if(!preset.supports.includes('phone')||!preset.supports.includes('print')) fail(`Les tuiles ${preset.id} doivent fonctionner sur téléphone et à l’impression.`);
  for(const correctionState of [false,true]){
    const actual=hash(algebraTiles.render(preset.data,correctionState));
    if(actual!==algebraTileHashes.get(preset.id)?.[correctionState?1:0]) fail(`Les tuiles ${preset.id} ont changé (${actual}).`);
  }
}
const mathigonTiles=algebraTiles?.render({theme:'mathigon',terms:[{kind:'x2',count:1,sign:1},{kind:'x',count:1,sign:1},{kind:'u',count:1,sign:1},{kind:'x',count:1,sign:-1}]},false)||'';
for(const color of ['#2F8FC9','#72C475','#FFE64C','#EF3F35']) if(!mathigonTiles.includes(color)) fail(`La palette Mathigon doit conserver la couleur ${color}.`);

const areaModel=registry?.get('algebra.area-model');
if(!areaModel) fail('Le composant algebra.area-model est absent.');
if(areaModel&&areaModel.version!=='1.2.0') fail('Version 1.2.0 attendue pour le modèle d’aire.');
if(areaModel&&areaModel.presets.length!==7) fail('Sept modèles d’aire de référence sont attendus.');
if(areaModel&&context.areaModel!==areaModel.render) fail('Le point d’entrée areaModel doit utiliser le composant enregistré.');
const areaModelHashes=new Map([
  ['double-positive',['22fdc804ca2491e23462ddbcf67518aea8c5dbc061f620882672145841431102','f918a1ec9052b50fea9498b249c95cfc4df6b591fb8e272379669df0dfc5754a']],
  ['double-seconde',['07caeae4186b64543ea7094be196b63ed7aaeaa60837c7b07f97d74482e5184d','ae7cc01d5b7b60f416010675c910f6feae8f227b87993f74282d0e54aa918671']],
  ['signes-mixtes',['0e39d89890703f7109c29755c86595e0d3aaba4f53477160c8aa542386f48407','b4701461da332feb7e69d988b8100d9a1d0110f51a6c51ba79dd807ffdc567f2']],
  ['coefficient-x',['18e25c8ef3ba3aa3ca37dbd799ea167ce24f9e8a36e59bfaf8140043221ee565','29e64a6a7d3b403df24ccef30fa7d1f62751b1db6637e868cca22256bd55983f']],
  ['factoriser-cinq',['17e19f146e5b278ca35ba64ba67ae31cdfee6c39f2807318284462ddaf831ad1','0604d0164d8830401d5adea4999243c603c3fad8c994d03d5bd8bf03af5a4734']],
  ['factoriser-quatre',['f7c2477dc9ab15ff9b792e137e8cf58fe60b9231425516ce24c65c96626b0242','ecdfe2338a99572f8dd68ca0ba8c57420ecd5d7f85c38dddef35df41543ed234']]
]);
for(const preset of areaModel?.presets||[]){
  if(!preset.supports.includes('phone')||!preset.supports.includes('print')) fail(`Le modèle d’aire ${preset.id} doit fonctionner sur téléphone et à l’impression.`);
  for(const correctionState of [false,true]){
    const actual=hash(areaModel.render(preset.data,correctionState));
    const expected=areaModelHashes.get(preset.id)?.[correctionState?1:0];
    if(expected&&actual!==expected) fail(`Le modèle d’aire ${preset.id} a changé (${actual}).`);
  }
}
const decimalArea=areaModel?.render({style:'table',compact:true,interactive:true,rows:[{coefficient:4,power:0},{coefficient:.7,power:0}],columns:[{coefficient:4,power:0}]},false)||'';
if((decimalArea.match(/data-distributive-slot=/g)||[]).length!==2||!decimalArea.includes('0,7')) fail('Le tableau décimal doit proposer deux cases tactiles et écrire la virgule française.');
const mixedAreaQuestion=areaModel?.render(areaModel.presets.find(preset=>preset.id==='signes-mixtes').data,false)||'';
const mixedAreaCorrection=areaModel?.render(areaModel.presets.find(preset=>preset.id==='signes-mixtes').data,true)||'';
if(mixedAreaQuestion.includes('#12A886')||mixedAreaQuestion.includes('#EF4B43')) fail('La question du modèle d’aire doit laisser les cases à compléter.');
if(!mixedAreaCorrection.includes('#12A886')||!mixedAreaCorrection.includes('#EF4B43')) fail('La correction à signes mixtes doit afficher les tuiles positives et négatives.');

const relationTiles=registry?.get('algebra.relation-tiles');
if(!relationTiles) fail('Le composant algebra.relation-tiles est absent.');
if(relationTiles&&relationTiles.version!=='1.0.0') fail('Version 1.0.0 attendue pour les jetons de relations.');
if(relationTiles&&relationTiles.presets.length!==7) fail('Sept compositions de jetons de relations sont attendues.');
if(relationTiles&&context.relationTilesHtml!==relationTiles.render) fail('Le moteur doit utiliser le composant partagé des jetons de relations.');
const relationTileHashes=new Map([
  ['double','76eb4280119ba1d2c239dc181dfeccc3f256f0d221977e501d53fc06ec1a55d4'],
  ['triple','d9f6db8330c0450b498f1ce19486cab915a2ff24bf420da4fa2f3d5d52465e06'],
  ['moitie','0f482393de34cd7eef3eb4479cf5a79a6a867236e317596df14d9d0c1d170927'],
  ['quart','dea9ae268344ddd775c3014c010483b94f31d99f6b56960c39aef5d287bb5ad2'],
  ['predecesseur','55f875c948f63b75a5208bdab020952559cd0680d8c179a6c7998a79dcba7066'],
  ['successeur','67f51d381b22a40733571eb0a93aeef5c2e46b5d299f6849cbb540afc557da86'],
  ['carre','d3c079db5cb6f6bf9ebbadc8f432a0103116d9b7e3f33d6c5d1ea0433663264d']
]);
for(const preset of relationTiles?.presets||[]){
  for(const correction of [false,true]){
    const actual=hash(relationTiles.render(preset.data,correction));
    if(actual!==relationTileHashes.get(preset.id)) fail(`Les jetons de relations ${preset.id} ont changé (${actual}).`);
  }
}
if(questionEngine.includes('function relationTileUnit')||questionEngine.includes('function relationTilesHtml')) fail('Les jetons de relations ne doivent plus être définis dans le gros moteur.');
const fractionPercentCases = fractionPercent ? [
  {data:{kind:'fraction',numerator:1,denominator:2,total:24,part:12},expected:['e7ed02d1d7bc0c5561c255ee20340a5717e8de933cf508ef3a2d56e06a1a4344','481a00fa9299aa393a5690c38e667f81bd7c28ba925edf0b146edb5c02a2b982']},
  {data:{kind:'fraction',numerator:3,denominator:4,total:28,part:7},expected:['294dc47d73c37ecb749fbb71cb17f88f38b691cb26bd13b981fcc9ee02f29d66','4283eb568a67213fb5fa2b3df2fdba03cf6ae195d1067d6a8eef6d8e892dd4b3']},
  {data:{kind:'fraction',numerator:5,denominator:8,total:40,part:5},expected:['13f77fd27af0493dbc9a8bb7788cd95a231d056ac1d7eea39aa0d894757bab2b','5fc2a12759cb568197f8c7c7c8275275d7e4e948f3359675ccc9483df9305fc6']},
  {data:{kind:'percent',percent:50,denominator:2,total:80,part:40},expected:['410afc3483aa4456b1efe886e6952e91d531edabf4407bdd57b387c47ad12b83','f9ebeb78197cc353463ccce8e5ae32bfd411a08c605827890c6f260246d9f995']},
  {data:{kind:'percent',percent:25,denominator:4,total:60,part:15},expected:['9a58d02288096f6a05c8df1aa3c04643aae81f6d1d9db9b6e4c0bc4fc8ef9c85','d2a0cd6b3507161cad5233386b3d18175120737a09db385030491b1628dde055']},
  {data:{kind:'percent',percent:10,denominator:10,total:230,part:23},expected:['ffd0d90ceffef4b33a102e8c16ed28abf329960513c056fe4121549516e5cc67','aa35e0b53385b5cc93285e9f9e86feeb73b5354e10135ea8eeeaba92a8717dec']},
  {data:{kind:'percent',percent:1,denominator:100,total:300,part:3},expected:['f47242753f69311859dca965d554ffa140eb5a177e66c12566e9e5c2d9d48ef3','07fcb170613fc934b46e0bdfaf573b6856154662093b22e2a5bf68aebae3e7e4']}
] : [];
for (const testCase of fractionPercentCases) {
  for (const correction of [false,true]) {
    const actual=hash(fractionPercent.render(testCase.data,correction));
    if(actual!==testCase.expected[correction?1:0]) fail(`Un schéma fraction/pourcentage a changé (${actual}).`);
  }
}

const catalogueHtml = fs.readFileSync(new URL('auto/dev/visual-library.html', root), 'utf8');
for(const path of visualSources.filter(path=>!path.endsWith('/00-registry.js'))){
  const catalogueSource='../'+path.slice('auto/'.length);
  if(!catalogueHtml.includes(catalogueSource)) fail(`Le catalogue ne charge pas ${catalogueSource}.`);
}
const indexHtml = fs.readFileSync(new URL('auto/index.html', root), 'utf8');
if(indexHtml.includes('scripts/shared/visuals/data/cartesian-graph.js')) fail('Le graphique cartésien préparé doit rester hors du moteur avant comparaison des gabarits.');
const moduleManifest = fs.readFileSync(new URL('auto/scripts/00-module-manifest.js', root), 'utf8');
const slideshow = fs.readFileSync(new URL('auto/scripts/03-slideshow.js', root), 'utf8');
if (!slideshow.includes('@media(min-width:1200px){.answer-dock .answer-body{display:block;position:relative;padding:0 195px}')) fail('Le bouton Suivant doit utiliser le même ancrage à droite pour tous les modes sur ordinateur.');
if (slideshow.includes('.answer-dock.qcm-mode .dock-actions{grid-template-columns:')||slideshow.includes('.answer-dock.qcm-mode .dock-actions{position:absolute')) fail('Le QCM ne doit plus déplacer ni redimensionner le bouton Suivant.');
if(!slideshow.includes('thales-structured-mode')||!slideshow.includes('courseThalesTemplateVisual')||!slideshow.includes('thales-course-table')) fail('Les diapositives structurées et le gabarit progressif de cours Thalès doivent être présents.');
if (/function setupPlaceValueTools\s*\(/.test(slideshow)) fail('Le contrôleur du glisse-nombre ne doit plus être défini dans le diaporama.');
if (!slideshow.includes('${setupPlaceValueTools.toString()}')) fail('La fenêtre d’entraînement doit recevoir le contrôleur partagé du glisse-nombre.');
const registryPosition = indexHtml.indexOf('scripts/shared/visuals/00-registry.js');
const numberLinePosition = indexHtml.indexOf('scripts/shared/visuals/numbers/number-line.js');
const orderCardsPosition = indexHtml.indexOf('scripts/shared/visuals/numbers/order-cards.js');
const placeValuePosition = indexHtml.indexOf('scripts/shared/visuals/numbers/place-value-table.js');
const coordinatePosition = indexHtml.indexOf('scripts/shared/visuals/geometry/coordinate-plane.js');
const angleVocabularyPosition = indexHtml.indexOf('scripts/shared/visuals/geometry/angle-vocabulary.js');
const squareAreaPosition = indexHtml.indexOf('scripts/shared/visuals/numbers/square-area.js');
const numberLineModuleDeclared = moduleManifest.includes("file:'scripts/modules/numbers/dnb_14.js'");
const coordinateModuleDeclared = moduleManifest.includes("file:'scripts/modules/geometry/dnb_15.js'");
const manifestPosition = indexHtml.indexOf('scripts/00-module-manifest.js');
const relationPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/relation-bar.js');
const fractionPercentPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/fraction-percent-bar.js');
const equalSharingPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/equal-sharing-board.js');
const fractionWallPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/fraction-wall.js');
const conversionPosition = indexHtml.indexOf('scripts/shared/visuals/measures/conversion-table.js');
const componentPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/equation-splat.js');
const inquiryPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/inquiry-bar.js');
const algebraTilesPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/algebra-tiles.js');
const areaModelPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/area-model.js');
const relationTilesPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/relation-tiles.js');
const triangleAnglePosition = indexHtml.indexOf('scripts/shared/visuals/geometry/triangle-angle-sum.js');
const pythagorasMillPosition = indexHtml.indexOf('scripts/shared/visuals/geometry/pythagoras-mill.js');
const pythagorasBarPosition = indexHtml.indexOf('scripts/shared/visuals/geometry/pythagoras-bar.js');
const pythagorasReasoningPosition = indexHtml.indexOf('scripts/shared/visuals/geometry/pythagoras-reasoning.js');
const pythagorasBuilderPosition = indexHtml.indexOf('scripts/shared/visuals/geometry/pythagoras-builder.js');
const solidPosition = indexHtml.indexOf('scripts/shared/visuals/geometry/solid.js');
const setupIconsPosition = indexHtml.indexOf('scripts/00-setup-icons.js');
const enginePosition = indexHtml.indexOf('scripts/02-question-engine.js');
if (registryPosition < 0 || manifestPosition < registryPosition || numberLinePosition < registryPosition || orderCardsPosition < registryPosition || placeValuePosition < registryPosition || coordinatePosition < registryPosition || angleVocabularyPosition < registryPosition || squareAreaPosition < registryPosition || !numberLineModuleDeclared || !coordinateModuleDeclared || relationPosition < registryPosition || fractionPercentPosition < registryPosition || equalSharingPosition < registryPosition || fractionWallPosition < registryPosition || conversionPosition < registryPosition || componentPosition < registryPosition || inquiryPosition < registryPosition || algebraTilesPosition < registryPosition || areaModelPosition < registryPosition || relationTilesPosition < registryPosition || triangleAnglePosition < registryPosition || pythagorasMillPosition < registryPosition || pythagorasBarPosition < registryPosition || pythagorasReasoningPosition < registryPosition || pythagorasBuilderPosition < registryPosition || solidPosition < registryPosition || setupIconsPosition < 0 || enginePosition < setupIconsPosition || enginePosition < componentPosition || enginePosition < inquiryPosition || enginePosition < algebraTilesPosition || enginePosition < areaModelPosition || enginePosition < relationTilesPosition || enginePosition < relationPosition || enginePosition < fractionPercentPosition || enginePosition < equalSharingPosition || enginePosition < fractionWallPosition || enginePosition < conversionPosition || enginePosition < orderCardsPosition || enginePosition < placeValuePosition || enginePosition < squareAreaPosition || enginePosition < angleVocabularyPosition || enginePosition < triangleAnglePosition || enginePosition < pythagorasMillPosition || enginePosition < pythagorasBarPosition || enginePosition < pythagorasReasoningPosition || enginePosition < pythagorasBuilderPosition || enginePosition < solidPosition) {
  fail('Le registre et ses composants doivent être chargés avant le moteur de questions.');
}

for(const component of components){
  for(const preset of component.presets||[]){
    for(const correction of [false,true]){
      try{
        const rendered=component.render(preset.data,correction);
        if(typeof rendered!=='string'||!rendered.trim()) fail(`Le préréglage ${component.id}/${preset.id} ne produit aucun rendu.`);
      }catch(error){
        fail(`Le catalogue ne peut pas rendre ${component.id}/${preset.id} : ${error.message}`);
      }
    }
  }
}

if (!process.exitCode) {
  console.log('OK — registre cohérent, 27 composants visuels dont 7 familles de solides ; les références existantes restent figées.');
}
