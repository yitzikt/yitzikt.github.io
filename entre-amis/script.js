// Discord Webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1449772746027438224/vug6qz5e542I2GJRv1VmvT2IMioIhoeHBxdnWtAj9SVaT3dFb6pJ3_9XtBAS_6w90cYD';

// Menu Data - Easy to edit later
const menuItems = [
    // Petites Assiettes
    {
        id: 1,
        name: "Tacos à la Yaakov",
        description: "Crispy fried corn tortillas cradling tender slow-cooked pulled beef with silky mayonnaise.",
        category: "petites-assiettes",
        icon: "🌮"
    },
    {
        id: 2,
        name: "Poulet Blossom",
        description: "Delicately breaded chicken nuggets accompanied by a trio of refined sauces: piquant spicy mayonnaise, aromatic garlic mayonnaise, and bold buffalo chicken emulsion.",
        category: "petites-assiettes",
        icon: "🍗"
    },
    {
        id: 3,
        name: "Latke du Reb Yitzchok Yosef",
        description: "A geshmaka golden-crisp potato latke crowned with succulent strands of slow-cooked pulled beef.",
        category: "petites-assiettes",
        icon: "🥔"
    },
    {
        id: 4,
        name: "Cigares de Bœuf BBQ",
        description: "Savory cigars of barbecue-spiced beef, hand-rolled in delicate pastry and served with creamy chickpea hummus.",
        category: "petites-assiettes",
        icon: "🥟"
    },
    // Salades
    {
        id: 5,
        name: "Salade Deli Shalom",
        description: "Thinly sliced turkey breast and pastrami nestled atop crisp romaine lettuce, finished with a classic Caesar dressing.",
        category: "salades",
        icon: "🥗"
    },
    {
        id: 6,
        name: "Salade de Poulet Grillé",
        description: "Tender grilled chicken atop your choice of crisp romaine lettuce or vibrant spring mix, accompanied by a light vinaigrette.",
        category: "salades",
        icon: "🥗"
    },
    {
        id: 7,
        name: "Salade TLD",
        description: "A refreshing composition of crisp cucumbers, ripe tomatoes, red onion, and fresh herbs over lively spring mix.",
        category: "salades",
        icon: "🥗"
    },
    // La Soupe du Soir
    {
        id: 8,
        name: "Soupe au Poulet Traditionnelle",
        description: "Classic golden chicken soup with tender carrots and lokshen noodles, simmered to comforting perfection.",
        category: "soupe",
        icon: "🍲"
    },
    {
        id: 9,
        name: "Soupe aux Légumes Râpés",
        description: "A light, nourishing blend of finely shredded seasonal vegetables in a delicate clear broth, vibrant and wholesome.",
        category: "soupe",
        icon: "🍲"
    },
    // Plats Principaux
    {
        id: 10,
        name: "Steak de Hampe*",
        description: "Succulent skirt steak marinated in a harmonious blend of parsley, oregano, garlic, chili flakes, smoked paprika, cumin, salt, and pepper, bound with olive oil and grilled to tender perfection. Served with your choice of two accompaniments.",
        category: "plats-principaux",
        icon: "🥩"
    },
    {
        id: 11,
        name: "Entrecôte*",
        description: "Robust boneless rib steak seasoned with a savory rub of kosher salt, smoked paprika, garlic powder, black pepper, brown sugar, and a hint of cayenne, seared to achieve a caramelized crust and juicy interior. Served with your choice of two accompaniments.",
        category: "plats-principaux",
        icon: "🥩"
    },
    {
        id: 12,
        name: "Burger sur Petit Pain*",
        description: "A hearty beef burger nestled in a soft roll, grilled to savory excellence with your choice of classic toppings for an indulgent, comforting delight. Served with your choice of two accompaniments.",
        category: "plats-principaux",
        icon: "🍔"
    },
    // Accompagnements
    {
        id: 13,
        name: "Frites Steak",
        description: "Crisply golden steak-cut fries, perfectly seasoned for a satisfying crunch.",
        category: "accompagnements",
        icon: "🍟"
    },
    {
        id: 14,
        name: "Anneaux d'Oignon",
        description: "Lightly battered and fried sweet onion rings, achieving a delicate crisp exterior and tender center.",
        category: "accompagnements",
        icon: "🧅"
    },
    {
        id: 15,
        name: "Haricots Verts Marinés de Moshe",
        description: "Fresh string beans marinated in a vibrant herb-infused vinaigrette—Moshe's signature preparation—offering bright flavor and crisp texture.",
        category: "accompagnements",
        icon: "🫛"
    },
    {
        id: 16,
        name: "Chou-Fleur Rôti",
        description: "Tender cauliflower florets roasted to caramelized perfection with olive oil and subtle seasoning.",
        category: "accompagnements",
        icon: "🥦"
    },
    // Pour les Petits
    {
        id: 17,
        name: "Poulet en Os à la Chani",
        description: "Crispy, juicy chicken on the bone, perfectly seasoned for little hands and big appetites. Served with fries and a special toy.",
        category: "pour-les-petits",
        icon: "🍗"
    },
    {
        id: 18,
        name: "Nuggets de Poulet",
        description: "Golden, tender chicken nuggets accompanied by a selection of dipping sauces, crafted for young gourmands. Served with fries and a special toy.",
        category: "pour-les-petits",
        icon: "🍗"
    },
    // Les Desserts
    {
        id: 19,
        name: "Beignets de Hanoucca",
        description: "Warm, golden Chanukah donuts freshly fried and dusted with powdered sugar, filled with seasonal preserves or classic jelly.",
        category: "desserts",
        icon: "🍩"
    },
    {
        id: 20,
        name: "Glace Vanille Maison aux Cookies – Signature de Dina",
        description: "Silky homemade vanilla ice cream generously swirled with crushed chocolate cookies for a timeless cookies-and-cream indulgence.",
        category: "desserts",
        icon: "🍨"
    },
    {
        id: 21,
        name: "Salade de Fruits Fraîche",
        description: "A vibrant medley of seasonal fresh fruits, artfully composed for a light and refreshing finale.",
        category: "desserts",
        icon: "🍇"
    }
];

