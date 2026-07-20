# Critères de divisibilité — décisions du pilote `dnb_08`

## Statut et périmètre

Décisions validées par Gwenaël le 19 juillet 2026 pour un lot pilote local.
Le module travaille les critères par **2, 3, 5, 9 et 10**. Le critère par 10
est conservé dans le parcours DNB comme complément maths&go, sans créer un
filtre ou un réglage supplémentaire pour l'élève.

Ce lot ne fabrique qu'une nouvelle famille centrale : sélectionner tous les
diviseurs proposés. Les gabarits historiques restent numérotés et traçables.
Les trois tâches encore utiles de l'ancienne banque — sélectionner plusieurs
nombres, justifier avec la somme des chiffres et relier au partage — restent
présentes dans les séries en attendant leurs futures familles fonctionnelles.

## Appuis pédagogiques consultés

Consultation du 19 juillet 2026 :

- le ministère de l'Éducation de Singapour décrit la progression
  concret → imagé → abstrait et l'usage d'objets manipulables pour construire
  les fondations mathématiques :
  <https://www.moe.gov.sg/news/edtalks/is-the-psle-mathematics-paper-so-difficult> ;
- le programme anglais demande aux élèves de circuler avec aisance entre les
  représentations d'une même idée mathématique :
  <https://assets.publishing.service.gov.uk/media/5a7da548ed915d2ac884cb07/PRIMARY_national_curriculum_-_Mathematics_220714.pdf> ;
- le guide anglais du cycle secondaire recommande les représentations, les
  manipulations et la variation des exemples, y compris « ce qui n'est pas »
  le concept afin de traiter les conceptions erronées :
  <https://assets.publishing.service.gov.uk/media/621629ac8fa8f5490d52ee78/KS3_NonStatutory_Guidance_Sept_2021_FINAL_NCETM.pdf> ;
- l'Education Endowment Foundation recommande l'enseignement explicite sous la
  forme démonstration → pratique guidée → pratique autonome et l'emploi
  raisonné des exemples résolus :
  <https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/supporting-high-quality-teaching-for-pupils-with-send>
  et
  <https://educationendowmentfoundation.org.uk/news/eef-blog-using-worked-examples-to-promote-high-quality-mathematical-talk>.

Ces références ne dictent pas une interface. Elles justifient ici quatre
choix modestes : donner d'abord le sens par un partage, montrer ensuite où
regarder, verbaliser toujours les deux étapes et varier les cas positifs comme
négatifs.

## Savoir-faire et méthode élève

La méthode affichée reste identique dans l'aide, le cours et la correction :

1. observer le chiffre des unités pour tester 2, 5 et 10 ;
2. additionner tous les chiffres pour tester 3 et 9 ;
3. examiner chaque proposition puis conclure.

Le cours commence par le sens : « divisible » signifie qu'un partage en parts
entières égales ne laisse aucun reste. Le composant commun
`arithmetic.equal-sharing-board` représente 12 objets partagés en trois parts
de 4. Ce support concret et imagé précède les règles abstraites.

## Famille fonctionnelle : tous les diviseurs proposés

La question présente toujours les six cibles `2`, `3`, `5`, `9`, `10` et
`Aucun`.

- la validation compare l'ensemble exact des choix ;
- `Aucun` est exclusif ; choisir une autre réponse le désélectionne, et le
  choisir efface les autres réponses ;
- les douze profils possibles sont le produit de quatre classes d'unité et de
  trois classes de somme des chiffres ;
- une série de 20 contient 15 questions de cette famille et cinq tâches de
  sens ou de justification conservées de l'ancienne banque ;
- les douze profils passent avant toute répétition de profil ;
- les occurrences répétées d'un profil utilisent une autre longueur de nombre,
  ce qui interdit la répétition exacte d'un nombre dans une série de 20 ;
- les valeurs ont deux, trois ou quatre chiffres et couvrent les unités 0, les
  zéros internes, aucune, une ou plusieurs réponses correctes.

## Aide et correction

L'aide ne donne pas la réponse : elle encadre visuellement le chiffre des
unités et prépare une addition telle que `8 + 7 + 3 + 2 = □`. Elle rappelle le
rôle des deux observations, mais ne remplit ni la somme ni les verdicts.

La correction reprend le même support et le résout :

- verdicts séparés pour 2, 5 et 10 à partir de l'unité ;
- une seule somme des chiffres ;
- verdicts séparés pour 3 et 9 ;
- conclusion complète, y compris « aucun des nombres proposés ».

## Garde-fous

- `10 → 2 et 5` et `9 → 3` sont vérifiés automatiquement ;
- 1 200 instances couvrent l'exactitude des réponses dans le test de banque ;
- une série de 20 vérifie la présence des douze profils et l'absence de nombre
  répété ;
- le téléphone portrait de référence reste 390 × 844 et l'ordinateur
  1 280 × 720 ;
- les six réponses courtes forment une grille 3 × 2 sur ordinateur et 2 × 3
  sur téléphone, avec de grandes cibles ;
- toute évolution future augmente la version du générateur afin qu'un lien
  seedé ne change pas silencieusement.

## Suites proposées, hors de ce lot

Les briques réutilisables éprouvées ici sont : sélection multiple exacte,
option exclusive, génération par profil, correction en étapes et aide
observation → somme. Leur extension à un autre module demande une validation
propre à la notion ; elle n'est pas automatique.

Pour `dnb_08`, les familles suivantes seront proposées une par une : critère
précis, grille de plusieurs nombres, vrai/faux argumenté, chiffre manquant,
puis situations de partage et de retrait minimal.
