\# AI GELİŞTİRİCİ GÜNLÜĞÜ



\*\*Öğrenci Adı Soyadı:\*\* \[Esma Nida Kalkan]  

\*\*Öğrenci Numarası:\*\* \[25380102044]  

\*\*Proje Konusu:\*\* \[Yazı yazma ve düzeltme asistanı]  



\### Model Seçimi ve Gerekçesi

Bu projede yapay zeka modeli olarak \*\*Claude Sonnet 4.6\*\* modelini tercih ettim. Kod üretme başarısı, Türkçe promptları anlama kapasitesi ve karmaşık Application Factory mimarilerini kurarken sunduğu mantıklı planlar nedeniyle bu model süreç boyunca bana çok yardımcı oldu.



\---



\## Oturum 1: Proje İskeletinin Kurulması



\### Hedef

Projenin temel klasör yapısını (Application Factory Pattern) ve blueprint mimarisini kurmak.



\### Kullandığım Mod ve Model

\- \*\*Mod:\*\* Plan Modu

\- \*\*Model:\*\* Claude Sonnet 4.6

\- \*\*Görünüm:\*\* Manager View



\### Verdiğim Promptlar

"Flask 3.x ile web uygulaması geliştireceğim. Application factory pattern kullanan, blueprint'lere ayrılmış temiz bir proje iskeleti kur. .env dosyasını .gitignore'a ekle."



\### Ajanın Önerdiği Plan

Yapay zeka `app/`, `app/main`, `app/auth` klasörlerini içeren, `config.py` ve `run.py` dosyalarından oluşan modüler bir yapı önerdi.



\### Plan'da Sorguladıklarım

Ajan, `requirements.txt` dosyasına eski Flask sürümlerine ait ek kütüphaneler eklemişti. Ona Flask 3.x sürümünü kullandığımızı hatırlatarak sadece `flask`, `flask-sqlalchemy`, `flask-migrate`, `flask-login`, `flask-wtf` ve `python-dotenv` paketlerini eklemesini söyledim.



\### Üretilen Kodda Düzelttiklerim

`config.py` içinde `SECRET\_KEY` değerini direkt kodun içine string olarak yazmıştı. Güvenlik uyarısını dikkate alarak bunu `os.environ.get('SECRET\_KEY')` şeklinde el ile güncelledim.



\### Karşılaştığım Hatalar ve Çözümler

\- \*\*Hata:\*\* `flask run` yaparken `ModuleNotFoundError` hatası alındı.

\- \*\*Çözüm:\*\* Sanal ortamın (venv) aktif edilmediğini fark ettim, aktif edip `pip install -r requirements.txt` komutunu terminalde çalıştırdım.



\### Bu Oturumdan Öğrendiğim

Geleneksel tek dosyada yazılan Flask uygulamaları yerine Application Factory mimarisinin büyük projeleri ne kadar düzenli tuttuğunu kavradım.



\### Sonraki Oturum İçin Notlar

Veritabanı modellerini tasarlamak.



\---



\## Oturum 2: Veritabanı Modellerinin Tasarlanması (SQLAlchemy 2.x)



\### Hedef

SQLAlchemy kullanarak veritabanı şemasını tasarlamak ve tablolar arası ilişkileri kurmak.



\### Kullandığım Mod ve Model

\- \*\*Mod:\*\* Plan Modu

\- \*\*Model:\*\* Claude Sonnet 4.6

\- \*\*Görünüm:\*\* Editor View



\### Verdiğim Promptlar

"SQLAlchemy tanımlı projem için `app/models.py` içinde User ve projemin ana konusu olan içerik modelini tanımla. SQLAlchemy 2.x stilini kullan (Mapped ve mapped\_column). Modeller arası One-to-Many ilişkisi olsun."



\### Ajanın Önerdiği Plan

`User` modeli ve ana içerik modeli için sınıf yapılarını oluşturup, aralarında `foreign\_key` ve `relationship` tanımlamayı içeren bir plan sundu.



\### Plan'da Sorguladıklarım

