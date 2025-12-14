// Discord Webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1449772746027438224/vug6qz5e542I2GJRv1VmvT2IMioIhoeHBxdnWtAj9SVaT3dFb6pJ3_9XtBAS_6w90cYD';

// Menu Data - Easy to edit later
const menuItems = [
    // Food Items
    {
        id: 1,
        name: "Buffalo Wings",
        description: "Spicy chicken wings with blue cheese dip",
        price: 12.99,
        category: "food",
        icon: "🍗"
    },
    {
        id: 2,
        name: "Loaded Nachos",
        description: "Tortilla chips with cheese, jalapeños, and sour cream",
        price: 10.99,
        category: "food",
        icon: "🌮"
    },
    {
        id: 3,
        name: "BBQ Sliders",
        description: "Mini pulled pork sliders with coleslaw",
        price: 14.99,
        category: "food",
        icon: "🍔"
    },
    {
        id: 4,
        name: "Cheese Pizza",
        description: "Classic margherita pizza with fresh mozzarella",
        price: 16.99,
        category: "food",
        icon: "🍕"
    },
    {
        id: 5,
        name: "Chicken Tenders",
        description: "Crispy fried chicken tenders with honey mustard",
        price: 11.99,
        category: "food",
        icon: "🍖"
    },
    {
        id: 6,
        name: "Caesar Salad",
        description: "Fresh romaine with parmesan and croutons",
        price: 9.99,
        category: "food",
        icon: "🥗"
    },
    {
        id: 7,
        name: "Chocolate Brownie",
        description: "Warm fudge brownie with vanilla ice cream",
        price: 7.99,
        category: "food",
        icon: "🍫"
    },
    {
        id: 8,
        name: "Cheesecake",
        description: "New York style cheesecake with berry topping",
        price: 8.99,
        category: "food",
        icon: "🍰"
    },
    // Drink Items
    {
        id: 9,
        name: "Coca Cola",
        description: "Classic cola",
        price: 2.99,
        category: "drinks",
        icon: "🥤"
    },
    {
        id: 10,
        name: "Orange Juice",
        description: "Fresh squeezed orange juice",
        price: 3.99,
        category: "drinks",
        icon: "🧃"
    },
    {
        id: 11,
        name: "Beer",
        description: "Ice cold draft beer",
        price: 5.99,
        category: "drinks",
        icon: "🍺"
    },
    {
        id: 12,
        name: "Wine",
        description: "House red or white wine",
        price: 8.99,
        category: "drinks",
        icon: "🍷"
    },
    {
        id: 13,
        name: "Mojito",
        description: "Fresh mint mojito with lime",
        price: 7.99,
        category: "drinks",
        icon: "🍹"
    },
    {
        id: 14,
        name: "Water",
        description: "Bottled water",
        price: 1.99,
        category: "drinks",
        icon: "💧"
    },
    {
        id: 15,
        name: "Iced Tea",
        description: "Sweet or unsweetened iced tea",
        price: 2.99,
        category: "drinks",
        icon: "🧊"
    },
    {
        id: 16,
        name: "Coffee",
        description: "Hot coffee or espresso",
        price: 3.99,
        category: "drinks",
        icon: "☕"
    }
];

// Cart state
let cart = [];
let currentCategory = 'all';

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
    const filteredItems = currentCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === currentCategory);

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
    currentCategory = 'all';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-category="all"]').classList.add('active');
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

