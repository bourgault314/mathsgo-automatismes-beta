# Bibliothèque visuelle maths&go

Cette bibliothèque rassemble les figures pédagogiques générées par le code.
Elle doit permettre de réutiliser un rendu déjà validé dans Automatismes ou
dans un autre outil maths&go sans le redessiner ni en réinventer les règles.

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

## Premier composant

`algebra.equation-splat` représente les deux membres d’une équation avec des
Splats et des jetons signés. Son extraction depuis le moteur est strictement
structurelle : les quatre rendus de référence ont le même contenu SVG qu’avant
le déplacement.

Le catalogue de développement est disponible à l’adresse relative
`auto/dev/visual-library.html`. Il est exclu du référencement.

`arithmetic.relation-bar` est le premier socle commun pour les schémas en
barres. Il couvre actuellement le double, le triple, le quadruple, la moitié,
le quart, le prédécesseur et le successeur. Ses dix états de référence sont
également figés sans changement graphique.

`arithmetic.fraction-percent-bar` conserve les découpages en parts égales,
les couleurs des fractions usuelles, les grilles de 1 %, ainsi que la forme et
le placement des accolades. Sept cas de référence couvrent les demis, quarts,
huitièmes et pourcentages usuels ; leurs états question/correction sont testés.

`numbers.number-line` produit la droite graduée utilisée par les dix-huit
gabarits de `dnb_14`. Le mode historique conserve exactement leurs coordonnées.
Le nouveau traceur s'exprime avec une longueur, des bornes, un pas principal,
un sous-pas, une fréquence d'étiquettes et des points placés par leur valeur.
Chaque préréglage déclare ses supports : une droite dense ou longue peut viser
l'ordinateur, la projection et l'impression sans être proposée telle quelle
sur téléphone. Le générateur doit alors choisir une variante courte compatible.

`measures.conversion-table` conserve le tableau interactif de `dnb_19` :
repère de l’unité de mesure, chiffre des unités, virgule fixe, couleurs par
famille, deux positions par unité d’aire et trois par unité de volume. Les
correspondances avec les litres et les alias `a`/`ha` font partie du composant.
Les conversions de durée, visuellement différentes, restent volontairement
séparées.

`numbers.glisse-nombre` conserve le glisse-nombre de `dnb_02b`. La virgule reste
fixe entre unités et dixièmes tandis que la bande grise et les chiffres se
déplacent de une à trois colonnes. Le composant contient son contrôleur complet :
souris, toucher, flèches du clavier, zéros fantômes et animation de correction.
Les cinq références couvrent les deux sens et les facteurs 10, 100 et 1 000.

`geometry.coordinate-plane` produit les repères de `dnb_15`. Son mode historique
reste inchangé. Le nouveau traceur reçoit les dimensions, les bornes des axes,
le pas, le sous-pas et plusieurs points en coordonnées mathématiques ; il trace
explicitement les petits traits de graduation sur les deux axes. Il peut ainsi
fabriquer un repère compact, grand, rectangulaire ou gradué en demi-unités.

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
noir. Ces figures restent visibles dans le catalogue sans remplacer encore les
figures des exercices.
