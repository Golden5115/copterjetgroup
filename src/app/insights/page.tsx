import type { Metadata } from 'next';
import InsightsClient from './InsightsClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Aviation Insights & Industry Intelligence | African Aerospace',
  description:
    'Thought leadership, research whitepapers, and market intelligence on African aviation, corporate governance, aircraft leasing trends, and sustainable aerospace supply chains by CopterJet R&D.',
  alternates: {
    canonical: '/insights',
  },
  openGraph: {
    title: 'Aviation Insights & Industry Intelligence | CopterJet International Group',
    description:
      'Explore expert opinions, market intelligence, and research on African aviation, corporate governance, and sustainable supply chains.',
    url: 'https://www.copterjetgroup.com/insights',
    images: [
      {
        url: '/images/insight-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'CopterJet Aviation Insights',
      },
    ],
  },
};

export default function InsightsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Insights', item: '/insights' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <InsightsClient />
    </>
  );
}
