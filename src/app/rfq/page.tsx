import type { Metadata } from 'next';
import RfqClient from './RfqClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Submit RFQ | Request for Quotation - Aircraft Parts, Engines & GSE',
  description:
    'Submit a Request for Quotation (RFQ) to CopterJet International Group for fast pricing on certified aircraft spares, turbine engines, ground support equipment, and rapid AOG dispatch.',
  alternates: {
    canonical: '/rfq',
  },
  openGraph: {
    title: 'Submit a Request for Quotation (RFQ) | CopterJet International Group',
    description:
      'Submit your RFQ to CopterJet International Group for aircraft parts, engines, and ground support equipment pricing.',
    url: 'https://www.copterjetgroup.com/rfq',
    images: [
      {
        url: '/images/turbine-blade.png.png',
        width: 1200,
        height: 630,
        alt: 'Submit RFQ CopterJet',
      },
    ],
  },
};

export default function SubmitRFQPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Submit RFQ', item: '/rfq' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RfqClient />
    </>
  );
}
