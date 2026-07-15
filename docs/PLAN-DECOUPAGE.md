# Plan de découpage de la bêta

## Objectif

Permettre de modifier un automatisme sans devoir intervenir dans le moteur
général et sans modifier le comportement des autres modules.

## Cible

Chaque module disposera à terme de son propre dossier :

```text
auto/modules/<module-id>/
  module.js        métadonnées et gabarits
  generate.js      génération des données aléatoires
  render.js        affichage et aide visuelle propres au module
  selection.js     fréquences et règles de couverture
```

Les composants réellement partagés resteront dans le moteur ou dans une
bibliothèque commune. Une question ne deviendra pas un fichier isolé : le bon
niveau de séparation est le module pédagogique.

Le découpage comporte désormais cinq couches explicites :

1. la banque historique et ses gabarits numérotés ;
2. la logique qui tire les valeurs et construit une instance ;
3. le registre pédagogique qui classe les types de tâches, les réponses, les
   figures et les aides ;
4. les composants visuels partagés ;
5. l’interface qui sélectionne, affiche et recueille la réponse.

Le registre pédagogique est séparé de la banque afin que son enrichissement ne
change ni les gabarits ni leur empreinte de référence.

## Contraintes à préserver

- conserver les 40 identifiants de modules ;
- conserver les codes numériques permanents des liens MG1 ;
- conserver les numéros `n` des gabarits ;
- conserver la reproductibilité d’une série à seed identique ;
- ne pas déplacer une règle pédagogique vers un composant générique sans
  vérifier qu’elle est réellement partagée ;
- valider chaque extraction par les tests avant de poursuivre.

## Ordre proposé

1. Installer les tests de structure et figer l’état V1.15. **Terminé.**
2. Définir le contrat commun d’un module. **Terminé : voir
   `docs/CONTRAT-MODULE.md`.**
3. Extraire deux modules pilotes : un simple et un très visuel. **Terminé :
   `dnb_08` est le pilote simple et `dnb_07` le pilote visuel.**
4. Comparer les séries avant et après extraction.
5. Étendre le découpage domaine par domaine.
6. Ouvrir ensuite la contribution à d’autres personnes.

### Avancement du domaine Nombres

- `dnb_01` à `dnb_14`, ainsi que `dnb_02b` et `dnb_03b`, sont isolés dans des
  fichiers indépendants ;
- les configurations pédagogiques des modules Nombres sont maintenant
  intégrées à leurs fichiers ; elles ne sont plus appliquées après coup par le
  moteur ;
- les dix-huit droites graduées répétées dans `dnb_14` sont maintenant rendues
  par le composant partagé `numbers.number-line` ;
- le glisse-nombre de `dnb_02b`, sa virgule fixe et son contrôleur animé sont
  isolés dans `numbers.glisse-nombre`.

### Avancement du domaine Géométrie

- `dnb_15` à `dnb_27`, ainsi que `dnb_26b`, sont isolés dans des fichiers
  indépendants ;
- les configurations pédagogiques sont intégrées à leurs fichiers ; elles ne
  sont plus appliquées après coup par le moteur ;
- les neuf repères répétés de `dnb_15` sont rendus par
  `geometry.coordinate-plane` ;
- le tableau interactif de conversion de `dnb_19` est isolé dans
  `measures.conversion-table` ; le moteur conserve l’assemblage de l’exercice,
  mais plus la construction du tableau.
- `dnb_25` est le premier pilote du registre pédagogique : ses dix gabarits
  Thalès sont classés individuellement avec leur mode de réponse, le rôle de la
  figure et les rubriques d’aide pertinentes.

### Avancement des domaines Données et Algorithmique

- `dnb_28` à `dnb_36` et `dnb_37` sont isolés dans des fichiers indépendants ;
- leurs configurations pédagogiques sont intégrées à leurs fichiers ;
- le fichier d’assemblage `01-modules.js` ne transforme plus les contenus après
  leur chargement.
