# Protocole des Automatismes maths&go

Ce document rassemble les règles durables à relire avant toute modification
des Automatismes maths&go. Il complète les contrats techniques du projet sans
les remplacer. Une décision propre à une catégorie reste dans le document de
cette catégorie ; une règle commune validée est ajoutée ici.

## Nom et périmètre

- La marque s'écrit toujours **maths&go**.
- Le présent document décrit les **Automatismes maths&go**. La bêta sert de
  terrain d'essai avant transfert vers la version publique et, lorsque cela est
  pertinent, vers les outils réutilisables de Studio maths&go.
- Une évolution est d'abord circonscrite à une catégorie ou à un petit lot. Un
  composant partagé n'est modifié qu'après vérification de tous ses usages.
- Avant toute modification, relire ce protocole, les contrats du projet, la
  source de vérité du composant et les règles propres à la catégorie.
- Ce fichier est l'unique protocole commun canonique. Une branche repart de la
  version de `main` et fusionne ses ajouts sans remplacer les règles existantes
  par une copie plus ancienne. Une décision propre à une catégorie reste dans
  le document de cette catégorie.

## Méthode permanente

Le travail suit l'ordre : **analyse → proposition → validation pédagogique →
modification → vérification visuelle**.

- Commencer par inspecter l'état réel de la branche, les changements récents,
  les fichiers réellement exécutés, le cours, les aides et les filtres.
- Signaler une règle absente, ambiguë, contradictoire ou remplacée. Ne pas
  choisir silencieusement une interprétation pédagogique.
- Faire valider une représentation encore incertaine. Après validation,
  résoudre de façon autonome les détails techniques ordinaires.
- Préserver les décisions récentes et limiter le lot à son périmètre. Une
  modification partagée impose de contrôler les autres catégories concernées.

## Finalité pédagogique

- Un automatisme vérifie d'abord si l'élève comprend la notion. La difficulté
  technique, la longueur du calcul ou la saisie ne doivent pas masquer cette
  compréhension ni décourager l'élève.
- Les exercices plus difficiles et les prolongements restent possibles en
  classe. L'application privilégie des nombres et des consignes qui rendent
  l'obstacle mathématique identifiable.
- Les générateurs sont audités sur de nombreuses graines : variété réelle,
  répétitions, cas limites, signes, résultats nuls et ordres de grandeur.
- Une série recherche un équilibre entre questions fondamentales, QCM,
  questions inverses, contexte et raisonnement lorsque ces formes ont un sens
  pour la notion. Cette répartition est adaptée à chaque catégorie : ce n'est
  jamais un quota uniforme qui oblige à créer une variante artificielle.
- Deux questions de même famille peuvent se suivre, mais une longue série de
  tâches identiques doit être évitée par la sélection, pas seulement par
  l'ajout de nouveaux gabarits.
- Les formes de réponse peuvent varier : saisie courte, QCM, sélection,
  classement, manipulation ou association. Une interaction n'est introduite
  que si elle apporte un gain pédagogique ou ergonomique.
- Certaines questions doivent provoquer une discussion, une comparaison de
  procédures ou l'analyse d'une erreur, sans remplacer les automatismes de
  base qui restent indispensables.
- Avant de classer ou d'étendre une catégorie, vérifier les programmes en
  vigueur du cycle concerné et les listes officielles d'automatismes du DNB.
  Conserver la source et la date de cette vérification.

## QCM et distracteurs

- Tous les distracteurs sont relus et testés, au même titre que la bonne
  réponse et la correction.
- Un distracteur correspond à une erreur plausible et nommable d'élève. Il
  n'est ni aléatoire, ni absurde, ni artificiellement piégeux.
- Les valeurs impossibles dans le contexte, les doublons, les signes
  incohérents et les ordres de grandeur manifestement hors sujet sont exclus.
- Quand le générateur construit les propositions, chaque distracteur conserve
  un code d'erreur stable, par exemple `inverse-direction`, `one-rank-short`,
  `one-rank-far` ou `unchanged-value`. Ces codes préparent une future analyse
  des erreurs sans afficher d'étiquette technique à l'élève.
- Une famille de distracteurs est documentée dans le contrat pédagogique de la
  catégorie afin que les prochaines variantes réemploient les mêmes erreurs
  diagnostiques.

## Cours et questions

- Chaque catégorie possède un cours accessible depuis la partie « Cours ». Le
  cours reste disponible en modes « Avec aide » et « Sans aide » : ce dernier
  masque les aides de la question, pas le cours général de la catégorie.
- Il faut rechercher et auditer le cours existant avant d'en créer un autre.
- Le cours est court mais explicite : règle, représentation, exemple et point
  de vigilance lorsque ceux-ci sont utiles.
