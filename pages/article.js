function getCartItemsFromCookies() {
    const cartCookie = document.cookie.split('; ').find(row => row.startsWith('cartItems='));
    if (cartCookie) {
        return JSON.parse(cartCookie.split('=')[1]);
    }
    return [];
}

window.addEventListener('message', function(event) {
    const allowedOrigin = window.location.origin;
    
    if (event.origin !== allowedOrigin) {
        return;
    }
    if (event.data.action === 'loadArticle') {
        window.Article = event.data.article;
        const cartItems = getCartItemsFromCookies();
        const existingItem = cartItems.find(cartItem => cartItem.title === window.Article.title);
        if (existingItem) {
            quantité.value = existingItem.quantity;
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('addToCartButton');
    const quantityInput = document.getElementById('quantité');

    addToCartButton.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value, 10);

        if (!isNaN(quantity) && quantity > 0) {
            SetItemQuantityToCart(quantity);
        } else {
            alert('Veuillez entrer une quantité valide.');
        }
    });

    function SetItemQuantityToCart(quantity) {
        if (window.Article) {
            // Ajoute l'article au panier
            const cartItems = getCartItemsFromCookies();
            const existingItem = cartItems.find(cartItem => cartItem.title === window.Article.title);
            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                cartItems.push({
                    title: window.Article.title,
                    price: window.Article.prix,
                    quantity: quantity
                });
            }

            setCartItemsToCookies(cartItems);
            if(quantity <= 0){
                alert(`$${window.Article.title} supprimer du panier.`);
            }else alert(`${quantity} ${window.Article.title} présent dans le panier.`);
        } else {
            alert('Article non trouvé.');
        }
    }

    function setCartItemsToCookies(cartItems) {
        document.cookie = `cartItems=${JSON.stringify(cartItems)}; path=/;`;
    }
});
