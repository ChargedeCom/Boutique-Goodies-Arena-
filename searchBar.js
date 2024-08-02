document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestions');
    const items = [
        "Article 1: Introduction à JavaScript",
        "Article 2: Les bases du HTML",
        "Article 3: CSS pour les débutants",
        "Article 4: Comprendre les API Web",
        "Article 5: Frameworks JavaScript populaires"
    ];

    function updateSuggestions(query) {
        suggestionsList.innerHTML = ''; // Réinitialise la liste des suggestions
        let filteredItems;

        if (query) {
            filteredItems = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        } else {
            filteredItems = items; // Affiche tous les articles si la recherche est vide
        }

        filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => {
                searchInput.value = item;
                suggestionsList.style.display = 'none'; // Masquer la liste après la sélection
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
