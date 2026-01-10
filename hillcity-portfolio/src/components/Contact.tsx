import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto bg-(--color-hill-navy) rounded-[2rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
        {/* Background Accent referencing the logo's gold */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-(--color-hill-gold)/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
          Ready to Reach <span className="text-(--color-hill-gold)">The Peak?</span>
        </h2>
        <p className="text-white/70 mb-10 max-w-lg mx-auto relative z-10">
          Have a project in mind? Let's discuss how HillCity Solutions can engineer your digital future.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-(--color-hill-gold) transition-colors"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-(--color-hill-gold) transition-colors"
          />
          <textarea 
            placeholder="Tell me about your project" 
            rows={4}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-(--color-hill-gold) transition-colors"
          ></textarea>
          <button className="md:col-span-2 bg-(--color-hill-gold) text-(--color-hill-navy) font-bold py-4 rounded-xl hover:brightness-110 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;