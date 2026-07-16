# Documentation des Automatismes maths&go

Ce dossier sépare les règles communes, les contrats techniques et les
décisions propres à une catégorie. Cette séparation évite qu'un chantier
local réécrive ou affaiblisse le cadre général.

## Point d'entrée obligatoire

Avant toute modification, lire le
[`PROTOCOLE-AUTOMATISMES-MATHSGO.md`](PROTOCOLE-AUTOMATISMES-MATHSGO.md).
Il est la seule source canonique des règles pédagogiques, tactiles, visuelles,
de vérification et de publication communes à toutes les catégories.

## Documents de référence

| Document | Rôle |
|---|---|
| [`PROTOCOLE-AUTOMATISMES-MATHSGO.md`](PROTOCOLE-AUTOMATISMES-MATHSGO.md) | règles communes et décisions transversales validées |
| [`CONTRAT-MODULE.md`](CONTRAT-MODULE.md) | structure et évolution d'un module |
| [`CONTRAT-MANIPULATION.md`](CONTRAT-MANIPULATION.md) | état, gestes, validation, correction et remise à zéro |
| [`BIBLIOTHEQUE-VISUELLE.md`](BIBLIOTHEQUE-VISUELLE.md) | composants pédagogiques partagés et préréglages |
| [`SOURCES-DE-VERITE.md`](SOURCES-DE-VERITE.md) | références canoniques des composants |
| [`ARCHITECTURE-CANONIQUE.md`](ARCHITECTURE-CANONIQUE.md) | rôles respectifs de la bêta, de la production et du Studio |
| [`PLAN-DECOUPAGE.md`](PLAN-DECOUPAGE.md) | organisation progressive du code |
| [`RELATIFS-AUTOMATISMES.md`](RELATIFS-AUTOMATISMES.md) | décisions propres à l'addition d'entiers relatifs |
| [`DECIMAUX-AUTOMATISMES.md`](DECIMAUX-AUTOMATISMES.md) | décisions propres à la comparaison et au calcul avec des décimaux |
| [`RECHERCHE-PEDAGOGIQUE-DROITES-GRADUEES.md`](RECHERCHE-PEDAGOGIQUE-DROITES-GRADUEES.md) | décisions propres à la lecture et au placement sur une droite graduée |
| [`COORDONNEES-AUTOMATISMES.md`](COORDONNEES-AUTOMATISMES.md) | décisions propres à la lecture et au placement de points dans un repère |
| [`CORPUS-EDUSCOL-DROITES-GRADUEES.md`](CORPUS-EDUSCOL-DROITES-GRADUEES.md) | sources institutionnelles et erreurs diagnostiques pour `dnb_14` |
| [`DECIMAUX-RELATIFS-AUTOMATISMES.md`](DECIMAUX-RELATIFS-AUTOMATISMES.md) | provenance et décisions propres aux décimaux relatifs |
| [`LECTURE-DONNEES-AUTOMATISMES.md`](LECTURE-DONNEES-AUTOMATISMES.md) | décisions propres à la lecture de tableaux, diagrammes et graphiques |

Les audits et documents de reprise décrivent un état daté du chantier. Ils
servent de traces et de feuilles de route, mais ne remplacent jamais le
protocole ou les contrats ci-dessus.

## Où consigner une nouvelle décision ?

- **Règle commune validée** : dans le protocole et son journal de décision.
- **Décision propre à une catégorie** : dans un document dédié à cette
  catégorie, relié depuis le module ou cet index.
- **Contrat d'un composant** : dans la bibliothèque visuelle, le contrat de
  manipulation et la source de vérité concernés.
- **Piste ou contradiction non résolue** : dans une section explicitement
  marquée comme ouverte, jamais parmi les règles validées.

## Travail en branches

Avant de modifier le protocole, comparer la branche avec `main`. Ne jamais
copier un ancien fichier complet par-dessus la version canonique. En cas de
divergence, conserver toutes les règles communes de `main`, puis intégrer
seulement les décisions nouvelles et validées à l'endroit approprié.
