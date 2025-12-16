// base de données produits
const produits = [
  {
    id: 1,
    nom: "Thé Vert Bio",
    prix: 12.99,
    image: "https://placehold.co/600x400",
  },
  {
    id: 2,
    nom: "Café Arabica",
    prix: 8.5,
    image: "https://placehold.co/600x400",
  },
  {
    id: 3,
    nom: "Infusion Menthe",
    prix: 5.0,
    image: "https://placehold.co/600x400",
  },
  {
    id: 4,
    nom: "Chocolat Chaud",
    prix: 15.0,
    image: "https://placehold.co/600x400",
  },
];


// Panier en mémoire
let panier = [];

// Éléments DOM
const produitsContainer = document.getElementById('produits-container');
const panierListe = document.getElementById('panier-liste');
const montantTotal = document.getElementById('montant-total');
const btnCommander = document.getElementById('btn-commander');
const emailInput = document.getElementById('email-client');
const messageFeedback = document.getElementById('message-feedback');

// === Affichage des produits ===
function afficherProduits() {
    produits.forEach(produit => {
        const card = document.createElement('div');
        card.classList.add('card-produit');

        card.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">
            <h3>${produit.nom}</h3>
            <p class="prix">${produit.prix.toFixed(2)} €</p>
            <button data-id="${produit.id}">Ajouter au panier</button>
        `;

        produitsContainer.appendChild(card);
    });
}

// === Ajouter au panier ===
function ajouterAuPanier(idProduit) {
    const produit = produits.find(p => p.id === idProduit);
    const itemExistant = panier.find(item => item.id === idProduit);

    if (itemExistant) {
        itemExistant.quantite += 1;
    } else {
        panier.push({ ...produit, quantite: 1 });
    }

    mettreAJourPanier();
}

// === Supprimer du panier ===
function supprimerDuPanier(idProduit) {
    panier = panier.filter(item => item.id !== idProduit);
    mettreAJourPanier();
}

// === Mettre à jour l'affichage du panier ===
function mettreAJourPanier() {
    // Vider la liste
    panierListe.innerHTML = '';

    if (panier.length === 0) {
        panierListe.innerHTML = '<p>Votre panier est vide.</p>';
        montantTotal.textContent = '0.00';
        return;
    }

    // Afficher chaque item
    panier.forEach(item => {
        const divItem = document.createElement('div');
        divItem.classList.add('item-panier');

        const sousTotal = item.prix * item.quantite;

        divItem.innerHTML = `
            <span>${item.nom}</span>
            <span>${item.prix.toFixed(2)} €</span>
            <span>${item.quantite}</span>
            <span>${sousTotal.toFixed(2)} € <button data-id="${item.id}">✖</button></span>
        `;

        panierListe.appendChild(divItem);
    });

    // Calculer et afficher le total
    const total = panier.reduce((sum, item) => sum + (item.prix * item.quantite), 0);
    montantTotal.textContent = total.toFixed(2);
}


// === Validation de commande ===
function validerCommande() {
    messageFeedback.textContent = '';
    messageFeedback.className = '';

    const email = emailInput.value.trim();

    // Vérifier panier non vide
    if (panier.length === 0) {
        messageFeedback.textContent = 'Votre panier est vide !';
        messageFeedback.classList.add('error');
        return;
    }
