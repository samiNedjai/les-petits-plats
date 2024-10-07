# Les Petits Plats

## Description du projet

**Les Petits Plats** est une application web de recherche de recettes développée en **JavaScript pur** avec **Bootstrap** pour la mise en forme. Cette application permet aux utilisateurs de trouver facilement des recettes en fonction de différents critères, notamment des ingrédients, des appareils, des ustensiles, ou encore un mot-clé dans la barre de recherche principale. L'interface dynamique assure une expérience utilisateur fluide sans rechargement de page lors de la recherche ou du filtrage des recettes.

## Fonctionnalités

- **Recherche par mot-clé** : Permet aux utilisateurs de rechercher des recettes en fonction d'un mot-clé dans le titre, la description ou la liste des ingrédients.
- **Filtres avancés** : Utilisation de filtres par ingrédient, appareil et ustensile pour affiner la recherche.
- **Interface dynamique** : Mise à jour dynamique de l'affichage des recettes et des filtres associés.
- **Sécurité** : Validation des entrées pour éviter les injections HTML.
- **Performances optimisées** : Algorithmes optimisés en utilisant soit des méthodes de tableaux (comme `forEach` et `filter`), soit des boucles natives (`for`, `while`).

## Installation

### Prérequis

- Navigateur moderne (Chrome, Firefox, Safari, etc.)

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-nom-utilisateur/les-petits-plats.git
   cd les-petits-plats
2. **Ouvrir le fichier HTML dans votre navigateur**
   ```bash
   open index.html


## Utilisation

- Ouvrir l'application et utiliser la barre de recherche pour rechercher une recette en fonction d'un mot-clé. La recherche est sensible à partir de trois caractères.
- Appliquer des filtres par ingrédient, appareil ou ustensile en sélectionnant les options correspondantes dans les menus déroulants.
- Pour supprimer un filtre, cliquer sur le bouton "x" à côté du filtre appliqué.
- La liste des recettes se met à jour dynamiquement en fonction des filtres et de la recherche, sans rechargement de page.

## Structure du projet

- `index.html` : Le fichier HTML principal.
- `/assets` : Contient les fichiers statiques et les assets (images, icônes, etc.).
- `/styles` : Fichiers CSS pour le style de l'application.
- `/scripts` : Contient les fichiers JavaScript pour la recherche et le filtrage des recettes.
  - `searchRecipes.js` : Gère la recherche dans la barre principale et les filtres actifs (ingrédients, appareils, ustensiles).
  - `Dropdowns.js` : Gère l'affichage et la mise à jour dynamique des filtres (ingrédients, appareils, ustensiles).
  - `cards.js` : Génère l'affichage des cartes de recettes.

## Sécurité

L'application utilise une fonction de validation des entrées pour empêcher les injections HTML. Toutes les entrées utilisateur sont nettoyées avant d'être traitées pour éviter que le code HTML soit interprété comme du contenu actif.

## Tests de performance

Deux versions du moteur de recherche sont disponibles pour optimiser les performances :

- **Version utilisant des méthodes de tableaux** : `forEach`, `filter`, etc.
- **Version utilisant des boucles natives** : `for` et `while` pour des performances optimisées.

Les performances des deux versions peuvent être comparées via des outils comme **JSBench**.

## Auteur

nedjai sami - Développeur de l'application Les Petits Plats

## Annexes

### Diagramme du flux de recherche

Pour mieux comprendre le fonctionnement du moteur de recherche et les interactions entre les filtres, vous pouvez consulter le diagramme de flux ci-dessous :

[Diagramme du flux de recherche (PDF)](Documents/Fiche_investigation_fonctionnalité_moteur_de_recherche.pdf)
