# Automatismes maths&go — bêta V1.17

Cette application est la version de développement d'Automatismes cycle 4 et
DNB. Elle est publiée avec ses fichiers découpés à l'adresse :

`https://bourgault314.github.io/mathsgo-automatismes-beta/auto/`

La version stable utilisée sur le site reste `https://mathsgo.re/auto/`. La
page `https://mathsgo.re/outils/automatismes/` est une page de présentation de
l'application et du livret A5, pas un deuxième exerciseur.

## État de référence

- paquet : `1.31.0-beta.0` ;
- banque : V1.17 ;
- 42 modules ;
- 473 gabarits ;
- 24 composants visuels ;
- 41 modules classés pédagogiquement sur 42 ;
- partage reproductible par seed, lien, code MG1 et QR code.

Le fichier autonome historique `automatismes_mathsgo.html` n'est plus une
source du site courant. Il ne doit pas être recréé ni republié à côté de
`/auto/`.

## Utiliser l'outil

- **Interactif** : saisie, clavier mathématique, QCM, validation, correction et
  score.
- **Diaporama** : navigation question/correction, progression et plein écran.
- **Avec aide** : affiche les représentations et micro-cours associés à la
  tâche.
- **Sans aide** : masque les étayages facultatifs, jamais les données
  indispensables.
- **Partager** : produit localement une définition reproductible et un QR code,
  sans identité ni réponse d'élève.

## Organisation actuelle

| Chemin | Rôle |
|---|---|
| `index.html` | interface de préparation et lancement |
| `scripts/00-module-manifest.js` | catalogue léger et chargement des modules |
| `scripts/modules/` | banque historique, un fichier par module |
| `scripts/shared/pedagogy/` | tâches, réponses, figures, aides et génération attendue |
| `scripts/shared/visuals/` | composants réutilisables et paramétriques |
| `scripts/01-modules.js` | assemblage de la banque chargée |
| `scripts/02-question-engine.js` | instanciation et rendus encore communs |
| `scripts/03-slideshow.js` | diaporama, cours, interaction et correction |
| `scripts/04-app.js` | sélection, tirage et orchestration |
| `scripts/core/` | contrats de séries, identifiants et partage |
| `dev/visual-library.html` | catalogue pédagogique et visuel non référencé |

Les 42 banques sont isolées, mais le découpage fonctionnel n'est pas terminé.
La génération, les fréquences, certains rendus et certaines corrections
restent encore couplés aux moteurs communs.

## Ajouter ou modifier un automatisme

1. récupérer le dernier `main` distant ;
2. vérifier qu'aucune autre branche ne touche le même module ;
3. modifier le fichier du module pour un changement pédagogique local ;
4. augmenter `options.template_version` si le sens, les paramètres ou la règle
   de correction changent ;
5. conserver l'identifiant, le numéro `n` et le code MG1 ;
6. lancer `npm test` avant et après le lot ;
7. publier un seul objectif cohérent par PR.

Une extraction pure ne modifie pas l'empreinte de la banque V1.17. Une retouche
visuelle ne remplace jamais une source plus riche par un dessin générique.

## Documents canoniques

- [`../docs/ARCHITECTURE-CANONIQUE.md`](../docs/ARCHITECTURE-CANONIQUE.md) :
  rôles de la production, de la bêta et du Studio ;
- [`../docs/PLAN-DECOUPAGE.md`](../docs/PLAN-DECOUPAGE.md) : ordre technique ;
- [`../docs/CONTRAT-MODULE.md`](../docs/CONTRAT-MODULE.md) : invariants d'un
  module ;
- [`../docs/BIBLIOTHEQUE-VISUELLE.md`](../docs/BIBLIOTHEQUE-VISUELLE.md) :
  contrat des composants ;
- [`../docs/SOURCES-DE-VERITE.md`](../docs/SOURCES-DE-VERITE.md) : références
  existantes à comparer avant toute extraction.

## Vérification

Avec Node.js 18 ou plus récent :

```bash
npm test
```

La validation contrôle la banque, les identifiants, les gabarits, le registre
MG1, les composants et les contrats pédagogiques déjà classés.
