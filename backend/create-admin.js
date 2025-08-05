const bcrypt = require('bcryptjs');
const db = require('./config/database');

async function createAdmin() {
    try {
        // Hash password admin123
        const hashedPassword = await bcrypt.hash('admin123', 10);
        console.log('Hashed password:', hashedPassword);
        
        // Delete existing admin if exists
        await db.execute('DELETE FROM users WHERE email = ?', ['admin@batikindonesia.com']);
        
        // Insert new admin
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Admin', 'admin@batikindonesia.com', hashedPassword, 'admin']
        );
        
        console.log('✅ Admin user created successfully with ID:', result.insertId);
        console.log('📧 Email: admin@batikindonesia.com');
        console.log('🔑 Password: admin123');
        
        // Test the password
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', ['admin@batikindonesia.com']);
        const isValid = await bcrypt.compare('admin123', users[0].password);
        console.log('🔍 Password test:', isValid ? '✅ Valid' : '❌ Invalid');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();