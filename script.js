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

