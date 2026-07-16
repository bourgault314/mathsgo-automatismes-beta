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

for(const helper of ['writePreparationWindow','writePreparationError']){
  const declaration=`function ${helper}(`;
  if(!app.includes(declaration)) fail(`${helper} doit rester dans le même fichier que generate().`);
  if(slideshow.includes(declaration)) fail(`${helper} ne doit plus dépendre du chargement du diaporama.`);
}

if(!app.includes("const targetWindow=window.open('', '_blank');")) fail('Le lanceur doit ouvrir la nouvelle fenêtre pendant le geste utilisateur.');
if(!app.includes('writePreparationWindow(targetWindow);')) fail('La fenêtre ouverte doit afficher immédiatement son état de préparation.');

console.log(`OK — lancement atomique et cache ${appVersion} cohérent.`);
