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
| `auto/scripts/data/` | Banque encore regroupée en quatre grands domaines |
| `auto/scripts/01-modules.js` | Corrections et compléments pédagogiques hérités |
| `auto/scripts/02-question-engine.js` | Génération et rendu des questions |
| `auto/scripts/03-slideshow.js` | Diaporama et mode interactif |
| `auto/scripts/04-app.js` | Tirage et lancement des séries |
| `auto/scripts/core/` | Contrats, identifiants et partage |
| `tests/` | Vérifications structurelles de la banque |

Le prochain chantier consiste à isoler progressivement chaque module sans
changer les identifiants stables ni le résultat des séries reproductibles.

### Découpage en cours

- Domaine Nombres — les quatorze modules historiques `dnb_01` à `dnb_14` et
  les deux compléments `dnb_02b` et `dnb_03b` sont tous extraits dans des
  fichiers indépendants ;
- `dnb_08` — Critères de divisibilité : premier module pilote isolé dans
  `auto/scripts/modules/numbers/dnb_08.js`.
- `dnb_07` — Carrés des entiers de 1 à 12 : pilote visuel isolé avec ses
  gabarits et sa configuration pédagogique finalisée dans
  `auto/scripts/modules/numbers/dnb_07.js`.

Le contrat suivi par tous les fichiers isolés est décrit dans
[`docs/CONTRAT-MODULE.md`](docs/CONTRAT-MODULE.md).

## Vérifier la banque

Avec Node.js 18 ou plus récent :

```bash
npm test
```

La vérification contrôle notamment le nombre de modules, les identifiants, les
numéros de gabarits et la correspondance avec le registre des liens MG1.
