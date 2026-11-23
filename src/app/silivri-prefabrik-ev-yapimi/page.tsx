import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SILIVRI_NEIGHBORHOODS } from '@/lib/silivri-neighborhoods';
import { getPrefabrikHouses, getSettings } from '@/lib/db';
import {
  MapPin,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Wrench,
  PhoneCall,
  Tag,
  HelpCircle,
  ChevronRight,
  Home
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Silivri Prefabrik Ev Yapımı ve Fiyatları (Tüm 35 Mahalle)',
  description:
    'Silivri ve tüm 35 mahallesinde anahtar teslim prefabrik ev yapımı, hafif çelik villa, ruhsat, zemin betonu ve kurulum. Selimpaşa, Gümüşyaka, Çanta, Değirmenköy, Ortaköy, Kavaklı prefabrik ev fiyatları.',
  keywords: [
    'Silivri prefabrik ev yapımı',
    'Silivri prefabrik ev fiyatları',
    'Silivri prefabrik ev firmaları',
    'Silivri anahtar teslim prefabrik ev',
    'Silivri hafif çelik ev',
    'Selimpaşa prefabrik ev',
    'Gümüşyaka prefabrik ev',
    'Değirmenköy prefabrik ev',
    'Çanta prefabrik ev',
    'Silivri inşaat',
    'Silivri mimarlık'
  ],
  alternates: {
    canonical: 'https://www.yalcingrupmimarlik.com/silivri-prefabrik-ev-yapimi/'
  },
  openGraph: {
    title: 'Silivri Prefabrik Ev Yapımı ve Fiyatları | Yalçın Grup Mimarlık',
    description:
      'Silivri ve tüm 35 mahallesinde Prefabrik Evim güvencesi ve Yalçın Grup Mimarlık mühendisliğiyle ruhsatlı, zemin betonlu anahtar teslim prefabrik ev yapımı.',
    url: 'https://www.yalcingrupmimarlik.com/silivri-prefabrik-ev-yapimi/',
    type: 'website',
    locale: 'tr_TR',
    images: [{ url: 'https://www.yalcingrupmimarlik.com/uploads/hero-silivri-villa.jpg', width: 1200, height: 630, alt: 'Silivri Prefabrik Ev Yapımı' }]
  }
};

const SILIVRI_FAQS = [
  {
    q: 'Silivri’de prefabrik ev yaptırmak için yapı ruhsatı gerekiyor mu?',
    a: 'Evet. Silivri Belediyesi sınırları içerisindeki imarlı arsalarda veya köy içi yerleşik alanlarda prefabrik ev kurulumu için mimari, statik, mekanik ve elektrik projelerinin hazırlanarak yapı ruhsatı alınması gerekir. Yalçın Grup Mimarlık olarak Silivri Belediyesi nezdindeki tüm ruhsat ve imar süreçlerini sizin adınıza yürütüyoruz.'
  },
  {
    q: 'Silivri prefabrik ev fiyatlarına hangi kalemler dahildir?',
    a: 'Fabrika satış fiyatına; yapının uzman ekipçe sahada kurulması, çelik dış kapı, Amerikan iç kapılar, çatı karkası ve kaplaması, çift camlı PVC pencereler, iç ve dış cephe boyaları, sıva altı elektrik ve su tesisatı, prizler, anahtarlar, armatürler ve sigorta kutusu dahildir.'
  },
  {
    q: 'Zemin betonu, parke, fayans, mutfak dolabı ve nakliye işlerini de yapıyor musunuz?',
    a: 'Evet. Ruhsat, radye/subasman zemin betonu, ince şap, laminat parke, banyo/mutfak fayans kaplaması, mutfak dolabı, vitrifiye, nakliye, JCB/vinç ile indirme ve montaj ekibi konaklama kalemleri fabrika fiyatına dahil değildir; ancak Yalçın Grup Mimarlık olarak tamamını Silivri ve tüm mahallelerinde anahtar teslim taahhüt ile yapıyoruz.'
  },
  {
    q: 'Silivri’nin hangi mahallelerinde prefabrik ev kurulumu yapıyorsunuz?',
    a: 'Silivri merkez (Alibey, Piri Mehmet Paşa, Yeni, Fatih, Cumhuriyet, Mimar Sinan), sahil bandı (Selimpaşa, Gümüşyaka, Semizkumlar, Çanta, Balaban, Sancaktepe) ve tüm kırsal/köy mahalleleri (Değirmenköy, Ortaköy, Kavaklı, Fener, Gazitepe, Akören, Büyük Çavuşlu, Danamandıra, Seymen, Çeltik ve diğer tüm 35 mahalle) dahil eksiksiz hizmet veriyoruz.'
  },
  {
    q: 'Silivri ikliminde prefabrik evler kışın sıcak tutar mı?',
    a: 'Evet. 10 cm kalınlığında çift taraflı Betopan ve yüksek yoğunluklu B1 sınıfı EPS ısı yalıtımlı duvar panelleri, mineral yünlü çatı izolasyonu ve 70’lik seri çift ısıcamlı PVC pencereler sayesinde Silivri’nin kış rüzgarlarına ve kıyı nemine karşı 4 mevsim konfor sağlar.'
  }
];

