# Calcul littéral dans les Automatismes maths&go

Ce document consigne les décisions propres au module `dnb_10`, consacré à la
réduction d'expressions littérales.

## Forme de la réponse interactive

La forme proposée à l'élève dépend du degré maximal présent dans l'expression
ou sur le plateau initial. Elle ne dépend jamais des coefficients obtenus après
réduction.

- si un terme en `x²` est présent au départ, la réponse comporte les trois
  coefficients de `x²`, de `x` et du terme constant ;
- si aucun terme en `x²` n'est présent mais qu'un terme en `x` l'est, la
  réponse comporte le coefficient de `x` et le terme constant ;
- si le plateau ne contient que des constantes, la réponse ne comporte que le
  terme constant.

Chaque emplacement est initialisé à zéro. L'élève modifie les coefficients non
nuls et conserve zéro pour une famille absente ou entièrement annulée. Ainsi,
`4x² - 4x² + 3` se complète sous la forme `0x² + 0x + 3`, tandis que
`5x - 5x + 3` se complète sous la forme `0x + 3`.

Cette règle s'applique aux réponses directes des six familles du module. Les
QCM, la correction mathématique et le plateau de tuiles restent inchangés.

## Vérifications attendues

- une annulation complète des `x²` conserve l'emplacement de `x²` ;
- une annulation complète des `x` conserve l'emplacement de `x` ;
- la présence initiale de `x²` conserve aussi les emplacements de `x` et de la
  constante, même si ces familles sont absentes ;
- une expression uniquement constante reste une réponse à un emplacement ;
- le signe d'un coefficient négatif continue de remplacer visuellement le
  séparateur `+` ;
- le téléphone, l'ordinateur et le diaporama restent lisibles.
