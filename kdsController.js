const db = require('../config/db'); // Veritabanı bağlantısı
const kdsService = require('../services/kdsService'); // İş mantığı servisi
const Product = require('.models/Product.js'); // Veri modeli

/**
 * DASHBOARD ÖZET VERİLERİ (Read)
 * Arayüzdeki ciro, sipariş ve müşteri kartlarını besler.
 */
exports.getFullDashboard = async (req, res, next) => {
    try {
        const stats = await kdsService.getSummaryStats();
        const risks = await kdsService.getStockRisks();
        const projection = await kdsService.getProjectionData();

        res.status(200).json({
            success: true,
            title: "ModaNova KDS Yönetici Paneli",
            data: { stats, risks, projection }
        });
    } catch (err) {
        next(err); // Global hata yakalayıcıya gönder
    }
};

/**
 * ENVANTER LİSTESİ (Read)
 * "En Çok Satan Ürün Grupları" tablosunu besler.
 */
exports.getInventoryReport = async (req, res, next) => {
    try {
        const products = await Product.getAll(); // Model kullanımı
        res.json({
            success: true,
            count: products.length,
            products
        });
    } catch (err) {
        next(err);
    }
}

/**
 * KAMPANYA OLUŞTURMA (Create + İş Kuralı 1)
 * Senaryo: Stok seviyesi kritik eşiğin (%10) altındaysa kampanya açılamaz.
 */
exports.createCampaign = async (req, res, next) => {
    try {
        const { productId, campaignName } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Ürün bulunamadı." });
        }

        // ÖZEL İŞ KURALI: Stok 100'den azsa (Kritik risk) işleme izin verme
        if (product.stock < 100) {
            return res.status(400).json({ 
                error: "İş Kuralı İhlali",
                message: `Stok Riski! ${product.name} ürünü kritik seviyede (${product.stock}). Önce stok güncellenmelidir.` 
            });
        }

        res.status(201).json({ 
            success: true, 
            message: "Kampanya başarıyla oluşturuldu.",
            campaign: campaignName 
        });
    } catch (err) {
        next(err);
    }
};

/**
 * PERFORMANS DENETİMİ (Update + İş Kuralı 2)
 * Senaryo: ROI (Yatırım Getirisi) 1.5'in altındaysa kampanya onaylanamaz.
 */
exports.checkPerformance = async (req, res, next) => {
    try {
        const { campaignId, roiValue } = req.body;

        // ÖZEL İŞ KURALI: Düşük performanslı kampanyaları reddet
        if (roiValue < 1.5) {
            return res.status(400).json({ 
                error: "Stratejik Red",
                message: "ROI oranı 1.5'in altında olan verimsiz kampanyalar onaylanamaz." 
            });
        }

        res.json({ 
            success: true, 
            message: "Kampanya performansı kriterlere uygun, durum güncellendi.",
            roi: roiValue 
        });
    } catch (err) {
        next(err);
    }
};

/**
 * BÖLGESEL ANALİZ (Read)
 * "Bölgesel Satış Dağılımı" pasta grafiğini besler.
 */
exports.getRegionalAnalysis = async (req, res, next) => {
    try {
        const [regions] = await db.execute('SELECT * FROM regional_sales');
        res.json({ success: true, data: regions });
    } catch (err) {
        next(err);
    }
};
