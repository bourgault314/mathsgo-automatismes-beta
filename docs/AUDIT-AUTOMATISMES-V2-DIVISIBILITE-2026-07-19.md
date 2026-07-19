# Audit à transmettre — Automatismes V2, critères de divisibilité

## Verdict

La direction pédagogique et technique est très bonne. La V2 remplace des
gabarits où le multiplicateur révélait parfois déjà la réponse par un véritable
générateur de profils mathématiques. Le lecteur commun, la séparation entre
question, séance et trace, l'aide qui ne conclut pas et la correction en deux
observations constituent une base nettement plus solide que l'ancienne bêta.

Le lot actuel est toutefois une **tranche verticale F2**, pas encore la notion
complète annoncée par la fiche NC-01. Les documents valident six familles ; le
code visible aux élèves n'en réalise pour l'instant qu'une.

## Ce qui est réussi et doit être conservé

1. Les douze profils exacts croisent les quatre classes d'unité et les trois
   classes de somme des chiffres.
2. Les critères par 10 sont intégrés sans casser la cohérence : `10 → 2 et 5`.
3. `Aucun` est exclusif et la réponse compare un ensemble exact.
4. Les nombres ont deux à quatre chiffres, avec zéro interne et unité zéro.
5. L'aide générale est indépendante de la bonne réponse et ne conclut pas.
6. La correction examine une seule fois la somme puis sépare les cinq verdicts.
7. Le même moteur d'état sert l'interactif et la projection.
8. Les contrats, les graines et la provenance préparent une extension propre.

## Corrections prioritaires

### P0 — Empêcher les doublons dans une série

Le parcours public de 20 questions testé avec la graine `audit-20` a présenté
deux fois le nombre **54**. Le générateur d'une question est varié, mais le
sélecteur de séance ne garantit pas encore l'unicité des valeurs.

Proposition : ajouter au constructeur de séance un garde-fou sémantique sur
`famille + nombre`, avec nouveau tirage borné ou variante de longueur. Tester
au minimum 1 000 séries de 20 et refuser toute répétition exacte lorsque le
domaine de valeurs permet de l'éviter.

### P0 — Aligner l'aide codée et l'aide annoncée

La fiche validée indique que l'élève peut construire l'addition puis **saisir
lui-même la somme**. Dans le lecteur public testé, la construction s'arrête à
`8 + 7 + 3 + 2 = □` : aucune saisie de la somme n'est possible.

Deux choix honnêtes :

- terminer l'interaction prévue, avec clavier entier et validation locale de la
  somme sans conclure sur les diviseurs ;
- ou corriger immédiatement la fiche et le storyboard pour annoncer une aide
  seulement préparatoire.

La première solution respecte mieux la validation pédagogique initiale, mais
elle doit rester facultative et ne pas ajouter une étape obligatoire.

### P1 — Afficher clairement le périmètre livré

L'état du chantier, l'écran public et la documentation doivent employer le même
libellé : « NC-01/F2 — première famille disponible ». Cela évite qu'un lecteur
croie les familles F1 à F6 déjà utilisables parce qu'elles sont détaillées et
validées dans la fiche.

### P1 — Ajouter un test navigateur de séance entière

Les tests unitaires sont solides, mais ils ne remplacent pas un scénario réel
de 20 réponses. Ajouter un test d'interface qui vérifie :

- `Aucun` efface les autres choix et réciproquement ;
- la validation refuse une sélection partielle ;
- la correction conserve la sélection de l'élève ;
- le score final est exact ;
- aucune répétition de valeur n'apparaît ;
- aucune cible ne passe sous 44 px à 375 px ;
- aide et correction ne provoquent pas de débordement à 375 px et 1 280 px.

### P1 — Rendre les erreurs diagnostiques stables

Chaque proposition fausse devrait porter un code d'erreur stable, par exemple
`units-rule-confusion`, `digit-sum-not-multiple`, `three-implies-nine` ou
`five-implies-ten`. Les traces futures pourront alors distinguer une mauvaise
sélection d'une conception erronée répétée, sans modifier l'écran élève.

## Ordre conseillé pour la suite

1. corriger les doublons et l'écart sur la saisie de la somme ;
2. fabriquer F1, critère précis, pour éprouver le oui/non simple ;
3. fabriquer F3, grille de plusieurs nombres, en réutilisant la sélection
   multiple exacte ;
4. fabriquer F4, vrai/faux et justification, avec erreurs diagnostiques ;
5. fabriquer F5, chiffre manquant, seulement après le clavier entier et la
   gestion canonique des réponses multiples ;
6. fabriquer F6, partage sans reste et retrait minimal, avec un objet de
   partage piloté par les données.

## Test effectué

- lien public : `https://mathsgo.re/automatismes-v2/?questions=20&graine=audit-20` ;
- résultat fonctionnel : 20 réponses correctes sur 20 ;
- correction par 2, 5, 10 puis 3, 9 conforme ;
- exclusivité de `Aucun` conforme ;
- défaut observé : répétition de 54 dans la même série ;
- écart documentaire observé : somme préparée mais non saisissable dans
  l'aide.
