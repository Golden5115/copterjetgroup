import type { Metadata } from 'next';
import BusinessesClient from './BusinessesClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Our Businesses | Spares, Ground Equipment, Asset Management & Leasing',
  description:
    'Explore CopterJet’s business lines: Spares & Components, Ground Support Equipment (GSE), Logistics, Asset Management, Aviation Services, Aircraft Leasing, and Flight Operations across Africa.',
  alternates: {
    canonical: '/businesses',
  },
  openGraph: {
    title: 'Our Businesses | CopterJet International Group',
    description:
      'Explore CopterJet’s core business lines: Spares & Components, Ground Equipment, Logistics, Asset Management, Leasing, and Flight Operations.',
    url: 'https://www.copterjetgroup.com/businesses',
    images: [
      {
        url: '/images/hero-bg-network2.jpg',
        width: 1200,
        height: 630,
        alt: 'CopterJet Businesses',
      },
    ],
  },
};

export default function BusinessesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Our Businesses', item: '/businesses' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BusinessesClient />
    </>
  );
}