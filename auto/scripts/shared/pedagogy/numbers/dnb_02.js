MATHSGO_PEDAGOGY.registerModule('dnb_02',{
  domain:'numbers',
  topic:'Comparer et calculer avec des nombres décimaux',
  label:'Décimaux : ordre, encadrement et calcul',
  levelTags:['4e','3e','DNB'],
  courseKind:'decimal_numbers',
  generatorContract:{
    configurations:[
      {id:'compare',label:'Comparer trois décimaux positifs ou négatifs'},
      {id:'order',label:'Ranger trois décimaux'},
      {id:'frame',label:'Encadrer entre deux entiers consécutifs'},
      {id:'add-subtract',label:'Additionner ou soustraire des décimaux'},
      {id:'scale',label:'Multiplier ou diviser par un entier'}
    ],
    reasoning:[
      {id:'place-values',label:'Aligner les rangs',rule:'Comparer d’abord les parties entières, puis dixièmes, centièmes et millièmes.'},
      {id:'sign-order',label:'Tenir compte du signe',rule:'Parmi deux nombres négatifs, le plus grand est celui qui est le plus proche de zéro.'},
      {id:'consecutive-integers',label:'Trouver les entiers voisins',rule:'Repérer l’entier immédiatement inférieur et l’entier immédiatement supérieur.'},
      {id:'align-comma',label:'Aligner les virgules',rule:'Écrire les chiffres de même rang dans la même colonne avant une addition ou une soustraction.'},
      {id:'estimate',label:'Contrôler l’ordre de grandeur',rule:'Vérifier que le résultat est cohérent avec les nombres de départ.'}
    ],
    representations:[
      {id:'place-value',label:'Tableau de numération'},
      {id:'number-line',label:'Droite graduée courte'},
      {id:'written-calculation',label:'Calcul posé avec virgules alignées'}
    ],
    visualRules:[
      'Le tableau de numération garde les colonnes de même largeur et la virgule fixe.',
      'Sur téléphone, une droite courte ou un tableau limité aux rangs utiles est préféré.',
      'Les zéros ajoutés pour comparer deux écritures restent visuellement secondaires.'
    ],
    cautions:[
      'Ne pas comparer seulement le nombre de chiffres.',
      'Pour un nombre négatif, ne pas oublier que l’ordre est inversé par rapport aux distances à zéro.',
      'Dans une multiplication ou une division, contrôler la position de la virgule avec un ordre de grandeur.'
    ]
  },
  questionTypes:[
    {id:'comparer-trois-decimaux',label:'Choisir le plus grand de trois décimaux',questions:[1,2],response:'numeric',visual:{policy:'optional',component:'numbers.glisse-nombre'},helpSections:['place-values','sign-order','estimate']},
    {id:'ranger-trois-decimaux',label:'Ranger trois décimaux dans l’ordre croissant',questions:[3],response:'numeric',visual:{policy:'optional',component:'numbers.glisse-nombre'},helpSections:['place-values','estimate']},
    {id:'encadrer-entre-entiers',label:'Encadrer un décimal positif ou négatif',questions:[4,5],response:'numeric',visual:{policy:'optional',component:'numbers.number-line'},helpSections:['consecutive-integers','sign-order']},
    {id:'addition-soustraction',label:'Additionner ou soustraire des décimaux positifs',questions:[6,7],response:'numeric',visual:{policy:'optional',component:'numbers.glisse-nombre'},helpSections:['align-comma','estimate']},
    {id:'addition-signee',label:'Additionner un décimal positif et un décimal négatif',questions:[8],response:'numeric',visual:{policy:'optional',component:'numbers.number-line'},helpSections:['sign-order','estimate']},
    {id:'multiplier-diviser',label:'Multiplier ou diviser un décimal par un entier',questions:[9,10],response:'numeric',visual:{policy:'optional',component:'numbers.glisse-nombre'},helpSections:['place-values','estimate']}
  ]
});
