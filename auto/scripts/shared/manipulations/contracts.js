(function registerMathsgoManipulationContracts(global){
  const registry=global.MATHSGO_MANIPULATIONS;
  if(!registry) throw new Error('Le registre de manipulations doit être chargé avant les contrats.');

  registry.register('numbers.glisse-nombre',{
    version:'1.1.0',label:'Glisse-nombre',status:'active',moduleId:'dnb_02b',componentId:'numbers.glisse-nombre',
    description:'Déplacer les chiffres devant une virgule fixe pour multiplier ou diviser par une puissance de dix.',
    supports:['phone','computer'],inputMethods:['touch','pointer','keyboard'],
    state:[
      {id:'base-digits',label:'Chiffres du nombre de départ',serializable:true},
      {id:'shift',label:'Décalage entier de −3 à 3',serializable:true},
      {id:'target-shift',label:'Décalage attendu',serializable:true}
    ],
    actions:[
      {id:'drag-strip',label:'Faire glisser la bandelette'},
      {id:'select-units-digit',label:'Toucher le chiffre des unités'},
      {id:'select-target-column',label:'Toucher la colonne d’arrivée'},
      {id:'move-left',label:'Déplacer d’une colonne vers la gauche'},
      {id:'move-right',label:'Déplacer d’une colonne vers la droite'},
      {id:'reset',label:'Revenir au nombre de départ'}
    ],
    reset:{mode:'initial-state',preserves:['base-digits','target-shift']},
    validation:{mode:'derived-value',trigger:'external',expected:'shift = target-shift'},
    correction:{mode:'target-state',shows:['rejeu du déplacement','zéros de position','résultat']},
    serialization:{version:'MG-MANIP-1',fields:['base-digits','shift','target-shift']}
  });

  registry.register('numbers.number-line-point',{
    version:'1.0.0',label:'Point sur droite graduée',status:'active',moduleId:'dnb_14',componentId:'numbers.number-line',
    description:'Déplacer horizontalement un point, aimanté aux graduations, jusqu’à une abscisse donnée.',
    supports:['phone','computer'],inputMethods:['touch','pointer','keyboard'],
    state:[
      {id:'references',label:'Graduations chiffrées qui définissent l’échelle',serializable:true},
      {id:'step',label:'Pas de la graduation',serializable:true},
      {id:'start-index',label:'Graduation de départ du point',serializable:true},
      {id:'current-index',label:'Graduation actuellement choisie',serializable:true},
      {id:'target-index',label:'Graduation attendue',serializable:true},
      {id:'instance-key',label:'Instance reproductible de la question',serializable:true}
    ],
    actions:[
      {id:'drag-point',label:'Faire glisser horizontalement le point'},
      {id:'select-point',label:'Toucher ou sélectionner le point'},
      {id:'select-tick',label:'Toucher la graduation d’arrivée'},
      {id:'move-left',label:'Déplacer d’une graduation vers la gauche'},
      {id:'move-right',label:'Déplacer d’une graduation vers la droite'},
      {id:'reset',label:'Revenir à la position de départ'},
      {id:'validate',label:'Valider la position aimantée'}
    ],
    reset:{mode:'initial-state',preserves:['references','step','start-index','target-index','instance-key']},
    validation:{mode:'state-equivalence',trigger:'explicit',expected:'current-index = target-index'},
    correction:{mode:'target-state',shows:['position choisie si elle est fausse','position cible','valeur attendue']},
    serialization:{version:'MG-MANIP-1',fields:['references','step','start-index','current-index','target-index','instance-key']}
  });

  registry.register('numbers.relative-tokens',{
    version:'1.0.0',label:'Jetons relatifs',status:'active',moduleId:'dnb_38',componentId:'numbers.relative-tokens',
    description:'Rassembler des jetons +1 et −1, repérer les paires nulles et obtenir une somme.',
    supports:['phone','computer'],inputMethods:['touch','pointer','keyboard'],
    state:[
      {id:'tokens',label:'Identité, signe, origine et zone de chaque jeton',serializable:true},
      {id:'null-pairs',label:'Paires +1/−1 visibles dans la zone résultat',serializable:false},
      {id:'instance-key',label:'Instance reproductible de la question',serializable:true}
    ],
    actions:[
      {id:'move-token',label:'Déplacer un jeton vers la zone résultat ou son origine'},
      {id:'reset',label:'Renvoyer tous les jetons dans leur zone initiale'},
      {id:'validate',label:'Valider l’état manipulé'}
    ],
    reset:{mode:'initial-state',preserves:['instance-key']},
    validation:{mode:'state-equivalence',trigger:'explicit',ignores:['ordre visuel des jetons']},
    correction:{mode:'target-state',shows:['rassemblement','paires nulles','somme finale']},
    serialization:{version:'MG-MANIP-1',fields:['tokens','instance-key']}
  });

  registry.register('geometry.pythagoras-builder',{
    version:'1.0.0',label:'Constructeur Pythagore',status:'active',moduleId:'dnb_24b',componentId:'geometry.pythagoras-builder',
    description:'Placer les côtés au carré et les aires dans la relation de Pythagore.',
    supports:['phone','computer'],inputMethods:['touch','pointer','keyboard'],
    state:[
      {id:'task',label:'Relation, aires ou construction complète',serializable:true},
      {id:'slots',label:'Valeur placée dans chaque case',serializable:true},
      {id:'selected-token',label:'Étiquette sélectionnée',serializable:false},
      {id:'triangle',label:'Angle droit et longueurs de référence',serializable:true}
    ],
    actions:[
      {id:'select-token',label:'Sélectionner une étiquette'},
      {id:'place-token',label:'Placer ou glisser une étiquette dans une case compatible'},
      {id:'remove-token',label:'Retirer une étiquette placée'},
      {id:'reset',label:'Vider les cases'},
      {id:'validate',label:'Valider la relation construite'}
    ],
    reset:{mode:'initial-state',preserves:['task','triangle']},
    validation:{mode:'ordered-slots',trigger:'explicit',expected:'relation et aires exactes'},
    correction:{mode:'target-state',shows:['hypoténuse','relation','trois aires']},
    serialization:{version:'MG-MANIP-1',fields:['task','slots','triangle']}
  });

  registry.register('algorithm.block-sequence',{
    version:'1.0.0',label:'Suite de blocs pas à pas',status:'planned',moduleId:'dnb_37',componentId:null,
    description:'Rejouer une suite limitée de calculs, rotations, déplacements, boucles ou constructions.',
    supports:['phone','computer'],inputMethods:['touch','pointer','keyboard'],
    state:[
      {id:'program',label:'Programme et paramètres de départ',serializable:true},
      {id:'seed',label:'Graine reproductible de l’instance',serializable:true},
      {id:'instruction-index',label:'Instruction courante',serializable:true},
      {id:'variables',label:'Valeurs des variables',serializable:true},
      {id:'position',label:'Position sur le quadrillage',serializable:true},
      {id:'orientation',label:'Direction courante',serializable:true},
      {id:'trace',label:'États ou chemin déjà parcourus',serializable:true}
    ],
    actions:[
      {id:'step',label:'Exécuter l’instruction suivante'},
      {id:'run-loop',label:'Exécuter le contenu d’une boucle'},
      {id:'reset',label:'Revenir à l’état initial'},
      {id:'validate',label:'Valider le résultat ou le point d’arrivée'}
    ],
    reset:{mode:'initial-state',preserves:['program','seed']},
    validation:{mode:'semantic-outcome',trigger:'explicit',expected:'valeur, position, orientation ou propriété'},
    correction:{mode:'replay',shows:['instruction active','état avant','état après']},
    serialization:{version:'MG-MANIP-1',fields:['program','seed','instruction-index','variables','position','orientation','trace']}
  });
})(globalThis);
