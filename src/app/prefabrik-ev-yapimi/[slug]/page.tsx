import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPrefabrikHouseBySlug, getPrefabrikHouses, getSettings } from '@/lib/db';
import PrefabrikGallery from '@/components/PrefabrikGallery';
import { 
  ChevronRight, 
  Maximize2, 
  Home, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  Wrench, 
  Building2, 
  PhoneCall, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowRight,
  Tag,
  AlertCircle,
  Info
} from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const houses = getPrefabrikHouses();
  return houses.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const house = getPrefabrikHouseBySlug(params.slug);
  if (!house) return { title: 'Model Bulunamadı' };

  return {
    title: `[${house.sku}] ${house.name} - ${house.priceFormatted || 'Fiyat Teklifi'} | Yalçın Grup Mimarlık`,
    description: `${house.sku} kodlu ${house.name} (${house.area ? house.area + ' m² ' : ''}${house.rooms}). Fabrika satış fiyatı: ${house.priceFormatted || 'Teklif alınız'}. Ruhsat, zemin betonu ve montaj detayları.`,
    alternates: {
      canonical: `https://www.yalcingrupmimarlik.com/prefabrik-ev-yapimi/${house.slug}/`,
    },
    openGraph: {
      title: `[${house.sku}] ${house.name} | Prefabrik Evim & Yalçın Grup`,
      description: `${house.sku} kodlu model: ${house.priceFormatted || 'Fiyat Teklifi Alınız'}. Fiyata dahil ve dahil olmayan tüm kalemler, kat planı ve teknik şartname.`,
      url: `https://www.yalcingrupmimarlik.com/prefabrik-ev-yapimi/${house.slug}/`,
      images: house.featuredImage ? [{ url: house.featuredImage }] : undefined,
    },
  };
}

