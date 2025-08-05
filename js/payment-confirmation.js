// Payment confirmation functionality
document.addEventListener('DOMContentLoaded', function() {
    const orderData = JSON.parse(localStorage.getItem('orderData') || '{}');
    
    if (!orderData.orderId) {
        alert('Data pesanan tidak ditemukan');
        window.location.href = 'index.html';
        return;
    }
    
    displayOrderInfo(orderData);
    setupPaymentProofUpload();
});

function displayOrderInfo(orderData) {
    document.getElementById('orderId').textContent = '#' + orderData.orderId;
    document.getElementById('totalAmount').textContent = formatPrice(orderData.total);
    
    const instructions = document.getElementById('paymentInstructions');
    let instructionText = '';
    
    if (orderData.paymentMethod === 'bank_transfer') {
        instructionText = `
            <h6><i class="bi bi-bank2"></i> Instruksi Transfer Bank:</h6>
            <ol>
                <li>Transfer sejumlah <strong>${formatPrice(orderData.total)}</strong> ke salah satu rekening:</li>
                <ul>
                    <li><strong>BCA:</strong> 1234567890 a.n. Batik Indonesia</li>
                    <li><strong>Mandiri:</strong> 0987654321 a.n. Batik Indonesia</li>
                    <li><strong>BNI:</strong> 1122334455 a.n. Batik Indonesia</li>
                </ul>
                <li>Simpan bukti transfer</li>
                <li>Upload bukti transfer di form di bawah</li>
                <li>Pesanan akan diproses setelah pembayaran dikonfirmasi</li>
            </ol>
        `;
    } else if (orderData.paymentMethod === 'ewallet') {
        instructionText = `
            <h6><i class="bi bi-wallet2"></i> Instruksi E-Wallet:</h6>
            <ol>
                <li>Transfer sejumlah <strong>${formatPrice(orderData.total)}</strong> ke:</li>
                <ul>
                    <li><strong>GoPay:</strong> 081234567890</li>
                    <li><strong>OVO:</strong> 081234567890</li>
                    <li><strong>DANA:</strong> 081234567890</li>
                </ul>
                <li>Screenshot bukti pembayaran</li>
                <li>Upload screenshot di form di bawah</li>
                <li>Pesanan akan diproses setelah pembayaran dikonfirmasi</li>
            </ol>
        `;
    }
    
    instructions.innerHTML = instructionText;
}

function setupPaymentProofUpload() {
    document.getElementById('paymentProofForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('paymentProof');
        const note = document.getElementById('paymentNote').value;
        const orderData = JSON.parse(localStorage.getItem('orderData') || '{}');
        
        if (!fileInput.files[0]) {
            alert('Pilih file bukti pembayaran');
            return;
        }
        
        // Simulate file upload (in real app, upload to server)
        const formData = new FormData();
        formData.append('payment_proof', fileInput.files[0]);
        formData.append('order_id', orderData.orderId);
        formData.append('note', note);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update order payment status
            await BatikAPI.updateOrderStatus(orderData.orderId, 'processing');
            
            alert('Bukti pembayaran berhasil diupload! Pesanan Anda sedang diproses.');
            
            // Clear order data
            localStorage.removeItem('orderData');
            
            // Redirect to orders page
            window.location.href = 'my-orders.html';
            
        } catch (error) {
            alert('Error uploading payment proof: ' + error.message);
        }
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}