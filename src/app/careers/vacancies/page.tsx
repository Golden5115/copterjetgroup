import type { Metadata } from 'next';
import VacanciesClient from './VacanciesClient';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Vacancies & Opportunities | CopterJet Careers',
  description:
    'View current job openings, talent pool applications, and career opportunities at CopterJet International Group in Lagos, Nigeria and across Africa.',
  alternates: {
    canonical: '/careers/vacancies',
  },
  openGraph: {
    title: 'Vacancies & Opportunities | CopterJet Careers',
    description:
      'Explore current job openings and career opportunities with CopterJet International Group.',
    url: 'https://www.copterjetgroup.com/careers/vacancies',
    images: [
      {
        url: '/images/careers-hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'CopterJet Vacancies & Opportunities',
      },
    ],
  },
};

export default function VacanciesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Careers', item: '/careers' },
    { name: 'Vacancies', item: '/careers/vacancies' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VacanciesClient />
    </>
  );
}
