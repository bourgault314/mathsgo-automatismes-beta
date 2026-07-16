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
| Dossier maître Calcul littéral, quatre palettes | Les quatre livrets finaux sont identiques octet pour octet aux PDF publiés. Le ZIP reçu est aussi tronqué pendant le quatrième livret, mais 56 entrées antérieures, dont tous les modules Python et activités, sont complètes | Ne pas recopier les PDF. Conserver les sources récupérées ; demander une archive complète avant archivage définitif | `algebra.algebra-tiles`, puis modèles d’aire pour distributivité et factorisation |
| Fiche « Angles dans les triangles » v11 | Absente du site | Ajouter le PDF et le `.tex` dans la collection Angles | `geometry.triangle-angle-sum` : triangle, arcs, angle droit et barre de 180° |
| Sources du mur de fractions | Le générateur HTML existe déjà sur le site. Le ZIP reçu est tronqué dès le logo : seuls le README et le lanceur Python sont complets ; les scripts et quatre PDF manquent | Ne pas remplacer le générateur. Extraire son moteur visuel maintenant ; demander plus tard une archive complète pour les fiches | `arithmetic.fraction-wall` : mur gradué, équivalences, décimaux et pourcentages |
| PythaBarre recto-verso v34 | L’outil interactif PythaBarre existe ; le gabarit PDF reçu n’était pas publié | Publier le PDF et sa source avec un chemin de logo portable, puis le relier à l’outil interactif | `geometry.pythagoras-mill`, `geometry.pythagoras-bar`, `geometry.pythagoras-reasoning` |
| Enquêtes additives | Le PDF est déjà publié. Le `.tex` reçu est plus récent que la source du dépôt et ajoute le pied de page actuel | Réconcilier la source et régénérer avant tout remplacement | Enquête à deux ou trois inconnues, alignement, égalisation, surplus |
| Enquêtes multiplicatives | Les cinq premières pages ont un rendu identique ; les deux dernières ne diffèrent que par quelques détails de ponctuation | Ne pas créer de second PDF. Réconcilier seulement la source | Partage en parts, coefficient multiplicatif, contrôle somme/rapport |
| Gabarit de fractions v11 | PDF strictement identique au fichier publié | Doublon confirmé : ne rien recopier | Déjà couvert en partie par `arithmetic.fraction-percent-bar` |
| Gabarit de fractions v4 | Version plus ancienne et moins marquée que la v11 | Classer comme remplacé par la v11 | Aucune nouvelle brique |
| Gabarits de partage équitable reçus | 5 pages, alors que le site publie une version plus riche de 7 pages | Conserver la version du site | `arithmetic.equal-sharing-board` pour les partages en 2, 3, 4 ou 5, dont le partage de deux morceaux |
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

## Deuxième lot branché

1. Les gabarits de partage simple et de deux morceaux sont générés par
   `arithmetic.equal-sharing-board` avec leurs boîtes bleu marine et leurs
   flèches turquoise.
2. Les enquêtes additives à deux ou trois inconnues et les enquêtes
   multiplicatives ×2, ×3, ×4 et ×n utilisent `algebra.inquiry-bar`.
3. Les étapes ne sont pas stockées comme des images : leurs barres, accolades,
   hachures, coupes et divisions sont calculées par le composant et peuvent
   recevoir d’autres nombres.
4. Les 38 états question/correction de ce lot sont figés par empreinte et tous
   les préréglages déclarent les supports téléphone, ordinateur, projection et
   impression.
5. Le générateur public du mur de fractions reste intact ; son moteur de dessin
   est maintenant disponible séparément comme `arithmetic.fraction-wall`.
6. Les tuiles du dossier maître Calcul littéral sont générées par
   `algebra.algebra-tiles` dans les quatre palettes prévues par les sources.
7. Les grilles de double distributivité et de factorisation utilisent
   `algebra.area-model`, avec produits partiels révélables en correction.

## Troisième lot branché

1. `geometry.pythagoras-bar` reconstruit le modèle PythaBarre à partir de
   paramètres : sommets, longueurs, côté cherché, phase lettres/longueurs/
   carrés et partage proportionnel.
2. Les trois rectangles restent accolés et leurs couleurs sont reliées aux
   trois termes de l’égalité ; aucun aperçu n’est utilisé comme source.
3. `geometry.pythagoras-reasoning` sépare la rédaction en étapes réutilisables
   et conserve les deux raisonnements différents, regroupement pour
   l’hypoténuse et soustraction pour un côté.
4. Les 36 états question/correction de ce lot sont figés par empreinte et
   déclarés compatibles téléphone, ordinateur, projection et impression.

## Quatrième lot branché

