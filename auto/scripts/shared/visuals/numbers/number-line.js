(function registerNumberLine(global){
  function svgEscape(value){
    return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
  }
  function legacyNumberLineSvg(data){
    const references=Array.isArray(data?.references)?data.references:[];
    const points=Array.isArray(data?.points)?data.points:[];
    const lines=[
      '<svg xmlns="http://www.w3.org/2000/svg" width="680" height="auto" viewBox="0 0 680 120" style="max-width:700px">',
      '<line x1="40" y1="60" x2="640" y2="60" stroke="#222" stroke-width="1.5"/>',
      '<polygon points="640,60 630,55 630,65" fill="#222"/>'
    ];
    for(let i=0;i<10;i++){
      const x=60+i*58;
      lines.push(`<line x1="${x}" y1="52" x2="${x}" y2="68" stroke="#222" stroke-width="1.5"/>`);
    }
    references.forEach(reference=>{
      lines.push(`<text x="${svgEscape(reference.x)}" y="92" font-family="sans-serif" font-size="22" text-anchor="middle">${svgEscape(reference.label)}</text>`);
    });
    points.forEach(point=>{
      const x=svgEscape(point.x);
      const color=svgEscape(point.color||'#2563a6');
      lines.push(`<line x1="${x}" y1="47" x2="${x}" y2="73" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`);
      lines.push(`<text x="${x}" y="36" font-family="serif" font-style="italic" font-size="24" text-anchor="middle" fill="${color}">${svgEscape(point.label)}</text>`);
    });
    lines.push('</svg>');
    return lines.join('\n');
  }

  function cleanNumber(value){
    const rounded=Math.round(Number(value)*1e10)/1e10;
    return Object.is(rounded,-0)?0:rounded;
  }
  function numberLabel(value){
    return String(cleanNumber(value)).replace('.',',');
  }
  function scaledNumberLineSvg(data){
    const min=Number(data.min),max=Number(data.max),step=Math.abs(Number(data.step));
    if(!Number.isFinite(min)||!Number.isFinite(max)||max<=min||!Number.isFinite(step)||step<=0){
      throw new TypeError('Une droite graduée paramétrable exige min < max et un pas strictement positif.');
    }
    const width=Math.max(320,Math.min(1200,Number(data.width)||680));
    const height=Math.max(100,Math.min(220,Number(data.height)||130));
    const left=48,right=width-42,axisEnd=right+12,axisY=Math.round(height*.5);
    const labelEvery=Math.max(1,Math.round(Number(data.labelEvery)||1));
    const minorStep=Math.abs(Number(data.minorStep))||0;
    const span=max-min,toX=value=>left+((value-min)/span)*(right-left);
    const references=Array.isArray(data.references)?data.references:[];
    const points=Array.isArray(data.points)?data.points:[];
    const values=(increment)=>{
      const count=Math.floor(span/increment+1e-8);
      if(count>200) throw new RangeError('La droite graduée est limitée à 200 intervalles.');
      return Array.from({length:count+1},(_,index)=>cleanNumber(min+index*increment)).filter(value=>value<=max+1e-8);
    };
    const lines=[
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="auto" viewBox="0 0 ${width} ${height}" style="max-width:${width}px">`,
      `<line x1="${left-8}" y1="${axisY}" x2="${axisEnd}" y2="${axisY}" stroke="#222" stroke-width="1.5"/>`,
      `<polygon points="${axisEnd},${axisY} ${axisEnd-10},${axisY-5} ${axisEnd-10},${axisY+5}" fill="#222"/>`
    ];
    if(minorStep&&minorStep<step){
      values(minorStep).forEach(value=>{
        const ratio=Math.abs((value-min)/step-Math.round((value-min)/step));
        if(ratio<1e-7)return;
        const x=cleanNumber(toX(value));
        lines.push(`<line x1="${x}" y1="${axisY-5}" x2="${x}" y2="${axisY+5}" stroke="#52606d" stroke-width="1"/>`);
      });
    }
    values(step).forEach((value,index)=>{
      const x=cleanNumber(toX(value));
      lines.push(`<line x1="${x}" y1="${axisY-9}" x2="${x}" y2="${axisY+9}" stroke="#222" stroke-width="1.5"/>`);
      if(data.autoLabels!==false&&index%labelEvery===0){
        lines.push(`<text x="${x}" y="${axisY+33}" font-family="sans-serif" font-size="16" text-anchor="middle">${svgEscape(numberLabel(value))}</text>`);
      }
    });
    references.forEach(reference=>{
      const value=Number(reference.value);
      if(!Number.isFinite(value)||value<min||value>max)return;
      lines.push(`<text x="${cleanNumber(toX(value))}" y="${axisY+33}" font-family="sans-serif" font-size="16" font-weight="700" text-anchor="middle">${svgEscape(reference.label??numberLabel(value))}</text>`);
    });
    points.forEach(point=>{
      const value=Number(point.value);
      if(!Number.isFinite(value)||value<min||value>max)return;
      const x=cleanNumber(toX(value)),color=svgEscape(point.color||'#2563a6');
      lines.push(`<line x1="${x}" y1="${axisY-14}" x2="${x}" y2="${axisY+14}" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`);
      lines.push(`<text x="${x}" y="${axisY-24}" font-family="serif" font-style="italic" font-size="22" text-anchor="middle" fill="${color}">${svgEscape(point.label||'A')}</text>`);
    });
    lines.push('</svg>');
    return lines.join('\n');
  }
  function numberLineSvg(data={}){
    return data.mode==='scale'||Object.hasOwn(data,'min')?scaledNumberLineSvg(data):legacyNumberLineSvg(data);
  }

  const presets=Object.freeze([
    {id:'unite',label:'Unité entière',supports:['phone','computer','projection','print'],data:{references:[{x:292,label:'0'},{x:350,label:'1'}],points:[{x:176,label:'A'}]}},
    {id:'relatifs',label:'Nombres relatifs',supports:['phone','computer','projection','print'],data:{references:[{x:60,label:'-5'},{x:350,label:'0'}],points:[{x:234,label:'A'}]}},
    {id:'fraction',label:'Graduation fractionnaire',supports:['phone','computer','projection','print'],data:{references:[{x:292,label:'0'},{x:408,label:'1'}],points:[{x:350,label:'A'}]}},
    {id:'echelle',label:'Échelle variable',supports:['phone','computer','projection','print'],data:{references:[{x:176,label:'-20'},{x:466,label:'30'}],points:[{x:350,label:'A'}]}},
    {id:'deux-points',label:'Deux points',supports:['phone','computer','projection','print'],data:{references:[{x:292,label:'0'},{x:350,label:'1'}],points:[{x:176,label:'A'},{x:524,label:'B',color:'#7c3aed'}]}},
    {id:'courte-parametree',label:'Courte · pas de 1',supports:['phone','computer','projection','print'],data:{mode:'scale',min:0,max:5,step:1,width:420,points:[{value:3,label:'A'}]}},
    {id:'longue-decimale',label:'Longue · pas de 0,5',supports:['computer','projection','print'],data:{mode:'scale',min:-2,max:3,step:.5,minorStep:.25,width:820,labelEvery:2,points:[{value:1.5,label:'B',color:'#7c3aed'}]}},
    {id:'centiemes',label:'Zoom · centièmes',supports:['computer','projection','print'],data:{mode:'scale',min:1.2,max:1.3,step:.01,width:760,labelEvery:2,points:[{value:1.27,label:'C'}]}},
    {id:'huitiemes',label:'Fractions · huitièmes',supports:['phone','computer','projection','print'],data:{mode:'scale',min:0,max:1,step:.125,width:680,autoLabels:false,references:[{value:0,label:'0'},{value:1,label:'1'}],points:[{value:.375,label:'D'}]}}
  ].map(item=>Object.freeze({id:item.id,label:item.label,supports:Object.freeze(item.supports),data:Object.freeze(Object.fromEntries(Object.entries(item.data).map(([key,value])=>[key,Array.isArray(value)?Object.freeze(value.map(entry=>Object.freeze(entry))):value])))})));

  global.MATHSGO_VISUALS.register('numbers.number-line',{
    version:'1.1.0',
    label:'Droite graduée',
    family:'Nombres',
    description:'Traceur commun : longueur, bornes, pas principal, sous-graduations, étiquettes et points sont paramétrables. Le mode historique reste figé.',
    presets,
    render:numberLineSvg
  });
  global.numberLineSvg=numberLineSvg;
})(globalThis);
