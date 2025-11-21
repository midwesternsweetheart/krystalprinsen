// Product data
const bowlCozyProducts = [
    { name: 'Rachel Design', image: '../images/rachel.cozy.png', price: 8.50, alt: 'rachel bowl cozy' },
    { name: 'Phoebe Design', image: '../images/phoebe.cozy.png', price: 8.50, alt: 'phoebe bowl cozy' },
    { name: 'Office Design', image: '../images/office.cozy.png', price: 8.50, alt: 'office bowl cozy' },
    { name: 'Octopus Design', image: '../images/octopus.cozy.png', price: 8.50, alt: 'octopus bowl cozy' },
    { name: 'Monica Design', image: '../images/monica.cozy.png', price: 8.50, alt: 'monica bowl cozy' },
    { name: 'Hedgehog Design', image: '../images/hedgehog.cozy.png', price: 8.50, alt: 'hedgehog bowl cozy' },
    { name: 'Gnome Design', image: '../images/gnome.cozy.png', price: 8.50, alt: 'gnome bowl cozy' },
    { name: 'Gingerbread Mix', image: '../images/gingerbread.mix.cozy.png', price: 8.50, alt: 'gingerbread mix bowl cozy' },
    { name: 'Fall Design', image: '../images/fall.pillowcase.png', price: 8.50, alt: 'fall bowl cozy' },
    { name: 'Friends Men Design', image: '../images/friends.men.cozy.png', price: 8.50, alt: 'friends men bowl cozy' },
    { name: 'Flamingo Design', image: '../images/flamingo.cozy.png', price: 8.50, alt: 'flamingo bowl cozy' }
];

const pillowcaseProducts = [
    { name: 'Turtle Design', image: '../images/turtle.pillowcase.png', price: 16.00, alt: 'turtle pillowcase' },
    { name: 'Phoebe Design', image: '../images/phoebe.pillowcase.png', price: 16.00, alt: 'phoebe pillowcase' },
    { name: 'Office Design', image: '../images/office.pillowcase.png', price: 16.00, alt: 'office pillowcase' },
    { name: 'Monica Design', image: '../images/monica.pillowcase.png', price: 16.00, alt: 'monica pillowcase' },
    { name: 'Gnome Design', image: '../images/gnome.pillowcase.png', price: 16.00, alt: 'gnome pillowcase' },
    { name: 'Friends Design', image: '../images/friends.pillowcase.png', price: 16.00, alt: 'friends pillowcase' },
    { name: 'Friends Men Design', image: '../images/friends.men.pillowcase.png', price: 16.00, alt: 'friends men pillowcase' }
    
];

// Get current page products
const currentPage = window.location.pathname;
const products = currentPage.includes('bowl-cozies') ? bowlCozyProducts : pillowcaseProducts;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    // no inline modals here; ordering is handled on the cart page

    if (currentPage.includes('custom-orders')) return;

    // Display products
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.alt || product.name}" class="product-image">
                <div class="product-overlay">
                    <button class="add-to-cart-btn" data-product='${JSON.stringify(product)}'>
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');

    // Handle add to cart clicks
    productsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.add-to-cart-btn');
        if (button) {
            const product = JSON.parse(button.getAttribute('data-product'));
            cart.addItem(product);
            
            // Show add to cart animation
            const notification = document.createElement('div');
            notification.className = 'add-to-cart-notification';
            notification.textContent = 'Added to cart!';
            button.parentElement.appendChild(notification);
            
            setTimeout(() => notification.remove(), 2000);
        }
    });

    // no modal handling on product pages
});