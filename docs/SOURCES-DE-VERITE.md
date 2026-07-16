# Sources de vérité des composants maths&go

Ce registre empêche de redessiner une représentation déjà validée. Les chemins
`/outils/…` désignent le dépôt public `bourgault314/maths`. Les chemins
`modules/…` et `shared/…` désignent cette bêta.

Les familles qui n’ont pas encore de composant et leur ordre de traitement sont
recensés dans [`AUDIT-VISUELS-RESTANTS.md`](AUDIT-VISUELS-RESTANTS.md).

Les statuts sont :

- **branché** : au moins une question appelle le composant commun ;
- **partiel** : certaines variantes l'appellent, d'autres restent historiques ;
- **préparé** : visible et testé dans le catalogue, pas encore substitué aux
  figures historiques.

| Composant bêta | Référence principale à comparer | État dans Automatismes |
|---|---|---|
| `numbers.number-line` | `modules/numbers/dnb_14.js` historique | branché |
| `numbers.glisse-nombre` | `/outils/plateaux_manipulation/glisse_nombres_decimaux.html` | branché |
| `numbers.square-area` | `dnb_07` et `/outils/plateaux_manipulation/aire_perimetre_plateau.html` | branché |
| `numbers.relative-tokens` | `/outils/nombres_relatifs/` | branché dans `dnb_38` |
| `arithmetic.relation-bar` | `/outils/sheet_generator_schema_partie_tout.html` et gabarits multiples/fractions | partiel |
| `arithmetic.fraction-percent-bar` | gabarits fractions et pourcentages publiés | partiel |
| `arithmetic.equal-sharing-board` | `/outils/gabarits_partage_equitable_2_3_4_5.pdf` | branché dans `dnb_08`, gabarit 10 |
| `arithmetic.fraction-wall` | `/outils/fractions/mur_fractions.html` | partiel |
| `arithmetic.fraction-decimal-grid` | `modules/numbers/dnb_01.js` historique | branché |
| `arithmetic.fraction-operations` | `dnb_03`, `dnb_03b` et `/outils/fractions/fractions_produit_manipulation.html` | branché |
| `algebra.equation-splat` | `/outils/splat/`, `/outils/equasplat.html` et `/outils/equabarre.html` | partiel |
| `algebra.inquiry-bar` | `/outils/problemes_barres.html` et gabarits d'enquêtes | préparé/partiel |
| `algebra.algebra-tiles` | `/outils/tuiles_algebriques/` | partiel |
| `algebra.area-model` | générateur d'exercices de `/outils/tuiles_algebriques/` | partiel |
| `algebra.relation-tiles` | `modules/numbers/dnb_09.js` historique | partiel |
| `measures.conversion-table` | `/outils/conversions/` et `dnb_19` | branché |
| `geometry.coordinate-plane` | `modules/geometry/dnb_15.js` historique | branché |
| `geometry.thales-configuration` | fiches Thalès publiées et `dnb_25` | partiel |
| `geometry.triangle-angle-sum` | `/outils/angles/anglebarre.html` et fiche Angles v11 | branché |
| `geometry.pythagoras-mill` | `/outils/plateaux_manipulation/moulin_pythagore.html` | partiel |
| `geometry.pythagoras-bar` | `/outils/pythabarre.html` et PythaBarre v34 | branché/partiel |
| `geometry.pythagoras-reasoning` | `dnb_24` et contrats Pythagore de `/studio/` | branché |
| `geometry.pythagoras-builder` | `dnb_24b` et plateau Pythagore tactile | branché |
| `geometry.solid` | les 35 gabarits de `modules/geometry/dnb_20.js` | préparé |

## Règles

1. La version publique la plus riche reste la référence tant qu'une comparaison
   n'a pas prouvé l'équivalence.
2. Un PDF ou une capture sert de référence, jamais de moteur de rendu.
3. Une variante téléphone n'écrase pas une variante projection ou impression.
4. Une modification de cette table accompagne toute nouvelle extraction ou
   tout changement de source canonique.
5. Les sources tronquées sont conservées comme traces, mais ne deviennent pas
   des archives maîtres.

## Bibliothèque générale future

Les composants éprouvés ici pourront alimenter le Studio maths&go. Le Studio
n'en crée pas une copie concurrente : il conserve leur contrat sémantique,
leurs sources, leurs supports et leur statut de validation, puis les appelle via
un adaptateur.
