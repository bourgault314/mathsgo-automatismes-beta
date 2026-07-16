# Corpus Eduscol — droites graduées et erreurs diagnostiques

État au 16 juillet 2026. Ce corpus sert de référence pédagogique à la catégorie
`dnb_14`. Les PDF et leurs extractions texte sont archivés séparément ; le
fichier [`data/eduscol-droites-graduees.json`](data/eduscol-droites-graduees.json)
fournit l’index exploitable par les futurs outils de contrôle.

## Documents indexés

| Identifiant | Document | Usage pour `dnb_14` |
|---|---|---|
| `eva6-2025` | [Évaluation nationale de début de 6e 2025 — document d’analyse](https://eduscol.education.gouv.fr/sites/default/files/document/25eva6mathematiquesdocpropdf-113202.pdf) | Item d’abscisse décimale, réponse 2,2 et analyse officielle des distracteurs 1,12 ; 22 ; 20,2. |
| `eva6-2022` | [Évaluation nationale de début de 6e 2022 — document d’analyse](https://maths.ac-amiens.fr/IMG/pdf/22eva6_presentation_exercices_ma.pdf) | Même diagnostic sur 2,2 ; item de grande échelle 2 600 000 ; item fractionnaire 4/10. |
| `2de-ecriture-decimale` | [Test de positionnement de seconde — écriture décimale](https://eduscol.education.fr/document/22021/download) | Recommande le lien avec la droite et des zooms successifs sur dixièmes, centièmes et millièmes. |
| `2de-2022` | [Test de positionnement de seconde 2022 — équipes pédagogiques](https://eduscol.education.fr/document/41983/download) | Donne des analyses de choix de borne et de valeur intermédiaire ; utile pour coder des erreurs de position. |
| `c4-relatifs` | [Cycle 4 — nombres relatifs](https://eduscol.education.gouv.fr/sites/default/files/document/ra16c4mathdocmaitrenombresrelatifscomparercalculerresoudrend552028pdf-77613.pdf) | Préconise les changements de registre nombre/droite, le déplacement orienté et, en approfondissement, des portions sans zéro visible. |
| `c4-reperes` | [Repères annuels de progression du cycle 4](https://eduscol.education.gouv.fr/sites/default/files/document/26-maths-c4-reperes-eduscol1114756pdf-74694.pdf) | Cadre institutionnel du repérage sur une droite graduée. |
| `dnb-zero-2026` | [DNB 2026 — sujet zéro de mathématiques](https://eduscol.education.gouv.fr/sites/default/files/document/sujet-zero-dnb-serie-generale-mathematiquespdf-123317.pdf) | Exemple actuel de QCM court portant directement sur l’abscisse d’un point. |

## Erreurs à viser

| Code | Compréhension révélée | Exemple institutionnel ou construction contrôlée | Format adapté |
|---|---|---|---|
| `unit-not-meaningful` | Le zéro et l’unité ne structurent pas la droite. | `22` au lieu de `2,2` dans les évaluations de 6e. | Lire une abscisse ; choisir une droite. |
| `count-ticks-after-unit` | L’élève écrit le numéro des traits après l’unité au lieu de mesurer les intervalles. | `1,12` au lieu de `2,2`. | Lire une abscisse ; déterminer le pas. |
| `subunit-not-propagated` | Le sous-pas est compris localement mais n’est pas prolongé sur plusieurs unités. | `20,2` au lieu de `2,2`. | Déterminer le pas ; placer un point. |
| `place-value-scale` | Les graduations sont comptées mais leur valeur de position est mal interprétée. | `2 060 000`, `2 000 600`, `2 000 006` au lieu de `2 600 000`. | Lire une grande échelle, sans surcharger le calcul. |
| `count-ticks-not-intervals` | Le nombre de traits remplace le nombre d’intervalles dans le calcul du pas. | Distracteur construit à partir de l’écart divisé par `n + 1`. | Déterminer explicitement le pas. |
| `assume-step-one` | Le pas est supposé égal à 1 sans lecture des repères. | Distracteur `1` lorsque le pas réel diffère. | Déterminer le pas ; QCM d’abscisse. |
| `reverse-direction` | Le déplacement à gauche/droite ou le signe est inversé. | Position symétrique par rapport au zéro. | Placer un point ; choisir une droite. |
| `off-by-one-tick` | Le pas est compris mais le point est décalé d’une graduation. | Position voisine de la position correcte. | Placer un point ; choisir une droite. |

Les quatre premiers codes sont directement reliés aux analyses institutionnelles.
Les quatre derniers sont des transpositions diagnostiques explicites : ils ne
doivent pas être présentés comme des citations d’Eduscol.

## Décisions appliquées dans la bêta

1. Les 18 gabarits historiques restent inchangés et protégés par le hash de la
   banque V1.17.
2. Trois formats fonctionnels, numérotés 19 à 21 hors de cette banque figée,
   sont ajoutés avec une fréquence limitée : placer un point, déterminer le pas,
   choisir la droite correcte.
3. Chaque QCM comporte trois ou quatre réponses, une seule correcte et un code
   diagnostique par option.
4. Le placement tactile accepte glissement, toucher du point puis d’une
   graduation, et clavier. La représentation visible reste un trait fin ; la
   cible tactile est indépendante de sa taille graphique.
5. Les étiquettes à déplacer sous les points et le problème « 7 et 10 » ne sont
   pas intégrés : ils peuvent révéler la réponse ou ajouter un calcul parasite.
6. Les zooms aux centièmes et millièmes restent dans la bibliothèque visuelle,
   mais ne sont pas annoncés comme adaptés au téléphone tant que leur lisibilité
   n’a pas été éprouvée.

## Contrôle des futures propositions

Un distracteur est refusé s’il ne correspond à aucun code d’erreur, s’il donne
une deuxième réponse correcte, s’il est éliminable sans lire la droite, ou s’il
transforme la tâche en conversion de fractions. Une nouvelle variante doit
indiquer la compréhension mathématique testée, l’erreur révélée et la raison
pour laquelle une variante existante ne suffit pas.
