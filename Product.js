const db = require('../config/db');

class Product {
    // Veritabanından belirli bir ürünü ID ile getirir
    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    // Tüm ürün listesini getirir (Dashboard tablosu için)
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM products ORDER BY sales_count DESC');
        return rows;
    }

    // Stok güncelleme işlemi
    static async updateStock(id, newStock) {
        return await db.execute('UPDATE products SET stock = ? WHERE id = ?', [newStock, id]);
    }
}

module.exports = Product;