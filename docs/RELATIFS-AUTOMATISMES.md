# Addition de nombres entiers relatifs — contrat bêta

Ce document fixe les décisions à respecter pour le module `dnb_38`. Il sert
de référence avant toute nouvelle question, variante ou intégration dans une
page Automatisme.

## Périmètre

- Une seule catégorie du générateur : **Addition de nombres entiers relatifs**.
- Calcul mental, niveaux 5e–4e–3e ; ce module n’est pas présenté comme une
  méthode de résolution du DNB.
- Les relatifs décimaux seront une extension séparée, sans jetons si le
  support ne sert pas la compréhension.
- Les questions peuvent varier à l’intérieur de la catégorie : manipulation,
  résultat à choisir, paire nulle et choix de méthode.

## Langage visuel maths&go

- Jeton vert : `+1` ; jeton rouge : `−1`.
- Le signe et la valeur sont écrits dans chaque jeton ; le contour et le texte
  restent noirs pour une lecture nette et une projection fiable.
- Une paire `+1`/`−1` est visible comme paire nulle et vaut `0`.
- Aucun signe décoratif entre les jetons : le plateau montre les objets
  mathématiques eux-mêmes.
- Les éléments interactifs sont suffisamment grands pour le doigt et restent
  utilisables au clavier.

## Règles d’interaction

- En addition, l’élève rassemble les deux groupes dans la zone résultat.
- Un toucher déplace un jeton ; un second toucher le remet dans son groupe.
- « Recommencer » rétablit l’état initial sans changer la question.
- La validation est disponible après une manipulation et vérifie que tous les
  jetons sont rassemblés et que leur somme est correcte.
- Le clavier visuel reste masqué pour cette interaction tactile : il ne doit
  pas prendre la place du plateau.

## Familles de questions du pilote

| Questions | Tâche | Réponse |
|---|---|---|
| 1, 3, 5, 7 | Rassembler les jetons | manipulation tactile |
| 2, 6 | Choisir le résultat | QCM à une réponse |
| 4 | Identifier une paire nulle | QCM à une réponse |
| 8 | Choisir la bonne méthode | QCM à une réponse |

Chaque question doit conserver son numéro stable, sa réponse et
`template_version`.

## Cours et aides

Le cours `relative_addition` doit toujours rappeler :

1. la valeur des jetons ;
2. le rassemblement des deux groupes ;
3. la paire nulle ;
4. la lecture des jetons restants et le signe du résultat.

Une aide ne doit pas donner directement la réponse de la question. Elle doit
faire observer, manipuler ou rappeler la règle utile.

## Vérification avant transfert

- Tester l’affichage sur ordinateur **1280 × 720** et téléphone **390 × 844**.
- Vérifier que les jetons ne débordent pas, que les boutons restent atteignables
  et que la correction est lisible.
- Vérifier les cas : deux signes identiques, signes opposés, résultat nul,
  résultat positif, résultat négatif et remise à zéro.
- Lancer `npm test` avant toute proposition de transfert vers le site public.
- Toute évolution du module reste dans la bêta jusqu’à validation manuelle.
