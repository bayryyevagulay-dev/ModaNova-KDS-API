const mysql = require('mysql2');
require('dotenv').config();

// Bağlantı havuzu oluşturuluyor (Performans için en iyisidir)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '', 
    database: process.env.DB_NAME || 'ModaNovaKDS',
    waitForConnections: true,
    connectionLimit: 10, // Aynı anda kaç bağlantı açık kalabilir
    queueLimit: 0
});

// Promise desteği ekleyerek modern async/await yapısını kullanıyoruz
module.exports = pool.promise();