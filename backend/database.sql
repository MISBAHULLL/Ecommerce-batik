-- Database untuk Batik Indonesia E-commerce
CREATE DATABASE IF NOT EXISTS batik_ecommerce;
USE batik_ecommerce;

-- Tabel Users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Categories
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Products
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image VARCHAR(255),
    category_id INT,
    region VARCHAR(100),
    material VARCHAR(100),
    technique VARCHAR(100),
    size VARCHAR(50),
    care_instructions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabel Orders
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabel Order Items
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabel Cart
CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Batik Tulis', 'Batik dengan teknik tulis menggunakan canting'),
('Batik Cap', 'Batik dengan teknik cap menggunakan stempel'),
('Batik Kombinasi', 'Batik dengan kombinasi teknik tulis dan cap'),
('Dress Batik', 'Dress dengan motif batik modern'),
('Kemeja Batik', 'Kemeja formal dengan motif batik');

-- Insert sample products
INSERT INTO products (name, description, price, stock, image, category_id, region, material, technique, size, care_instructions) VALUES
('Batik Solo Klasik', 'Batik Solo dengan motif tradisional yang elegan, dibuat dengan teknik canting tulis. Menggunakan bahan katun berkualitas tinggi dan pewarna alami yang tahan lama.', 450000, 15, 'batik_beranda.jpg', 1, 'Solo, Jawa Tengah', 'Katun Prima', 'Canting Tulis', 'S, M, L, XL', 'Cuci dengan tangan, jangan menggunakan pemutih'),
('Dress Batik Yogyakarta', 'Batik Yogyakarta dengan motif keraton yang megah, cocok untuk acara formal. Dibuat dengan teknik tulis yang detail dan menggunakan bahan berkualitas tinggi.', 550000, 12, 'dress yogyakarta.jpg', 4, 'Yogyakarta', 'Sutera Premium', 'Canting Tulis', 'S, M, L, XL', 'Dry clean recommended'),
('Batik Pekalongan Modern', 'Batik Pekalongan dengan warna-warna cerah dan motif modern yang eye-catching. Menggabungkan teknik tradisional dengan desain kontemporer.', 400000, 20, 'batik pekalongan.jpg', 3, 'Pekalongan, Jawa Tengah', 'Katun Rayon', 'Cap dan Tulis', 'S, M, L, XL', 'Cuci dengan tangan, jangan dijemur langsung'),
('Batik Mega Mendung Cirebon', 'Batik Cirebon dengan motif mega mendung yang ikonik, menggambarkan awan mendung dengan gradasi warna yang indah.', 850000, 8, 'batik mega mendung.jpg', 1, 'Cirebon, Jawa Barat', 'Sutera Premium', 'Canting Tulis', 'S, M, L, XL', 'Dry clean recommended'),
('Batik Madura Premium', 'Batik Madura dengan warna-warna berani dan eksotis, mencerminkan semangat dan karakter masyarakat Madura.', 750000, 10, 'batik madura.jpg', 3, 'Madura, Jawa Timur', 'Katun Premium', 'Cap dan Tulis', 'S, M, L, XL', 'Cuci dengan tangan, jangan menggunakan pemutih');

-- Insert admin user (password: admin123)
-- Hash generated with: bcrypt.hashSync('admin123', 10)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@batikindonesia.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin');