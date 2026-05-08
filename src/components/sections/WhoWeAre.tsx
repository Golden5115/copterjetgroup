import Link from "next/link";
import Image from "next/image"; // ADD THIS IMPORT

export default function WhoWeAre() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div>
            <h2 className="text-sm font-bold text-copter-blue tracking-widest uppercase mb-8">
              Who We Are
            </h2>
            <p className="text-2xl lg:text-3xl text-copter-blue font-bold mb-6 leading-snug">
              We are a cross-border aviation service and consulting entity with a fully integrated specialist service structure.
            </p>
            <p className="text-lg text-copter-grey mb-10 leading-relaxed font-medium">
              Our solutions are built around aviation advisory, aviation asset management, and industry-focused logistics solutions- All designed around a broad delivery mission.
            </p>
            
            <Link 
              href="/about/who-we-are" 
              className="inline-block border border-copter-red text-copter-red px-8 py-3 font-bold rounded-full hover:bg-copter-red hover:text-white transition-all text-sm tracking-widest uppercase"
            >
              LEARN MORE
            </Link>
          </div>

          {/* Right Column: Visual/Imagery */}
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/who-we-are3.jpg"
              alt="CopterJet Private Jet Services"
              fill
              className="object-cover object-center"
            />
          </div>

        </div>
      </div>
    </section>
  );
}