---
applyTo: "**"
---
s
# Instructions pour l’agent de développement

## 1. Contexte du projet

Nous développons une web app front-only permettant de formater, valider et explorer du JSON.

L’utilisateur doit pouvoir :

- Coller ou saisir du JSON.
- Vérifier si le JSON est valide.
- Voir les erreurs de syntaxe.
- Formater le JSON.
- Minifier le JSON.
- Choisir le niveau d’indentation.
- Bénéficier d’une coloration syntaxique.
- Replier et déplier les objets et les arrays.
- Voir le nombre d’éléments dans les arrays.
- Rechercher du texte dans le JSON.
- Utiliser une recherche avancée par clé, valeur, chemin ou expression régulière.
- Copier le résultat formaté.
- Utiliser l’application sans compte et sans serveur.

Toutes les données doivent rester dans le navigateur.

---

## 2. Objectif principal

Construire une application simple, rapide, propre et accessible permettant de manipuler du JSON directement dans le navigateur.

L’application doit fonctionner sans backend et sans envoyer de données utilisateur vers un serveur.

---

## 3. Niveau technique attendu

Le projet doit être conçu pour une personne qui part de zéro.

L’agent doit donc :

- Expliquer les décisions importantes.
- Éviter les abstractions inutiles.
- Avancer étape par étape.
- Ne pas générer une architecture trop complexe au départ.
- Préférer une solution simple et lisible.
- Donner les commandes nécessaires pour installer et lancer le projet.
- Signaler clairement les fichiers créés ou modifiés.
- Vérifier le résultat après chaque étape importante.

---

## 4. Stack technique imposée

Utiliser les technologies suivantes :

- React
- TypeScript
- Vite
- React Compiler
- CodeMirror 6
- `jsonc-parser`
- Tailwind CSS
- Vitest pour les tests
- ESLint
- Prettier

Ne pas utiliser de backend.

Ne pas utiliser de base de données.

Ne pas ajouter Redux sauf nécessité réelle.

Zustand peut être utilisé uniquement si la gestion d’état devient difficile avec React et les hooks natifs.

---

## 5. Initialisation du projet

Créer une application React avec TypeScript et Vite.

Le projet doit contenir au minimum :

```text
src/
├── app/
├── components/
├── features/
│   └── json/
├── hooks/
├── types/
├── utils/
├── styles/
├── App.tsx
└── main.tsx
```

Organisation recommandée :

```text
src/
├── components/
│   ├── Editor/
│   ├── Toolbar/
│   ├── SearchPanel/
│   ├── ValidationStatus/
│   ├── JsonStats/
│   └── Layout/
│
├── features/
│   └── json/
│       ├── jsonParser.ts
│       ├── jsonFormatter.ts
│       ├── jsonValidator.ts
│       ├── jsonAnalyzer.ts
│       ├── jsonSearch.ts
│       └── jsonTypes.ts
│
├── hooks/
│   ├── useJsonDocument.ts
│   ├── useJsonValidation.ts
│   ├── useJsonSearch.ts
│   └── useDebouncedValue.ts
│
├── types/
├── utils/
├── styles/
├── App.tsx
└── main.tsx
```

---

## 6. Fonctionnalités à développer

### 6.1 Éditeur JSON

Utiliser CodeMirror 6.

L’éditeur doit gérer :

- La saisie de texte.
- Le collage de contenu.
- Les numéros de ligne.
- La coloration syntaxique JSON.
- L’indentation.
- Le pliage des objets.
- Le pliage des arrays.
- La correspondance des parenthèses et crochets.
- La sélection de texte.
- La recherche avec `Ctrl + F`.
- La navigation entre les résultats.

L’éditeur doit rester utilisable avec un JSON invalide.

---

### 6.2 Validation JSON

Utiliser `JSON.parse` pour valider le JSON.

L’application doit afficher :

#### Si le JSON est valide

- Un indicateur visuel positif.
- Le message `JSON valide`.
- Le type de la valeur racine.
- Le nombre d’éléments principaux.
- La taille approximative du document.

