let rngSeed=1, quiz=[],lastPythagorasVertexSetIndex=-1;
function setSeed(s){
  const value=Number.isFinite(Number(s))?Math.trunc(Number(s)):1;
  rngSeed=((value%233280)+233280)%233280;
  lastPythagorasVertexSetIndex=-1;
  return rngSeed;
}
function rnd(){ rngSeed=(rngSeed*9301+49297)%233280; return rngSeed/233280; }
function RD(a,b,excluded){ let min,max; if(b===undefined){min=0;max=a;} else {min=a;max=b;} let v, tries=0; do{v=Math.floor(rnd()*(max-min+1))+min; tries++;}while(Array.isArray(excluded)&&excluded.includes(v)&&tries<200); return v; }
function pick(arr){ return arr[Math.floor(rnd()*arr.length)]; }
function setNB(n){ return n; }
function GCD(a,b){ a=Math.abs(Math.trunc(a)); b=Math.abs(Math.trunc(b)); while(b){ const t=b; b=a%b; a=t; } return a||1; }
function CUT(x,d){ return Number(Number(x).toFixed(d===undefined?2:d)); }
const MATHS = {floor:Math.floor, ceil:Math.ceil, round:Math.round, sin:Math.sin, cos:Math.cos, tan:Math.tan, atan2:Math.atan2, sqrt:Math.sqrt, abs:Math.abs, pi:Math.PI, PI:Math.PI};
function cleanEvalExpr(expr){ return String(expr).replace(/(\d),(\d)/g,'$1.$2').replace(/\^/g,'**'); }
function evalInScope(expr, scope){
  expr=cleanEvalExpr(expr);
  const target=Object.assign({}, MATHS, {RD,setNB,GCD,CUT}, scope||{});
  const proxy=new Proxy(target,{has:()=>true, get:(t,k)=> k in t ? t[k] : undefined, set:(t,k,v)=>(t[k]=v,true)});
  try{ return Function('scope','with(scope){ return ('+expr+'); }')(proxy); }catch(e){ return expr; }
}
function runCode(code){
  const target=Object.assign({}, MATHS, {RD,setNB,GCD,CUT});
  const proxy=new Proxy(target,{has:()=>true, get:(t,k)=> k in t ? t[k] : undefined, set:(t,k,v)=>(t[k]=v,true)});
  try{ Function('scope','with(scope){ '+code+' }')(proxy); }catch(e){ target.__error=e.message; }
  return target;
}
function fmt(x){ if(typeof x==='number'){ if(Math.abs(x-Math.round(x))<1e-9) return String(Math.round(x)).replace('.',','); return String(Number(x.toFixed(6))).replace('.',','); } return String(x).replace('.',','); }
function resolveAnswerExpression(expression,scope){
  const value=evalInScope(expression,scope);
  return fmt(expandGeneratedValue(value,scope));
}
function parseAnswerChoices(q,scope){
  let arr=[];try{arr=JSON.parse(q.answer||'[]');}catch(e){arr=[];}
  return arr.map(answer=>String(answer).split(';').map(choice=>resolveAnswerExpression(choice.trim(),scope)));
}
function parseAnswer(q,scope){
  return parseAnswerChoices(q,scope).map(choices=>choices[0]||'');
}
function expandGeneratedValue(value, scope){
  if(typeof value!=='string') return fmt(value);
  return value.replace(/\{([A-Za-z_]\w*)\}/g,(m,name)=>
    Object.prototype.hasOwnProperty.call(scope||{},name) ? fmt(scope[name]) : m
  );
}
function subVars(str, scope){
  return String(str||'')
    .replace(/\$\{([^}]+)\}/g,(m,e)=>expandGeneratedValue(evalInScope(e,scope),scope))
    .replace(/\{\{([^{}]+)\}\}/g,(m,e)=>fmt(evalInScope(e,scope)));
}
function isWithoutVisuals(mode){ return mode==='without'||mode==='without-reveal'; }
function visualPlaceholder(mode){ return mode==='without-reveal'?'<div class="visual-placeholder"></div>':''; }
function stripVisuals(html,keepPlaceholder=false){
  const replacement=keepPlaceholder?'<div class="visual-placeholder"></div>':'';
  return String(html||'')
    .replace(/<svg[\s\S]*?<\/svg>/gi,replacement)
    .replace(/<div(?![^>]*visual-placeholder)[^>]*>\s*<\/div>/gi,'');
}

