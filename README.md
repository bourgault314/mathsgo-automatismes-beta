# Automatismes maths&go — bêta

Ce dépôt est l’espace permanent de développement et de test d’Automatismes
maths&go. La version publique stable reste dans `bourgault314/maths`, au chemin
`auto/`.

Il n'existe pas deux applications publiques concurrentes. Dans le dépôt du
site, `/outils/automatismes/` est seulement la page qui présente l'application
et le livret A5. L'ancien gros fichier autonome a été retiré. Les rôles de la
bêta, de la production et du futur Studio sont fixés dans
[`docs/ARCHITECTURE-CANONIQUE.md`](docs/ARCHITECTURE-CANONIQUE.md).

## Fonctionnement

1. Les modifications sont réalisées et testées ici.
2. La bêta est vérifiée sur ordinateur et sur téléphone.
3. Une version validée est transférée vers `bourgault314/maths/auto/`.
4. Le site public n’est jamais utilisé comme espace d’essai.

La page bêta n’est pas destinée au référencement et ne charge pas la mesure
d’audience du site public.

## Point de départ

- Application : **V1.17 bêta**
- Source : `bourgault314/maths`, dossier `auto/`
- Révision copiée : `cd8c2b0407f10be7f272dbb7a42d7af2f682a0f8`
- Banque chargée : **42 modules et 473 gabarits de questions**

## Organisation actuelle

| Chemin | Rôle |
|---|---|
| `auto/index.html` | Interface de sélection et de lancement |
| `auto/scripts/modules/` | Un fichier par module pédagogique |
| `auto/scripts/shared/pedagogy/` | Contrats et configurations pédagogiques partagés |
| `auto/scripts/01-modules.js` | Assemblage de la banque complète |
| `auto/scripts/02-question-engine.js` | Génération et rendu des questions |
| `auto/scripts/03-slideshow.js` | Diaporama et mode interactif |
| `auto/scripts/04-app.js` | Tirage et lancement des séries |
| `auto/scripts/core/` | Contrats, identifiants et partage |
| `auto/scripts/shared/visuals/` | Composants SVG pédagogiques réutilisables |
| `auto/dev/visual-library.html` | Catalogue visuel de développement |
| `tests/` | Vérifications structurelles de la banque |

Les 42 modules sont maintenant isolés avec des identifiants stables et des
tests de reproductibilité.

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
- `dnb_38` — Addition de nombres entiers relatifs : pilote bêta avec jetons
  tactiles +1/−1, paires nulles, questions de manipulation et QCM. Les choix
  de contenu, d’aide et d’ergonomie sont consignés dans
  [`docs/RELATIFS-AUTOMATISMES.md`](docs/RELATIFS-AUTOMATISMES.md).
- `dnb_24b` — Pythagore tactile : cinq questions manipulables, visibles
  uniquement en mode interactif dans « Manipuler sur téléphone ». Le plateau
  partagé permet aussi une intégration future dans une fiche ou une page élève.

Le contrat suivi par tous les fichiers isolés est décrit dans
[`docs/CONTRAT-MODULE.md`](docs/CONTRAT-MODULE.md).
Le protocole pédagogique, tactile et visuel à relire avant chaque chantier est
décrit dans
[`docs/PROTOCOLE-AUTOMATISMES-MATHSGO.md`](docs/PROTOCOLE-AUTOMATISMES-MATHSGO.md).

La bibliothèque visuelle interne et ses règles d’évolution sont décrites dans
[`docs/BIBLIOTHEQUE-VISUELLE.md`](docs/BIBLIOTHEQUE-VISUELLE.md). Le premier
composant extrait est le rendu d’équation avec Splats. Le premier socle de
schémas en barres est lui aussi partagé ; leurs sorties sont figées par des
tests avant toute évolution graphique.

Les barres de fractions et de pourcentages, y compris leurs accolades, sont
également extraites du moteur et visibles dans le catalogue de développement.
Les dix-huit gabarits de droites graduées de `dnb_14` utilisent désormais un
unique composant commun, sans modifier le contenu de la banque V1.17.
Le tableau interactif de conversion de `dnb_19` est lui aussi séparé du gros
moteur pour les longueurs, masses, capacités, aires et volumes.
Le glisse-nombre de `dnb_02b`, avec sa virgule fixe, sa bande grise et sa bande
de chiffres déplaçable, est isolé dans `numbers.glisse-nombre`. Son contrôleur
de glissement fait partie du composant et sert aussi dans le catalogue. Il
accepte également le geste robuste « chiffre bleu puis colonne d’arrivée » et
rejoue le déplacement lors de la correction.
Les neuf gabarits de repères du plan de `dnb_15`, y compris les demi-unités et
les lectures à deux points, utilisent un générateur commun.

Le module `dnb_38` est le premier module de calcul mental avec jetons
manipulables. Son plateau est prévu pour 390 × 844 px et 1280 × 720 px ; les
contrôles tactiles et le rendu de correction sont testés avec la banque.

Les composants ne sont pas redessinés à partir de zéro. Leur source publique,
leur gabarit de référence et leur état de branchement sont recensés dans
[`docs/SOURCES-DE-VERITE.md`](docs/SOURCES-DE-VERITE.md).

## Adresse bêta officielle

Pour vérifier l’application Automatismes, utiliser une seule adresse :

**https://bourgault314.github.io/mathsgo-automatismes-beta/auto/**

Le dépôt GitHub sert uniquement à suivre le code et les versions. La validation se fait sur cette adresse bêta, puis seulement après validation la version est transférée vers le site public. Il ne faut pas créer une autre adresse bêta pour le même outil.

## Vérifier la banque

Avec Node.js 18 ou plus récent :

```bash
npm test
```

La vérification contrôle notamment le nombre de modules, les identifiants, les
numéros de gabarits, la correspondance avec le registre des liens MG1 et les
rendus visuels de référence.
