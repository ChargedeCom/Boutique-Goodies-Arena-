const cartModal = document.getElementById('cartModal');
const closeCartButton = document.querySelector('#cartModal .close-btn');
const panierItems = document.getElementById('panierItems');
const totalPrice = document.getElementById('totalPrice');
const cartCloseButton = document.querySelector('.cartClose');

document.addEventListener('DOMContentLoaded', function() {

    // Charger le panier à partir des cookies
    loadCartFromCookies();

    function openCartModal() {
        cartModal.style.display = 'flex';
    }

    function closeCartModal() {
        cartModal.style.display = 'none';
    }
    
    if (cartCloseButton) {
        cartCloseButton.addEventListener('click', closeCartModal);
    }
    
    function updateTotalPrice() {
        const total = Array.from(panierItems.querySelectorAll('.cart-item')).reduce((sum, cartItem) => {
            const price = parseFloat(cartItem.querySelector('span:nth-child(2)').textContent.replace('$', ''));
            const quantity = parseInt(cartItem.querySelector('.cart-item-quantity').textContent);
            return sum + (price * quantity);
        }, 0);
        
        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    }

    document.getElementById('showCartButton').addEventListener('click', openCartModal);
    closeCartButton.addEventListener('click', closeCartModal);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCartModal();
        }
    });

    function saveCartToCookies() {
        const cartItems = Array.from(panierItems.querySelectorAll('.cart-item')).map(cartItem => ({
            title: cartItem.querySelector('.cart-item-title').textContent,
            price: cartItem.querySelector('span:nth-child(2)').textContent.replace('$', ''),
            quantity: cartItem.querySelector('.cart-item-quantity').textContent
        }));

        document.cookie = `cartItems=${JSON.stringify(cartItems)}; path=/;`;
    }

    function loadCartFromCookies() {
        const cartCookie = document.cookie.split('; ').find(row => row.startsWith('cartItems='));
        if (cartCookie) {
            const cartItems = JSON.parse(cartCookie.split('=')[1]);
            cartItems.forEach(item => addItemToCart({ title: item.title, price: item.price }, parseInt(item.quantity)));
        }
    }
});

function addItemToCart(item, quantity) {
    const existingItem = Array.from(panierItems.querySelectorAll('.cart-item')).find(cartItem => 
        cartItem.querySelector('.cart-item-title').textContent === item.title
    );

    if (existingItem) {
        const quantityElem = existingItem.querySelector('.cart-item-quantity');
        quantityElem.textContent = parseInt(quantityElem.textContent) + quantity;
    } else {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const itemTitle = document.createElement('span');
        itemTitle.className = 'cart-item-title';
        itemTitle.textContent = item.title;

        const itemPrice = document.createElement('span');
        itemPrice.textContent = `$${item.price}`;

        const itemQuantity = document.createElement('span');
        itemQuantity.className = 'cart-item-quantity';
        itemQuantity.textContent = quantity;

        itemDiv.appendChild(itemTitle);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(itemQuantity);
        panierItems.appendChild(itemDiv);
    }

    updateTotalPrice();
    saveCartToCookies();
}
