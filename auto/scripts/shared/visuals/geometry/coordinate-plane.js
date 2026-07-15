(function registerCoordinatePlane(global){
  function svgEscape(value){
    return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
  }
  function coordinatePlaneSvg(data){
    const lines=['<svg xmlns="http://www.w3.org/2000/svg" width="400" height="auto" viewBox="0 0 400 400" style="max-width:380px">'];
    if(data?.halfSteps){
      lines.push('<g stroke="#eee" stroke-width="1">');
      for(let y=60;y<=340;y+=40) lines.push(`<line x1="40" y1="${y}" x2="360" y2="${y}"/>`);
      for(let x=60;x<=340;x+=40) lines.push(`<line x1="${x}" y1="40" x2="${x}" y2="360"/>`);
      lines.push('</g>');
    }
    lines.push('<g stroke="#ccc" stroke-width="1">');
    [40,80,120,160,240,280,320,360].forEach(y=>lines.push(`<line x1="40" y1="${y}" x2="360" y2="${y}"/>`));
    [40,80,120,160,240,280,320,360].forEach(x=>lines.push(`<line x1="${x}" y1="40" x2="${x}" y2="360"/>`));
    lines.push('</g>');
    lines.push('<line x1="40" y1="200" x2="370" y2="200" stroke="#222" stroke-width="1.5"/>');
    lines.push('<polygon points="370,200 360,195 360,205" fill="#222"/>');
    lines.push('<line x1="200" y1="360" x2="200" y2="30" stroke="#222" stroke-width="1.5"/>');
    lines.push('<polygon points="200,30 195,40 205,40" fill="#222"/>');
    [[80,'-3'],[120,'-2'],[160,'-1'],[240,'1'],[280,'2'],[320,'3']].forEach(([x,label])=>lines.push(`<text x="${x}" y="218" font-family="sans-serif" font-size="14" text-anchor="middle">${label}</text>`));
    [[85,'3'],[125,'2'],[165,'1'],[245,'-1'],[285,'-2'],[325,'-3']].forEach(([y,label])=>lines.push(`<text x="186" y="${y}" font-family="sans-serif" font-size="14" text-anchor="end">${label}</text>`));
    lines.push('<text x="190" y="218" font-family="sans-serif" font-size="14" text-anchor="end">0</text>');
    (data?.points||[]).forEach(point=>{
      const x=svgEscape(point.x),y=svgEscape(point.y),color=svgEscape(point.color||'#c0392b'),label=svgEscape(point.label||'M');
      lines.push(`<g class="coordinate-point-marker" transform="translate(${x} ${y})" stroke="${color}" stroke-width="3.2" stroke-linecap="round"><line x1="-7" y1="0" x2="7" y2="0"/><line x1="0" y1="-7" x2="0" y2="7"/></g>`);
      lines.push(`<text x="${x}" y="${y}" dx="10" dy="-7" font-family="serif" font-style="italic" font-size="20" fill="${color}">${label}</text>`);
    });
    lines.push('</svg>');
    return lines.join('\n');
  }

  const presets=Object.freeze([
    {id:'point',label:'Un point',data:{points:[{x:280,y:120,label:'M'}]}},
    {id:'axe',label:'Point sur un axe',data:{points:[{x:200,y:80,label:'M'}]}},
    {id:'deux-points',label:'Deux points',data:{points:[{x:120,y:120,label:'M'},{x:280,y:280,label:'N',color:'#2471a3'}]}},
    {id:'demi-unites',label:'Demi-unités',data:{halfSteps:true,points:[{x:260,y:140,label:'M'}]}}
  ].map(item=>Object.freeze({id:item.id,label:item.label,data:Object.freeze({halfSteps:Boolean(item.data.halfSteps),points:Object.freeze(item.data.points.map(Object.freeze))})})));

  global.MATHSGO_VISUALS.register('geometry.coordinate-plane',{
    version:'1.0.0',
    label:'Repère du plan',
    family:'Géométrie',
    description:'Repère orthonormé avec graduations lisibles, origine décalée, points colorés et demi-unités optionnelles.',
    presets,
    render:coordinatePlaneSvg
  });
  global.coordinatePlaneSvg=coordinatePlaneSvg;
})(globalThis);
