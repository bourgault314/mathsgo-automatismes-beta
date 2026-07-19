# Bibliothèque visuelle maths&go

Cette bibliothèque rassemble les figures pédagogiques générées par le code.
Elle doit permettre de réutiliser un rendu déjà validé dans Automatismes ou
dans un autre outil maths&go sans le redessiner ni en réinventer les règles.

La référence à comparer avant toute extraction est recensée dans
[`SOURCES-DE-VERITE.md`](SOURCES-DE-VERITE.md). Cette bibliothèque éprouve les
composants dans Automatismes ; elle ne constitue pas un deuxième Studio.

## Contrat d’un composant

Chaque composant enregistré fournit au minimum :

- un identifiant stable, indépendant d’un exercice précis ;
- une version ;
- une fonction `render(data, état)` qui renvoie un SVG ;
- des paramètres sémantiques, par exemple des coefficients ou des longueurs ;
- des préréglages de référence visibles dans le catalogue ;
- des tests de non-régression qui figent les rendus validés.

Le registre commun se trouve dans
`auto/scripts/shared/visuals/00-registry.js`. Les composants sont classés par
famille dans `auto/scripts/shared/visuals/`.

Les outils qui changent d’état possèdent en plus un contrat dans
[`CONTRAT-MANIPULATION.md`](CONTRAT-MANIPULATION.md). Le rendu et l’interaction
restent séparés : une nouvelle interface peut réutiliser le même état, les
mêmes actions et la même correction.

## Premier composant

`algebra.equation-splat` représente les deux membres d’une équation avec des
Splats et des jetons signés. Son extraction depuis le moteur est strictement
structurelle : les quatre rendus de référence ont le même contenu SVG qu’avant
le déplacement.

Le registre de `dnb_13` classe les équations à une opération, les formes
affines, les valeurs signées, l’inconnue dans les deux membres, les QCM et les
problèmes. Il conserve comme règles communes la même opération dans les deux
membres, les signes des jetons, la position des Splats et le X arrondi de la
méthode maths&go.

Le catalogue de développement est disponible à l’adresse relative
`auto/dev/visual-library.html`. Il est exclu du référencement. Il affiche aussi
le registre pédagogique : pour chaque notion migrée, on peut y contrôler les
types de questions, les réponses attendues, le rôle des figures et les aides
associées sans ouvrir le moteur.

`arithmetic.relation-bar` est le premier socle commun pour les schémas en
barres. Il couvre le double, le triple, le quadruple, le quintuple et le
décuple, ainsi que la moitié, le tiers, le quart, le cinquième, le dixième, le
prédécesseur et le successeur. La construction reprend la version la plus
riche déjà publiée : parts au-dessus du tout pour un multiple, parts sous le
tout pour une fraction, première part colorée, prolongements pointillés et
flèche ×n ou ÷n. Les formats en dix parts sont déclarés trop denses pour un
téléphone et restent destinés à l’ordinateur, la projection ou l’impression.
Dans `dnb_09`, le mode `prominent` agrandit les cases et leurs nombres à
l’intérieur du même espace réservé afin de préserver la place de la consigne.

`algebra.relation-tiles` sort du gros moteur les représentations symboliques
utilisées par le même module : rectangles `n`, carré `n²`, unités positives ou
négatives et tuile `n/q` subdivisée. Les sept compositions de référence
(double, triple, moitié, quart, prédécesseur, successeur et carré) gardent la
géométrie historique du moteur, mais peuvent maintenant être appelées depuis
une question, une aide ou une fiche sans recopier leur SVG.

Le registre pédagogique classe aussi les 18 gabarits de `dnb_09` en huit
tâches : synthèse, calcul d’un multiple, calcul d’une fraction unitaire,
nombre voisin, opération inverse et reconnaissance des trois familles
d’expressions. Le catalogue indique pour chacune le type de réponse, le rôle
facultatif de la figure et l’aide associée.

