// Checkout functionality
let cartItems = [];
let selectedPayment = '';
const shippingCost = 25000;

document.addEventListener('DOMContentLoaded', async function() {
    const user = BatikAPI.getCurrentUser();
    if (!user) {
        alert('Silakan login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    }
    
    await loadCartItems();
    loadUserInfo();
});

async function loadCartItems() {
    try {
        const user = BatikAPI.getCurrentUser();
        cartItems = await BatikAPI.getCart(user.id);
        
        if (cartItems.length === 0) {
            alert('Keranjang kosong');
            window.location.href = 'cart.html';
            return;
        }
        
        displayOrderSummary();
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.name) document.getElementById('fullName').value = user.name;
    if (user.phone) document.getElementById('phone').value = user.phone;
    if (user.address) document.getElementById('address').value = user.address;
}

function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;
    
    orderSummary.innerHTML = cartItems.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">Qty: ${item.quantity}</small>
            </div>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('total').textContent = formatPrice(total);
}

function selectPayment(method) {
    selectedPayment = method;
    document.getElementById('paymentMethod').value = method;
    
    // Remove active class from all payment methods
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('border-primary', 'bg-light');
    });
    
    // Add active class to selected method
    event.currentTarget.classList.add('border-primary', 'bg-light');
    
    // Show payment instructions
    showPaymentInstructions(method);
}

function showPaymentInstructions(method) {
    const paymentDetails = document.getElementById('paymentDetails');
    const instructions = document.getElementById('paymentInstructions');
    
    let instructionText = '';
    
    if (method === 'bank_transfer') {
        instructionText = `
            <strong>Transfer ke salah satu rekening:</strong><br>
            <strong>BCA:</strong> 1234567890 a.n. Batik Indonesia<br>
            <strong>Mandiri:</strong> 0987654321 a.n. Batik Indonesia<br>
            <strong>BNI:</strong> 1122334455 a.n. Batik Indonesia<br>
            <small class="text-muted">Upload bukti transfer setelah pembayaran</small>
        `;
    } else if (method === 'ewallet') {
        instructionText = `
            <strong>Pembayaran E-Wallet:</strong><br>
            <strong>GoPay:</strong> 081234567890<br>
            <strong>OVO:</strong> 081234567890<br>
            <strong>DANA:</strong> 081234567890<br>
            <small class="text-muted">Screenshot bukti pembayaran diperlukan</small>
        `;
    }
    
    instructions.innerHTML = instructionText;
    paymentDetails.style.display = 'block';
}

async function processOrder() {
    try {
        // Validate form
        const form = document.getElementById('checkoutForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        if (!selectedPayment) {
            alert('Pilih metode pembayaran');
            return;
        }
        
        const user = BatikAPI.getCurrentUser();
        const shippingAddress = `
            ${document.getElementById('fullName').value}
            ${document.getElementById('phone').value}
            ${document.getElementById('address').value}
            ${document.getElementById('city').value}, ${document.getElementById('province').value} ${document.getElementById('postalCode').value}
        `.trim();
        
        const orderData = {
            user_id: user.id,
            items: cartItems.map(item => ({
                product_id: item.product_id || item.id,
                quantity: item.quantity
            })),
            shipping_address: shippingAddress,
            payment_method: selectedPayment,
            shipping_cost: shippingCost
        };
        
        const response = await BatikAPI.createOrder(orderData);
        
        // Redirect to payment confirmation
        localStorage.setItem('orderData', JSON.stringify({
            orderId: response.order_id,
            total: response.total_amount,
            paymentMethod: selectedPayment
        }));
        
        window.location.href = 'payment-confirmation.html';
        
    } catch (error) {
        alert('Error creating order: ' + error.message);
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