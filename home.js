// State
let menuItems = [];
let cart = [];

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
    // Check auth
    const userStr = localStorage.getItem('stallify_user');
    const token = localStorage.getItem('stallify_token');
    
    if (!userStr || !token) {
        window.location.href = 'login.html';
        return;
    }
    
    const user = JSON.parse(userStr);
    document.getElementById('userNameDisplay').innerText = `Hello, ${user.name}`;
    
    await fetchPopularItem();
    await fetchMenu();
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
        renderMenu(e.target.value.toLowerCase());
    });
});

async function fetchPopularItem() {
    try {
        const data = await apiFetch('/menu/popular');
        if (data.popular && data.popular.name) {
            document.getElementById('popularItem').innerText = data.popular.name;
        }
    } catch (error) {
        console.error('Failed to fetch popular item');
    }
}

async function fetchMenu() {
    try {
        menuItems = await apiFetch('/menu');
        renderMenu();
    } catch (error) {
        console.error('Failed to fetch menu');
    }
}

function renderMenu(filter = '') {
    const iceCreamGrid = document.getElementById('iceCreamGrid');
    const juiceGrid = document.getElementById('juiceGrid');
    
    iceCreamGrid.innerHTML = '';
    juiceGrid.innerHTML = '';
    
    menuItems.forEach(item => {
        if (filter && !item.name.toLowerCase().includes(filter)) return;
        
        const card = document.createElement('div');
        card.className = 'glass-card menu-item';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="menu-info">
                <div>
                    <h4>${item.name}</h4>
                    <div class="menu-price">₹${item.price}</div>
                </div>
                <button class="neon-btn small-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
        
        if (item.category.toLowerCase() === 'ice cream') {
            iceCreamGrid.appendChild(card);
        } else {
            juiceGrid.appendChild(card);
        }
    });
}

// Cart Functionality
function toggleCart() {
    const panel = document.getElementById('cartPanel');
    panel.classList.toggle('open');
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const existing = cart.find(i => i.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    showToast(`${item.name} added to cart!`);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const countBadge = document.getElementById('cartCount');
    const subtotalEl = document.getElementById('cartSubtotal');
    
    container.innerHTML = '';
    let total = 0;
    let count = 0;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:gray;">Cart is empty</p>';
    }
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="cart-item-info">
                <div>${item.name}</div>
                <small>₹${item.price}</small>
            </div>
            <div class="cart-controls">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑</button>
            </div>
        `;
        container.appendChild(el);
    });
    
    countBadge.innerText = count;
    subtotalEl.innerText = `₹${total}`;
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        updateCartUI();
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

async function placeOrder() {
    if (cart.length === 0) {
        showToast('Cart is empty!');
        return;
    }
    
    const paymentMethod = document.getElementById('paymentMethod').value;
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const items = cart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity }));
    
    const btn = document.querySelector('.place-order-btn');
    btn.disabled = true;
    btn.innerText = 'Placing...';
    
    try {
        const order = await apiFetch('/orders', {
            method: 'POST',
            body: JSON.stringify({
                items,
                totalAmount,
                paymentMethod,
                paymentStatus: paymentMethod === 'Online Payment' ? 'paid' : 'pending'
            })
        });
        
        cart = []; // clear cart
        updateCartUI();
        toggleCart(); // close cart
        
        // Show success modal
        document.getElementById('modalToken').innerText = `#${order.tokenNumber}`;
        document.getElementById('modalPayment').innerText = paymentMethod;
        document.getElementById('orderModal').classList.remove('hidden');
        showToast('Order placed successfully!');
        
    } catch (error) {
        console.error('Order placement failed');
    } finally {
        btn.disabled = false;
        btn.innerText = 'Place Order';
    }
}

function closeModal() {
    document.getElementById('orderModal').classList.add('hidden');
}
