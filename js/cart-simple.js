// Sistem keranjang sederhana menggunakan localStorage
class SimpleCart {
    constructor() {
        this.cartKey = 'batik_cart'; // Key untuk localStorage
    }

    // Ambil data keranjang dari localStorage
    getCart() {
        try {
            const cart = localStorage.getItem(this.cartKey);
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error getting cart:', error);
            return [];
        }
    }

    // Simpan data keranjang ke localStorage
    saveCart(cart) {
        try {
            localStorage.setItem(this.cartKey, JSON.stringify(cart));
            // Update tampilan counter langsung
            this.updateCartCount();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Tambah produk ke keranjang
    addToCart(productId, quantity = 1) {
        const cart = this.getCart();
        const product = window.productsData.find(p => p.id === productId);
        
        if (!product) {
            alert('Produk tidak ditemukan!');
            return;
        }

        // Cek apakah produk sudah ada di keranjang
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity; // Tambah jumlah
        } else {
            // Tambah produk baru ke keranjang
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart(cart);
        this.showNotification(`${product.name} ditambahkan ke keranjang!`);
    }

    // Update jumlah produk di keranjang
    updateQuantity(productId, newQuantity) {
        const cart = this.getCart();
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            if (newQuantity <= 0) {
                cart.splice(itemIndex, 1); // Hapus jika jumlah 0
            } else {
                cart[itemIndex].quantity = newQuantity;
            }
            this.saveCart(cart);
        }
    }

    // Hapus produk dari keranjang
    removeFromCart(productId) {
        const cart = this.getCart();
        const filteredCart = cart.filter(item => item.id !== productId);
        this.saveCart(filteredCart);
        this.showNotification('Produk dihapus dari keranjang');
    }

    // Hitung total harga keranjang
    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Hitung total item di keranjang
    getTotalItems() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Update tampilan counter keranjang
    updateCartCount() {
        const totalItems = this.getTotalItems();
        const cartCountElements = document.querySelectorAll('.cart-count, #cartCount');
        
        cartCountElements.forEach(element => {
            if (totalItems > 0) {
                element.textContent = totalItems;
                element.style.display = 'inline-block';
                element.style.visibility = 'visible';
            } else {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
                element.textContent = '';
            }
        });
    }

    // Kosongkan keranjang
    clearCart() {
        localStorage.removeItem(this.cartKey);
        this.updateCartCount();
    }

    // Tampilkan notifikasi sederhana
    showNotification(message) {
        // Buat elemen notifikasi
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed';
        notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;';
        notification.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${message}`;

        document.body.appendChild(notification);

        // Hapus notifikasi setelah 3 detik
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Buat instance global
window.cart = new SimpleCart();

// Update cart count saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count langsung
    window.cart.updateCartCount();
});

// Update cart count saat halaman menjadi visible (untuk handle tab switching)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && window.cart) {
        window.cart.updateCartCount();
    }
});

// Update cart count saat window focus (untuk handle window switching)
window.addEventListener('focus', function() {
    if (window.cart) {
        window.cart.updateCartCount();
    }
});