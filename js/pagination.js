// Data produk
const allProducts = [
    {
        page: 1,
        products: [
            {
                name: "Batik Solo Klasik",
                description: "Batik tradisional dari Solo dengan pola klasik",
                price: "Rp 450.000",
                image: "Foto/kebaya modern solo.jpg"
            },
            {
                name: "Batik Yogyakarta Kerajaan",
                description: "Batik elegan dari Yogyakarta dengan motif kerajaan",
                price: "Rp 750.000",
                image: "Foto/dress batik yogyakarta.jpg"
            },
            {
                name: "Batik Pekalongan Bunga",
                description: "Batik Pekalongan berwarna-warni dengan pola bunga",
                price: "Rp 550.000",
                image: "Foto/batik pekalongan.jpg"
            },
            {
                name: "Batik Cirebon Mega Mendung",
                description: "Batik Cirebon dengan pola awan yang unik",
                price: "Rp 850.000",
                image: "Foto/batik mega mendung.jpg"
            }
        ]
    },
    {
        page: 2,
        products: [
            {
                name: "Batik Lasem Tiga Negeri",
                description: "Batik Lasem dengan perpaduan tiga warna klasik",
                price: "Rp 950.000",
                image: "Foto/lasem.jpg"
            },
            {
                name: "Batik Banyuwangi Gajah Oling",
                description: "Batik khas Banyuwangi dengan motif Gajah Oling",
                price: "Rp 550.000",
                image: "Foto/gajah oling.jpg"
            },
            {
                name: "Batik Surabaya Modern",
                description: "Batik kontemporer dengan sentuhan modern",
                price: "Rp 480.000",
                image: "Foto/surabaya.jpg"
            },
            {
                name: "Batik Madura",
                description: "Batik Madura dengan warna-warna berani",
                price: "Rp 650.000",
                image: "Foto/batik madura.jpg"
            }
        ]
    },
    {
        page: 3,
        products: [
            {
                name: "Batik Kediri Brantas",
                description: "Batik dengan motif terinspirasi Sungai Brantas",
                price: "Rp 600.000",
                image: "Foto/kediri.jpg"
            },
            {
                name: "Batik Malang Teratai",
                description: "Batik Malang dengan motif bunga teratai",
                price: "Rp 520.000",
                image: "Foto/teratai.jpg"
            },
            {
                name: "Batik Sidoarjo",
                description: "Batik tradisional dari kampung Jetis",
                price: "Rp 450.000",
                image: "Foto/sidoarjo.jpg"
            },
            {
                name: "Batik Tulungagung",
                description: "Batik dengan motif peninggalan Majapahit",
                price: "Rp 700.000",
                image: "Foto/tulungagung.jpg"
            }
        ]
    }
];

let currentPage = 1;
const totalPages = allProducts.length;

// Fungsi untuk membuat card produk
function createProductCard(product) {
    return `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/280x280?text=Batik+Image'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price-tag">${product.price}</span>
                            <button class="btn btn-primary">Tambah ke Keranjang</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fungsi untuk menampilkan produk berdasarkan halaman
function displayProducts(page) {
    const productsContainer = document.querySelector('.row.g-4');
    const pageData = allProducts.find(p => p.page === page);
    if (pageData) {
        productsContainer.innerHTML = pageData.products.map(createProductCard).join('');
    }
    updatePagination();
}

// Fungsi untuk memperbarui status pagination
function updatePagination() {
    // Update active state
    document.querySelectorAll('.pagination .page-item').forEach(item => {
        const pageLink = item.querySelector('.page-link');
        if (pageLink && pageLink.dataset.page) {
            item.classList.toggle('active', parseInt(pageLink.dataset.page) === currentPage);
        }
    });

    // Update disabled state untuk tombol prev/next
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    if (prevButton) {
        prevButton.parentElement.classList.toggle('disabled', currentPage === 1);
    }
    if (nextButton) {
        nextButton.parentElement.classList.toggle('disabled', currentPage === totalPages);
    }
}

// Event listener saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners untuk tombol navigasi
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProducts(currentPage);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts(currentPage);
            }
        });
    }

    // Event listeners untuk nomor halaman
    document.querySelectorAll('.page-link[data-page]').forEach(button => {
        button.addEventListener('click', (e) => {
            const newPage = parseInt(e.target.dataset.page);
            if (newPage !== currentPage) {
                currentPage = newPage;
                displayProducts(currentPage);
            }
        });
    });

    // Tampilkan produk halaman pertama saat halaman dimuat
    displayProducts(1);
}); 