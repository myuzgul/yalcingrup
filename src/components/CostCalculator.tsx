'use client';

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function CostCalculator({ phoneRaw }: { phoneRaw?: string }) {
  const [projectType, setProjectType] = useState<'villa' | 'building' | 'steel' | 'rough'>('villa');
  const [area, setArea] = useState<number>(200);
  const [tier, setTier] = useState<'premium' | 'luxury' | 'elite'>('luxury');

  const rates: Record<string, Record<string, { min: number; max: number; label: string }>> = {
    villa: {
      premium: { min: 21000, max: 24000, label: "1. Sınıf Standart Villa" },
      luxury: { min: 25000, max: 29000, label: "Lüks Mimari Tasarım Villa" },
      elite: { min: 31000, max: 38000, label: "Ultra Lüks Akıllı Villa" }
    },
    building: {
      premium: { min: 18000, max: 21000, label: "Standart Konut / Dönüşüm" },
      luxury: { min: 22000, max: 26000, label: "Prestij Konut Projesi" },
      elite: { min: 27000, max: 32000, label: "A+ Rezidans Standart" }
    },
    steel: {
      premium: { min: 16000, max: 19000, label: "Hafif Çelik Modüler Ev" },
      luxury: { min: 20000, max: 24000, label: "Ağır Çelik Statik Yapı" },
      elite: { min: 25000, max: 30000, label: "Özel Tasarım Çelik Villa" }
    },
    rough: {
      premium: { min: 9500, max: 11000, label: "Temel + Kaba Betonarme" },
      luxury: { min: 11500, max: 13500, label: "Radye Temel + C35 Betonarme" },
      elite: { min: 14000, max: 16500, label: "Kaba Yapı + Çatı & Yalıtım" }
    }
  };

  const selectedRate = rates[projectType][tier];
  const minTotal = area * selectedRate.min;
  const maxTotal = area * selectedRate.max;

  const formatTL = (num: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(num);
  };

  const projectLabels = {
    villa: "Müstakil Villa İnşaatı",
    building: "Silivri Kentsel Dönüşüm / Bina",
    steel: "Çelik Konstrüksiyon Yapı",
    rough: "Kaba İnşaat & Temel"
  };

  const whatsappMessage = `Merhaba Yalçın Grup Mimarlık, web sitenizdeki 2026 maliyet hesaplayıcısını kullandım:
- Yapı Türü: ${projectLabels[projectType]}
- Kapalı Alan: ${area} m²
- Seviye: ${selectedRate.label}
- Tahmini Bütçe: ${formatTL(minTotal)} - ${formatTL(maxTotal)}
Arsamız için resmi mimari keşif ve net maliyet tablosu rica ediyoruz.`;

  return (
    <div className="rounded-3xl bg-[#111216] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#c5a059] text-xs font-mono tracking-widest uppercase mb-1">
              <span>[ 2026 SİLİVRİ İNŞAAT REHBERİ ]</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Maliyet & Bütçe <span className="font-semibold text-[#c5a059]">Hesaplayıcı</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              Arsanızın büyüklüğüne ve hedeflediğiniz kalite standardına göre güncel malzeme ve işçilik maliyetlerini anında hesaplayın.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Güncel 2026 Fiyat Endeksi</span>
          </div>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Type Selection */}
            <div>
              <label className="block text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">
                1. Yapı Tipini Belirleyin
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'villa', label: 'Villa / Müstakil' },
                  { id: 'building', label: 'Kentsel Dönüşüm' },
                  { id: 'steel', label: 'Çelik Villa' },
                  { id: 'rough', label: 'Kaba İnşaat' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id as any)}
                    className={`py-3 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      projectType === item.id
                        ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold shadow-lg shadow-[#c5a059]/20'
                        : 'bg-[#16181f] text-gray-300 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                  2. Toplam Kapalı İnşaat Alanı
                </label>
                <div className="text-lg font-bold text-white font-mono bg-[#16181f] px-3 py-1 rounded-lg border border-white/10">
                  {area} <span className="text-xs text-[#c5a059]">m²</span>
                </div>
              </div>
              <input
                type="range"
                min={80}
                max={600}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-mono mt-1">
                <span>80 m² (Kompakt)</span>
                <span>250 m² (Geniş Villa)</span>
                <span>600 m² (Malikane)</span>
              </div>
            </div>

            {/* Step 3: Material Quality Tier */}
            <div>
              <label className="block text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">
                3. Donatı ve Malzeme Standardı
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'premium', label: '1. Sınıf Standart', sub: 'TSE Belgeli Kalite' },
                  { id: 'luxury', label: 'Lüks Mimari', sub: 'Özel Cephe & Doğrama' },
                  { id: 'elite', label: 'Ultra Lüks', sub: 'Akıllı Ev & Peyzaj' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTier(item.id as any)}
                    className={`py-3 px-3 rounded-xl text-left border transition-all ${
                      tier === item.id
                        ? 'bg-[#1d1f27] border-[#c5a059] shadow-md'
                        : 'bg-[#16181f] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className={`text-xs font-bold ${tier === item.id ? 'text-[#c5a059]' : 'text-white'}`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 bg-[#0b0c0e] border border-[#c5a059]/30 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] block mb-1">
                TAHMİNİ BÜTÇE ARALIĞI
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                {formatTL(minTotal)} <span className="text-sm font-normal text-gray-400">ile</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#c5a059] tracking-tight">
                {formatTL(maxTotal)}
              </div>
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                *Fiyatlara mimari proje, zemin etüdü, kaba inşaat, çatı, yalıtım ve anahtar teslim ince işçilik dahildir.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
              <div className="text-gray-400 font-medium">Bütçe Dağılım Tahmini:</div>
              <div className="flex justify-between text-gray-300">
                <span>Temel & Taşıyıcı Sistem (C35 / Demir)</span>
                <span className="font-mono text-white">%40</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>İnce Yapı, Cephe & Çatı Yalıtımı</span>
                <span className="font-mono text-white">%35</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Mekanik & Elektrik Donatıları</span>
                <span className="font-mono text-white">%15</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Ruhsat, Statik & Mimari Projeler</span>
                <span className="font-mono text-white">%10</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${phoneRaw || '905380828592'}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-[#c5a059] hover:bg-[#d6b068] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.01]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Bu Hesapla WhatsApp'tan Teklif İste</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
