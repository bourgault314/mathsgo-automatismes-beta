(function registerNumberLine(global){
  function svgEscape(value){
    return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
  }
  function numberLineSvg(data){
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

  const presets=Object.freeze([
    {id:'unite',label:'Unité entière',data:{references:[{x:292,label:'0'},{x:350,label:'1'}],points:[{x:176,label:'A'}]}},
    {id:'relatifs',label:'Nombres relatifs',data:{references:[{x:60,label:'-5'},{x:350,label:'0'}],points:[{x:234,label:'A'}]}},
    {id:'fraction',label:'Graduation fractionnaire',data:{references:[{x:292,label:'0'},{x:408,label:'1'}],points:[{x:350,label:'A'}]}},
    {id:'echelle',label:'Échelle variable',data:{references:[{x:176,label:'-20'},{x:466,label:'30'}],points:[{x:350,label:'A'}]}},
    {id:'deux-points',label:'Deux points',data:{references:[{x:292,label:'0'},{x:350,label:'1'}],points:[{x:176,label:'A'},{x:524,label:'B',color:'#7c3aed'}]}}
  ].map(item=>Object.freeze({id:item.id,label:item.label,data:Object.freeze({references:Object.freeze(item.data.references.map(Object.freeze)),points:Object.freeze(item.data.points.map(Object.freeze))})})));

  global.MATHSGO_VISUALS.register('numbers.number-line',{
    version:'1.0.0',
    label:'Droite graduée',
    family:'Nombres',
    description:'Droite graduée commune : unités, nombres relatifs, fractions, échelles variables et plusieurs points.',
    presets,
    render:numberLineSvg
  });
  global.numberLineSvg=numberLineSvg;
})(globalThis);
