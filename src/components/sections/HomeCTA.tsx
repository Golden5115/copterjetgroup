import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="bg-copter-blue py-20 relative overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border-[40px] border-copter-red opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Elevate Your Aviation Operations?
        </h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
          Contact our team of experts today to discuss your aircraft brokerage, consulting, or logistics needs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="inline-block bg-copter-red text-white px-10 py-4 font-bold tracking-wide hover:bg-red-800 transition-colors shadow-lg"
          >
            CONTACT US TODAY
          </Link>
          <Link 
            href="/rfq" 
            className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 font-bold tracking-wide hover:bg-white hover:text-copter-blue transition-colors"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </div>
    </section>
  );
}