export interface SilivriNeighborhood {
  slug: string;
  name: string;
  displayName: string;
  zoneType: 'Sahil Bandı' | 'Silivri Merkez' | 'Kırsal & Müstakil Parsel' | 'Gelişim & Konut Bölgesi';
  distanceKm: number;
  postalCode: string;
  localContext: string;
  soilAndClimateNote: string;
  popularModelsNote: string;
  nearbySlugs: string[];
}

export const SILIVRI_NEIGHBORHOODS: SilivriNeighborhood[] = [
  {
    slug: 'akoren',
    name: 'Akören',
    displayName: 'Akören Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 18,
    postalCode: '34590',
    localContext: 'Silivri’nin kuzey aksında, geniş müstakil parselleri ve doğayla iç içe yaşam alanlarıyla öne çıkan Akören Mahallesi’nde tek katlı ve verandalı prefabrik ev talebi oldukça yüksektir.',
    soilAndClimateNote: 'Akören’in tarım ve kır karakterli zemin yapısında yüksek subasmanlı radye temel uygulaması ve kış aylarına uygun 10 cm çift taraflı Betopan + yüksek yoğunluklu EPS ısı yalıtımı önerilmektedir.',
    popularModelsNote: 'Akören arsalarında özellikle 70 m² – 120 m² arası 2+1 ve 3+1 geniş verandalı tek katlı prefabrik evler ile çelik bağ evleri tercih edilmektedir.',
    nearbySlugs: ['gazitepe', 'kadikoy', 'fener', 'kurfalli']
  },
  {
    slug: 'alibey',
    name: 'Alibey',
    displayName: 'Alibey Mahallesi',
    zoneType: 'Silivri Merkez',
    distanceKm: 1,
    postalCode: '34570',
    localContext: 'Yalçın Grup Mimarlık merkez ofisimizin de bulunduğu Alibey Mahallesi, Silivri ilçe merkezinin kalbi olup imarlı konut parselleri, kentsel dönüşüm ve anahtar teslim yapı projelerinin yoğunlaştığı bölgedir.',
    soilAndClimateNote: 'Merkezi imarlı parsellerde Silivri Belediyesi güncel imar yönetmeliğine uygun mimari/statik ruhsat çizimi ve zemin etüdüne dayalı radye jeneral temel uygulaması standart olarak yapılmaktadır.',
    popularModelsNote: 'Alibey bölgesinde modern cepheli dubleks prefabrik villalar, hafif çelik konutlar ve kat karşılığı betonarme projeler öne çıkmaktadır.',
    nearbySlugs: ['piri-mehmet-pasa', 'yeni', 'fatih', 'cumhuriyet']
  },
  {
    slug: 'alipasa',
    name: 'Alipaşa',
    displayName: 'Alipaşa Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 5,
    postalCode: '34570',
    localContext: 'D-100 karayolu ve TEM bağlantılarına yakın stratejik konumuyla hızla değerlenen Alipaşa Mahallesi, hem müstakil villa hem de anahtar teslim prefabrik ve çelik ev yatırımları için idealdir.',
    soilAndClimateNote: 'Alipaşa’da açık rüzgar koridorlarına karşı güçlendirilmiş galvaniz çelik çatı makasları ve ısıcamlı 70’lik seri PVC doğramalarla yüksek enerji verimliliği sağlanmaktadır.',
    popularModelsNote: 'Alipaşa’daki imarlı arsalarda 100 m² – 160 m² arası 3+1 tek katlı ve dubleks hafif çelik / prefabrik konut modelleri yoğun ilgi görmektedir.',
    nearbySlugs: ['mimarsinan', 'cumhuriyet', 'gazitepe', 'kavakli']
  },
  {
    slug: 'balaban',
    name: 'Balaban',
    displayName: 'Balaban (Çanta) Mahallesi',
    zoneType: 'Sahil Bandı',
    distanceKm: 14,
    postalCode: '34580',
    localContext: 'Çanta bölgesinin Marmara Denizi’ne bakan gözde yerleşimi Balaban Mahallesi, yaz-kış oturuma uygun müstakil bahçeli prefabrik ev ve villa projelerinin en yoğun yapıldığı lokasyonlardandır.',
    soilAndClimateNote: 'Marmara kıyı nemine ve deniz rüzgarlarına dayanıklı paslanmaz galvaniz taşıyıcı sistem, dış cephe silikonlu boya ve nem bariyerli çatı yalıtımı ile uzun ömürlü yapılar kurulmaktadır.',
    popularModelsNote: 'Balaban’da deniz manzaralı teraslı dubleks prefabrik evler ve 2+1 / 3+1 müstakil yazlık konutlar en çok tercih edilen modellerdir.',
    nearbySlugs: ['canta', 'sancaktepe', 'gumusyaka', 'semizkumlar']
  },
  {
    slug: 'bekirli',
    name: 'Bekirli',
    displayName: 'Bekirli Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 24,
    postalCode: '34590',
    localContext: 'Silivri’nin sakin, doğa ve tarım odaklı mahallelerinden Bekirli’de geniş bahçeli müstakil yaşam arayan arsa sahipleri için ekonomik ve hızlı kurulumlu prefabrik ev çözümleri sunuyoruz.',
    soilAndClimateNote: 'Kırsal parsel koşullarında nakliye, JCB ile indirme, zemin tesviyesi ve subasman betonu dahil tüm saha operasyonları Yalçın Grup Mimarlık ekibimizce tek elden yürütülmektedir.',
    popularModelsNote: 'Bekirli’de 45 m² – 90 m² arası 1+1 ve 2+1 ekonomik tek katlı prefabrik evler ile hobi/bağ evleri ön plandadır.',
    nearbySlugs: ['beyciler', 'buyuk-sinekli', 'kucuk-sinekli', 'buyuk-cavuslu']
  },
  {
    slug: 'beyciler',
    name: 'Beyciler',
    displayName: 'Beyciler Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 26,
    postalCode: '34590',
    localContext: 'Yeşil doğası ve müstakil köy yerleşimiyle bilinen Beyciler Mahallesi’nde dört mevsim oturuma uygun, yüksek ısı yalıtımlı prefabrik ve hafif çelik ev projeleri hayata geçiriyoruz.',
    soilAndClimateNote: 'Trakya iç kesim iklimine uygun kalın duvar paneli, taş yünü/EPS çatı izolasyonu ve drenajlı temel betonu uygulamaları standart olarak yapılmaktadır.',
    popularModelsNote: 'Beyciler’de 2+1 ve 3+1 verandalı tek katlı prefabrik konutlar ile çelik konstrüksiyon müstakil evler öne çıkmaktadır.',
    nearbySlugs: ['bekirli', 'cayirdere', 'sayalar', 'buyuk-sinekli']
  },
  {
    slug: 'buyuk-cavuslu',
    name: 'Büyük Çavuşlu',
    displayName: 'Büyük Çavuşlu Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 22,
    postalCode: '34590',
    localContext: 'Silivri’nin köklü ve geniş yerleşimlerinden Büyük Çavuşlu, hem köy içi imarlı parselleri hem de çevresindeki müstakil arsalarıyla prefabrik ev ve villa inşaatında en aktif bölgelerdendir.',
    soilAndClimateNote: 'Büyük Çavuşlu’nun geniş düz arazilerinde radye temel, bahçe duvarı, foseptik/altyapı ve anahtar teslim kurulum süreçlerini hızlıca tamamlıyoruz.',
    popularModelsNote: 'Büyük Çavuşlu’da 80 m² – 140 m² arası 2+1, 3+1 tek katlı ve dubleks prefabrik evler sıklıkla inşa edilmektedir.',
    nearbySlugs: ['bekirli', 'kucuk-sinekli', 'seymen', 'kurfalli']
  },
  {
    slug: 'buyuk-kilicli',
    name: 'Büyük Kılıçlı',
    displayName: 'Büyük Kılıçlı Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 17,
    postalCode: '34590',
    localContext: 'Silivri merkeze makul mesafede, huzurlu kırsal atmosferi koruyan Büyük Kılıçlı Mahallesi’nde müstakil yaşam için modern prefabrik ve hafif çelik evler kuruyoruz.',
    soilAndClimateNote: 'Eğimli ve düz parsellerde zemin etüdüne uygun istinat/bahçe duvarı ve subasman betonu dökülerek yapının statik güvenliği garanti altına alınır.',
    popularModelsNote: 'Büyük Kılıçlı’da geniş salonlu 2+1 ve 3+1 tek katlı prefabrik evler ile tiny house modelleri rağbet görmektedir.',
    nearbySlugs: ['kucuk-kilicli', 'seymen', 'yolcati', 'fener']
  },
  {
    slug: 'buyuk-sinekli',
    name: 'Büyük Sinekli',
    displayName: 'Büyük Sinekli Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 28,
    postalCode: '34590',
    localContext: 'Silivri’nin kuzeybatısında doğayla iç içe bir yaşam sunan Büyük Sinekli Mahallesi’nde, arsanıza özel ruhsatlı ve anahtar teslim prefabrik ev yapımı gerçekleştiriyoruz.',
    soilAndClimateNote: 'Kış şartlarının sert geçebildiği kuzey kesimlerde güçlendirilmiş kar yükü hesaplı çelik çatı ve yüksek yalıtımlı dış cephe sistemleri uygulanmaktadır.',
    popularModelsNote: 'Büyük Sinekli’de 60 m² – 110 m² arası tek katlı 2+1 ve 3+1 prefabrik evler en çok tercih edilen seçeneklerdir.',
    nearbySlugs: ['kucuk-sinekli', 'bekirli', 'beyciler', 'danamandira']
  },
  {
    slug: 'canta',
    name: 'Çanta',
    displayName: 'Çanta Bölgesi (Balaban & Sancaktepe)',
    zoneType: 'Sahil Bandı',
    distanceKm: 13,
    postalCode: '34580',
    localContext: 'Silivri’nin en popüler sahil ve yazlık/kışlık yerleşim merkezlerinden Çanta’da (Balaban ve Sancaktepe mahalleleri), modern prefabrik ev, hafif çelik villa ve betonarme konut projeleri yapıyoruz.',
    soilAndClimateNote: 'Çanta bölgesinde hem E-5 ulaşım kolaylığı hem de sahil iklimine uygun dış cephe koruma, su yalıtımı ve radye temel mühendisliği ile anahtar teslim kurulum sağlıyoruz.',
    popularModelsNote: 'Çanta’da 100 m² – 160 m² arası dubleks prefabrik villalar, 3+1 tek katlı bahçeli evler ve hafif çelik konutlar çok tercih edilmektedir.',
    nearbySlugs: ['balaban', 'sancaktepe', 'gumusyaka', 'semizkumlar']
  },
  {
    slug: 'cumhuriyet',
    name: 'Cumhuriyet',
    displayName: 'Cumhuriyet Mahallesi',
    zoneType: 'Silivri Merkez',
    distanceKm: 2,
    postalCode: '34570',
    localContext: 'Silivri merkezinin düzenli yerleşim alanlarından Cumhuriyet Mahallesi’nde, mimari projelendirme, kentsel dönüşüm ve imarlı arsalara modern prefabrik/çelik konut uygulamaları yapıyoruz.',
    soilAndClimateNote: 'Belediye imar planına tam uyumlu ruhsat, statik proje, zemin betonu ve ince işçilik süreçleri ofisimizce eksiksiz yönetilmektedir.',
    popularModelsNote: 'Cumhuriyet Mahallesi’nde estetik cepheli dubleks çelik evler ve 3+1 aile konutları ön plandadır.',
    nearbySlugs: ['alibey', 'alipasa', 'mimarsinan', 'yeni']
  },
  {
    slug: 'cayirdere',
    name: 'Çayırdere',
    displayName: 'Çayırdere Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 30,
    postalCode: '34590',
    localContext: 'Orman havası ve doğa manzarasıyla öne çıkan Çayırdere Mahallesi’nde, hafta sonu evi veya dört mevsim müstakil yaşam için yüksek yalıtımlı prefabrik ve bungalov tipi konutlar inşa ediyoruz.',
    soilAndClimateNote: 'Yüksek rakımlı ve serin iklim yapısına uygun ekstra çatı/duvar izolasyonu ve sağlam radye subasman betonu uygulanmaktadır.',
    popularModelsNote: 'Çayırdere’de 50 m² – 100 m² arası ahşap görünümlü prefabrik evler, tiny house ve 2+1 verandalı modeller popülerdir.',
    nearbySlugs: ['sayalar', 'beyciler', 'danamandira', 'fener']
  },
  {
    slug: 'celtik',
    name: 'Çeltik',
    displayName: 'Çeltik Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 19,
    postalCode: '34590',
    localContext: 'Silivri’nin geniş verimli arazilerine komşu Çeltik Mahallesi’nde, imarlı köy içi arsalarınıza kısa sürede anahtar teslim prefabrik ve hafif çelik ev kurulumu yapıyoruz.',
    soilAndClimateNote: 'Zemin taşıma değerine göre projelendirilen radye temel, drenaj kanalları ve kaliteli ince şap/seramik işçiliği ile sorunsuz teslimat sağlıyoruz.',
    popularModelsNote: 'Çeltik’te 70 m² – 120 m² arası 2+1 ve 3+1 tek katlı prefabrik evler sıklıkla tercih edilmektedir.',
    nearbySlugs: ['seymen', 'yolcati', 'buyuk-kilicli', 'degirmenkoy']
  },
  {
    slug: 'danamandira',
    name: 'Danamandıra',
    displayName: 'Danamandıra Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 34,
    postalCode: '34590',
    localContext: 'Tabiat parkı ve göletleriyle İstanbul’un en huzurlu doğa köşelerinden Danamandıra’da, doğayla uyumlu modern prefabrik ev, çelik villa ve tiny house projeleri üretiyoruz.',
    soilAndClimateNote: 'Orman iklimi ve kış nemine karşı yüksek yoğunluklu ısı yalıtımı, nefes alan dış cephe kaplaması ve subasman izolasyonu uygulanmaktadır.',
    popularModelsNote: 'Danamandıra’da verandalı 2+1 prefabrik evler, doğa içi tiny house modelleri ve çift katlı çelik bağ evleri ilgi görmektedir.',
    nearbySlugs: ['sayalar', 'cayirdere', 'buyuk-sinekli', 'kucuk-sinekli']
  },
  {
    slug: 'degirmenkoy',
    name: 'Değirmenköy',
    displayName: 'Değirmenköy (Fevzipaşa & İsmetpaşa)',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 18,
    postalCode: '34584',
    localContext: 'Silivri’nin en büyük yerleşim ve tarım/sanayi merkezlerinden Değirmenköy’de (Fevzipaşa ve İsmetpaşa mahalleleri), prefabrik ev yapımı, çelik villa ve endüstriyel yapı inşaatında tam kapsamlı hizmet veriyoruz.',
    soilAndClimateNote: 'Değirmenköy’deki geniş konut parsellerinde ruhsat takibi, zemin betonu, bahçe duvarı, nakliye, JCB indirme ve anahtar teslim ince işçilik tek sözleşmeyle yürütülmektedir.',
    popularModelsNote: 'Değirmenköy’de 86 m² – 150 m² arası 2+1, 3+1 tek katlı ve dubleks prefabrik evler en yoğun talep gören modellerdir.',
    nearbySlugs: ['fevzipasa', 'ismetpasa', 'gumusyaka', 'celtik']
  },
  {
    slug: 'fatih',
    name: 'Fatih',
    displayName: 'Fatih Mahallesi',
    zoneType: 'Silivri Merkez',
    distanceKm: 1,
    postalCode: '34570',
    localContext: 'Silivri merkezinin köklü yerleşimi Fatih Mahallesi’nde mimarlık, kentsel dönüşüm, ruhsatlı bina tadilatı ve imarlı arsalara modern konut inşaatı hizmetleri sunuyoruz.',
    soilAndClimateNote: 'Merkezi yapılaşma kurallarına ve deprem yönetmeliğine tam uyumlu statik mühendislik ve kaliteli malzeme standartlarıyla projeler üretiyoruz.',
    popularModelsNote: 'Fatih Mahallesi’nde dubleks çelik/prefabrik konutlar ve kat karşılığı betonarme yapılar öne çıkmaktadır.',
    nearbySlugs: ['alibey', 'piri-mehmet-pasa', 'yeni', 'mimarsinan']
  },
  {
    slug: 'fener',
    name: 'Fener',
    displayName: 'Fener (Fenerköy) Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 12,
    postalCode: '34590',
    localContext: 'Halk arasında Fenerköy olarak bilinen Fener Mahallesi, Silivri merkeze yakınlığı ve nezih müstakil villa/arsa dokusuyla prefabrik ve hafif çelik ev projelerinin gözde adresidir.',
    soilAndClimateNote: 'Fenerköy parsellerinde radye temel, çevre düzenlemesi, istinat duvarı ve anahtar teslim montaj süreçleri mühendislik kontrolünde gerçekleştirilir.',
    popularModelsNote: 'Fener’de 90 m² – 160 m² arası modern 3+1 tek katlı ve dubleks prefabrik villalar yoğun olarak tercih edilmektedir.',
    nearbySlugs: ['kurfalli', 'akoren', 'buyuk-kilicli', 'ortakoy']
  },
  {
    slug: 'fevzipasa',
    name: 'Fevzipaşa',
    displayName: 'Fevzipaşa (Değirmenköy) Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 18,
    postalCode: '34584',
    localContext: 'Değirmenköy’ün merkezi mahallelerinden Fevzipaşa’da, imarlı konut arsalarınız için fabrika üretimli ve anahtar teslim prefabrik ev ve hafif çelik yapı çözümleri sunuyoruz.',
    soilAndClimateNote: 'Ruhsat projesinden temel betonuna, parke-fayans uygulamasından mutfak dolabı ve vitrifiyeye kadar tüm kalemler Yalçın Grup Mimarlık taahhüdüyle tamamlanır.',
    popularModelsNote: 'Fevzipaşa’da 2+1 ve 3+1 tek katlı ekonomik/lüks prefabrik evler ile dubleks modeller tercih edilmektedir.',
    nearbySlugs: ['degirmenkoy', 'ismetpasa', 'gumusyaka', 'celtik']
  },
  {
    slug: 'gazitepe',
    name: 'Gazitepe',
    displayName: 'Gazitepe Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 9,
    postalCode: '34590',
    localContext: 'Silivri merkeze yalnızca birkaç dakika mesafede bulunan Gazitepe Mahallesi, son yılların en çok yatırım alan müstakil villa ve prefabrik ev bölgelerinden biridir.',
    soilAndClimateNote: 'Gazitepe’nin yükselen konut alanlarında yüksek yalıtımlı çelik/prefabrik sistemler, radye temel ve modern peyzaj/bahçe duvarı uygulamaları yapıyoruz.',
    popularModelsNote: 'Gazitepe’de 100 m² – 180 m² arası 3+1 ve 4+1 lüks dubleks prefabrik evler ile hafif çelik villalar öne çıkmaktadır.',
    nearbySlugs: ['akoren', 'kadikoy', 'alipasa', 'fener']
  },
  {
    slug: 'gumusyaka',
    name: 'Gümüşyaka',
    displayName: 'Gümüşyaka Mahallesi',
    zoneType: 'Sahil Bandı',
    distanceKm: 20,
    postalCode: '34588',
    localContext: 'Geniş kumsalı, yazlık siteleri ve müstakil bahçeli arsalarıyla bilinen Gümüşyaka Mahallesi’nde yaz-kış yaşanabilir modern prefabrik ev, çelik villa ve anahtar teslim inşaat yapıyoruz.',
    soilAndClimateNote: 'Deniz kenarı nem ve tuzlu rüzgar etkisine karşı galvanizli korozyon dirençli yapı sistemi, dış cephe boyası ve ısı/su yalıtımı standart olarak uygulanır.',
    popularModelsNote: 'Gümüşyaka’da 70 m² – 150 m² arası geniş balkonlu dubleks prefabrik villalar ve 2+1 / 3+1 müstakil yazlık evler çok popülerdir.',
    nearbySlugs: ['canta', 'balaban', 'degirmenkoy', 'sancaktepe']
  },
  {
    slug: 'hurriyet',
    name: 'Hürriyet',
    displayName: 'Hürriyet (Kavaklı) Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 8,
    postalCode: '34570',
    localContext: 'Kavaklı bölgesinin gelişen yerleşim alanı Hürriyet Mahallesi’nde, hem müstakil aile konutları hem de sanayi/ticari yapı yakınındaki konut parselleri için prefabrik ve çelik evler kuruyoruz.',
    soilAndClimateNote: 'Ruhsatlı proje çizimi, radye temel betonu, ince şap ve anahtar teslim iç dekorasyon hizmetlerini tek elden sunuyoruz.',
    popularModelsNote: 'Hürriyet’te 80 m² – 130 m² arası 2+1 ve 3+1 tek katlı prefabrik evler ve hafif çelik yapılar tercih edilmektedir.',
    nearbySlugs: ['kavakli', 'ortakoy', 'selimpasa', 'alipasa']
  },
  {
    slug: 'ismetpasa',
    name: 'İsmetpaşa',
    displayName: 'İsmetpaşa (Değirmenköy) Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 19,
    postalCode: '34584',
    localContext: 'Değirmenköy’ün sakin ve düzenli yerleşim bölgesi İsmetpaşa Mahallesi’nde, müstakil bahçeli prefabrik ev yapımı ve anahtar teslim inşaat taahhüt hizmetleri veriyoruz.',
    soilAndClimateNote: 'Zemin etüdü, temel betonu, nakliye, vinç/JCB ile indirme ve uzman montaj ekibi organizasyonu eksiksiz şekilde tarafımızdan yürütülür.',
    popularModelsNote: 'İsmetpaşa’da 2+1 ve 3+1 geniş mutfaklı tek katlı prefabrik evler ile dubleks aile evleri öne çıkmaktadır.',
    nearbySlugs: ['degirmenkoy', 'fevzipasa', 'celtik', 'gumusyaka']
  },
  {
    slug: 'kadikoy',
    name: 'Kadıköy',
    displayName: 'Kadıköy Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 11,
    postalCode: '34590',
    localContext: 'Silivri’nin hızla değer kazanan doğa içi yerleşimlerinden Kadıköy Mahallesi’nde, müstakil arsalarınıza modern, depreme dayanıklı prefabrik ve çelik evler inşa ediyoruz.',
    soilAndClimateNote: 'Bölgenin hafif eğimli parsellerinde istinat duvarı, subasman radye temel ve dört mevsim yalıtımlı panel sistemleriyle uzun ömürlü yapılar teslim ediyoruz.',
    popularModelsNote: 'Kadıköy’de 75 m² – 140 m² arası verandalı 2+1 / 3+1 prefabrik evler ve çelik villalar yoğun ilgi görmektedir.',
    nearbySlugs: ['gazitepe', 'akoren', 'ortakoy', 'kavakli']
  },
  {
    slug: 'kavakli',
    name: 'Kavaklı',
    displayName: 'Kavaklı (İstiklal) Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 7,
    postalCode: '34570',
    localContext: 'Silivri’nin doğu kapısında, TEM otoyolu ve şehir bağlantısıyla çok tercih edilen Kavaklı’da (İstiklal ve Hürriyet), anahtar teslim prefabrik ev, villa inşaatı ve mimarlık hizmetleri sunuyoruz.',
    soilAndClimateNote: 'Kavaklı’nın imarlı konut parsellerinde belediye ruhsatı, statik hesap, radye temel ve 1. sınıf ince işçilikle anahtar teslim projeler üretiyoruz.',
    popularModelsNote: 'Kavaklı’da 100 m² – 160 m² arası 3+1 tek katlı ve çift katlı prefabrik/çelik villalar öne çıkmaktadır.',
    nearbySlugs: ['hurriyet', 'ortakoy', 'selimpasa', 'alipasa']
  },
  {
    slug: 'kurfalli',
    name: 'Kurfallı',
    displayName: 'Kurfallı Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 16,
    postalCode: '34590',
    localContext: 'Doğal güzellikleri ve sakin yaşamıyla bilinen Kurfallı Mahallesi’nde, arsa sahiplerine özel anahtar teslim prefabrik ev ve hafif çelik konut projeleri gerçekleştiriyoruz.',
    soilAndClimateNote: 'Kırsal parsel altyapısı, zemin betonu, bahçe duvarı ve yüksek ısı yalıtımlı prefabrik kurulumu tek çatı altında tamamlanmaktadır.',
    popularModelsNote: 'Kurfallı’da 65 m² – 115 m² arası 2+1 ve 3+1 tek katlı prefabrik evler ile bağ evleri çok tercih edilmektedir.',
    nearbySlugs: ['fener', 'akoren', 'buyuk-cavuslu', 'buyuk-kilicli']
  },
  {
    slug: 'kucuk-kilicli',
    name: 'Küçük Kılıçlı',
    displayName: 'Küçük Kılıçlı Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 15,
    postalCode: '34590',
    localContext: 'Silivri merkeze kolay ulaşımı ve huzurlu ortamıyla öne çıkan Küçük Kılıçlı Mahallesi’nde modern prefabrik ev yapımı ve müstakil villa inşaatı hizmetleri veriyoruz.',
    soilAndClimateNote: 'Zemin etüdüne uygun temel betonu, ince şap, parke, seramik ve mutfak dolabı dahil anahtar teslim çözümler sunuyoruz.',
    popularModelsNote: 'Küçük Kılıçlı’da 2+1 ve 3+1 tek katlı verandalı prefabrik evler ile çelik konstrüksiyon konutlar popülerdir.',
    nearbySlugs: ['buyuk-kilicli', 'fener', 'yolcati', 'seymen']
  },
  {
    slug: 'kucuk-sinekli',
    name: 'Küçük Sinekli',
    displayName: 'Küçük Sinekli Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 25,
    postalCode: '34590',
    localContext: 'Geniş yeşil alanları ve müstakil yaşam potansiyeliyle Küçük Sinekli Mahallesi’nde, ekonomik ve hızlı teslim edilen depreme dayanıklı prefabrik evler kuruyoruz.',
    soilAndClimateNote: 'Kış koşullarına uygun güçlendirilmiş yalıtım, çelik çatı makası ve tam donanımlı tesisat sistemleriyle dört mevsim konfor sağlıyoruz.',
    popularModelsNote: 'Küçük Sinekli’de 50 m² – 100 m² arası 1+1 ve 2+1 prefabrik evler ile ekonomik müstakil modeller ilgi görmektedir.',
    nearbySlugs: ['buyuk-sinekli', 'bekirli', 'buyuk-cavuslu', 'danamandira']
  },
  {
    slug: 'mimarsinan',
    name: 'Mimar Sinan',
    displayName: 'Mimar Sinan Mahallesi',
    zoneType: 'Silivri Merkez',
    distanceKm: 3,
    postalCode: '34570',
    localContext: 'Silivri’nin en modern ve planlı gelişen bölgelerinden Mimar Sinan Mahallesi’nde, lüks villa inşaatı, mimari projelendirme ve estetik dubleks prefabrik/çelik konut projeleri yapıyoruz.',
    soilAndClimateNote: 'Modern şehircilik standartlarına uygun mimari cephe tasarımı, ruhsat, radye temel ve anahtar teslim lüks ince işçilikle fark yaratıyoruz.',
    popularModelsNote: 'Mimar Sinan’da 120 m² – 200 m² arası çift katlı hafif çelik villalar ve modern dubleks prefabrik evler tercih edilmektedir.',
    nearbySlugs: ['cumhuriyet', 'alipasa', 'yeni', 'semizkumlar']
  },
  {
    slug: 'ortakoy',
    name: 'Ortaköy',
    displayName: 'Ortaköy Mahallesi',
    zoneType: 'Gelişim & Konut Bölgesi',
    distanceKm: 10,
    postalCode: '34570',
    localContext: 'Silivri’nin hem sanayi hem de müstakil konut anlamında en dinamik mahallelerinden Ortaköy’de, anahtar teslim prefabrik ev, hafif çelik villa ve ticari yapı inşaatı yapıyoruz.',
    soilAndClimateNote: 'Ortaköy parsellerinde hızlı şantiye erişimi sayesinde ruhsat, temel betonu, nakliye ve montaj süreçlerini en kısa sürede tamamlıyoruz.',
    popularModelsNote: 'Ortaköy’de 85 m² – 150 m² arası 2+1, 3+1 tek katlı ve dubleks prefabrik evler ile prefabrik ofis çözümleri çok talep görmektedir.',
    nearbySlugs: ['selimpasa', 'kavakli', 'hurriyet', 'kadikoy']
  },
  {
    slug: 'piri-mehmet-pasa',
    name: 'Piri Mehmet Paşa',
    displayName: 'Piri Mehmet Paşa Mahallesi',
    zoneType: 'Silivri Merkez',
    distanceKm: 1,
    postalCode: '34570',
    localContext: 'Silivri’nin tarihi ve ticari merkezi Piri Mehmet Paşa Mahallesi’nde mimarlık ofisi hizmetleri, kentsel dönüşüm, kat karşılığı inşaat ve bina yenileme projeleri yürütüyoruz.',
    soilAndClimateNote: 'Merkezi imar mevzuatına tam uyumlu statik güçlendirme, kentsel dönüşüm danışmanlığı ve ruhsat süreçlerini uzman mimar ve mühendislerimizle yönetiyoruz.',
    popularModelsNote: 'Piri Mehmet Paşa ve yakın çevresinde kentsel dönüşüm projeleri, dubleks konutlar ve ticari mekan tasarımları öne çıkmaktadır.',
    nearbySlugs: ['alibey', 'fatih', 'yeni', 'cumhuriyet']
  },
  {
    slug: 'sancaktepe',
    name: 'Sancaktepe',
    displayName: 'Sancaktepe (Çanta) Mahallesi',
    zoneType: 'Sahil Bandı',
    distanceKm: 13,
    postalCode: '34580',
    localContext: 'Çanta bölgesinin hızla gelişen yerleşimi Sancaktepe Mahallesi’nde, müstakil bahçeli arsalarınıza yaz-kış kullanıma uygun modern prefabrik ve çelik evler inşa ediyoruz.',
    soilAndClimateNote: 'Marmara sahil iklimine uygun yalıtımlı cephe panelleri, radye temel ve anahtar teslim iç mekan donanımlarıyla eksiksiz teslimat yapıyoruz.',
    popularModelsNote: 'Sancaktepe’de 80 m² – 145 m² arası 2+1 ve 3+1 tek katlı veya dubleks prefabrik evler yoğun ilgi görmektedir.',
    nearbySlugs: ['canta', 'balaban', 'semizkumlar', 'gumusyaka']
  },
  {
    slug: 'sayalar',
    name: 'Sayalar',
    displayName: 'Sayalar Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 32,
    postalCode: '34590',
    localContext: 'Silivri’nin temiz havası ve doğal dokusuyla sevilen Sayalar Mahallesi’nde, doğayla uyumlu, ekonomik ve yüksek yalıtımlı prefabrik ev yapımı gerçekleştiriyoruz.',
    soilAndClimateNote: 'Kuzey Trakya rüzgar ve kış şartlarına uygun güçlendirilmiş çatı izolasyonu, çift camlı PVC pencereler ve sağlam subasman betonu uygulanmaktadır.',
    popularModelsNote: 'Sayalar’da 55 m² – 105 m² arası 2+1 verandalı prefabrik evler ve doğa içi çelik bağ evleri tercih edilmektedir.',
    nearbySlugs: ['danamandira', 'cayirdere', 'beyciler', 'buyuk-sinekli']
  },
  {
    slug: 'selimpasa',
    name: 'Selimpaşa',
    displayName: 'Selimpaşa Mahallesi',
    zoneType: 'Sahil Bandı',
    distanceKm: 11,
    postalCode: '34590',
    localContext: 'İstanbul’a en yakın sahil beldelerinden Selimpaşa Mahallesi’nde, lüks villa inşaatı, anahtar teslim prefabrik ev, hafif çelik konut ve mimari projelendirme alanında lider çözümler sunuyoruz.',
    soilAndClimateNote: 'Selimpaşa sahil şeridi ve yamaç parsellerinde deniz nemine dirençli galvaniz karkas, yüksek yalıtımlı cephe ve radye jeneral temel mühendisliği uyguluyoruz.',
    popularModelsNote: 'Selimpaşa’da 100 m² – 180 m² arası deniz manzaralı dubleks prefabrik villalar, 3+1 modern tek katlı evler ve hafif çelik villalar en çok tercih edilen modellerdir.',
    nearbySlugs: ['ortakoy', 'kavakli', 'hurriyet', 'alibey']
  },
  {
    slug: 'semizkumlar',
    name: 'Semizkumlar',
    displayName: 'Semizkumlar Mahallesi',
    zoneType: 'Sahil Bandı',
    distanceKm: 7,
    postalCode: '34570',
    localContext: 'Silivri’nin en gözde sahil şeritlerinden Semizkumlar Mahallesi’nde, plaja yürüme mesafesindeki arsalarınıza estetik, hızlı kurulumlu ve dört mevsim yaşanabilir prefabrik ve çelik evler kuruyoruz.',
    soilAndClimateNote: 'Kıyı şeridi zemin yapısına özel zemin etüdü, su yalıtımlı radye temel ve deniz iklimine dayanıklı dış cephe boya/kaplama sistemleri kullanılmaktadır.',
    popularModelsNote: 'Semizkumlar’da 80 m² – 150 m² arası teraslı dubleks prefabrik yazlıklar ve 2+1 / 3+1 modern tek katlı evler yoğun talep görmektedir.',
    nearbySlugs: ['mimarsinan', 'canta', 'balaban', 'sancaktepe']
  },
  {
    slug: 'seymen',
    name: 'Seymen',
    displayName: 'Seymen Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 16,
    postalCode: '34590',
    localContext: 'Geniş tarım ve müstakil yerleşim parselleriyle bilinen Seymen Mahallesi’nde, arsanıza özel ruhsatlı, zemin betonu ve ince işçiliği dahil anahtar teslim prefabrik ev yapımı sunuyoruz.',
    soilAndClimateNote: 'Seymen’in düz ve geniş arazilerinde nakliye, JCB vinç operasyonu, radye temel ve çevre duvarı işleri hızlı ve ekonomik şekilde tamamlanır.',
    popularModelsNote: 'Seymen’de 70 m² – 120 m² arası 2+1 ve 3+1 tek katlı prefabrik evler ve hafif çelik konutlar öne çıkmaktadır.',
    nearbySlugs: ['celtik', 'buyuk-kilicli', 'buyuk-cavuslu', 'yolcati']
  },
  {
    slug: 'yeni',
    name: 'Yeni',
    displayName: 'Yeni Mahalle',
    zoneType: 'Silivri Merkez',
    distanceKm: 1,
    postalCode: '34570',
    localContext: 'Silivri merkezinin yerleşik konut bölgelerinden Yeni Mahalle’de, mimari tasarım, kentsel dönüşüm, müstakil konut inşaatı ve modern çelik/prefabrik yapı çözümleri üretiyoruz.',
    soilAndClimateNote: 'Merkez ofisimize yürüme mesafesindeki Yeni Mahalle’de imar durumu incelemesi, ruhsat ve şantiye kontrolü en hızlı şekilde sağlanmaktadır.',
    popularModelsNote: 'Yeni Mahalle’de modern dubleks çelik evler, 3+1 konutlar ve kat karşılığı inşaat projeleri tercih edilmektedir.',
    nearbySlugs: ['alibey', 'piri-mehmet-pasa', 'fatih', 'cumhuriyet']
  },
  {
    slug: 'yolcati',
    name: 'Yolçatı',
    displayName: 'Yolçatı Mahallesi',
    zoneType: 'Kırsal & Müstakil Parsel',
    distanceKm: 14,
    postalCode: '34590',
    localContext: 'Silivri merkeze yakınlığı ve sakin müstakil yapısıyla öne çıkan Yolçatı Mahallesi’nde, bütçenize uygun anahtar teslim prefabrik ev ve hafif çelik villa projeleri gerçekleştiriyoruz.',
    soilAndClimateNote: 'Yolçatı parsellerinde zemin tesviyesi, radye temel, ince şap, parke-fayans ve mutfak dolabı dahil eksiksiz anahtar teslim taahhüt sunuyoruz.',
    popularModelsNote: 'Yolçatı’da 65 m² – 120 m² arası 2+1 ve 3+1 tek katlı prefabrik evler en çok tercih edilen modellerdir.',
    nearbySlugs: ['seymen', 'celtik', 'buyuk-kilicli', 'kucuk-kilicli']
  }
];

export function getSilivriNeighborhoodBySlug(slug: string): SilivriNeighborhood | undefined {
  return SILIVRI_NEIGHBORHOODS.find((n) => n.slug === slug);
}
