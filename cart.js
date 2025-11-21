class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        this.items.push(product);
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartCount();
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
    }

    getItems() {
        return this.items;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.querySelectorAll('.cart-count');
        cartCount.forEach(count => {
            count.textContent = this.items.length;
        });
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }
}

const cart = new ShoppingCart();
// Ensure the UI is updated once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    // Refresh the visible count after the DOM is available
    cart.updateCartCount();
    if (cartIcon) {
        // If the cart icon is an anchor (<a>), allow default navigation to cart page.
        if (cartIcon.tagName && cartIcon.tagName.toLowerCase() === 'a') {
            // nothing to do; anchor href navigates to cart page
        } else {
            cartIcon.addEventListener('click', () => {
                const inProductsFolder = window.location.pathname.includes('/products/');
                window.location.href = inProductsFolder ? 'cart.html' : 'products/cart.html';
            });
        }
    }
});

// Listen for storage changes from other tabs/windows and sync the cart count
window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        try {
            cart.items = JSON.parse(event.newValue) || [];
        } catch (e) {
            cart.items = [];
        }
        cart.updateCartCount();
    }
});

// When the page becomes visible again, re-read localStorage to ensure the UI matches
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        try {
            cart.items = JSON.parse(localStorage.getItem('cart')) || [];
        } catch (e) {
            cart.items = [];
        }
        cart.updateCartCount();
    }
});