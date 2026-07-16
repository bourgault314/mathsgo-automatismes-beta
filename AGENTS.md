# Consignes permanentes — Automatismes maths&go

Ces consignes s'appliquent à tout le dépôt. Elles doivent être lues avant
toute analyse, modification ou publication.

## Lecture obligatoire

Lire dans cet ordre :

1. `docs/PROTOCOLE-AUTOMATISMES-MATHSGO.md` ;
2. `docs/CONTRAT-MODULE.md` ;
3. le document propre à la catégorie, s'il existe ;
4. `docs/SOURCES-DE-VERITE.md` et le contrat du composant partagé concerné.

La méthode permanente est : **analyse → proposition → validation pédagogique
→ modification → vérification visuelle**. Une idée encore discutée n'est pas
une règle validée.

## Documentation canonique

- `docs/PROTOCOLE-AUTOMATISMES-MATHSGO.md` est l'unique protocole commun.
- Ne jamais le remplacer par une copie issue d'une branche ou d'un ancien
  dossier. Repartir de la version de `main` et fusionner les ajouts à la main.
- Une règle commune validée est ajoutée au protocole et à son journal de
  décision.
- Une décision propre à une catégorie est consignée dans un document dédié,
  puis reliée depuis le module ou l'index documentaire. Elle ne remplace pas
  une règle commune.
- Une contradiction reste explicitement marquée comme ouverte jusqu'à sa
  validation. Ne pas choisir silencieusement une interprétation pédagogique.

## Modification et vérification

- Préserver les changements non liés déjà présents dans le dépôt.
- Limiter chaque lot à une catégorie ou à un petit ensemble cohérent.
- Réutiliser les composants existants avant de créer un nouveau rendu local.
- Contrôler le cours, l'aide, la correction, les distracteurs, plusieurs
  graines et les cas limites.
- Vérifier réellement le téléphone portrait, l'ordinateur et le diaporama,
  avec des captures représentatives lorsque l'affichage change.
- Exécuter `npm test` avant toute publication.

## Publication

La branche `main` est protégée. Publier par petit commit cohérent et pull
request. Le compte rendu distingue toujours : local, branche poussée, pull
request ouverte, fusionnée et bêta déployée. Signaler spontanément tout lot
validé qui resterait à publier.
