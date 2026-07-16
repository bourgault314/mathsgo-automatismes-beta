# Recherche pédagogique — lire et déterminer une abscisse

Synthèse au 16 juillet 2026. Le périmètre reste la lecture du repérage et du
pas sur une droite graduée. Les formats qui exigent principalement une
conversion de fractions, un calcul algébrique ou une nouvelle technique sont
écartés.

## Convergences des références

- Les évaluations nationales françaises ne se contentent pas d’une réussite ou
  d’un échec : leurs distracteurs distinguent le comptage des traits, le sens de
  l’origine et de l’unité, la propagation du sous-pas et la valeur de position.
  Voir le [corpus Eduscol](CORPUS-EDUSCOL-DROITES-GRADUEES.md).
- [Primàbord](https://primabord.eduscol.education.fr/de-la-ligne-numerique-a-la-demi-droite-graduee)
  présente explicitement le placement d’un nombre sur une droite graduée comme
  une activité numérique pertinente et relie la droite aux futurs décimaux,
  réels et repères.
- Le standard américain [CCSS 6.NS.C.6](https://thecorestandards.org/Math/Content/6/NS/)
  définit le rationnel comme un point de la droite et demande de trouver et
  positionner entiers et rationnels, avec un travail explicite sur les signes
  opposés de part et d’autre de zéro.
- L’[Australian Curriculum, Year 6](https://www.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/mathematics/mathematics-curriculum-content-f-6-v9.docx)
  demande de localiser et représenter des entiers sur une droite et de comparer,
  ordonner et représenter des fractions usuelles sur une même droite.

Ces références convergent vers deux actions élémentaires — lire et placer — et
vers des changements contrôlés de nombres et d’échelle. Elles ne justifient pas
à elles seules un glisser-déposer : celui-ci est un choix ergonomique de la
bêta, doublé d’alternatives tactiles et clavier.

## Classement des formats

Échelle : `+++` très favorable, `++` favorable, `+` limité, `−` défavorable.

| Format | Compréhension testée | Intérêt | Téléphone | Tactile | Erreurs révélées | Réponse trop évidente | Décision |
|---|---|---:|---:|---:|---|---:|---|
| Lire l’abscisse d’un point | Repères, pas, direction, signe | +++ | +++ | + | pas supposé égal à 1, comptage des traits, signe | faible | Conserver les 18 gabarits. |
| Placer un point à une valeur donnée | Passage nombre → position et contrôle du pas | +++ | +++ | +++ | inversion du sens, décalage d’un trait, sous-pas mal prolongé | faible | Ajouter avec aimantation et validation explicite. |
| Déterminer explicitement le pas | Écart partagé en intervalles égaux | +++ | +++ | + | traits au lieu des intervalles, écart pris pour le pas, pas supposé égal à 1 | faible | Ajouter en QCM court. |
| Choisir la droite correcte | Comparaison simultanée de l’échelle, du sens et de la position | ++ | +++ | ++ | sens inversé, décalage d’un trait, mauvaise échelle | moyen | Ajouter avec trois droites utilisant les mêmes repères. |
| Retrouver une valeur à partir de deux repères | Déduction du pas puis déplacement | +++ | ++ | + | comptage, direction, valeur intermédiaire | faible | Déjà couvert par les gabarits 13 à 18 ; ne pas dupliquer. |
| Interpréter une position entre deux entiers | Sous-unités, demis, quarts, dixièmes | +++ | +++ | ++ | entier le plus proche, numérateur compté, sous-pas local | faible | Déjà couvert ; renforcer les codes de distracteurs, pas la quantité de variantes. |
| Retrouver la graduation entre 7 et 10 | Nombre d’intervalles et valeur intermédiaire | ++ | +++ | ++ | moyenne intuitive, comptage des intervalles | moyen | Différer : utile seulement avec une construction où le repérage domine réellement le calcul. |
| Glisser des étiquettes de valeurs sous des points | Association valeur/point | + | ++ | +++ | peu de diagnostics si toutes les valeurs sont visibles | élevé | Déconseillé : les réponses affichées réduisent la lecture à un appariement. |
| Convertir une fraction avant de placer le point | Conversion plus repérage | + | ++ | + | erreurs de conversion difficiles à séparer | moyen | Exclure sauf si la fraction est déjà la forme naturelle de l’échelle. |

## Choix ergonomique de la manipulation

La marque visible est le même petit trait vertical bleu que dans les exercices
de lecture. Elle ne grossit pas avec la cible tactile. Une zone transparente
englobe la lettre, le trait et une poignée de 26 × 11 unités SVG placée sous
l’axe. Pendant le glissement, la marque se soulève et une ligne orange reste sur
la graduation aimantée : le doigt ne masque donc ni la position courante ni la
cible.

Trois entrées donnent le même état mathématique : glisser horizontalement,
toucher le point puis une graduation, ou utiliser les flèches gauche/droite.
La validation est séparée du geste. La correction conserve la droite à la même
place, montre la cible en vert et, si nécessaire, la position choisie en orange
pointillé.

## Critères d’arrêt

Une nouvelle variante n’est ajoutée que si elle révèle une erreur non couverte
par les formats précédents. Un QCM reste limité à quatre choix, une seule bonne
réponse et des propositions de longueur comparable. Un résultat comme une
décimale périodique longue est rejeté même s’il provient d’une erreur
mathématique plausible : sur téléphone, il devient un indice graphique plutôt
qu’un vrai distracteur.
