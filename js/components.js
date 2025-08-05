// Komponen navbar, header, dan footer yang konsisten untuk semua halaman

// Navbar HTML yang sama untuk semua halaman
function createNavbar(activePage = '') {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <i class="bi bi-flower1 me-2"></i>Batik Indonesia
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link ${activePage === 'home' ? 'active' : ''}" href="index.html">
                            <i class="bi bi-house-door me-1"></i>Beranda
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${activePage === 'products' ? 'active' : ''}" href="products.html">
                            <i class="bi bi-grid me-1"></i>Produk
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${activePage === 'about' ? 'active' : ''}" href="about.html">
                            <i class="bi bi-info-circle me-1"></i>Tentang
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${activePage === 'contact' ? 'active' : ''}" href="contact.html">
                            <i class="bi bi-envelope me-1"></i>Kontak
                        </a>
                    </li>
                </ul>
                
                <div class="d-flex align-items-center ms-3">
                    <a href="cart.html" class="btn btn-outline-light position-relative me-2">
                        <i class="bi bi-cart3"></i>
                        <span class="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="display: none;">0</span>
                    </a>
                    <div class="dropdown">
                        <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profil</a></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-heart me-2"></i>Wishlist</a></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-bag me-2"></i>Pesanan</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>`;
}

// Header section yang konsisten (kecuali untuk home page)
function createPageHeader(title, subtitle) {
    return `
    <section class="page-header py-5 mt-5 bg-light">
        <div class="container">
            <div class="text-center">
                <h1 class="display-4 fw-bold mb-3">${title}</h1>
                <p class="lead">${subtitle}</p>
            </div>
        </div>
    </section>`;
}

// Footer HTML yang sama untuk semua halaman
function createFooter() {
    return `
    <footer class="bg-dark text-light py-5 mt-auto">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="fw-bold mb-3">
                        <i class="bi bi-flower1 me-2"></i>Batik Indonesia
                    </h5>
                    <p class="mb-3">
                        Melestarikan warisan batik Indonesia melalui produk berkualitas tinggi 
                        dan pendidikan budaya untuk generasi mendatang.
                    </p>
                    <div class="social-links">
                        <a href="#" class="text-light me-3"><i class="bi bi-facebook fs-5"></i></a>
                        <a href="#" class="text-light me-3"><i class="bi bi-instagram fs-5"></i></a>
                        <a href="#" class="text-light me-3"><i class="bi bi-twitter fs-5"></i></a>
                        <a href="#" class="text-light"><i class="bi bi-youtube fs-5"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h6 class="fw-bold mb-3">Navigasi</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="index.html" class="text-light">Beranda</a></li>
                        <li class="mb-2"><a href="products.html" class="text-light">Produk</a></li>
                        <li class="mb-2"><a href="about.html" class="text-light">Tentang</a></li>
                        <li class="mb-2"><a href="contact.html" class="text-light">Kontak</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <h6 class="fw-bold mb-3">Kategori Produk</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="#" class="text-light">Batik Solo</a></li>
                        <li class="mb-2"><a href="#" class="text-light">Batik Yogyakarta</a></li>
                        <li class="mb-2"><a href="#" class="text-light">Batik Pekalongan</a></li>
                        <li class="mb-2"><a href="#" class="text-light">Batik Cirebon</a></li>
                        <li class="mb-2"><a href="#" class="text-light">Batik Madura</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 mb-4">
                    <h6 class="fw-bold mb-3">Hubungi Kami</h6>
                    <div class="mb-2">
                        <i class="bi bi-geo-alt me-2"></i>
                        <span>Jl. Batik Indonesia No. 123, Jakarta</span>
                    </div>
                    <div class="mb-2">
                        <i class="bi bi-telephone me-2"></i>
                        <span>+62 21 1234 5678</span>
                    </div>
                    <div class="mb-2">
                        <i class="bi bi-envelope me-2"></i>
                        <span>info@batikindonesia.com</span>
                    </div>
                    <div>
                        <i class="bi bi-clock me-2"></i>
                        <span>Senin - Sabtu: 09:00 - 18:00</span>
                    </div>
                </div>
            </div>
            <hr class="my-4">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2024 Batik Indonesia. Semua hak dilindungi.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="text-light me-3">Kebijakan Privasi</a>
                    <a href="#" class="text-light">Syarat & Ketentuan</a>
                </div>
            </div>
        </div>
    </footer>`;
}

// Load komponen ke halaman
function loadComponents(activePage, headerTitle = '', headerSubtitle = '') {
    // Load navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = createNavbar(activePage);
    }
    
    // Load page header (kecuali untuk home page)
    if (headerTitle && headerSubtitle) {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = createPageHeader(headerTitle, headerSubtitle);
        }
    }
    
    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
}

// Export functions
window.loadComponents = loadComponents;