# Corpus Eduscol — angles et erreurs diagnostiques

## Sources officielles

| Identifiant | Source | Usage dans `dnb_17` |
|---|---|---|
| `eva6-2025-angle-q22` | [Évaluation nationale de début de 6e 2025 — présentation et analyse](https://eduscol.education.gouv.fr/sites/default/files/document/25eva6mathematiquesdocpropdf-113202.pdf), question 22, pages 51–52 | Comparer deux angles égaux dont les longueurs de côtés suggèrent deux conclusions contraires |
| `dnb-automatismes-2025-angles` | [Liste indicative des automatismes susceptibles d’être mobilisés au DNB](https://eduscol.education.gouv.fr/sites/default/files/document/liste-indicative-dautomatismes-pour-le-dnbpdf-116340.pdf), octobre 2025, page 2 | Vérifier la couverture exacte : citer un angle, nul, plat, aigu, obtus, opposé, adjacent, supplémentaire, 90° et 180° |
| `automatismes-college-angle-configurations` | [Les automatismes au collège](https://eduscol.education.gouv.fr/sites/default/files/document/automatismes-mathematiquespdf-91875.pdf), pages 33–35 | Varier les questions flash entre choix d’une démarche et calcul d’une mesure dans des configurations usuelles |
| `programme-c4-2026-angles` | [Programme de mathématiques du cycle 4](https://www.education.gouv.fr/sites/default/files/document/Annexe%202%20%E2%80%93%20Programme%20de%20math%C3%A9matiques%20pour%20le%20cycle%204-480716.pdf), partie Angles de cinquième | Couverture des natures, relations, bissectrice, équerre et parallélisme |

## Erreurs diagnostiques reprises

L’item 22 de l’évaluation 6e demande de comparer deux angles égaux sur
quadrillage. Son analyse officielle relie chaque réponse fausse à une procédure
précise. Le module reprend cette structure sans recopier l’illustration.

| Code stable | Interprétation |
|---|---|
| `compare-first-side-length` | comparer `AB` et `DE` au lieu des ouvertures |
| `compare-second-side-length` | comparer `BC` et `EF` au lieu des ouvertures |
| `requires-measure` | penser que la comparaison est impossible sans mesure ou manipulation |
| `compare-side-length` | justifier explicitement la taille de l’angle par la longueur de ses côtés |

La correction commune rappelle : **on compare l’ouverture de l’angle, pas la
longueur de ses côtés**.
