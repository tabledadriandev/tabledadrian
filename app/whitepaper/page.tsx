import type { Metadata } from 'next';
import WhitepaperClient from './WhitepaperClient';

export const metadata: Metadata = {
  title: '$tabledadrian Whitepaper',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WhitepaperPage() {
  return <WhitepaperClient />;
}


