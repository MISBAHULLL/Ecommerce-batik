// Fungsi untuk memformat harga dalam format Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Fungsi untuk mendapatkan data keranjang dari localStorage
function getCart() {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error getting cart:', error);
        return [];
    }
}

// Fungsi untuk menyimpan data keranjang ke localStorage
function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
        showNotification('Terjadi kesalahan saat menyimpan keranjang', 'error');
    }
}

// Fungsi untuk menampilkan item keranjang
function displayCartItems() {
    const cart = getCart();
    const cartContent = document.getElementById('cartContent');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartContent || !cartEmpty || !cartSummary) return;

    if (cart.length === 0) {
        cartContent.innerHTML = '';
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';

    let totalPrice = 0;
    let totalItems = 0;

    const cartHTML = cart.map(item => {
        const subtotal = item.price * item.quantity;
        totalPrice += subtotal;
        totalItems += item.quantity;

        return `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}" style="height: 150px; object-fit: cover;">
                    </div>
                    <div class="col-md-10">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text">
                                        <small class="text-muted">Harga: ${formatPrice(item.price)}</small>
                                    </p>
                                </div>
                                <div class="col-md-4">
                                    <div class="d-flex align-items-center justify-content-end">
                                        <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, -1)">-</button>
                                        <span class="mx-2">${item.quantity}</span>
                                        <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, 1)">+</button>
                                        <button class="btn btn-danger btn-sm ms-3" onclick="removeFromCart(${item.id})">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                    <p class="text-end mt-2">
                                        <strong>Subtotal: ${formatPrice(subtotal)}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    cartContent.innerHTML = cartHTML;
    
    // Update ringkasan belanja
    document.getElementById('totalItems').textContent = `${totalItems} item`;
    document.getElementById('totalPrice').textContent = formatPrice(totalPrice);
}

// Fungsi untuk mengupdate jumlah item
function updateQuantity(productId, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    // Hapus item jika jumlahnya 0 atau kurang
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    saveCart(cart);
    displayCartItems();
    updateCartCount();
    
    // Tampilkan notifikasi
    const message = change > 0 ? 'Jumlah produk berhasil ditambah' : 'Jumlah produk berhasil dikurangi';
    showNotification(message);
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(productId) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    const removedItem = cart[itemIndex];
    cart.splice(itemIndex, 1);
    
    saveCart(cart);
    displayCartItems();
    updateCartCount();
    
    showNotification(`${removedItem.name} telah dihapus dari keranjang`);
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
    try {
        if (!window.products) {
            console.error('Products data not found');
            showNotification('Terjadi kesalahan saat menambahkan produk', 'error');
            return;
        }

        const product = window.products.find(p => p.id === productId);
        
        if (!product) {
            showNotification('Produk tidak ditemukan', 'error');
            return;
        }

        const cart = getCart();
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
            showNotification(`Jumlah ${product.name} ditambahkan menjadi ${existingItem.quantity}`);
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            showNotification(`${product.name} telah ditambahkan ke keranjang`);
        }

        saveCart(cart);
        updateCartCount();
        
        // Jika berada di halaman cart, update tampilan
        if (window.location.pathname.includes('cart.html')) {
            displayCartItems();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Terjadi kesalahan saat menambahkan ke keranjang', 'error');
    }
}

// Fungsi untuk memperbarui jumlah item di keranjang
function updateCartCount() {
    try {
        const cart = getCart();
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'block' : 'none';
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    container.appendChild(notification);

    // Tambahkan kelas fade-out setelah 2 detik
    setTimeout(() => {
        notification.classList.add('fade-out');
    }, 2000);

    // Hapus notifikasi setelah animasi selesai
    setTimeout(() => {
        if (container.contains(notification)) {
            container.removeChild(notification);
        }
    }, 2300);
}

// Expose addToCart function globally
window.addToCart = addToCart;

// Event listener untuk memperbarui tampilan keranjang saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Update cart display if we're on the cart page
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
    updateCartCount();
}); 