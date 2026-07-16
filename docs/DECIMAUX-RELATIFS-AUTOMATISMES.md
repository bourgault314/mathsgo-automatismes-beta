# Décimaux relatifs — Automatismes maths&go

Ce document fixe l'amorce validée de `dnb_39`, « Comparer et calculer avec des
nombres décimaux relatifs ».

## Provenance conservée

La séparation n'efface aucune trace :

- `dnb_39` question 1 provient de l'ancienne `dnb_02` question 2
  (comparaison de décimaux négatifs) ;
- `dnb_39` question 2 provient de l'ancienne `dnb_02` question 5
  (encadrement négatif) ;
- `dnb_39` question 3 restaure l'ancienne `dnb_02` question 8, une somme d'un
  décimal positif et d'un décimal négatif.

L'historique Git conserve les gabarits antérieurs. Le classement pédagogique
historique associait `sign-order` à la comparaison, `numbers.number-line` à
l'encadrement et `sign-order`/`estimate` à la somme. Ces intentions sont
maintenant explicites dans le registre de `dnb_39`.

## Contenu initial

| N° | Famille | Réponse | Aide dans la question |
|---:|---|---|---|
| 1 | choisir le plus grand parmi trois décimaux négatifs | QCM | aucune aide artificielle |
| 2 | encadrer un décimal négatif entre deux entiers consécutifs | cartes à placer | droite graduée essentielle |
| 3 | additionner deux décimaux de signes contraires | saisie courte | méthode dans le cours |

La catégorie est accessible en 5e, 4e, 3e et DNB. Les programmes de cycle 4
font travailler comparaison, rangement et addition des nombres décimaux
relatifs ; le niveau DNB conserve l'accès cumulatif à ces automatismes.

## Cours et représentations

Le cours propre à `dnb_39` explique :

- l'ordre des nombres négatifs par leur position et leur distance à zéro ;
- l'encadrement négatif avec la même droite graduée que la question ;
- la somme de signes contraires par comparaison des distances à zéro ;
- un contrôle rapide du signe et de l'ordre de grandeur.

Une nouvelle aide animée ou une flèche de déplacement pour la somme ne doit pas
être inventée sans validation pédagogique. L'explication de cours est
préférable à un bouton « Aide » artificiel.
