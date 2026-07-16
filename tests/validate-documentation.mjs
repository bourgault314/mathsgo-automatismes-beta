import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), 'utf8').replace(/\r\n/g, '\n');
const fail = message => {
  console.error(`ÉCHEC — ${message}`);
  process.exitCode = 1;
};

const protocolPath = 'docs/PROTOCOLE-AUTOMATISMES-MATHSGO.md';
const protocol = read(protocolPath);
const agents = read('AGENTS.md');
const docsIndex = read('docs/README.md');
const rootReadme = read('README.md');
const decimalDecisions = read('docs/DECIMAUX-AUTOMATISMES.md');

const requiredHeadings = [
  '## Méthode permanente',
  '## Finalité pédagogique',
  '## QCM et distracteurs',
  '## Cours et questions',
  "## Statut d'une représentation visuelle",
  '## Stabilité de la mise en page',
  '## Modes tactile, interactif et diaporama',
  '## Règles particulières au téléphone',
  '## Bibliothèque visuelle et réutilisation',
  '## Vérification avant validation',
  '## Clôture et publication',
  '## Journal de décision'
];

for (const heading of requiredHeadings) {
  if (!protocol.includes(heading)) {
    fail(`La section obligatoire « ${heading} » manque dans ${protocolPath}.`);
  }
}

const requiredRules = [
  'analyse → proposition → validation pédagogique →',
  'cours reste disponible en modes « Avec aide » et « Sans aide »',
  '`essential`',
  '`optional`',
  '`aid-only`',
  '`none`',
  'sans glisser-déposer',
  '390 × 844',
  '1280 × 720',
  "Un travail testé n'est pas encore un travail publié"
];

for (const rule of requiredRules) {
  if (!protocol.includes(rule)) {
    fail(`La règle structurante « ${rule} » a disparu de ${protocolPath}.`);
  }
}

if (!agents.includes(protocolPath)) {
  fail(`AGENTS.md doit imposer la lecture de ${protocolPath}.`);
}

if (!docsIndex.includes('PROTOCOLE-AUTOMATISMES-MATHSGO.md')) {
  fail('L’index documentaire doit pointer vers le protocole canonique.');
}

if (!docsIndex.includes('DECIMAUX-AUTOMATISMES.md') ||
    !protocol.includes('DECIMAUX-AUTOMATISMES.md')) {
  fail('Les décisions propres aux décimaux doivent être reliées depuis l’index et le protocole.');
}

for (const decision of ['douze familles', '2 + 2 + 3 + 3', 'toucher une carte, puis toucher une case', 'Somme de nombres décimaux relatifs']) {
  if (!decimalDecisions.includes(decision)) {
    fail(`La décision décimale « ${decision} » a disparu de la fiche dédiée.`);
  }
}

if (!rootReadme.includes('docs/README.md') || !rootReadme.includes(protocolPath)) {
  fail('Le README principal doit rendre visibles l’index et le protocole.');
}

if (!process.exitCode) {
  console.log('Documentation canonique vérifiée.');
}