Ajan bana eski SQLAlchemy 1.x stili olan `db.Column` yapısını önerdi. Ona projenin kısıtlarını hatırlatarak modern 2.x stili olan `Mapped` ve `mapped\_column` kullanması konusunda baskı yaptım ve planı değiştirttim.



\### Üretilen Kodda Düzelttiklerim

Modellerdeki `\_\_repr\_\_` metotlarında ajan eski usul `.format()` kullanmıştı, projedeki kod tutarlılığı için bunları modern f-string yapılarına çevirdim.



\### Karşılaştığım Hatalar ve Çözümler

\- \*\*Hata:\*\* `relationship` tanımlamasında döngüsel bağımlılık hatası oluştu.

\- \*\*Çözüm:\*\* Model isimlerini string olarak (`relationship('Post')`) vermesini sağlayarak sorunu çözdüm.



\### Bu Oturumdan Öğrendiğim

SQLAlchemy 2.x ile gelen tip güvenliği (Type Hinting) mantığını ve ORM ilişkilerinin arka planda SQL join işlemlerini nasıl kolaylaştırdığını anladım.



\---



\## Oturum 3: Veritabanı Migrasyonları (Flask-Migrate)



\### Hedef

Yazılan modelleri Flask-Migrate kullanarak gerçek veritabanı tablolarına dönüştürmek.



\### Kullandığım Mod ve Model

\- \*\*Mod:\*\* Fast Modu

\- \*\*Model:\*\* Claude Sonnet 4.6

\- \*\*Görünüm:\*\* Editor View



\### Verdiğim Promptlar

"Modellerim hazır. `flask db init`, `migrate` ve `upgrade` adımlarını sırayla terminal sandbox üzerinde çalıştırmak için bana rehberlik et."



\### Ajanın Önerdiği Plan

Fast modunda olduğumuz için direkt terminal komutlarını ve bu komutların ne işe yaradığını sırayla yazdı.



\### Plan'da Sorguladıklarım

Doğrudan komutları çalıştırmak yerine, üretilen `versions/` altındaki göç dosyasını (migration script) incelemeyi talep ettim. Tablo isimlerinin doğruluğundan emin olduktan sonra onay verdim.



\### Üretilen Kodda Düzelttiklerim

Ajanın önerdiği gibi veritabanı olarak şimdilik SQLite kullandık ancak `config.py` içinde ileride PostgreSQL'e geçebilecek şekilde `DATABASE\_URL` kontrolü ekledim.



\### Karşılaştığım Hatalar ve Çözümler

\- \*\*Hata:\*\* `Target database is not up to date` hatası alındı.

\- \*\*Çözüm:\*\* Önceki denemelerden kalan eski bir DB dosyasını silip `flask db stamp head` yaparak senkronizasyonu sağladım.



\### Bu Oturumdan Öğrendiğim

Veritabanı üzerinde doğrudan değişiklik yapmak yerine migrasyon dosyaları kullanmanın projenin versiyon kontrolü için ne kadar hayati olduğunu öğrendim.



\---



\## Oturum 4: Kimlik Doğrulama ve Kullanıcı Yönetimi (Flask-Login)



\### Hedef

Kullanıcı kayıt, giriş ve çıkış akışlarını şifre güvenliğini sağlayarak uçtan uca kurmak.



\### Kullandığım Mod ve Model

\- \*\*Mod:\*\* Plan Modu

\- \*\*Model:\*\* Claude Sonnet 4.6

\- \*\*Görünüm:\*\* Manager View



\### Verdiğim Promptlar

"User modeli hazır. `app/auth/` blueprint'ini doldur. Flask-WTF ile `RegisterForm` ve `LoginForm` oluştur. Şifreler mutlaka hash'lenmeli. Türkçe flash mesajları kullan."



\### Ajanın Önerdiği Plan

Sırasıyla formların yazılması, rotaların (routes) tanımlanması, Flask-Login entegrasyonu ve HTML şablonlarının oluşturulması planını sundu.



\### Plan'da Sorguladıklarım

