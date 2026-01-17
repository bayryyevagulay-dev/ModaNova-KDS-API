const express = require('express');
const router = express.Router();

// BURAYA DİKKAT: Dosya yolunu .js uzantısı ile birlikte açıkça yazıyoruz
const kdsController = require('../controllers/kdsController.js'); 

router.get('/stats', kdsController.getCampaignPerformance);
router.get('/low-stock', kdsController.getLowStockAlerts);
router.get('/summary', kdsController.getSummaryStats);
router.get('/best-campaign', kdsController.getBestCampaign); // Bu satırı ekle

module.exports = router;