const modulesInDomain=(modules,domain)=>modules.map(module=>({...module,domain}));
const RAW_MODULES = [
  ...modulesInDomain(RAW_NUMBER_MODULES,'numbers'),
  ...modulesInDomain(RAW_GEOMETRY_MODULES,'geometry'),
  ...modulesInDomain(RAW_DATA_MODULES,'data'),
  ...modulesInDomain(RAW_ALGORITHM_MODULES,'algorithm')
];
const PROFESSIONAL_MODULE_TITLES={
  dnb_32:'Lire des tableaux, diagrammes et graphiques',
  dnb_33:'Reconnaître une situation de proportionnalité',
  dnb_34:'Résoudre un problème de proportionnalité',
  dnb_36:'Lire un graphique de dépendance'
};
RAW_MODULES.forEach(module=>{if(PROFESSIONAL_MODULE_TITLES[module.id])module.title=PROFESSIONAL_MODULE_TITLES[module.id];});






function configureEvolutionModule(){
  const mod=RAW_MODULES.find(m=>m.id==='dnb_35');
  if(!mod) return;
  const kinds={
    1:'increase_total',2:'decrease_total',3:'increase_total',4:'decrease_total',
    5:'increase_coefficient',6:'decrease_coefficient',7:'increase_qcm',
    8:'decrease_qcm',9:'decrease_total',10:'increase_amount'
  };
  mod.questions.forEach(q=>{
    q.options=q.options||{};
    q.options.evolution_kind=kinds[q.n];
    if(Number(q.n)===3) q.footer='$$[[formula]]\\text{ habitants}$$';
    if(Number(q.n)===4) q.footer='$$[[formula]]\\text{ élèves}$$';
    if([7,8].includes(Number(q.n))&&q.options.formula_code){
      q.options.formula_code=q.options.formula_code.replace('prix=RD(4,20)*10','prix=RD(2,20,[5])*20');
    }
  });
}
configureEvolutionModule();

function configureMedianModule(){
  const mod=RAW_MODULES.find(m=>m.id==='dnb_31');
  if(!mod) return;
  mod.title='Médiane et étendue';
  const q=n=>mod.questions.find(item=>item.n===n);
  const series=names=>'<div class="median-list">'+names.map(name=>'<span class="median-value">$$${'+name+'}$$</span>').join('<span class="median-separator">;</span>')+'</div>';
  const makeTableResponsive=question=>{
    if(!question||!question.statement) return;
    question.statement=question.statement
      .replace('<table style="border-collapse:collapse;margin:auto;text-align:center;font-size:18px">','<div class="median-table-wrap"><table class="median-table">')
      .replace(/<td style="border:1px solid #555;padding:8px (?:14|18)px">/g,'<td>')
      .replace('</table>','</table></div>');
  };

  q(1).statement='Détermine la médiane de la série suivante :'+series(['c','a','b']);
  q(2).statement='Détermine la médiane de la série suivante :'+series(['e','a','d','b','c']);
  q(3).statement='Détermine la médiane de la série suivante :'+series(['d','a','c','b']);
  q(4).statement='La série suivante est déjà rangée dans l’ordre croissant :'+series(['a','b','c','d','e','f'])+'Détermine sa médiane.';
  q(9).statement='Détermine la médiane de la série suivante, qui contient des valeurs répétées :'+series(['a','m','b','m','c']);
  q(10).statement='La série suivante est déjà rangée dans l’ordre croissant :'+series(['a','b','c','d'])+'Quelle est sa médiane ?';
  makeTableResponsive(q(6));
  makeTableResponsive(q(7));

  if(!q(11)){
    mod.questions.push({
      n:11,
      statement:'Calcule l’étendue de la série suivante :'+series(['e','b','a','f','c','d']),
      answer:'["etendue"]',
      options:{formula_code:'setNB(1)\na=RD(1,6)\nb=a+RD(1,4)\nc=b+RD(1,4)\nd=c+RD(1,4)\ne=d+RD(1,4)\nf=e+RD(1,4)\netendue=f-a'},
      footer:'$$\\text{étendue}=[[formula]]$$'
    });
  }
  if(!q(12)){
    mod.questions.push({
      n:12,
      statement:'Voici cinq distances relevées :<div class="median-table-wrap"><table class="median-table"><tr><td>mesure</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td></tr><tr><td>distance (m)</td><td>$$${c}$$</td><td>$$${a}$$</td><td>$$${e}$$</td><td>$$${b}$$</td><td>$$${d}$$</td></tr></table></div>Calcule l’étendue de ces distances.',
      answer:'["etendue"]',
      options:{formula_code:'setNB(1)\na=RD(5,10)\nb=a+RD(1,3)\nc=b+RD(1,3)\nd=c+RD(1,3)\ne=d+RD(1,3)\netendue=e-a'},
      footer:'$$\\text{étendue}=[[formula]]\\,\\text{m}$$'
    });
  }
}
configureMedianModule();

