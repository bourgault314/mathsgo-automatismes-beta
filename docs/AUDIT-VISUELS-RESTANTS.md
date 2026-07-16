# Audit des visuels restant à extraire

## But

Cet audit transforme le reste du chantier en liste contrôlable. Il ne compte
pas seulement les balises SVG : il distingue les données indispensables, les
aides facultatives, les composants déjà partagés et les représentations encore
enfermées dans un module ou dans le moteur commun.

État de référence après le classement complet :

- 42 modules et 473 gabarits ;
- 42 modules sur 42 classés pédagogiquement ;
- 25 composants visuels enregistrés ;
- 110 balises SVG historiques dans douze fichiers de banque ;
- 84 types de tâches, couvrant 186 questions, avec un rôle visuel déclaré mais
  sans composant partagé.

Le dernier nombre n’est pas un nombre de dessins à refaire. Il comprend aussi
des tableaux HTML indispensables, des aides déjà générées par le moteur et la
trigonométrie volontairement laissée hors de ce chantier.

## Ce qui est déjà protégé

### Fractions

Les fractions ne doivent plus être redessinées librement dans chaque module.
Les grilles fraction–décimal, opérations, barres fraction–pourcentage, murs et
partages équitables possèdent des composants séparés et testés. Une nouvelle
représentation doit réutiliser leurs conventions : numérateur et dénominateur
centrés, une barre continue, des parts jointives et une quantité coloriée
inchangée entre question et correction.

### Tableaux

Les tableaux des modules Données sont classés comme données de l’énoncé. Ils
restent visibles dans les modes avec et sans aide. Leur extraction future doit
standardiser bordures, alignements et comportement sur téléphone sans les
transformer en schémas facultatifs.

### Schémas en barres

`arithmetic.relation-bar`, `arithmetic.fraction-percent-bar` et
`arithmetic.equal-sharing-board` couvrent déjà les relations, fractions,
pourcentages repères et partages. Les barres de moyenne, proportionnalité et
évolution restent encore dans le moteur commun ; elles devront reprendre ces
conventions plutôt que créer une quatrième grammaire concurrente.

## SVG encore présents dans les banques

| Module | SVG | Situation actuelle |
|---|---:|---|
| `dnb_20` | 30 | solides et objets ; `geometry.solid` est préparé mais pas encore substitué |
| `dnb_27` | 12 | transformations et placements sur quadrillage |
| `dnb_37` | 12 | dix piles de blocs et deux quadrillages de déplacement |
| `dnb_21` | 10 | figures de périmètre et contours composés |
| `dnb_16` | 10 | figures codées et médiatrices |
| `dnb_36` | 10 | graphiques de dépendance |
| `dnb_25` | 7 | banque historique conservée ; le rendu courant appelle déjà le composant Thalès |
| `dnb_23` | 6 | solides et dimensions pour les volumes |
| `dnb_32` | 5 | bâtons, évolutions et disque partagé |
| `dnb_17` | 4 | figures de vocabulaire des angles |
| `dnb_24` | 2 | figures historiques des deux premières tâches Pythagore |
| `dnb_33` | 2 | graphiques de reconnaissance de la proportionnalité |

Ce comptage décrit la banque, pas nécessairement le rendu actif. Par exemple,
les sept SVG de `dnb_25` restent des références historiques alors que le moteur
courant rend les questions avec `geometry.thales-configuration`.

## Ordre recommandé

| Lot | Périmètre | Gain attendu | Condition de passage |
|---|---|---|---|
| 1 | `data.cartesian-graph` pour `dnb_32`, `dnb_33`, `dnb_36` | une API commune pour 16 graphiques cartésiens et correction des échelles | préréglages comparés sur téléphone et ordinateur avant branchement |
| 2 | `data.pie-chart` et règles des tableaux/pictogrammes de `dnb_32` | cohérence de toute la lecture de données | aucune donnée ne disparaît en mode sans aide |
| 3 | blocs et quadrillages de `dnb_37` | base de la future manipulation pas à pas | état, gestes, remise à zéro et correction conformes au contrat Algorithmique |
| 4 | branchement prudent de `geometry.solid` dans `dnb_20` | réduction possible de 30 SVG | équivalence vérifiée question par question, sans dessin générique appauvri |
| 5 | quadrillages `dnb_27`, figures codées `dnb_16`, périmètres `dnb_21` | familles géométriques réutilisables | comparaison avec les meilleures sources maths&go |
| 6 | aides de `dnb_30`, `dnb_34`, `dnb_35` | sortie des moyennes, doubles lignes et évolutions du gros moteur | conventions de barres communes et tests question/correction |

La trigonométrie `dnb_26` et `dnb_26b` reste hors périmètre tant que sa
reconstruction dédiée est en cours.

## Anomalies découvertes

| Module | Question | Constat | Traitement |
|---|---:|---|---|
| `dnb_28` | 4 | la banque V1.17 déclare `1/2` et `5/6` comme réponses correctes à la probabilité d’obtenir un nombre pair sur un dé | correction de contenu séparée, avec nouvelle empreinte de banque assumée |
| `dnb_33` | 6 | la droite peut atteindre ou dépasser le bord supérieur pour le plus grand coefficient | corriger l’échelle lors du branchement du graphique commun |
| `dnb_36` | 9 | la valeur 25 peut être placée au-dessus de la dernière graduation et de la flèche de l’axe | étendre automatiquement le domaine vertical dans le graphique commun |

Ces anomalies ne sont pas corrigées pendant une extraction pure afin de ne pas
mélanger déplacement technique et modification pédagogique.

## Règle de validation d’un lot visuel

1. Identifier la meilleure source existante dans
   [`SOURCES-DE-VERITE.md`](SOURCES-DE-VERITE.md).
2. Ajouter le composant et ses préréglages au catalogue sans remplacer le
   module.
3. Figer des cas de question et de correction, y compris les valeurs limites.
4. Comparer le même gabarit et la même seed avant et après branchement.
5. Contrôler téléphone et ordinateur ; une limite du navigateur de test est
   signalée, jamais transformée en validation fictive.
6. Publier le petit lot avant de migrer une autre famille.

## Après cet audit

Le contrat commun des manipulations est construit. Le traceur
`data.cartesian-graph` est maintenant préparé avec six préréglages, dont les
deux limites d’échelle repérées. La prochaine étape est la comparaison du même
gabarit et de la même seed avant tout branchement dans les modules.
