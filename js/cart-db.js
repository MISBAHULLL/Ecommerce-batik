// Enhanced cart functionality with database integration
class CartManager {
    constructor() {
        this.userId = this.getCurrentUserId();
    }

    getCurrentUserId() {
        // Untuk demo, gunakan user ID 1
        // Dalam aplikasi nyata, ambil dari session/login
        return 1;
    }

    async addToCart(productId, quantity = 1) {
        try {
            await BatikAPI.addToCart(this.userId, productId, quantity);
            return true;
        } catch (error) {
            console.error('Failed to add to cart via API:', error);
            // Fallback ke localStorage
            return this.addToCartLocal(productId, quantity);
        }
    }

    async getCartItems() {
        try {
            return await BatikAPI.getCart(this.userId);
        } catch (error) {
            console.error('Failed to get cart from API:', error);
            // Fallback ke localStorage
            return this.getCartLocal();
        }
    }

    async updateCartItem(productId, quantity) {
        try {
            await BatikAPI.updateCartItem(this.userId, productId, quantity);
            return true;
        } catch (error) {
            console.error('Failed to update cart via API:', error);
            // Fallback ke localStorage
            return this.updateCartLocal(productId, quantity);
        }
    }

    async removeFromCart(productId) {
        try {
            await BatikAPI.removeFromCart(this.userId, productId);
            return true;
        } catch (error) {
            console.error('Failed to remove from cart via API:', error);
            // Fallback ke localStorage
            return this.removeFromCartLocal(productId);
        }
    }

    // LocalStorage fallback methods
    addToCartLocal(productId, quantity) {
        const cart = this.getCartLocal();
        const existingItem = cart.find(item => item.product_id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ product_id: productId, quantity });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    }

    getCartLocal() {
        try {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            return [];
        }
    }

    updateCartLocal(productId, quantity) {
        const cart = this.getCartLocal();
        const itemIndex = cart.findIndex(item => item.product_id === productId);
        
        if (itemIndex !== -1) {
            if (quantity <= 0) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        return true;
    }

    removeFromCartLocal(productId) {
        const cart = this.getCartLocal();
        const filteredCart = cart.filter(item => item.product_id !== productId);
        localStorage.setItem('cart', JSON.stringify(filteredCart));
        return true;
    }
}

// Global cart manager instance
window.cartManager = new CartManager();