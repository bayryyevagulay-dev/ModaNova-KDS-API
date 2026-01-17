const db = require('../db/connection');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Veritabanında kullanıcıyı ara
        const [rows] = await db.query(
            'SELECT * FROM Users WHERE username = ? AND password = ?',
            [username, password]
        );

        if (rows.length > 0) {
            // Giriş başarılı
            res.status(200).json({
                status: 'success',
                message: 'Giriş başarılı, yönlendiriliyorsunuz...',
                user: { id: rows[0].id, username: rows[0].username }
            });
        } else {
            // Giriş başarısız
            res.status(401).json({
                status: 'fail',
                message: 'Kullanıcı adı veya şifre hatalı!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Sunucu hatası oluştu.'
        });
    }
};
// Yeni Kullanıcı Oluştur (Hesap Aç)
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        await db.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password]);
        res.status(201).json({ status: 'success', message: 'Yeni hesap başarıyla oluşturuldu!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Hesap oluşturulurken hata: ' + error.message });
    }
};

// Kullanıcı Sil
exports.deleteAccount = async (req, res) => {
    const { username } = req.body; // Güvenlik için kullanıcı adıyla silme
    try {
        const [result] = await db.query('DELETE FROM Users WHERE username = ?', [username]);
        if (result.affectedRows > 0) {
            res.status(200).json({ status: 'success', message: 'Hesap silindi.' });
        } else {
            res.status(404).json({ status: 'fail', message: 'Kullanıcı bulunamadı.' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Silme hatası.' });
    }
};


// Giriş Yap
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            res.status(200).json({ status: 'success', message: 'Giriş başarılı!', user: rows[0] });
        } else {
            res.status(401).json({ status: 'fail', message: 'Hatalı kullanıcı adı veya şifre!' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Sunucu hatası.' });
    }
};

// Kayıt Ol
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        await db.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password]);
        res.status(201).json({ status: 'success', message: 'Hesap başarıyla oluşturuldu!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Kayıt hatası: ' + error.message });
    }
};

// Hesap Sil
exports.deleteAccount = async (req, res) => {
    const { username } = req.body;
    try {
        const [result] = await db.query('DELETE FROM Users WHERE username = ?', [username]);
        if (result.affectedRows > 0) {
            res.status(200).json({ status: 'success', message: 'Hesap silindi.' });
        } else {
            res.status(404).json({ status: 'fail', message: 'Kullanıcı bulunamadı.' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Silme hatası.' });
    }
};