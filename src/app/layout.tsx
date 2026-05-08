import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // Import the new Footer

export const metadata: Metadata = {
  title: "CopterJet International | Aviation Excellence",
  description: "Leading aviation and aerospace services company in Africa. Aircraft brokerage, logistics, and consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        {/* The main content area takes up the remaining space, pushing the footer to the bottom */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer /> {/* Add the Footer here */}
      </body>
    </html>
  );
}