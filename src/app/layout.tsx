import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getSettings, getMenus } from '@/lib/db';
import { SILIVRI_NEIGHBORHOODS } from '@/lib/silivri-neighborhoods';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yalcingrupmimarlik.com'),
  title: {
    default: 'Silivri İnşaat ve Mimarlık Firması | Villa & Prefabrik Ev – Yalçın Grup Mimarlık',
    template: '%s | Yalçın Grup Mimarlık'
  },
  description: 'Silivri inşaat, Silivri mimarlık ofisi ve anahtar teslim prefabrik ev yapımı. Silivri ve tüm 35 mahallesinde müstakil villa, hafif çelik ev, kentsel dönüşüm, radye temel ve ruhsat hizmetleri.',
  keywords: [
    'Silivri inşaat',
    'Silivri mimarlık',
    'Silivri inşaat firması',
    'Silivri mimarlık ofisi',
    'Silivri prefabrik ev yapımı',
    'Silivri prefabrik ev fiyatları',
    'Silivri anahtar teslim villa',
    'Silivri kentsel dönüşüm',
    'Silivri radye temel',
    'Yalçın Grup Mimarlık'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'Qlouz-Pa5zApvQkURhNO52Yl3o5_NejRWE5HnHsUOtY',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.yalcingrupmimarlik.com/',
    siteName: 'Yalçın Grup Mimarlık',
    title: 'Silivri İnşaat ve Mimarlık Firması | Villa & Prefabrik Ev – Yalçın Grup Mimarlık',
    description: 'Silivri ve tüm 35 mahallesinde anahtar teslim inşaat, mimarlık ofisi, lüks villa, kentsel dönüşüm ve prefabrik ev yapımı.',
    images: [
      {
        url: 'https://www.yalcingrupmimarlik.com/uploads/hero-silivri-villa.jpg',
        width: 1200,
        height: 630,
        alt: 'Yalçın Grup Mimarlık – Silivri İnşaat ve Mimarlık Firması'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silivri İnşaat ve Mimarlık Firması | Yalçın Grup Mimarlık',
    description: 'Silivri inşaat, mimarlık ofisi, anahtar teslim villa ve tüm 35 mahallede prefabrik ev yapımı.',
    images: ['https://www.yalcingrupmimarlik.com/uploads/hero-silivri-villa.jpg'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();
  const menus = getMenus();

  // JSON-LD Schema for LocalBusiness / Architecture / Silivri Service Areas
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
    name: 'Yalçın Grup Mimarlık',
    alternateName: 'Yalçın Grup Mimarlık ve İnşaat – Silivri',
    description: 'Silivri inşaat firması, Silivri mimarlık ofisi, anahtar teslim villa, kentsel dönüşüm ve Silivri tüm 35 mahallesinde prefabrik ev yapımı.',
    url: 'https://www.yalcingrupmimarlik.com/',
    logo: 'https://www.yalcingrupmimarlik.com/logo.png',
    image: 'https://www.yalcingrupmimarlik.com/uploads/hero-silivri-villa.jpg',
    telephone: settings.phone,
    email: settings.email,
    priceRange: '₺₺-₺₺₺',
    sameAs: [settings.instagram, settings.linkedin].filter(Boolean),
    knowsAbout: [
      'Silivri İnşaat',
      'Silivri Mimarlık',
      'Silivri Prefabrik Ev Yapımı',
      'Hafif Çelik Villa İnşaatı',
      'Silivri Kentsel Dönüşüm',
      'Anahtar Teslim Villa Yapımı',
      'Mimari Proje ve Yapı Ruhsatı',
      'Radye Temel ve Kaba İnşaat'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alibey Mah. Turgut Özal Blv. No: 13/5',
      addressLocality: 'Silivri',
      addressRegion: 'İstanbul',
      postalCode: '34570',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0742,
      longitude: 28.2464
    },
    areaServed: [
      { '@type': 'City', name: 'Silivri, İstanbul' },
      ...SILIVRI_NEIGHBORHOODS.map((n) => ({
        '@type': 'AdministrativeArea',
        name: `Silivri ${n.displayName}`
      }))
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:30'
      }
    ]
  };

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* Google Analytics / GTM */}
        {settings.gtmId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.gtmId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${settings.gtmId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[#0b0c0f] text-gray-100 selection:bg-brand-gold selection:text-black">
        <Header menus={menus} settings={settings} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton phoneRaw={settings.phoneRaw} />
      </body>
    </html>
  );
}
