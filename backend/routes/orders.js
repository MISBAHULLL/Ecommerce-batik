const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Create order
router.post('/', async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();
        
        const { user_id, items, shipping_address, payment_method, shipping_cost = 0 } = req.body;
        let subtotal = 0;
        
        // Calculate total and validate stock
        for (const item of items) {
            const [products] = await connection.execute(
                'SELECT price, stock FROM products WHERE id = ? AND is_active = 1',
                [item.product_id]
            );
            
            if (products.length === 0) {
                throw new Error(`Product ${item.product_id} not found`);
            }
            
            if (products[0].stock < item.quantity) {
                throw new Error(`Insufficient stock for product ${item.product_id}`);
            }
            
            subtotal += products[0].price * item.quantity;
        }
        
        const total_amount = subtotal + shipping_cost;
        
        // Create order
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total_amount, shipping_address, payment_method, payment_status) VALUES (?, ?, ?, ?, ?)',
            [user_id, total_amount, shipping_address, payment_method, 'pending']
        );
        
        const order_id = orderResult.insertId;
        
        // Create order items and update stock
        for (const item of items) {
            const [products] = await connection.execute(
                'SELECT price FROM products WHERE id = ?',
                [item.product_id]
            );
            
            await connection.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [order_id, item.product_id, item.quantity, products[0].price]
            );
            
            await connection.execute(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                [item.quantity, item.product_id]
            );
        }
        
        // Clear cart
        await connection.execute(
            'DELETE FROM cart WHERE user_id = ?',
            [user_id]
        );
        
        await connection.commit();
        
        res.json({ 
            message: 'Order created successfully',
            order_id,
            total_amount,
            subtotal,
            shipping_cost
        });
        
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
    try {
        const [orders] = await db.execute(`
            SELECT o.*, 
                   GROUP_CONCAT(CONCAT(p.name, ' (', oi.quantity, ')') SEPARATOR ', ') as items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `, [req.params.userId]);
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;