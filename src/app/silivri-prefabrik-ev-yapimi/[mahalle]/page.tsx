import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  SILIVRI_NEIGHBORHOODS,
  getSilivriNeighborhoodBySlug
} from '@/lib/silivri-neighborhoods';
import { getPrefabrikHouses, getSettings } from '@/lib/db';
import {
  MapPin,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Building2,
  Wrench,
  Tag,
  HelpCircle,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface Props {
  params: { mahalle: string };
}

export async function generateStaticParams() {
  return SILIVRI_NEIGHBORHOODS.map((n) => ({ mahalle: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = getSilivriNeighborhoodBySlug(params.mahalle);
  if (!n) return { title: 'Bölge Bulunamadı' };

  const title = `Silivri ${n.name} Prefabrik Ev Yapımı ve Fiyatları`;
  const description = `Silivri ${n.displayName} anahtar teslim prefabrik ev yapımı, hafif çelik villa, ruhsat, zemin betonu ve inşaat hizmetleri. ${n.name} arsanız için 184 model ve güncel fiyatlar.`;

  return {
    title,
    description,
    keywords: [
      `${n.name} prefabrik ev`,
      `${n.name} prefabrik ev yapımı`,
      `Silivri ${n.name} prefabrik ev fiyatları`,
      `${n.name} hafif çelik ev`,
      `${n.name} inşaat firması`,
      `${n.name} mimarlık`,
      `Silivri prefabrik ev yapımı`,
      `Silivri inşaat`,
      `Silivri mimarlık`
    ],
    alternates: {
      canonical: `https://www.yalcingrupmimarlik.com/silivri-prefabrik-ev-yapimi/${n.slug}/`
    },
    openGraph: {
      title: `${title} | Yalçın Grup Mimarlık`,
      description,
      url: `https://www.yalcingrupmimarlik.com/silivri-prefabrik-ev-yapimi/${n.slug}/`,
      type: 'website',
      locale: 'tr_TR',
      images: [
        {
          url: 'https://www.yalcingrupmimarlik.com/uploads/hero-silivri-villa.jpg',
          width: 1200,
          height: 630,
          alt: `Silivri ${n.name} Prefabrik Ev Yapımı`
        }
      ]
    }
  };
}

export default function SilivriNeighborhoodPrefabrikPage({ params }: Props) {
  const n = getSilivriNeighborhoodBySlug(params.mahalle);
  if (!n) notFound();

  const settings = getSettings();
  const phoneRaw = settings.phoneRaw || '905380828592';
  const allHouses = getPrefabrikHouses();

  // Deterministic slice per neighborhood so different neighborhoods showcase varied models
  const idx = SILIVRI_NEIGHBORHOODS.findIndex((item) => item.slug === n.slug);
  const start = (idx * 3) % Math.max(1, allHouses.length - 6);
  const featuredHouses = allHouses.slice(start, start + 6);

  const nearbyList = n.nearbySlugs
    .map((s) => getSilivriNeighborhoodBySlug(s))
    .filter(Boolean) as typeof SILIVRI_NEIGHBORHOODS;

  const localFaqs = [
    {
      q: `Silivri ${n.displayName} bölgesinde prefabrik ev kurulumu ve ruhsat işlemlerini yapıyor musunuz?`,
      a: `Evet. Yalçın Grup Mimarlık olarak Silivri merkez ofisimizden ${n.displayName} (${n.postalCode}) sınırlarındaki arsalarınız için imar durumu kontrolü, mimari/statik proje çizimi, belediye ruhsat takibi ve anahtar teslim prefabrik ev kurulumu hizmeti veriyoruz.`
    },
    {
      q: `${n.name} için prefabrik ev fiyatlarına neler dahil, neler hariç?`,
      a: `Fabrika satış fiyatına yapının kurulumu, kapı, çatı, pencere, iç-dış boya, elektrik ve su tesisatı, prizler, elektrik armatürleri ve sigorta kutusu dahildir. Ruhsat, zemin betonu, ince şap, parke, fayans, mutfak dolabı, vitrifiye, nakliye, indirme için JCB ve montaj ekibi konaklama/yemek masrafları dahil değildir; ancak tamamını ${n.name} arsanızda Yalçın Grup Mimarlık olarak anahtar teslim yapıyoruz.`
    },
    {
      q: `${n.name} bölgesine nakliye ve şantiye kurulum süresi ne kadardır?`,
      a: `${n.displayName}, Silivri merkez ofisimize yaklaşık ${n.distanceKm} km mesafededir. Zemin betonunun dökülüp kürlenmesinin ardından seçtiğiniz modelin fabrikasyon montajı ortalama 5 ile 12 iş günü arasında tamamlanmaktadır.`
    },
    {
      q: `${n.name} arsamda prefabrik ev yerine betonarme villa veya hafif çelik ev de yaptırabilir miyim?`,
      a: `Kesinlikle. Yalçın Grup Mimarlık bir Silivri inşaat ve mimarlık firmasıdır. ${n.name} bölgesinde prefabrik evlerin yanı sıra hafif çelik villa, anahtar teslim betonarme villa, radye temel, bahçe/istinat duvarı ve kentsel dönüşüm projeleri de gerçekleştiriyoruz.`
    }
  ];

  const whatsappMsg = encodeURIComponent(
    `Merhaba Yalçın Grup Mimarlık, Silivri ${n.displayName} bölgesindeki arsamız için anahtar teslim prefabrik ev yapımı hakkında keşif ve fiyat teklifi almak istiyoruz.`
  );

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: 'https://www.yalcingrupmimarlik.com/' },
      { '@type': 'ListItem', position: 2, name: 'Prefabrik Ev Yapımı', item: 'https://www.yalcingrupmimarlik.com/prefabrik-ev-yapimi/' },
      { '@type': 'ListItem', position: 3, name: 'Silivri Prefabrik Ev Yapımı', item: 'https://www.yalcingrupmimarlik.com/silivri-prefabrik-ev-yapimi/' },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${n.name} Prefabrik Ev`,
        item: `https://www.yalcingrupmimarlik.com/silivri-prefabrik-ev-yapimi/${n.slug}/`
      }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Silivri ${n.name} Prefabrik Ev Yapımı`,
    description: n.localContext,
    serviceType: 'Prefabrik Ev Yapımı, Hafif Çelik Konut, İnşaat ve Mimarlık',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `Silivri ${n.displayName}, İstanbul`,
      postalCode: n.postalCode
    },
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
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: localFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  return (
    <article className="py-14 sm:py-20 bg-[#090a0c] text-[#eae7e1] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-[#c5a059] transition-colors">ANASAYFA</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/silivri-prefabrik-ev-yapimi/" className="hover:text-[#c5a059] transition-colors">SİLİVRİ PREFABRİK EV</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-[#c5a059] uppercase">{n.name}</span>
        </nav>

        {/* Hero */}
        <header className="space-y-6 border-b border-white/[0.08] pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059] font-mono text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>SİLİVRİ • {n.displayName.toUpperCase()}</span>
            </span>
            <span className="text-xs font-mono text-gray-400">
              {n.zoneType} • Merkeze {n.distanceKm} km • Posta Kodu: {n.postalCode}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white font-display leading-[1.12]">
            Silivri {n.name} <span className="font-semibold text-[#c5a059]">Prefabrik Ev Yapımı</span> <br />
            ve Anahtar Teslim Kurulum
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-light max-w-4xl leading-relaxed">
            {n.localContext}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`https://wa.me/${phoneRaw}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{n.name} Arsanız İçin Teklif Alın</span>
            </a>

            <Link
              href="/prefabrik-ev-yapimi/"
              className="px-8 py-4 border border-white/15 hover:border-[#c5a059] text-white font-mono text-xs uppercase tracking-widest transition-all bg-[#121317]/60 flex items-center gap-2"
            >
              <span>Tüm 184 Modeli Gör</span>
              <ArrowRight className="w-4 h-4 text-[#c5a059]" />
            </Link>

            <a
              href={`tel:${phoneRaw}`}
              className="px-6 py-4 border border-white/10 hover:border-[#c5a059] text-gray-200 font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#c5a059]" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </header>

        {/* Localized Engineering & Soil/Climate Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2.5 text-[#c5a059] font-mono text-xs uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>{n.name} Zemin & İklim Mühendisliği</span>
            </div>
            <h2 className="text-2xl font-light text-white font-display">
              {n.displayName} Bölgesine Özel Uygulama Standartları
            </h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              {n.soilAndClimateNote}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2.5 text-[#c5a059] font-mono text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>{n.name} Bölgesinde Tercih Edilen Yapılar</span>
            </div>
            <h2 className="text-2xl font-light text-white font-display">
              Hangi Modeller {n.name} Parsellerine Uygun?
            </h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              {n.popularModelsNote}
            </p>
          </div>
        </section>

        {/* Included vs Excluded Scope */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#111318] border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Fiyata Dâhil Olanlar (Fabrika & Kurulum)
              </h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong>Yapı tarafımızca kurulmaktadır.</strong> Kapı + Çatı + Pencere + İç Boya + Dış Boya + Elektrik tesisatı + Su tesisatı + Prizler + Elektrik Armatürleri + Sigorta kutusuna kadar bize aittir. Oraya girilen fiyata bunlar dâhildir.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#161414] border border-[#c5a059]/40 space-y-4">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-[#c5a059]" />
              <h2 className="text-base font-mono font-semibold text-[#c5a059] uppercase tracking-wider">
                Fiyata Dâhil Olmayanlar ({n.name} Anahtar Teslim)
              </h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Ruhsat + Zemin Betonu + İnce Şap + Parke + Fayans + Mutfak Dolabı + Vitrifiye + Nakliye + İndirme için JCB + Montaj ekibi Yemek ve Konaklama masrafları standart fiyata dâhil değildir. <strong>Bunların tamamını da {n.name} arsanızda Yalçın Grup Mimarlık olarak yapıyoruz; anahtar teslim fiyat için teklif alınız.</strong>
            </p>
          </div>
        </section>

        {/* Recommended Prefabrik Models for this Neighborhood */}
        <section className="space-y-8 border-t border-white/[0.08] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block mb-1">
                [ {n.name.toUpperCase()} İÇİN ÖNERİLEN MODELLER ]
              </span>
              <h2 className="text-3xl font-light text-white font-display">
                {n.name} Prefabrik & Çelik Ev Seçenekleri
              </h2>
            </div>
            <Link
              href="/prefabrik-ev-yapimi/"
              className="text-xs font-mono uppercase tracking-widest text-[#c5a059] hover:text-white flex items-center gap-1.5"
            >
              <span>Tüm 184 Modeli İncele</span>
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
                    alt={`Silivri ${n.name} ${house.name}`}
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
                      Detay <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Local FAQs */}
        <section className="space-y-8 border-t border-white/[0.08] pt-12">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>{n.name.toUpperCase()} SIKÇA SORULAN SORULAR</span>
            </span>
            <h2 className="text-3xl font-light text-white font-display">
              {n.displayName} Prefabrik Ev Yapımı Hakkında
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localFaqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-3">
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

        {/* Nearby Silivri Neighborhoods & Core Services Internal Linking */}
        <section className="p-8 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
            <div>
              <span className="text-xs font-mono text-[#c5a059] uppercase tracking-widest">
                YAKIN SİLİVRİ MAHALLELERİ & HİZMETLERİMİZ
              </span>
              <h2 className="text-xl font-light text-white font-display mt-1">
                Çevre Bölgelerde Prefabrik Ev & Silivri İnşaat Çözümleri
              </h2>
            </div>
            <Link
              href="/silivri-prefabrik-ev-yapimi/"
              className="text-xs font-mono text-[#c5a059] hover:text-white flex items-center gap-1"
            >
              <span>Tüm 35 Silivri Mahallesi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {nearbyList.map((near) => (
              <Link
                key={near.slug}
                href={`/silivri-prefabrik-ev-yapimi/${near.slug}/`}
                className="px-4 py-2 rounded-lg bg-[#161820] border border-white/10 hover:border-[#c5a059] text-xs font-mono text-gray-300 hover:text-[#c5a059] transition-colors"
              >
                Silivri {near.name} Prefabrik Ev →
              </Link>
            ))}
            <Link
              href="/silivri-insaat-firmasi/"
              className="px-4 py-2 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 hover:bg-[#c5a059] text-xs font-mono text-[#c5a059] hover:text-black transition-colors"
            >
              Silivri İnşaat Firması
            </Link>
            <Link
              href="/mimari-projelendirme-ve-tasarim/"
              className="px-4 py-2 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 hover:bg-[#c5a059] text-xs font-mono text-[#c5a059] hover:text-black transition-colors"
            >
              Silivri Mimarlık Ofisi
            </Link>
            <Link
              href="/silivri-kentsel-donusum-firmasi/"
              className="px-4 py-2 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 hover:bg-[#c5a059] text-xs font-mono text-[#c5a059] hover:text-black transition-colors"
            >
              Silivri Kentsel Dönüşüm
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
