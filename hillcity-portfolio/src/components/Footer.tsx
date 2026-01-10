import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-(--color-hill-cloud) border-t border-(--color-hill-navy)/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            {/* Added your logo here */}
            <div className="relative w-8 h-8">
              <Image 
                src="/assets/HillCity-logo.jpg" 
                alt="HillCity Solutions Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-(--color-hill-navy)">
              HillCity<span className="text-(--color-hill-gold)">Solutions</span>
            </span>
          </div>
          <p className="text-xs text-hill-slate/60 max-w-xs">
            Engineering digital foundations for the next generation of web applications.
          </p>
        </div>

        {/* Availability Badge */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-(--color-hill-navy)/5 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-hill-green animate-pulse"></div>
          <span className="text-xs font-bold text-hill-navy">
            Available for Projects — Jan 2026
          </span>
        </div>

        {/* Social / Copyright */}
        <div className="text-center md:text-right">
          <div className="flex gap-4 justify-center md:justify-end mb-4">
            <a href="#" className="text-(--color-hill-navy) hover:text-(--color-hill-gold) transition-colors font-bold text-sm">GitHub</a>
            <a href="#" className="text-(--color-hill-navy) hover:text-(--color-hill-gold) transition-colors font-bold text-sm">LinkedIn</a>
          </div>
          <p className="text-[10px] text-(--color-hill-slate)/40 uppercase tracking-widest">
            © 2026 HillCity Solutions. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;