export default function PrefabrikDetailPage({ params }: Props) {
  const house = getPrefabrikHouseBySlug(params.slug);
  const settings = getSettings();
  const allHouses = getPrefabrikHouses();

  if (!house) notFound();

  const phoneRaw = settings.phoneRaw || '905380828592';

  // Similar models
  const similarHouses = allHouses
    .filter((h) => h.slug !== house.slug && (h.rooms === house.rooms || Math.abs((h.area || 0) - (house.area || 0)) <= 25))
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Merhaba Yalçın Grup Mimarlık, [Model Kodu: ${house.sku}] "${house.name}" (${house.area ? house.area + ' m² ' : ''}${house.rooms} - Liste Fiyatı: ${house.priceFormatted}) hakkında fabrika teslimi ve Silivri arsamıza anahtar teslim (ruhsat + zemin betonu + ince işçilik) fiyat teklifi almak istiyoruz.`
  );

  return (
    <article className="py-12 bg-[#090a0c] text-[#eae7e1] min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-[#c5a059] transition-colors">ANASAYFA</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/prefabrik-ev-yapimi/" className="hover:text-[#c5a059] transition-colors">PREFABRİK EV YAPIMI</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-[#c5a059]">KOD: {house.sku}</span>
        </nav>

        {/* Main Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/[0.08] pb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Tag className="w-3.5 h-3.5" />
                <span>MODEL KODU: {house.sku}</span>
              </span>
              <span className="text-xs font-mono tracking-[0.2em] text-gray-400 uppercase">
                {house.structureType}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white font-display">
              {house.name}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              {house.shortDescription}
            </p>
          </div>

          {/* Price Header & CTAs */}
          <div className="shrink-0 space-y-3 bg-[#111216] border border-white/10 p-6 rounded-2xl">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                Fabrika Satış Fiyatı (Montaj Dahil)
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-[#c5a059] tracking-tight">
                  {house.priceFormatted || 'Fiyat Sorunuz'}
                </span>
                {house.regularPriceFormatted && house.regularPriceFormatted !== house.priceFormatted && (
                  <span className="text-sm font-mono text-gray-500 line-through">
                    {house.regularPriceFormatted}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={`https://wa.me/${phoneRaw}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Anahtar Teslim Teklif Al</span>
              </a>

              <a
                href={`tel:${phoneRaw}`}
                className="px-5 py-3.5 border border-white/15 hover:border-[#c5a059] text-white font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 bg-[#161820]"
              >
                <PhoneCall className="w-4 h-4 text-[#c5a059]" />
                <span>{settings.phone}</span>
              </a>
            </div>

            <p className="text-[10px] font-mono text-gray-400 text-center sm:text-left">
              * Telefon görüşmelerinizde <strong>"{house.sku}"</strong> kodunu belirtebilirsiniz.
            </p>
          </div>
        </div>

        {/* Key Specification Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-[#111216] border border-white/[0.08] font-mono text-xs">
          <div className="space-y-1.5 border-l border-white/10 pl-4">
            <div className="text-[10px] text-[#c5a059] tracking-wider uppercase flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>MODEL KODU</span>
            </div>
            <div className="text-base font-semibold text-[#c5a059]">
              {house.sku}
            </div>
          </div>

          <div className="space-y-1.5 border-l border-white/10 pl-4">
            <div className="text-[10px] text-[#c5a059] tracking-wider uppercase flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>KAPALI ALAN</span>
            </div>
            <div className="text-base font-semibold text-white">
              {house.area ? `${house.area} m²` : 'Özel Plan'}
            </div>
          </div>

          <div className="space-y-1.5 border-l border-white/10 pl-4">
            <div className="text-[10px] text-[#c5a059] tracking-wider uppercase flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" />
              <span>ODA SAYISI</span>
            </div>
            <div className="text-base font-semibold text-white">
              {house.rooms || '2+1'}
            </div>
          </div>

          <div className="space-y-1.5 border-l border-white/10 pl-4">
            <div className="text-[10px] text-[#c5a059] tracking-wider uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>KAT ADEDİ</span>
            </div>
            <div className="text-base font-semibold text-white">
              {house.isDubleks ? '2 Katlı Dubleks' : 'Tek Katlı'}
            </div>
          </div>
        </div>

        {/* PRICE INCLUSIONS & EXCLUSIONS (MANDATORY CLIENT REQUIREMENT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Box 1: Fiyata Dahil Olanlar */}
          <div className="p-8 rounded-3xl bg-[#12141a] border border-emerald-500/30 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase block">
                  FABRİKA SATIŞ FİYATINA
                </span>
                <h3 className="text-xl font-medium text-white font-display">
                  Fiyata Dâhil Olanlar
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-gray-200 font-mono leading-relaxed">
              <p>
                <strong>Yapı tarafımızca kurulmaktadır.</strong> Kapı + Çatı + Pencere + İç Boya + Dış Boya + Elektrik tesisatı + Su tesisatı + Prizler + Elektrik Armatürleri + Sigorta kutusuna kadar bize aittir. Oraya girilen fiyata bunlar dâhildir.
              </p>
            </div>

            <ul className="space-y-3 text-xs text-gray-300 font-light">
              {[
                "Yapının uzman montaj ekibimizce sahada kurulması",
                "10 cm çift taraflı Betopan dış cephe pres duvar panelleri ve B1 EPS yalıtımı",
                "6 cm çift taraflı Betopan iç bölme duvar panelleri",
                "Çelik çatı karkası, çatı makasları ve 0.50 mm boyalı galvaniz çatı örtüsü",
                "70'lik seri çift camlı ısı yalıtımlı PVC pencere doğramaları",
                "Geniş kanatlı emniyet kilitli çelik dış kapı ve ahşap Amerikan iç kapılar",
                "İç cephe ve dış cephe fabrika boya uygulaması",
                "Sıva altı elektrik tesisatı, prizler, anahtarlar, armatürler ve sigorta kutusu",
                "Sıva altı temiz su ve atık su sıhhi tesisat borulaması"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 2: Fiyata Dahil Olmayanlar (Anahtar Teslim Hizmetimiz) */}
          <div className="p-8 rounded-3xl bg-[#161414] border border-[#c5a059]/40 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#c5a059] uppercase block">
                  ANAHTAR TESLİM SEÇENEĞİ
                </span>
                <h3 className="text-xl font-medium text-white font-display">
                  Fiyata Dâhil Olmayanlar
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-[#c5a059]/20 text-xs text-gray-200 font-mono leading-relaxed space-y-2">
              <p>
                <strong>Fiyata dâhil olmayanlar:</strong> Ruhsat + Zemin Betonu + İnce Şap + Parke + Fayans + Mutfak Dolabı + Vitrifiye + Nakliye + İndirme için JCB + Montaj ekibi Yemek ve Konaklama masrafları standart fabrika satış fiyatına dâhil değildir.
              </p>
              <p className="text-[#c5a059] font-medium pt-1 border-t border-white/10">
                * Bu kalemlerin tamamını da Yalçın Grup Mimarlık olarak Silivri ve Trakya'da eksiksiz yapmaktayız. Arsanıza özel anahtar teslim maliyet için lütfen fiyat teklifi alınız.
              </p>
            </div>

            <ul className="space-y-3 text-xs text-gray-300 font-light">
              {[
                "Belediye statik/mimari proje çizimi ve resmi inşaat ruhsatı alımı",
                "Zemin tesviyesi, kazı, radye temel veya subasman betonunun dökülmesi",
                "Zemin betonu üzerine ince şap uygulaması",
                "Laminat parke ve banyo/ıslak zemin fayans seramik kaplamaları",
                "Özel tasarım mutfak dolabı ve banyo vitrifiye (klozet, lavabo, bataryalar) temini ve montajı",
                "İstanbul fabrikasından arsanıza kadar nakliye ve şantiyede indirme için JCB / vinç",
                "Montaj ekibinin şantiye süresince yemek ve konaklama giderleri"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 text-[#c5a059] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    +
                  </div>
                  <span>{item} <span className="text-[#c5a059] font-mono text-[11px]">(Yalçın Grup taahhüdüyle yapılabilir)</span></span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <a
                href={`https://wa.me/${phoneRaw}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Anahtar Teslim Toplam Fiyat Alınız</span>
              </a>
            </div>

          </div>

        </div>

        {/* Visuals, Floor Plan & Technical Specs (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7 cols): Images, Plan & Technical Specs */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Interactive Image Gallery with Thumbnails & Lightbox */}
            <PrefabrikGallery
              images={[
                ...(house.featuredImage ? [house.featuredImage] : []),
                ...(house.gallery || [])
              ]}
              title={house.name}
              sku={house.sku}
              planImage={house.planImage}
            />

            {/* Architectural Floor Plan Section */}
            {house.planImage && (
              <div className="p-8 rounded-2xl bg-[#111216] border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-1">
                      [ MİMARİ YERLEŞİM PLANI ]
                    </span>
                    <h2 className="text-2xl font-light text-white font-display">
                      Kat Planı ve Oda Ölçüleri
                    </h2>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30">
                    {house.rooms}
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/10 bg-white p-4 flex items-center justify-center">
                  <img
                    src={house.planImage}
                    alt={`${house.name} Kat Planı`}
                    className="max-h-[500px] w-auto object-contain"
                  />
                </div>

                <p className="text-xs font-mono text-gray-400">
                  * İhtiyacınıza göre iç mekan oda bölümleri ve pencere aksları mimarlarımız tarafından arsanızın yönelimine göre revize edilebilir.
                </p>
              </div>
            )}

            {/* Technical Specifications Table */}
            <div className="p-8 rounded-2xl bg-[#111216] border border-white/10 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-1">
                  [ TEKNİK ŞARTNAME & DONANIM ]
                </span>
                <h2 className="text-2xl font-light text-white font-display">
                  Yapı ve Malzeme Standartları
                </h2>
              </div>

              <div className="divide-y divide-white/[0.06] text-xs font-mono">
                {Object.entries(house.specifications).map(([key, val], idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-white font-medium sm:text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Sticky Consultation Box */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            <div className="p-8 rounded-3xl bg-[#111216] border border-[#c5a059] shadow-2xl space-y-6">
              
              <div className="space-y-2 border-b border-white/[0.08] pb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
                  [ SİLİVRİ RESMİ BAŞVURU ]
                </span>
                <h3 className="text-xl font-medium text-white font-display">
                  Arsanıza Uygunluk ve Keşif
                </h3>
              </div>

              <div className="space-y-3 text-xs text-gray-300 font-light leading-relaxed">
                <p>
                  Silivri, Çanta, Selimpaşa, Gümüşyaka veya Trakya genelindeki arsanızın imar durumunu inceliyor, <strong>{house.sku}</strong> kodlu bu model için zemin betonu ve ruhsat dahil anahtar teslim maliyet tablosu hazırlıyoruz.
                </p>
              </div>

              {/* Price summary badge */}
              <div className="p-4 rounded-xl bg-[#181a24] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-gray-400 uppercase">Seçilen Model:</div>
                <div className="text-sm font-semibold text-white">{house.name}</div>
                <div className="text-xs font-mono text-[#c5a059]">Model Kodu: {house.sku}</div>
                <div className="text-lg font-bold font-mono text-[#c5a059] pt-1">
                  {house.priceFormatted || 'Fiyat Teklifi Alınız'}
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <a
                  href={`https://wa.me/${phoneRaw}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-[#c5a059]/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Teklif Al</span>
                </a>

                <a
                  href={`tel:${phoneRaw}`}
                  className="w-full py-3.5 border border-white/15 hover:border-[#c5a059] text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all bg-[#121317]/60"
                >
                  <PhoneCall className="w-4 h-4 text-[#c5a059]" />
                  <span>Mimarımızla Görüşün: {settings.phone}</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Similar Models Recommendation */}
        {similarHouses.length > 0 && (
          <div className="space-y-8 pt-16 border-t border-white/[0.08]">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-1">
                  [ DİĞER ALTERNATİF MODELLER ]
                </span>
                <h2 className="text-2xl font-light text-white font-display">
                  Benzer Prefabrik Ev Seçenekleri
                </h2>
              </div>
              <Link 
                href="/prefabrik-ev-yapimi/"
                className="text-xs font-mono text-[#c5a059] hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                <span>Tüm Kataloğu Aç ({allHouses.length} Model)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarHouses.map((h, idx) => (
                <Link
                  key={idx}
                  href={`/prefabrik-ev-yapimi/${h.slug}/`}
                  className="group block space-y-3 bg-[#111216] border border-white/[0.08] hover:border-[#c5a059]/60 p-4 rounded-2xl transition-all"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 relative">
                    <img
                      src={h.featuredImage || '/uploads/projects/modern-villa.jpg'}
                      alt={h.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/85 px-2 py-0.5 rounded text-[10px] font-mono text-[#c5a059] font-bold">
                      {h.sku}
                    </div>
                    {h.priceFormatted && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/85 px-2 py-0.5 rounded text-[10px] font-mono text-white font-semibold">
                        {h.priceFormatted}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <span className="text-[10px] font-mono text-[#c5a059] uppercase block">{h.structureType}</span>
                      <h4 className="text-sm font-light text-white group-hover:text-[#c5a059] transition-colors line-clamp-1">{h.name}</h4>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#c5a059] transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
