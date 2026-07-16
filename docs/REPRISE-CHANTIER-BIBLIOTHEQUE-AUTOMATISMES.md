# Prompt de reprise — Bibliothèque et Automatismes maths&go

> Ce fichier est fait pour être donné tel quel à une nouvelle fenêtre Codex.
> Il contient le contexte, les décisions, l’état exact du dépôt au 16 juillet
> 2026 et l’ordre de reprise. Ne pas recommencer l’audit depuis zéro : vérifier
> le `main` distant, puis poursuivre le chantier par petits lots.

## Instruction immédiate à la prochaine IA

Tu reprends le chantier de séparation de la bêta **Automatismes maths&go** de
Gwenaël Bourgault. Lis entièrement ce fichier, puis :

1. travaille dans `bourgault314/mathsgo-automatismes-beta` ;
2. récupère toujours le `main` distant, car plusieurs fenêtres peuvent
   travailler en parallèle ;
3. lis d'abord `docs/ARCHITECTURE-CANONIQUE.md` et
   `docs/SOURCES-DE-VERITE.md`, puis `docs/PLAN-DECOUPAGE.md`,
   `docs/CONTRAT-MODULE.md`, `docs/BIBLIOTHEQUE-VISUELLE.md` et
   `docs/AUDIT-RESSOURCES-2026-07-16.md` ;
4. lance `npm test` avant et après chaque petit lot ;
5. fais un seul objectif cohérent par commit et publie-le rapidement par PR ;
6. ne force jamais une branche, ne remplace pas une version plus récente et ne
   republie pas un composant déjà arrivé sur `main` ;
7. poursuis concrètement le travail au lieu de refaire seulement un rapport ;
8. donne à Gwenaël un lien direct lorsqu’un nouveau rendu est observable.

Première tâche recommandée : vérifier les branches actives, choisir un module
pédagogiquement stable qui n'est pas travaillé ailleurs, puis réaliser un
pilote fonctionnel complet séparant génération, sélection, rendu, aide et
correction. Les solides peuvent continuer par petits sous-ensembles, mais le
nombre de SVG retirés n'est pas une priorité en soi.

## Qui est Gwenaël et ce qu’il construit

Gwenaël est professeur de mathématiques au collège, à La Réunion. Il construit
**maths&go**, un ensemble cohérent d’outils pédagogiques, de générateurs,
d’automatismes, de manipulations et de supports imprimables. Le nom de marque
est toujours **maths&go** : minuscules, `s` final et esperluette. Ne pas écrire
« Matégo » ou « MathéGo » dans l’interface.

Le projet ne se limite pas à un exerciseur. Il formalise le langage pédagogique
et visuel de Gwenaël afin de pouvoir :

- générer rapidement une diapositive, une aide, une correction ou une fiche ;
- réutiliser une figure validée sans la redessiner à chaque discussion ;
- adapter les mêmes objets au téléphone, à l’ordinateur, à la projection et au
  papier ;
- classer les questions, erreurs fréquentes, aides et règles d’aléatoire ;
- construire progressivement une méthode maths&go cohérente ;
- permettre plus tard à Claire, collègue de Gwenaël, de proposer ses
  modifications avec son propre compte GitHub.

Cette bibliothèque restera utile même si les IA deviennent plus puissantes :
elle fixe les choix personnels que l’IA ne peut pas deviner automatiquement
(couleurs, proportions, police, rédaction, étapes d’aide, accolades,
conventions de correction et supports compatibles).

## Dépôts et stratégie bêta

### Production générale

- dépôt : `https://github.com/bourgault314/maths`
- site : `https://mathsgo.re/`

Ce dépôt contient le site public, les menus, les outils et les PDF. Ne pas y
pousser un chantier expérimental d’Automatismes avant validation.

### Bêta Automatismes

- dépôt : `https://github.com/bourgault314/mathsgo-automatismes-beta`
- application :
  `https://bourgault314.github.io/mathsgo-automatismes-beta/auto/`
- catalogue pédagogique et visuel :
  `https://bourgault314.github.io/mathsgo-automatismes-beta/auto/dev/visual-library.html`

Cette bêta est l’espace de travail personnel de Gwenaël et deviendra l’espace
de collaboration avec Claire. Fonctionnement décidé : branche courte, commit
au nom du véritable auteur, PR obligatoire, contrôle manuel, fusion dans la
bêta, puis transfert ultérieur vers la production seulement après validation.
La page de développement peut être publique mais reste hors référencement.

