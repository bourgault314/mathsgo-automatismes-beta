# Audit des ressources maths&go — 16 juillet 2026

Cet inventaire évite de recopier un fichier déjà publié et distingue trois
objets différents : le support public, sa source modifiable et les composants
réutilisables par Automatismes.

## Règle de décision

- `déjà publié` : ne pas recopier le support ; conserver seulement une source
  absente ou plus récente ;
- `à publier` : ajouter le support dans la collection du site, avec le logo et
  la navigation maths&go déjà en vigueur ;
- `à extraire` : transformer la logique graphique en composant paramétrable,
  observable dans la bibliothèque et couvert par les tests ;
- `généré` : ne pas versionner les fichiers `.aux`, `.log` et `.synctex.gz`.

## Lot reçu

| Ressource | Comparaison avec le site | Décision | Brique réutilisable |
|---|---|---|---|
| Dossier maître Calcul littéral, quatre palettes | Les quatre livrets finaux sont identiques octet pour octet aux PDF publiés | Ne pas recopier les PDF. Conserver le ZIP comme source maître ; préparer plus tard un dépôt de sources distinct du site public | Tuiles algébriques, palettes, règles de mise en page, séquences réduction/distributivité/factorisation |
| Fiche « Angles dans les triangles » v11 | Absente du site | Ajouter le PDF et le `.tex` dans la collection Angles | `geometry.triangle-angle-sum` : triangle, arcs, angle droit et barre de 180° |
| Sources du mur de fractions | Le générateur HTML existe déjà sur le site, mais les quatre fiches PDF et leurs sources Python n’y sont pas | Ne pas remplacer le générateur existant. Examiner puis publier séparément le pack de fiches | Mur gradué, comparaison, équivalences et addition de fractions |
| PythaBarre recto-verso v34 | L’outil interactif PythaBarre existe ; le gabarit PDF reçu n’était pas publié | Publier le PDF et sa source avec un chemin de logo portable, puis le relier à l’outil interactif | `geometry.pythagoras-mill` ; futures barres et étapes de rédaction |
| Enquêtes additives | Le PDF est déjà publié. Le `.tex` reçu est plus récent que la source du dépôt et ajoute le pied de page actuel | Réconcilier la source et régénérer avant tout remplacement | Enquête à deux ou trois inconnues, alignement, égalisation, surplus |
| Enquêtes multiplicatives | Les cinq premières pages ont un rendu identique ; les deux dernières ne diffèrent que par quelques détails de ponctuation | Ne pas créer de second PDF. Réconcilier seulement la source | Partage en parts, coefficient multiplicatif, contrôle somme/rapport |
| Gabarit de fractions v11 | PDF strictement identique au fichier publié | Doublon confirmé : ne rien recopier | Déjà couvert en partie par `arithmetic.fraction-percent-bar` |
| Gabarit de fractions v4 | Version plus ancienne et moins marquée que la v11 | Classer comme remplacé par la v11 | Aucune nouvelle brique |
| Gabarits de partage équitable reçus | 5 pages, alors que le site publie une version plus riche de 7 pages | Conserver la version du site | Futur `arithmetic.equal-sharing-bar` pour les partages simples et emboîtés |
| Multiples et fractions d’une quantité reçus | Le site publie une version plus explicite avec flèches, prolongements et étapes | Conserver la version du site | Étendre `arithmetic.relation-bar` aux multiples et fractions de quantité |
| Fichiers `.aux`, `.log`, `.synctex.gz` | Fichiers temporaires de compilation | Ignorer | Aucune |

## Premier lot branché

1. La fiche Angles devient une ressource de la collection publique Angles.
2. Le module `dnb_18` consomme désormais le composant
   `geometry.triangle-angle-sum` au lieu de conserver son propre SVG dans la
   banque de questions.
3. Les dix questions du module Angles sont classées dans le registre
   pédagogique avec leur tâche, leur type de réponse, leur rôle visuel et leur
   aide.
4. Le moulin extrait du gabarit PythaBarre est visible comme composant
   `geometry.pythagoras-mill`. Le PDF recto-verso et sa source portable sont
   reliés à l’outil interactif ; son branchement dans `dnb_24` viendra après la
   validation visuelle du catalogue.

## Ordre de reprise

1. valider Angles et le moulin de Pythagore sur ordinateur et téléphone ;
2. extraire les barres de partage équitable et les enquêtes ;
3. intégrer les fiches du mur de fractions sans remplacer le générateur ;
4. extraire les tuiles et palettes du dossier maître Calcul littéral ;
5. seulement ensuite créer le dépôt de sources/studio pour sortir ces maîtres
   du site public sans perdre leur historique.
