# Recette `dnb_08` — série locale de 20 questions

## Paramètres

- date : 19 juillet 2026 ;
- graine interne de recette : `20260719` ;
- banque : V1.21 ;
- générateur de série : 1.16.0 ;
- composition : 15 sélections F2 et 5 tâches historiques conservées ;
- résultat des contrôles automatiques : 20 réponses attendues exactes, les 12
  profils F2 couverts et aucun nombre F2 répété.

## Questions et réponses

| № | Type | Question ou nombre | Réponse attendue |
|---:|---|---|---|
| 1 | F2 | 774 | 2, 3 et 9 |
| 2 | F2 | 15 | 3 et 5 |
| 3 | F2 | 30 | 2, 3, 5 et 10 |
| 4 | sélectionner des nombres | nombres proposés dont 50 et 395 | 50 et 395 |
| 5 | F2 | 4 085 | 5 |
| 6 | F2 | 48 | 2 et 3 |
| 7 | F2 | 585 | 3, 5 et 9 |
| 8 | partage | 411 bonbons dans 3 sachets | Oui, 137 par sachet |
| 9 | F2 | 360 | 2, 3, 5, 9 et 10 |
| 10 | F2 | 8 731 | Aucun |
| 11 | F2 | 909 | 3 et 9 |
| 12 | somme des chiffres | 2 259 et le critère par 9 | Oui, car 2 + 2 + 5 + 9 = 18 |
| 13 | F2 | 8 510 | 2, 5 et 10 |
| 14 | F2 | 69 | 3 |
| 15 | F2 | 9 214 | 2 |
| 16 | sélectionner des nombres | nombres proposés dont 450 et 490 | 450 et 490 |
| 17 | F2 | 9 270 | 2, 3, 5, 9 et 10 |
| 18 | F2 | 9 675 | 3, 5 et 9 |
| 19 | F2 | 6 138 | 2, 3 et 9 |
| 20 | partage | 633 bonbons dans 3 sachets | Oui, 211 par sachet |

Les questions 4 et 16 comportent aussi deux distracteurs générés. Leur valeur
exacte est contrôlée dans l'instance, mais seul l'ensemble des bonnes réponses
est reporté ici pour garder la table lisible.

## Cas limites présents

- une réponse `Aucun` ;
- une seule réponse fondée sur l'unité : 4 085 et 9 214 ;
- une seule réponse fondée sur la somme : 69 ;
- unité zéro sans divisibilité par 3 : 8 510 ;
- unité zéro divisible par 3 mais pas par 9 : 30 ;
- les cinq réponses simultanées : 360 et 9 270 ;
- `3` sans `9` et `9` avec `3` ;
- `10` toujours accompagné de `2` et `5` ;
- nombres de deux, trois et quatre chiffres.