## État exact au moment de la reprise

Dernier `main` contrôlé et servi par GitHub Pages :

- commit `fab71f3` — « Extraire le traceur commun des solides » ;
- PR `https://github.com/bourgault314/mathsgo-automatismes-beta/pull/16` ;
- paquet `1.31.0-beta.0` ;
- banque V1.18 figée ;
- 42 modules ;
- 475 gabarits ;
- 26 composants visuels ;
- 32 modules classés pédagogiquement sur 42 ;
- Nombres et calculs : 17/17 ;
- Espace et géométrie : 15/15 ;
- Données et Algorithmique restent à classer complètement.

Commandes qui passaient au dernier contrôle :

```bash
npm test
node tests/validate-bank.mjs
node tests/validate-visuals.mjs
node tests/validate-pedagogy.mjs
```

Résultat de référence :

```text
OK — 42 modules, 475 gabarits, banque V1.18 figée, registre MG1 cohérent.
OK — registre cohérent, 26 composants visuels dont 7 familles de solides.
OK — 32 modules classés : Nombres et calculs 17/17,
     Espace et géométrie 15/15.
```

## Architecture actuelle

Le découpage est volontaire. De petits fichiers bien nommés sont plus faciles
à réutiliser qu’un énorme moteur, à condition de conserver des contrats clairs.

- `auto/index.html` : page et ordre de chargement ;
- `auto/scripts/00-module-manifest.js` : manifeste ;
- `auto/scripts/01-modules.js` : chargement/agrégation ;
- `auto/scripts/modules/` : banques par notion ;
- `auto/scripts/02-question-engine.js` : instanciation ;
- `auto/scripts/03-slideshow.js` : diaporama, cours, aides et corrections ;
- `auto/scripts/04-app.js` : interface et orchestration ;
- `auto/scripts/core/` : contrats de séries et partage ;
- `auto/scripts/shared/visuals/` : composants paramétriques ;
- `auto/scripts/shared/pedagogy/` : classement sémantique ;
- `auto/dev/visual-library.html` : observation des deux registres.

### Contrat visuel

Un composant fournit : identifiant stable, version, `render(data, état)`,
paramètres mathématiques, préréglages observables, supports (`phone`,
`computer`, `projection`, `print`) et tests de non-régression. Pendant une
migration, garder si possible un point d’entrée historique afin de ne pas
casser les modules.

### Contrat pédagogique

Pour chaque question, le registre doit indiquer : tâche, type de réponse, rôle
de la figure, rubriques d’aide, composant, familles de nombres, paramètres
aléatoires, erreurs classiques et étapes de correction. Le but est de séparer
contenu mathématique, tirage, dessin, aide, correction et interface.

## Les 26 composants déjà présents

### Nombres

- `numbers.number-line` : droite, bornes, pas, sous-pas et points ;
- `numbers.order-cards` : cartes de nombres et emplacements ordonnés ;
- `numbers.glisse-nombre` : bande animée et virgule fixe ;
- `numbers.square-area` : carré, côté, aire et calculs voisins ;
- `numbers.relative-tokens` : jetons relatifs maths&go.

### Données

- `data.cartesian-graph` : courbes, points et diagrammes paramétrables ;

### Arithmétique et fractions

- `arithmetic.relation-bar` : multiples, fractions unitaires et voisins ;
- `arithmetic.fraction-percent-bar` : quantités, pourcentages et accolades ;
- `arithmetic.equal-sharing-board` : partages en 2, 3, 4 ou 5 ;
- `arithmetic.fraction-wall` : mur paramétrable ;
- `arithmetic.fraction-decimal-grid` : bandes, unités et grilles sur 100 ;
- `arithmetic.fraction-operations` : comparaison et quatre opérations.

### Algèbre et problèmes

- `algebra.equation-splat` : équations, Splats et jetons ;
- `algebra.inquiry-bar` : enquêtes additives et multiplicatives ;
- `algebra.algebra-tiles` : tuiles `x²`, `x` et unités signées ;
- `algebra.area-model` : développement/factorisation par aire ;
- `algebra.relation-tiles` : représentations symboliques des relations.

### Mesures

- `measures.conversion-table` : longueurs, masses, capacités, aires et volumes.

### Géométrie

