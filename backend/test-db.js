// Test database connection
const db = require('./config/database');

async function testConnection() {
    try {
        const [rows] = await db.execute('SELECT 1 as test');
        console.log('✅ Database connection successful');
        
        // Test users table
        const [users] = await db.execute('SELECT COUNT(*) as count FROM users');
        console.log(`✅ Users table: ${users[0].count} records`);
        
        // Test products table
        const [products] = await db.execute('SELECT COUNT(*) as count FROM products');
        console.log(`✅ Products table: ${products[0].count} records`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();