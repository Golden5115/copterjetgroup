import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CopterJet International",
  description: "Global Procurement & Supply Chain Solutions for Aircraft Parts, Components, Engines & Ground Support Equipment.",
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
          and forces the viewport to 1024px so the Desktop layout triggers.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.innerWidth >= 980 && window.innerWidth < 1024) {
                  var meta = document.querySelector('meta[name="viewport"]');
                  if (meta) {
                    meta.setAttribute('content', 'width=1024');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}