import fs from 'node:fs';

const root=new URL('../',import.meta.url);
const index=fs.readFileSync(new URL('auto/index.html',root),'utf8');
const slideshow=fs.readFileSync(new URL('auto/scripts/03-slideshow.js',root),'utf8');
const app=fs.readFileSync(new URL('auto/scripts/04-app.js',root),'utf8');

const fail=message=>{
  console.error(`ÉCHEC — ${message}`);
  process.exitCode=1;
};

function cacheVersion(file){
  const escaped=file.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const match=index.match(new RegExp(`src=["']${escaped}\\?v=([^"']+)["']`));
  return match&&match[1];
}

const slideshowVersion=cacheVersion('scripts/03-slideshow.js');
const appVersion=cacheVersion('scripts/04-app.js');

for(const [label,source] of [['diaporama',slideshow],['lanceur',app]]){
  try{
    new Function(source);
  }catch(error){
    fail(`Le fichier ${label} ne compile pas : ${error.message}`);
  }
}

if(!slideshowVersion||!appVersion) fail('Les deux fichiers du lancement doivent porter une version de cache explicite.');
if(slideshowVersion!==appVersion) fail(`Le diaporama (${slideshowVersion}) et le lanceur (${appVersion}) doivent être renouvelés ensemble.`);

if(app.includes("const targetWindow=window.open('', '_blank');")) fail('Le menu Studio ne doit plus ouvrir une fenêtre séparée.');
if(!app.includes('generateFromDefinition(definition,{sameTab:true});')) fail('Le menu Studio doit lancer la série dans le même onglet.');

if(!slideshow.includes('.solid-visual{width:min(100%,315px);height:clamp(210px,33vh,275px)}')) fail('Les solides doivent conserver leur grand format dans la mise en page téléphone.');
if(!slideshow.includes('.volume-visual{width:min(100%,340px);height:clamp(220px,34vh,285px)')) fail('Les volumes cotés doivent conserver leur grand format dans la mise en page téléphone.');
if(!slideshow.includes('@media(max-width:800px) and (max-height:700px)')) fail('Les solides doivent conserver une variante compacte pour les petits téléphones.');

console.log(`OK — lancement dans le même onglet et cache ${appVersion} cohérents.`);
