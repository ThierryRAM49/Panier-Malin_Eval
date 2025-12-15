# 🛒 Panier Malin

**Évaluation JavaScript – Projet Boutique Dynamique avec DOM**

## 🎯 Objectif
Créer une mini-boutique en ligne dynamique avec panier interactif (ajout, suppression, calcul automatique du total et validation par email).

## 🧩 Fonctionnalités
- Affichage dynamique des produits (DOM)
- Ajout au panier avec gestion des doublons
- Calcul automatique du total
- Suppression d’un article du panier
- Validation de commande avec contrôle de l’adresse email
- Design responsive minimum

## 💻 Technologies
- HTML5
- CSS3
- JavaScript Vanilla

## 🧪 Règles de gestion
- Si un produit est déjà dans le panier, la quantité augmente sans dupliquer la ligne.
- Le total général se met à jour à chaque action.
- Impossible de valider la commande si :
  - Le panier est vide.
  - L’email n’est pas valide (regex utilisée).
- Message de succès ou d’erreur affiché dans le DOM (pas de `alert()`).

## 📂 Structure
