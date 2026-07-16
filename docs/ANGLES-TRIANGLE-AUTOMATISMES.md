# Somme des angles d’un triangle — décisions de catégorie

Ce document fixe les choix propres au module `dnb_18`. Il complète le
protocole commun et le contrat des manipulations sans les remplacer.

## Banque historique et format fonctionnel

- Les dix gabarits historiques de la banque V1.20 restent inchangés.
- Le format fonctionnel `11`, « placer puis calculer », s’ajoute hors de la
  banque figée par les extensions `generate.js`, `selection.js` et `render.js`.
- Une série composée uniquement de cette catégorie contient une manipulation
  sur 5 questions, deux sur 10, trois sur 15 et quatre sur 20.
- Les manipulations sont espacées par les questions historiques.

## Dimensions et lisibilité

- La largeur utile ordinaire reste la référence validée de
  `arithmetic.fraction-percent-bar` : 700 unités dans un cadre de 760.
- Les deux rangées de `geometry.triangle-angle-sum` ont toujours la même
  hauteur. Leur hauteur propre passe à 104 unités afin de gagner légèrement en
  taille sans modifier la largeur de référence.
- Les mesures écrites dans les cases sont agrandies. Leur taille ne diminue
  que lorsqu’une case très étroite l’impose pour éviter un chevauchement.
- Le contrôle d’impossibilité reste limité à 640 unités utiles et réduit les
  deux rangées dans les mêmes proportions.

## Manipulation « placer puis calculer »

La manipulation utilise le même triangle et le même modèle en barres que les
questions, aides et corrections de la catégorie.

1. Le triangle montre deux angles connus et un angle `𝑥`.
2. L’élève place les quatre cartes `180°`, les deux mesures connues et `𝑥` dans
   le modèle en barres.
3. Le placement est validé explicitement. Une erreur laisse le schéma
   manipulable et permet de recommencer sans changer la question.
4. Après un placement correct, les cartes sont figées et la saisie de
   `𝑥 = …°` apparaît.
5. La correction conserve le même triangle et le même modèle complété.

L’orientation varie selon la graine : la rangée totale `180°` peut se trouver
au-dessus ou au-dessous de la rangée partagée. Cette variation ne change pas
la relation mathématique.

## Gestes et accessibilité

- Geste principal : faire glisser une carte vers une case.
- Alternative tactile et souris : toucher une carte puis toucher une case.
- Alternative clavier : tabuler jusqu’à une carte, la sélectionner, puis
  choisir une case ; la valeur de `𝑥` utilise ensuite le clavier mathématique.
- Une carte placée peut être retirée et le bouton « Recommencer » vide le
  schéma sans modifier les deux angles ni la graine.

## Valeurs générées

- Un seul angle est inconnu.
- Les deux angles connus sont distincts et positifs.
- L’angle manquant est strictement positif et vaut exactement
  `180° − premier angle − deuxième angle`.
- Les quatre cartes sont distinctes et aucune valeur approchée n’est requise.