1. La version publiée de « Multiples et fractions d’une quantité » a été
   préférée au PDF reçu, car elle contient les flèches ×n/÷n et les
   prolongements pointillés absents de l’ancienne version.
2. `arithmetic.relation-bar` sait maintenant construire les familles 2, 3, 4,
   5 et 10, dans le sens direct et dans le sens inverse.
3. Les parts restent strictement accolées. Leur orientation change selon le
   raisonnement : au-dessus du tout pour un multiple, en dessous pour une
   fraction unitaire.
4. Les formes à dix parts sont conservées pour l’impression et la projection,
   mais ne sont pas annoncées comme compatibles téléphone.

## Cinquième lot branché

1. Les jetons `n`, `n²`, `1`, `−1` et `n/q` du module Relations ne sont plus
   définis dans le gros moteur de questions : ils appartiennent au composant
   `algebra.relation-tiles`.
2. Les sept compositions existantes gardent la même géométrie, et leurs
   quatorze états de catalogue sont figés par empreinte.
3. Les 18 gabarits de `dnb_09` sont classés en huit types pédagogiques avec
   leur réponse, leur composant visuel et leurs rubriques d’aide.

## Sixième lot branché

1. Les dix gabarits de `dnb_24` sont classés : conditions, hypoténuse,
   égalité, deux chemins de calcul, réciproque et cohérence.
2. Les questions 3 à 7 peuvent appeler le moulin, PythaBarre ou la rédaction
   guidée avec les nombres effectivement tirés par le générateur.
3. Sans aide, ces constructions sont absentes ; en correction, les questions
   de calcul affichent l’étape de raisonnement adaptée.
4. Le cours Pythagore consomme les composants de la bibliothèque et ne montre
   que les rubriques liées à la question courante.

## Septième lot préparé

1. Les dix-huit gabarits de `dnb_14` sont classés par pas, signe, nombre de
   points, échelle variable et type de réponse.
2. Le contrat du générateur rappelle que le point est placé par sa valeur et
   que les versions trop longues ou trop denses ne sont pas proposées telles
   quelles sur téléphone.
3. Les neuf gabarits de `dnb_15` sont classés : coordonnées entières, point
   sur un axe, deux points, demi-unités, abscisse seule, ordonnée seule et QCM.
4. Les deux registres pointent vers `numbers.number-line` et
   `geometry.coordinate-plane` : aucune nouvelle image n’est créée.

## Huitième lot préparé

1. Les douze gabarits de `dnb_02b` sont classés par sens du déplacement,
   facteur 10/100/1 000, QCM et valeur manquante.
2. Le contrat du glisse-nombre conserve la virgule fixe, la bande grise
   manipulable, les zéros de position et l’animation de correction.
3. Les dix conversions de `dnb_19` sont classées en longueurs, aires,
   volumes-capacités, masses, capacités et durées.
4. Le tableau décimal reste réutilisé pour cinq familles métriques ; les
   durées restent séparées car leurs changements d’unité utilisent 60.

## Neuvième lot préparé

1. Les onze questions de `dnb_04` sont classées en fractions unitaires,
   plusieurs parts, fractions variées, pourcentages repères et problèmes.
2. Toutes consomment `arithmetic.fraction-percent-bar` comme aide facultative,
   avec parts accolées, accolade et grille de cent cases pour 1 %.
3. Les douze questions de `dnb_13` sont classées selon la forme de l’équation,
   les valeurs signées, les deux membres, le QCM ou la mise en contexte.
4. `algebra.equation-splat` reste le composant visuel commun ; le contrat
   conserve l’égalité, les signes, le X arrondi et la position des objets.

## Dixième lot préparé

1. Les seize questions de `dnb_01` distinguent fraction usuelle, fraction
   supérieure à une unité, tirage variable et conversion inverse.
2. Les dix questions de `dnb_05` sont classées par passage entre fraction,
   décimal et pourcentage, y compris la synthèse à réponses multiples.
3. `dnb_05` appelle `arithmetic.fraction-wall` ; `dnb_01` conserve encore à ce
   stade son plateau interne avant extraction.
4. Le contrat limite le mur aux lignes utiles sur téléphone et conserve les
   unités complètes de même largeur pour les valeurs supérieures à 1.

## Onzième lot préparé

1. Les six questions de réduction de `dnb_10` distinguent une ou plusieurs
   familles, les annulations, la lecture de tuiles et l’expression déjà réduite.
2. Les onze substitutions de `dnb_11` explicitent valeurs négatives,
   puissances, deux variables, parenthèses, QCM et unité d’aire.
3. Les dix développements et factorisations de `dnb_12` sont reliés au modèle
   d’aire, aux produits partiels et au contrôle en sens inverse.
