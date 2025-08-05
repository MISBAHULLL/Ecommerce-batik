// My Orders functionality
document.addEventListener('DOMContentLoaded', async function() {
    const user = BatikAPI.getCurrentUser();
    if (!user) {
        alert('Silakan login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    }
    
    await loadUserOrders();
});

async function loadUserOrders() {
    try {
        const user = BatikAPI.getCurrentUser();
        const orders = await BatikAPI.getUserOrders(user.id);
        
        if (orders.length === 0) {
            document.getElementById('noOrders').style.display = 'block';
            return;
        }
        
        displayOrders(orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        document.getElementById('noOrders').style.display = 'block';
    }
}

function displayOrders(orders) {
    const container = document.getElementById('ordersContainer');
    
    container.innerHTML = orders.map(order => `
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-0">Order #${order.id}</h6>
                    <small class="text-muted">${new Date(order.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</small>
                </div>
                <span class="badge ${getStatusBadgeClass(order.status)}">${getStatusText(order.status)}</span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <h6>Items:</h6>
                        <p class="mb-2">${order.items}</p>
                        <small class="text-muted">
                            <i class="bi bi-credit-card"></i> ${getPaymentMethodText(order.payment_method)}
                        </small>
                    </div>
                    <div class="col-md-4 text-end">
                        <h5 class="text-primary">${formatPrice(order.total_amount)}</h5>
                        ${getOrderActions(order)}
                    </div>
                </div>
                
                ${order.shipping_address ? `
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                            <h6><i class="bi bi-geo-alt"></i> Alamat Pengiriman:</h6>
                            <p class="mb-0 small">${order.shipping_address}</p>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function getStatusBadgeClass(status) {
    const classes = {
        'pending': 'bg-warning',
        'processing': 'bg-info',
        'shipped': 'bg-primary',
        'delivered': 'bg-success',
        'cancelled': 'bg-danger'
    };
    return classes[status] || 'bg-secondary';
}

function getStatusText(status) {
    const texts = {
        'pending': 'Menunggu Pembayaran',
        'processing': 'Diproses',
        'shipped': 'Dikirim',
        'delivered': 'Selesai',
        'cancelled': 'Dibatalkan'
    };
    return texts[status] || status;
}

function getPaymentMethodText(method) {
    const texts = {
        'bank_transfer': 'Transfer Bank',
        'ewallet': 'E-Wallet',
        'cod': 'Bayar di Tempat'
    };
    return texts[method] || method;
}

function getOrderActions(order) {
    let actions = '';
    
    if (order.status === 'pending') {
        actions += `<button class="btn btn-sm btn-outline-primary me-2" onclick="payOrder(${order.id})">Bayar</button>`;
        actions += `<button class="btn btn-sm btn-outline-danger" onclick="cancelOrder(${order.id})">Batal</button>`;
    } else if (order.status === 'delivered') {
        actions += `<button class="btn btn-sm btn-outline-success" onclick="reviewOrder(${order.id})">Beri Ulasan</button>`;
    } else if (order.status === 'shipped') {
        actions += `<button class="btn btn-sm btn-outline-info" onclick="trackOrder(${order.id})">Lacak Paket</button>`;
    }
    
    return actions;
}

async function payOrder(orderId) {
    // Redirect to payment page
    localStorage.setItem('orderData', JSON.stringify({
        orderId: orderId,
        total: 0, // Will be loaded from order details
        paymentMethod: 'bank_transfer'
    }));
    window.location.href = 'payment-confirmation.html';
}

async function cancelOrder(orderId) {
    if (!confirm('Yakin ingin membatalkan pesanan ini?')) return;
    
    try {
        await BatikAPI.updateOrderStatus(orderId, 'cancelled');
        alert('Pesanan berhasil dibatalkan');
        loadUserOrders();
    } catch (error) {
        alert('Error cancelling order: ' + error.message);
    }
}

function reviewOrder(orderId) {
    alert('Fitur ulasan akan segera hadir!');
}

function trackOrder(orderId) {
    alert(`Lacak pesanan #${orderId}:\nPaket sedang dalam perjalanan ke alamat Anda.\nEstimasi tiba: 2-3 hari kerja.`);
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}