`arithmetic.fraction-percent-bar` conserve les découpages en parts égales,
les couleurs des fractions usuelles, les grilles de 1 %, ainsi que la forme et
le placement des accolades. Sept cas de référence couvrent les demis, quarts,
huitièmes et pourcentages usuels ; leurs états question/correction sont testés.

Le registre de `dnb_04` indique maintenant si la tâche demande une fraction
unitaire, plusieurs parts, un pourcentage repère ou un calcul contextualisé.
Le même composant peut donc fournir l’aide adaptée sans recopier la barre dans
chaque question.

`arithmetic.equal-sharing-board` reprend les gabarits imprimables « Partager
équitablement en 2, 3, 4 ou 5 ». Ce n’est pas une deuxième barre de fractions :
le composant représente un espace de manipulation, avec une ou deux quantités
de départ, les boîtes arrondies bleu marine, les flèches turquoise et les
espaces de réception. Il reste lisible sur téléphone et peut aussi servir à
produire une fiche ou une diapositive.

`algebra.inquiry-bar` conserve les étapes des enquêtes additives et
multiplicatives : représenter les inconnues, aligner les parts, enlever les
surplus, puis partager la quantité restante. Les zones roses et orange, les
accolades placées sous les barres, les hachures, la coupe rouge et les lignes
de division bleues appartiennent au composant. Il accepte deux ou trois
inconnues additives ainsi que les facteurs multiplicatifs 2, 3, 4 et `n`.

Le cas multiplicatif ×2 est figé selon le gabarit validé : à l’étape 2, seules
les accolades « Petite part » et « Grande part » nomment les zones ; il n’y a
ni « Total » ni « unités » dans les barres. L’étape 3 présente trois cases
orange pointillées. L’étape 4 ne conserve que les deux résultats pointillés et
il n’existe pas d’étape 5.

`arithmetic.fraction-wall` extrait le moteur graphique du générateur public
sans le remplacer. Il accepte une liste de dénominateurs entre 1 et 24, les
couleurs pédagogiques ou pastel, une version noir et blanc et les écritures en
fraction, décimal ou pourcentage. Les murs compacts et les équivalences sont
compatibles téléphone ; le mur de base, plus dense, est réservé à
l'ordinateur, la projection et l'impression.

Le registre de `dnb_05` relie ce mur aux passages
fraction–décimal–pourcentage, aux dénominateurs 10 et 100, à la simplification
et aux QCM à plusieurs écritures. Le mur reste une aide facultative et sa
variante compacte est choisie sur téléphone.

`arithmetic.fraction-decimal-grid` est le plateau propre à `dnb_01`. Il
construit une ou plusieurs unités carrées, les découpages en demis, quarts,
cinquièmes, huitièmes, dixièmes, vingtièmes et centièmes, ainsi que les grilles
de cent cases utilisées pour rendre les écritures décimales visibles. La
correction peut renforcer le regroupement d’une fraction simplifiée sans
changer la quantité coloriée.

`arithmetic.fraction-operations` sort du gros moteur toutes les constructions
de `dnb_03` et `dnb_03b` : bandes superposées, comparaison à largeur totale
fixe, addition, retrait hachuré, changement de dénominateur, modèle d’aire
manipulable, simplification croisée et passage du quotient au produit par
l’inverse. Les deux modules consomment désormais ce composant commun et leurs
sorties restent strictement identiques à celles de l’ancien moteur.

`algebra.algebra-tiles` extrait le langage du dossier maître Calcul littéral :
les carrés `x²`, les rectangles `x` et les unités, chacun en version positive
ou négative, avec contour noir, écriture mathématique interne et légère ombre.
Il conserve les quatre palettes prévues par la source : vert/rouge,
bleu/jaune, Mathigon et blanc/gris. Une expression peut ainsi être composée,
réduite ou montrée en correction sans recopier une image du livret.

`algebra.area-model` prolonge ces tuiles dans les grilles du livret. Les
facteurs sont placés sur les bords et les produits partiels apparaissent en
correction. Le style `tiles` sert à développer une double distributivité ; le
style `table` reprend les cases grises utilisées pour retrouver un facteur
commun. Les signes et coefficients sont des paramètres, pas des dessins figés.
Sa variante `distributivite-decimale` propose deux produits partiels à placer
et conserve la virgule française dans le cours, l'aide et la correction.

