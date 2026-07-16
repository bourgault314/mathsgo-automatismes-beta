# Lire des tableaux, diagrammes et graphiques (`dnb_32`)

Ce document consigne les décisions propres au module `dnb_32`. Il complète le
protocole commun sans le remplacer.

## Décisions validées le 16 juillet 2026

- Toutes les diapositives du module sont centrées horizontalement et
  verticalement lorsque leur hauteur le permet. Si le contenu dépasse la zone
  disponible, il reste accessible par défilement sans être rogné.
- Les propositions de réponse sont centrées dans des cartes plus larges et
  plus lisibles. Le réglage est local à `dnb_32` afin de ne pas modifier les
  modules qui utilisent encore le mode dense commun.
- Le tableau, le diagramme, le graphique, le disque partagé ou le pictogramme
  qui porte les données est une représentation `essential`. Il reste visible
  dans les modes « Avec aide » et « Sans aide ».
- Le cours distingue cinq étapes : comprendre la question, croiser une ligne
  et une colonne, lire une échelle, utiliser la légende d'un pictogramme, puis
  choisir une opération seulement après avoir prélevé les bonnes valeurs.
- Le cours emploie des exemples numériques complets et les mêmes codes de
  couleur pour matérialiser la catégorie, l'échelle et la donnée lue.

## Piste d'aide propre à la question — encore ouverte

Le support de données ne doit pas disparaître pour devenir une aide. Une aide
future peut ajouter un calque d'observation sans déplacer ni régénérer la
question :

- tableau : sélectionner une ligne puis une colonne et colorer leur
  intersection ;
- diagramme en bâtons : sélectionner une catégorie puis faire apparaître une
  ligne-guide jusqu'à l'axe gradué ;
- graphique d'évolution : sélectionner les deux points utiles et afficher les
  projections vers les axes ;
- pictogramme : regrouper ou sélectionner les symboles de la catégorie, puis
  rappeler la valeur d'un symbole ;
- diagramme circulaire : sélectionner les secteurs portant la même réponse et
  faire apparaître le nombre de parts égales.

Le geste principal peut être tactile, avec une alternative
« toucher l'élément puis toucher la destination ». Cette piste n'est pas encore
une règle validée ni une interaction publiée. Elle devra être comparée sur
téléphone, ordinateur et TNI avant d'être intégrée.