function configureProportionModule(){
  const mod=RAW_MODULES.find(m=>m.id==='dnb_34');
  if(!mod) return;
  const q=n=>mod.questions.find(item=>item.n===n);
  const makeTableResponsive=question=>{
    if(!question||!question.statement) return;
    question.statement=question.statement
      .replace('<table style="border-collapse:collapse;margin:auto;text-align:center;font-size:18px">','<div class="proportion-table-wrap"><table class="proportion-table">')
      .replace(/<td style="border:1px solid #555;padding:8px 18px">/g,'<td>')
      .replace('</table>','</table></div>');
  };
  makeTableResponsive(q(2));
  makeTableResponsive(q(5));
  if(q(5)&&q(5).options&&!q(5).options.formula_code.includes('unknownTop=')){
    q(5).statement=q(5).statement
      // Une fonction de remplacement préserve les deux signes "$" : dans une
      // chaîne de remplacement directe, String.replace interprète "$$".
      .replace('$$${q2}$$',()=> '$$${q2Cell}$$')
      .replace('>?</td>',()=> '>$$${p2Cell}$$</td>');
    q(5).answer='["target"]';
    q(5).options.formula_code+='\nunknownTop=RD(1)\nq2Cell=unknownTop?"?":q2\np2Cell=unknownTop?p2:"?"\ntarget=unknownTop?q2:p2';
  }
  if(q(9)&&q(9).options){
    q(9).options.formula_code=q(9).options.formula_code.replace('q2=RD(2,5)','q2=RD(2,5,[q1])');
  }
  if(!q(11)){
    mod.questions.push({
      n:11,
      statement:'Ce tableau est un tableau de proportionnalité. Calcule le nombre manquant.<div class="proportion-table-wrap proportion-bare-table-wrap"><table class="proportion-table proportion-bare-table"><tr><td>$$${x1}$$</td><td>$$${x2Cell}$$</td></tr><tr><td>$$${y1}$$</td><td>$$${y2Cell}$$</td></tr></table></div>',
      answer:'["target"]',
      options:{formula_code:'setNB(1)\nx1=RD(2,6)\nm=RD(2,4)\nk=RD(2,8)\nx2=x1*m\ny1=x1*k\ny2=x2*k\nunknownTop=RD(1)\nx2Cell=unknownTop?"?":x2\ny2Cell=unknownTop?y2:"?"\ntarget=unknownTop?x2:y2'},
      footer:'$$[[formula]]$$'
    });
  }
}
configureProportionModule();

function configureLegacyStatementTables(){
  const legacyTable=/(?:<br>|\n\n)?\s*(<table style="border-collapse:collapse;margin:auto;text-align:(?:center|left);font-size:(?:18|20)px">[\s\S]*?<\/table>)(?:<br>)?/g;
  RAW_MODULES.forEach(module=>{
    module.questions.forEach(question=>{
      if(!question.statement||!question.statement.includes('<table style=')) return;
      const tableClass='legacy-table-'+module.id+'-'+question.n;
      question.statement=question.statement.replace(legacyTable,(_,table)=>{
        const classified=table.replace('<table ','<table class="legacy-statement-table '+tableClass+'" ');
        return '<div class="legacy-statement-table-wrap '+tableClass+'-wrap">'+classified+'</div>';
      });
    });
  });
}
configureLegacyStatementTables();