Les registres de `dnb_10`, `dnb_11` et `dnb_12` classent tout le bloc Calcul
littéral. La réduction distingue les familles `x²`, `x` et unité, les paires
nulles et la lecture directe des tuiles. La substitution conserve les
parenthèses autour des valeurs négatives et l’ordre des priorités. Le
développement et la factorisation peuvent appeler `algebra.area-model`, avec
produits partiels ou recherche du facteur commun selon la tâche.

`numbers.number-line` produit la droite graduée utilisée par les dix-huit
gabarits de `dnb_14`. Le mode historique conserve exactement leurs coordonnées.
Le nouveau traceur s'exprime avec une longueur, des bornes, un pas principal,
un sous-pas, une fréquence d'étiquettes et des points placés par leur valeur.
Chaque préréglage déclare ses supports : une droite dense ou longue peut viser
l'ordinateur, la projection et l'impression sans être proposée telle quelle
sur téléphone. Le générateur doit alors choisir une variante courte compatible.

La version 1.2 ajoute un rendu de placement sans modifier le mode historique.
Le point visible reste un petit trait bleu conforme aux exercices de lecture ;
une cible transparente de 58 × 96 unités SVG et une poignée de 26 × 11 servent
au toucher. Le point suit seulement l’axe horizontal, s’aimante aux dix
graduations et se soulève pendant le geste pour ne pas être masqué par le doigt.
Chaque graduation possède aussi une cible tactile : toucher le point puis la
graduation, ou utiliser les flèches, remplace le glissement.

`numbers.order-cards` porte les rangements sans saisie : valeurs proposées,
ordre cible et emplacements sont des données sémantiques. Sur téléphone et sur
ordinateur, le geste principal est « toucher une carte, puis toucher une
case » ; la correction présente les mêmes emplacements remplis. `dnb_02`
l'utilise pour ranger trois décimaux sans ouvrir le clavier.

`measures.conversion-table` conserve le tableau interactif de `dnb_19` :
repère de l’unité de mesure, chiffre des unités, virgule fixe, couleurs par
famille, deux positions par unité d’aire et trois par unité de volume. Les
correspondances avec les litres et les alias `a`/`ha` font partie du composant.
Les conversions de durée, visuellement différentes, restent volontairement
séparées.

Le registre de `dnb_19` classe aussi les dix questions par famille de mesure.
Il associe le tableau commun aux longueurs, masses, capacités, aires et
volumes, avec une, deux ou trois positions par unité. Les durées appellent
leur propre représentation en base 60 et ne sont pas forcées dans ce tableau.

`numbers.glisse-nombre` conserve le glisse-nombre de `dnb_02b`. La virgule reste
fixe entre unités et dixièmes tandis que la bande grise et les chiffres se
déplacent de une à trois colonnes. Le composant contient son contrôleur complet :
souris, toucher, flèches du clavier, geste « chiffre bleu puis colonne
d’arrivée », zéros fantômes et rejeu animé de la correction. Le suivi du doigt
reste direct ; seuls l’aimantation et le rejeu sont volontairement ralentis.
Les cinq références couvrent les deux sens et les facteurs 10, 100 et 1 000.

`numbers.relative-tokens` possède trois références équilibrées autour des
paires nulles : somme positive, somme nulle et somme négative. Ces préréglages
permettent au catalogue d’exécuter le composant statique sans recopier le
plateau interactif de `dnb_38`.

Le registre de `dnb_02b` relie maintenant ce composant aux calculs directs,
aux QCM diagnostiques, à un contexte monétaire, à une analyse d’erreur et aux
questions où le facteur ou le nombre de départ manque. La règle pédagogique
est explicite : la virgule reste fixe et ce sont les chiffres qui changent de
colonne.