- `geometry.coordinate-plane` : repères et graduations ;
- `geometry.thales-configuration` : emboîtée/papillon, cours/exercice ;
- `geometry.triangle-angle-sum` : triangle, arcs et barre 180° ;
- `geometry.pythagoras-mill` : moulin ;
- `geometry.pythagoras-bar` : PythaBarre ;
- `geometry.pythagoras-reasoning` : rédaction pas à pas ;
- `geometry.pythagoras-builder` : construction manipulable ;
- `geometry.solid` : sept familles génériques de solides.

## Branché ou seulement préparé

Ne pas confondre « visible dans le catalogue » et « utilisé partout ». Le
processus sûr est : composant visible/testé, comparaison, puis migration.

Déjà branchés en partie ou totalement : droite de `dnb_14`, repère de
`dnb_15`, angles de `dnb_18`, glisse-nombre, conversions, carrés de `dnb_07`,
fractions de `dnb_01`, `dnb_03` et `dnb_03b`, relations, plusieurs objets
Pythagore, cours et aides Thalès.

Seulement préparé : `geometry.solid` est publié et observable, mais les 30 SVG
historiques de `dnb_20` sont conservés. Le composant doit d’abord être étendu
aux variantes réelles. Ne remplace pas une figure précise par un dessin
générique moins bon juste pour supprimer une chaîne SVG.

## SVG encore enfermés dans les modules

Au dernier `main`, 110 balises SVG restaient dans douze modules :

| Module | Nombre | Famille |
|---|---:|---|
| `geometry/dnb_20.js` | 30 | solides et objets |
| `geometry/dnb_27.js` | 12 | transformations sur quadrillage |
| `algorithm/dnb_37.js` | 12 | blocs et déplacements |
| `geometry/dnb_21.js` | 10 | périmètres |
| `geometry/dnb_16.js` | 10 | figures codées |
| `data/dnb_36.js` | 10 | graphiques de données |
| `geometry/dnb_25.js` | 7 | Thalès |
| `geometry/dnb_23.js` | 6 | trigonométrie |
| `data/dnb_32.js` | 5 | probabilités |
| `geometry/dnb_17.js` | 4 | angles/vocabulaire |
| `geometry/dnb_24.js` | 2 | Pythagore historique |
| `data/dnb_33.js` | 2 | proportionnalité graphique |

Le comptage n’inclut pas tous les SVG d’interface ni les visuels de cours de
`03-slideshow.js`. Ceux-ci viendront après les modules prioritaires.

## Règles à ne pas perdre

### Identité et navigation

- rendu épuré, lisible et agréable ;
- marque **maths&go** correctement écrite ;
- nouveau logo sur les pages imprimables, jamais l’ancien ;
- navigation cohérente : maison, retour au menu précédent, plein écran si utile ;
- pas de texte explicatif superflu dans les menus ;
- contenu vectoriel, pas de capture d’écran utilisée comme moteur.

### Supports

- le téléphone est un support de conception, pas une réduction automatique ;
- une droite graduée longue n’est pas proposée telle quelle sur téléphone ;
- chaque préréglage annonce ses supports ;
- un tableau dense peut défiler ou être réservé à l’ordinateur ;
- les boutons restent stables et ne font pas monter/descendre la diapo ;
- « Suivant » garde le même ancrage à droite dans tous les modes ;
- une aide ne doit pas déplacer brutalement le contenu ;
- vérifier téléphone portrait et ordinateur avant validation.

### Splats et relatifs

- `x` arrondi, manuscrit horizontal, mais pas enfantin ;
- toujours réutiliser le même `x` ;
- jetons rouge/vert, bord noir, texte noir `+1`/`−1` à l’intérieur ;
- modes noir et blanc et contour seul ;
- les écritures `+…`/`−…` doivent parfois être placées au-dessus, pas à gauche ;
- égalité stable et signe `=` centré.

### Barres et enquêtes

- parts collées et alignées ;
- accolades calculées et placées selon le sens pédagogique ;
- reprendre les flèches et prolongements de la version la plus riche ;
- corrections révélables progressivement ;
- enquête multiplicative ×2 validée : étape 2 uniquement « Petite part » et
  « Grande part », sans Total ni unités ; étape 3 trois cases orange
  pointillées ; étape 4 deux résultats pointillés ; aucune étape 5.

### Droites, repères et glisse-nombre

