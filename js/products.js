// Array produk dengan data lengkap
// Note: Gambar produk perlu ditambahkan ke folder Foto/
// Product data - will be loaded from API
let products = [];
let filteredProducts = [];

// Fallback static products
const staticProducts = [
    // Halaman 1
    {
        id: 1,
        name: "Batik Solo Klasik",
        description: "Batik tradisional dari Solo dengan pola klasik",
        price: 450000,
        image: "Foto/kebaya modern solo.jpg",
        category: "Solo"
    },
    {
        id: 2,
        name: "Batik Yogyakarta Kerajaan",
        description: "Batik elegan dari Yogyakarta dengan motif kerajaan",
        price: 750000,
        image: "Foto/dress batik yogyakarta.jpg",
        category: "Yogyakarta"
    },
    {
        id: 3,
        name: "Batik Pekalongan Bunga",
        description: "Batik Pekalongan berwarna-warni dengan pola bunga",
        price: 550000,
        image: "Foto/batik pekalongan.jpg",
        category: "Pekalongan"
    },
    {
        id: 4,
        name: "Batik Cirebon Mega Mendung",
        description: "Batik Cirebon dengan pola awan yang unik",
        price: 850000,
        image: "Foto/batik mega mendung.jpg",
        category: "Cirebon"
    },
    // Halaman 2
    {
        id: 5,
        name: "Batik Lasem Tiga Negeri",
        description: "Batik Lasem dengan perpaduan tiga warna klasik",
        price: 950000,
        image: "Foto/lasem.jpg",
        category: "Lasem"
    },
    {
        id: 6,
        name: "Batik Banyuwangi Gajah Oling",
        description: "Batik khas Banyuwangi dengan motif Gajah Oling",
        price: 550000,
        image: "Foto/gajah oling.jpg",
        category: "Banyuwangi"
    },
    {
        id: 7,
        name: "Batik Surabaya Modern",
        description: "Batik kontemporer dengan sentuhan modern",
        price: 480000,
        image: "Foto/surabaya.jpg",
        category: "Surabaya"
    },
    {
        id: 8,
        name: "Batik Madura",
        description: "Batik Madura dengan warna-warna berani",
        price: 650000,
        image: "Foto/batik madura.jpg",
        category: "Madura"
    },
    // Halaman 3
    {
        id: 9,
        name: "Batik Kediri Brantas",
        description: "Batik dengan motif terinspirasi Sungai Brantas",
        price: 600000,
        image: "Foto/kediri.jpg",
        category: "Kediri"
    },
    {
        id: 10,
        name: "Batik Malang Teratai",
        description: "Batik Malang dengan motif bunga teratai",
        price: 520000,
        image: "Foto/teratai.jpg",
        category: "Malang"
    },
    {
        id: 11,
        name: "Batik Sidoarjo",
        description: "Batik tradisional dari kampung Jetis",
        price: 450000,
        image: "Foto/sidoarjo.jpg",
        category: "Sidoarjo"
    },
    {
        id: 12,
        name: "Batik Tulungagung",
        description: "Batik dengan motif peninggalan Majapahit",
        price: 700000,
        image: "Foto/tulungagung.jpg",
        category: "Tulungagung"
    }
];

// Pagination variables
let currentPage = 1;
const productsPerPage = 4;
let totalPages = 1;

// Load products from API
async function loadProducts(filters = {}) {
    try {
        const params = {
            page: currentPage,
            limit: productsPerPage,
            ...filters
        };
        
        const response = await BatikAPI.getProducts(params);
        products = response.products;
        totalPages = response.pagination.totalPages;
        
        displayProducts(currentPage);
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to static data
        products = staticProducts;
        totalPages = Math.ceil(products.length / productsPerPage);
        displayProducts(currentPage);
    }
}