function splitQCM(statement){
  let source=String(statement||'').trim();
  let wrapperStart='',wrapperEnd='';
  const wrapper=source.match(/^<div([^>]*)>([\s\S]*)<\/div>$/i);
  if(wrapper&&wrapper[2].includes('&&')){
    wrapperStart='<div'+wrapper[1]+'>';
    wrapperEnd='</div>';
    source=wrapper[2];
  }
  const parts=source.split('&&');
  if(parts.length<=1) return null;
  const prompt=wrapperStart+parts[0]+wrapperEnd;
  const opts=parts.slice(1).map(s=>s.trim()).filter(Boolean);
  return {prompt,opts};
}
function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function latexCore(s){
  s=String(s ?? '');

  // Environnements alignés utilisés dans les résolutions d'équations.
  s=s.replace(/\\begin\{aligned\}/g,'<span class="aligned-math">')
     .replace(/\\end\{aligned\}/g,'</span>')
     .replace(/\\\\/g,'<br>')
     .replace(/&/g,'');

  // Fractions. Les jetons @@PH...@@ permettent d'y conserver les trous de réponse.
  for(let pass=0; pass<6; pass++){
    s=s.replace(/\\dfrac\{([^{}]+)\}\{([^{}]+)\}/g,'<span class="frac"><span class="frac-num">$1</span><span class="frac-den">$2</span></span>');
    s=s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g,'<span class="frac"><span class="frac-num">$1</span><span class="frac-den">$2</span></span>');
  }

  // Commandes avec un argument.
  s=s.replace(/\\text\{([^{}]*)\}/g,'<span class="math-text">$1</span>')
     .replace(/\\mathcal\{([^{}]+)\}/g,'<span class="mathcal">$1</span>')
     .replace(/\\widehat\{([^{}]+)\}/g,'<span class="widehat">$1</span>');

  // Fonctions, symboles et espacements présents dans les 37 modules.
  s=s.replace(/\\cos/g,'cos')
     .replace(/\\sin/g,'sin')
     .replace(/\\tan/g,'tan')
     .replace(/\\times/g,'×')
     .replace(/\\div/g,'÷')
     .replace(/\\cdot/g,'·')
     .replace(/\\leq/g,'≤')
     .replace(/\\geq/g,'≥')
     .replace(/\\neq/g,'≠')
     .replace(/\\approx/g,'≈')
     .replace(/\\sqrt/g,'√')
     .replace(/\\pi/g,'π')
     .replace(/\\ell/g,'ℓ')
     .replace(/\\circ/g,'°')
     .replace(/\\in/g,'∈')
     .replace(/\\%/g,'%')
     .replace(/\\qquad/g,'<span class="qquad"></span>')
     .replace(/\\quad/g,'<span class="quad"></span>')
     .replace(/\\,/g,' ')
     .replace(/\\;/g,' ');

  // Exposants et indices simples.
  s=s.replace(/\^\{([^{}]+)\}/g,'<sup>$1</sup>')
     .replace(/\^(-?\d+|[A-Za-z])/g,'<sup>$1</sup>')
     .replace(/_\{([^{}]+)\}/g,'<sub>$1</sub>')
     .replace(/_([A-Za-z0-9])/g,'<sub>$1</sub>');

  return s;
}

