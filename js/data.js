// Data produk batik - simulasi database sederhana
const products = [
    {
        id: 1,
        name: "Batik Solo Klasik",
        price: 450000,
        image: "Foto/batik_beranda.jpg",
        category: "Solo",
        description: "Batik Solo dengan motif tradisional yang elegan"
    },
    {
        id: 2,
        name: "Dress Batik Yogyakarta",
        price: 550000,
        image: "Foto/dress yogyakarta.jpg",
        category: "Yogyakarta", 
        description: "Dress batik Yogyakarta dengan motif keraton"
    },
    {
        id: 3,
        name: "Batik Pekalongan Modern",
        price: 400000,
        image: "Foto/batik pekalongan.jpg",
        category: "Pekalongan",
        description: "Batik Pekalongan dengan warna cerah dan modern"
    },
    {
        id: 4,
        name: "Batik Mega Mendung Cirebon",
        price: 850000,
        image: "Foto/batik mega mendung.jpg",
        category: "Cirebon",
        description: "Batik Cirebon dengan motif mega mendung ikonik"
    },
    {
        id: 5,
        name: "Batik Madura Premium",
        price: 650000,
        image: "Foto/batik madura.jpg",
        category: "Madura",
        description: "Batik Madura dengan warna berani dan eksotis"
    }
];

// Fungsi untuk format harga
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Export data untuk digunakan di file lain
window.productsData = products;
window.formatPrice = formatPrice;