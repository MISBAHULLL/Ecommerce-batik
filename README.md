# 🏮 Batik Indonesia E-commerce Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

Sebuah website e-commerce modern dan responsif yang menjual berbagai jenis batik tradisional Indonesia. Website ini menampilkan keindahan batik Indonesia dengan desain yang elegan dan user experience yang optimal.

## 🌟 Demo

[Live Demo](https://your-username.github.io/batik-ecommerce) | [Screenshots](#screenshots)

## ✨ Fitur Utama

### 🛍️ E-commerce Core
- **Katalog Produk**: Tampilan grid responsif dengan pagination
- **Keranjang Belanja**: Sistem keranjang dengan localStorage
- **Filter & Pencarian**: Filter berdasarkan daerah dan harga
- **Detail Produk**: Modal dengan informasi lengkap produk

### 🎨 User Interface
- **Desain Responsif**: Optimal di semua perangkat (mobile, tablet, desktop)
- **Modern UI/UX**: Menggunakan Bootstrap 5.3.0 dengan custom styling
- **Animasi Smooth**: Hover effects dan transisi yang halus
- **Dark Theme Navigation**: Navbar dengan gradient background

### 🏛️ Konten Budaya
- **Informasi Daerah**: Halaman khusus tentang batik dari berbagai daerah
- **Sejarah Batik**: Konten edukatif tentang warisan budaya Indonesia
- **Galeri Foto**: Carousel dan galeri produk yang menarik

### 🔧 Fitur Teknis
- **SEO Optimized**: Meta tags dan Open Graph untuk social sharing
- **Accessibility**: ARIA labels dan alt text untuk screen readers
- **Performance**: Optimized images dan lazy loading
- **Cross-browser**: Compatible dengan semua browser modern

## 🚀 Quick Start

### Prerequisites
- Web browser modern (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, dll.)
- Live server extension (opsional, untuk development)

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/batik-ecommerce.git
   cd batik-ecommerce
   ```

2. **Buka di browser**
   ```bash
   # Langsung buka file
   open index.html
   
   # Atau gunakan live server
   # Jika menggunakan VS Code dengan Live Server extension
   # Klik kanan pada index.html > Open with Live Server
   ```

3. **Mulai eksplorasi!**
   - Navigasi ke halaman Produk untuk melihat katalog
   - Coba fitur filter dan pencarian
   - Tambahkan produk ke keranjang
   - Jelajahi halaman Daerah untuk informasi budaya

## 📁 Struktur Proyek

```
batik-ecommerce/
├── 📄 index.html              # Halaman utama
├── 📄 about.html              # Tentang batik Indonesia
├── 📄 products.html           # Katalog produk
├── 📄 regions.html            # Informasi daerah
├── 📄 contact.html            # Halaman kontak
├── 📄 cart.html               # Keranjang belanja
├── 📄 login.html              # Halaman login
├── 📁 css/
│   └── 🎨 style.css           # Custom styling
├── 📁 js/
│   ├── 🔧 products.js         # Logic produk dan filter
│   ├── 🛒 cart.js             # Sistem keranjang
│   └── 📱 main.js             # Utility functions
├── 📁 Foto/                   # Asset gambar
│   ├── 🖼️ batik_beranda.jpg
│   ├── 🖼️ carousel-*.jpg
│   └── 🖼️ [produk-images].jpg
└── 📄 README.md               # Dokumentasi
```

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **HTML5** | - | Struktur semantic dan modern |
| **CSS3** | - | Styling dengan Flexbox & Grid |
| **JavaScript** | ES6+ | Interaktivitas dan DOM manipulation |
| **Bootstrap** | 5.3.0 | Framework CSS responsif |
| **Bootstrap Icons** | 1.10.0 | Icon library |
| **LocalStorage** | - | Penyimpanan data keranjang |

## 📱 Responsivitas

Website ini dioptimalkan untuk berbagai ukuran layar:

- **📱 Mobile**: 320px - 767px
- **📱 Tablet**: 768px - 991px  
- **💻 Desktop**: 992px - 1199px
- **🖥️ Large Desktop**: 1200px+

## 🎯 Fitur Unggulan

### 🛒 Sistem Keranjang Belanja
```javascript
// Contoh penggunaan
addToCart(productId, quantity);
updateQuantity(productId, newQuantity);
removeFromCart(productId);
```

### 🔍 Filter & Pencarian
- Filter berdasarkan daerah asal batik
- Filter berdasarkan rentang harga
- Pencarian real-time berdasarkan nama produk
- Kombinasi multiple filters

### 📊 Pagination
- 4 produk per halaman
- Navigasi halaman yang smooth
- Indikator halaman aktif

## 🎨 Customization

### Mengubah Warna Tema
Edit variabel CSS di `css/style.css`:
```css
:root {
    --primary-color: #4e54c8;
    --secondary-color: #8f94fb;
    --accent-color: #6c63ff;
    /* Ubah sesuai kebutuhan */
}
```

### Menambah Produk Baru
1. Tambahkan data produk di `js/products.js`:
```javascript
{
    id: 6,
    name: "Batik Baru",
    description: "Deskripsi produk",
    price: 500000,
    image: "Foto/batik-baru.jpg",
    category: "Solo"
}
```
2. Tambahkan gambar ke folder `Foto/`

## 🤝 Contributing

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Create** branch fitur (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### 📋 Development Guidelines
- Gunakan semantic HTML
- Follow CSS BEM methodology
- Write clean, commented JavaScript
- Test responsiveness di berbagai device
- Optimize images sebelum commit

## 🐛 Bug Reports & Feature Requests

Gunakan [GitHub Issues](https://github.com/your-username/batik-ecommerce/issues) untuk:
- 🐛 Melaporkan bug
- 💡 Request fitur baru
- 📝 Diskusi improvement
- ❓ Bertanya tentang penggunaan

## 📈 Roadmap

### Version 2.0 (Coming Soon)
- [ ] 🔐 User authentication system
- [ ] 💳 Payment gateway integration
- [ ] 📧 Email notifications
- [ ] 🌐 Multi-language support
- [ ] 📊 Admin dashboard
- [ ] 🔍 Advanced search with filters
- [ ] ⭐ Product reviews & ratings
- [ ] 📱 Progressive Web App (PWA)

### Version 1.1 (In Progress)
- [x] ✅ Improved mobile responsiveness
- [x] ✅ SEO optimization
- [x] ✅ Accessibility improvements
- [ ] 🎨 Dark mode toggle
- [ ] 🔔 Push notifications

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon Library
- [Unsplash](https://unsplash.com/) - Stock Photos
- Komunitas batik Indonesia untuk inspirasi dan konten

## 📊 Statistics

![GitHub repo size](https://img.shields.io/github/repo-size/your-username/batik-ecommerce)
![GitHub last commit](https://img.shields.io/github/last-commit/your-username/batik-ecommerce)
![GitHub issues](https://img.shields.io/github/issues/your-username/batik-ecommerce)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/batik-ecommerce)

---

<div align="center">
  <p>Made with ❤️ for Indonesian Batik Culture</p>
  <p>🏮 Melestarikan Warisan Budaya Indonesia 🏮</p>
</div>