# Contrat commun des manipulations maths&go

## Objectif durable

Une manipulation n’est pas définie par son HTML, ses boutons ou la puissance du
modèle qui l’a générée. Elle est définie par ce que l’élève peut faire, l’état
mathématique qui change et la manière dont cet état est validé puis expliqué.

Ce contrat restera utile aux futures versions de Codex et au Studio, car il
encode les choix propres à maths&go : gestes autorisés, remise à zéro,
correction, supports et règles pédagogiques. Une intelligence plus puissante
peut produire une nouvelle interface ; elle ne peut pas deviner ces choix.

Le registre technique est `auto/scripts/shared/manipulations/00-registry.js`.
Les premiers contrats se trouvent dans `contracts.js` et sont visibles dans le
catalogue de développement.

## État sémantique

L’état contient uniquement ce qui permet de reconstruire la situation :

- valeurs, jetons, cases, position ou orientation ;
- instruction courante et trace utile ;
- paramètres stables de l’instance ;
- sélection temporaire seulement lorsqu’elle aide l’interface.

Les coordonnées en pixels, classes CSS et références DOM ne font jamais partie
de l’état canonique. Deux interfaces différentes doivent pouvoir représenter le
même état.

## Gestes et accessibilité

Chaque action porte un identifiant stable, par exemple `move-token`,
`place-token`, `step` ou `reset`. Le geste concret peut être un toucher, un
clic, un glisser-déposer ou une touche du clavier.

Une manipulation active sur téléphone possède toujours une solution sans
glisser-déposer : toucher puis toucher, boutons, ou clavier. Les couleurs ne
sont jamais la seule information ; les signes, valeurs et libellés restent
écrits.

Pour `numbers.glisse-nombre`, l’élève peut faire glisser la bande, utiliser les
flèches, ou toucher le chiffre bleu des unités puis sa colonne d’arrivée. Le
suivi pendant le glissement reste immédiat ; l’aimantation et le rejeu de la
correction utilisent une animation plus lente et lisible.

## Réinitialisation

`reset` restaure l’état initial de la même instance. Il conserve la seed, les
paramètres de la question, l’identité des objets et les données de départ. Il
ne relance pas un tirage différent.

La réinitialisation est une action pédagogique normale, pas une erreur et pas
une pénalité.

## Validation

La validation compare un résultat sémantique : valeur dérivée, état équivalent,
cases ordonnées ou résultat final du programme. Elle ne dépend ni de l’ordre
visuel des éléments interchangeables ni de leur position exacte en pixels.

Le déclenchement est explicite pour une réponse d’élève. Une aide qui prépare
une réponse externe, comme le Glisse-nombre, peut déléguer la validation à
l’exercice qui la contient.

## Correction

La correction utilise la même représentation et les mêmes données que la
question. Deux modes sont prévus :

- `target-state` montre l’état final correct tout en explicitant les étapes ;
- `replay` rejoue l’évolution pas à pas pour une suite d’instructions.

Une correction ne remplace pas silencieusement la manipulation par un dessin
sans rapport.

## Sérialisation

Le format initial est `MG-MANIP-1`. Seuls les champs d’état déclarés comme
reconstructibles sont conservés. Aucune identité d’élève, réponse nominative ou
donnée distante n’est ajoutée.

La sérialisation permettra plus tard de partager une instance, reprendre un
état local ou intégrer la même manipulation dans une fiche interactive. Elle ne
promet pas encore un stockage de progression.

## Premiers contrats

| Identifiant | État | Validation | Correction | Statut |
|---|---|---|---|---|
| `numbers.glisse-nombre` | chiffres et décalage | valeur dérivée | rejeu vers l’état cible | actif |
| `numbers.number-line-point` | repères, pas et graduation choisie | état équivalent | position choisie et position cible | actif |
| `geometry.coordinate-points` | cibles, points choisis et point actif | état équivalent | points cibles sur le même repère | actif |
| `numbers.relative-tokens` | jetons, signes et zones | état équivalent | rassemblement et paires nulles | actif |
| `geometry.pythagoras-builder` | tâche, triangle et cases | cases ordonnées | relation et aires exactes | actif |
| `geometry.triangle-angle-builder` | deux angles, orientation, cases et réponse | placement puis calcul | barre complétée et valeur de `𝑥` | actif |
| `numbers.order-cards` | cartes, positions et sens de rangement | cases ordonnées | ordre croissant résolu | actif |
| `numbers.frame-integers` | décimal, entiers proposés et deux emplacements | cases ordonnées | deux entiers consécutifs | actif |
| `numbers.distributivity-cards` | facteurs, produits proposés et deux cases | cases ordonnées | décomposition résolue | actif |
| `algorithm.block-sequence` | instruction, variables, position, orientation et trace | résultat sémantique | rejeu pas à pas | planifié |

## Jeux futurs

Un jeu ajoutera au même socle un cycle de tours, une règle de fin, des choix de
difficulté et éventuellement un score local. Il ne recopiera pas la logique de
la manipulation. Le premier jeu doit être créé seulement lorsqu’un contrat
d’état a déjà été éprouvé dans une activité simple.

## Règles de modification

1. Ajouter ou modifier le contrat avant de changer profondément l’interface.
2. Conserver les identifiants d’état et d’action entre deux rendus compatibles.
3. Augmenter la version du contrat lorsqu’un champ ou une règle change de sens.
4. Tester reset, validation et correction sur téléphone et ordinateur.
5. Ne publier un adaptateur Studio qu’après usage réel dans Automatismes.
