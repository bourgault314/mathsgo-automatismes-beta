MATHSGO_PEDAGOGY.registerModule('dnb_17',{
  domain:'geometry',
  topic:'Reconnaître et calculer avec des angles',
  label:'Nature, relations et mesures d’angles',
  levelTags:['4e','3e','DNB'],
  courseKind:'angle_vocabulary',
  generatorContract:{
    configurations:[
      {id:'nature-figure',label:'Reconnaître la nature sur une figure'},
      {id:'benchmark',label:'Connaître 90° et 180°'},
      {id:'relations',label:'Angles opposés ou adjacents'},
      {id:'complementary-supplementary',label:'Angles complémentaires ou supplémentaires'}
    ],
    reasoning:[
      {id:'angle-range',label:'Comparer à 90° et 180°',rule:'Aigu : entre 0° et 90° ; obtus : entre 90° et 180°.'},
      {id:'opposite-angles',label:'Opposés par le sommet',rule:'Ils ont le même sommet et leurs côtés sont dans le prolongement l’un de l’autre.'},
      {id:'adjacent-angles',label:'Angles adjacents',rule:'Ils ont le même sommet, un côté commun et des intérieurs disjoints.'},
      {id:'complementary',label:'Complémentaires',rule:'La somme des mesures vaut 90°.'},
      {id:'supplementary',label:'Supplémentaires',rule:'La somme des mesures vaut 180°.'}
    ],
    representations:[
      {id:'angle-arc',label:'Deux demi-droites et arc coloré'},
      {id:'intersecting-lines',label:'Droites sécantes et angles opposés'},
      {id:'adjacent-rays',label:'Trois demi-droites et deux angles adjacents'}
    ],
    visualRules:[
      'L’arc indique sans ambiguïté l’angle étudié.',
      'Les noms d’angles conservent le sommet en lettre centrale.',
      'Les figures ne sont pas dessinées pour suggérer une mesure exacte non codée.'
    ],
    cautions:[
      'Un angle obtus est strictement inférieur à 180°.',
      'Deux angles adjacents ne sont pas forcément complémentaires.',
      'Dans le nom d’un angle, le sommet est la lettre du milieu.'
    ]
  },
  questionTypes:[
    {id:'reconnaitre-nature-figure',label:'Reconnaître un angle aigu ou obtus sur une figure',questions:[1,2],response:'qcm-one',visual:{policy:'essential',component:null},helpSections:['angle-range']},
    {id:'connaitre-angles-reperes',label:'Connaître les mesures d’un angle droit et plat',questions:[3,4],response:'numeric',visual:{policy:'none',component:null},helpSections:['angle-range']},
    {id:'reconnaitre-relation',label:'Reconnaître des angles opposés ou adjacents',questions:[5,6],response:'qcm-one',visual:{policy:'essential',component:null},helpSections:['opposite-angles','adjacent-angles']},
    {id:'calculer-complement-supplement',label:'Calculer un angle complémentaire ou supplémentaire',questions:[7,8,10],response:'numeric',visual:{policy:'none',component:null},helpSections:['complementary','supplementary']},
    {id:'reconnaitre-nature-mesure',label:'Reconnaître la nature à partir de la mesure',questions:[9],response:'qcm-one',visual:{policy:'none',component:null},helpSections:['angle-range']}
  ]
});