#### Si le JSON est invalide

- Un indicateur visuel négatif.
- Le message `JSON invalide`.
- Le message d’erreur.
- La ligne concernée si elle peut être déterminée.
- La colonne concernée si elle peut être déterminée.

Ne jamais remplacer automatiquement le contenu invalide de l’utilisateur.

---

### 6.3 Formatage

Ajouter les actions suivantes :

- Formater.
- Minifier.
- Copier.
- Effacer.
- Coller si possible via l’interface.
- Choisir l’indentation.

Les options d’indentation doivent inclure :

- 2 espaces.
- 4 espaces.
- Indentation personnalisée si cela reste simple à implémenter.

Le formatage ne doit être effectué que si le JSON est valide.

Si le JSON est invalide :

- Conserver le texte original.
- Afficher l’erreur.
- Ne pas modifier silencieusement le contenu.

---

### 6.4 Pliage des objets et arrays

L’éditeur doit permettre de replier et déplier :

- Les objets JSON.
- Les arrays JSON.

Ajouter si possible les actions :

- Tout déplier.
- Tout replier.

Pour chaque array, afficher son nombre d’éléments lorsque cela est techniquement possible.

Exemples :

```text
items: Array[4]
users: Array[12]
settings: Object[5]
```

Le pliage natif de CodeMirror peut être utilisé dans la première version.

---

### 6.5 Analyse de la structure

Créer une représentation interne de la structure JSON.

Chaque nœud doit pouvoir contenir :

```text
type
key
value
children
startOffset
endOffset
lineStart
lineEnd
path
itemCount
```

Les types possibles sont :

```text
object
array
string
number
boolean
null
```

Les chemins JSON doivent suivre une notation proche de :

```text
$
$.user
$.user.name
$.items[0]
$.items[0].price
```

Cette structure servira plus tard pour :

- La recherche avancée.
- Le comptage des éléments.
- La navigation.
- Un éventuel explorateur en arbre.

---

### 6.6 Recherche simple

La recherche simple doit permettre :

- L’ouverture avec `Ctrl + F`.
- La recherche de texte.
- La navigation entre les résultats.
- L’affichage du nombre de résultats.
- La mise en évidence des occurrences.
- La recherche sensible ou non à la casse.

Utiliser autant que possible les fonctionnalités natives de CodeMirror.

---

### 6.7 Recherche avancée

Prévoir une architecture permettant d’ajouter les modes suivants :

- Recherche dans les clés.
- Recherche dans les valeurs.
- Recherche par chemin JSON.
- Recherche par type.
- Recherche avec expression régulière.
- Recherche sensible à la casse.

La recherche avancée peut être ajoutée après le MVP.

Ne pas complexifier la première version si la recherche simple fonctionne correctement.

---

## 7. Architecture de l’état

Commencer avec les hooks React natifs.

L’état principal doit contenir au minimum :

```text
rawText
isValid
validationError
parsedData
ast
rootType
documentStats
searchQuery
searchMode
searchResults
indentSize
isProcessing
```

Éviter de dupliquer inutilement les données.

Le texte présent dans l’éditeur doit rester la source de vérité pour le contenu utilisateur.

---

## 8. Interface utilisateur

Créer une interface simple, claire et responsive.

Structure recommandée :

```text
Application
├── Header
├── Toolbar
├── SearchPanel optionnel
├── JsonEditor
├── ValidationStatus
└── JsonStats
```

La barre d’outils doit contenir au minimum :

- Formater.
- Minifier.
- Copier.
- Effacer.
- Tout déplier.
- Tout replier.
- Recherche.

L’interface doit fonctionner sur :

- Ordinateur.
- Tablette.
- Mobile autant que possible.

Prévoir deux thèmes simples :

- Thème clair.
- Thème sombre.

Le thème sombre peut être ajouté après le MVP.

---

## 9. Design attendu

Le design doit être :