- pas, sous-pas, bornes et fréquence sont des paramètres ;
- vrais petits traits de graduation sur les axes ;
- plusieurs points et échelles ;
- glisse-nombre : virgule fixe, bande et chiffres mobiles ;
- dixième/centième/millième ne débordent pas ;
- corrections animables.

### Fractions

- briques collées et unité écrite `1`, pas `1/1` ;
- palette du mur : /2,/4,/8 jaune ; /3,/6,/9 bleu ; /12 vert ; /5 rouge ;
  /10 orange ; /7 violet ;
- fractions, décimaux et pourcentages interchangeables ;
- conserver le placement des accolades des gabarits imprimés.

### Thalès

- configurations emboîtée et papillon ;
- figure d’exercice éventuellement entièrement noire ;
- cours coloré pour associer petit/grand triangle ;
- colorer points et écritures, pas les droites parallèles ;
- sommets nets, sans arrondi décoratif ;
- certaines questions textuelles montrent le dessin seulement « Avec aide » ;
- aide possible : tableau petit triangle / grand triangle ;
- cours progressif : figure, tableau, égalité des rapports ;
- futur lien imprimable lorsque la bonne source est archivée ;
- classer direct, réciproque, contraposée, cohérence et choix du rapport ;
- longues questions mises en blocs lisibles sur téléphone.

### Angles, Pythagore et solides

- chapeaux sur les angles et carré d’angle droit propre ;
- barre 180° comme vrai modèle en barres ;
- distinguer moulin, PythaBarre, rédaction et manipulation ;
- couleurs Pythagore fonctionnelles, pas décoratives ;
- surveiller le snap tactile après tout changement responsive ;
- solides attendus : cube, pavé, prismes triangulaire/pentagonal, pyramides
  carrée/triangulaire, cylindre, cône, sphère/boule, tétraèdre et objets ;
- arêtes cachées pointillées, cône redressable et perspectives crédibles ;
- distinguer nom, modélisation et faces/sommets/arêtes ;
- étendre `geometry.solid`, ne pas appauvrir `dnb_20`.

## Aléatoire et contenu : direction

Chaque module devra progressivement avoir un moteur/contrat lisible : familles
et poids de tirage, valeurs avec/sans calculatrice, cas structurants, erreurs
d’élèves pour distracteurs, aides, corrections animées et variantes de support.
Ne crée pas toute l’abstraction d’un coup : stabilise quelques pilotes, puis
généralise. La bibliothèque pourra accueillir jeux et manipulations plus tard,
mais les briques utilisées par Automatismes sont prioritaires.

## Ressources reçues et dédoublonnage

Toujours comparer au site avant de copier et garder la source la plus riche.
Ressources analysées : dossier maître Calcul littéral (quatre palettes), fiche
Angles v11, mur de fractions, PythaBarre v34, enquêtes additives et
multiplicatives, gabarits fractions v11/v4, partage équitable, multiples et
fractions d’une quantité.

Décisions :

- ZIP Calcul littéral tronqué, mais 56 entrées et sources Python récupérées ;
  demander une archive complète avant archivage définitif ;
- ZIP mur de fractions tronqué dès le logo ; demander une archive complète ;
- ne pas remplacer le générateur public du mur, seulement réutiliser son moteur ;
- fiche Angles ajoutée car absente ;
- PythaBarre relié à l’outil ;
- gabarit fractions v11 déjà identique au publié, v4 plus ancien ;
- version publique du partage équitable plus riche que le PDF reçu ;
- `.aux`, `.log`, `.synctex.gz` sont temporaires et ne se publient pas.

Voir `docs/AUDIT-RESSOURCES-2026-07-16.md` pour le détail.

## Corrections déjà réalisées ou à surveiller

- « Suivant » qui se déplaçait : ancrage commun testé ;
- questions Thalès compactes : mode structuré ajouté, revue à poursuivre ;
- cours Thalès trop textuel : gabarit progressif ajouté ;
- débordements du glisse-nombre : composant responsive ;
- graduations de repères absentes : ajoutées ;
- prédécesseur/successeur : typographie uniformisée ;
- interactions Pythagore : surveiller le snap ;
- chargement : manifeste et scripts différés ; ne pas remettre tous les
  modules en bloc dans `index.html`.

## Publication par petits lots

Toujours partir du dernier distant :

```bash
git fetch origin main
git switch -c agent/nom-du-petit-lot origin/main
npm test
git diff --check
git status -sb
```

