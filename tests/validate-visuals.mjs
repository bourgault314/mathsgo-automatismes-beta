import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const visualSources = [
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/numbers/number-line.js',
  'auto/scripts/shared/visuals/numbers/place-value-table.js',
  'auto/scripts/shared/visuals/geometry/coordinate-plane.js',
  'auto/scripts/shared/visuals/arithmetic/relation-bar.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-percent-bar.js',
  'auto/scripts/shared/visuals/measures/conversion-table.js',
  'auto/scripts/shared/visuals/algebra/equation-splat.js',
  'auto/scripts/shared/visuals/geometry/thales-configuration.js',
  'auto/scripts/shared/visuals/geometry/triangle-angle-sum.js',
  'auto/scripts/shared/visuals/geometry/pythagoras-mill.js'
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
if (components.length !== 10) fail(`10 composants visuels attendus, ${components.length} trouvé(s).`);

const numberLine = registry?.get('numbers.number-line');
if (!numberLine) fail('Le composant numbers.number-line est absent.');
if (numberLine && numberLine.version !== '1.1.0') fail('Version 1.1.0 attendue pour le composant droite graduée.');
if (numberLine && numberLine.presets.length !== 9) fail('Neuf familles de droites graduées sont attendues.');
if (numberLine && context.numberLineSvg !== numberLine.render) {
  fail('Le module dnb_14 doit utiliser le composant droite graduée enregistré.');
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
const numberLineModule = fs.readFileSync(new URL('auto/scripts/modules/numbers/dnb_14.js', root), 'utf8');
const numberLineCalls = [...numberLineModule.matchAll(/numberLineSvg\(/g)].length;
if (numberLineCalls !== 18) fail(`Les 18 gabarits de dnb_14 doivent utiliser la droite graduée commune (${numberLineCalls} appel(s)).`);
if (numberLineModule.includes('<svg')) fail('dnb_14 ne doit plus embarquer de copie du SVG de droite graduée.');

const coordinatePlane = registry?.get('geometry.coordinate-plane');
if (!coordinatePlane) fail('Le composant geometry.coordinate-plane est absent.');
if (coordinatePlane && coordinatePlane.version !== '1.1.0') fail('Version 1.1.0 attendue pour le repère du plan.');
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
if (questionEngine.includes('function conversionTableHtml') || questionEngine.includes('function conversionTheme')) {
  fail('Le générateur de tableau de conversion ne doit plus être défini dans le gros moteur.');
}

const placeValueTable = registry?.get('numbers.glisse-nombre');
if (!placeValueTable) fail('Le composant numbers.glisse-nombre est absent.');
if (placeValueTable && placeValueTable.version !== '1.1.0') fail('Version 1.1.0 attendue pour le glisse-nombre.');
if (placeValueTable && placeValueTable.presets.length !== 5) fail('Cinq déplacements de référence sont attendus dans le glisse-nombre.');
if (placeValueTable && context.placeValueToolHtml !== placeValueTable.render) {
  fail('Le moteur doit utiliser le glisse-nombre enregistré.');
}
if (placeValueTable && context.setupPlaceValueTools !== placeValueTable.setup) fail('Le contrôleur animé doit appartenir au composant glisse-nombre.');
const placeValueHashes = new Map([
  ['fois-dix', ['2d39510274d85f99451ab578bc05e40d79dd91e44c1788c00567ac650b217159','6724b8e3baa36f5265222268c465dafa4accfe6e7a5391daf66abd434646005f']],
  ['fois-mille', ['d18fa815e34c01fd21452f81ba0dd168ba13445a6136409f8e927cad5614b932','9557415f5da75e0b80322df9d26c58bc8c350b3597c6be1d5194be7776d50efb']],
  ['divise-dix', ['4e2cd998c06fa0a301cb01fde87b9d6d4a21e296825512d193cd763321bd3ae4','163c607570c73dae74abaa72cc48ee5015d00f40e1373bedbb73920e8ba85ea4']],
  ['divise-cent', ['9dbb8f456404a4f7c689e623fd26d2d6915be98dbbfd19e7f729f1c2b85f7adb','0176296bbf02c9e13f8d61da2566f3bd19799e4eb9e6c23a75152c3e86343494']],
  ['divise-mille', ['9b3751ff673c70fd10651d60ad90688df8da997215053c1cab823a514d3c5025','eae9a56e3d85c66a61b5cd5c277415cd8de29093efc9f9a14cb32a3e951057fa']]
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
if (relationBar && relationBar.presets.length !== 5) fail('Cinq préréglages de schémas en barres sont attendus.');
if (relationBar && context.relationBarSvg !== relationBar.render) {
  fail('Le point d’entrée historique relationBarSvg doit utiliser le composant enregistré.');
}
const relationCases = relationBar ? [
  { data: { kind: 'multiple_direct', factor: 2, value: 7, result: 14 }, expected: ['a871998d70900cbd3107e077c667582774609d93c630ce2aa1b4d05b760f4ed9', '0f9bfd51390cf9ddd7537b54b80b34203d3450d6d0bec5df7e7a5a332ff237a2'] },
  { data: { kind: 'multiple_inverse', factor: 3, value: 8, result: 24 }, expected: ['e16d98130bb6711f647d486d1a4d4abed2539368eb1c21e7612ddb324d901fd7', '970cdff01153a337835333e06bc4afa15d153b03c8b5a6c07d1edbb0ccdec173'] },
  { data: { kind: 'fraction_direct', divisor: 4, value: 20, result: 5 }, expected: ['008d9f6dd7a98576aa3f1b2b7fdedbd311c0141826af9d618a54d00fc9738665', 'bc88ea4fd7cb6281b61133b8f5952415a9937ba7839eeec9ec40e1155eaad19a'] },
  { data: { kind: 'predecessor', value: 42, result: 41 }, expected: ['42bc8f235366141b0a40d988c4fab44dbc228393c802a9dfd06ec312a54aa6f2', 'd43c256bb85a59099a7600883dff8cbebc2db6f9b528bba2d212434ac7d73dbd'] },
  { data: { kind: 'successor', value: 42, result: 43 }, expected: ['2fe48065cb63ce3db6a7e5cd4d7ea196fb4bee6809f324039c30526020c8f139', '04408891107e5bf1c4a2ff973c4af1586d6c42c6ecca0a117f7e8b1650a8e1b5'] }
] : [];
for (const testCase of relationCases) {
  for (const revealed of [false, true]) {
    const actual = hash(relationBar.render(testCase.data, revealed));
    if (actual !== testCase.expected[revealed ? 1 : 0]) {
      fail(`Un rendu de schéma en barres a changé (${actual}).`);
    }
  }
}

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
if(triangleAngleSum&&triangleAngleSum.version!=='1.0.0') fail('Version 1.0.0 attendue pour le composant somme des angles.');
if(triangleAngleSum&&triangleAngleSum.presets.length!==6) fail('Six références sont attendues pour la somme des angles.');
if(triangleAngleSum&&context.triangleAngleSumVisual!==triangleAngleSum.render) fail('Le moteur doit utiliser le composant partagé de somme des angles.');
const angleHashes=new Map([
  ['fiche-exemple',['da243f641d4ccd17d833097537ac6e63b2cfd087b764c290138b0a2170291ece','feb0ad91ba5969fc4631535eb8b3ca00a7edc7c8793767ed5bfe119a740dddae']],
  ['triangle-rectangle',['7df5b2d976d3e1f840acd503ae5b4a74c82f674f2d50fd75a6e9b237d00982c2','98e43c821a5c511b78e3109b0c415310346e08bd758410e43d6103933cd79735']],
  ['triangle-isoscele',['f0d3e9b486e1edf39751f64fcb26d752e1cfc8f132e1cc4bf5bf564e8b491346','7ed5a1c98b9e5ea49116580046fdb3f57dd1d5e477b18637c4a980d0c17deb7d']],
  ['triangle-seul',['a6dbb3edd38b416438ecced2c787b32e26ee8b5cddd55dcf7c0a63abfa085390','225a4a97eee258e7e35bee80c0d91800fb80761835ca79384c79d359d2791bc6']],
  ['barre-seule',['cd5e0efc60d986baae93b7904bc6e170354c35037450ece248f8efb71ccc7530','3f51f93fca765cedeacd90335067e46beef43fc7509d0c2421e47b2d99e10836']],
  ['triangle-impossible',['73f9833914f19851e8e12d52f6565181b6038026190cac4db5ee4a12d99be7a5','73f9833914f19851e8e12d52f6565181b6038026190cac4db5ee4a12d99be7a5']]
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

const fractionPercent = registry?.get('arithmetic.fraction-percent-bar');
if (!fractionPercent) fail('Le composant arithmetic.fraction-percent-bar est absent.');
if (fractionPercent && fractionPercent.presets.length !== 7) fail('Sept préréglages fractions/pourcentages sont attendus.');
if (fractionPercent && context.fractionPercentBarSvg !== fractionPercent.render) {
  fail('Le moteur doit utiliser le composant fractions/pourcentages enregistré.');
}
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

const indexHtml = fs.readFileSync(new URL('auto/index.html', root), 'utf8');
const slideshow = fs.readFileSync(new URL('auto/scripts/03-slideshow.js', root), 'utf8');
if (!slideshow.includes('@media(min-width:1200px){.answer-dock .answer-body{display:block;position:relative;padding:0 195px}')) fail('Le bouton Suivant doit utiliser le même ancrage à droite pour tous les modes sur ordinateur.');
if (slideshow.includes('.answer-dock.qcm-mode .dock-actions{grid-template-columns:')||slideshow.includes('.answer-dock.qcm-mode .dock-actions{position:absolute')) fail('Le QCM ne doit plus déplacer ni redimensionner le bouton Suivant.');
if(!slideshow.includes('thales-structured-mode')||!slideshow.includes('courseThalesTemplateVisual')||!slideshow.includes('thales-course-table')) fail('Les diapositives structurées et le gabarit progressif de cours Thalès doivent être présents.');
if (/function setupPlaceValueTools\s*\(/.test(slideshow)) fail('Le contrôleur du glisse-nombre ne doit plus être défini dans le diaporama.');
if (!slideshow.includes('${setupPlaceValueTools.toString()}')) fail('La fenêtre d’entraînement doit recevoir le contrôleur partagé du glisse-nombre.');
const registryPosition = indexHtml.indexOf('scripts/shared/visuals/00-registry.js');
const numberLinePosition = indexHtml.indexOf('scripts/shared/visuals/numbers/number-line.js');
const placeValuePosition = indexHtml.indexOf('scripts/shared/visuals/numbers/place-value-table.js');
const coordinatePosition = indexHtml.indexOf('scripts/shared/visuals/geometry/coordinate-plane.js');
const numberLineModulePosition = indexHtml.indexOf('scripts/modules/numbers/dnb_14.js');
const coordinateModulePosition = indexHtml.indexOf('scripts/modules/geometry/dnb_15.js');
const relationPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/relation-bar.js');
const fractionPercentPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/fraction-percent-bar.js');
const conversionPosition = indexHtml.indexOf('scripts/shared/visuals/measures/conversion-table.js');
const componentPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/equation-splat.js');
const triangleAnglePosition = indexHtml.indexOf('scripts/shared/visuals/geometry/triangle-angle-sum.js');
const pythagorasMillPosition = indexHtml.indexOf('scripts/shared/visuals/geometry/pythagoras-mill.js');
const enginePosition = indexHtml.indexOf('scripts/02-question-engine.js');
if (registryPosition < 0 || numberLinePosition < registryPosition || placeValuePosition < registryPosition || coordinatePosition < registryPosition || numberLineModulePosition < numberLinePosition || coordinateModulePosition < coordinatePosition || relationPosition < registryPosition || fractionPercentPosition < registryPosition || conversionPosition < registryPosition || componentPosition < registryPosition || triangleAnglePosition < registryPosition || pythagorasMillPosition < registryPosition || enginePosition < componentPosition || enginePosition < relationPosition || enginePosition < fractionPercentPosition || enginePosition < conversionPosition || enginePosition < placeValuePosition || enginePosition < triangleAnglePosition || enginePosition < pythagorasMillPosition) {
  fail('Le registre et ses composants doivent être chargés avant le moteur de questions.');
}

if (!process.exitCode) {
  console.log('OK — registre cohérent, 9 droites graduées, 8 repères du plan, 10 états du glisse-nombre, 10 tableaux de conversion, 4 équations/Splats, 24 schémas en barres, 5 configurations de Thalès, 12 états Angles et 8 moulins de Pythagore figés.');
}
