# Contrat d’un module d’automatismes

Ce document décrit la structure minimale d’un module isolé. Son objectif est
de permettre une modification locale, relisible et testable sans devoir
retoucher le moteur général.

## Emplacement et nom

Un module du domaine Nombres est déclaré dans :

```text
auto/scripts/modules/numbers/<module-id>.js
```

Le fichier expose une constante nommée d’après l’identifiant du module :

```js
const MODULE_DNB_07 = {
  id: 'dnb_07',
  // ...
};
```

Le fichier est déclaré dans `auto/scripts/00-module-manifest.js`. Le chargeur le
récupère lorsqu'il est nécessaire, puis `01-modules.js` assemble les constantes
chargées. `auto/index.html` ne recopie plus la liste complète des banques.

## Champs stables

Chaque module conserve :

- `id` : identifiant technique permanent utilisé par les liens et les séries ;
- `num` : ordre historique d’affichage ;
- `title` : intitulé présenté dans l’interface ;
- `level_tags` : niveaux auxquels le module peut être proposé ;
- `source` : origine du contenu ;
- `has_svg` : présence éventuelle de visuels ;
- `questions` : liste ordonnée des gabarits.

Chaque gabarit conserve notamment son numéro `n`. Ce numéro est stable : il
participe à la sélection et à la reproductibilité des séries. Les champs
usuels sont `statement`, `answer`, `options` et `footer`.

## Règles de modification

1. Une extraction ne doit changer ni le contenu final du module, ni son ordre.
2. Une correction pédagogique ultérieure se fait dans le fichier du module.
3. Une règle propre à un seul module ne doit pas être ajoutée au moteur commun.
4. Le rendu ou la sélection ne sont déplacés qu’après avoir identifié leur
   interface avec le moteur.
5. `npm test` doit réussir avant toute publication sur la bêta.
6. Une amélioration de contenu et une extraction structurelle ne sont pas
   mélangées dans le même commit.
7. La meilleure source recensée dans `SOURCES-DE-VERITE.md` est comparée avant
   toute substitution visuelle.

Le test fige actuellement les 42 modules, les 473 gabarits, le registre MG1 et
l’empreinte complète de la banque V1.17. Une extraction pure doit donc laisser
cette empreinte inchangée.

## Registre pédagogique associé

Les informations qui pilotent l’aide et l’affichage sans appartenir au texte
historique du gabarit résident dans `auto/scripts/shared/pedagogy/`.

Pour chaque type de question, ce registre peut déclarer :

- les numéros de gabarits concernés ;
- la tâche mathématique demandée ;
- le mode de réponse ;
- le rôle de la figure et son composant partagé ;
- les rubriques d’aide utiles à cette tâche précise.

`dnb_25` constitue le premier module pilote. Tant qu’un autre module n’est pas
migré, les anciennes règles du moteur restent disponibles comme solution de
repli : le découpage peut donc avancer notion par notion.

## Pilotes de référence

- `dnb_08` est le pilote simple ;
- `dnb_07` est le pilote visuel et contient déjà sa configuration pédagogique
  finalisée.

Le domaine Nombres suit désormais entièrement ce contrat : ses dix-sept modules
sont explicites et leurs configurations pédagogiques résident dans leurs
fichiers.

Le domaine Géométrie suit le même contrat pour ses quatorze modules, y compris
le complément de trigonométrie `dnb_26b`.

Les domaines Données et Algorithmique complètent l'isolation des banques : les
42 modules suivent maintenant ce contrat minimal. Leur classement pédagogique
reste à terminer.

Le module `dnb_38` ajoute un contrat pédagogique associé dans
`auto/scripts/shared/pedagogy/numbers/dnb_38.js` et utilise le composant partagé
`numbers.relative-tokens`. Les règles visuelles et tactiles sont détaillées
dans [`docs/RELATIFS-AUTOMATISMES.md`](RELATIFS-AUTOMATISMES.md).

Les neuf carrés historiques de `dnb_07` utilisent désormais
`numbers.square-area` et leurs références sont figées par des tests.

## Extension fonctionnelle d'un pilote

Le fichier unique est le contrat minimal, pas l'objectif final. Pour un module
pilote stable, les responsabilités pourront être séparées en `module.js`,
`generate.js`, `selection.js` et `render.js`. Cette structure n'est généralisée
qu'après vérification de l'équivalence, de la seed et des interactions avec le
moteur. Voir [`PLAN-DECOUPAGE.md`](PLAN-DECOUPAGE.md).
