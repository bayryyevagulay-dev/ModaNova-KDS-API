document.addEventListener('DOMContentLoaded', () => {
    // Tüm bileşenleri başlat
    renderSummary();
    renderChampionCampaign();
    renderCampaignChart('all'); 
    renderCityChart();         
    renderTrendChart();         
    renderForecastChart();     
});

// Üst Özet Kartları Verileri
function renderSummary() {
    if(document.getElementById('totalRevenue')) document.getElementById('totalRevenue').innerText = "₺4.120.500,00";
    if(document.getElementById('totalOrders')) document.getElementById('totalOrders').innerText = "1.842";
    if(document.getElementById('totalCustomers')) document.getElementById('totalCustomers').innerText = "500";
    if(document.getElementById('stockAlerts')) document.getElementById('stockAlerts').innerText = "12";
}

// Şampiyon Kampanya Bilgisi
function renderChampionCampaign() {
    if(document.getElementById('bestCampaignName')) {
        document.getElementById('bestCampaignName').innerText = "Efsane Cuma (Black Friday)";
        document.getElementById('bestCampaignValue').innerText = "₺1.410.000 Toplam Satış";
    }
}

// Mock Veri Seti
const mockData = [
    { name: "Efsane Cuma", y2023: 420000, y2024: 410000, y2025: 580000 },
    { name: "Yılbaşı İndirimi", y2023: 310000, y2024: 390000, y2025: 450000 },
    { name: "Bahar Fırsatları", y2023: 180000, y2024: 150000, y2025: 230000 },
    { name: "Okula Dönüş", y2023: 250000, y2024: 290000, y2025: 310000 },
    { name: "Yaz Kampanyası", y2023: 140000, y2024: 210000, y2025: 190000 },
    { name: "Anneler Günü", y2023: 200000, y2024: 220000, y2025: 350000 },
    { name: "Babalar Günü", y2023: 170000, y2024: 160000, y2025: 200000 },
    { name: "Kış Sezonu", y2023: 240000, y2024: 200000, y2025: 280000 },
    { name: "Sevgililer Günü", y2023: 150000, y2024: 280000, y2025: 290000 },
    { name: "Hafta Sonu", y2023: 80000, y2024: 95000, y2025: 145000 }
];

let myChart;

// 1. Ana Bar Grafik (Kampanya Analizi)
function renderCampaignChart(filter) {
    const ctx = document.getElementById('campaignChart').getContext('2d');
    if (myChart) myChart.destroy();

    let datasets = [];
    

    if (filter === 'all') {
        datasets = [
            { label: '2023', data: mockData.map(i => i.y2023), backgroundColor: '#3498db' },
            { label: '2024', data: mockData.map(i => i.y2024), backgroundColor: '#2ecc71' },
            { label: '2025', data: mockData.map(i => i.y2025), backgroundColor: '#e74c3c' }
        ];
    } else {
        const yearColor = filter === 'y2023' ? '#3498db' : (filter === 'y2024' ? '#2ecc71' : '#e74c3c');
        datasets = [{
            label: filter.replace('y', '') + ' Satış Performansı (₺)',
            data: mockData.map(i => i[filter]),
            backgroundColor: yearColor,
            borderColor: '#2c3e50',
            borderWidth: 1
        }];
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mockData.map(i => i.name),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { callback: value => '₺' + value.toLocaleString() } }
            }
        }
    });
}

