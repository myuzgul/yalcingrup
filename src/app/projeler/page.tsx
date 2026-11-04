import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/db';
import { Building2, MapPin, Maximize2, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mimari Projeler & Portfolyo | Yalçın Grup Mimarlık Silivri',
  description: 'Silivri, Çanta, Selimpaşa ve Marmara Bölgesi genelinde hayata geçirdiğimiz lüks villa, modern konut, eğitim yapıları ve endüstriyel tesis projelerimiz.',
  alternates: {
    canonical: 'https://www.yalcingrupmimarlik.com/projeler/',
  },
};

export default function ProjectsListingPage() {
  const projects = getProjects();

  return (
    <div className="py-20 bg-[#090a0c] text-[#eae7e1] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-white/[0.08] pb-10">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#c5a059]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
              ARŞİV & PROJELER
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white font-display">
            Seçkin Mimari Portfolyomuz
          </h1>
          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            Deprem dayanımı yüksek mühendislik hesapları ile modern mimari çizgiyi buluşturan villa, konut, eğitim ve sanayi projelerimiz.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <Link
              key={idx}
              href={`/portfolio/${proj.slug}/`}
              className="group rounded-2xl overflow-hidden bg-[#111216] border border-white/[0.08] hover:border-[#c5a059]/60 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                {proj.featuredImage ? (
                  <img
                    src={proj.featuredImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <Building2 className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-medium text-[#c5a059] border border-white/10 uppercase tracking-wider">
                  {proj.category}
                </div>
                {proj.year && (
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-gray-300 border border-white/10">
                    {proj.year}
                  </div>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h2 className="font-normal text-white text-lg font-display group-hover:text-[#c5a059] transition-colors leading-snug">
                    {proj.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-gray-400">
                    {proj.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#c5a059]" />
                        {proj.location}
                      </span>
                    )}
                    {proj.area && (
                      <span className="inline-flex items-center gap-1.5">
                        <Maximize2 className="w-3 h-3 text-[#c5a059]" />
                        {proj.area}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-gray-400">
                  <span className="text-[11px] text-gray-400">{proj.gallery?.length || 1} Fotoğraf • Vaka Analizi</span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-[#c5a059] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
