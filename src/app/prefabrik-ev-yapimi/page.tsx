import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPrefabrikHouses, getSettings } from '@/lib/db';
import { SILIVRI_NEIGHBORHOODS } from '@/lib/silivri-neighborhoods';
import PrefabrikCatalog from '@/components/PrefabrikCatalog';
import { 
  Building2, 
  ShieldCheck, 
  Wrench, 
  FileCheck2, 
  Truck, 
  Home, 
  ArrowUpRight, 
  Sparkles,
  CheckCircle2,
  PhoneCall,
  MapPin
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Silivri Prefabrik Ev Yapımı, Modelleri ve Fiyatları (184 Model)',
  description: 'Silivri ve tüm 35 mahallesinde tek katlı, dubleks prefabrik evler ve hafif çelik konutlar. 184 model, güncel fabrika satış fiyatları, ruhsat, zemin betonu ve anahtar teslim montaj.',
  alternates: {
    canonical: 'https://www.yalcingrupmimarlik.com/prefabrik-ev-yapimi/',
  },
  openGraph: {
    title: 'Prefabrik Ev Yapımı & Modelleri | Yalçın Grup Mimarlık & Prefabrik Evim',
    description: '1+1, 2+1, 3+1, 4+1 tek katlı ve dubleks prefabrik ev modelleri. Ruhsattan zemin betonuna, nakliyeden ince işçiliğe anahtar teslim kurulum.',
    url: 'https://www.yalcingrupmimarlik.com/prefabrik-ev-yapimi/',
    siteName: 'Yalçın Grup Mimarlık',
    images: [
      {
        url: 'https://www.yalcingrupmimarlik.com/logo.png',
        width: 576,
        height: 600,
        alt: 'Yalçın Grup Mimarlık Prefabrik Ev Modelleri'
      }
    ]
  }
};

