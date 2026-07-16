(function registerPythagorasBuilder(global){
  const registry=global.MATHSGO_VISUALS;
  if(!registry) throw new Error('Le registre visuel doit être chargé avant geometry.pythagoras-builder.');

  const COLORS=Object.freeze({navy:'#0b3570',blue:'#e1eeff',teal:'#1daeae',orange:'#ff9114',softOrange:'#ffeed7',green:'#e0f6e5'});
  const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

  function model(data={}){
    const rightAngle=['A','B','C'].includes(data.rightAngle)?data.rightAngle:'A';
    const geometry={
      A:{points:{A:[70,168],B:[70,42],C:[294,168]},hypotenuse:'BC',legA:'AB',legB:'AC',marker:'M70 145H93V168'},
      B:{points:{A:[70,168],B:[70,42],C:[294,42]},hypotenuse:'AC',legA:'AB',legB:'BC',marker:'M70 66H94V42'},
      C:{points:{A:[70,168],B:[294,168],C:[294,42]},hypotenuse:'AB',legA:'AC',legB:'BC',marker:'M270 168V144H294'}
    }[rightAngle];
    const lengths=Object.assign({legA:3,legB:4,hypotenuse:5},data.lengths||{});
    const sideValues={};
    sideValues[geometry.legA]=Number(lengths.legA);
    sideValues[geometry.legB]=Number(lengths.legB);
    sideValues[geometry.hypotenuse]=Number(lengths.hypotenuse);
    const relation=[geometry.hypotenuse+'²',geometry.legA+'²',geometry.legB+'²'];
    const areas=relation.map(label=>String(sideValues[label.slice(0,2)]**2));
    const task=['relation','areas','complete'].includes(data.task)?data.task:'complete';
    const expected=task==='relation'?relation:(task==='areas'?areas:[...relation,...areas]);
    return {...geometry,rightAngle,lengths,sideValues,relation,areas,task,expected,prompt:String(data.prompt||'Complète la relation de Pythagore.')};
  }

  function triangleMarkup(current){
    const polygon=['A','B','C'].map(letter=>current.points[letter].join(',')).join(' ');
    const vertices=['A','B','C'].map(letter=>{
      const [x,y]=current.points[letter];
      const dx=letter==='A'?-22:letter==='B'?-20:9;
      const dy=letter==='B'?-9:23;
      return `<text x="${x+dx}" y="${y+dy}" font-family="Cambria Math,Times New Roman,serif" font-size="22" font-style="italic" font-weight="750" fill="${COLORS.navy}">${letter}</text>`;
    }).join('');
    const sideLabel=(name,color,offsetX,offsetY)=>{
      const first=current.points[name[0]],second=current.points[name[1]];
      return `<text x="${(first[0]+second[0])/2+offsetX}" y="${(first[1]+second[1])/2+offsetY}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="15" font-weight="800" fill="${color}">${name} = ${escapeHtml(current.sideValues[name])} cm</text>`;
    };
    return `<svg class="pythagoras-builder-triangle" viewBox="0 0 365 215" role="img" aria-label="Triangle ABC rectangle en ${current.rightAngle}">
      <polygon points="${polygon}" fill="#f8fbff" stroke="${COLORS.navy}" stroke-width="3"/>
      <path d="${current.marker}" fill="none" stroke="${COLORS.navy}" stroke-width="3"/>
      ${vertices}
      ${sideLabel(current.legA,'#1170bc',-27,0)}
      ${sideLabel(current.legB,COLORS.orange,0,21)}
      ${sideLabel(current.hypotenuse,'#087a55',0,-13)}
    </svg>`;
  }

  function slot(index,group,value=''){
    const filled=value!=='';
    return `<button class="pythagoras-builder-slot${filled?' filled':''}" type="button" data-pythagoras-slot="${index}" data-token-group="${group}" aria-label="Case ${index+1}">${filled?escapeHtml(value):'…'}</button>`;
  }

  function equationMarkup(current,correction){
    const labels=correction?current.relation:['','',''];
    const values=correction?current.areas:['','',''];
    const relationStart=0;
    const areaStart=current.task==='complete'?3:0;
    const relation=current.task==='areas'
      ?`<div class="pythagoras-builder-equation is-given"><strong>${escapeHtml(current.relation[0])}</strong><span>=</span><strong>${escapeHtml(current.relation[1])}</strong><span>+</span><strong>${escapeHtml(current.relation[2])}</strong></div>`
      :`<div class="pythagoras-builder-equation">${slot(relationStart,'label',labels[0])}<span>=</span>${slot(relationStart+1,'label',labels[1])}<span>+</span>${slot(relationStart+2,'label',labels[2])}</div>`;
    const areas=current.task==='relation'?'':`<div class="pythagoras-builder-areas"><span class="pythagoras-builder-caption">Aires des carrés</span>${slot(areaStart,'value',values[0])}<span>=</span>${slot(areaStart+1,'value',values[1])}<span>+</span>${slot(areaStart+2,'value',values[2])}</div>`;
    return relation+areas;
  }

  function palette(current){
    const labels=[current.relation[2],current.relation[0],current.relation[1]];
    const values=[current.areas[1],current.areas[2],current.areas[0]];
    const group=(name,title,tokens)=>`<div class="pythagoras-builder-palette" data-pythagoras-palette="${name}"><span class="pythagoras-builder-caption">${title}</span>${tokens.map((token,index)=>`<button class="pythagoras-builder-token ${name}-token" type="button" data-pythagoras-token="${escapeHtml(token)}" data-token-group="${name==='labels'?'label':'value'}" data-token-id="${name}-${index}" aria-label="Placer ${escapeHtml(token)}">${escapeHtml(token)}</button>`).join('')}</div>`;
    return (current.task==='areas'?'':group('labels','Étiquettes',labels))+(current.task==='relation'?'':group('values','Aires',values));
  }

  function render(data={},correction=false){
    const current=model(data);
    const feedback=correction
      ?'<p class="pythagoras-builder-feedback is-success">L’aire du carré construit sur l’hypoténuse est la somme des deux autres.</p>'
      :'<p class="pythagoras-builder-feedback" data-pythagoras-feedback>Touche une étiquette, puis la case où tu veux la placer.</p>';
    return `<div class="pythagoras-builder" data-pythagoras-builder>
      <p class="pythagoras-builder-prompt">${escapeHtml(current.prompt)}</p>
      ${triangleMarkup(current)}
      <div class="pythagoras-builder-work">${equationMarkup(current,correction)}${correction?'':palette(current)}</div>
      ${feedback}
    </div>`;
  }

  const component=registry.register('geometry.pythagoras-builder',{
    version:'1.0.0',
    label:'Pythagore · égalité tactile',
    family:'Géométrie',
    description:'Fait placer tactilement les côtés au carré et les aires correspondantes dans la relation de Pythagore.',
    supports:['phone','computer'],
    presets:[
      {id:'relation',label:'Placer les trois côtés au carré',data:{task:'relation',rightAngle:'A',lengths:{legA:3,legB:4,hypotenuse:5}}},
      {id:'aires',label:'Placer les trois aires',data:{task:'areas',rightAngle:'B',lengths:{legA:5,legB:12,hypotenuse:13}}},
      {id:'complete',label:'Construire la relation complète',data:{task:'complete',rightAngle:'C',lengths:{legA:6,legB:8,hypotenuse:10}}}
    ],
    model,
    render
  });
  global.pythagorasBuilder=component.render;
  global.pythagorasBuilderModel=component.model;
})(globalThis);