// 2. Pasta Grafik (Bölgesel Satış)
function renderCityChart() {
    const ctx = document.getElementById('cityChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['İstanbul', 'Ankara', 'İzmir', 'Diğer'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// 3. Çizgi Grafik (Müşteri Trendi)
function renderTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
            datasets: [{
                label: 'Yeni Müşteri',
                data: [30, 55, 45, 80, 95, 120],
                borderColor: '#9b59b6',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(155, 89, 182, 0.1)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// 4. Tahmin Grafiği (KDS Gelecek Analizi)
function renderForecastChart() {
    const ctx = document.getElementById('forecastChart').getContext('2d');
    const labels = ['Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara', 'Oca*', 'Şub*', 'Mar*', 'Nis*', 'May*', 'Haz*'];
    const actualData = [280000, 310000, 340000, 420000, 580000, 450000];
    const predictedData = [null, null, null, null, null, 450000, 490000, 520000, 470000, 530000, 560000, 610000];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'Gerçekleşen (2025)', data: actualData, borderColor: '#3498db', backgroundColor: 'rgba(52, 152, 219, 0.1)', fill: true },
                { label: 'KDS Tahmini (2026)', data: predictedData, borderColor: '#e67e22', borderDash: [5, 5], fill: false }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// 5. Dinamik Yıl Filtresi ve Etki Analizi Güncellemesi
function updateChartByYear() {
    const selectedYear = document.getElementById('yearFilter').value;
    
    // Grafiği güncelle
    renderCampaignChart(selectedYear);

    // Kampanya Etki Çubuklarını güncelle
    const preBar = document.querySelector('.impact-bar.pre');
    const postBar = document.querySelector('.impact-bar.post');

    if (!preBar || !postBar) return;

    if (selectedYear === 'y2025') {
        preBar.style.width = '55%';
        preBar.innerText = '₺720K';
        postBar.style.width = '100%';
        postBar.innerText = '₺1.3M';
    } else if (selectedYear === 'y2024') {
        preBar.style.width = '65%';
        preBar.innerText = '₺850K';
        postBar.style.width = '90%';
        postBar.innerText = '₺1.1M';
    } else {
        preBar.style.width = '60%';
        preBar.innerText = '₺780K';
        postBar.style.width = '95%';
        postBar.innerText = '₺1.2M';
    }
}
function updateChartByYear() {
    const selectedYear = document.getElementById('yearFilter').value;
    
    // 1. Üstteki Bar Grafiğini Güncelle
    if (typeof renderCampaignChart === "function") {
        renderCampaignChart(selectedYear);
    }

    // 2. Alttaki ROI Çubuklarını Güncelle
    const preBar = document.getElementById('preBar');
    const postBar = document.getElementById('postBar');
    const growthBadge = document.getElementById('growthBadge');
    const impactHeader = document.getElementById('impactHeader');

    const yearlyImpact = {
        'y2023': { pre: '₺650K', post: '₺920K', pW: '60%', oW: '85%', growth: '+%40', title: '2023 Etki Analizi' },
        'y2024': { pre: '₺780K', post: '₺1.05M', pW: '65%', oW: '90%', growth: '+%34', title: '2024 Etki Analizi' },
        'y2025': { pre: '₺820K', post: '₺1.45M', pW: '55%', oW: '100%', growth: '+%76', title: '2025 Etki Analizi' },
        'all':   { pre: '₺750K', post: '₺1.14M', pW: '60%', oW: '92%', growth: '+%42', title: 'Genel Etki Analizi' }
    };

    const d = yearlyImpact[selectedYear] || yearlyImpact['all'];

    if (preBar && postBar) {
        preBar.style.width = d.pW;
        preBar.innerText = d.pre;
        postBar.style.width = d.oW;
        postBar.innerText = d.post;
        if(growthBadge) growthBadge.innerText = "Ciro Artışı: " + d.growth;
        if(impactHeader) impactHeader.innerText = "🎯 " + d.title + " (ROI)";
    }
}
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Basit bir kontrol (Sunum için yeterli)
    if (user === "admin" && pass === "123") {
        // Dashboard sayfana giden dosya yolu (index.html olduğundan emin ol)
        window.location.href = "index.html"; 
    } else {
        alert("Kullanıcı adı veya şifre hatalı!");
    }
}function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Basit bir kontrol (Sunum için yeterli)
    if (user === "admin" && pass === "123") {
        // Dashboard sayfana giden dosya yolu (index.html olduğundan emin ol)
        window.location.href = "index.html"; 
    } else {
        alert("Kullanıcı adı veya şifre hatalı!");
    }
}