function renderMathSegments(html){
  html=String(html ?? '');

  // Les blocs mathématiques explicites.
  html=html.replace(/\$\$([\s\S]*?)\$\$/g,(m,expr)=>'<span class="math-display">'+latexCore(expr)+'</span>');

  // Certains choix QCM contiennent du LaTeX sans délimiteur.
  if(!/<svg[\s>]/i.test(html) && /\\(?:d?frac|text|mathcal|widehat|cos|sin|tan|times|div|quad|qquad|sqrt|pi|in)|\\%|\^[{A-Za-z0-9-]|_[{A-Za-z0-9]/.test(html)){
    html='<span class="math-inline">'+latexCore(html)+'</span>';
  }
  return html;
}

function renderPlaceholders(str,answers,mode){
  let answerIndex=0;
  let tokenIndex=0;
  const replacements=new Map();

  function tokenFor(content){
    const token='@@PH'+(tokenIndex++)+'@@';
    replacements.set(token,content);
    return token;
  }

  function nextAnswer(){
    const value=answers[answerIndex]!==undefined ? answers[answerIndex] : (answers[0]||'');
    answerIndex++;
    return String(value);
  }

  function answerSlot(value,small=false){
    const length=Math.max(1,Array.from(String(value)).length);
    const minimum=small?.9:1.05;
    const maximum=small?5:10;
    const width=Math.max(minimum,Math.min(maximum,length*.58+.35));
    const classes='answer-slot'+(small?' answer-slot-small':'')+(mode==='correction'?' answer-slot-filled':'');
    const content=mode==='question'
      ? '<span class="answer-dots">…</span>'
      : '<strong>'+escapeHtml(value)+'</strong>';
    return '<span class="'+classes+'" style="--answer-width:'+width.toFixed(2)+'em">'+content+'</span>';
  }

  let out=String(str||'').replace(/\[\[([^\]]+)\]\]/g,(m,name)=>{
    if(name.includes('qcm')) return '';

    if(name==='dots'){
      return tokenFor(answerSlot(nextAnswer()));
    }

    // Ces deux widgets représentent une fraction complète avec un seul placeholder.
    if(name==='formula_frac' || name==='frac-simp'){
      const num=nextAnswer();
      const den=nextAnswer();
      const n=tokenFor(answerSlot(num,true));
      const d=tokenFor(answerSlot(den,true));
      return '\\dfrac{'+n+'}{'+d+'}';
    }

    return tokenFor(answerSlot(nextAnswer()));
  });

  out=renderMathSegments(out);
  for(const [token,replacement] of replacements){
    out=out.split(token).join(replacement);
  }
  return out;
}
function shuffledQcm(statement, answers){
  const parsed=splitQCM(statement);
  if(!parsed) return {statement,answers};
  const prompt=parsed.prompt;
  const opts=parsed.opts;
  const permutation=opts.map((_,i)=>i);
  for(let i=permutation.length-1;i>0;i--){
    const j=Math.floor(rnd()*(i+1));
    [permutation[i],permutation[j]]=[permutation[j],permutation[i]];
  }
  const shuffled=permutation.map(i=>opts[i]);
  const remapped=answers.map(a=>{
    const oldIndex=Number(a)-1;
    const newIndex=permutation.indexOf(oldIndex);
    return newIndex>=0 ? String(newIndex+1) : String(a);
  });
  return {statement:prompt+'&&'+shuffled.join('&&')+'&&',answers:remapped};
}

function shuffleLocal(arr){
  const out=[...arr];
  for(let i=out.length-1;i>0;i--){
    const j=Math.floor(rnd()*(i+1));
    [out[i],out[j]]=[out[j],out[i]];
  }
  return out;
}
function nzRand(min,max){
  let v=0;
  while(v===0) v=RD(min,max);
  return v;
}
function typeLimit(type){ return type==='x2'?4:5; }
function totalLimit(type){ return type==='x2'?6:(type==='x'?8:10); }
function termLatex(coeff,type,leading=false){
  const sign=coeff<0?'-':(leading?'':'+');
  const a=Math.abs(coeff);
  if(type==='u') return sign+String(a);
  const body=type==='x2'?'𝑥^2':'𝑥';
  return sign+(a===1?'':String(a))+body;
}
function termLabel(coeff,type,leading=false){
  const sign=coeff<0?'−':(leading?'':'+');
  const a=Math.abs(coeff);
  if(type==='u') return sign+String(a);
  const body=type==='x2'?'𝑥²':'𝑥';
  return sign+(a===1?'':String(a))+body;
}
function coeffSums(groups){
  const sums={x2:0,x:0,u:0};
  groups.forEach(g=>{sums[g.type]+=g.coeff;});
  return sums;
}
function expressionLatex(groups){
  return groups.map((g,i)=>termLatex(g.coeff,g.type,i===0)).join('');
}
function reducedLatex(sums){
  const parts=[];
  ['x2','x','u'].forEach(type=>{
    const c=sums[type]||0;
    if(c!==0) parts.push(termLatex(c,type,parts.length===0));
  });
  return parts.length?parts.join(''):'0';
}
function countSigns(groups,type){
  let pos=0,neg=0;
  groups.filter(g=>g.type===type).forEach(g=>{
    if(g.coeff>0) pos+=g.coeff; else neg+=-g.coeff;
  });
  return {pos,neg};
}
function validTileLoad(groups){
  return ['x2','x','u'].every(type=>{
    const c=countSigns(groups,type);
    return c.pos<=totalLimit(type) && c.neg<=totalLimit(type);
  });
}
function distributeGroups(types,count){
  const chosen=[...types];
  while(chosen.length<count) chosen.push(pick(types));
  return shuffleLocal(chosen);
}
function hasCancellation(groups){
  return ['x2','x','u'].some(type=>{
    const c=countSigns(groups,type);
    return c.pos>0 && c.neg>0;
  });
}
function hasRepeatedNature(groups){
  return ['x2','x','u'].some(type=>groups.filter(g=>g.type===type).length>=2);
}

/*
Les six modèles sont strictement équiprobables dans le sac du module :
1. une seule nature, sans annulation ;
2. une seule nature, avec annulation ;
3. plusieurs natures, sans annulation ;
4. plusieurs natures, avec annulation ;
5. lecture de tuiles déjà regroupées.
6. expression déjà réduite, sans termes semblables à regrouper.

Bornes validées :
- coefficient d’un groupe : x² <= 4, x <= 5, unité <= 5 ;
- charge totale par signe : x² <= 6, x <= 8, unité <= 10.
*/

function makeOneNoCancel(){
  const type=pick(['x2','x','u']);
  for(let tries=0;tries<500;tries++){
    const sign=pick([-1,1]);
    const count=RD(2,3);
    const groups=[];
    for(let i=0;i<count;i++){
      groups.push({type,coeff:sign*RD(1,typeLimit(type))});
    }
    if(validTileLoad(groups)) return groups;
  }
  return [{type,coeff:1},{type,coeff:1}];
}

function makeOneCancel(){
  const type=pick(['x2','x','u']);
  for(let tries=0;tries<700;tries++){
    const count=RD(3,4);
    const groups=[];
    for(let i=0;i<count;i++){
      groups.push({type,coeff:nzRand(-typeLimit(type),typeLimit(type))});
    }
    if(hasCancellation(groups) && validTileLoad(groups)) return shuffleLocal(groups);
  }
  return [{type,coeff:2},{type,coeff:-1},{type,coeff:1}];
}

function makeMultiNoCancel(){
  for(let tries=0;tries<700;tries++){
    const typeCount=pick([2,3]);
    const types=shuffleLocal(['x2','x','u']).slice(0,typeCount);
    const groupCount=RD(typeCount+1,Math.min(5,typeCount+2));
    const sequence=distributeGroups(types,groupCount);
    const signs={};
    types.forEach(type=>{signs[type]=pick([-1,1]);});
    const groups=sequence.map(type=>({
      type,
      coeff:signs[type]*RD(1,typeLimit(type))
    }));
    if(hasRepeatedNature(groups) && validTileLoad(groups)) return shuffleLocal(groups);
  }
  return [
    {type:'x2',coeff:1},
    {type:'u',coeff:-2},
    {type:'x2',coeff:2}
  ];
}

function makeMultiCancel(){
  for(let tries=0;tries<1000;tries++){
    const typeCount=pick([2,3]);
    const types=shuffleLocal(['x2','x','u']).slice(0,typeCount);
    const groupCount=RD(Math.max(4,typeCount+1),6);
    const sequence=distributeGroups(types,groupCount);
    const groups=sequence.map(type=>({
      type,
      coeff:nzRand(-typeLimit(type),typeLimit(type))
    }));
    if(hasCancellation(groups) && hasRepeatedNature(groups) && validTileLoad(groups)){
      return shuffleLocal(groups);
    }
  }
  return [
    {type:'x2',coeff:2},
    {type:'x',coeff:-3},
    {type:'x2',coeff:-1},
    {type:'x',coeff:1}
  ];
}

function makeReadCoeffs(){
  const typeCount=pick([1,2,3]);
  const types=shuffleLocal(['x2','x','u']).slice(0,typeCount);
  const coeffs={x2:0,x:0,u:0};
  types.forEach(type=>{
    coeffs[type]=nzRand(-totalLimit(type),totalLimit(type));
  });
  return coeffs;
}

function makeAlreadyReduced(groupCount=null){
  const count=groupCount||pick([2,2,3]);
  const types=shuffleLocal(['x2','x','u']).slice(0,count);
  return shuffleLocal(types.map(type=>({type,coeff:RD(1,typeLimit(type))})));
}

function makeAlreadyReducedQcmGroups(){
  for(let tries=0;tries<100;tries++){
    const groups=makeAlreadyReduced(2);
    const a=groups[0].coeff,b=groups[1].coeff;
    if(a*b!==a+b) return groups;
  }
  return [{type:'u',coeff:2},{type:'x',coeff:3}];
}


function simpleQcmGroups(kind){
  const type=pick(['x','x2']);
  const lim=typeLimit(type);

  if(kind==='one_no_cancel'){
    for(let tries=0;tries<300;tries++){
      const a=RD(1,lim);
      const b=RD(1,lim);
      const groups=[{type,coeff:a},{type,coeff:b}];
      if(validTileLoad(groups)) return groups;
    }
    return [{type,coeff:2},{type,coeff:3}];
  }

  for(let tries=0;tries<300;tries++){
    const b=RD(1,Math.max(1,lim-1));
    const a=RD(b+1,lim);
    const groups=[{type,coeff:a},{type,coeff:-b}];
    if(validTileLoad(groups)) return groups;
  }
  return [{type,coeff:4},{type,coeff:-2}];
}

function qcmPowerError(coefficient,type){
  const a=Math.abs(coefficient);
  const sign=coefficient<0?'-':'';
  const body=type==='x2'?'𝑥^4':'𝑥^2';
  return sign+(a===1?'':String(a))+body;
}

function qcmSamePower(coefficient,type){
  const sums={x2:0,x:0,u:0};
  sums[type]=coefficient;
  return reducedLatex(sums);
}

function qcmMonomial(coefficient,power){
  const sign=coefficient<0?'-':'';
  const a=Math.abs(coefficient);
  if(power===0) return sign+String(a);
  const body=power===1?'𝑥':'𝑥^'+power;
  return sign+(a===1?'':String(a))+body;
}

function qcmProductError(a,b,type){
  return qcmMonomial(a*b,type==='x2'?4:2);
}

function makeAlreadyReducedQcm(groups){
  const powers={u:0,x:1,x2:2};
  const correct=expressionLatex(groups);
  const a=groups[0].coeff,b=groups[1].coeff,sum=a+b;
  const ordered=[...groups].sort((g1,g2)=>powers[g1.type]-powers[g2.type]);
  const low=ordered[0].type,high=ordered[1].type;
  const distractors=[
    qcmSamePower(sum,high),
    low==='u'?String(sum):qcmSamePower(sum,low),
    qcmMonomial(a*b,powers[groups[0].type]+powers[groups[1].type])
  ];
  const unique=[correct];
  distractors.forEach(option=>{if(option!==correct&&!unique.includes(option)) unique.push(option);});
  let bump=1;
  while(unique.length<4){
    const fallback=qcmSamePower(sum+bump,high);
    if(!unique.includes(fallback)) unique.push(fallback);
    bump++;
  }
  const options=shuffleLocal(unique.slice(0,4));
  return {option