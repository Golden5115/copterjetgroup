import React from 'react';
import fs from 'fs';
import path from 'path';
import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Gallery | CopterJet International',
  description: 'View photos from CopterJet International operations, events, and aviation infrastructure.',
};

export default function GalleryPage() {
  // Read images from the public directory
  let images: string[] = [];
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      // Filter for image files
      images = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      });
    }
  } catch (error) {
    console.error('Error reading gallery directory:', error);
  }

  return (
    <div className="bg-copter-light min-h-screen py-20 px-6 lg:px-12 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none"></div>
      <div className="absolute top-40 right-[-10%] w-[40rem] h-[40rem] rounded-full bg-copter-blue/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 left-[-10%] w-[30rem] h-[30rem] rounded-full bg-copter-red/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-copter-red font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Media & Highlights</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-copter-blue mb-8 tracking-tight">Our Gallery</h1>
          <div className="w-24 h-1.5 bg-copter-red mx-auto mb-8 rounded-full"></div>
          <p className="text-copter-grey text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A visual showcase of CopterJet International's events and aviation stakeholder's engagements.
          </p>
        </div>

        <GalleryClient images={images} />
      </div>
    </div>
  );
}
