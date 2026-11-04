const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

const rootDir = __dirname;
const deployDir = path.join(rootDir, 'deploy_package');

console.log('--- Hosting Dağıtım Paketi Hazırlanıyor ---');

// 1. Temizle veya oluştur
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// 2. Standalone çekirdeğini kopyala
const standaloneDir = path.join(rootDir, '.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
  console.log('1. Standalone Node.js çekirdeği kopyalanıyor...');
  copyFolderSync(standaloneDir, deployDir);
}

// 3. Statik varlıkları (.next/static) kopyala
console.log('2. .next/static varlıkları yerleştiriliyor...');
const staticSource = path.join(rootDir, '.next', 'static');
const staticDest = path.join(deployDir, '.next', 'static');
copyFolderSync(staticSource, staticDest);

// 4. public klasörünü kopyala
console.log('3. public/ medyaları yerleştiriliyor...');
const publicSource = path.join(rootDir, 'public');
const publicDest = path.join(deployDir, 'public');
copyFolderSync(publicSource, publicDest);

// 5. data/ (veritabanı json dosyaları) kopyala
console.log('4. data/ (blog, kategoriler, prefabrik, ayarlar) kopyalanıyor...');
const dataSource = path.join(rootDir, 'data');
const dataDest = path.join(deployDir, 'data');
copyFolderSync(dataSource, dataDest);

// 6. .htaccess dosyasını kopyala
if (fs.existsSync(path.join(rootDir, '.htaccess'))) {
  fs.copyFileSync(path.join(rootDir, '.htaccess'), path.join(deployDir, '.htaccess'));
}

// 7. cPanel / Passenger uyumlu server.js oluştur/kontrol et
const passengerServerJs = `const path = require('path');

// Port ve Host ayarları
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Next.js standalone server başlatıcı
require('./server.js');
`;
fs.writeFileSync(path.join(deployDir, 'passenger_server.js'), passengerServerJs, 'utf8');

// 8. Hosting için Kurulum Kılavuzu oluştur
const readmeContent = `# Yalçın Grup Mimarlık - Web Hosting Yükleme Kılavuzu

Bu klasör, sitenizi cPanel, Plesk, VPS veya herhangi bir Node.js destekli hostinge yüklemek için tamamen hazır hale getirilmiş dağıtım paketidir.

---

## 1. cPanel (Setup Node.js App) İle Yükleme (Önerilen)

1. **Dosyaları Yükleyin:**
   * Bu klasörün içindeki tüm dosyaları cPanel Dosya Yöneticisi (File Manager) ile sitenizin ana dizinine (genellikle \`public_html\` veya \`subdomain\` klasörünüze) yükleyin.
   * *(İpucu: Bu klasörü zip yapıp cPanel'de "Extract / Çıkart" diyebilirsiniz).*

2. **cPanel'de Node.js Uygulaması Oluşturun:**
   * cPanel ana menüsünden **"Setup Node.js App"** (Node.js Uygulama Yöneticisi) sayfasına girin.
   * **"Create Application"** butonuna tıklayın.
   * **Node.js Version:** 18.x veya 20.x seçin.
   * **Application Mode:** \`Production\` seçin.
   * **Application Root:** Dosyaları yüklediğiniz dizin (örn: \`public_html\`).
   * **Application URL:** Domain adınızı seçin (örn: \`yalcingrupmimarlik.com\`).
   * **Application Startup File:** \`server.js\` yazın.
   * **"Create"** butonuna basarak uygulamayı oluşturun.

3. **Uygulamayı Başlatın:**
   * Uygulama oluştuktan sonra sayfanın üstündeki **"Restart"** veya **"Start"** butonuna basın.
   * Siteniz artık canlıda çalışacaktır!

---

## 2. VPS / VDS / Ubuntu (PM2 & Nginx) İle Yükleme

Eğer sanal sunucu (VPS) kullanıyorsanız:
\`\`\`bash
# Klasöre girin
cd /var/www/yalcingrupmimarlik

# PM2 ile uygulamayı arka planda başlatın
pm2 start server.js --name "yalcin-grup"

# PM2 durumunu kaydedin (sunucu yeniden başlasa da çalışması için)
pm2 save
pm2 startup
\`\`\`

---

## 3. Yönetim Paneli Girişi:
* Panel Adresi: \`https://yalcingrupmimarlik.com/admin/login/\`
* Kullanıcı Adı: \`admin\`
* Şifre: \`yalcin2026admin\`
`;

fs.writeFileSync(path.join(deployDir, 'KURULUM_KILAVUZU.md'), readmeContent, 'utf8');

console.log('\\n[BAŞARILI] Dağıtım paketi hazırlandı: ' + deployDir);
