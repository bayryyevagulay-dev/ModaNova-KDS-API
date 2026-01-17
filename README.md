ModaNova KDS - Karar Destek Sistemi API
Bu proje, ModaNova yönetici panelinin dashboard verilerini yöneten, kurumsal seviyede bir RESTful API çalışmasıdır.

Kullanılan Teknolojiler
Node.js & Express (Backend Framework)
MySQL (Database)
JWT & Bcrypt (Güvenlik)
Katmanlı Mimari (MVC + Service Layer)
Özel İş Kuralları (Business Logic)
Kritik Stok Kontrolü: Stok seviyesi 100 birimin altında olan ürünler için yeni kampanya oluşturulması sistem tarafından engellenir.
ROI Performans Denetimi: ROI değeri 1.5'in altında kalan verimsiz kampanyalar "Onaylı" statüsüne getirilemez.
Bölgesel Risk Analizi: Satış payı %15'in altına düşen bölgeler otomatik olarak "Kritik" statüsünde raporlanır.
Kurulum
npm install komutu ile paketleri yükleyin.
.env dosyasını oluşturun ve MySQL bilgilerinizi girin.
Uygulamayı npm start ile başlatın (Veritabanı tabloları hazır olmalıdır).