Puis commit ciblé et PR. Ne pas accumuler plusieurs chantiers : cela a déjà
créé des conflits difficiles. Lors de la dernière publication, `gh` n’était
pas présent et le push HTTPS n’avait pas d’identifiants. La connexion GitHub
de Codex a créé blobs, arbre, commit, branche, PR et fusion. Ne pas s’arrêter à
« installe gh » si cette connexion autorisée est disponible.

Le second lot était déjà publié depuis une autre fenêtre. La comparaison avec
`main` a évité de le republier. Cette vérification est obligatoire.

## Ordre de reprise

### 1. Pilote fonctionnel complet

Choisir un module stable et non travaillé dans une autre fenêtre. Séparer sa
banque, sa génération, sa sélection, son rendu, son aide et sa correction sans
changer la banque V1.18 ni les tirages reproductibles. Publier le contrat avant
de le généraliser.

### 2. Données et Algorithmique

Classer les dix modules restants ; extraire ensuite graphiques, diagrammes,
arbres de probabilité et quadrillage/blocs de `dnb_37`. Ne pas reproduire
Scratch au complet, seulement le langage nécessaire aux questions.

### 3. Visuels historiques, selon les besoins

Comparer chaque fois la source recensée dans `SOURCES-DE-VERITE.md`, puis migrer
un sous-ensemble homogène : solides de `dnb_20`, transformations de `dnb_27`,
figures codées de `dnb_16`, périmètres de `dnb_21` et graphiques de données.
Conserver une figure précise tant que le composant commun est moins bon.

### 4. Trigonométrie

La reconstruction dédiée doit fournir un triangle rectangle orientable : angle
choisi, hypoténuse, adjacent, opposé, connu/inconnu, avec/sans calculatrice.
Une ancienne branche défectueuse est fermée et n'est jamais fusionnée.

### 5. Jeux et manipulations

Définir le contrat d'interaction à partir des jetons relatifs, du constructeur
Pythagore et du glisse-nombre : état initial, gestes, annulation,
réinitialisation, validation et correction. Le Studio appelle ces composants ;
la bêta ne crée pas une deuxième fabrique générale.

### 6. Revue avant arrivée de Claire

Tester les 42 modules sur ordinateur et téléphone : sans/avec aide,
question/correction/cours, boutons, fin de série et aléatoire avec/sans
calculatrice. Corriger module par module, par petits commits. Claire intervient
seulement quand la bêta forme un ensemble suffisamment cohérent.

## Ce qu’il ne faut pas faire

- pas de refonte totale dans un seul commit ;
- pas d’ancienne branche sans `fetch` ;
- pas d’écrasement d’une version plus récente ;
- pas de modification silencieuse des 475 gabarits pendant une extraction ;
- pas de mise à jour d’empreintes uniquement pour faire passer un test ;
- pas de compatibilité téléphone déclarée sans vérifier la densité ;
- ne pas confondre fiche colorée et exercice noir ;
- ne pas remplacer un dessin validé par un générique moins précis ;
- pas de deuxième PDF si le site a déjà une version identique ou meilleure ;
- ne pas supprimer les documents/commentaires techniques : ils peuvent rester
  publics et servent à la continuité ;
- ne pas attendre un énorme chantier avant de publier.

## Relation de travail avec Gwenaël

Gwenaël préfère : analyse brève, annonce de l’action, autonomie, vérification,
petite publication, lien direct. Il n’aime pas les validations automatiques ou
les réponses qui répètent seulement « tu as raison ». Son message peut venir
d’une dictée vocale et se corriger en cours de phrase : reconstruire
l’intention globale et signaler une hypothèse seulement si elle change le
projet. Pendant un travail long, donner des nouvelles courtes et régulières.
Ne pas lui demander des manipulations techniques si les outils disponibles
permettent d’agir directement.

## Définition de la réussite

Le chantier ne réussit pas seulement parce que le gros fichier est découpé. Il
réussit si Gwenaël peut dire « fais une droite courte de tel pas », « affiche
le tableau Thalès », « construis une enquête ×3 », « utilise mes jetons » ou
« fais une version téléphone et imprimable » et obtenir immédiatement un rendu
conforme, paramétrable, testé et réutilisable dans Automatismes, une fiche ou
un nouvel outil.

La prochaine IA doit donc poursuivre séparation **et** branchement, petit lot
après petit lot, sans perdre le contenu pédagogique ni la qualité visuelle.
