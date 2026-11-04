'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Sparkles, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin/');
      } else {
        setError(data.message || 'Giriş başarısız. Şifreyi kontrol edin.');
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#13141a] border border-brand-border rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-24 h-24 mx-auto p-2">
            <img
              src="/logo.png"
              alt="Yalçın Grup Mimarlık Logo"
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-bold font-display text-white">
            Yalçın Grup Mimarlık
          </h1>
          <p className="text-xs text-brand-gold font-medium uppercase tracking-widest font-mono">
            Yönetim Paneli Girişi
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0b0e] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Yönetici Şifresi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0b0e] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Giriş Yapılıyor...' : 'Panele Giriş Yap'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-gray-500">
          Güvenli bağlantı ve içerik yönetim sistemi
        </div>

      </div>
    </div>
  );
}
