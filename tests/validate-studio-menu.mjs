import fs from 'node:fs';

const root=new URL('../',import.meta.url);
const read=path=>fs.readFileSync(new URL(path,root),'utf8');
const index=read('auto/index.html');
const styles=read('auto/styles/setup.css');
const engine=read('auto/scripts/02-question-engine.js');
const app=read('auto/scripts/04-app.js');

const fail=message=>{
  console.error(`ÉCHEC — ${message}`);
  process.exitCode=1;
};

if(!styles.includes('.app{max-width:620px}')) fail('Le menu branché doit conserver la largeur de 620 px du Studio.');
if(!styles.includes('grid-template-columns:minmax(0,1fr) minmax(0,1fr)')) fail('Les quatre réglages doivent rester en grille 2 × 2.');
if(index.includes('revision-badge')) fail('Le badge de version ne doit pas modifier la façade reprise du Studio.');
if(!index.includes('segment-dnb-calculator')) fail('Le choix DNB doit conserver la calculatrice barrée du Studio.');

const modulesStart=index.indexOf('<section class="modules-card"');
const credit=index.indexOf('<details class="credit">',modulesStart);
const modulesEnd=index.indexOf('</section>',modulesStart);
if(modulesStart<0||credit<modulesStart||credit>modulesEnd) fail('Les crédits doivent rester intégrés dans la carte des automatismes.');

if(!engine.includes('const MODULE_SELECTION_MEMORY=new Set();')) fail('La sélection doit être mémorisée entre les réglages.');
if(!engine.includes('input.checked=MODULE_SELECTION_MEMORY.has(m.id);')) fail('Le menu reconstruit doit restaurer les choix mémorisés.');
if(!app.includes('generateFromDefinition(definition,{sameTab:true});')) fail('Le lancement doit rester dans le même onglet.');

if(!index.includes('id="openSeriesButton"')||!index.includes('id="shareButton"')) fail('Ouvrir une série et Partager doivent rester présents dans le code.');
if(!styles.includes('.setup-tools{display:none')||!styles.includes('.share-action{display:none')) fail('Les fonctions expérimentales doivent être cachées par défaut.');
if(!styles.includes('html.share-test .setup-tools{display:flex}')||!styles.includes('html.share-test .share-action{display:block}')) fail('Le mode ?partage=1 doit pouvoir réafficher les fonctions expérimentales.');

if(!process.exitCode) console.log('OK — menu Studio branché, mémoire des choix et fonctions cachées préservées.');
