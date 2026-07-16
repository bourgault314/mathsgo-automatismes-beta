# Contrôle visuel `dnb_14`

Captures Chromium de la série interactive `dnb_14`, seed `202607`, avec aide.
Elles documentent le contrôle ; elles ne sont jamais utilisées comme moteur de
rendu.

- téléphone : viewport 390 × 844, densité 2 ;
- largeur étroite de contrôle : viewport 320 × 568, densité 2 ;
- ordinateur : viewport 1366 × 768, densité 1 ;
- écrans couverts : ancien gabarit, placement initial, glissement en cours,
  correction du placement, détermination du pas, choix de la droite ;
- résultat détaillé : [`report.json`](report.json).

Le rapport confirme l’absence d’erreur de console et de débordement horizontal
ou vertical sur les dix questions aux trois tailles. Le glissement testé part
de la graduation 9 et s’aimante à la graduation cible 1.
