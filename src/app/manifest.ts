import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a1220',
    theme_color: '#164878',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/Logo5.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/Logo4.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
