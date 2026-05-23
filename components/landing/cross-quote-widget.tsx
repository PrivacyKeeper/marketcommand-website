'use client';

import Image from 'next/image';
import { GENERAL_CROSS_QUOTES } from '@/lib/general-cross-quotes';

function getQuoteForToday() {
  const dayBucket = Math.floor(Math.floor(Date.now() / 86400000) / 2);
  return GENERAL_CROSS_QUOTES[dayBucket % GENERAL_CROSS_QUOTES.length];
}

export function CrossQuoteWidget() {
  const quote = getQuoteForToday();

  if (!quote) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex max-w-[200px] flex-col items-center text-center">
      <Image src="/cross.jpg" alt="Cross" width={64} height={64} className="mb-2 h-16 w-16 object-contain" />
      <p className="rounded-md bg-black/35 px-2 py-1 text-xs italic leading-snug text-white/85 shadow-lg">"{quote}"</p>
    </div>
  );
}
