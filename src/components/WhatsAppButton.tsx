'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({ phoneRaw }: { phoneRaw?: string }) {
  const number = phoneRaw || '905380828592';
  const url = `https://wa.me/${number}?text=${encodeURIComponent('Merhaba, projemiz / arsamız için bilgi almak istiyoruz.')}`;

  return (
    <aside aria-label="Hızlı WhatsApp İletişim Butonu">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
        aria-label="WhatsApp İletişim"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 font-medium text-xs transition-all duration-300">
          WhatsApp Bilgi Hattı
        </span>
      </a>
    </aside>
  );
}
