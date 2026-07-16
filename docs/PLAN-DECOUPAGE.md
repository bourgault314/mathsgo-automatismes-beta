# Plan de découpage de la bêta

## Objectif

Permettre de modifier un automatisme sans intervenir dans le moteur général et
sans modifier le comportement des autres modules. Le découpage sert aussi à
réutiliser une représentation validée dans une fiche, un parcours ou le futur
Studio maths&go.

Il ne s'agit pas de supprimer le plus de SVG possible. La réussite se mesure à
la capacité de modifier localement génération, sélection, rendu, aide et
correction tout en conservant le résultat pédagogique attendu.

## État actuel

- 42 modules et 473 gabarits sont isolés dans `auto/scripts/modules/` ;
- le manifeste charge les modules sans recopier leurs blocs dans la page ;
- 36 modules sur 42 possèdent un classement pédagogique complet ;
- 24 composants visuels partagés sont enregistrés ;
- la banque V1.17, les codes MG1 et les rendus de référence sont testés ;
- génération, fréquences, rendus et corrections restent encore partiellement
  couplés à `02-question-engine.js`, `03-slideshow.js` et `04-app.js`.
- `dnb_08` éprouve désormais un registre fonctionnel séparant génération,
  sélection et rendu sans changer la banque ni les séries à seed identique.

## Cible progressive

Un module conserve toujours un point d'entrée stable :

```text
auto/scripts/modules/<domaine>/<module-id>.js
```

Lorsqu'un pilote justifie une séparation plus fine, il peut devenir :

```text
auto/scripts/modules/<domaine>/<module-id>/
  module.js       métadonnées et gabarits
  generate.js     paramètres et réponses canoniques
  selection.js    familles, poids et règles de couverture
  render.js       question, aide et correction propres au module
```

Cette arborescence n'est pas appliquée en masse. Elle doit d'abord être éprouvée
sur un seul module stable. Une question ne devient pas un fichier : le bon
niveau de séparation reste la notion pédagogique.

Les éléments réellement partagés restent dans :

- `shared/pedagogy/` pour les tâches, réponses, aides et contrats ;
- `shared/visuals/` pour les représentations paramétriques ;
- `core/` pour les séries, identifiants et liens ;
- les moteurs communs uniquement pour l'orchestration générique.

## Contraintes à préserver

- conserver les 42 identifiants de modules ;
- conserver les codes numériques permanents des liens MG1 ;
- conserver les numéros `n` des gabarits ;
- conserver la reproductibilité d'une série à seed identique ;
- ne pas modifier l'empreinte V1.17 pendant une extraction pure ;
- ne pas déplacer une règle propre à une notion dans un composant générique ;
- comparer la meilleure source maths&go avant de remplacer un rendu ;
- vérifier téléphone et ordinateur avant de déclarer un support compatible ;
- publier et tester chaque petit lot avant de poursuivre.

## Étapes déjà terminées

1. Tests de structure et banque V1.17 figée.
2. Contrat minimal d'un module.
3. Isolation des 42 banques par domaine.
4. Pilotes simples et visuels (`dnb_08`, `dnb_07`).
5. Classement pédagogique complet de Nombres et calculs.
6. Classement pédagogique complet d'Espace et géométrie.
7. Extraction de 24 composants visuels et tactiles.
8. Classement du premier lot Données : probabilités, fréquences, moyennes,
   médiane et étendue (`dnb_28` à `dnb_31`).

## Ordre de travail actuel

### 1. Pilote fonctionnel complet

Le pilote `dnb_08` est complet : génération, cycle de sélection et rendu sont
locaux au module ; le gabarit 10 appelle l’aide de partage commune, avec total
visible dans la question et parts révélées dans la correction. Les gabarits et
leur empreinte restent inchangés. Le contrat doit maintenant être observé avant
de choisir le pilote pédagogique visuel suivant.

### 2. Données et Algorithmique

Le premier lot `dnb_28` à `dnb_31` est classé. Classer maintenant `dnb_32` à
`dnb_37`, puis choisir les représentations réellement partagées : graphiques,
diagrammes, arbres de probabilité, quadrillages et blocs nécessaires aux
questions. Ne pas reproduire un logiciel complet.

### 3. Visuels encore historiques

Migrer par familles homogènes et uniquement après comparaison avec
[`SOURCES-DE-VERITE.md`](SOURCES-DE-VERITE.md) :

- `dnb_20` : solides et objets ;
- `dnb_27` : transformations sur quadrillage ;
- `dnb_16` : figures codées ;
- `dnb_21` : périmètres et figures composées ;
- `dnb_36`, `dnb_32`, `dnb_33` : graphiques et probabilités.

Le composant `geometry.solid` est préparé. Les figures de `dnb_20` restent la
référence tant que chaque variante utile n'est pas équivalente ou meilleure.

### 4. Jeux et manipulations

À partir de `numbers.relative-tokens`, `geometry.pythagoras-builder` et
`numbers.glisse-nombre`, définir un contrat pour l'état, les gestes, la
réinitialisation, la validation et la correction. Ce contrat alimentera le
Studio ; il n'est pas créé comme un second moteur dans la bêta.

### 5. Revue et passage en production

Tester les 42 modules sur téléphone et ordinateur : sans/avec aide,
question/correction/cours, fin de série, tirages et modes avec/sans
calculatrice. Transférer une version validée vers le dépôt public seulement
après cette revue.

## Travail parallèle

Le contenu peut continuer pendant le découpage, mais deux branches ne modifient
pas le même module. Les fichiers globaux `02-question-engine.js`,
`03-slideshow.js` et `04-app.js` ne sont confiés qu'à un seul chantier à la
fois. La trigonométrie reste hors périmètre lorsqu'une reconstruction dédiée est
en cours.
