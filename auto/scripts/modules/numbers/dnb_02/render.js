(function registerDecimalRenderer(global){
  function display(value){
    if(typeof value==='number') return String(Number(value.toFixed(6))).replace('.',',').replace('-','−');
    return String(value??'').replace('.',',').replace('-','−');
  }

  function escapeHtml(value){
    return String(value??'').replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  }

  function card(value){
    return `<button class="decimal-card" type="button" data-decimal-card="${escapeHtml(value)}">${escapeHtml(display(value))}</button>`;
  }

  function slot(index,value='',label='Réponse'){
    const filled=value!==''&&value!==null&&value!==undefined;
    return `<button class="decimal-drop-slot${filled?' is-filled':''}" type="button" data-decimal-slot="${index}" aria-label="${escapeHtml(label)}">${filled?escapeHtml(display(value)):'…'}</button>`;
  }

  function orderBoard(instance,correction=false){
    const scope=instance.scope||{},source=[scope.a,scope.b,scope.c],solution=[scope.mn,scope.md,scope.mx];
    const component=global.MATHSGO_VISUALS&&global.MATHSGO_VISUALS.get('numbers.order-cards');
    const board=component?component.render({values:source,solution},correction):'';
    return `<div class="question">Range ces trois nombres dans l’ordre croissant.</div>${board}`;
  }

  function frameBoard(instance,correction=false){
    const scope=instance.scope||{},component=global.MATHSGO_VISUALS&&global.MATHSGO_VISUALS.get('numbers.number-line');
    const line=component?component.render({mode:'scale',min:Number(scope.low),max:Number(scope.high),step:1,width:560,height:154,axisPadding:.1,autoLabels:false,tickFontSize:21,pointFontSize:28,points:[{value:Number(scope.value),label:display(scope.value),color:'#0b79d0'}]}):'';
    const values=correction?[scope.low,scope.high]:['',''],cards=Array.isArray(scope.frameCards)?scope.frameCards:[scope.low-1,scope.low,scope.high,scope.high+1];
    return `<div class="question">${escapeHtml(instance.rawStatement)}</div><div class="decimal-manipulation decimal-frame-board${correction?' is-correction':''}" data-decimal-manipulation="frame"><div class="decimal-frame-line">${line}<div class="decimal-frame-slots">${slot(0,values[0],'Entier de gauche')}${slot(1,values[1],'Entier de droite')}</div></div><div class="decimal-card-tray decimal-frame-cards" aria-label="Entiers proposés">${cards.map(card).join('')}</div></div>`;
  }

  function complementVisual(instance,correction=false,missing=false){
    const component=global.MATHSGO_VISUALS&&global.MATHSGO_VISUALS.get('arithmetic.fraction-decimal-grid');
    if(!component) return '';
    return component.render({kind:'decimal-complement',filledA:Number(instance.scope.firstTenths),filledB:Number(instance.scope.secondTenths),showSecond:!missing},correction);
  }

  function multiplicationVisual(instance,correction=false,interactive=false){
    const component=global.MATHSGO_VISUALS&&global.MATHSGO_VISUALS.get('algebra.area-model');
    if(!component) return '';
    const scope=instance.scope||{};
    const data={
      style:'decimal-decomposition',compact:true,interactive,
      title:'Décomposer '+display(scope.a)+' × '+display(scope.factor),
      rows:[{coefficient:Number(scope.whole),power:0},{coefficient:Number(scope.tenths),power:0}],
      columns:[{coefficient:Number(scope.factor),power:0}],
      answer:`${display(scope.a)} × ${display(scope.factor)} = ${display(scope.whole)} × ${display(scope.factor)} + ${display(scope.tenths)} × ${display(scope.factor)} = ${display(scope.result)}`
    };
    if(interactive) data.cellLabels=[`${display(scope.firstProduct)} = ${display(scope.firstResult)}`,`${display(scope.secondProduct)} = ${display(scope.secondResult)}`];
    return component.render(data,correction);
  }

  function divisionVisual(instance,correction=false){
    const component=global.MATHSGO_VISUALS&&global.MATHSGO_VISUALS.get('arithmetic.relation-bar');
    if(!component) return '';
    const scope=instance.scope||{};
    return component.render({kind:'fraction_direct',divisor:Number(scope.divisor),value:Number(scope.total),result:Number(scope.share),showValue:true,questionLabel:'une part ?',balanced:true,arrowStyle:'hand'},correction);
  }

  function distributivityBoard(instance,correction=false){
    const scope=instance.scope||{},cards=Array.isArray(scope.reasoningCards)?scope.reasoningCards:[scope.firstProduct,scope.secondProduct];
    return `<div class="question">Place les deux produits dans les bonnes cases pour décomposer le calcul.</div><div class="decimal-manipulation decimal-distributivity-board${correction?' is-correction':''}" data-decimal-manipulation="distributivity">${multiplicationVisual(instance,correction,true)}<div class="decimal-card-tray" aria-label="Produits à placer">${cards.map(card).join('')}</div></div>`;
  }

  function insertBeforeFooter(html,content){
    if(!content) return html;
    const marker='<div class="footer">';
    return html.includes(marker)?html.replace(marker,content+marker):html+content;
  }

  function optionalVisual(html,visual,mode){
    if(mode==='without-reveal') return insertBeforeFooter(html,'<div class="visual-placeholder decimal-visual-placeholder"></div>');
    if(mode!=='with') return html;
    return insertBeforeFooter(html,visual);
  }

  function renderQuestion({instance,correction,mode,renderGenericQuestion}){
    const kind=String(instance&&instance.q&&instance.q.options&&instance.q.options.decimal_kind||'');
    if(kind==='order-cards') return orderBoard(instance,correction);
    if(kind==='frame-positive'||kind==='frame-negative') return frameBoard(instance,correction);
    if(kind==='distributivity-reasoning') return distributivityBoard(instance,correction);
    const html=renderGenericQuestion(instance,correction,mode);
    if(kind==='add-to-one') return optionalVisual(html,complementVisual(instance,correction,false),mode);
    if(kind==='missing-complement') return optionalVisual(html,complementVisual(instance,correction,true),mode);
    if(kind==='multiply-direct') return optionalVisual(html,multiplicationVisual(instance,correction,false),mode);
    if(kind==='divide-direct'||kind==='division-context') return optionalVisual(html,divisionVisual(instance,correction),mode);
    return html;
  }

  if(!global.MATHSGO_MODULE_RUNTIME) throw new Error('Le registre fonctionnel doit être chargé avant le rendu dnb_02.');
  ['dnb_02','dnb_39'].forEach(moduleId=>global.MATHSGO_MODULE_RUNTIME.register(moduleId,{
    renderer:{version:'2.1.0',renderQuestion}
  }));
})(globalThis);
