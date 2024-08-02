document.addEventListener("DOMContentLoaded", function() {
    const main = document.querySelector('#main');
    const links = document.querySelectorAll(".nav-link");
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
            const targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});
