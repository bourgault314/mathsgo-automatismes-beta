import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const visualSources = [
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/numbers/number-line.js',
  'auto/scripts/shared/visuals/arithmetic/relation-bar.js',
  'auto/scripts/shared/visuals/arithmetic/fraction-percent-bar.js',
  'auto/scripts/shared/visuals/algebra/equation-splat.js',
  'auto/scripts/shared/visuals/geometry/thales-configuration.js'
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
if (components.length !== 5) fail(`5 composants visuels attendus, ${components.length} trouvé(s).`);

const numberLine = registry?.get('numbers.number-line');
if (!numberLine) fail('Le composant numbers.number-line est absent.');
if (numberLine && numberLine.version !== '1.0.0') fail('Version 1.0.0 attendue pour le composant droite graduée.');
if (numberLine && numberLine.presets.length !== 5) fail('Cinq familles de droites graduées sont attendues.');
if (numberLine && context.numberLineSvg !== numberLine.render) {
  fail('Le module dnb_14 doit utiliser le composant droite graduée enregistré.');
}
const numberLineHashes = new Map([
  ['unite', '9849822d67da6bf91ae191fc146b5fbbab5062c5f4e1eb40e17f3f5c1cb08390'],
  ['relatifs', '33181d27eafe25f16b802ecd378343cf9711375c48419f56615128730d0f3d79'],
  ['fraction', 'd6911fe60a2ea0267c827bc30bcf2cc247ec5ff7a92774d0e979fa06c25dd3fd'],
  ['echelle', 'fb1a0df975801b58bdc8418d0ba40034f4ee646b00206d2d945b78c87a3f7b16'],
  ['deux-points', '4bf638ad01681c48fd61d55091269a85d3a0eae451557a511b90a0e8972b1091']
]);
for (const preset of numberLine?.presets || []) {
  const actual = hash(numberLine.render(preset.data));
  if (actual !== numberLineHashes.get(preset.id)) fail(`La droite graduée ${preset.id} a changé (${actual}).`);
}
const numberLineModule = fs.readFileSync(new URL('auto/scripts/modules/numbers/dnb_14.js', root), 'utf8');
const numberLineCalls = [...numberLineModule.matchAll(/numberLineSvg\(/g)].length;
if (numberLineCalls !== 18) fail(`Les 18 gabarits de dnb_14 doivent utiliser la droite graduée commune (${numberLineCalls} appel(s)).`);
if (numberLineModule.includes('<svg')) fail('dnb_14 ne doit plus embarquer de copie du SVG de droite graduée.');

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
if (thales && thales.presets.length !== 2) fail('Deux configurations de Thalès sont attendues.');
if (thales) {
  const nested = thales.render({ configuration: 'nested' });
  const butterfly = thales.render({ configuration: 'butterfly' });
  if (!nested.includes('stroke-linejoin="miter"') || !butterfly.includes('stroke-linejoin="miter"')) {
    fail('Les sommets des configurations de Thalès doivent rester nets et sans arrondi.');
  }
  if (hash(nested) !== 'c83cd1fcb62876a1fbaa94f6997b04e2a79c09f02f80160e573cd83cc3edc240') fail('La configuration de Thalès emboîtée a changé.');
  if (hash(butterfly) !== '43161c04f1942ea7cbe243cb9fa8a048af45c1ef0e82042b68a655ab95eb3c81') fail('La configuration de Thalès en papillon a changé.');
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
const registryPosition = indexHtml.indexOf('scripts/shared/visuals/00-registry.js');
const numberLinePosition = indexHtml.indexOf('scripts/shared/visuals/numbers/number-line.js');
const numberLineModulePosition = indexHtml.indexOf('scripts/modules/numbers/dnb_14.js');
const relationPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/relation-bar.js');
const fractionPercentPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/fraction-percent-bar.js');
const componentPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/equation-splat.js');
const enginePosition = indexHtml.indexOf('scripts/02-question-engine.js');
if (registryPosition < 0 || numberLinePosition < registryPosition || numberLineModulePosition < numberLinePosition || relationPosition < registryPosition || fractionPercentPosition < registryPosition || componentPosition < registryPosition || enginePosition < componentPosition || enginePosition < relationPosition || enginePosition < fractionPercentPosition) {
  fail('Le registre et ses composants doivent être chargés avant le moteur de questions.');
}

if (!process.exitCode) {
  console.log('OK — registre cohérent, 5 droites graduées, 4 équations/Splats, 24 schémas en barres et 2 configurations de Thalès figés.');
}