Ajan, kullanıcının şifresini veritabanına kaydederken doğrudan düz metin olarak kaydetmeyi içeren bir fonksiyon yazmıştı. Bunun çok ciddi bir güvenlik açığı ve otomatik kalma sebebi olduğunu belirterek `werkzeug.security` kütüphanesindeki `generate\_password\_hash` metodunu zorunlu kıldım.



\### Üretilen Kodda Düzelttiklerim

Giriş yapmış olan bir kullanıcı tarayıcıdan el ile tekrar `/login` sayfasına gitmeye çalışırsa anasayfaya yönlendirilmesi için rotaya `if current\_user.is\_authenticated:` kontrolünü el ile ekledim.



\### Karşılaştığım Hatalar ve Çözümler

\- \*\*Hata:\*\* Giriş yaptıktan sonra `Method Not Allowed (405)` hatası aldım.

\- \*\*Çözüm:\*\* `routes.py` dosyasında rotanın sadece `GET` isteklerini kabul ettiğini gördüm; `methods=\['GET', 'POST']` olarak düzelttim.



\### Bu Oturumdan Öğrendiğim

Kullanıcı seanslarının tarayıcı çerezleri ile nasıl yönetildiğini ve şifre güvenliğinin (hashing) kriptografik önemini kavradım.



\---



\## Oturum 5: Jinja2 Şablonları ve Bootstrap 5 Entegrasyonu



\### Hedef

Uygulamanın en az 4 sayfadan oluşan arayüzünü Bootstrap kullanarak mobil uyumlu ve şık hale getirmek.



\### Kullandığım Mod ve Model

\- \*\*Mod:\*\* Fast Modu

\- \*\*Model:\*\* Claude Sonnet 4.6

\- \*\*Görünüm:\*\* Editor View



\### Verdiğim Promptlar

"Projem için `base.html` adında ana şablon oluştur. Bootstrap 5 CSS kütüphanesini CDN ile ekle. Giriş yapmış kullanıcıya göre navbar menüsünü dinamik olarak değiştir."



\### Ajanın Önerdeki Plan

Ana şablon tasarımı yapıp diğer alt sayfaların (`index.html`, `login.html` vb.) bu şablondan türemesini (Template Inheritance) sağlayacak kodları hazırladı.



\### Plan'da Sorguladıklarım

Fast modunda olmamıza rağmen üretilen form tasarımlarında CSRF korumasının eksik olduğunu fark ettim. Tüm formların içine `{{ form.csrf\_token }}` eklenmesini sağladım.



\### Üretilen Kodda Düzelttiklerim

Ajanın oluşturduğu Bootstrap navbar'ında mobil menü butonu (hamburger menu) JavaScript eksikliğinden çalışmıyordu. Bootstrap JS CDN linkini `base.html` dosyasının en altına el ile ekleyerek düzelttim.



\### Karşılaştığım Hatalar ve Çözümler

\- \*\*Hata:\*\* Flash mesajları sayfada kaybolmuyor veya üst üste yığılıyordu.

\- \*\*Çözüm:\*\* Bootstrap `alert-dismissible` sınıflarını kullanarak mesajların kapatılabilir olmasını sağladım.



\### Bu Oturumdan Öğrendiğim

