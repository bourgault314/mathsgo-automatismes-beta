# Résoudre des équations — contrat bêta

Ce document fixe les décisions validées pour le module `dnb_13`. Il complète
le protocole commun et le contrat du composant `algebra.equation-splat`.

## Cours

- Le but distingue explicitement les deux langages proposés : dans une
  équation, on cherche la valeur de l’inconnue qui rend l’égalité vraie ; dans
  un Splat, on cherche la valeur cachée sous chaque tache.
- La conservation de l’égalité est formulée par la même opération effectuée
  dans les deux membres pour conserver l’équilibre.
- L’expression « défaire les opérations » n’est pas utilisée dans le cours.
  Les aides parlent d’opérations inverses.
- L’exemple du cours appelle la même rédaction détaillée que la correction :
  équations alignées, opération visible dans les deux membres, puis
  vérification de la solution.
- Un mini-plateau Splat correspondant à l’équation de l’exemple est affiché
  au-dessus de sa résolution ; il réutilise le composant partagé.

## Présentation sur téléphone

- Le bouton « Résoudre » est placé au-dessus de la consigne. Sa position sur
  ordinateur reste inchangée tant que le rendu ordinateur n’a pas été validé.
- L’équation est équilibrée entre la consigne et le plateau ; le signe `=`
  reste sur l’axe central.
- À 390 × 844, le plateau utilise toute la largeur rendue disponible par les
  marges de la scène. Les Splats, jetons, nombres et signes sont agrandis avec
  lui, sans débordement horizontal.
- La composition mobile distingue quatre profils : équation directe, problème
  contextualisé, choix d’une solution courte et choix d’une opération
  rédigée. Les tailles et les espacements restent propres à chaque profil.
- Les propositions tactiles occupent toute la largeur disponible et mesurent
  au moins 54 px de haut lorsque l’espace le permet. Sur un écran de 620 px de
  haut ou moins, elles restent au moins à 48 px.
- Les règles d’agrandissement sont limitées au point de rupture téléphone. Le
  SVG partagé et sa présentation sur ordinateur ne changent pas.

## Vérification

- Contrôler une équation directe, une équation avec inconnue dans les deux
  membres, les deux problèmes contextualisés et les deux formes de QCM.
- Comparer question et correction avec la même graine.
- Contrôler le cours et la rédaction détaillée à 390 × 844.
- Contrôler les profils compacts à 390 × 620.
- Vérifier à 1280 × 720 que le plateau et la position du bouton restent
  identiques à la version précédente.
- Exécuter `npm test` avant publication.