`numbers.square-area` remplace les neuf copies du carré présentes dans
`dnb_07`. Le côté, l’aire, les valeurs inconnues et le calcul voisin sont
des paramètres ; le composant sait aussi afficher deux carrés dans une même
expression. Ses cinq références couvrent le calcul direct, la recherche du
côté, l’écriture comme produit, un calcul voisin et deux carrés. Elles sont
figées par empreinte et déclarent explicitement leurs supports.

Les quatre derniers modules de Nombres et calculs sont également classés :
`dnb_02` pour les décimaux, `dnb_06` pour la notation scientifique,
`dnb_07` pour les carrés et `dnb_08` pour les critères de divisibilité.
Le domaine Nombres et calculs dispose donc désormais d’un contrat pédagogique
complet pour chacun de ses modules.

`geometry.coordinate-plane` produit les repères de `dnb_15`. Son mode historique
reste inchangé. Le nouveau traceur reçoit les dimensions, les bornes des axes,
le pas, le sous-pas et plusieurs points en coordonnées mathématiques ; il trace
explicitement les petits traits de graduation sur les deux axes. Il peut ainsi
fabriquer un repère compact, grand, rectangulaire ou gradué en demi-unités.

La version 1.2 ajoute le placement tactile sans modifier les huit rendus de
référence. Les intersections entières constituent de grandes cibles invisibles :
l’élève touche une intersection pour placer le point actif, choisit explicitement
`M` ou `N` lorsqu’il y en a deux, puis valide. La correction réemploie le même
repère et montre les positions cibles.

Les registres pédagogiques de `dnb_14` et `dnb_15` décrivent maintenant les
questions qui consomment ces deux traceurs. Pour une droite, ils distinguent
le pas de 1, les relatifs, les pas décimaux, deux points, les QCM et les
échelles variables. Pour un repère, ils distinguent les quadrants, les axes,
les demi-unités, plusieurs points et la lecture d’une seule coordonnée. Ce
classement conserve la même construction tout en permettant au générateur de
choisir une variante adaptée au support.

`geometry.solid` fournit un traceur commun pour le cube, le pavé droit, le
prisme droit, le cylindre, la pyramide, le cône et la sphère. Les faces
visibles, les arêtes cachées pointillées, les palettes par famille, la rotation
et le miroir sont paramétrables. Ses sept préréglages sont vectoriels et
compatibles téléphone, ordinateur, projection et impression. Le composant prend
aussi en charge les prismes pentagonaux, les pyramides triangulaires ou
pentagonales et les mesures utiles aux volumes. Il remplace à l’affichage les
figures géométriques et de comptage de `dnb_20`, ainsi que les solides cotés de
`dnb_23`; les dessins d’objets réels de `dnb_20` restent spécifiques au module.

## Règles d’évolution

1. Une amélioration visuelle est d’abord ajoutée comme préréglage ou nouvelle
   version dans la bêta.
2. Elle est observée dans le catalogue, sur ordinateur et sur téléphone.
3. Les captures ou empreintes de référence ne sont actualisées qu’après
   validation visuelle.
4. Les automatismes consomment une version locale et testée du composant ; ils
   ne dépendront pas d’un autre site au moment de l’affichage.

Le Splat officiel avec son X arrondi, les schémas en barres et les figures de
Thalès seront intégrés suivant ce contrat. Le dépôt séparé de composants ne sera
créé qu’une fois plusieurs composants éprouvés et leur interface stabilisée.

## Référence Thalès

`geometry.thales-configuration` reprend les coordonnées de la fiche méthode
`fiche_reciproque_thales_v9_logo_site.tex` : cas emboîté et cas papillon,
lettres `A, M, N, B, C`, droites `(MN)` et `(BC)`, traits sans extrémités
arrondies et sommet `A` pointu. Le style `course` conserve les couleurs qui
aident à associer les côtés ; le style `exercise` trace la même géométrie en
noir. Ces figures sont visibles dans le catalogue et servent de source commune
aux exercices migrés.

