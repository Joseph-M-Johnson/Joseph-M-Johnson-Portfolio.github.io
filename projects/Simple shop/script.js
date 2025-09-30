let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];
let currentPage = 1;
const itemsPerPage = 4; // ✅ Always 5 per page

// Load products
async function loadProducts() {
    try {
        const response = await fetch("questions.json"); // make sure your file is named correctly
        const data = await response.json();
        products = data.products;

        renderProducts();
        renderCart();
        renderPagination();
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Render products for current page
function renderProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = products.slice(start, end);

    pageProducts.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productsContainer.appendChild(card);
    });
}

// Render pagination
function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            renderPagination();
        }
    });
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            renderProducts();
            renderPagination();
        });
        pagination.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            renderPagination();
        }
    });
    pagination.appendChild(nextBtn);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    renderCart();
    showNotification(`${product.name} added to cart!`);
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.remove("hidden");
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.classList.add("hidden"), 500);
    }, 2000);
}

// Sorting
document.getElementById("sortLowHigh").addEventListener("click", () => {
    products.sort((a, b) => a.price - b.price);
    currentPage = 1;
    renderProducts();
    renderPagination();
});

document.getElementById("sortHighLow").addEventListener("click", () => {
    products.sort((a, b) => b.price - a.price);
    currentPage = 1;
    renderProducts();
    renderPagination();
});

// Toggle cart (open/close with header button)
document.getElementById("toggleCart").addEventListener("click", () => {
    document.getElementById("cart").classList.toggle("hidden");
});

// Close cart button
document.getElementById("closeCart").addEventListener("click", () => {
    document.getElementById("cart").classList.add("hidden");
});

// Clear entire cart
document.getElementById("clearCart").addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    showNotification("Cart has been cleared!");
});

// Smooth scroll to shop
document.getElementById("shopNow").addEventListener("click", () => {
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Run
loadProducts();
