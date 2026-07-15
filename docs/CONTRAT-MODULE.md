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

Le fichier est chargé dans `auto/index.html` avant le fichier regroupant son
domaine. Celui-ci référence ensuite la constante à la place de l’ancien bloc.

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

Le test fige actuellement les 40 modules, les 460 gabarits, le registre MG1 et
l’empreinte complète de la banque V1.15. Une extraction pure doit donc laisser
cette empreinte inchangée.

## Pilotes de référence

- `dnb_08` est le pilote simple ;
- `dnb_07` est le pilote visuel et contient déjà sa configuration pédagogique
  finalisée.

Le domaine Nombres suit désormais entièrement ce contrat : ses seize modules
sont explicites et leurs configurations pédagogiques résident dans leurs
fichiers.

Le domaine Géométrie suit le même contrat pour ses quatorze modules, y compris
le complément de trigonométrie `dnb_26b`.

Les domaines Données et Algorithmique complètent ce découpage : les 40 modules
de la banque suivent maintenant ce contrat.

Les fonctions de rendu visuel de `dnb_07` restent provisoirement dans le moteur.
Elles seront déplacées dans un lot distinct, avec un test adapté à leur contrat.