export default function PrefabrikListingPage() {
  const houses = getPrefabrikHouses();
  const settings = getSettings();
  const phoneRaw = settings.phoneRaw || '905380828592';

  return (
    <div className="py-16 sm:py-20 bg-[#090a0c] text-[#eae7e1] min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="space-y-6 max-w-4xl border-b border-white/[0.08] pb-12">
          
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#c5a059]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
              PREFABRİK EVİM & YALÇIN GRUP MİMARLIK RESMİ ÇÖZÜM ORTAKLIĞI
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white font-display leading-[1.15]">
            Prefabrik & Hafif Çelik <br />
            <span className="font-semibold text-white">Anahtar Teslim Yaşam Alanları</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Resmi çözüm ortağımız <strong>Prefabrik Evim</strong> kalitesiyle üretilen fabrikasyon paneller; 
            Silivri ve çevre ilçelerde <strong>Yalçın Grup Mimarlık</strong> mühendislik ekibimizce ruhsatlandırılmakta, 
            zemin betonu dökülmekte, montajı yapılmakta ve anahtar teslim olarak teslim edilmektedir.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent('Merhaba Yalçın Grup Mimarlık, arsamıza prefabrik ev yaptırmak istiyoruz. Genel bilgi ve keşif rica ediyoruz.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#c5a059]/20 flex items-center gap-2"
            >
              <span>Arsanız İçin Teklif Alın</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${phoneRaw}`}
              className="px-8 py-4 border border-white/15 hover:border-[#c5a059] text-white font-mono text-xs uppercase tracking-widest transition-all bg-[#121317]/60 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#c5a059]" />
              <span>{settings.phone}</span>
            </a>
          </div>

        </div>

        {/* Official Scope & Turn-Key Guarantee Box (MANDATORY CLIENT REQUIREMENT) */}
        <div className="rounded-3xl bg-[#111216] border border-[#c5a059]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div>
                <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-1">
                  [ RESMİ İŞ BÖLÜMÜ & TAAHHÜT GARANTİSİ ]
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white font-display">
                  Süreç Nasıl İlerliyor? Kim Ne Yapıyor?
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs font-mono text-[#c5a059]">
                <ShieldCheck className="w-4 h-4" />
                <span>%100 Sözleşme Güvencesi</span>
              </div>
            </div>

            {/* Side by side comparison cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Partner Scope */}
              <div className="p-6 rounded-2xl bg-[#161820] border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                      FİYATA DÂHİL OLANLAR (FABRİKA & KURULUM)
                    </h3>
                    <p className="text-[11px] text-gray-400">Yapı tarafımızca kurulmaktadır. Kapı, çatı, pencere, boya ve elektrik-su tesisatı dâhildir.</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300 font-light pt-2">
                  {[
                    "Yapı tarafımızca kurulmaktadır (Uzman montaj ekibi sahada montaj)",
                    "Dış çelik kapı ve iç ahşap Amerikan panel kapılar",
                    "Çelik karkas, çatı makasları ve galvaniz trapez çatı kaplaması",
                    "70'lik seri çift ısıcamlı PVC pencereler",
                    "İç cephe ve dış cephe fabrika boyaları",
                    "Sıva altı elektrik tesisatı, prizler, anahtarlar, armatürler ve sigorta kutusu",
                    "Sıva altı temiz su ve pis su sıhhi tesisat hatları",
                    "İç ve dış duvar pres panelleri (10 cm Betopan + yalıtım)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Yalçın Grup Scope */}
              <div className="p-6 rounded-2xl bg-[#191920] border border-[#c5a059]/50 space-y-4 relative">
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c5a059] text-black font-bold uppercase tracking-wider">
                    ANAHTAR TESLİM İÇİN FİYAT ALINIZ
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#c5a059] uppercase tracking-wider font-mono">
                      FİYATA DÂHİL OLMAYANLAR (YALÇIN GRUP MİMARLIK TAAHHÜTÜ)
                    </h3>
                    <p className="text-[11px] text-gray-400">Bunlar fiyata dahil değildir; tamamını yapıyoruz, lütfen anahtar teslim fiyat alınız.</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300 font-light pt-2">
                  {[
                    "Belediye imar durumu incelemesi, statik proje ve resmi ruhsat takibi",
                    "Zemin tesviyesi, radye jeneral temel veya subasman betonunun dökülmesi",
                    "Zemin üzerine ince şap uygulaması",
                    "1. sınıf laminat parke ve ıslak hacimler için seramik / fayans kaplama",
                    "MDF gövde özel tasarım mutfak dolabı ve tezgah montajı",
                    "Banyo vitrifiye ürünleri (klozet, lavabo, duş teknesi ve armatürler)",
                    "İstanbul fabrikasından arsanıza kadar sigortalı nakliye",
                    "Şantiyede indirme ve vinç/JCB operasyonu",
                    "Yalçın Grup Mimarlık uzman montaj ekibince anahtar teslim kurulum"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Official Announcement Paragraph */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono leading-relaxed">
              <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-emerald-500/30 text-gray-300 space-y-1">
                <span className="text-emerald-400 font-bold block uppercase tracking-wider">FİYATA DÂHİL OLANLAR:</span>
                <p>
                  "Yapı tarafımızca kurulmaktadır. Kapı + Çatı + Pencere + İç Boya + Dış Boya + Elektrik tesisatı + Su tesisatı + Prizler + Elektrik Armatürleri + Sigorta kutusuna kadar bize aittir. Oraya girilen fiyata bunlar dâhildir."
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-[#c5a059]/40 text-gray-300 space-y-1">
                <span className="text-[#c5a059] font-bold block uppercase tracking-wider">FİYATA DÂHİL OLMAYANLAR (ANAHTAR TESLİM SEÇENEĞİ):</span>
                <p>
                  "Ruhsat + Zemin Betonu + İnce Şap + Parke + Fayans + Mutfak Dolabı + Vitrifiye + Nakliye + İndirme için JCB + Montaj ekibi Yemek ve Konaklama masrafları standart fiyata dâhil değildir. Bunları da Yalçın Grup Mimarlık olarak yapıyoruz, bunun için lütfen fiyat teklifi alınız."
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Catalog Section */}
        <div className="space-y-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-1">
                [ GÜNCEL PREFABRİK VE ÇELİK EV KATALOĞU ]
              </span>
              <h2 className="text-3xl font-light text-white font-display">
                Tüm Ev Modellerimiz ({houses.length} Model)
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-400">
              * Telefonla bilgi alırken model kartlarındaki <strong>Model Kodunu (Örn: IMPT0861)</strong> belirtebilirsiniz.
            </p>
          </div>

          {/* Interactive Catalog Component */}
          <PrefabrikCatalog houses={houses} phoneRaw={phoneRaw} />
        </div>

        {/* Silivri & 35 Mahallede Prefabrik Ev Hizmet Bölgeleri (Internal Linking SEO) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#111216] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-1">
                [ SİLİVRİ TÜM MAHALLELERDE ANAHTAR TESLİM KURULUM ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white font-display">
                Silivri Mahallelerine Göre Prefabrik Ev Yapımı
              </h2>
            </div>
            <Link
              href="/silivri-prefabrik-ev-yapimi/"
              className="text-xs font-mono uppercase tracking-widest text-[#c5a059] hover:text-white flex items-center gap-1.5"
            >
              <span>Silivri Bölge Rehberi</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {SILIVRI_NEIGHBORHOODS.map((n) => (
              <Link
                key={n.slug}
                href={`/silivri-prefabrik-ev-yapimi/${n.slug}/`}
                className="px-3.5 py-2 rounded-lg bg-[#161820] border border-white/[0.08] hover:border-[#c5a059]/60 text-xs font-mono text-gray-300 hover:text-[#c5a059] transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3 h-3 text-[#c5a059]" />
                <span>Silivri {n.name} Prefabrik Ev</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
