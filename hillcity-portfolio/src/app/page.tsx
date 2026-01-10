import Image from 'next/image';
import Navbar from '@/components/Navbar';
import BentoGrid from '@/components/BentoGrid';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/Reveal';

export default function Home() {
  return (
    <main className="min-h-screen bg-hill-cloud">
      <Navbar />
      
      {/* Hero Section */}
      <Reveal>
        <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-color-hill-navy leading-tight mb-6">
                Your Vision, <span className="text-hill-gold">Directed.</span><br />
                Your Web App, Delivered.
              </h1>
              <p className="text-lg text-hill-slate max-w-xl mb-10 mx-auto md:mx-0">
                From concept to deployment, I build fast, secure, and intuitive web solutions 
                tailored to your business goals. Engineering the digital foundations your brand deserves.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <button className="bg-hill-green text-white px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all w-full sm:w-auto shadow-lg shadow-hill-green/20">
                  Start Your Project
                </button>
                <button className="border-2 border-hill-navy/10 text-hill-navy px-8 py-4 rounded-full font-bold hover:bg-(--color-hill-navy)/5 transition-all w-full sm:w-auto">
                  View Portfolio
                </button>
              </div>
            </div>

            {/* Visual Element (Logo/Brand) */}
            <div className="flex-1 w-full max-w-lg aspect-square bg-hill-navy rounded-3xl relative overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Subtle background glow */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-hill-gold)_0%,transparent_70%)]"></div>
              
              <div className="relative w-2/3 h-2/3 transition-transform duration-700 hover:scale-110">
                <Image 
                  src="/assets/Hillcity-logo.jpg" 
                  alt="HillCity Solutions Brand Mark"
                  fill
                  className="object-contain"
                  priority 
                />
              </div>
            </div>

          </div>
        </section>
      </Reveal>

      <Reveal><BentoGrid /></Reveal>
      <Reveal><Process /></Reveal>
      <Reveal><Contact /></Reveal>
      
      <Footer />
    </main>
  );
}