La version `0.4.0` ajoute le cas emboîté non parallèle, les étiquettes de
longueurs et alimente directement les diapositives de `dnb_25` sans modifier
les gabarits historiques. La question utilise le style noir ; l’aide et la
correction colorent les points et les écritures correspondantes, mais pas les
droites elles-mêmes.

Deux rôles d’aide sont distingués. Une figure `essential` appartient à
l’énoncé et reste visible. Une figure `aid-only` est affichée seulement quand
la série est lancée « Avec aide » ; en mode « Sans aide », elle n’est ni
affichée ni révélable. Les questions 6 et 8 de Thalès utilisent ce deuxième
cas afin que l’élève puisse produire lui-même son dessin sans étayage.

Le cours Thalès ouvre un gabarit progressif : figure, tableau des côtés du
petit et du grand triangle, puis égalité des rapports. Le fichier source
`fiche_reciproque_thales_v9_logo_site.tex` devra être importé dans le dépôt
avant d’ajouter le lien d’impression et de figer définitivement les couleurs.

## Référence Angles dans un triangle

`geometry.triangle-angle-sum` est extrait de la fiche
`fiche_angles_triangles_mathsgo_tikz_v11`. Il rassemble désormais dans une
seule API :

- le triangle annoncé comme non nécessairement à l’échelle ;
- les arcs et les mesures des trois angles ;
- le codage carré de l’angle droit ;
- l’angle inconnu puis révélé en correction ;
- la barre entière de 180° et son partage proportionnel en trois cellules ;
- le contrôle d’une configuration impossible lorsque les mesures dépassent
  180°.

Sur téléphone, la largeur de référence de cette barre est celle du composant
`arithmetic.fraction-percent-bar` : 700 unités utiles dans un cadre de 760.
`geometry.triangle-angle-sum` garde cette largeur et porte ses deux rangées à
104 unités de haut. Toutes les cellules d’une rangée ont la même hauteur. Dans
le cas impossible, les deux rangées sont réduites ensemble dans un cadre utile
de 640 unités : ce cas reste volontairement plus court que les tableaux
ordinaires, et la plus longue rangée demeure entièrement visible sans fausser
la comparaison.

Le module `dnb_18` utilise ce composant. Son ancien SVG calculé directement
dans la banque a été supprimé : la géométrie et le modèle en barres peuvent
donc être repris dans une diapositive, une aide, un exerciseur ou une fiche
sans être redessinés.

La variante tactile du même composant montre le triangle, quatre cases et les
cartes `180°`, deux mesures connues et `𝑥`. Elle valide d’abord le placement,
puis ouvre la saisie de l’angle manquant. L’orientation de la barre totale peut
être inversée sans changer le contrat sémantique.

Quand le modèle en barres contient une inconnue réellement résoluble, un bouton
compact « Résoudre dans ÉquaBarre » apparaît juste au-dessus de la barre. Il
ouvre la route technique conservée
`https://mathsgo.re/outils/equabarre_import_splat.html` avec 180° sur la rangée
du haut et les angles connus ou `𝑥` sur la rangée du bas. Aucun bouton n’est
affiché pour le contrôle de cohérence ou le cas impossible, qui ne constituent
pas une équation à résoudre dans ÉquaBarre.

## Vocabulaire et relations entre angles

`geometry.angle-vocabulary` rassemble les dessins utilisés par `dnb_17` et son
cours contextuel : six natures d’angles, angle nommé, comparaison d’ouvertures,
angles opposés, adjacents, complémentaires, supplémentaires, bissectrice,
angles alternes-internes, angles correspondants, rapporteur et équerre. Il
reprend les conventions validées dans
l’espace Axelle : vrais arcs, carré d’angle droit rattaché au sommet, noms à
trois lettres et absence de points décoratifs aux extrémités.

Le tableau des six natures utilise deux colonnes et trois rangées. Ses libellés
restent ainsi lisibles à 390 × 844 au lieu d’être comprimés dans trois petites
colonnes. Le rapporteur conserve les deux échelles et indique le zéro de départ ;
la correction révèle la mesure sans changer de figure.