- Une aide proposée dans une question doit être expliquée dans le cours. Le
  cours et l'aide appellent le même composant partagé, avec les mêmes codes
  visuels et le même sens mathématique.
- Les sections de cours peuvent être reliées aux familles de questions afin de
  ne présenter que l'explication pertinente.
- La correction réemploie la représentation de la question ou de l'aide. Elle
  montre l'état résolu sans changer arbitrairement d'univers graphique.
- Quand une question demande une réponse ordonnée ou un placement, la question
  et la correction gardent la même forme, les mêmes symboles et les mêmes
  alignements ; seule la complétion change.

## Statut d'une représentation visuelle

Chaque question déclare le rôle pédagogique de son visuel :

- `essential` : le visuel porte une donnée de l'énoncé. Il reste toujours
  visible, y compris en mode sans aide.
- `optional` : le visuel est une aide facultative. Il est visible en mode avec
  aide ; en mode sans aide, la question reste disponible et cette aide seule
  peut être révélée.
- `aid-only` : le visuel sert uniquement d'étayage. Il est visible en mode avec
  aide et complètement absent en mode sans aide.
- `none` : aucune aide visuelle pertinente n'est prévue.

Ne pas fabriquer une aide pour remplir une case. Lorsqu'aucun support visuel
n'aide réellement à comprendre, la méthode appartient au cours et la question
reste sans bouton d'aide.

Une aide ne donne pas directement la réponse. Elle fait observer une structure,
choisir une représentation, manipuler ou rappeler la règle utile.

## Stabilité de la mise en page

- L'aide est prévue dans la composition de la diapositive. Son affichage ne
  doit pas déplacer brutalement la question, déséquilibrer les blocs ni rendre
  les zones de réponse inaccessibles.
- Les données sémantiques de la question ne dépendent pas de coordonnées en
  pixels. Le même composant choisit un préréglage adapté au téléphone, à
  l'ordinateur ou à la projection.
- L'ajout d'une aide ne doit ni modifier la graine, ni régénérer les données,
  ni changer la bonne réponse.
- Le bouton « Cours » ouvre une fiche contextuelle sans remplacer la question.
  La fiche ne masque pas durablement l'énoncé ni les commandes essentielles.
- Utiliser réellement l'espace disponible : une consigne, un calcul, une
  réponse, une droite ou une case ne restent pas petits par habitude lorsqu'ils
  peuvent être agrandis sans provoquer de débordement. La taille se décide
  après capture et inspection de l'écran de référence.
- Dans une égalité, le signe `=` est visuellement équilibré par des espacements
  comparables à gauche et à droite. Dans un schéma orienté, une pointe de flèche
  indique toujours l'arrivée. Les marges d'un tableau ou d'un schéma sont
  contrôlées visuellement, pas seulement déduites du code.

## Modes tactile, interactif et diaporama

- En mode interactif, l'élève répond dans la diapositive : emplacements de
  réponse, QCM cliquables ou manipulation. Le retour est donné après
  validation ; le passage à la question suivante reste maîtrisé.
- Le clavier mathématique intégré est utilisé pour les saisies nécessaires. Le
  clavier natif du téléphone ne doit pas s'ouvrir lorsqu'il gêne l'exercice.
- Lorsqu'une manipulation remplace utilement la saisie, le clavier est masqué.
- Toute manipulation tactile possède une solution robuste sans glisser-déposer
  obligatoire, par exemple « toucher un objet puis toucher une cible ». Le
  glisser-déposer peut être le geste naturel principal, mais cette alternative
  reste toujours disponible sur téléphone, à la souris et au clavier.
- Une manipulation conserve un état sémantique, une action de remise à zéro et
  une validation explicite. La remise à zéro garde la même question et la même
  graine.
- Une catégorie pensée pour le téléphone peut aussi être proposée sur
  ordinateur. Aucune restriction par appareil n'est ajoutée sans validation
  spécifique.
- En mode diaporama, la résolution est collective : navigation manuelle,
  révélation manuelle de la correction, emplacements vides ou points de
  suspension lisibles à distance. Une interaction tactile ne doit pas être
  indispensable à la compréhension de la diapositive.
- Si une future question est réellement incompatible avec le diaporama, elle
  est exclue avant le tirage et remplacée par une question compatible. On ne la
  génère pas pour la masquer ensuite, afin de préserver le nombre de questions
  et la reproductibilité de la série.

## Règles particulières au téléphone

- La référence de contrôle est au minimum **390 × 844**, complétée par un test
  sur ordinateur **1280 × 720** et un test en mode diaporama.