export default function SilivriPrefabrikHubPage() {
  const settings = getSettings();
  const houses = getPrefabrikHouses();
  const featuredHouses = houses.slice(0, 6);
  const phoneRaw = settings.phoneRaw || '905380828592';

  const zones: Array<{ title: string; type: typeof SILIVRI_NEIGHBORHOODS[number]['zoneType'] }> = [
    { title: 'Sahil Bandı Mahalleleri', type: 'Sahil Bandı' },
    { title: 'Silivri Merkez Mahalleleri', type: 'Silivri Merkez' },
    { title: 'Gelişim & Konut Bölgeleri', type: 'Gelişim & Konut Bölgesi' },
    { title: 'Kırsal & Müstakil Parsel Mahalleleri', type: 'Kırsal & Müstakil Parsel' }
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: 'https://www.yalcingrupmimarlik.com/' },
      { '@type': 'ListItem', position: 2, name: 'Prefabrik Ev Yapımı', item: 'https://www.yalcingrupmimarlik.com/prefabrik-ev-yapimi/' },
      { '@type': 'ListItem', position: 3, name: 'Silivri Prefabrik Ev Yapımı', item: 'https://www.yalcingrupmimarlik.com/silivri-prefabrik-ev-yapimi/' }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Silivri Anahtar Teslim Prefabrik Ev Yapımı',
    serviceType: 'Prefabrik Ev Yapımı, Hafif Çelik Konut, Zemin Betonu ve Mimari Ruhsat',
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Yalçın Grup Mimarlık',
      telephone: settings.phone,
      url: 'https://www.yalcingrupmimarlik.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Alibey Mah. Turgut Özal Blv. No: 13/5',
        addressLocality: 'Silivri',
        addressRegion: 'İstanbul',
        postalCode: '34570',
        addressCountry: 'TR'
      }
    },
    areaServed: SILIVRI_NEIGHBORHOODS.map((n) => ({
      '@type': 'AdministrativeArea',
      name: `Silivri ${n.displayName}`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SILIVRI_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <div className="py-14 sm:py-20 bg-[#090a0c] text-[#eae7e1] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-[#c5a059] transition-colors">ANASAYFA</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/prefabrik-ev-yapimi/" className="hover:text-[#c5a059] transition-colors">PREFABRİK EV YAPIMI</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-[#c5a059]">SİLİVRİ & TÜM MAHALLELER</span>
        </nav>

        {/* Hero */}
        <header className="space-y-6 max-w-4xl border-b border-white/[0.08] pb-12">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#c5a059]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
              SİLİVRİ İNŞAAT & MİMARLIK • 35 MAHALLEDE HİZMET AĞI
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white font-display leading-[1.12]">
            Silivri Prefabrik Ev Yapımı <br />
            <span className="font-semibold text-[#c5a059]">ve Tüm Mahallelerinde Anahtar Teslim Kurulum</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            <strong>Yalçın Grup Mimarlık</strong> olarak, Silivri Alibey merkez ofisimizden Silivri’nin tüm 35 mahallesine
            (Selimpaşa, Gümüşyaka, Çanta, Değirmenköy, Kavaklı, Ortaköy, Fener, Gazitepe, Danamandıra, Büyük Çavuşlu ve diğer tüm bölgeler)
            <strong> Prefabrik Evim</strong> güvencesiyle ruhsatlı, zemin betonlu, anahtar teslim prefabrik ve hafif çelik evler inşa ediyoruz.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/prefabrik-ev-yapimi/"
              className="px-8 py-4 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
            >
              <span>184 Model & Fiyatları İncele</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent('Merhaba Yalçın Grup Mimarlık, Silivri\'deki arsamız için prefabrik ev yapımı ve anahtar teslim teklif almak istiyoruz.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/15 hover:border-[#c5a059] text-white font-mono text-xs uppercase tracking-widest transition-all bg-[#121317]/60 flex items-center gap-2"
            >
              <span>WhatsApp’tan Teklif Al</span>
              <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
            </a>
            <a
              href={`tel:${phoneRaw}`}
              className="px-6 py-4 border border-white/10 hover:border-[#c5a059] text-gray-200 font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#c5a059]" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </header>

        {/* All 35+ Silivri Neighborhoods Directory */}
        <section className="space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
              [ SİLİVRİ MAHALLE BAZLI HİZMET SAYFALARI ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white font-display">
              Silivri’nin Hangi Mahallesinde Arsanız Var?
            </h2>
            <p className="text-sm text-gray-400 max-w-3xl">
              Aşağıdan mahallenizi seçerek bölgenize özel zemin etüdü, ruhsat, nakliye ve anahtar teslim prefabrik ev yapımı detaylarını inceleyebilirsiniz.
            </p>
          </div>

          <div className="space-y-10">
            {zones.map((zone) => {
              const list = SILIVRI_NEIGHBORHOODS.filter((n) => n.zoneType === zone.type);
              return (
                <div key={zone.type} className="space-y-4">
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-[#c5a059] border-b border-white/[0.08] pb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{zone.title} ({list.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                    {list.map((n) => (
                      <Link
                        key={n.slug}
                        href={`/silivri-prefabrik-ev-yapimi/${n.slug}/`}
                        className="group p-4 rounded-xl bg-[#111216] border border-white/[0.08] hover:border-[#c5a059]/60 transition-all flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-[#c5a059] transition-colors">
                            {n.name} Prefabrik Ev
                          </div>
                          <div className="text-[11px] font-mono text-gray-500 mt-0.5">
                            {n.displayName} • {n.distanceKm} km
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#c5a059] shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Prefabrik Models */}
        <section className="space-y-8 border-t border-white/[0.08] pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block mb-1">
                [ SİLİVRİ’DE EN ÇOK TERCİH EDİLEN MODELLER ]
              </span>
              <h2 className="text-3xl font-light text-white font-display">
                Güncel Prefabrik Ev Modelleri & Fiyatları
              </h2>
            </div>
            <Link
              href="/prefabrik-ev-yapimi/"
              className="text-xs font-mono uppercase tracking-widest text-[#c5a059] hover:text-white flex items-center gap-1.5"
            >
              <span>Tüm 184 Modeli Gör</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHouses.map((house) => (
              <Link
                key={house.id}
                href={`/prefabrik-ev-yapimi/${house.slug}/`}
                className="group rounded-2xl overflow-hidden bg-[#111216] border border-white/[0.08] hover:border-[#c5a059]/50 transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
                  <img
                    src={house.featuredImage || '/uploads/projects/modern-villa.jpg'}
                    alt={`${house.name} Silivri Prefabrik Ev`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#c5a059] border border-[#c5a059]/40 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>KOD: {house.sku}</span>
                  </div>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-gray-400">
                      {house.area ? `${house.area} m²` : ''} • {house.rooms}
                    </div>
                    <h3 className="text-lg text-white group-hover:text-[#c5a059] transition-colors font-display mt-1">
                      {house.name}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-lg font-mono font-bold text-[#c5a059]">
                      {house.priceFormatted || 'Teklif Alınız'}
                    </span>
                    <span className="text-[11px] font-mono text-gray-300 group-hover:text-white flex items-center gap-1">
                      İncele <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Included vs Excluded Scope */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#111318] border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Fiyata Dâhil Olanlar (Fabrika & Kurulum)
              </h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong>Yapı tarafımızca kurulmaktadır.</strong> Kapı + Çatı + Pencere + İç Boya + Dış Boya + Elektrik tesisatı + Su tesisatı + Prizler + Elektrik Armatürleri + Sigorta kutusuna kadar bize aittir. Liste fiyatlarına bu kalemlerin tamamı dâhildir.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#161414] border border-[#c5a059]/40 space-y-4">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-[#c5a059]" />
              <h2 className="text-lg font-mono font-semibold text-[#c5a059] uppercase tracking-wider">
                Fiyata Dâhil Olmayanlar (Yalçın Grup Anahtar Teslim)
              </h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Ruhsat + Zemin Betonu + İnce Şap + Parke + Fayans + Mutfak Dolabı + Vitrifiye + Nakliye + İndirme için JCB + Montaj ekibi Yemek ve Konaklama masrafları fabrika fiyatına dâhil değildir. <strong>Bunların tamamını da Silivri ve tüm mahallelerinde Yalçın Grup Mimarlık olarak yapıyoruz; anahtar teslim fiyat için teklif alınız.</strong>
            </p>
          </div>
        </section>

        {/* Visible FAQ Section (Matches FAQPage Schema 100%) */}
        <section className="space-y-8 border-t border-white/[0.08] pt-14">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>SIKÇA SORULAN SORULAR</span>
            </span>
            <h2 className="text-3xl font-light text-white font-display">
              Silivri Prefabrik Ev Yapımı Hakkında Merak Edilenler
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SILIVRI_FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-3">
                <h3 className="text-base font-medium text-white flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
