'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Maximize2, 
  Layers, 
  ArrowUpRight, 
  Search, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare,
  SlidersHorizontal,
  Compass,
  Tag,
  Info
} from 'lucide-react';
import type { PrefabrikHouse } from '@/lib/db';

interface Props {
  houses: PrefabrikHouse[];
  phoneRaw: string;
}

export default function PrefabrikCatalog({ houses, phoneRaw }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxArea, setMaxArea] = useState<number>(250);

  const categories = [
    { id: 'all', label: 'Tüm Modeller', count: houses.length },
    { id: 'tek-katli', label: 'Tek Katlı Evler', count: houses.filter(h => !h.isDubleks && !h.isCelik && !h.structureType.includes('Bungalov') && !h.structureType.includes('Ofis')).length },
    { id: 'dubleks', label: 'Dubleks (2 Katlı)', count: houses.filter(h => h.isDubleks && !h.isCelik).length },
    { id: 'celik', label: 'Hafif Çelik Evler', count: houses.filter(h => h.isCelik).length },
    { id: 'tiny', label: 'Tiny House & Bungalov', count: houses.filter(h => h.structureType.includes('Bungalov') || h.name.toLowerCase().includes('tiny')).length },
    { id: 'ofis', label: 'Prefabrik Ofis', count: houses.filter(h => h.structureType.includes('Ofis')).length },
  ];

  const roomsList = ['all', '1+1', '2+1', '3+1', '4+1'];

  const filteredHouses = useMemo(() => {
    return houses.filter(h => {
      // Category filter
      if (selectedCategory === 'tek-katli' && (h.isDubleks || h.isCelik || h.structureType.includes('Bungalov') || h.structureType.includes('Ofis'))) return false;
      if (selectedCategory === 'dubleks' && (!h.isDubleks || h.isCelik)) return false;
      if (selectedCategory === 'celik' && !h.isCelik) return false;
      if (selectedCategory === 'tiny' && !h.structureType.includes('Bungalov') && !h.name.toLowerCase().includes('tiny')) return false;
      if (selectedCategory === 'ofis' && !h.structureType.includes('Ofis')) return false;

      // Room filter
      if (selectedRoom !== 'all') {
        if (!h.rooms.includes(selectedRoom)) return false;
      }

      // Area filter
      if (h.area && h.area > maxArea) return false;

      // Search query (Supports Model Name, Room, Structure Type, and Model SKU Code!)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = h.name.toLowerCase().includes(q);
        const matchType = h.structureType.toLowerCase().includes(q);
        const matchRoom = h.rooms.toLowerCase().includes(q);
        const matchSku = h.sku ? h.sku.toLowerCase().includes(q) : false;
        if (!matchName && !matchType && !matchRoom && !matchSku) return false;
      }

      return true;
    });
  }, [houses, selectedCategory, selectedRoom, maxArea, searchQuery]);

  return (
    <div className="space-y-10">
      
      {/* Filter Toolbar */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-6">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 border ${
                selectedCategory === cat.id
                  ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold shadow-lg shadow-[#c5a059]/20'
                  : 'bg-[#16181f] text-gray-300 border-white/[0.08] hover:border-white/20 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                selectedCategory === cat.id ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Secondary Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/[0.06] items-end">
          
          {/* Search Box with SKU code support */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Model Kodu veya Adı ile Ara</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Örn: IMPT0861, 86 m2, 3+1, Çelik..."
                className="w-full bg-[#181a22] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Room Filter */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Oda Sayısı</span>
            </label>
            <div className="flex gap-1.5">
              {roomsList.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRoom(r)}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono transition-all border ${
                    selectedRoom === r
                      ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
                      : 'bg-[#181a22] text-gray-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  {r === 'all' ? 'Tümü' : r}
                </button>
              ))}
            </div>
          </div>

          {/* Area Slider */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex justify-between items-center text-[11px] font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Maksimum Alan:</span>
              </span>
              <span className="text-[#c5a059] font-bold">{maxArea} m²</span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              step="5"
              value={maxArea}
              onChange={(e) => setMaxArea(Number(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
          </div>

        </div>

        {/* Status text */}
        <div className="flex justify-between items-center text-xs font-mono text-gray-400 pt-2 border-t border-white/[0.04]">
          <span>Toplam <strong className="text-white">{filteredHouses.length}</strong> prefabrik ve çelik ev modeli listeleniyor</span>
          {(selectedCategory !== 'all' || selectedRoom !== 'all' || searchQuery || maxArea < 250) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRoom('all');
                setSearchQuery('');
                setMaxArea(250);
              }}
              className="text-[#c5a059] hover:underline cursor-pointer"
            >
              Filtreleri Sıfırla
            </button>
          )}
        </div>

      </div>

      {/* Houses Grid */}
      {filteredHouses.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-[#111216] border border-white/10 space-y-4">
          <SlidersHorizontal className="w-10 h-10 text-gray-600 mx-auto" />
          <h3 className="text-lg font-medium text-white">Aradığınız kriterlere uygun model bulunamadı</h3>
          <p className="text-xs text-gray-400">Lütfen filtreleri sıfırlayarak veya arama kelimesini değiştirerek tekrar deneyiniz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHouses.map((house) => {
            const whatsappMessage = encodeURIComponent(
              `Merhaba Yalçın Grup Mimarlık, [Model Kodu: ${house.sku}] "${house.name}" (${house.area ? house.area + ' m² ' : ''}${house.rooms} - Liste Fiyatı: ${house.priceFormatted}) hakkında fabrika teslimi ve Silivri arsamıza anahtar teslim (ruhsat + zemin betonu + ince işçilik) fiyat teklifi almak istiyorum.`
            );

            return (
              <div
                key={house.id}
                className="group rounded-2xl overflow-hidden bg-[#111216] border border-white/[0.08] hover:border-[#c5a059]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <Link href={`/prefabrik-ev-yapimi/${house.slug}/`} className="block relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                    <img
                      src={house.featuredImage || '/uploads/projects/modern-villa.jpg'}
                      alt={house.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Model Code / SKU Badge (Top Left) */}
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#c5a059] border border-[#c5a059]/40 tracking-wider flex items-center gap-1 shadow-lg">
                      <Tag className="w-3 h-3 text-[#c5a059]" />
                      <span>KOD: {house.sku}</span>
                    </div>

                    {/* Room Badge */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-bold text-white border border-white/10">
                      {house.rooms}
                    </div>

                    {/* Area Badge */}
                    {house.area && (
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono font-semibold text-white border border-white/10 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-[#c5a059]" />
                        <span>{house.area} m²</span>
                      </div>
                    )}

                    {house.planImage && (
                      <div className="absolute bottom-3 right-3 bg-[#c5a059]/90 text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                        Plan Mevcut
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                        <span className="text-[#c5a059] uppercase tracking-wider">{house.structureType}</span>
                        <span>{house.isDubleks ? '2 Katlı' : 'Tek Katlı'}</span>
                      </div>
                      <Link href={`/prefabrik-ev-yapimi/${house.slug}/`}>
                        <h3 className="text-lg font-normal text-white group-hover:text-[#c5a059] transition-colors font-display line-clamp-1">
                          {house.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Price Block */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#161820] to-[#121318] border border-white/[0.08] space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                            Fabrika Satış Fiyatı
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold font-mono text-[#c5a059] tracking-tight">
                              {house.priceFormatted || 'Fiyat Sorunuz'}
                            </span>
                            {house.regularPriceFormatted && house.regularPriceFormatted !== house.priceFormatted && (
                              <span className="text-xs font-mono text-gray-500 line-through">
                                {house.regularPriceFormatted}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wide">
                          Fabrika Kurulumu
                        </span>
                      </div>

                      {/* Included Scope Bullet */}
                      <div className="pt-2 border-t border-white/[0.04] text-[10px] font-mono text-gray-300 leading-snug">
                        <span className="text-emerald-400 font-semibold">✓ Fiyata Dâhil:</span> Kapı + Çatı + Pencere + İç/Dış Boya + Elektrik & Su Tesisatı + Armatürler.
                      </div>
                    </div>

                    {/* Excluded / Optional Turn-key Scope Notice */}
                    <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-[10px] font-mono text-gray-400 leading-relaxed">
                      <span className="text-[#c5a059] font-medium">+ Anahtar Teslim İçin:</span> Ruhsat, zemin betonu, şap, parke, fayans, mutfak dolabı ve vinç için fiyat alınız.
                    </div>

                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/prefabrik-ev-yapimi/${house.slug}/`}
                      className="py-3 px-3 rounded-lg border border-white/15 hover:border-[#c5a059] text-white hover:text-[#c5a059] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <span>İncele</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/${phoneRaw}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3 rounded-lg bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-[#c5a059]/20 text-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Teklif Al</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
