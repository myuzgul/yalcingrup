'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

interface MenuItem {
  label: string;
  url: string;
  children?: { label: string; url: string }[];
}

export default function Header({ menus, settings }: { menus: { header: MenuItem[] }; settings: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full relative z-50">
      
      {/* Top Hairline Bar */}
      <div className="bg-[#07080a] text-[11px] text-gray-400 border-b border-white/[0.06] py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center font-mono tracking-wider">
          <div className="flex items-center gap-6">
            <span className="text-white/80">SİLİVRİ • İSTANBUL</span>
            <span className="text-white/20">/</span>
            <span>MİMARLIK & İNŞAAT MÜHENDİSLİĞİ</span>
            <span className="text-white/20">/</span>
            <span className="text-[#c5a059]">EST. 2010</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${settings.phoneRaw || '905380828592'}`} className="flex items-center gap-1.5 text-gray-300 hover:text-[#c5a059] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{settings.phone || '+90 538 082 85 92'}</span>
            </a>
            <span className="text-white/20">|</span>
            <a href={`mailto:${settings.email || 'info@yalcingrup.net'}`} className="hover:text-white transition-colors">
              {settings.email || 'info@yalcingrup.net'}
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav className={`w-full transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 bg-[#090a0d]/95 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl' : 'bg-[#090a0d] border-b border-white/[0.08] py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-[#c5a059]/40 bg-[#111317] p-1.5 flex items-center justify-center group-hover:border-[#c5a059] transition-colors shadow-lg">
              <img
                src="/tower-symbol.png"
                alt="Yalçın Grup Mimarlık Logo İkonu"
                className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-light tracking-[0.2em] text-white uppercase font-display leading-tight group-hover:text-[#c5a059] transition-colors">
                YALÇIN GRUP
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#c5a059] uppercase font-mono">
                MİMARLIK & İNŞAAT
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-9">
            {menus.header.map((item, idx) => {
              if (item.children && item.children.length > 0) {
                return (
                  <div
                    key={idx}
                    className="relative py-2 group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-[13px] tracking-wider uppercase text-gray-300 hover:text-white transition-colors">
                      <span>{item.label}</span>
                      <ChevronDown className="w-3 h-3 text-[#c5a059] opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-72 bg-[#121317] border border-white/10 shadow-2xl py-3 mt-1 backdrop-blur-2xl">
                        {item.children.map((child, cIdx) => (
                          <Link
                            key={cIdx}
                            href={child.url}
                            className="block px-5 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/[0.04] hover:border-l-2 hover:border-[#c5a059] transition-all"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={idx}
                  href={item.url}
                  className="text-[13px] tracking-wider uppercase text-gray-300 hover:text-[#c5a059] transition-colors py-2"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Consultation CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent('Merhaba, Silivri arsamız / projemiz için randevu ve bilgi almak istiyoruz.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black font-mono text-xs uppercase tracking-widest transition-all duration-300 group"
            >
              <span>Keşif & Teklif</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0d10] border-b border-white/10 px-6 pt-4 pb-8 space-y-4">
            {menus.header.map((item, idx) => (
              <div key={idx} className="border-b border-white/[0.06] pb-3">
                {item.children ? (
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-[#c5a059] uppercase block mb-2">
                      {item.label}
                    </span>
                    <div className="pl-3 space-y-2.5">
                      {item.children.map((child, cIdx) => (
                        <Link
                          key={cIdx}
                          href={child.url}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-sm text-gray-300 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm tracking-wide text-gray-200 hover:text-[#c5a059]"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent('Merhaba, Silivri projemiz için bilgi almak istiyoruz.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#c5a059] text-black font-bold text-xs uppercase tracking-widest"
              >
                <span>WhatsApp İle İletişime Geç</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