- Aucun contenu ne doit imposer un zoom, un défilement horizontal ou une
  réduction illisible. Les droites, tableaux et schémas utilisent seulement les
  graduations, colonnes et annotations nécessaires.
- Pour les tableaux et schémas en barres, la largeur mobile validée de
  `arithmetic.fraction-percent-bar` sert de référence : le dessin occupe presque
  toute la largeur disponible, avec des cases réellement hautes et de hauteur
  uniforme. Une comparaison plus longue est redimensionnée dans ce cadre au
  lieu de déborder ou d'imposer un défilement horizontal.
- Les zones tactiles sont suffisamment grandes et espacées. Une proposition
  courte occupe une cible d'au moins environ 52 px de haut lorsque l'espace le
  permet. Quatre réponses courtes peuvent former une grille 2 × 2 centrée ; des
  réponses longues restent en une colonne.
- Les commandes importantes restent atteignables avec le clavier mathématique
  affiché.
- Le cours, une aide et une correction ne doivent pas recouvrir l'énoncé ou la
  réponse. Les menus et compteurs restent compacts.
- Une variante téléphone ne remplace pas la variante de projection ou
  d'impression d'un composant partagé.

## Bibliothèque visuelle et réutilisation

- Chercher d'abord un composant existant et ses préréglages. Ne pas recréer un
  SVG local ou une interaction libre dans une question si la bibliothèque
  contient déjà la même représentation.
- Un composant partagé possède un identifiant stable, une version, des données
  sémantiques, des préréglages, des tests et, s'il est manipulable, un contrat
  d'interaction.
- Une nouvelle variante étend le composant qui porte le même sens pédagogique.
  Si le sens est différent, créer un composant distinct plutôt que détourner
  l'ancien.
- Les identifiants de modules, numéros de gabarits, graines, réponses et sources
  sont préservés afin de permettre les comparaisons et les exports futurs.

## Vérification avant validation

Après chaque petit lot validé pédagogiquement :

1. lancer les tests automatiques adaptés ;
2. générer une quantité suffisante de séries et inspecter les cas limites ;
3. contrôler chaque distracteur et son code d'erreur ;
4. comparer question, aide et correction avec la même graine ;
5. tester réellement le téléphone, l'ordinateur et le diaporama ;
6. prendre des captures d'écran représentatives ;
7. contrôler lisibilité, encombrement, zones tactiles et absence de déplacement ;
8. vérifier que les composants partagés ont été réutilisés ;
9. corriger puis recommencer si le résultat visuel ou pédagogique n'est pas
   satisfaisant.

## Clôture et publication

- Un travail testé n'est pas encore un travail publié. Chaque compte rendu
  final indique explicitement l'un des états suivants : modifications locales,
  branche poussée, pull request ouverte, fusionnée, ou site déployé.
- Lorsque la consigne est « terminer », « publier » ou « mettre en ligne », le
  travail va jusqu'à la publication prévue par le dépôt. Pour la bêta
  collaborative, cela signifie : petit commit cohérent, branche poussée et
  pull request ouverte vers la branche protégée ; aucune publication directe
  silencieuse sur `main`.
- Si la publication n'a pas été demandée ou reste techniquement bloquée, le
  compte rendu doit afficher clairement « reste à publier » et préciser
  l'action manquante. Ne jamais laisser l'utilisateur croire que des
  modifications locales sont déjà disponibles sur le site.
- Avant de passer à un autre thème, contrôler qu'aucun lot validé ne reste
  local ou sans pull request. Si c'est le cas, le signaler spontanément.

## Points actuellement contradictoires ou incomplets

Aucune contradiction documentaire connue ne subsiste pour `dnb_02` et
`dnb_39` après leur séparation du 16 juillet 2026. Les décisions suivantes
sont maintenant appliquées :

- le cours reste accessible en modes « Avec aide » et « Sans aide » ; ce sont
  les aides facultatives de la question qui sont masquées en mode sans aide ;
- le manifeste, le module et le registre pédagogique déclarent tous les
  niveaux 5e, 4e, 3e et DNB ;
- le générateur, la sélection et le rendu de `dnb_02` sont isolés dans trois
  extensions fonctionnelles ;
- les deux familles négatives ont quitté `dnb_02`, qui reste entièrement
  positif ;
- `dnb_39` restaure comparaison négative, encadrement négatif et ancienne
  somme de décimaux relatifs, avec leur provenance documentée ;
- `numbers.glisse-nombre` reste réservé aux changements de rang par 10, 100 et
  1 000 dans `dnb_02b`.

Le point encore ouvert est l'étoffement futur de `dnb_39`. Une nouvelle aide
pour la somme relative ne doit pas être inventée uniquement pour afficher un
bouton : la méthode reste dans le cours jusqu'à validation d'une représentation
réellement utile.