## Référence PythaBarre

La fiche PythaBarre v34 fournit désormais trois constructions séparées :

- `geometry.pythagoras-mill` dessine le triangle rectangle et les trois carrés
  construits sur ses côtés ;
- `geometry.pythagoras-bar` construit la barre du carré de l’hypoténuse et les
  deux carrés qui la composent. Les trois rectangles sont réellement accolés,
  les couleurs sont reprises dans l’égalité et la largeur des deux parties
  peut être proportionnelle aux carrés calculés. Dans le cours, la variante
  validée utilise des angles droits sans arrondi, aucun signe entre les barres
  et l’égalité colorée `a² = b² + c²` sous le schéma ;
- `geometry.pythagoras-reasoning` produit la rédaction guidée, de la
  justification à la vérification. Il encode explicitement les deux chemins :
  regrouper les carrés connus pour chercher l’hypoténuse, ou soustraire le
  carré connu pour chercher un côté de l’angle droit.
- `geometry.pythagoras-builder` fournit la manipulation autonome : l’élève
  place les côtés au carré et les aires dans l’égalité. Le composant accepte
  l’angle droit, les trois longueurs, le type de tâche et la consigne ; une
  page d’exercice peut donc le réutiliser sans reprendre tout Automatismes.

Chaque composant reçoit les sommets, les noms de côtés, les longueurs, le côté
cherché, l’unité et l’étape à afficher. Les aperçus du catalogue sont donc
générés à partir de ces paramètres : aucune capture de la fiche n’est
utilisée.

Le module `dnb_24` est maintenant classé et branché. Les questions de calcul
affichent PythaBarre comme aide facultative, puis la correction utilise la
rédaction guidée avec le bon chemin, addition pour l’hypoténuse ou soustraction
pour un côté. Le cours appelle les mêmes composants et filtre ses rubriques en
fonction de la tâche : condition, égalité, calcul, racine, réciproque ou
vérification.

Le constructeur tactile est déclaré pour le téléphone et l’ordinateur, mais
pas pour la projection. Dans Automatismes, le module `dnb_24b` l’expose sous
« Manipuler sur téléphone » uniquement lorsque le mode interactif est choisi.

## Classement complet d’Espace et géométrie

Les quinze modules du domaine sont maintenant décrits dans le registre
pédagogique. Le catalogue permet donc de retrouver, sans parcourir le gros
moteur, les familles de questions sur les figures codées, les angles, les
solides, les périmètres, les aires, les volumes, Pythagore, Thalès, la
trigonométrie et les transformations.

Ce classement ne prétend pas que toutes les figures sont déjà séparées. Quand
une construction demeure enfermée dans un ancien module, son champ
`visual.component` vaut explicitement `null`. C’est une dette technique
observable, et non une image de substitution. L’extraction suivante peut ainsi
partir du contrat mathématique déjà écrit et produire un composant paramétrable
adapté au téléphone, à l’ordinateur, à la projection et à l’impression.

## Référence Graphiques de données

`data.cartesian-graph` prépare un repère commun pour les seize graphiques de
`dnb_32`, `dnb_33` et `dnb_36`. Il sait tracer des bâtons, une ligne brisée, une
droite et des points isolés à partir de valeurs mathématiques, de graduations
et de libellés, sans injecter directement des coordonnées SVG dans la banque.

Six préréglages couvrent les cas historiques : catégories, évolution sur cinq
jours, droite passant ou non par l’origine, série de points et croissance
affine. Le domaine est étendu si une donnée dépasse la borne annoncée. Les
valeurs limites 20 de `dnb_33` et 25 de `dnb_36` restent ainsi sous la flèche de
l’axe et reçoivent leur graduation.

Le composant est seulement observable dans le catalogue. Les SVG historiques
restent dans les trois modules jusqu’à comparaison du même gabarit et de la
même seed sur téléphone et ordinateur.

L’audit complet du lot reçu est conservé dans
`docs/AUDIT-RESSOURCES-2026-07-16.md`.
