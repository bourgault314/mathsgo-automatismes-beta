# Développer et factoriser dans les Automatismes maths&go

Ce document fixe le périmètre pédagogique du module `dnb_12`. La banque est
unique, mais la sélection des gabarits dépend réellement du niveau. Le filtre
DNB ne doit jamais recevoir silencieusement tout le contenu de 3e.

## Sources vérifiées le 19 juillet 2026

- Programme de mathématiques du cycle 4, annexe 2 :
  <https://www.education.gouv.fr/sites/default/files/document/Annexe%202%20%E2%80%93%20Programme%20de%20math%C3%A9matiques%20pour%20le%20cycle%204-480716.pdf>
- Liste indicative des automatismes du DNB 2026, octobre 2025 :
  <https://www.education.gouv.fr/sites/default/files/2025-10/dnb-2026-liste-indicative-d-automatismes-susceptibles-d-tre-mobilis-s-lors-de-l-preuve-crite-de-math-matiques-s-ries-g-n-rale-et-professionnelle--442401.pdf>
- Ressource Éduscol sur les erreurs en calcul littéral :
  <https://eduscol.education.gouv.fr/media/97794/download?attachment=>
- NCETM, *Arrays and area models* et *Simplifying and manipulating
  expressions* :
  <https://www.ncetm.org.uk/media/8d84e79346e2509/ncetm_ks3_representations_arrays_area_models.pdf>
  et <https://www.ncetm.org.uk/media/zeeniedj/ncetm_ks3_cc_1_4.pdf>

Le programme 2026 place en 5e la reconnaissance somme/produit et l'utilisation
de `k(a + b) = ka + kb` ou `k(a - b) = ka - kb` dans les deux sens. La 4e
consolide la distributivité simple, notamment avec les nombres relatifs. La 3e
ajoute double distributivité, facteur apparent et trois identités remarquables.
La liste du DNB 2026 demande seulement de développer et factoriser une
expression simple, sans technicité excessive.

## Répartition par niveau

| Filtre | Gabarits | Périmètre |
|---|---:|---|
| 5e | 1 à 7, 9 à 14 | structure somme/produit, distributivité simple, premières factorisations, vrai/faux, facteur commun et deux produits à placer |
| 4e | 1 à 18 | consolidation précédente, facteur négatif, développer puis réduire, différence et reconstruction d'une factorisation |
| 3e | 1 à 27 | tout le module, dont double distributivité, facteur apparent et trois identités remarquables |
| DNB | 1 à 9, 15 à 17 | formes algébriques simples, calcul direct ou QCM classique, sans manipulation ni identité remarquable |

Les coefficients restent petits et les calculs sont exacts sans calculatrice.
L'obstacle doit être la structure algébrique, pas l'arithmétique.

## Familles de questions

| Numéro | Tâche | Réponse | Aide |
|---:|---|---|---|
| 1-4 | développer une distributivité simple | saisie | modèle d'aire facultatif |
| 5 | choisir le bon développement | QCM | modèle d'aire facultatif |
| 6-8 | factoriser au maximum par un entier ou par `x` | saisie | aire inverse facultative |
| 9 | choisir la bonne factorisation | QCM | aire inverse facultative |
| 10 | exprimer l'aire développée d'un rectangle | saisie | modèle d'aire facultatif |
| 11 | reconnaître une somme ou un produit | QCM | aucune aide artificielle |
| 12 | juger une égalité de distributivité | vrai/faux | modèle d'aire facultatif |
| 13 | placer deux produits partiels | manipulation | modèle indispensable |
| 14 | choisir le plus grand facteur commun | QCM | aire inverse facultative |
| 15 | développer avec un facteur négatif | saisie | modèle d'aire facultatif |
| 16 | développer puis réduire | saisie | modèle d'aire facultatif |
| 17 | factoriser au maximum une différence | saisie | aire inverse facultative |
| 18 | reconstruire les dimensions à partir des aires | manipulation | modèle indispensable |
| 19-21 | développer deux binômes | saisie | grille de quatre produits facultative |
| 22 | placer les quatre produits partiels | manipulation | grille indispensable |
| 23-24 | factoriser un facteur apparent | saisie | cours, sans dessin forcé |
| 25 | reconnaître une identité remarquable | QCM | cours contextuel |
| 26 | développer le carré d'une somme ou différence | saisie | cours contextuel |
| 27 | factoriser une différence de deux carrés | saisie | cours contextuel |

## Modèle d'aire

Le module utilise `algebra.area-model` dans deux sens.

- Développement : les dimensions sont connues sur les bords, les cases restent
  vides dans la question et reçoivent les produits partiels en correction.
- Factorisation : les aires partielles sont connues dans les cases, les
  dimensions restent inconnues sur les bords et sont révélées en correction.
- Manipulation : le glisser-déposer est doublé du geste robuste « toucher une
  carte puis toucher une case » et d'une alternative clavier.

Les petits coefficients ne sont jamais représentés par une accumulation de
cinq ou six tuiles. Le rectangle porte la structure ; le nombre reste écrit.
Cela conserve la lisibilité sur téléphone et évite de confondre représentation
et dénombrement.

## Factorisation non ambiguë

La consigne est « Factorise au maximum ». Les quotients générés sont premiers
entre eux, de sorte que le facteur attendu est bien le plus grand facteur
commun. La validation accepte aussi l'ordre commuté des termes ou des facteurs
lorsque cette écriture reste mathématiquement équivalente.

## Distracteurs diagnostiques

Chaque proposition fausse correspond à une erreur nommable :

- `forget-second-product` : le facteur extérieur ne multiplie que le premier
  terme ;
- `outer-operation-confusion` : la parenthèse est lue comme opération
  principale ;
- `use-first-coefficient` : le premier coefficient entier est pris pour
  facteur commun sans tester le second ;
- `use-first-quotient` : confusion entre facteur et quotient ;
- `trivial-factor` : choix de 1 alors qu'un facteur plus grand existe ;
- `wrong-middle-sign` : mauvais signe du double produit ;
- `confuse-square-and-conjugates` : confusion entre carré d'un binôme et
  différence de carrés ;
- `square-constant-in-parenthesis` : le carré du terme constant est placé à
  tort dans la parenthèse.

Le QCM n'utilise ni réponse absurde ni valeur choisie seulement parce qu'elle
est différente.

## Cours et correction

Le cours est contextuel. Il affiche seulement les cartes utiles à la question :

1. reconnaître somme et produit ;
2. développer et calculer les produits partiels ;
3. factoriser au maximum ;
4. traiter les signes ;
5. vérifier dans l'autre sens ;
6. effectuer la double distributivité ;
7. repérer un facteur apparent ;
8. reconnaître les trois identités remarquables.

Chaque correction conserve le dessin de la question quand il existe et ajoute
une trace écrite intitulée « Correction expliquée » : opération reconnue,
produits ou quotients intermédiaires, réduction éventuelle et résultat.

## Revue visuelle

Le PDF de revue contient, pour chaque gabarit, exactement deux pages : la
diapositive puis sa correction, avec une même graine. Il est contrôlé en
1280 × 720. Les gabarits manipulables et les plus chargés sont également
contrôlés en 390 × 844 avant publication.