## Journal de décision

- **2026-07-16 — Largeur mobile des tableaux et schémas en barres.** Le rendu
  de « Fraction d’un nombre et pourcentage » devient la référence commune :
  700 unités utiles dans un cadre de 760, cases hautes et hauteur uniforme. Le
  composant `geometry.triangle-angle-sum` applique cette règle ; son cas
  impossible reste volontairement plus court, avec 640 unités utiles, et réduit
  proportionnellement les deux rangées afin de garder la plus longue entièrement
  visible.
- **2026-07-16 — Coordonnées dans un repère `dnb_15`.** Les neuf gabarits
  historiques restent figés. La réponse du gabarit à deux points est composée
  en deux groupes autonomes et passe sur deux lignes sur téléphone. Trois
  formats fonctionnels limités sont ajoutés hors de la banque : placer un
  point, placer successivement deux points et juger une affirmation vrai/faux.
  Une série de 5 en contient un ; les erreurs vrai/faux visent l’ordre et les
  signes. Les décisions détaillées sont consignées dans
  [`COORDONNEES-AUTOMATISMES.md`](COORDONNEES-AUTOMATISMES.md).
- **2026-07-16 — Droite graduée `dnb_14`.** Les 18 gabarits de la banque V1.18
  restent inchangés. Trois formats fonctionnels limités sont ajoutés hors de la
  banque figée : placer un point, déterminer le pas et choisir la droite
  correcte. Leurs distracteurs suivent l’index
  `docs/data/eduscol-droites-graduees.json` ; les étiquettes d’abscisses à
  déplacer et le problème intermédiaire « 7 et 10 » restent exclus.
- **2026-07-16 — Cours sans aide.** Le mode « Sans aide » masque l'étayage de la
  question mais laisse le cours général accessible dans toutes les catégories.
- **2026-07-16 — Variété des séries.** La combinaison direct/QCM/inverse/contexte/
  raisonnement est une grille d'analyse adaptable, pas un quota commun.
- **2026-07-16 — Distracteurs diagnostiques.** Chaque proposition fausse est
  contrôlée, plausible et reliée à un code d'erreur stable lorsque le
  générateur la construit.
- **2026-07-16 — Questions tactiles.** Elles peuvent rester disponibles sur
  ordinateur. Une incompatibilité réelle avec le diaporama se traite avant le
  tirage, par remplacement, et non par masquage après génération.
- **2026-07-16 — Évolution de `dnb_02b`.** La banque V1.17 conserve ses douze
  numéros historiques. La couche fonctionnelle transforme les anciens tirages
  mixtes 7 et 8 en contexte monétaire et analyse d'erreur, avec une version de
  gabarit 2 dans les nouvelles séries. Le générateur passe en version 1.13.0
  afin qu'une même version de lien ne produise jamais deux séries différentes.
- **2026-07-16 — Banque V1.19.** La séparation des décimaux relatifs porte la
  banque à 43 modules et 476 gabarits. Le générateur passe en version 1.14.0 ;
  le nouveau code MG1 permanent de `dnb_39` est 42.
- **2026-07-16 — Banque V1.20 et filtre DNB des relatifs.** Dès lors que les
  calculs avec des décimaux relatifs sont proposés dans le filtre DNB,
  l’addition d’entiers relatifs doit également y rester accessible. `dnb_38`
  porte donc les niveaux 5e, 4e, 3e et DNB, comme `dnb_39`. Ce changement de
  classement ne modifie ni les huit gabarits de `dnb_38`, ni leurs tirages.
- **2026-07-16 — Clôture et publication.** Tout compte rendu distingue l'état
  local, poussé, en pull request, fusionné et déployé. Une demande de
  publication inclut le commit, le push et la pull request de la bêta ; un lot
  encore local doit être signalé spontanément.
- **2026-07-16 — Décimaux.** Les décisions propres à `dnb_02` sont consignées
  dans [`DECIMAUX-AUTOMATISMES.md`](DECIMAUX-AUTOMATISMES.md).
- **2026-07-16 — Décimaux relatifs et espace écran.** `dnb_02` devient
  exclusivement positif ; `dnb_39` récupère les familles négatives et la somme
  historique. Les cartes acceptent glisser et toucher–toucher. Les calculs,
  consignes, réponses et composants sont dimensionnés après captures aux
  écrans de référence. Les décisions sont consignées dans
  [`DECIMAUX-RELATIFS-AUTOMATISMES.md`](DECIMAUX-RELATIFS-AUTOMATISMES.md).

Lorsqu'un nouveau point est validé, consigner ici la date, la décision, les
catégories concernées et les composants retenus. Ne pas transformer une piste
de discussion en règle avant validation explicite.
