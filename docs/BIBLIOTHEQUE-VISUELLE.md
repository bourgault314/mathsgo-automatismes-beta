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
gabarits de `dnb_14`. Ses paramètres décrivent les repères chiffrés et les
points, ce qui couvre les unités entières, les relatifs, les graduations
fractionnaires, les échelles variables et la lecture de deux points. Les SVG
répétés ont été remplacés par ce composant sans changer la banque V1.15.

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
arrondies et sommet `A` pointu. Cette version `0.1.0` est visible dans le
catalogue mais ne remplace pas encore les figures des exercices.
