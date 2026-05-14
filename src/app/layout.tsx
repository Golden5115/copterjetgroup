import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "CopterJet International | Aviation Excellence",
  description: "Leading aviation and aerospace services company in Africa. Aircraft brokerage, logistics, and consulting.",
};

// 1. Explicitly export the default viewport settings
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 2. THE FIX: Detects "Request Desktop Site" (980px) 
          and forces the viewport to 1024px so the Desktop Navbar triggers.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.innerWidth >= 980 && window.innerWidth < 1024) {
                  var meta = document.querySelector('meta[name="viewport"]');
                  if (meta) {
                    meta.setAttribute('content', 'width=1024');
                  } else {
                    var newMeta = document.createElement('meta');
                    newMeta.name = 'viewport';
                    newMeta.content = 'width=1024';
                    document.head.appendChild(newMeta);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        {/* The main content area takes up the remaining space, pushing the footer to the bottom */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}