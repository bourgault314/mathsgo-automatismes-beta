# Décimaux positifs — Automatismes maths&go

Ce document consigne les décisions validées pour la catégorie `dnb_02`,
« Comparer et calculer avec des nombres décimaux ». Il complète le protocole
canonique sans créer de quota commun aux autres domaines.

## Périmètre validé le 16 juillet 2026

- La catégorie reste accessible dans les filtres 5e, 4e, 3e et DNB.
- Elle ne produit que des nombres décimaux positifs.
- Les comparaisons et encadrements négatifs ont été déplacés dans `dnb_39`.
- L'ancienne somme de décimaux relatifs a été restaurée dans `dnb_39` ; sa
  provenance et ses aides prévues sont conservées dans la fiche dédiée.
- Une interaction pensée pour le téléphone reste utilisable sur ordinateur.

## Dix familles positives

| N° stable | Famille | Forme de réponse |
|---:|---|---|
| 1 | comparer trois décimaux positifs | QCM |
| 3 | ranger trois décimaux de même partie entière | cartes à placer |
| 4 | encadrer un décimal positif entre deux entiers consécutifs | étiquettes à placer |
| 6 | additionner deux dixièmes complémentaires pour obtenir 1 | saisie courte et aide visuelle |
| 7 | soustraire deux décimaux positifs | saisie courte |
| 8 | trouver le complément décimal à 1 | saisie courte et aide visuelle |
| 9 | multiplier un décimal par un entier | saisie courte et décomposition en aide |
| 10 | diviser exactement un décimal par un entier | saisie courte et schéma en barres en aide |
| 11 | partager une quantité décimale dans un contexte très court | saisie courte et schéma en barres en aide |
| 12 | décomposer une multiplication par distributivité | produits partiels à placer |

Les numéros 2 et 5 ne sont pas réutilisés : ils identifiaient les deux familles
négatives transférées. La difficulté technique reste modérée afin d'évaluer la
compréhension sans transformer l'automatisme en calcul long.

## Composition des séries

La grille « direct, QCM, inverse, contexte, raisonnement » reste une source
d'inspiration, jamais un quota global. Une rotation complète de `dnb_02` fait
passer ses dix familles positives avant répétition : 2 comparer/ranger,
1 encadrer, 3 additives et 4 multiplicatives.

## Représentations et aides

- Le rangement réutilise `numbers.order-cards`. Trois cases sont séparées par
  `≤` ; « plus petit » et « plus grand » sont placés sous les cases extrêmes.
  La question et sa correction emploient exactement la même géométrie.
- L'encadrement réutilise `numbers.number-line`. Les deux graduations entières
  sont rentrées à l'intérieur de la flèche, le décimal est écrit plus gros et
  quatre cartes proposent deux distracteurs voisins.
- Les compléments à l'unité réutilisent la bande en dixièmes de
  `arithmetic.fraction-decimal-grid`. Un `1` noir est écrit au-dessus de toute
  bande représentant l'unité.
- La multiplication réutilise `algebra.area-model` avec la variante compacte
  `decimal-decomposition`, et non un tableau étroit :
  `4,7 × 4 = (4 + 0,7) × 4 = 4 × 4 + 0,7 × 4`.
- La division réutilise `arithmetic.relation-bar` : le total est au-dessus, les
  parts égales en dessous, les barres sont centrées et la pointe de la flèche
  indique l'arrivée.
- La soustraction n'a pas d'aide artificielle : la méthode appartient au cours.

## Interaction tactile et diaporama

Les cartes de rangement, d'encadrement et de distributivité acceptent deux
gestes : glisser réellement la carte dans une case, ou toucher la carte puis la
case. Le second geste reste l'alternative robuste et accessible. Le clavier
natif ne s'ouvre pas.

En diaporama, les emplacements restent vides et lisibles ; la correction
présente le même composant rempli. Les calculs, consignes, cartes, cases et
réponses utilisent l'espace disponible au lieu de rester artificiellement
petits. Sur téléphone, aucun composant ne doit déborder ni imposer de zoom.

## Vérifications figées

- Les familles sont testées sur au moins 250 graines.
- La rotation vérifie les dix familles positives avant répétition.
- Les composants partagés et les trois contrats de manipulation sont testés.
- Les références visuelles sont le téléphone portrait 390 × 844,
  l'ordinateur 1280 × 720 et le mode diaporama.
