'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Tag, 
  Layers
} from 'lucide-react';

interface PrefabrikGalleryProps {
  images: string[];
  title: string;
  sku: string;
  planImage?: string | null;
}

export default function PrefabrikGallery({
  images: initialImages,
  title,
  sku,
  planImage
}: PrefabrikGalleryProps) {
  // Deduplicate and filter out empty strings
  const images = Array.from(
    new Set([
      ...initialImages,
      ...(planImage ? [planImage] : [])
    ].filter(Boolean) as string[])
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fallback if no images
  if (!images.length) {
    return (
      <div className="aspect-[16/10] w-full rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-gray-500 font-mono text-xs">
        Görsel bulunamadı
      </div>
    );
  }

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  return (
    <div className="space-y-4">
      
      {/* Main Large Display Image */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 group">
        
        {/* Clickable Image to view or zoom */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="w-full h-full text-left cursor-zoom-in focus:outline-none relative block"
          title="Büyük boyutta görüntülemek için tıklayınız"
        >
          <img
            key={currentImage}
            src={currentImage}
            alt={`${title} - Görsel ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Model Code / SKU Badge (Top Left) */}
        <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#c5a059] border border-[#c5a059]/40 tracking-wider flex items-center gap-1.5 shadow-lg pointer-events-none">
          <Tag className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>KOD: {sku}</span>
        </div>

        {/* Image Index Counter Badge (Top Right) */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-gray-300 border border-white/10 shadow-lg pointer-events-none">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Prev & Next Arrows on Main Image */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-[#c5a059] text-white hover:text-black border border-white/20 hover:border-[#c5a059] flex items-center justify-center backdrop-blur-md transition-all shadow-xl group-hover:opacity-100 opacity-80"
              title="Önceki Görsel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-[#c5a059] text-white hover:text-black border border-white/20 hover:border-[#c5a059] flex items-center justify-center backdrop-blur-md transition-all shadow-xl group-hover:opacity-100 opacity-80"
              title="Sonraki Görsel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Lightbox / Expand Button (Bottom Right) */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-[#c5a059] text-white hover:text-black text-xs font-mono border border-white/20 hover:border-[#c5a059] flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg"
          title="Tam Ekran İncele"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tam Ekran</span>
        </button>

      </div>

      {/* Interactive Thumbnails Row */}
      {images.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 px-1">
            <span className="flex items-center gap-1 text-[#c5a059]">
              <Layers className="w-3.5 h-3.5" />
              <span>Model Fotoğrafları & Kat Planı ({images.length})</span>
            </span>
            <span className="text-[10px] text-gray-500">Büyük fotoğrafta görmek için tıklayınız</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {images.map((imgUrl, i) => {
              const isActive = i === activeIndex;
              const isPlan = planImage && imgUrl === planImage;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`group relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-200 border-2 bg-zinc-950 focus:outline-none ${
                    isActive
                      ? 'border-[#c5a059] ring-2 ring-[#c5a059]/40 scale-[1.03] shadow-lg shadow-[#c5a059]/20'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40'
                  }`}
                  title={isPlan ? 'Kat Planı' : `${title} - Fotoğraf ${i + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${title} Küçük Görsel ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#c5a059]" />
                  )}

                  {/* Plan Badge if this thumbnail is the floor plan */}
                  {isPlan && (
                    <div className="absolute top-1 right-1 bg-black/85 text-[8px] font-mono text-[#c5a059] px-1 py-0.5 rounded border border-[#c5a059]/40">
                      PLAN
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div 
            className="flex items-center justify-between border-b border-white/10 pb-4 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#c5a059] text-black font-mono font-bold text-[10px] uppercase">
                  {sku}
                </span>
                <h3 className="text-sm sm:text-base font-light font-display text-white truncate max-w-md">
                  {title}
                </h3>
              </div>
              <p className="text-[11px] font-mono text-gray-400">
                Görsel {activeIndex + 1} / {images.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Large Image View */}
          <div 
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={`${title} - Tam Ekran`}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
            />

            {/* Lightbox Prev & Next Buttons */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 hover:bg-[#c5a059] text-white hover:text-black border border-white/20 hover:border-[#c5a059] flex items-center justify-center transition-all shadow-2xl"
                  title="Önceki"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 hover:bg-[#c5a059] text-white hover:text-black border border-white/20 hover:border-[#c5a059] flex items-center justify-center transition-all shadow-2xl"
                  title="Sonraki"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {images.length > 1 && (
            <div 
              className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    i === activeIndex
                      ? 'border-[#c5a059] ring-2 ring-[#c5a059]/40 opacity-100 scale-105'
                      : 'border-white/10 opacity-50 hover:opacity-90'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
