import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getSettings, getMenus } from '@/lib/db';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yalcingrupmimarlik.com'),
  title: {
    default: 'Yalçın Grup Mimarlık – Silivri Kentsel Dönüşüm ve İnşaat Firması',
    template: '%s | Yalçın Grup Mimarlık'
  },
  description: 'Silivri mimari proje çizimi, anahtar teslim villa ve müstakil ev yapımı, kentsel dönüşüm ve kat karşılığı inşaat hizmetleri.',
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
    url: 'https://www.yalcingrupmimarlik.com',
    siteName: 'Yalçın Grup Mimarlık',
    images: [
      {
        url: 'https://www.yalcingrupmimarlik.com/logo.png',
        width: 576,
        height: 600,
        alt: 'Yalçın Grup Mimarlık Logo'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();
  const menus = getMenus();

  // JSON-LD Schema for LocalBusiness / Architecture
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Yalçın Grup Mimarlık',
    url: 'https://www.yalcingrupmimarlik.com',
    logo: 'https://www.yalcingrupmimarlik.com/logo.png',
    image: 'https://www.yalcingrupmimarlik.com/logo.png',
    telephone: settings.phone,
    email: settings.email,
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
      latitude: '41.0742',
      longitude: '28.2464'
    },
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
