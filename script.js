window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden'); // Ajouter une classe pour démarrer l'animation de disparition
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Masquer complètement après l'animation
    }, 500); // Correspond au délai de l'animation CSS (0.5s)
});
document.addEventListener('DOMContentLoaded', function() {
    const resources = document.querySelectorAll('img, link[rel="stylesheet"]');
    const totalResources = resources.length;
    let loadedResources = 0;
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingScreen = document.getElementById('loadingScreen');

    function updateLoadingPercentage() {
        loadedResources++;
        const percent = Math.round((loadedResources / (totalResources + 1)) * 100); // +1 pour inclure le window.onload
        loadingPercentage.textContent = `${percent}%`;
    }

    // Ajouter des gestionnaires d'événements pour chaque ressource
    resources.forEach(resource => {
        if (resource.tagName === 'IMG') {
            resource.addEventListener('load', updateLoadingPercentage);
            resource.addEventListener('error', updateLoadingPercentage); // En cas d'erreur, on le compte aussi
        } else if (resource.tagName === 'LINK' && resource.rel === 'stylesheet') {
            resource.addEventListener('load', updateLoadingPercentage);
            resource.addEventListener('error', updateLoadingPercentage);
        }
    });

    // Suivre le chargement global de la page (y compris les scripts)
    window.onload = function() {
        // Mettre à jour le pourcentage à 100 % une fois que tout est chargé
        loadingPercentage.textContent = '100%';

        // Ajouter un délai pour une transition plus douce
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // Cache complètement après l'animation
            }, 500);
        }, 300); // Délai pour garder l'écran de chargement un peu plus longtemps si nécessaire
    };
});
document.addEventListener("DOMContentLoaded", function() {
    const main = document.querySelector('#main');
    const links = Array.from(document.querySelectorAll(".nav-link")).filter(link => link.getAttribute("href") !== null);
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll("nav ul li");

    // Fonction pour mettre à jour la classe active en fonction du scroll
    function updateActiveNav(entries) {
        let activeId = null;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeId = entry.target.getAttribute("id");
            }
        });

        // Ajouter ou enlever la classe active sur les éléments de navigation
        navItems.forEach(navItem => {
            const href = navItem.querySelector("a.nav-link").getAttribute("href").substring(1); // Extraire l'ID sans le #
            if (href === activeId) {
                navItem.classList.add("active");
            } else {
                navItem.classList.remove("active");
            }
        });
    }

    // Créer un observateur d'intersection
    const observer = new IntersectionObserver((entries) => {
        updateActiveNav(entries);
    }, {
        root: main,
        rootMargin: "0px",
        threshold: 0.5 // Changez cette valeur si nécessaire pour s'ajuster à la taille de la section
    });

    // Observer chaque section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Ajoute les gestionnaires d'événements aux liens de navigation
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();

            const targetId = this.getAttribute("href");
            if(targetId == "") return;
            const targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});