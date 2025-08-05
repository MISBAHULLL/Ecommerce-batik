# Batik Indonesia E-commerce Backend

Backend API untuk website e-commerce Batik Indonesia menggunakan Node.js, Express, dan MySQL.

## Setup Database

1. Install MySQL dan buat database:
```sql
CREATE DATABASE batik_ecommerce;
```

2. Import schema database:
```bash
mysql -u root -p batik_ecommerce < database.sql
```

## Instalasi

1. Install dependencies:
```bash
cd backend
npm install
```

2. Konfigurasi environment:
- Copy file `.env` dan sesuaikan dengan konfigurasi database Anda
- Default: MySQL di localhost tanpa password

3. Jalankan server:
```bash
npm start
# atau untuk development
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products with pagination and filters
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart/:userId` - Get user cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:userId/:productId` - Update cart item quantity
- `DELETE /api/cart/:userId/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user orders

## Query Parameters untuk Products

- `page` - Halaman (default: 1)
- `limit` - Jumlah per halaman (default: 8)
- `search` - Pencarian berdasarkan nama/deskripsi
- `region` - Filter berdasarkan daerah
- `priceRange` - Filter harga (format: "min-max" atau "min")

## Database Schema

- `users` - Data pengguna
- `categories` - Kategori produk
- `products` - Data produk batik
- `orders` - Data pesanan
- `order_items` - Item dalam pesanan
- `cart` - Keranjang belanja

## Fitur

- ✅ CRUD Products dengan pagination
- ✅ Shopping cart management
- ✅ Order processing dengan transaction
- ✅ Search dan filter products
- ✅ Stock management
- ✅ CORS enabled untuk frontend
- ✅ Error handling
- ✅ Database connection pooling