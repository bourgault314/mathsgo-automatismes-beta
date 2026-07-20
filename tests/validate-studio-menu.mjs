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

if(!styles.includes('.app{max-width:620px}')) fail('Le menu bêta doit reprendre la largeur de 620 px validée dans le Studio sur ordinateur.');
if(!styles.includes('width:min(100%,620px)')) fail('La barre de lancement doit suivre la largeur de 620 px du menu.');
if(!styles.includes('.controls-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))')) fail('Les quatre réglages doivent reprendre la grille 2 × 2 du Studio sur ordinateur.');
if(!styles.includes('grid-template-columns:minmax(0,1fr) minmax(0,1fr)')) fail('Les quatre réglages doivent rester en grille 2 × 2.');
for(const mobileScale of ['.logo{height:50px}', 'min-height:44px', '.theme-icon{width:36px;height:36px}', 'min-height:62px']){
  if(!styles.includes(mobileScale)) fail('Le menu mobile doit agrandir les deux blocs à l’échelle de la version normale.');
}
if(styles.includes('.segment-btn:hover:not(:disabled){background:#fff}')) fail('Un choix actif ne doit jamais blanchir à cause d’un survol tactile persistant.');
if(!styles.includes('.segment-btn:not(.is-active):not([aria-pressed="true"]):hover:not(:disabled)')) fail('Le survol clair doit être réservé aux choix inactifs.');
if(!styles.includes('grid-template-columns:repeat(2,minmax(0,1fr));gap:7px 10px')) fail('Les automatismes doivent revenir sur deux colonnes sur ordinateur.');
if(!styles.includes('.setup-action-bar .generate-action{min-width:0;min-height:48px;padding:11px 26px;border:0;border-radius:999px;background:#f58220')) fail('Le bouton de lancement doit utiliser un orange uni et calme.');
if(!index.includes('<span class="revision-badge">BÊTA · V1.25</span>')) fail('Le numéro de la bêta doit rester visible dans l’en-tête.');
if(index.includes('class="dnb-context-heading"')||index.includes('class="dnb-context-icon"')) fail('La calculatrice barrée ne doit plus agrandir le titre du bloc 1.');
if(!index.includes('class="segment-dnb-calculator"')||!index.includes('class="dnb-launch-context"')) fail('Le mode DNB doit afficher une calculatrice dans le choix ordinateur et près du lancement.');
if(!styles.includes('.segment-dnb-calculator{position:absolute')||!styles.includes('opacity:0;visibility:hidden')) fail('La calculatrice du choix DNB doit être réservée hors du flux pour ne provoquer aucun déplacement.');
if(!styles.includes('body.is-dnb-level .dnb-launch-context{opacity:1;visibility:visible}')) fail('La calculatrice de lancement doit dépendre explicitement du niveau DNB actif.');
if(!index.includes("document.body.classList.toggle('is-dnb-level',level?.value==='DNB')")||!index.includes("new MutationObserver(sync).observe(dnbButton")) fail('Quitter DNB doit masquer immédiatement la calculatrice, sans attendre une autre action.');
if(!styles.includes('.segment-dnb-note,.segment-dnb-calculator,.segment-btn-dnb.is-active .segment-dnb-calculator')) fail('Le choix DNB mobile doit rester compact, sans sous-libellé ni calculatrice.');
if(!index.includes("globalThis.selectVisible?.(true);this.blur()")||!styles.includes('.bulk-actions button:hover:not(:disabled),.bulk-actions button:active:not(:disabled){border-color:#cfdcee;background:#fff')) fail('Les actions Tous et Aucun ne doivent pas conserver une couleur tactile trompeuse.');
if(!styles.includes('.theme-select-all:has(input:checked)')) fail('Tout sélectionner dans un domaine ne doit être coloré que lorsque sa case est cochée.');

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
