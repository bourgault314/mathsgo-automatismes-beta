# Décimaux — Automatismes maths&go

Ce document consigne les décisions validées pour la catégorie `dnb_02`,
« Comparer et calculer avec des nombres décimaux ». Il complète le
[`PROTOCOLE-AUTOMATISMES-MATHSGO.md`](PROTOCOLE-AUTOMATISMES-MATHSGO.md) sans
créer de règle commune aux autres catégories.

## Périmètre validé le 16 juillet 2026

- La catégorie reste accessible dans les filtres 5e, 4e, 3e et DNB.
- Elle couvre quatre blocs : comparer/ranger, encadrer, calcul additif et
  calcul multiplicatif.
- Les sommes de décimaux relatifs en sont retirées. La future catégorie
  « Somme de nombres décimaux relatifs » ne doit pas être créée vide ni conçue
  avant la validation de ses familles de questions.
- Une interaction pensée pour le téléphone reste utilisable sur ordinateur ;
  aucune restriction selon l'appareil n'est ajoutée.

## Douze familles de questions

| N° | Famille | Forme de réponse |
|---:|---|---|
| 1 | comparer trois décimaux positifs | QCM |
| 2 | comparer trois décimaux négatifs | QCM |
| 3 | ranger trois décimaux de même partie entière | cartes à placer |
| 4 | encadrer un décimal positif entre deux entiers consécutifs | étiquettes à placer |
| 5 | encadrer un décimal négatif entre deux entiers consécutifs | étiquettes à placer |
| 6 | additionner deux dixièmes complémentaires pour obtenir 1 | saisie courte et aide visuelle |
| 7 | soustraire deux décimaux | saisie courte |
| 8 | trouver le complément décimal à 1 | saisie courte et aide visuelle |
| 9 | multiplier un décimal par un entier | saisie courte et tableau de distributivité en aide |
| 10 | diviser exactement un décimal par un entier | saisie courte et schéma en barres en aide |
| 11 | partager une quantité décimale dans un contexte très court | saisie courte et schéma en barres en aide |
| 12 | décomposer une multiplication par distributivité | produits partiels à placer |

La difficulté technique reste modérée : les valeurs servent à vérifier la
compréhension de la notion sans transformer l'automatisme en calcul long.

## Composition des séries

La grille « direct, QCM, inverse, contexte, raisonnement » est une source
d'inspiration, pas un quota commun. Pour une série de dix questions consacrée
à `dnb_02`, la sélection vise :

- 2 questions de comparaison ou rangement ;
- 2 encadrements ;
- 3 calculs additifs ;
- 3 calculs multiplicatifs.

Les familles tournent avant de se répéter. Cette répartition appartient à
`dnb_02` et ne doit pas être recopiée automatiquement dans un autre domaine.

## Représentations et aides

- Le rangement réutilise `numbers.order-cards`.
- L'encadrement réutilise `numbers.number-line`. Le décimal est déjà placé sur
  une droite courte ; l'élève place les deux entiers consécutifs dans les
  emplacements de gauche et de droite. Quatre étiquettes proposent deux
  distracteurs voisins sans donner la réponse.
- Les compléments à l'unité réutilisent la bande en dixièmes de
  `arithmetic.fraction-decimal-grid`.
- La multiplication réutilise `algebra.area-model` dans le même sens que
  `4,7 × 4 = 4 × 4 + 0,7 × 4`.
- La division réutilise `arithmetic.relation-bar` : le total est connu et une
  part égale est recherchée.

Le cours reste accessible en modes « Avec aide » et « Sans aide ». Il appelle
les mêmes composants, avec les mêmes couleurs et le même sens mathématique,
que les aides facultatives des questions. Aucune aide artificielle n'est créée
pour la soustraction lorsqu'un rappel dans le cours suffit.

## Interaction tactile et diaporama

Pour le rangement, l'encadrement et la distributivité, le geste principal est
« toucher une carte, puis toucher une case ». Le clavier natif ne s'ouvre pas.
La même interaction fonctionne au clic et au clavier sur ordinateur.

En mode diaporama, les emplacements restent vides et lisibles pour une
résolution collective ; la correction présente le même composant dans son état
résolu. La manipulation n'est jamais indispensable pour comprendre l'énoncé.

## Vérifications figées

- Les douze familles sont testées sur 250 graines, avec contrôle de la variété
  et des cas mathématiques attendus.
- Une série de dix questions contrôle la répartition 2 + 2 + 3 + 3.
- Les tests vérifient le branchement des composants partagés, la politique
  d'aide et les trois contrats de manipulation propres aux décimaux.
- Les références visuelles restent le téléphone portrait 390 × 844,
  l'ordinateur 1280 × 720 et le mode diaporama.

## Point encore ouvert

La conception de « Somme de nombres décimaux relatifs » reste à discuter. Elle
ne fait pas partie du présent lot.
