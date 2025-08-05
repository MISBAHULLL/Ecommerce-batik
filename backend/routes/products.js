const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all products with pagination and filters
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';
        const region = req.query.region || '';
        const priceRange = req.query.priceRange || '';

        let query = `
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.is_active = 1
        `;
        let countQuery = 'SELECT COUNT(*) as total FROM products p WHERE p.is_active = 1';
        let params = [];
        let countParams = [];

        if (search) {
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            countQuery += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
            countParams.push(`%${search}%`, `%${search}%`);
        }

        if (region) {
            query += ' AND p.region LIKE ?';
            countQuery += ' AND p.region LIKE ?';
            params.push(`%${region}%`);
            countParams.push(`%${region}%`);
        }

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            if (max) {
                query += ' AND p.price BETWEEN ? AND ?';
                countQuery += ' AND p.price BETWEEN ? AND ?';
                params.push(min, max);
                countParams.push(min, max);
            } else {
                query += ' AND p.price >= ?';
                countQuery += ' AND p.price >= ?';
                params.push(min);
                countParams.push(min);
            }
        }

        query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [products] = await db.execute(query, params);
        const [countResult] = await db.execute(countQuery, countParams);
        const total = countResult[0].total;

        res.json({
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const [products] = await db.execute(
            'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ? AND p.is_active = 1',
            [req.params.id]
        );
        
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(products[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;