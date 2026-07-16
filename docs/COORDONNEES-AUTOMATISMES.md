# Coordonnées dans un repère — décisions du module `dnb_15`

## État historique conservé

La banque V1.20 conserve ses neuf gabarits et leurs numéros :

1. lecture d’un couple dans le premier quadrant ;
2. lecture avec une abscisse négative ;
3. point sur un axe ;
4. lecture dans le troisième quadrant ;
5. lecture de deux points ;
6. demi-unités ;
7. abscisse seule ;
8. ordonnée seule ;
9. choix du couple avec inversion de l’ordre ou erreur de signe.

Le composant commun reste `geometry.coordinate-plane`. Les coordonnées sont
des données mathématiques ; la taille de l’écran ne change jamais les valeurs.

## Correction de la lecture à deux points

Le gabarit 5 garde le même énoncé et les mêmes réponses. Son pied de réponse
est désormais formé de deux groupes complets, `M(x ; y)` et `N(x ; y)`. Ils
restent côte à côte quand la largeur le permet et passent sur deux lignes
centrées sur téléphone. Aucune case de `N` ne peut sortir horizontalement.

## Formats fonctionnels ajoutés

Les formats 10 à 12 ne modifient pas la banque historique : ils sont produits
par les extensions `generate`, `selection` et `render` du module.

| Format | Tâche | Réponse | Erreurs observées |
|---|---|---|---|
| 10 | placer un point | toucher une intersection puis valider | axe, ordre, signe |
| 11 | placer deux points | choisir `M` ou `N`, toucher leurs intersections, valider | point oublié, couples échangés |
| 12 | vrai/faux | choisir une des deux propositions | couple inversé, signe de l’abscisse, signe de l’ordonnée |

Pour le placement, le quadrillage entier va de −3 à 3. Les 49 intersections
sont de grandes zones tactiles invisibles. Le point placé reste une croix fine
et colorée ; il ne devient pas une grosse pastille. Le bouton « Recommencer »
efface uniquement les placements et conserve la même question.

La correction montre les points cibles sur le même repère. En mode diaporama,
la consigne de placement reste utilisable collectivement et la correction est
révélée manuellement.

## Répartition dans les séries

- 5 questions : 1 nouveau format ;
- 10 questions : les 3 nouveaux formats ;
- 15 questions : 4 nouveaux formats ;
- 20 questions : 6 nouveaux formats.

Les familles historiques sont entrelacées afin d’éviter une suite de lectures
identiques. Les fondamentaux restent majoritaires : le placement et le
vrai/faux apportent une autre direction de raisonnement sans rendre le module
plus difficile.

## Choix exclus

- pas de clavier natif pour le placement ;
- pas de glisser-déposer obligatoire : le toucher direct suffit ;
- pas de coordonnées fractionnaires dans les nouveaux placements ;
- pas de distracteur aléatoire ou absurde ;
- pas de second repère ou d’animation décorative qui réduirait la lisibilité.
