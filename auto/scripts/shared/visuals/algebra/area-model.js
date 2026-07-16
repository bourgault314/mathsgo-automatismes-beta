(function registerAreaModel(global){
  function escapeHtml(value){
    return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function termLabel(term){
    const coefficient=Number(term.coefficient),power=Number(term.power)||0,absolute=Math.abs(coefficient),variable=power===2?'x²':(power===1?'x':'');
    if(!variable)return String(coefficient);
    const magnitude=absolute===1?variable:absolute+variable;
    return coefficient<0?'-'+magnitude:magnitude;
  }
  function signedLabel(term,index){
    const label=termLabel(term);
    return index>0&&Number(term.coefficient)>0?'+ '+label:label.replace('-','- ');
  }
  function product(a,b){return {coefficient:Number(a.coefficient)*Number(b.coefficient),power:(Number(a.power)||0)+(Number(b.power)||0)};}
  function text(x,y,value,size=22,weight=750,fill='#222222',anchor='middle'){
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" font-family="Cambria Math,Times New Roman,serif" font-size="${size}" font-style="italic" font-weight="${weight}" fill="${fill}">${escapeHtml(value)}</text>`;
  }
  function heading(x,y,value,size=24){
    return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="900" fill="#17283f">${escapeHtml(value)}</text>`;
  }
  function tileProduct(cx,cy,term,cellW,cellH){
    const coefficient=Number(term.coefficient),power=Number(term.power),positive=coefficient>=0,fill=positive?'#12A886':'#EF4B43',count=Math.abs(coefficient),unitLabel=positive?(power===2?'x²':power===1?'x':'1'):(power===2?'-x²':power===1?'-x':'-1');
    if(power===2){
      const shown=Math.min(4,Math.max(1,count)),cols=Math.min(2,shown),rows=Math.ceil(shown/cols),size=Math.min(72,(cellW*.7-(cols-1)*6)/cols,(cellH*.74-(rows-1)*6)/rows),startX=cx-(cols*size+(cols-1)*6)/2,startY=cy-(rows*size+(rows-1)*6)/2;
      let body='';
      for(let index=0;index<shown;index++){const col=index%cols,row=Math.floor(index/cols),x=startX+col*(size+6),y=startY+row*(size+6);body+=`<rect x="${x+3}" y="${y+3}" width="${size}" height="${size}" fill="rgba(0,0,0,.11)"/><rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${fill}" stroke="#111" stroke-width="2"/>${text(x+size/2,y+size/2,unitLabel,Math.min(18,size*.24),800)}`;}
      return body;
    }
    if(power===1){
      const bars=Math.min(8,Math.max(1,count)),barW=Math.min(cellW*.58,116),barH=Math.min(22,(cellH*.74-(bars-1)*4)/bars),startY=cy-(bars*barH+(bars-1)*4)/2;
      let body='';
      for(let index=0;index<bars;index++){const y=startY+index*(barH+4);body+=`<rect x="${cx-barW/2+2}" y="${y+2}" width="${barW}" height="${barH}" fill="rgba(0,0,0,.11)"/><rect x="${cx-barW/2}" y="${y}" width="${barW}" height="${barH}" fill="${fill}" stroke="#111" stroke-width="1.6"/>${text(cx,y+barH/2,unitLabel,Math.max(7,Math.min(13,barH*.64)),800)}`;}
      return body;
    }
    const shown=Math.min(20,Math.max(1,count)),cols=Math.min(6,shown),rows=Math.ceil(shown/cols),size=Math.min(23,(cellW*.68-(cols-1)*5)/cols,(cellH*.68-(rows-1)*5)/rows),startX=cx-(cols*size+(cols-1)*5)/2,startY=cy-(rows*size+(rows-1)*5)/2;
    let body='';
    for(let index=0;index<shown;index++){const col=index%cols,row=Math.floor(index/cols),x=startX+col*(size+5),y=startY+row*(size+5);body+=`<rect x="${x+2}" y="${y+2}" width="${size}" height="${size}" fill="rgba(0,0,0,.11)"/><rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${fill}" stroke="#111" stroke-width="1.4"/>${text(x+size/2,y+size/2,unitLabel,Math.max(7,Math.min(12,size*.52)),800)}`;}
    return body;
  }
  function factorLabel(terms){
    return terms.map((term,index)=>signedLabel(term,index)).join(' ').replace(/^\+\s*/,'');
  }

  function areaModel(data,correction=false){
    const rows=(Array.isArray(data.rows)&&data.rows.length?data.rows:[{coefficient:1,power:1},{coefficient:3,power:0}]).map(term=>({coefficient:Number(term.coefficient),power:Number(term.power)||0}));
    const columns=(Array.isArray(data.columns)&&data.columns.length?data.columns:[{coefficient:1,power:1},{coefficient:4,power:0}]).map(term=>({coefficient:Number(term.coefficient),power:Number(term.power)||0}));
    const gridX=160,gridY=100,gridW=560,gridH=230,headerW=82,headerH=54,cellW=gridW/columns.length,cellH=gridH/rows.length,style=data.style==='table'?'table':'tiles';
    let body=heading(380,27,data.title||'Modèle d’aire');
    body+=`<rect x="${gridX-headerW}" y="${gridY-headerH}" width="${headerW}" height="${headerH}" fill="#fff" stroke="#333" stroke-width="1.7"/>${text(gridX-headerW/2,gridY-headerH/2,'×',22,800)}`;
    columns.forEach((term,index)=>{const x=gridX+index*cellW;body+=`<rect x="${x}" y="${gridY-headerH}" width="${cellW}" height="${headerH}" fill="${style==='table'?'#e9e9e9':'#fff'}" stroke="#333" stroke-width="1.7"/>${text(x+cellW/2,gridY-headerH/2,signedLabel(term,index),20,800)}`;});
    rows.forEach((term,index)=>{const y=gridY+index*cellH;body+=`<rect x="${gridX-headerW}" y="${y}" width="${headerW}" height="${cellH}" fill="${style==='table'?'#e9e9e9':'#fff'}" stroke="#333" stroke-width="1.7"/>${text(gridX-headerW/2,y+cellH/2,signedLabel(term,index),20,800)}`;});
    rows.forEach((rowTerm,row)=>columns.forEach((columnTerm,column)=>{
      const x=gridX+column*cellW,y=gridY+row*cellH,term=product(rowTerm,columnTerm);
      body+=`<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${style==='table'?'#f3f3f3':'#fff'}" stroke="#333" stroke-width="1.7" ${style==='table'&&column?'stroke-dasharray="5 5"':''}/>`;
      if(correction) body+=style==='tiles'?tileProduct(x+cellW/2,y+cellH/2,term,cellW,cellH):text(x+cellW/2,y+cellH/2,termLabel(term),22,850);
    }));
    const rowFactor=factorLabel(rows),columnFactor=factorLabel(columns),products=rows.flatMap(row=>columns.map(column=>product(row,column))),developed=products.map((term,index)=>signedLabel(term,index)).join(' '),answer=data.answer||`(${rowFactor})(${columnFactor}) = ${developed}`;
    if(correction)body+=`<rect x="125" y="338" width="510" height="56" rx="12" fill="#fff8f2" stroke="#f6a13a" stroke-width="2"/>${text(380,366,answer,21,800)}`;
    return `<div class="area-model-help"><svg class="area-model-svg" viewBox="0 0 760 410" role="img" aria-label="Modèle d’aire pour la distributivité ou la factorisation">${body}</svg></div>`;
  }

  const supports=Object.freeze(['phone','computer','projection','print']);
  const preset=(id,label,data)=>Object.freeze({id,label,supports,data:Object.freeze(data)});
  const presets=Object.freeze([
    preset('double-positive','Double distributivité · (x + 3)(x + 4)',{rows:[{coefficient:1,power:1},{coefficient:3,power:0}],columns:[{coefficient:1,power:1},{coefficient:4,power:0}],answer:'(x + 3)(x + 4) = x² + 4x + 3x + 12'}),
    preset('double-seconde','Double distributivité · (x + 2)(x + 5)',{rows:[{coefficient:1,power:1},{coefficient:2,power:0}],columns:[{coefficient:1,power:1},{coefficient:5,power:0}],answer:'(x + 2)(x + 5) = x² + 5x + 2x + 10'}),
    preset('signes-mixtes','Double distributivité · (x - 6)(x + 3)',{rows:[{coefficient:1,power:1},{coefficient:-6,power:0}],columns:[{coefficient:1,power:1},{coefficient:3,power:0}],answer:'(x - 6)(x + 3) = x² + 3x - 6x - 18'}),
    preset('coefficient-x','Double distributivité · (2 - x)(x + 1)',{rows:[{coefficient:2,power:0},{coefficient:-1,power:1}],columns:[{coefficient:1,power:1},{coefficient:1,power:0}],answer:'(2 - x)(x + 1) = 2x + 2 - x² - x'}),
    preset('factoriser-cinq','Factoriser · 5x + 20',{style:'table',title:'Retrouver le facteur commun',rows:[{coefficient:5,power:0}],columns:[{coefficient:1,power:1},{coefficient:4,power:0}],answer:'5x + 20 = 5(x + 4)'}),
    preset('factoriser-quatre','Factoriser · 32 - 4x',{style:'table',title:'Retrouver le facteur commun',rows:[{coefficient:4,power:0}],columns:[{coefficient:8,power:0},{coefficient:-1,power:1}],answer:'32 - 4x = 4(8 - x)'})
  ]);

  if(!global.MATHSGO_VISUALS)throw new Error('Le registre MATHSGO_VISUALS doit être chargé avant area-model.js.');
  global.MATHSGO_VISUALS.register('algebra.area-model',{
    version:'1.0.0',
    label:'Modèle d’aire — distributivité et factorisation',
    family:'Algèbre',
    description:'Génère les facteurs en bordure, les produits partiels et les tuiles ou cases grises des modèles d’aire du livret.',
    viewBox:'0 0 760 410',
    presets,
    render:areaModel
  });
  global.areaModel=areaModel;
})(globalThis);
