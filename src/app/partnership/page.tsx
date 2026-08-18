import type { Metadata } from 'next';
import PartnershipClient from './PartnershipClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Strategic Partnerships | Global Aviation Alliances & Collaboration',
  description:
    'Partner with CopterJet International Group: Collaborate across aerospace supply chain, aircraft brokerage, flight operations, infrastructure development, and aviation investment in Africa.',
  alternates: {
    canonical: '/partnership',
  },
  openGraph: {
    title: 'Strategic Partnerships | CopterJet International Group',
    description:
      'Collaborate with CopterJet International Group to advance Africa’s aviation infrastructure, supply chain, and aerospace capabilities.',
    url: 'https://www.copterjetgroup.com/partnership',
    images: [
      {
        url: '/images/partnership-hero.png',
        width: 1200,
        height: 630,
        alt: 'CopterJet Strategic Partnerships',
      },
    ],
  },
};

export default function PartnershipPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Strategic Partnerships', item: '/partnership' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PartnershipClient />
    </>
  );
}
