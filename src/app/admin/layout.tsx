'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Briefcase, 
  Menu as MenuIcon, 
  Settings, 
  Globe, 
  LogOut,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render clean container
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Başlangıç (Özet)', href: '/admin/', icon: LayoutDashboard },
    { label: 'Blog Yazıları', href: '/admin/posts/', icon: FileText },
    { label: 'Kategoriler', href: '/admin/categories/', icon: FolderTree },
    { label: 'Portfolyo / Projeler', href: '/admin/projects/', icon: Briefcase },
    { label: 'Menü Yönetimi', href: '/admin/menus/', icon: MenuIcon },
    { label: 'Site & SEO Ayarları', href: '/admin/settings/', icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login/');
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-gray-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111217] border-r border-brand-border flex flex-col justify-between p-4 shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="px-2 py-3 border-b border-brand-border/60 flex items-center justify-between">
            <Link href="/admin/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg border border-[#c5a059]/40 bg-[#151720] p-1 flex items-center justify-center shadow">
                <img
                  src="/tower-symbol.png"
                  alt="Yalçın Grup Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block font-bold text-sm tracking-wide text-white">Yalçın Grup</span>
                <span className="block text-[10px] text-brand-gold font-semibold uppercase font-mono">Yönetim Paneli</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-gold text-black font-bold shadow-md shadow-brand-gold/10'
                      : 'text-gray-300 hover:text-white hover:bg-brand-card'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-brand-border/60 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-brand-gold hover:bg-brand-card transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Siteyi Yeni Sekmede Aç</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#0d0e12] p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
