MATHSGO_PEDAGOGY.registerModule('dnb_25',{
  domain:'geometry',
  topic:'Théorème de Thalès',
  label:'Théorème de Thalès : triangles emboîtés',
  levelTags:['3e','DNB'],
  courseKind:'thales',
  questionTypes:[
    {id:'verifier-conditions',label:'Vérifier si le théorème est applicable',questions:[1],response:'qcm-one',visual:{policy:'essential',component:'geometry.thales-configuration'},helpSections:['conditions']},
    {id:'reconnaitre-rapports',label:'Reconnaître les rapports correspondants',questions:[2],response:'qcm-one',visual:{policy:'essential',component:'geometry.thales-configuration'},helpSections:['ratios']},
    {id:'calculer-ae',label:'Calculer une longueur du petit triangle : AE',questions:[3],response:'numeric',visual:{policy:'essential',component:'geometry.thales-configuration'},helpSections:['ratios','calculation','coherence']},
    {id:'calculer-ab',label:'Calculer une longueur du grand triangle : AB',questions:[4],response:'numeric',visual:{policy:'essential',component:'geometry.thales-configuration'},helpSections:['ratios','calculation','coherence']},
    {id:'calculer-de',label:'Calculer une longueur du petit triangle : DE',questions:[5],response:'numeric',visual:{policy:'essential',component:'geometry.thales-configuration'},helpSections:['ratios','calculation','coherence']},
    {id:'tester-parallelisme',label:'Tester le parallélisme avec les rapports',questions:[6],response:'qcm-one',visual:{policy:'none'},helpSections:['parallelism-test','coherence']},
    {id:'reperer-condition-manquante',label:'Repérer une condition de parallélisme manquante',questions:[7],response:'qcm-one',visual:{policy:'essential',component:'geometry.thales-configuration'},helpSections:['conditions']},
    {id:'choisir-egalite',label:'Choisir l’égalité qui permet le calcul',questions:[8],response:'qcm-one',visual:{policy:'none'},helpSections:['ratios','calculation']},
    {id:'controler-coherence',label:'Contrôler la cohérence d’un résultat',questions:[9],response:'qcm-one',visual:{policy:'none'},helpSections:['coherence']},
    {id:'calculer-bc',label:'Calculer une longueur du grand triangle : BC',questions:[10],response:'numeric',visual:{policy:'essential',component:'geometry.thales-configuration'},helpSections:['ratios','calculation','coherence']}
  ]
});
