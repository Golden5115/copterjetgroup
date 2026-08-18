import type { Metadata } from 'next';
import RfpClient from './RfpClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Submit RFP | Request for Proposal - Aviation & Aerospace Solutions',
  description:
    'Submit a Request for Proposal (RFP) to CopterJet International Group. Provide your project scope, fleet requirements, or advisory needs for a custom aviation proposal.',
  alternates: {
    canonical: '/rfp',
  },
  openGraph: {
    title: 'Submit a Request for Proposal (RFP) | CopterJet International Group',
    description:
      'Submit your RFP to CopterJet International Group for aircraft acquisition, fleet consulting, aerospace logistics, or asset management.',
    url: 'https://www.copterjetgroup.com/rfp',
    images: [
      {
        url: '/images/hero-bg-network2.jpg',
        width: 1200,
        height: 630,
        alt: 'Submit RFP CopterJet',
      },
    ],
  },
};

export default function SubmitRFPPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Submit RFP', item: '/rfp' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RfpClient />
    </>
  );
}