4. Les constructions `algebra.algebra-tiles` et `algebra.area-model` restent
   paramétriques et conservent les quatre palettes du dossier maître reçu.

## Douzième lot préparé

1. Le constructeur visuel des opérations sur les fractions quitte
   `02-question-engine.js` et devient `arithmetic.fraction-operations`.
2. Ses dix références couvrent simplification, comparaison, addition,
   soustraction, dénominateur commun, produit par aire et trois divisions.
3. Les sept gabarits de `dnb_03` et les six de `dnb_03b` sont classés par tâche,
   réponse, construction et aide pédagogique.
4. Les vingt états question/correction du composant sont figés par empreinte ;
   une comparaison confirme un rendu strictement identique avant et après
   l’extraction.

## Treizième lot préparé

1. Le plateau fraction–décimal de `dnb_01` quitte le gros moteur et devient
   `arithmetic.fraction-decimal-grid`.
2. Les cinquièmes et vingtièmes reposent sur cent cases ; les fractions
   supérieures à 1 utilisent plusieurs unités carrées de même taille.
3. Les huit références couvrent les fractions usuelles, 16/20, 19/20, 7/5,
   l’écriture décimale et une simplification visible.
4. Le module consomme le composant commun ; les seize états question/correction
   sont figés et restent strictement identiques à l’ancien moteur.

## Quatorzième lot préparé

1. Les dix questions de décimaux de `dnb_02` sont classées en comparaison,
   rangement, encadrement, addition-soustraction et changement d’échelle.
2. Les onze questions de notation scientifique de `dnb_06` distinguent le
   sens de conversion, le signe de l’exposant et la reconnaissance d’une
   mantisse correcte.
3. Les neuf copies du carré de `dnb_07` deviennent le composant paramétrable
   `numbers.square-area`, sans changement du contenu de la banque ni des
   tirages reproductibles.
4. Les dix questions de divisibilité de `dnb_08` distinguent chiffre des
   unités, somme des chiffres, critères simultanés et partage sans reste.
5. Avec ce lot, les dix-sept modules du domaine Nombres et calculs disposent
   tous d’un registre pédagogique ; la séparation peut se poursuivre avec le
   domaine Espace et géométrie.

## Quinzième lot préparé

1. Les neuf modules qui restaient dans Espace et géométrie sont classés :
   codage des figures, vocabulaire des angles, solides, périmètres, aires,
   volumes, trigonométrie avec et sans calculatrice, puis transformations.
2. Chaque gabarit possède maintenant un type de tâche, un mode de réponse, une
   politique visuelle, des rubriques d’aide et un contrat de génération. Les
   trente-cinq questions sur les solides sont notamment distinguées entre
   reconnaissance, modélisation d’un objet et dénombrement des éléments.
3. Les figures historiques qui n’ont pas encore quitté leur module portent
   volontairement `component: null`. Cette absence visible constitue la liste
   de travail pour les prochaines extractions ; aucune capture n’est utilisée
   à leur place.
4. Les carrés des questions d’aire réemploient déjà
   `numbers.square-area`. Les prochains composants prioritaires sont le
   triangle trigonométrique orientable, les figures codées et les quadrillages
   de transformations.
5. Les quinze modules du domaine Espace et géométrie sont désormais classés.
   Avec Nombres et calculs, le registre couvre 32 modules sur 42 sans changer
   les 473 gabarits ni leurs tirages reproductibles.

## Seizième lot préparé

1. Les constructeurs de triangles trigonométriques quittent le gros moteur et
   deviennent `geometry.trigonometry-triangle`.
2. Le composant reçoit les trois sommets, l’angle étudié, la proportion du
   triangle, huit orientations possibles et les libellés des côtés. Il sait
   aussi construire un triangle non rectangle et une paire de triangles
   semblables pour les questions de choix de méthode et d’invariance.
3. Onze références sont visibles dans le catalogue et figées par empreinte :
   huit orientations, un cas avec longueurs, un triangle général et deux
   triangles semblables. Les dix premiers restent adaptés au téléphone.
4. Les modules `dnb_26` et `dnb_26b`, ainsi que le cours de trigonométrie,
   consomment la même construction. Les rôles adjacent, opposé et hypoténuse
   ne dépendent donc plus de la position du triangle sur l’écran.
5. Les 42 modules et 473 gabarits restent inchangés ; 118 lignes de dessin ont
   été retirées de `02-question-engine.js` et conservées sous forme de composant
   paramétrable, jamais sous forme de capture.

## Ordre de reprise

1. récupérer une archive complète des quatre fiches du mur de fractions ;
2. récupérer une archive complète du dossier maître Calcul littéral ;
3. seulement ensuite créer le dépôt de sources/studio pour sortir ces maîtres
   du site public sans perdre leur historique.