Jinja2 şablon motoru sayesinde "DRY" (Don't Repeat Yourself) prensibine uyarak tek bir ana şablondan düzinelerce dinamik sayfa türetmeyi öğrendim.



\---



\## Oturum 6: CRUD İşlemleri ve Sayfalama (Pagination)



\### Hedef

Ana içerik modeli için Ekleme, Okuma, Güncelleme ve Silme (CRUD) rotalarını yazmak ve listeleme sayfasında pagination uygulamak.



\### Kullandığım Mod ve Model

\- \*\*Mod:\*\* Plan Modu

\- \*\*Model:\*\* Claude Sonnet 4.6

\- \*\*Görünüm:\*\* Manager View



\### Verdiğim Promptlar

"Giriş yapmış kullanıcıların yeni içerik ekleyebileceği, sadece kendi içeriklerini düzenleyip silebileceği CRUD rotalarını oluştur. Listeleme sayfasında sayfa başına 10 kayıt olacak şekilde pagination yap."



\### Ajanın Önerdiği Plan

`app/main/routes.py` içine gerekli rotaların yazılması, veritabanı sorgularına `.paginate()` eklenmesi ve HTML tarafında ileri/geri butonlarının tasarımı planlandı.



\### Plan'da Sorguladıklarım

Ajan, silme ve düzenleme rotalarında yetki kontrolü yapmamıştı. Yani bir kullanıcı başka bir kullanıcının içeriğini ID'sini tahmin ederek silebiliyordu. Ona yetki kontrolü (Owner Check) eklemesini, aksi halde HTTP 403 hatası dönmesini söyledim.



\### Üretilen Kodda Düzelttiklerim

Sayfalama butonlarının tasarımı Bootstrap 5 ile uyumsuzdu ve soluk görünüyordu. Sayfalama HTML kodlarındaki Bootstrap `pagination` class'larını el ile elden geçirdim.



\### Karşılaştığım Hatalar ve Çözümler

\- \*\*Hata:\*\* Olmayan bir sayfa numarasına gidildiğinde (`page=999`) 404 hatası yerine bomboş bir sayfa geliyordu.

\- \*\*Çözüm:\*\* `.paginate()` fonksiyonuna `error\_out=False` parametresini ekleterek bu durumu düzelttim.



\### Bu Oturumdan Öğrendiğim

Web uygulamalarında veri güvenliğinin (yetkilendirme) sadece sayfayı gizlemekle olmayacağını, backend rotalarında da sıkı denetim yapılması gerektiğini öğrendim.



\---



\## Oturum 7: Hata Yönetimi ve Son Güvenlik Gözden Geçirmesi



\### Hedef

Uygulamadaki 404 ve 500 hataları için özel sayfalar tasarlamak ve projeyi canlıya göndermeden önce güvenlik açığı taraması yapmak.



\### Kullandığım Mod ve Model

\- \*\*Mod:\*\* Plan Modu

\- \*\*Model:\*\* Claude Sonnet 4.6

\- \*\*Görünüm:\*\* Manager View



\### Verdiğim Promptlar

"Uygulamaya özel 404 ve 500 hata sayfaları ekle. Tüm kod tabanını CSRF, SQL Injection ve şifre saklama güvenliği açısından denetle ve bana rapor ver."



\### Ajanın Önerdiği Plan

Hata yakalayıcı (errorhandler) fonksiyonların blueprint'lere veya app factory'e kaydedilmesi ve ardından kodun statik analizi.



\### Plan'da Sorguladıklarım

Ajan güvenlik raporunda herhangi bir açık bulamadığını söyledi ancak ben veritabanı sorgularında ham (raw) SQL sorgusu yazıp yazmadığını tekrar kontrol etmesini talep ettim. SQLAlchemy ORM kullandığımız için SQL Injection riskinin zaten elendiğini doğruladık.



\### Üretilen Kodda Düzelttiklerim

Hata sayfalarında anasayfaya dönüş linki kırık kalmıştı (sert kodlanmış `/` yazılıydı). Bunu Flask standartlarına uygun olarak `url\_for('main.index')` şeklinde dinamik hale getirdim.



\### Karşılaştığım Hatalar ve Çözümler

\- \*\*Hata:\*\* Geliştirme ortamında (Debug=True) 500 hatası tetiklendiğinde özel sayfa yerine Flask'ın detaylı hata ekranı geliyordu.

\- \*\*Çözüm:\*\* Bunun normal bir davranış olduğunu, canlı ortamda (Debug=False) bizim yazdığımız sayfanın çalışacağını ajan yardımıyla doğruladım.



\### Bu Oturumdan Öğrendiğim

Kullanıcı deneyimini bozmamak adına hata yönetiminin önemini ve production/development (canlı/geliştirme) ortamları arasındaki yapılandırma farklarını kavradım.

