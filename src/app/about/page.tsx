import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Us | Leadership, History & Corporate Governance',
  description:
    'Discover CopterJet International Group: Africa’s premier aviation and aerospace solutions enterprise. Learn about our executive leadership, board of directors, corporate governance, and ESG framework.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | CopterJet International Group',
    description:
      'Learn about CopterJet International Group: Africa’s premier aviation and aerospace solutions enterprise, our vision, leadership team, and corporate governance.',
    url: 'https://www.copterjetgroup.com/about',
    images: [
      {
        url: '/images/who_we_are2.jpg',
        width: 1200,
        height: 630,
        alt: 'About CopterJet International Group',
      },
    ],
  },
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'About Us', item: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}