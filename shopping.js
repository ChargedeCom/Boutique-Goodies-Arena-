const Articles = [
    {
        title: "Flyer Arena",
        image: "./images/ArticleflyerArena.svg",
        page: "pages/article1.html",
        prix: 20
    },
    {
        title: "Carte de visite (personnalisées)",
        image: "images/Exemplecartedevisite.svg",
        page: "pages/article2.html",
        prix: 20
    },
    {
        title: "Panneaux à Vendre - Vendu",
        image: "images/Exemplepanneauxàlouer.svg",
        page: "pages/article3.html",
        prix: 20
    },
    // Ajoutez d'autres articles ici
];

window.Articles = Articles;

const modal = document.getElementById('myModal');
const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestions');
const modalIframe = document.getElementById('modalIframe');
const articleCloseButton = document.querySelector('.articleClose');

document.addEventListener('DOMContentLoaded', function() {

    // Fonction pour fermer les modales
    function closeModal() {
        modal.style.display = 'none';  // Cache l'affichage
    }
    

    // Gestionnaires d'événements
    if (articleCloseButton) {
        articleCloseButton.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.querySelectorAll('.bubble-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            if (modal) modal.style.display = 'flex'; // Afficher la modale des articles
        });
    });
    
    // Fonction pour mettre à jour les suggestions de recherche
    function updateSuggestions(query) {
        suggestionsList.innerHTML = ''; // Réinitialiser la liste des suggestions
        let filteredItems;

        if (query) {
            filteredItems = Articles.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        } else {
            filteredItems = Articles; // Affiche tous les articles si la recherche est vide
        }

        filteredItems.forEach(item => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = item.image;
            img.className = 'suggestion-image';
            const span = document.createElement('span');
            span.textContent = item.title;
            li.appendChild(img);
            li.appendChild(span);
            li.addEventListener('click', () => {
                modalIframe.src = item.page; // Charge la page dans l'iframe
                modal.style.display = 'flex'; // Affiche la modale
                suggestionsList.style.display = 'none'; // Masquer la liste des suggestions
            });
            suggestionsList.appendChild(li);
        });

        suggestionsList.style.display = filteredItems.length ? 'block' : 'none'; // Affiche la liste si des résultats sont trouvés
    }

    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        updateSuggestions(query);
    });

    // Afficher les suggestions lorsque le champ de recherche reçoit le focus
    searchInput.addEventListener('focus', function() {
        const query = searchInput.value;
        updateSuggestions(query); // Met à jour les suggestions même si le champ est vide
        suggestionsList.style.display = 'block'; // Affiche la liste des suggestions
    });

    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !suggestionsList.contains(event.target)) {
            suggestionsList.style.display = 'none'; // Masquer la liste si l'utilisateur clique ailleurs
        }
    });

});

document.addEventListener('DOMContentLoaded', function() {
    const bubblesContainer = document.getElementById('bubblesContainer');

    Articles.forEach(item => {
        const bubbleWrapper = document.createElement('div');
        bubbleWrapper.className = 'bubble-wrapper';

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        
        const title = document.createElement('div');
        title.className = 'bubble-title';
        title.textContent = item.title;
        
        bubble.appendChild(img);
        bubbleWrapper.appendChild(bubble);
        bubbleWrapper.appendChild(title);
        
        // Ajouter un gestionnaire d'événements pour ouvrir la modale
        bubbleWrapper.addEventListener('click', () => {
            const loadingOverlay = document.getElementById('loadingOverlay');
            loadingOverlay.style.display = 'flex'; // Affiche le flou et le spinner
        
            localStorage.setItem('selectedArticle', JSON.stringify(item));
            modalIframe.src = item.page; // Charge la page dans l'iframe
            modalIframe.onload = () => {
                modalIframe.contentWindow.postMessage({ action: 'loadArticle', article: item }, '*');
            };

            // Masquer le flou et le spinner une fois la page chargée
            modalIframe.addEventListener('load', () => {
                modal.style.display = 'flex'; // Affiche la modale
                suggestionsList.style.display = 'none'; // Masquer la liste des suggestions
                loadingOverlay.style.display = 'none'; // Masquer l'overlay après le chargement
            });
        });

        bubblesContainer.appendChild(bubbleWrapper);
    });
});
