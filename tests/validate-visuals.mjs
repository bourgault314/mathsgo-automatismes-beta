import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const visualSources = [
  'auto/scripts/shared/visuals/00-registry.js',
  'auto/scripts/shared/visuals/arithmetic/relation-bar.js',
  'auto/scripts/shared/visuals/algebra/equation-splat.js'
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
if (components.length !== 2) fail(`2 composants visuels attendus, ${components.length} trouvé(s).`);

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

const indexHtml = fs.readFileSync(new URL('auto/index.html', root), 'utf8');
const registryPosition = indexHtml.indexOf('scripts/shared/visuals/00-registry.js');
const relationPosition = indexHtml.indexOf('scripts/shared/visuals/arithmetic/relation-bar.js');
const componentPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/equation-splat.js');
const enginePosition = indexHtml.indexOf('scripts/02-question-engine.js');
if (registryPosition < 0 || relationPosition < registryPosition || componentPosition < registryPosition || enginePosition < componentPosition || enginePosition < relationPosition) {
  fail('Le registre et ses composants doivent être chargés avant le moteur de questions.');
}

if (!process.exitCode) {
  console.log('OK — registre cohérent, 4 rendus équation/Splat et 10 schémas en barres inchangés.');
}
