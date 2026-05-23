'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const MARKET_QUOTES = [
  'Great markets are built by people who show up for their community.',
  'When organizers and vendors work together, everyone wins.',
  'Good systems create great event days.',
  'Small businesses thrive where preparation meets opportunity.',
  'Every booth has a story worth supporting.',
  'Clarity before event day prevents chaos on event day.',
  'Consistency earns trust from vendors and attendees alike.',
  'Healthy local markets strengthen the whole city.',
  'The best events run on communication, not guesswork.',
  'Organization is an act of service to your community.',
  'Strong planning turns busy streets into thriving marketplaces.',
  'Better tools free people to focus on people.'
];

export function CrossQuoteWidget() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const dayBucket = Math.floor(Math.floor(Date.now() / 86400000) / 2);
      const selectedQuote = MARKET_QUOTES[dayBucket % MARKET_QUOTES.length];
      setQuote(selectedQuote);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (!quote) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex max-w-[200px] flex-col items-center text-center">
      <Image src="/cross.jpg" alt="Cross" width={64} height={64} className="mb-2 h-16 w-16 object-contain" />
      <p className="rounded-md bg-black/35 px-2 py-1 text-xs italic leading-snug text-white/85 shadow-lg">"{quote}"</p>
    </div>
  );
}
