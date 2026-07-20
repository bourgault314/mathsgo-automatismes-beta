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

if(!styles.includes('.app{max-width:860px}')) fail('Le menu branché doit utiliser toute la largeur historique de la bêta sur ordinateur.');
if(!styles.includes('width:min(100%,832px)')) fail('La barre de lancement doit suivre la largeur élargie du menu.');
if(!styles.includes('grid-template-columns:minmax(190px,2.2fr) minmax(140px,1.45fr) minmax(180px,2fr) minmax(145px,1.6fr)')) fail('Les quatre réglages doivent occuper une seule ligne sur ordinateur.');
if(!styles.includes('grid-template-columns:minmax(0,1fr) minmax(0,1fr)')) fail('Les quatre réglages doivent rester en grille 2 × 2.');
for(const mobileScale of ['.logo{height:50px}', 'min-height:44px', '.theme-icon{width:36px;height:36px}', 'min-height:62px']){
  if(!styles.includes(mobileScale)) fail('Le menu mobile doit agrandir les deux blocs à l’échelle de la version normale.');
}
if(styles.includes('.segment-btn:hover:not(:disabled){background:#fff}')) fail('Un choix actif ne doit jamais blanchir à cause d’un survol tactile persistant.');
if(!styles.includes('.segment-btn:not(.is-active):not([aria-pressed="true"]):hover:not(:disabled)')) fail('Le survol clair doit être réservé aux choix inactifs.');
if(!styles.includes('grid-template-columns:repeat(2,minmax(0,1fr));gap:7px 10px')) fail('Les automatismes doivent revenir sur deux colonnes sur ordinateur.');
if(!styles.includes('.setup-action-bar .generate-action{min-width:0;min-height:48px;padding:11px 26px;border:0;border-radius:999px;background:#f58220')) fail('Le bouton de lancement doit utiliser un orange uni et calme.');
if(!index.includes('<span class="revision-badge">BÊTA · V1.25</span>')) fail('Le numéro de la bêta doit rester visible dans l’en-tête.');
if(!index.includes('class="dnb-context-heading"')||!index.includes('class="dnb-context-icon"')) fail('La calculatrice barrée doit apparaître hors du choix DNB.');
if(!styles.includes('.settings-card:has(.segment-btn-dnb[aria-pressed="true"]) .dnb-context-heading{display:inline-grid}')) fail('La calculatrice barrée doit apparaître uniquement quand DNB est actif.');

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
