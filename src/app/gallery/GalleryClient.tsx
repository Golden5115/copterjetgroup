'use client';

import React, { useState, useEffect, useCallback } from 'react';

type GalleryClientProps = {
  images: string[];
};

export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev! + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev! - 1 + images.length) % images.length);
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImageIndex, images.length]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  const closeModal = () => setSelectedImageIndex(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev! + 1) % images.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev! - 1 + images.length) % images.length);
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {images.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`break-inside-avoid rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer bg-white relative opacity-0 ${
                loadedImages.has(idx) ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: `${(idx % 10) * 100}ms` }}
              onClick={() => setSelectedImageIndex(idx)}
            >
              <div className="relative w-full aspect-auto overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/gallery/${img}`}
                  alt={`CopterJet Gallery Image ${idx + 1}`}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                  onLoad={() => handleImageLoad(idx)}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-copter-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-copter-red/90 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 ease-out">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-lg shadow-sm border border-gray-100">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-copter-grey text-lg font-medium">No images available in the gallery at the moment.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-copter-red rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 group"
            onClick={closeModal}
            aria-label="Close"
          >
            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-copter-blue rounded-full flex items-center justify-center text-white transition-all duration-300 z-50"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-copter-blue rounded-full flex items-center justify-center text-white transition-all duration-300 z-50"
            onClick={nextImage}
            aria-label="Next image"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] px-4 md:px-20 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/gallery/${images[selectedImageIndex]}`}
                alt={`CopterJet Gallery Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-300"
              />
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-widest text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
