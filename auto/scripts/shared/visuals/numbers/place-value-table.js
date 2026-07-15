(function registerPlaceValueTable(global){
  function placeValueFormat(value){
    if(typeof value==='number'){
      if(Math.abs(value-Math.round(value))<1e-9) return String(Math.round(value)).replace('.',',');
      return String(Number(value.toFixed(6))).replace('.',',');
    }
    return String(value).replace('.',',');
  }
  function placeValueEscape(value){
    return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function placeValueDigits(value,columnCount=7,unitsIndex=3){
    const cells=Array(columnCount).fill('');
    const normalized=placeValueFormat(Math.abs(Number(value))).replace(/\s/g,'').replace(',','.');
    const parts=normalized.split('.'),integer=(parts[0]||'0').replace(/^\+/,''),decimals=parts[1]||'';
    [...integer].reverse().forEach((digit,offset)=>{const index=unitsIndex-offset;if(index>=0&&index<columnCount)cells[index]=digit;});
    [...decimals].forEach((digit,offset)=>{const index=unitsIndex+1+offset;if(index>=0&&index<columnCount)cells[index]=digit;});
    return cells;
  }
  function placeValueTableHtml(data,correction=false){
    const labels=['milliers','centaines','dizaines','unités','dixièmes','centièmes','millièmes'];
    const digits=placeValueDigits(data.value);
    const shift=correction?data.shift:0;
    const headers=labels.map(label=>'<div class="place-value-head">'+label+'</div>').join('');
    const windows=labels.map(()=>'<div class="place-value-window"></div>').join('');
    const fixed=digits.map((digit,index)=>'<span class="place-value-fixed-digit'+(index===3?' is-units-digit':'')+'">'+digit+'</span>').join('');
    const strip=Array(13).fill(0).map(()=>'<span class="place-value-strip-digit"></span>').join('');
    const instruction=correction
      ? '<strong>'+placeValueFormat(data.value)+' '+data.symbol+' '+data.factor+' = '+placeValueFormat(data.result)+'</strong>'
      : '';
    return '<div class="place-value-tool" data-base-digits="'+placeValueEscape(digits.join('|'))+'" data-target-shift="'+data.shift+'" data-initial-shift="'+shift+'">'
      +'<div class="place-value-grid">'
        +'<div class="place-value-head-row">'+headers+'</div>'
        +'<div class="place-value-preview-row"><div class="place-value-strip-viewport"><div class="place-value-strip">'+strip+'</div></div><div class="place-value-window-row">'+windows+'</div><span class="place-value-comma place-value-preview-comma" aria-hidden="true">,</span><div class="place-value-drag-bar" tabindex="0" role="slider" aria-label="Faire glisser la bandelette" aria-valuemin="-3" aria-valuemax="3" aria-valuenow="'+shift+'"><span></span></div></div>'
        +'<div class="place-value-fixed-row">'+fixed+'<span class="place-value-comma place-value-fixed-comma" aria-hidden="true">,</span></div>'
      +'</div><div class="place-value-row-labels"><span>Résultat obtenu</span><span>Nombre de départ</span></div>'
      +(instruction?'<div class="place-value-tool-note">'+instruction+'</div>':'')+'</div>';
  }

  const presets=Object.freeze([
    {id:'fois-dix',label:'Multiplier par 10',data:{value:3.07,factor:10,shift:1,result:30.7,symbol:'×'}},
    {id:'fois-mille',label:'Multiplier par 1 000',data:{value:0.84,factor:1000,shift:3,result:840,symbol:'×'}},
    {id:'divise-dix',label:'Diviser par 10',data:{value:72,factor:10,shift:-1,result:7.2,symbol:'÷'}},
    {id:'divise-cent',label:'Diviser par 100',data:{value:45.8,factor:100,shift:-2,result:0.458,symbol:'÷'}},
    {id:'divise-mille',label:'Diviser par 1 000',data:{value:125,factor:1000,shift:-3,result:0.125,symbol:'÷'}}
  ].map(item=>Object.freeze({id:item.id,label:item.label,data:Object.freeze(item.data)})));

  global.MATHSGO_VISUALS.register('numbers.place-value-table',{
    version:'1.0.0',
    label:'Tableau de numération',
    family:'Nombres',
    description:'Bande de chiffres déplaçable devant une virgule fixe pour multiplier ou diviser par 10, 100 ou 1 000.',
    presets,
    render:placeValueTableHtml
  });
  global.placeValueToolHtml=placeValueTableHtml;
})(globalThis);
