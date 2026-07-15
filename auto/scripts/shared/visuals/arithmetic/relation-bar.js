(function registerRelationBar(global){
  function visualEscapeHtml(value){
    return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function visualFormat(value){
    if(typeof value==='number'){
      if(Math.abs(value-Math.round(value))<1e-9) return String(Math.round(value)).replace('.',',');
      return String(Number(value.toFixed(6))).replace('.',',');
    }
    return String(value).replace('.',',');
  }

  function relationPalette(kind,size){
    if(kind==='multiple'&&size===2) return {fill:'#fff7d6',stroke:'#8a7420'};
    if(kind==='multiple'&&size===3) return {fill:'#fde5eb',stroke:'#9b455f'};
    if(kind==='multiple'&&size===4) return {fill:'#e6f5e4',stroke:'#477a45'};
    if(kind==='fraction'&&size===2) return {fill:'#fff7d6',stroke:'#8a7420'};
    if(kind==='fraction'&&size===4) return {fill:'#e6f5e4',stroke:'#477a45'};
    return {fill:'#e7f1fb',stroke:'#35658c'};
  }

  function relationBarSvg(data,correction=false){
    const x=60,width=640,topY=28,topH=70,bottomY=98,bottomH=70;
    const text=(x,y,value,size=24,weight=800)=>`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" fill="#17283f">${visualEscapeHtml(value)}</text>`;
    let body='';

    if(data.kind==='multiple_direct'||data.kind==='multiple_inverse'){
      const factor=data.factor;
      const palette=relationPalette('multiple',factor);
      const names={2:'LE DOUBLE',3:'LE TRIPLE',4:'LE QUADRUPLE'};
      const cellW=width/factor;
      body+=`<rect x="${x}" y="${topY}" width="${width}" height="${topH}" fill="${palette.fill}" stroke="#222" stroke-width="2"/>`;
      body+=text(x+width/2,topY+topH/2,correction?visualFormat(data.result):names[factor],25,850);
      for(let i=0;i<factor;i++){
        body+=`<rect x="${x+i*cellW}" y="${bottomY}" width="${cellW}" height="${bottomH}" fill="${i===0?palette.fill:'#fff'}" stroke="#222" stroke-width="2" ${i===0?'':'stroke-dasharray="8 6"'}/>`;
        if(correction) body+=text(x+(i+.5)*cellW,bottomY+bottomH/2,visualFormat(data.value),21,800);
      }
      if(!correction) body+=text(x+cellW/2,bottomY+bottomH/2,'la quantité',Math.min(21,Math.max(15,180/cellW*18)),780);
    }

    if(data.kind==='fraction_direct'){
      const divisor=data.divisor;
      const palette=relationPalette('fraction',divisor);
      const names={2:'la moitié',4:'le quart'};
      const cellW=width/divisor;
      body+=`<rect x="${x}" y="${topY}" width="${width}" height="${topH}" fill="${palette.fill}" stroke="#222" stroke-width="2"/>`;
      body+=text(x+width/2,topY+topH/2,correction?visualFormat(data.value):'LE TOUT',25,850);
      for(let i=0;i<divisor;i++){
        body+=`<rect x="${x+i*cellW}" y="${bottomY}" width="${cellW}" height="${bottomH}" fill="${i===0?palette.fill:'#fff'}" stroke="#222" stroke-width="2"/>`;
        if(correction) body+=text(x+(i+.5)*cellW,bottomY+bottomH/2,visualFormat(data.result),divisor===4?20:22,800);
      }
      if(!correction) body+=text(x+cellW/2,bottomY+bottomH/2,names[divisor],divisor===4?18:21,780);
    }

    if(data.kind==='predecessor'||data.kind==='successor'){
      const palette=relationPalette('neighbor',1),unitW=82,mainW=width-unitW;
      const isPredecessor=data.kind==='predecessor';
      const topLabel=correction
        ? visualFormat(isPredecessor?data.value:data.result)
        : (isPredecessor?'LE NOMBRE : '+visualFormat(data.value):'LE SUCCESSEUR');
      const bottomLabel=correction
        ? visualFormat(isPredecessor?data.result:data.value)
        : (isPredecessor?'le prédécesseur':'le nombre : '+visualFormat(data.value));
      body+=`<rect x="${x}" y="${topY}" width="${width}" height="${topH}" fill="${palette.fill}" stroke="#222" stroke-width="2"/>`;
      body+=text(x+width/2,topY+topH/2,topLabel,25,850);
      body+=`<rect x="${x}" y="${bottomY}" width="${mainW}" height="${bottomH}" fill="${palette.fill}" stroke="#222" stroke-width="2"/>`;
      body+=`<rect x="${x+mainW}" y="${bottomY}" width="${unitW}" height="${bottomH}" fill="#fff" stroke="#222" stroke-width="2"/>`;
      body+=text(x+mainW/2,bottomY+bottomH/2,bottomLabel,22,780);
      body+=text(x+mainW+unitW/2,bottomY+bottomH/2,'1',23,850);
    }

    return `<div class="relation-bar-help"><svg class="relation-bar-svg" viewBox="0 0 760 198" role="img" aria-label="Schéma en barres">${body}</svg></div>`;
  }

  const presets=Object.freeze([
    Object.freeze({id:'double',label:'Double',data:Object.freeze({kind:'multiple_direct',factor:2,value:7,result:14})}),
    Object.freeze({id:'triple-inverse',label:'Retrouver la quantité depuis le triple',data:Object.freeze({kind:'multiple_inverse',factor:3,value:8,result:24})}),
    Object.freeze({id:'quart',label:'Quart d’une quantité',data:Object.freeze({kind:'fraction_direct',divisor:4,value:20,result:5})}),
    Object.freeze({id:'predecesseur',label:'Prédécesseur',data:Object.freeze({kind:'predecessor',value:42,result:41})}),
    Object.freeze({id:'successeur',label:'Successeur',data:Object.freeze({kind:'successor',value:42,result:43})})
  ]);

  if(!global.MATHSGO_VISUALS){
    throw new Error('Le registre MATHSGO_VISUALS doit être chargé avant relation-bar.js.');
  }
  global.MATHSGO_VISUALS.register('arithmetic.relation-bar',{
    version:'1.0.0',
    label:'Schéma en barres — relations',
    family:'Arithmétique',
    description:'Représente doubles, triples, fractions d’une quantité et nombres voisins.',
    viewBox:'0 0 760 198',
    presets,
    render:relationBarSvg
  });

  // Compatibilité avec le moteur historique pendant le découpage progressif.
  global.relationBarSvg=relationBarSvg;
})(globalThis);