// Cart state
let cart = [];
let currentCategory = 'petites-assiettes';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderMenu();
    setupEventListeners();
    updateCartDisplay();
});

// Event Listeners
function setupEventListeners() {
    // Category tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderMenu();
        });
    });

    // Floating cart button
    document.getElementById('floatingCartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCartBtn').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        openOrderModal();
        closeCart();
    });

    // Order form
    document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);

    // Modal close buttons
    document.getElementById('closeModal').addEventListener('click', closeOrderModal);
    document.getElementById('cancelOrder').addEventListener('click', closeOrderModal);
    document.getElementById('newOrderBtn').addEventListener('click', startNewOrder);

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        const orderModal = document.getElementById('orderModal');
        const successModal = document.getElementById('successModal');
        if (e.target === orderModal) closeOrderModal();
        if (e.target === successModal) closeSuccessModal();
    });
}

// Render menu items
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const menuDisclaimer = document.getElementById('menuDisclaimer');
    const filteredItems = menuItems.filter(item => item.category === currentCategory);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item">
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-description">${item.description}</div>
            <div class="menu-item-footer">
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Show disclaimer only for main dishes category
    if (currentCategory === 'plats-principaux') {
        menuDisclaimer.style.display = 'block';
    } else {
        menuDisclaimer.style.display = 'none';
    }
}

// Cart functions
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = cart.find(c => c.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCartToStorage();
    updateCartDisplay();

    // Open cart if it's closed
    const cartSection = document.getElementById('cartSection');
    if (!cartSection.classList.contains('active')) {
        toggleCart();
    }

    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.background = '#4ecdc4';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1000);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCartDisplay();
}

function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveCartToStorage();
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const floatingCartCount = document.getElementById('floatingCartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    floatingCartCount.textContent = count;
    checkoutBtn.disabled = cart.length === 0;

    // Hide badge if cart is empty
    if (count === 0) {
        floatingCartCount.style.display = 'none';
    } else {
        floatingCartCount.style.display = 'flex';
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.icon} ${item.name}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }
}

// Order functions
function openOrderModal() {
    if (cart.length === 0) return;

    const orderSummary = document.getElementById('orderSummary');
    const summaryHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.icon} ${item.name} x${item.quantity}</span>
        </div>
    `).join('');

    orderSummary.innerHTML = summaryHTML;

    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('customerName').focus();
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
}

async function handleOrderSubmit(e) {
    e.preventDefault();

    const customerName = document.getElementById('customerName').value.trim();
    if (!customerName) {
        alert('Please enter your name');
        return;
    }

    const orderText = formatOrderForDiscord(customerName);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        // Send to Discord webhook
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: orderText
            })
        });

        if (!response.ok) {
            throw new Error(`Discord API error: ${response.status}`);
        }

        // Success - show modal
        closeOrderModal();
        document.getElementById('successModal').style.display = 'block';

        // Clear cart after successful submission
        cart = [];
        saveCartToStorage();
        updateCartDisplay();

    } catch (error) {
        console.error('Error sending order to Discord:', error);
        closeOrderModal();
        document.getElementById('successModal').style.display = 'block';

        // Show error message in modal
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = '⚠️ Failed to send order. Please try again.';
        successMessage.style.color = '#e74c3c';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

function formatOrderForDiscord(customerName) {
    let text = `🎉 **NEW ORDER** 🎉\n\n`;
    text += `**Name:** ${customerName}\n\n`;
    text += `**Items:**\n`;

    cart.forEach(item => {
        text += `${item.icon} ${item.name} x${item.quantity}\n`;
    });

    text += `\n---\n`;

    return text;
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

function startNewOrder() {
    cart = [];
    saveCartToStorage();
    updateCartDisplay();
    closeSuccessModal();
    currentCategory = 'petites-assiettes';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-category="petites-assiettes"]').classList.add('active');
    renderMenu();

    // Reset success message
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'Your order has been sent to Discord!';
    successMessage.style.color = '';
}

// Cart toggle functions
function toggleCart() {
    const cartSection = document.getElementById('cartSection');
    const cartOverlay = document.getElementById('cartOverlay');

    cartSection.classList.toggle('active');
    cartOverlay.classList.toggle('active');

    // Prevent body scroll when cart is open
    if (cartSection.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeCart() {
    const cartSection = document.getElementById('cartSection');
    const cartOverlay = document.getElementById('cartOverlay');

    cartSection.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// LocalStorage functions
function saveCartToStorage() {
    localStorage.setItem('partyMenuCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('partyMenuCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

