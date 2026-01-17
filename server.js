const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- HATA BURADAYDI: DOSYA YOLLARINI KONTROL ET ---
// Eğer dosya adın 'kdsRouter.js' ise:
const kdsRoutes = require('./routers/kdsRoutes'); 
// Eğer dosya adın 'authRouter.js' ise:
const authRoutes = require('./routers/authRoutes');

app.use('/api/kds', kdsRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} portunda çalışıyor.`);
});