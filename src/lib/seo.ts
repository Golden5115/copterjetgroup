export const siteConfig = {
  name: 'CopterJet International Group',
  shortName: 'CopterJet',
  title: 'CopterJet International Group | Aviation Excellence & Aerospace Solutions',
  description:
    'A fully integrated aviation and aerospace solutions enterprise in Africa. Specializing in aircraft brokerage, spares & components, ground support equipment (GSE), aviation logistics, aircraft leasing, and strategic aerospace consulting.',
  url: 'https://www.copterjetgroup.com',
  ogImage: '/images/hero-bg-network2.jpg',
  keywords: [
    'CopterJet International',
    'CopterJet Group',
    'Aviation Africa',
    'Aerospace Supply Chain',
    'Aircraft Spares and Components',
    'Aircraft Brokerage Africa',
    'Aircraft Leasing Nigeria',
    'Ground Support Equipment GSE',
    'Aviation Logistics Nigeria',
    'AOG Support Africa',
    'Aircraft Maintenance MRO',
    'Aviation Consulting Africa',
    'Captain Toluwa Olorunyomi',
    'Lagos Airport Aviation Hub',
    'African Regional Airlines',
    'NCAA Compliant Aviation',
  ],
  links: {
    facebook: 'https://www.facebook.com/share/1BZU7rnkLo/',
    instagram: 'https://www.instagram.com/copterjetintl.ltd?utm_source=qr&igsh=MTNpcTBvNmU2bHZ1cg==',
    linkedin: 'https://www.linkedin.com/company/copterjet-international-ltd/',
    twitter: 'https://x.com/copterjetintltd',
    youtube: 'https://youtube.com/@copterjetinternational5060?si=qn7LOmo1kPw8WvoX',
  },
  contact: {
    address: {
      streetAddress: 'Suite 202, 2nd Floor, Right Wing, Airport Business Hub, Murtala Muhammed Int\'l Airport Business District, Int\'l Airport Rd',
      addressLocality: 'Ikeja',
      addressRegion: 'Lagos',
      postalCode: '100001',
      addressCountry: 'NG',
    },
    geo: {
      latitude: '6.5774',
      longitude: '3.3211',
    },
    email: 'info@copterjetgroup.com',
    hqEmail: 'info@copterjet.com.ng',
    phones: ['+23491393447441', '+23491393447442'],
  },
};

/**
 * Generates Organization and Corporation JSON-LD Structured Data Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/Logo5.png`,
    image: `${siteConfig.url}/images/hero-bg-network2.jpg`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phones[0],
        contactType: 'customer support',
        email: siteConfig.contact.email,
        areaServed: ['NG', 'Africa', 'Global'],
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phones[1],
        contactType: 'sales',
        email: siteConfig.contact.hqEmail,
        areaServed: ['NG', 'Africa'],
        availableLanguage: ['English'],
      },
    ],
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
      siteConfig.links.facebook,
      siteConfig.links.youtube,
    ],
  };
}

/**
 * Generates WebSite JSON-LD Structured Data Schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Generates Article JSON-LD Structured Data Schema
 */
export function generateArticleSchema(article: {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  content: string[];
}) {
  let datePublished = article.date;
  try {
    const parsed = new Date(article.date);
    if (!isNaN(parsed.getTime())) {
      datePublished = parsed.toISOString().split('T')[0];
    }
  } catch {
    // fallback to original date string
  }
  const description = article.content[0]?.slice(0, 200) + '...';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteConfig.url}/insights/${article.slug}#article`,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    headline: article.title,
    description: description,
    inLanguage: 'en-US',
    mainEntityOfPage: `${siteConfig.url}/insights/${article.slug}`,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    articleSection: article.category,
    image: `${siteConfig.url}/images/insight-featured.jpg`,
  };
}

/**
 * Generates BreadcrumbList JSON-LD Structured Data Schema
 */
export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : `${siteConfig.url}${crumb.item}`,
    })),
  };
}

/**
 * Generates LocalBusiness JSON-LD Structured Data Schema
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/images/hero-bg-network2.jpg`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phones[0],
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  };
}
