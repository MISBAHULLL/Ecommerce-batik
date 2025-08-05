// Sample product data - in a real application, this would come from a database
const products = [
    {
        id: 1,
        name: "Batik Solo Klasik",
        region: "Solo",
        price: 450000,
        image: "images/batik-1.jpg",
        description: "Batik tradisional dari Solo dengan pola klasik"
    },
    {
        id: 2,
        name: "Batik Yogyakarta Kerajaan",
        region: "Yogyakarta",
        price: 750000,
        image: "images/batik-2.jpg",
        description: "Batik elegan dari Yogyakarta dengan motif kerajaan"
    },
    {
        id: 3,
        name: "Batik Pekalongan Bunga",
        region: "Pekalongan",
        price: 550000,
        image: "images/batik-3.jpg",
        description: "Batik Pekalongan berwarna-warni dengan pola bunga"
    },
    {
        id: 4,
        name: "Batik Cirebon Mega Mendung",
        region: "Cirebon",
        price: 850000,
        image: "images/batik-4.jpg",
        description: "Batik Cirebon dengan pola awan yang unik"
    },
    {
        id: 5,
        name: "Batik Madura Berani",
        region: "Madura",
        price: 650000,
        image: "images/batik-5.jpg",
        description: "Batik Madura dengan warna-warna berani"
    }
];

// Function to format price in Indonesian Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Function to create product card HTML
function createProductCard(product) {
    return `
        <div class="col-md-4 mb-4 product-card" data-region="${product.region.toLowerCase()}" data-price="${product.price}">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="price">${formatPrice(product.price)}</p>
                    <button class="btn btn-primary">Tambah ke Keranjang</button>
                </div>
            </div>
        </div>
    `;
}

// Function to render products
function renderProducts(productsToShow = products) {
    const productsContainer = document.querySelector('.row:not(.mb-4)');
    productsContainer.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsContainer.innerHTML = '<div class="col-12 text-center"><p>Tidak ada produk yang ditemukan</p></div>';
        return;
    }
    
    productsToShow.forEach(product => {
        productsContainer.innerHTML += createProductCard(product);
    });
}

// Function to filter products
function filterProducts() {
    const regionFilter = document.getElementById('regionFilter').value.toLowerCase();
    const priceFilter = document.getElementById('priceFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredProducts = products;
    
    // Filter by region
    if (regionFilter) {
        filteredProducts = filteredProducts.filter(product => 
            product.region.toLowerCase() === regionFilter
        );
    }
    
    // Filter by price range
    if (priceFilter) {
        filteredProducts = filteredProducts.filter(product => {
            switch(priceFilter) {
                case 'low':
                    return product.price < 500000;
                case 'medium':
                    return product.price >= 500000 && product.price <= 1000000;
                case 'high':
                    return product.price > 1000000;
                default:
                    return true;
            }
        });
    }
    
    // Filter by search input
    if (searchInput) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput)
        );
    }
    
    renderProducts(filteredProducts);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initial render of all products
    renderProducts();
    
    // Add event listeners for filters
    document.getElementById('regionFilter').addEventListener('change', filterProducts);
    document.getElementById('priceFilter').addEventListener('change', filterProducts);
    document.getElementById('searchInput').addEventListener('input', filterProducts);
}); 