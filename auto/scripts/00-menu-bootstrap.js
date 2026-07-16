/*
 * Affichage critique du menu.
 *
 * Le catalogue est volontairement indépendant du moteur de questions : le
 * menu peut ainsi apparaître dès le premier affichage, avant le chargement
 * des outils de génération et des bibliothèques visuelles.
 */
(function bootstrapMenu(global){
  const domains=[
    {id:'numbers',title:'Nombres et calculs'},
    {id:'geometry',title:'Espace et géométrie'},
    {id:'data',title:'Données, statistiques et probabilités'},
    {id:'algorithm',title:'Pensée informatique'}
  ];
  const groups={
    numbers:[
      {id:'numeration',title:'Numération',moduleIds:['dnb_02','dnb_02b','dnb_14']},
      {id:'entiers-divisibilite',title:'Nombres entiers et divisibilité',moduleIds:['dnb_08','dnb_09']},
      {id:'fractions',title:'Fractions et nombres rationnels',moduleIds:['dnb_01','dnb_03','dnb_03b','dnb_04','dnb_05']},
      {id:'relatifs',title:'Nombres relatifs',moduleIds:['dnb_38']},
      {id:'puissances',title:'Puissances',moduleIds:['dnb_07','dnb_06']},
      {id:'algebre',title:'Calcul littéral et algèbre',moduleIds:['dnb_10','dnb_11','dnb_12','dnb_13']}
    ],
    geometry:[
      {id:'reperage',title:'Repérage',moduleIds:['dnb_15']},
      {id:'transformations',title:'Transformations',moduleIds:['dnb_27']},
      {id:'angles-triangles',title:'Angles et triangles',moduleIds:['dnb_16','dnb_17','dnb_18']},
      {id:'theoremes-trigonometrie',title:'Pythagore, Thalès et trigonométrie',moduleIds:['dnb_24','dnb_25','dnb_26','dnb_26b']},
      {id:'mesures',title:'Conversions, aires et périmètres',moduleIds:['dnb_19','dnb_21','dnb_22']},
      {id:'espace',title:'Espace, solides et patrons',moduleIds:['dnb_20','dnb_23']}
    ],
    data:[
      {id:'statistiques',title:'Statistiques et moyennes',moduleIds:['dnb_32','dnb_29','dnb_30','dnb_31']},
      {id:'probabilites',title:'Probabilités',moduleIds:['dnb_28']},
      {id:'proportionnalite',title:'Proportionnalité, ratios et pourcentages',moduleIds:['dnb_33','dnb_34','dnb_35']},
      {id:'fonctions',title:'Fonctions',moduleIds:['dnb_36']}
    ],
    algorithm:[{id:'pensee-informatique',title:'Pensée informatique',moduleIds:['dnb_37']}]
  };

  function visibleModules(){
    const level=document.getElementById('level')?.value||'3e';
    return MATHSGO_MODULE_MANIFEST.filter(module=>
      level==='all' || module.level_tags.includes(level) || (level==='3e' && module.level_tags.includes('DNB'))
    );
  }

  function groupsForDomain(domain,members){
    const memberById=new Map(members.map(module=>[module.id,module]));
    const used=new Set();
    const result=(groups[domain]||[]).map(group=>{
      const groupMembers=group.moduleIds.map(id=>memberById.get(id)).filter(Boolean);
      groupMembers.forEach(module=>used.add(module.id));
      return {...group,members:groupMembers};
    }).filter(group=>group.members.length);
    const other=members.filter(module=>!used.has(module.id));
    if(other.length) result.push({id:'autres',title:'Autres automatismes',members:other});
    return result;
  }

  function updateCounts(){
    document.querySelectorAll('.theme-group').forEach(group=>{
      const boxes=[...group.querySelectorAll('.modcb')];
      const checked=boxes.filter(box=>box.checked).length;
      const badge=group.querySelector('.theme-count');
      const master=group.querySelector('.theme-select-cb');
      if(master){
        master.checked=boxes.length>0&&checked===boxes.length;
        master.indeterminate=checked>0&&checked<boxes.length;
      }
      if(badge) badge.textContent=checked+' / '+boxes.length+' sélectionné'+(checked===1?'':'s');
    });
  }

  function rememberSelection(){
    global.MATHSGO_BOOTSTRAP_SELECTION=[...document.querySelectorAll('.modcb:checked')].map(input=>input.value);
  }

  function selectVisible(on){
    document.querySelectorAll('.modcb').forEach(box=>{box.checked=on;});
    rememberSelection();
    updateCounts();
  }

  function render(){
    const box=document.getElementById('modules');
    if(!box) return;
    const selected=new Set([...box.querySelectorAll('.modcb:checked')].map(input=>input.value));
    box.innerHTML='';
    domains.forEach(domain=>{
      const members=visibleModules().filter(module=>module.domain===domain.id);
      if(!members.length) return;
      const group=document.createElement('details');
      group.className='theme-group';
      group.dataset.theme=domain.id;
      const summary=document.createElement('summary');
      summary.className='theme-summary';
      summary.innerHTML='<span class="theme-chevron">▶</span><span class="theme-name"></span><label class="theme-select-all"><input class="theme-select-cb" type="checkbox"><span>Tout</span></label><span class="theme-count"></span>';
      summary.querySelector('.theme-name').textContent=domain.title;
      const items=document.createElement('div');
      items.className='theme-items';
      groupsForDomain(domain.id,members).forEach(menuGroup=>{
        const subgroup=document.createElement('section');
        subgroup.className='module-subgroup';
        const heading=document.createElement('h3');
        heading.className='module-subgroup-title';
        heading.textContent=menuGroup.title;
        const subgroupItems=document.createElement('div');
        subgroupItems.className='module-subgroup-items';
        menuGroup.members.forEach(module=>{
          const row=document.createElement('label');
          row.className='modrow';
          const input=document.createElement('input');
          input.type='checkbox'; input.className='modcb'; input.value=module.id; input.checked=selected.has(module.id);
          input.addEventListener('change',()=>{rememberSelection();updateCounts();});
          const text=document.createElement('span');
          const title=document.createElement('strong');
          title.textContent=module.title;
          text.appendChild(title); row.append(input,text); subgroupItems.appendChild(row);
        });
        subgroup.append(heading,subgroupItems); items.appendChild(subgroup);
      });
      group.append(summary,items);
      const master=summary.querySelector('.theme-select-cb');
      summary.querySelector('.theme-select-all').addEventListener('click',event=>event.stopPropagation());
      master.addEventListener('change',()=>{
        group.querySelectorAll('.modcb').forEach(box=>{box.checked=master.checked;});
        rememberSelection();
        updateCounts();
      });
      group.addEventListener('toggle',()=>{
        if(group.open) box.querySelectorAll('.theme-group[open]').forEach(other=>{if(other!==group) other.open=false;});
      });
      box.appendChild(group);
    });
    updateCounts();
  }

  global.MATHSGO_BOOTSTRAP_SELECTION=null;
  global.MATHSGO_BOOTSTRAP_MENU={render,selectVisible,rememberSelection};
  global.selectVisible=selectVisible;
  render();
  document.getElementById('level')?.addEventListener('change',render);
})(globalThis);
