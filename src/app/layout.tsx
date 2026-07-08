import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "CopterJet International | Aviation Excellence",
  description: "Leading aviation and aerospace services company in Africa. Aircraft brokerage, logistics, and consulting.",
};

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
      <body className={`${montserrat.variable} antialiased flex flex-col min-h-screen`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
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