- Minimaliste.
- Lisible.
- Rapide à comprendre.
- Sans animations excessives.
- Avec des boutons clairement identifiables.
- Avec des messages d’erreur compréhensibles.

Utiliser une palette simple :

- Vert pour un JSON valide.
- Rouge pour un JSON invalide.
- Gris pour les informations neutres.
- Couleur d’accent pour les actions principales.

Les messages doivent être en français.

---

## 10. Accessibilité

Respecter les règles suivantes :

- Utiliser des boutons HTML accessibles.
- Ajouter des labels aux champs de recherche.
- Ne pas dépendre uniquement de la couleur.
- Prévoir des états `focus` visibles.
- Utiliser des contrastes suffisants.
- Ajouter des attributs `aria-label` lorsque nécessaire.
- Permettre l’utilisation au clavier.

Raccourcis souhaités :

```text
Ctrl/Cmd + F : ouvrir la recherche
Ctrl/Cmd + S : optionnel, copier ou télécharger
Échap        : fermer la recherche
```

---

## 11. Performance

Pour les petits et moyens JSON :

- Utiliser un traitement classique dans le thread principal.
- Utiliser un debounce pendant la validation.
- Éviter de recalculer inutilement l’AST.
- Ne pas reconstruire toute l’interface à chaque frappe.

Pour les gros fichiers :

- Envisager un Web Worker.
- Envisager la virtualisation de l’arbre JSON.
- Afficher un état de chargement pendant l’analyse.

Ne pas implémenter les optimisations complexes avant d’avoir un MVP fonctionnel.

---

## 12. Sécurité et confidentialité

Règles obligatoires :

- Ne jamais utiliser `eval`.
- Ne jamais exécuter le contenu du JSON.
- Ne pas envoyer le JSON vers une API.
- Ne pas afficher les données dans des logs de production.
- Échapper les valeurs avant affichage dans l’interface.
- Ne pas utiliser de serveur pour le parsing.

Afficher éventuellement dans l’interface :

```text
Traitement 100 % local — aucune donnée envoyée au serveur.
```

---

## 13. Tests

Ajouter des tests unitaires pour :

- Un JSON valide.
- Un JSON invalide.
- Un objet vide.
- Un array vide.
- Un JSON dont la racine est une chaîne.
- Un JSON dont la racine est un nombre.
- Un JSON imbriqué.
- Le formatage avec 2 espaces.
- Le formatage avec 4 espaces.
- La minification.
- Le comptage des éléments d’un array.
- La génération des chemins JSON.
- La recherche dans les clés.
- La recherche dans les valeurs.
- La recherche avec une expression régulière.

Exemples de fichiers de tests :

```text
src/features/json/jsonParser.test.ts
src/features/json/jsonFormatter.test.ts
src/features/json/jsonValidator.test.ts
src/features/json/jsonAnalyzer.test.ts
src/features/json/jsonSearch.test.ts
```

---

## 14. Plan de développement

### Étape 1 — Initialisation

- Créer le projet Vite.
- Installer React et TypeScript.
- Configurer ESLint.
- Configurer Prettier.
- Créer la structure des dossiers.
- Vérifier que l’application démarre.

### Étape 2 — Éditeur de base

- Installer CodeMirror.
- Afficher l’éditeur.
- Ajouter la coloration JSON.
- Ajouter les numéros de ligne.
- Ajouter l’indentation.
- Ajouter le pliage natif.

### Étape 3 — Validation

- Ajouter la lecture du texte.
- Ajouter `JSON.parse`.
- Afficher l’état valide ou invalide.
- Afficher les erreurs.
- Ajouter les tests de validation.

### Étape 4 — Formatage

- Ajouter le bouton Formater.
- Ajouter le bouton Minifier.
- Ajouter le choix d’indentation.
- Ajouter le bouton Copier.

### Étape 5 — Statistiques

- Afficher le type racine.
- Afficher le nombre d’éléments.
- Afficher la taille du document.
- Ajouter l’analyse de la structure.

### Étape 6 — Recherche

