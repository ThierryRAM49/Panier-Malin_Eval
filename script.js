//********  base de données des produits ************
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

//******** Fin  base de données des produits ************

// Initialisation du panier
let panier = [];

// === Déclaration des variables des elements pour DOM ===

const produitsContainer = document.getElementById('produits-container');
const panierListe = document.getElementById('panier-liste');
const montantTotal = document.getElementById('montant-total');
const btnCommander = document.getElementById('btn-commander');
const emailInput = document.getElementById('email-client');
const messageFeedback = document.getElementById('message-feedback');

// === Fin déclaration des variables des elements pour DOM ===




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

// === Fin de l'affichage des produits ===



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

// === Fin d' ajout au panier ===




// === Supprimer du panier ===
function supprimerDuPanier(idProduit) {
    panier = panier.filter(item => item.id !== idProduit);
    mettreAJourPanier();
}

// === Fin de Suppression du panier ===



// === Mettre à jour l'affichage du panier ===
function mettreAJourPanier() {
  // Vider la liste
  panierListe.innerHTML = "";

  if (panier.length === 0) {
    panierListe.innerHTML = "<p>Votre panier est vide.</p>";
    montantTotal.textContent = "0.00";
    return;
  }

  // Afficher chaque item
  panier.forEach((item) => {
    const divItem = document.createElement("div");
    divItem.classList.add("item-panier");

    const sousTotal = item.prix * item.quantite;

    divItem.innerHTML = `
            <span>${item.nom}</span>
            <span>${item.prix.toFixed(2)} €</span>
            <span>${item.quantite}</span>
            <span>${sousTotal.toFixed(2)} € <button data-id="${item.id}">✖</button></span>
        `;

    panierListe.appendChild(divItem);
  });

  // === Fin de mise à jour de l'affichage du panier ===




  // === Calculer et afficher le total ===
  const total = panier.reduce(
    (sum, item) => sum + item.prix * item.quantite,
    0
  );
  montantTotal.textContent = total.toFixed(2);
}

// === Fin de Calcul pour afficher le total ===



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
// Vérifier email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messageFeedback.textContent = 'Veuillez entrer une adresse email valide.';
        messageFeedback.classList.add('error');
        return;
    }
// approbation ou refus de la commande
    messageFeedback.textContent = 'Commande valide ! Un email de confirmation vous sera envoyé.';
    messageFeedback.classList.add('success'); //confirmation


    // === Effacer le panier ===
    panier = [];
    mettreAJourPanier();


}


// === Initialisation ===
afficherProduits();
mettreAJourPanier();



// === Ecoutes  des evenements liés au panier ===

// Evenements (activités)
document.addEventListener('click', (e) => {
  //Boutton ajouter au panier
  if (e.target.matches('#produits-container button')) {
    const idProduit = parseInt(e.target.dataset.id);
    ajouterAuPanier(idProduit);
  }
  // Boutton supprimer du panier
  if (e.target.matches('.item-panier button')) {
    const idProduit = parseInt(e.target.dataset.id);
    supprimerDuPanier(idProduit);
  }
  // Ecoute du boutton validation de la commande
  btnCommander.addEventListener('click', validerCommande);
});

// === Fin de l'écoutes  des evenements liés au panier ===



// Initialisation du panier
function init() {
  afficherProduits();
  mettreAJourPanier();

  // Effacer l'email après rafraississement du navigateur
  emailInput.value = "";
}
