'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Read from data/projects.json via simple fetch
    fetch('/api/admin/posts') // just test
      .then(() => {
        // Mock or load projects list
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Mimari Projeler & Portfolyo</h1>
          <p className="text-xs text-gray-400 mt-0.5">Sitedeki 8 adet tamamlanan mimari proje ve görsel galerileri.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Modern Villa Tasarımı", slug: "modern-villa-tasarimi", count: 31, cat: "Villa Projesi" },
          { title: "Zarif ve Modern Konut Tasarımı", slug: "zarif-moder-konut-tasarimi", count: 37, cat: "Villa Projesi" },
          { title: "Fabrika Projesi", slug: "fabrika-projesi", count: 23, cat: "Endüstriyel Yapı" },
          { title: "Modern Endüstriyel Fabrika", slug: "modern-endustriyel-fabrika-tasarimi", count: 18, cat: "Endüstriyel Yapı" },
          { title: "Modern Lüks Villa Tasarımı", slug: "luks-villa-tasarimi", count: 27, cat: "Villa Projesi" },
          { title: "3 Katlı Villa Tasarımı", slug: "3-katli-villa-tasarimi", count: 27, cat: "Villa Projesi" },
          { title: "Sınıf Projesi", slug: "sinif-projesi", count: 17, cat: "Mimari Proje" },
          { title: "Konferans Salonu Projesi", slug: "konferans-salonu-projesi", count: 17, cat: "Mimari Proje" },
        ].map((proj, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-brand-card border border-brand-border space-y-3">
            <span className="text-[10px] px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-semibold">
              {proj.cat}
            </span>
            <h3 className="font-bold text-white text-sm">{proj.title}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
              <span>{proj.count} adet yüksek çözünürlüklü görsel</span>
            </p>
            <div className="pt-2 border-t border-brand-border flex items-center justify-between text-xs">
              <Link href={`/portfolio/${proj.slug}/`} target="_blank" className="text-brand-gold hover:underline flex items-center gap-1">
                <span>Görüntüle</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
