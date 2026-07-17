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
const numberLineDecisions = read('docs/RECHERCHE-PEDAGOGIQUE-DROITES-GRADUEES.md');
const numberLineCorpus = JSON.parse(read('docs/data/eduscol-droites-graduees.json'));
const decimalRelativeDecisions = read('docs/DECIMAUX-RELATIFS-AUTOMATISMES.md');
const equationDecisions = read('docs/EQUATIONS-AUTOMATISMES.md');

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
    !docsIndex.includes('DECIMAUX-RELATIFS-AUTOMATISMES.md') ||
    !protocol.includes('DECIMAUX-AUTOMATISMES.md') ||
    !protocol.includes('DECIMAUX-RELATIFS-AUTOMATISMES.md')) {
  fail('Les décisions propres aux décimaux doivent être reliées depuis l’index et le protocole.');
}

if (!docsIndex.includes('EQUATIONS-AUTOMATISMES.md')) {
  fail('Les décisions propres aux équations doivent être reliées depuis l’index documentaire.');
}
for (const decision of ['équation, on cherche la valeur de l’inconnue', 'même opération effectuée', 'mini-plateau Splat', 'ordinateur reste inchangée', '390 × 844', 'quatre profils', 'au moins 54 px']) {
  if (!equationDecisions.includes(decision)) {
    fail(`La décision Équations « ${decision} » a disparu de la fiche dédiée.`);
  }
}

if (!docsIndex.includes('RECHERCHE-PEDAGOGIQUE-DROITES-GRADUEES.md') ||
    !docsIndex.includes('CORPUS-EDUSCOL-DROITES-GRADUEES.md') ||
    !protocol.includes('eduscol-droites-graduees.json')) {
  fail('Les décisions et le corpus de dnb_14 doivent rester reliés depuis la documentation canonique.');
}

for (const decision of ['Placer un point à une valeur donnée', 'Déterminer explicitement le pas', 'Glisser des étiquettes de valeurs sous des points']) {
  if (!numberLineDecisions.includes(decision)) {
    fail(`La décision de droite graduée « ${decision} » a disparu de la fiche dédiée.`);
  }
}

if (numberLineCorpus.archive?.pdfCount !== 7 || numberLineCorpus.archive?.textExtractCount !== 7 || numberLineCorpus.sources?.length !== 7) {
  fail('Le manifeste matériel Éduscol doit conserver sept PDF et sept extractions texte.');
}
for (const source of numberLineCorpus.sources || []) {
  if (!source.file?.endsWith('.pdf') || !source.textExtract?.endsWith('.txt') || !/^[a-f0-9]{64}$/.test(source.sha256 || '')) {
    fail(`La source Éduscol ${source.id || 'sans identifiant'} doit conserver PDF, extraction et SHA-256.`);
  }
}
if (new Set((numberLineCorpus.sources || []).map(source => source.file)).size !== 7 ||
    new Set((numberLineCorpus.sources || []).map(source => source.textExtract)).size !== 7) {
  fail('Les noms de fichiers du corpus Éduscol doivent rester uniques.');
}

for (const decision of ['Dix familles positives', 'glisser réellement', 'decimal-decomposition', 'Un `1` noir']) {
  if (!decimalDecisions.includes(decision)) {
    fail(`La décision décimale « ${decision} » a disparu de la fiche dédiée.`);
  }
}
for (const decision of ['dnb_02` question 2', 'dnb_02` question 5', 'ancienne `dnb_02` question 8', 'aucune aide artificielle']) {
  if (!decimalRelativeDecisions.includes(decision)) fail(`La trace relative « ${decision} » a disparu de la fiche dédiée.`);
}

if (!rootReadme.includes('docs/README.md') || !rootReadme.includes(protocolPath)) {
  fail('Le README principal doit rendre visibles l’index et le protocole.');
}

if (!process.exitCode) {
  console.log('Documentation canonique vérifiée.');
}
