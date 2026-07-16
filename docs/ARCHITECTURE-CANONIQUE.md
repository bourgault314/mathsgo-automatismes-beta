# Architecture canonique du chantier maths&go

Ce document évite de confondre l'application Automatismes, sa bêta, sa page de
présentation et le futur studio pédagogique.

## Les quatre éléments utiles

| Élément | Emplacement | Rôle | Source canonique |
|---|---|---|---|
| Automatismes public | `bourgault314/maths`, dossier `/auto/` | application stable utilisée par les élèves et les enseignants | production validée |
| Page Automatismes | `bourgault314/maths`, dossier `/outils/automatismes/` | présente l'application et le livret A5 | catalogue public |
| Bêta Automatismes | `bourgault314/mathsgo-automatismes-beta` | découpage, essais, collaboration et validation avant production | développement d'Automatismes |
| Studio maths&go | `bourgault314/maths`, dossier `/studio/` | architecture générale pour composer plus tard cours, fiches, jeux, manipulations et parcours | vision et contrats transversaux |

La page `/outils/automatismes/` n'est pas une deuxième application. L'ancienne
page autonome `/outils/automatismes/automatismes_mathsgo.html` a déjà été
supprimée du site courant ; son historique reste dans Git. L'unique application
publique est `/auto/` et l'unique application de test est la bêta `/auto/` du
dépôt séparé.

Un ZIP de reprise est seulement une sauvegarde de transmission. Il ne devient
jamais une nouvelle source canonique et ne doit pas écraser un `main` distant
plus récent.

## Relation entre la bêta et le Studio

La bêta ne doit pas construire un deuxième Studio. Elle éprouve les contrats
sur une application réelle : gabarits, génération, sélection, aides, correction,
composants visuels et interactions. Lorsqu'un contrat est stable, le Studio peut
le référencer ou l'accueillir comme brique générale.

Le flux normal est :

1. identifier la meilleure source maths&go existante ;
2. documenter ses conventions et ses usages ;
3. créer ou étendre un composant dans la bêta ;
4. comparer le rendu à la source, sur les supports annoncés ;
5. brancher un petit ensemble d'Automatismes ;
6. publier et valider la bêta ;
7. transférer une version validée vers `/auto/` public ;
8. réutiliser ensuite le même contrat dans le Studio.

## Ce qui est déjà séparé

- 42 modules et 473 gabarits sont isolés et protégés par la banque V1.17 ;
- 24 composants visuels sont enregistrés ;
- Nombres et calculs, Espace et géométrie, les neuf modules Données et le
  module Algorithmique sont classés pédagogiquement, soit 42 modules sur 42 ;
- le manifeste, le partage MG1 et les identifiants stables sont testés.

Cette séparation est réelle mais incomplète : la génération, les règles de
couverture, certains rendus, les aides et les corrections restent encore trop
présents dans les moteurs communs.

## Feuille de route saine

### 1. Pilote complet

Choisir un module pédagogiquement stable et non modifié dans une autre fenêtre.
Séparer pour ce seul pilote :

- banque et métadonnées ;
- génération des paramètres ;
- sélection et fréquences ;
- rendu de la question et de l'aide ;
- réponse et correction ;
- adaptations téléphone, projection et impression.

Le contrat obtenu est observé avant d'être généralisé. Le nombre de SVG retirés
n'est pas un critère de réussite.

### 2. Sources de vérité

Maintenir [`SOURCES-DE-VERITE.md`](SOURCES-DE-VERITE.md). Une extraction ne
commence pas avant d'avoir vérifié l'outil public, le gabarit imprimé et le
composant bêta existant.

### 3. Données et Algorithmique

Classer les dix modules restants, puis extraire seulement les représentations
et règles nécessaires aux questions réelles.

### 4. Visuels à la demande

Solides, transformations, figures codées, périmètres et graphiques sont migrés
par familles homogènes. Un dessin historique reste en place tant que le
composant commun n'est pas visuellement équivalent ou meilleur.

### 5. Jeux et manipulations

À partir des pilotes tactiles déjà présents, définir un contrat commun pour les
états, gestes, réinitialisation, validation et correction. Un jeu ou un plateau
n'est pas réduit à un SVG : son comportement fait partie du composant.

### 6. Passage en production

Une version de la bêta n'est transférée vers `bourgault314/maths/auto/` qu'après
tests automatisés et contrôle manuel sur téléphone et ordinateur.

## Travail en parallèle

Les modifications pédagogiques peuvent continuer pendant le découpage si les
lots ne touchent pas les mêmes fichiers.

- voie contenu : un module explicitement choisi ;
- voie structure : un autre module ou un composant partagé ;
- voie documentation : inventaire et contrats ;
- fichiers globaux `02-question-engine.js`, `03-slideshow.js` et `04-app.js` :
  une seule branche active à la fois.

Avant chaque lot, récupérer le dernier `main`, vérifier les branches ouvertes et
publier rapidement. Une branche corrompue ou remplacée est fermée, jamais
fusionnée pour conserver son travail apparent.

## Définition d'une version saine

Une version est saine lorsque :

- les tests passent depuis le dernier `main` ;
- il n'existe qu'une application publique et une bêta officielle ;
- les documents donnent les mêmes nombres et les mêmes chemins ;
- aucune branche connue comme défectueuse n'est proposée à la fusion ;
- les anciens liens utiles sont préservés par une page ou une redirection ;
- les gabarits ne changent pas pendant une extraction pure ;
- une source plus riche n'est pas remplacée par un composant générique ;
- chaque petit lot publié possède un objectif vérifiable.
