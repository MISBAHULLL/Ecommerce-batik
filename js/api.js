// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// API Helper Functions
class BatikAPI {
    static getAuthToken() {
        return localStorage.getItem('authToken');
    }
    
    static setAuthToken(token) {
        localStorage.setItem('authToken', token);
    }
    
    static removeAuthToken() {
        localStorage.removeItem('authToken');
    }
    
    static async request(endpoint, options = {}) {
        try {
            const token = this.getAuthToken();
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers
            };
            
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers,
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Products
    static async getProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/products?${queryString}`);
    }

    static async getProduct(id) {
        return this.request(`/products/${id}`);
    }

    // Cart
    static async getCart(userId) {
        return this.request(`/cart/${userId}`);
    }

    static async addToCart(userId, productId, quantity = 1) {
        return this.request('/cart', {
            method: 'POST',
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
                quantity
            })
        });
    }

    static async updateCartItem(userId, productId, quantity) {
        return this.request(`/cart/${userId}/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        });
    }

    static async removeFromCart(userId, productId) {
        return this.request(`/cart/${userId}/${productId}`, {
            method: 'DELETE'
        });
    }

    // Orders
    static async createOrder(orderData) {
        return this.request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    static async getUserOrders(userId) {
        return this.request(`/orders/user/${userId}`);
    }
    
    // Auth
    static async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }
    
    static async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
    
    // Categories
    static async getCategories() {
        return this.request('/categories');
    }
    
    static async getCategory(id) {
        return this.request(`/categories/${id}`);
    }
    
    // User Management
    static getCurrentUser() {
        const token = this.getAuthToken();
        if (!token) return null;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                id: payload.userId,
                email: payload.email,
                role: payload.role
            };
        } catch (error) {
            return null;
        }
    }
    
    static isLoggedIn() {
        return !!this.getAuthToken();
    }
    
    static isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
    
    static logout() {
        this.removeAuthToken();
        localStorage.removeItem('currentUser');
    }
    
    // Admin APIs
    static async addProduct(productData) {
        return this.request('/admin/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }
    
    static async updateProduct(id, productData) {
        return this.request(`/admin/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }
    
    static async deleteProduct(id) {
        return this.request(`/admin/products/${id}`, {
            method: 'DELETE'
        });
    }
    
    static async getOrders() {
        return this.request('/admin/orders');
    }
    
    static async updateOrderStatus(id, status) {
        return this.request(`/admin/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    }
}

// Export for use in other files
window.BatikAPI = BatikAPI;