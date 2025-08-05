// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin
    const user = BatikAPI.getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert('Access denied. Admin only.');
        window.location.href = 'login.html';
        return;
    }
    
    // Load initial data
    loadProducts();
    loadOrders();
});

let currentEditId = null;

// Section Management
function showSection(section) {
    document.querySelectorAll('[id$="-section"]').forEach(el => el.style.display = 'none');
    document.getElementById(section + '-section').style.display = 'block';
    
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    document.querySelector(`[href="#${section}"]`).classList.add('active');
}

// Products Management
async function loadProducts() {
    try {
        const response = await BatikAPI.getProducts({ limit: 100 });
        const products = response.products || response;
        
        const tbody = document.getElementById('productsTable');
        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${formatPrice(product.price)}</td>
                <td>${product.stock}</td>
                <td>${product.region}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editProduct(${product.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function showAddProductModal() {
    currentEditId = null;
    document.getElementById('productModalTitle').textContent = 'Tambah Produk';
    document.getElementById('productForm').reset();
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

async function editProduct(id) {
    try {
        const product = await BatikAPI.getProduct(id);
        currentEditId = id;
        
        document.getElementById('productModalTitle').textContent = 'Edit Produk';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productRegion').value = product.region;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productMaterial').value = product.material || '';
        document.getElementById('productTechnique').value = product.technique || '';
        document.getElementById('productSize').value = product.size || '';
        document.getElementById('productImage').value = product.image || '';
        document.getElementById('productCare').value = product.care_instructions || '';
        
        new bootstrap.Modal(document.getElementById('productModal')).show();
    } catch (error) {
        alert('Error loading product: ' + error.message);
    }
}

async function saveProduct() {
    try {
        const productData = {
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            stock: parseInt(document.getElementById('productStock').value),
            region: document.getElementById('productRegion').value,
            material: document.getElementById('productMaterial').value,
            technique: document.getElementById('productTechnique').value,
            size: document.getElementById('productSize').value,
            image: document.getElementById('productImage').value,
            care_instructions: document.getElementById('productCare').value,
            category_id: 1 // Default category
        };
        
        if (currentEditId) {
            await BatikAPI.updateProduct(currentEditId, productData);
            alert('Produk berhasil diupdate!');
        } else {
            await BatikAPI.addProduct(productData);
            alert('Produk berhasil ditambahkan!');
        }
        
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
        loadProducts();
    } catch (error) {
        alert('Error saving product: ' + error.message);
    }
}

async function deleteProduct(id) {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    
    try {
        await BatikAPI.deleteProduct(id);
        alert('Produk berhasil dihapus!');
        loadProducts();
    } catch (error) {
        alert('Error deleting product: ' + error.message);
    }
}

// Orders Management
async function loadOrders() {
    try {
        const orders = await BatikAPI.getOrders();
        
        const tbody = document.getElementById('ordersTable');
        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.user_name}<br><small>${order.user_email}</small></td>
                <td>${order.items}</td>
                <td>${formatPrice(order.total_amount)}</td>
                <td>
                    <select class="form-select form-select-sm" onchange="updateOrderStatus(${order.id}, this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>${new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewOrderDetails(${order.id})">
                        <i class="bi bi-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

async function updateOrderStatus(orderId, status) {
    try {
        await BatikAPI.updateOrderStatus(orderId, status);
        alert('Status pesanan berhasil diupdate!');
    } catch (error) {
        alert('Error updating order status: ' + error.message);
    }
}

function viewOrderDetails(orderId) {
    // Implement order details view if needed
    alert('Order details for ID: ' + orderId);
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function logout() {
    BatikAPI.logout();
    window.location.href = 'login.html';
}