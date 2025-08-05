// Cart page functionality with database integration
document.addEventListener('DOMContentLoaded', async function() {
    const user = BatikAPI.getCurrentUser();
    if (!user) {
        alert('Silakan login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    }
    
    await loadCartItems();
});

async function loadCartItems() {
    try {
        const user = BatikAPI.getCurrentUser();
        const cartItems = await BatikAPI.getCart(user.id);
        
        displayCartItems(cartItems);
        updateCartTotal(cartItems);
    } catch (error) {
        console.error('Error loading cart:', error);
        // Fallback to localStorage
        const cartItems = getCartLocal();
        displayCartItems(cartItems);
        updateCartTotal(cartItems);
    }
}

function displayCartItems(items) {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;
    
    if (items.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <h4>Keranjang Anda Kosong</h4>
                <p>Belum ada produk di keranjang belanja Anda.</p>
                <a href="products.html" class="btn btn-primary">Mulai Belanja</a>
            </div>
        `;
        return;
    }
    
    cartContainer.innerHTML = items.map(item => `
        <div class="row align-items-center border-bottom py-3" data-product-id="${item.product_id || item.id}">
            <div class="col-md-2">
                <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
            </div>
            <div class="col-md-4">
                <h5>${item.name}</h5>
                <p class="text-muted mb-0">${formatPrice(item.price)}</p>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.product_id || item.id}, -1)">-</button>
                    <input type="number" class="form-control text-center" value="${item.quantity}" min="1" onchange="updateQuantity(${item.product_id || item.id}, this.value, true)">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.product_id || item.id}, 1)">+</button>
                </div>
            </div>
            <div class="col-md-2">
                <strong>${formatPrice(item.price * item.quantity)}</strong>
            </div>
            <div class="col-md-1">
                <button class="btn btn-danger btn-sm" onclick="removeItem(${item.product_id || item.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

async function updateQuantity(productId, change, absolute = false) {
    try {
        const user = BatikAPI.getCurrentUser();
        
        if (absolute) {
            // Set absolute quantity
            await BatikAPI.updateCartItem(user.id, productId, parseInt(change));
        } else {
            // Get current quantity and update
            const cartItems = await BatikAPI.getCart(user.id);
            const item = cartItems.find(item => (item.product_id || item.id) === productId);
            if (item) {
                const newQuantity = item.quantity + change;
                if (newQuantity <= 0) {
                    await removeItem(productId);
                    return;
                }
                await BatikAPI.updateCartItem(user.id, productId, newQuantity);
            }
        }
        
        await loadCartItems();
    } catch (error) {
        console.error('Error updating quantity:', error);
        alert('Gagal mengupdate jumlah produk');
    }
}

async function removeItem(productId) {
    if (!confirm('Hapus produk dari keranjang?')) return;
    
    try {
        const user = BatikAPI.getCurrentUser();
        await BatikAPI.removeFromCart(user.id, productId);
        await loadCartItems();
    } catch (error) {
        console.error('Error removing item:', error);
        alert('Gagal menghapus produk');
    }
}

function updateCartTotal(items) {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    
    const totalElement = document.getElementById('cartTotal');
    const totalItemsElement = document.getElementById('totalItems');
    const cartSummary = document.getElementById('cartSummary');
    const cartEmpty = document.getElementById('cartEmpty');
    
    if (items.length === 0) {
        cartSummary.style.display = 'none';
        cartEmpty.style.display = 'block';
    } else {
        cartSummary.style.display = 'block';
        cartEmpty.style.display = 'none';
        
        if (totalElement) totalElement.textContent = formatPrice(total);
        if (totalItemsElement) totalItemsElement.textContent = `${totalItems} item${totalItems > 1 ? 's' : ''}`;
    }
}

async function checkout() {
    try {
        const user = BatikAPI.getCurrentUser();
        const cartItems = await BatikAPI.getCart(user.id);
        
        if (cartItems.length === 0) {
            alert('Keranjang kosong');
            return;
        }
        
        const orderData = {
            user_id: user.id,
            items: cartItems.map(item => ({
                product_id: item.product_id || item.id,
                quantity: item.quantity
            })),
            shipping_address: 'Alamat pengiriman default', // Bisa diambil dari form
            payment_method: 'Transfer Bank'
        };
        
        const response = await BatikAPI.createOrder(orderData);
        alert(`Pesanan berhasil dibuat! Total: ${formatPrice(response.total_amount)}`);
        
        // Reload cart after successful order
        await loadCartItems();
        
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Gagal membuat pesanan: ' + error.message);
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function getCartLocal() {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        return [];
    }
}