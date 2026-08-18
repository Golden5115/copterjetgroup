import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Aviation Services | Aircraft Brokerage, Spares, Logistics & Consulting',
  description:
    'Comprehensive aviation and aerospace services by CopterJet: Aircraft sales & acquisition, certified spares & engines, ground support equipment, AOG logistics, aircraft maintenance management, and aviation advisory.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Aviation Services | CopterJet International Group',
    description:
      'Explore CopterJet’s comprehensive aviation services: Aircraft Brokerage, Certified Spares & Engines, GSE Procurement, AOG Logistics, and MRO Support.',
    url: 'https://www.copterjetgroup.com/services',
    images: [
      {
        url: '/images/services-custom2.jpg',
        width: 1200,
        height: 630,
        alt: 'CopterJet Aviation Services',
      },
    ],
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesClient />
    </>
  );
}
