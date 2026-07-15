import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const visualSources = [
  'auto/scripts/shared/visuals/00-registry.js',
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
if (components.length !== 1) fail(`1 composant visuel attendu, ${components.length} trouvé(s).`);

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

const indexHtml = fs.readFileSync(new URL('auto/index.html', root), 'utf8');
const registryPosition = indexHtml.indexOf('scripts/shared/visuals/00-registry.js');
const componentPosition = indexHtml.indexOf('scripts/shared/visuals/algebra/equation-splat.js');
const enginePosition = indexHtml.indexOf('scripts/02-question-engine.js');
if (registryPosition < 0 || componentPosition < registryPosition || enginePosition < componentPosition) {
  fail('Le registre et le composant équation/Splat doivent être chargés avant le moteur de questions.');
}

if (!process.exitCode) {
  console.log('OK — registre visuel cohérent et 4 rendus équation/Splat inchangés.');
}
