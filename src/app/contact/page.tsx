import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us | Corporate Headquarters Ikeja Lagos & Global Desk',
  description:
    'Contact CopterJet International Group. Reach our Corporate Head Office at Airport Business Hub, Murtala Muhammed International Airport, Ikeja, Lagos, Nigeria, or connect with our global enquiries desk.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | CopterJet International Group',
    description:
      'Contact CopterJet International Group corporate headquarters at Murtala Muhammed Int\'l Airport, Lagos, Nigeria, or reach our global inquiry team.',
    url: 'https://www.copterjetgroup.com/contact',
    images: [
      {
        url: '/images/contact-support.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact CopterJet International Group',
      },
    ],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Contact Us', item: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  );
}
