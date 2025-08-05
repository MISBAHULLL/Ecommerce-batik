const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Add product
router.post('/products', async (req, res) => {
    try {
        const { name, description, price, stock, image, category_id, region, material, technique, size, care_instructions } = req.body;
        
        const [result] = await db.execute(
            'INSERT INTO products (name, description, price, stock, image, category_id, region, material, technique, size, care_instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, stock, image, category_id, region, material, technique, size, care_instructions]
        );
        
        res.json({ message: 'Product added successfully', productId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update product
router.put('/products/:id', async (req, res) => {
    try {
        const { name, description, price, stock, image, category_id, region, material, technique, size, care_instructions } = req.body;
        
        await db.execute(
            'UPDATE products SET name=?, description=?, price=?, stock=?, image=?, category_id=?, region=?, material=?, technique=?, size=?, care_instructions=?, updated_at=NOW() WHERE id=?',
            [name, description, price, stock, image, category_id, region, material, technique, size, care_instructions, req.params.id]
        );
        
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
    try {
        await db.execute('UPDATE products SET is_active = 0 WHERE id = ?', [req.params.id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const [orders] = await db.execute(`
            SELECT o.*, u.name as user_name, u.email as user_email,
                   GROUP_CONCAT(CONCAT(p.name, ' (', oi.quantity, ')') SEPARATOR ', ') as items
            FROM orders o
            JOIN users u ON o.user_id = u.id
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `);
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await db.execute('UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;