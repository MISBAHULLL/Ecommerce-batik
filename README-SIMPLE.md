# 🏮 Batik Indonesia E-commerce (Versi Sederhana)

Website e-commerce sederhana untuk menjual batik Indonesia menggunakan teknologi web dasar.

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur halaman web
- **CSS3** - Styling dan tampilan
- **Bootstrap 5.3.0** - Framework CSS untuk responsive design
- **JavaScript (Vanilla)** - Interaktivitas dan logika aplikasi
- **Bootstrap Icons** - Icon library

### Penyimpanan Data
- **LocalStorage** - Menyimpan data keranjang belanja
- **JavaScript Objects** - Data produk (simulasi database)

## 📁 Struktur Project

```
batik-ecommerce/
├── 📄 index.html              # Halaman utama
├── 📄 products.html           # Halaman daftar produk
├── 📄 cart.html               # Halaman keranjang belanja
├── 📄 about.html              # Halaman tentang (opsional)
├── 📄 contact.html            # Halaman kontak (opsional)
├── 📁 css/
│   └── 🎨 style.css           # CSS custom dengan tema batik
├── 📁 js/
│   ├── 📊 data.js             # Data produk (simulasi database)
│   └── 🛒 cart-simple.js      # Sistem keranjang sederhana
├── 📁 Foto/                   # Gambar produk batik
└── 📄 README-SIMPLE.md        # Dokumentasi ini
```

## ✨ Fitur Utama

### 🏠 Halaman Beranda (index.html)
- Hero section dengan background batik
- Statistik website (pelanggan, produk, dll)
- Produk unggulan dengan scroll horizontal
- Informasi tentang batik Indonesia

### 🛍️ Halaman Produk (products.html)
- Daftar semua produk batik
- Filter berdasarkan kategori (Solo, Yogya, Pekalongan, dll)
- Sorting berdasarkan nama dan harga
- Tombol tambah ke keranjang

### 🛒 Halaman Keranjang (cart.html)
- Daftar produk yang dipilih
- Update jumlah produk
- Hapus produk dari keranjang
- Ringkasan total belanja
- Proses checkout sederhana

### 🎨 Fitur Desain
- Tema warna batik (coklat, orange, tan)
- Responsive design untuk mobile dan desktop
- Animasi hover pada card produk
- Loading indicator
- Notifikasi saat menambah produk

## 🚀 Cara Menjalankan

1. **Download/Clone Project**
   ```bash
   git clone [repository-url]
   cd batik-ecommerce
   ```

2. **Buka di Browser**
   - Langsung buka file `index.html` di browser
   - Atau gunakan Live Server di VS Code

3. **Mulai Eksplorasi**
   - Klik "Belanja Sekarang" di halaman utama
   - Tambahkan produk ke keranjang
   - Lihat keranjang dan lakukan checkout

## 💡 Cara Kerja Sistem

### Data Produk (js/data.js)
```javascript
// Contoh data produk
const products = [
    {
        id: 1,
        name: "Batik Solo Klasik",
        price: 450000,
        image: "Foto/batik_beranda.jpg",
        category: "Solo",
        description: "Batik Solo dengan motif tradisional"
    }
];
```

### Sistem Keranjang (js/cart-simple.js)
```javascript
// Menambah produk ke keranjang
window.cart.addToCart(productId, quantity);

// Mengambil data keranjang
const cartItems = window.cart.getCart();

// Menghitung total harga
const total = window.cart.getTotal();
```

### LocalStorage
- Data keranjang disimpan di browser
- Otomatis tersimpan saat menambah/menghapus produk
- Data tetap ada meskipun browser ditutup

## 🎯 Fitur yang Bisa Dikembangkan Nanti

### Level Pemula
- [ ] Halaman detail produk
- [ ] Search/pencarian produk
- [ ] Kategori produk lebih detail
- [ ] Form kontak yang berfungsi

### Level Menengah
- [ ] User registration/login
- [ ] Wishlist/favorit produk
- [ ] Review dan rating produk
- [ ] Multiple images per produk

### Level Lanjut
- [ ] Payment gateway integration
- [ ] Admin panel untuk manage produk
- [ ] Order tracking
- [ ] Email notifications

## 🔧 Kustomisasi

### Mengubah Warna Tema
Edit file `css/style.css`:
```css
:root {
    --primary-color: #8B4513;   /* Warna utama */
    --secondary-color: #D2691E; /* Warna sekunder */
    --accent-color: #CD853F;    /* Warna aksen */
}
```

### Menambah Produk Baru
Edit file `js/data.js`:
```javascript
const products = [
    // ... produk existing
    {
        id: 6,
        name: "Batik Baru",
        price: 500000,
        image: "Foto/batik-baru.jpg",
        category: "Jakarta",
        description: "Deskripsi batik baru"
    }
];
```

### Mengubah Mata Uang
Edit fungsi `formatPrice` di `js/data.js`:
```javascript
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR', // Ubah ke USD, EUR, dll
        minimumFractionDigits: 0
    }).format(price);
}
```

## 🐛 Troubleshooting

### Keranjang Tidak Muncul
- Pastikan JavaScript diaktifkan di browser
- Buka Developer Tools (F12) dan cek Console untuk error
- Pastikan file `js/cart-simple.js` ter-load dengan benar

### Gambar Tidak Muncul
- Pastikan file gambar ada di folder `Foto/`
- Cek nama file gambar sesuai dengan yang di `data.js`
- Pastikan format gambar didukung (jpg, png, webp)

### Responsive Tidak Bekerja
- Pastikan Bootstrap CSS ter-load dengan benar
- Cek koneksi internet untuk CDN Bootstrap
- Pastikan viewport meta tag ada di `<head>`

## 📚 Belajar Lebih Lanjut

### HTML & CSS
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)

### JavaScript
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

### Bootstrap
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Baca dokumentasi ini dengan teliti
2. Cek Console browser untuk error messages
3. Coba reset keranjang dengan refresh halaman
4. Pastikan semua file ada di tempatnya

---

**Selamat belajar dan mengembangkan website batik Indonesia! 🇮🇩**