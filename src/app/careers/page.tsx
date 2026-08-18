import type { Metadata } from 'next';
import CareersClient from './CareersClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Careers | Join the Aviation & Aerospace Team in Africa',
  description:
    'Build your career with CopterJet International Group. Explore opportunities across aerospace supply chain, aircraft operations, aviation consulting, asset management, and charter services.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers at CopterJet International Group',
    description:
      'Join a virtuoso team dedicated to advancing aviation and aerospace across Africa and globally.',
    url: 'https://www.copterjetgroup.com/careers',
    images: [
      {
        url: '/images/careers-hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'CopterJet Careers',
      },
    ],
  },
};

export default function CareersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Careers', item: '/careers' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CareersClient />
    </>
  );
}
