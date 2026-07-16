(function registerOrderCards(global){
  function escapeHtml(value){
    return String(value??'').replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  }

  function display(value){
    if(typeof value==='number') return String(Number(value.toFixed(6))).replace('.',',').replace('-','−');
    return String(value??'').replace('.',',').replace('-','−');
  }

  function render(data={},correction=false){
    const source=Array.isArray(data.values)?data.values:[];
    const solution=Array.isArray(data.solution)?data.solution:[...source].sort((left,right)=>Number(left)-Number(right));
    const values=correction?solution:Array.from({length:Math.max(3,solution.length)},()=>'');
    const cards=source.map(value=>`<button class="decimal-card" type="button" data-decimal-card="${escapeHtml(value)}">${escapeHtml(display(value))}</button>`).join('');
    const slots=values.map((value,index)=>{
      const filled=value!==''&&value!==null&&value!==undefined;
      return `<button class="decimal-drop-slot${filled?' is-filled':''}" type="button" data-decimal-slot="${index}" aria-label="Position ${index+1}">${filled?escapeHtml(display(value)):'…'}</button>`;
    }).join('');
    return `<div class="decimal-manipulation decimal-order-board${correction?' is-correction':''}" data-decimal-manipulation="order"><div class="decimal-card-tray" aria-label="Nombres à ranger">${cards}</div><div class="decimal-order-direction"><span>plus petit</span><span aria-hidden="true">→</span><span>plus grand</span></div><div class="decimal-order-slots">${slots}</div></div>`;
  }

  const supports=Object.freeze(['phone','computer','projection','print']);
  const presets=Object.freeze([
    Object.freeze({id:'trois-decimaux',label:'Ranger trois nombres décimaux',supports,data:Object.freeze({values:Object.freeze([4.7,4.09,4.68]),solution:Object.freeze([4.09,4.68,4.7])})})
  ]);

  if(!global.MATHSGO_VISUALS) throw new Error('Le registre MATHSGO_VISUALS doit être chargé avant order-cards.js.');
  global.MATHSGO_VISUALS.register('numbers.order-cards',{
    version:'1.0.0',
    label:'Cartes à ranger',
    family:'Nombres',
    description:'Affiche des nombres sous forme de cartes à placer dans des cases ordonnées, sans ouvrir le clavier.',
    presets,
    render
  });
})(globalThis);
