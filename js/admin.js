document.addEventListener('DOMContentLoaded', function() {
    const formProduk = document.getElementById('formProduk');
    const tabelDataProduk = document.getElementById('tabelDataProduk');

    // Contoh Data Awal (Bisa dihapus jika tidak diperlukan)
    const produkAwal = [
        { nama: "Batik Solo - Sidomukti", motif: "Sidomukti", harga: 750000, daerah: "Solo", gambar: "images/batik-1.jpg" },
        { nama: "Batik Yogyakarta - Parang", motif: "Parang", harga: 850000, daerah: "Yogyakarta", gambar: "images/batik-2.jpg" },
        { nama: "Batik Pekalongan - Bunga", motif: "Bunga", harga: 650000, daerah: "Pekalongan", gambar: "images/batik-3.jpg" }
    ];

    // Fungsi untuk menampilkan data produk ke tabel
    function tampilkanProduk(produk) {
        const barisBaru = tabelDataProduk.insertRow();
        barisBaru.innerHTML = `
            <td>${produk.nama}</td>
            <td>${produk.motif}</td>
            <td>${produk.harga}</td>
            <td>${produk.daerah}</td>
            <td><img src="${produk.gambar}" alt="${produk.nama}" width="50"></td>
            <td><button class="btn btn-danger btn-sm hapus-produk">Hapus</button></td>
        `;
        
        // Tambahkan event listener untuk tombol hapus
        barisBaru.querySelector('.hapus-produk').addEventListener('click', function() {
            barisBaru.remove();
            // Di aplikasi nyata, Anda juga perlu menghapus data dari penyimpanan (misal: localStorage atau database)
        });
    }

    // Tampilkan data awal (jika ada)
    // Hapus <tr> statis di HTML jika menggunakan ini
    // produkAwal.forEach(tampilkanProduk); 

    // Event listener untuk form submission
    formProduk.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form submit default

        // Ambil data dari form
        const produkBaru = {
            nama: document.getElementById('namaProduk').value,
            motif: document.getElementById('motifProduk').value,
            harga: document.getElementById('hargaProduk').value,
            daerah: document.getElementById('daerahProduk').value,
            gambar: document.getElementById('gambarProduk').value
        };

        // Tambahkan produk baru ke tabel
        tampilkanProduk(produkBaru);

        // Reset form setelah submit
        formProduk.reset();

        // Di aplikasi nyata, Anda akan mengirim data ini ke server atau menyimpannya di localStorage
        alert('Data produk berhasil ditambahkan!'); 
    });

     // Tambahkan event listener untuk tombol hapus yang sudah ada di HTML (jika ada)
    document.querySelectorAll('#tabelDataProduk .hapus-produk').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('tr').remove();
             // Di aplikasi nyata, Anda juga perlu menghapus data dari penyimpanan
        });
    });

}); 