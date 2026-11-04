import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSettings, getMenus } from '@/lib/db';

export default function Footer() {
  const settings = getSettings();
  const menus = getMenus();

  return (
    <footer className="bg-[#060709] border-t border-white/[0.08] text-gray-400 text-xs font-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        
        {/* Top Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg border border-[#c5a059]/40 bg-[#111317] p-1.5 flex items-center justify-center shadow-lg">
                <img
                  src="/tower-symbol.png"
                  alt="Yalçın Grup Mimarlık Logo İkonu"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block text-base font-light tracking-[0.2em] text-white uppercase font-display">
                  YALÇIN GRUP
                </span>
                <span className="text-[9px] tracking-[0.3em] text-[#c5a059] uppercase font-mono">
                  MİMARLIK & İNŞAAT FİRMASI
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm max-w-lg leading-relaxed pt-2">
              Silivri ve çevre ilçelerde depreme dayanıklı, çağdaş mimari anlayışla şekillenen müstakil villalar, kentsel dönüşüm yapıları ve sanayi tesisleri üretiyoruz.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row justify-between lg:justify-end gap-8 font-mono text-[11px]">
            <div className="space-y-1">
              <span className="text-[#c5a059] block uppercase tracking-wider">DOĞRUDAN İLETİŞİM</span>
              <a href={`tel:${settings.phoneRaw}`} className="text-white hover:text-[#c5a059] block transition-colors text-sm">
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-white block transition-colors">
                {settings.email}
              </a>
            </div>
            <div className="space-y-1">
              <span className="text-[#c5a059] block uppercase tracking-wider">MERKEZ OFİS</span>
              <span className="text-gray-300 block max-w-xs">{settings.address}</span>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 py-16 border-b border-white/[0.08]">
          
          <div className="space-y-3">
            <span className="text-[#c5a059] font-mono text-[10px] tracking-widest uppercase block">
              KURUMSAL
            </span>
            <ul className="space-y-2">
              {menus.footerQuickLinks.map((item, i) => (
                <li key={i}>
                  <Link href={item.url} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#c5a059] font-mono text-[10px] tracking-widest uppercase block">
              SİLİVRİ REHBERLERİ
            </span>
            <ul className="space-y-2">
              {menus.footerServices.map((item, i) => (
                <li key={i}>
                  <Link href={item.url} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#c5a059] font-mono text-[10px] tracking-widest uppercase block">
              HİZMETLERİMİZ
            </span>
            <ul className="space-y-2">
              <li><Link href="/mimari-projelendirme-ve-tasarim/" className="hover:text-white transition-colors">Mimari Projelendirme</Link></li>
              <li><Link href="/silivri-kentsel-donusum-firmasi/" className="hover:text-white transition-colors">Kentsel Dönüşüm</Link></li>
              <li><Link href="/insaat-uygulamalari-hizmetleri/" className="hover:text-white transition-colors">İnşaat Taahhüt</Link></li>
              <li><Link href="/endustriyel-ticari-yapilar/" className="hover:text-white transition-colors">Endüstriyel Yapılar</Link></li>
              <li><Link href="/ic-mekan-dekorasyon/" className="hover:text-white transition-colors">İç Mekan Tasarım</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#c5a059] font-mono text-[10px] tracking-widest uppercase block">
              SOSYAL MEDYA
            </span>
            <ul className="space-y-2">
              {settings.instagram && (
                <li>
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5">
                    <span>Instagram Hesabı</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              )}
              {settings.linkedin && (
                <li>
                  <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5">
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-gray-500">
          <p>© {new Date().getFullYear()} Yalçın Grup Mimarlık. Tüm hakları saklıdır.</p>
          <p>Silivri / İstanbul Mimarlık & İnşaat Mühendisliği Hizmetleri</p>
        </div>

      </div>
    </footer>
  );
}