// Shopping Cart Functions
function getCart() {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error getting cart:', error);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    const notificationContainer = document.getElementById('notificationContainer');
    if (!notificationContainer) return;

    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show';
    notification.innerHTML = `
        <strong>${message}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Fungsi untuk menambahkan ke keranjang
async function addToCart(productId) {
    try {
        const user = BatikAPI.getCurrentUser();
        if (!user) {
            alert('Silakan login terlebih dahulu');
            window.location.href = 'login.html';
            return;
        }
        
        // Simpan ke database via API
        try {
            await BatikAPI.addToCart(user.id, productId, 1);
            const product = products.find(p => p.id === productId);
            showNotification(`${product?.name || 'Produk'} telah ditambahkan ke keranjang`);
        } catch (apiError) {
            console.log('API not available, using localStorage');
            // Fallback ke localStorage jika API gagal
            const cart = getCart();
            const product = products.find(p => p.id === productId);
            
            if (!product) {
                showNotification('Maaf, produk tidak ditemukan');
                return;
            }
            
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
        }
        
        updateCartCount();
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Maaf, terjadi kesalahan saat menambahkan ke keranjang');
    }
}

async function updateCartCount() {
    try {
        const user = BatikAPI.getCurrentUser();
        if (!user) return;
        
        let totalItems = 0;
        
        // Coba ambil dari database
        try {
            const cartItems = await BatikAPI.getCart(user.id);
            totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        } catch (apiError) {
            // Fallback ke localStorage
            const cart = getCart();
            totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
        
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Fungsi untuk memformat harga dalam format Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Fungsi untuk membuat card produk
function createProductCard(product) {
    return `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 350px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title mb-3">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="mt-auto d-flex flex-column align-items-center gap-2">
                        <span class="price-tag mb-2">${formatPrice(product.price)}</span>
                        <button class="btn btn-primary add-to-cart-btn w-100" data-product-id="${product.id}">
                            Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fungsi untuk menampilkan produk berdasarkan halaman
function displayProducts(page) {
    const productContainer = document.querySelector('.products-grid .row');
    if (!productContainer) return;

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    productContainer.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    updatePaginationButtons(page);
    setupCartButtons();
}

// Fungsi untuk memperbarui tombol paginasi
function updatePaginationButtons(currentPage) {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageItems = document.querySelectorAll('.pagination .page-item');
    
    // Update active state
    pageItems.forEach(item => {
        const pageButton = item.querySelector('.page-link');
        if (pageButton && pageButton.dataset.page) {
            const pageNum = parseInt(pageButton.dataset.page);
            item.classList.toggle('active', pageNum === currentPage);
        }
    });

    // Update prev/next buttons
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    if (prevButton) {
        prevButton.disabled = currentPage === 1;
        prevButton.parentElement.classList.toggle('disabled', currentPage === 1);
    }
    if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
        nextButton.parentElement.classList.toggle('disabled', currentPage === totalPages);
    }
}

// Fungsi untuk menangani penambahan ke keranjang
function setupCartButtons() {
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            addToCart(productId);
        });
    });
}

// Filter dan tampilkan produk
function filterProducts(category) {
    if (category === 'all') {
        // Tampilkan semua produk
        document.querySelectorAll('.card').forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    // Sembunyikan/tampilkan kartu berdasarkan kategori
    document.querySelectorAll('.card').forEach(card => {
        const productId = parseInt(card.querySelector('.add-to-cart-btn').getAttribute('data-product-id'));
        const product = products.find(p => p.id === productId);
        if (product && product.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search products
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    
    document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event listeners untuk paginasi
document.addEventListener('DOMContentLoaded', function() {
    // Load products from API
    loadProducts();

    // Setup event listeners untuk tombol paginasi
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.addEventListener('click', function(e) {
            const target = e.target.closest('.page-link');
            if (!target) return;

            if (target.id === 'prevPage') {
                if (currentPage > 1) {
                    currentPage--;
                    displayProducts(currentPage);
                }
            } else if (target.id === 'nextPage') {
                const totalPages = Math.ceil(products.length / productsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    displayProducts(currentPage);
                }
            } else if (target.dataset.page) {
                currentPage = parseInt(target.dataset.page);
                displayProducts(currentPage);
            }
        });
    }

    // Update cart count on page load
    updateCartCount();
    
    // Add event listeners for filters
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentPage = 1;
            const filters = { search: this.value };
            loadProducts(filters);
        });
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', function() {
            currentPage = 1;
            const filters = { region: this.value };
            loadProducts(filters);
        });
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            currentPage = 1;
            const value = this.value;
            const filters = {};
            
            switch(value) {
                case 'low':
                    filters.priceRange = '0-500000';
                    break;
                case 'medium':
                    filters.priceRange = '500000-700000';
                    break;
                case 'high':
                    filters.priceRange = '700000';
                    break;
            }
            
            loadProducts(filters);
        });
    }
});

// CSS untuk animasi notifikasi
const style = document.createElement('style');
style.textContent = `    .alert {
        margin-bottom: 1rem;
        animation: slideIn 0.3s ease-out;
    }
    
    .alert.fade {
        transition: opacity 0.3s ease-out;
    }
    
    .alert.fade.show {
        opacity: 1;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    #notificationContainer {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1050;
        max-width: 300px;
    }
`;
document.head.appendChild(style); 