- Ajouter la recherche CodeMirror.
- Ajouter `Ctrl + F`.
- Ajouter le compteur de résultats.
- Ajouter la recherche avancée ultérieurement.

### Étape 7 — Amélioration de l’expérience

- Ajouter Tout déplier.
- Ajouter Tout replier.
- Ajouter le nombre d’éléments des arrays.
- Ajouter le thème sombre.
- Améliorer le responsive.
- Ajouter les messages d’aide.

### Étape 8 — Tests et production

- Ajouter les tests manquants.
- Vérifier les cas limites.
- Vérifier l’accessibilité.
- Vérifier les performances.
- Construire l’application pour la production.
- Tester le déploiement statique.

---

## 15. Règles de développement

L’agent doit respecter les règles suivantes :

1. Ne pas ajouter de backend.
2. Ne pas ajouter d’authentification.
3. Ne pas utiliser de base de données.
4. Ne pas envoyer de données utilisateur vers un serveur.
5. Ne pas ajouter de dépendance sans justification.
6. Préférer les composants simples.
7. Garder les fonctions de parsing indépendantes de React.
8. Garder les composants d’interface indépendants de la logique métier.
9. Ajouter des tests pour les fonctions importantes.
10. Ne pas modifier automatiquement un JSON invalide.
11. Afficher des messages d’erreur compréhensibles.
12. Documenter les décisions techniques importantes.
13. Vérifier que le projet compile après chaque fonctionnalité.
14. Ne pas générer de code inutile ou prématuré.
15. Signaler toute limitation technique avant de l’implémenter.

---

## 16. Critères d’acceptation du MVP

Le MVP est considéré comme terminé lorsque :

- L’application démarre avec une commande simple.
- L’utilisateur peut coller du JSON.
- Le JSON est coloré.
- Le JSON est validé.
- Les erreurs sont affichées.
- Le JSON valide peut être formaté.
- Le JSON valide peut être minifié.
- L’utilisateur peut choisir l’indentation.
- L’utilisateur peut copier le résultat.
- Les objets et arrays peuvent être repliés.
- La recherche `Ctrl + F` fonctionne.
- L’application ne nécessite aucun serveur.
- Aucune donnée utilisateur n’est envoyée hors du navigateur.
- Les fonctionnalités principales sont testées.
- Le projet peut être déployé sur une plateforme statique.

---

## 17. Commandes attendues

L’agent doit fournir et maintenir des commandes simples similaires à :

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

Si une commande diffère, l’agent doit l’expliquer clairement.

---

## 18. Priorité des fonctionnalités

Ordre de priorité :

1. Éditeur JSON.
2. Validation.
3. Formatage.
4. Minification.
5. Coloration syntaxique.
6. Recherche simple.
7. Pliage.
8. Statistiques.
9. Comptage des arrays.
10. Recherche avancée.
11. Thème sombre.
12. Optimisation pour gros fichiers.

---

## 19. Décisions techniques recommandées

### Éditeur

Utiliser CodeMirror 6 plutôt que construire un éditeur personnalisé.

### Validation

Utiliser `JSON.parse` pour la validation JSON standard.

### Analyse

Utiliser `jsonc-parser` pour obtenir une structure exploitable et les positions dans le texte.

### État

Commencer avec `useState`, `useReducer` et des hooks personnalisés.

### Styling

Utiliser Tailwind CSS avec variables css. Ajoute un light/dark mode simple. Par default, le thème clair est activé. L’utilisateur peut basculer vers le thème sombre via un bouton.

### Déploiement

Prévoir sur Cloudflare Pages.

---

## 20. Format des réponses de l’agent

À chaque étape, l’agent doit répondre avec :

1. Un résumé de ce qui a été fait.
2. La liste des fichiers créés ou modifiés.
3. Les commandes à exécuter.
4. Les tests effectués.
5. Les éventuelles limitations.
6. La prochaine étape recommandée.

L’agent ne doit pas considérer une fonctionnalité comme terminée sans vérifier que le projet compile.