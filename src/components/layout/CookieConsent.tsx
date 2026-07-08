'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already consented or rejected
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing the popup slightly for a smoother entrance
      const timer = setTimeout(() => setShowConsent(true), 1000);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted') {
      // If they previously accepted, we would initialize tracking here
      initializeTracking();
    }
  }, []);

  const initializeTracking = () => {
    // This is where you would initialize Google Analytics, Meta Pixel, etc.
    // Example: window.gtag('consent', 'update', { analytics_storage: 'granted' });
    console.log("Tracking initialized because cookies were accepted.");
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    initializeTracking();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowConsent(false);
    // Ensure no tracking is loaded
    console.log("Cookies rejected. No tracking will be loaded.");
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] p-4 md:p-6 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md w-full animate-in slide-in-from-bottom-10 fade-in duration-700">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(22,72,120,0.2)] border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-copter-blue to-copter-red" />
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-copter-light flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-copter-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-copter-blue font-bold text-lg mb-1">We Value Your Privacy</h3>
              <p className="text-copter-grey text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-6">
            <button 
              onClick={handleReject}
              className="flex-1 py-2.5 px-4 text-sm font-bold tracking-widest uppercase rounded-lg border-2 border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Reject All
            </button>
            <button 
              onClick={handleAccept}
              className="flex-1 py-2.5 px-4 text-sm font-bold tracking-widest uppercase rounded-lg bg-copter-blue text-white shadow-md hover:bg-copter-red hover:-translate-y-0.5 transition-all"
            >
              Accept All
            </button>
          </div>
          <div className="text-center mt-4">
            <Link 
              href="/cookie-policy" 
              className="text-xs text-gray-400 font-medium hover:text-copter-red transition-colors underline underline-offset-2"
              onClick={() => setShowConsent(false)}
            >
              Read our full Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
