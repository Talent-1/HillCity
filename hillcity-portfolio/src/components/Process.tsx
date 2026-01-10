import React from 'react';

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We map out your business goals and technical requirements to find the clearest path forward."
  },
  {
    number: "02",
    title: "Blueprint",
    description: "Designing the UI/UX and system architecture to ensure a solid foundation for growth."
  },
  {
    number: "03",
    title: "Development",
    description: "The gears turn. I build your app with modern tech, providing regular staging updates."
  },
  {
    number: "04",
    title: "Deployment",
    description: "Launching your solution to the peak and providing ongoing support to keep it there."
  }
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-hill-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white">The HillCity Roadmap</h2>
          <div className="w-20 h-1 bg-hill-gold mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line for Desktop */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-hill-gold/20"></div>
              )}
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-hill-green flex items-center justify-center text-2xl font-black text-white mb-6 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-hill-gold">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;