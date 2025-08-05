const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get cart items
router.get('/:userId', async (req, res) => {
    try {
        const [items] = await db.execute(`
            SELECT c.*, p.name, p.price, p.image, p.stock
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ? AND p.is_active = 1
            ORDER BY c.created_at DESC
        `, [req.params.userId]);
        
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add to cart
router.post('/', async (req, res) => {
    try {
        const { user_id, product_id, quantity = 1 } = req.body;
        
        // Check if product exists and has stock
        const [products] = await db.execute(
            'SELECT stock FROM products WHERE id = ? AND is_active = 1',
            [product_id]
        );
        
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        if (products[0].stock < quantity) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }
        
        // Check if item already in cart
        const [existing] = await db.execute(
            'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
            [user_id, product_id]
        );
        
        if (existing.length > 0) {
            // Update quantity
            await db.execute(
                'UPDATE cart SET quantity = quantity + ?, updated_at = NOW() WHERE user_id = ? AND product_id = ?',
                [quantity, user_id, product_id]
            );
        } else {
            // Insert new item
            await db.execute(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [user_id, product_id, quantity]
            );
        }
        
        res.json({ message: 'Item added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update cart item quantity
router.put('/:userId/:productId', async (req, res) => {
    try {
        const { quantity } = req.body;
        
        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            await db.execute(
                'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
                [req.params.userId, req.params.productId]
            );
        } else {
            await db.execute(
                'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE user_id = ? AND product_id = ?',
                [quantity, req.params.userId, req.params.productId]
            );
        }
        
        res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove from cart
router.delete('/:userId/:productId', async (req, res) => {
    try {
        await db.execute(
            'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
            [req.params.userId, req.params.productId]
        );
        
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;