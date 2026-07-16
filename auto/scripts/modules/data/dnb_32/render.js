(function registerReadDataRenderer(global){
  const SVG_NS='http://www.w3.org/2000/svg';
  const AID_SPECS=Object.freeze({
    1:Object.freeze({family:'table-total',caption:'Repère toutes les valeurs de la ligne « livres », puis additionne-les.'}),
    2:Object.freeze({family:'table-compare',caption:'Compare les trois effectifs de la même ligne, dans la même unité.'}),
    3:Object.freeze({family:'bar-read',caption:'Pars de « théâtre », remonte au sommet du bâton, puis suis le trait vers l’axe gradué.'}),
    4:Object.freeze({family:'line-difference',caption:'Lis les températures de lundi et de vendredi, puis calcule : vendredi − lundi.'}),
    5:Object.freeze({family:'pie-part',caption:'Compte les secteurs égaux associés à A, puis compare ce nombre au nombre total de secteurs.'}),
    6:Object.freeze({family:'table-column-total',caption:'Suis la colonne « basket », puis additionne les effectifs des filles et des garçons.'}),
    7:Object.freeze({family:'bar-compare',caption:'Compare les hauteurs des trois bâtons en utilisant la même échelle.'}),
    8:Object.freeze({family:'line-compare',caption:'Compare la hauteur de tous les points en utilisant la même échelle.'}),
    9:Object.freeze({family:'pictogram',caption:'Compte les symboles de la ligne « espagnol », puis multiplie par la valeur d’un symbole.'}),
    10:Object.freeze({family:'table-difference',caption:'Lis les ventes de vendredi et de samedi, puis calcule : samedi − vendredi.'})
  });

  function aidSpecForQuestion(questionNumber){
    return AID_SPECS[Number(questionNumber)]||null;
  }

  function mark(elements,className){
    elements.filter(Boolean).forEach(element=>element.classList.add(className));
  }

  function tableCells(table,rowIndex){
    const row=table&&table.rows&&table.rows[rowIndex];
    return row?Array.from(row.cells):[];
  }

  function guideTable(question,number){
    const table=question.querySelector('table');
    if(!table) return;
    if(number===1){
      mark(tableCells(table,0).slice(1),'read-data-focus-label');
      mark(tableCells(table,1),'read-data-focus-value');
    }else if(number===2){
      mark(tableCells(table,0).slice(1),'read-data-focus-label');
      mark(tableCells(table,1).slice(1),'read-data-compare-value');
    }else if(number===6){
      mark([tableCells(table,0)[2]],'read-data-focus-label');
      mark([tableCells(table,1)[2],tableCells(table,2)[2]],'read-data-focus-value');
    }else if(number===9){
      mark(tableCells(table,1),'read-data-focus-value');
    }else if(number===10){
      mark([tableCells(table,0)[1],tableCells(table,0)[2]],'read-data-focus-label');
      mark([tableCells(table,1)[1],tableCells(table,1)[2]],'read-data-focus-value');
    }
  }

  function numberAttribute(element,name){
    return Number(element&&element.getAttribute(name));
  }

  function polygonTop(polygon){
    const coordinates=String(polygon&&polygon.getAttribute('points')||'')
      .trim().split(/\s+/).map(pair=>pair.split(',').map(Number)).filter(pair=>pair.length===2&&pair.every(Number.isFinite));
    return coordinates.length?Math.min(...coordinates.map(pair=>pair[1])):NaN;
  }

  function polygonLeft(polygon){
    const coordinates=String(polygon&&polygon.getAttribute('points')||'')
      .trim().split(/\s+/).map(pair=>pair.split(',').map(Number)).filter(pair=>pair.length===2&&pair.every(Number.isFinite));
    return coordinates.length?Math.min(...coordinates.map(pair=>pair[0])):NaN;
  }

  function guideLine(svg,x1,x2,y,className='read-data-guide-line'){
    if(![x1,x2,y].every(Number.isFinite)) return;
    const line=global.document.createElementNS(SVG_NS,'line');
    line.setAttribute('x1',String(x1));
    line.setAttribute('x2',String(x2));
    line.setAttribute('y1',String(y));
    line.setAttribute('y2',String(y));
    line.setAttribute('class',className);
    line.setAttribute('aria-hidden','true');
    svg.appendChild(line);
  }

  function labels(svg,names){
    const wanted=new Set(names);
    return Array.from(svg.querySelectorAll('text')).filter(text=>wanted.has(String(text.textContent||'').trim()));
  }

  function shadePie(svg){
    const sectors=[
      'M 130 105 L 60 105 A 70 70 0 0 1 130 35 Z',
      'M 130 105 L 130 175 A 70 70 0 0 1 60 105 Z'
    ];
    sectors.forEach(pathData=>{
      const path=global.document.createElementNS(SVG_NS,'path');
      path.setAttribute('d',pathData);
      path.setAttribute('class','read-data-pie-sector');
      path.setAttribute('aria-hidden','true');
      svg.insertBefore(path,svg.firstChild);
    });
  }

  function completeTemperatureScale(question,number){
    if(number!==4) return;
    const svg=question.querySelector('svg');
    if(!svg||svg.querySelector('[data-read-data-scale-extension]')) return;
    const extension=global.document.createElementNS(SVG_NS,'line');
    extension.setAttribute('x1','50');
    extension.setAttribute('x2','50');
    extension.setAttribute('y1','25');
    extension.setAttribute('y2','50');
    extension.setAttribute('class','read-data-scale-axis');
    extension.setAttribute('data-read-data-scale-extension','1');
    extension.setAttribute('aria-hidden','true');
    svg.appendChild(extension);
    [30,35,40].forEach(value=>{
      const y=225-value*5;
      const hasGrid=Array.from(svg.querySelectorAll('line')).some(line=>numberAttribute(line,'y1')===y&&numberAttribute(line,'y2')===y);
      if(!hasGrid){
        const grid=global.document.createElementNS(SVG_NS,'line');
        grid.setAttribute('x1','45');
        grid.setAttribute('x2','340');
        grid.setAttribute('y1',String(y));
        grid.setAttribute('y2',String(y));
        grid.setAttribute('class','read-data-scale-grid');
        grid.setAttribute('aria-hidden','true');
        svg.appendChild(grid);
      }
      const label=global.document.createElementNS(SVG_NS,'text');
      label.setAttribute('x','40');
      label.setAttribute('y',String(y+4));
      label.setAttribute('font-family','sans-serif');
      label.setAttribute('font-size','13');
      label.setAttribute('text-anchor','end');
      label.setAttribute('class','read-data-scale-label');
      label.textContent=String(value);
      svg.appendChild(label);
    });
  }

  function guideSvg(question,number){
    const svg=question.querySelector('svg');
    if(!svg) return;
    const polygons=Array.from(svg.querySelectorAll('polygon'));
    const circles=Array.from(svg.querySelectorAll('circle'));
    if(number===3){
      const theatre=polygons[1],top=polygonTop(theatre);
      mark([theatre],'read-data-focus-mark');
      mark(labels(svg,['théâtre']),'read-data-focus-label');
      guideLine(svg,50,polygonLeft(theatre),top);
    }else if(number===4){
      const points=[circles[0],circles[4]];
      mark(points,'read-data-focus-point');
      mark(labels(svg,['lun.','ven.']),'read-data-focus-label');
      points.forEach(point=>guideLine(svg,50,numberAttribute(point,'cx'),numberAttribute(point,'cy')));
    }else if(number===5){
      shadePie(svg);
      mark(labels(svg,['A']),'read-data-focus-label');
    }else if(number===7){
      mark(polygons,'read-data-compare-mark');
      mark(labels(svg,['club A','club B','club C']),'read-data-compare-label');
      polygons.forEach(polygon=>guideLine(svg,50,polygonLeft(polygon),polygonTop(polygon),'read-data-guide-line read-data-guide-line-soft'));
    }else if(number===8){
      mark(circles,'read-data-compare-point');
      mark(labels(svg,['lun.','mar.','mer.','jeu.']),'read-data-compare-label');
      circles.forEach(point=>guideLine(svg,30,numberAttribute(point,'cx'),numberAttribute(point,'cy'),'read-data-guide-line read-data-guide-line-soft'));
    }
  }

  function appendAid(question,spec){
    const caption=global.document.createElement('div');
    caption.className='read-data-aid-caption';
    caption.setAttribute('role','note');
    caption.innerHTML='<strong>Chemin de lecture&nbsp;:</strong> '+spec.caption;
    question.appendChild(caption);
  }

  function appendAidPlaceholder(question){
    const placeholder=global.document.createElement('div');
    placeholder.className='visual-placeholder read-data-aid-placeholder';
    question.appendChild(placeholder);
  }

  function renderQuestion({instance,correction,mode,renderGenericQuestion}){
    const number=Number(instance&&instance.q&&instance.q.n),spec=aidSpecForQuestion(number);
    const html=renderGenericQuestion(instance,correction,'with');
    if(!spec||!global.document) return html;
    const shell=global.document.createElement('div');
    shell.innerHTML=html;
    const question=shell.querySelector('.question');
    if(!question) return html;
    question.classList.add('read-data-guided-question');
    completeTemperatureScale(question,number);
    if(mode==='without-essential'){
      appendAidPlaceholder(question);
      return shell.innerHTML;
    }
    guideTable(question,number);
    guideSvg(question,number);
    appendAid(question,spec);
    return shell.innerHTML;
  }

  if(!global.MATHSGO_MODULE_RUNTIME) throw new Error('Le registre fonctionnel doit être chargé avant le rendu dnb_32.');
  global.MATHSGO_MODULE_RUNTIME.register('dnb_32',{
    renderer:{version:'1.0.0',renderQuestion,aidSpecForQuestion}
  });
})(globalThis);
