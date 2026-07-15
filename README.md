# Automatismes maths&go — bêta

Ce dépôt est l’espace permanent de développement et de test d’Automatismes
maths&go. La version publique stable reste dans `bourgault314/maths`, au chemin
`auto/`.

## Fonctionnement

1. Les modifications sont réalisées et testées ici.
2. La bêta est vérifiée sur ordinateur et sur téléphone.
3. Une version validée est transférée vers `bourgault314/maths/auto/`.
4. Le site public n’est jamais utilisé comme espace d’essai.

La page bêta n’est pas destinée au référencement et ne charge pas la mesure
d’audience du site public.

## Point de départ

- Application : **V1.15**
- Source : `bourgault314/maths`, dossier `auto/`
- Révision copiée : `cd8c2b0407f10be7f272dbb7a42d7af2f682a0f8`
- Banque chargée : **40 modules et 460 gabarits de questions**

## Organisation actuelle

| Chemin | Rôle |
|---|---|
| `auto/index.html` | Interface de sélection et de lancement |
| `auto/scripts/modules/` | Un fichier par module pédagogique |
| `auto/scripts/data/` | Assemblage des modules par domaine |
| `auto/scripts/01-modules.js` | Assemblage de la banque complète |
| `auto/scripts/02-question-engine.js` | Génération et rendu des questions |
| `auto/scripts/03-slideshow.js` | Diaporama et mode interactif |
| `auto/scripts/04-app.js` | Tirage et lancement des séries |
| `auto/scripts/core/` | Contrats, identifiants et partage |
| `auto/scripts/shared/visuals/` | Composants SVG pédagogiques réutilisables |
| `auto/dev/visual-library.html` | Catalogue visuel de développement |
| `tests/` | Vérifications structurelles de la banque |

Les 40 modules sont maintenant isolés sans changement des identifiants stables
ni du résultat des séries reproductibles.

### Découpage en cours

- Domaine Nombres — les quatorze modules historiques `dnb_01` à `dnb_14` et
  les deux compléments `dnb_02b` et `dnb_03b` sont tous extraits dans des
  fichiers indépendants ;
- Domaine Géométrie — les treize modules historiques `dnb_15` à `dnb_27` et
  le complément `dnb_26b` sont tous extraits dans des fichiers indépendants ;
- Domaines Données et Algorithmique — `dnb_28` à `dnb_37` sont extraits dans
  des fichiers indépendants ;
- `dnb_08` — Critères de divisibilité : premier module pilote isolé dans
  `auto/scripts/modules/numbers/dnb_08.js`.
- `dnb_07` — Carrés des entiers de 1 à 12 : pilote visuel isolé avec ses
  gabarits et sa configuration pédagogique finalisée dans
  `auto/scripts/modules/numbers/dnb_07.js`.

Le contrat suivi par tous les fichiers isolés est décrit dans
[`docs/CONTRAT-MODULE.md`](docs/CONTRAT-MODULE.md).

La bibliothèque visuelle interne et ses règles d’évolution sont décrites dans
[`docs/BIBLIOTHEQUE-VISUELLE.md`](docs/BIBLIOTHEQUE-VISUELLE.md). Le premier
composant extrait est le rendu d’équation avec Splats. Le premier socle de
schémas en barres est lui aussi partagé ; leurs sorties sont figées par des
tests avant toute évolution graphique.

Les barres de fractions et de pourcentages, y compris leurs accolades, sont
également extraites du moteur et visibles dans le catalogue de développement.
Les dix-huit gabarits de droites graduées de `dnb_14` utilisent désormais un
unique composant commun, sans modifier le contenu de la banque V1.15.
Le tableau interactif de conversion de `dnb_19` est lui aussi séparé du gros
moteur pour les longueurs, masses, capacités, aires et volumes.
Le tableau de numération de `dnb_02b`, avec sa virgule fixe et sa bande de
chiffres déplaçable, est maintenant un composant partagé séparé.

## Vérifier la banque

Avec Node.js 18 ou plus récent :

```bash
npm test
```

La vérification contrôle notamment le nombre de modules, les identifiants, les
numéros de gabarits, la correspondance avec le registre des liens MG1 et les
rendus visuels de référence.
