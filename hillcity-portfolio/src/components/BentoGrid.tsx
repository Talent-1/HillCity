'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  size: 'small' | 'large';
}

const BentoGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="py-20 text-center text-(--color-hill-navy)">Loading solutions...</div>;

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-(--color-hill-navy)">Featured Solutions</h2>
        <div className="w-20 h-1 bg-(--color-hill-gold) mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {projects.map((project) => (
          <div 
            key={project.id}
            className={`group relative rounded-3xl p-8 overflow-hidden border border-(--color-hill-navy)/5 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 bg-white
              ${project.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}`}
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold tracking-widest text-(--color-hill-gold) uppercase">Project {project.id}</span>
                <h3 className="text-2xl font-bold text-(--color-hill-navy) mt-2">{project.title}</h3>
                <p className="text-(--color-hill-slate) mt-2 text-sm max-w-xs">{project.description}</p>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-(--color-hill-navy)/5 text-(--color-hill-navy) rounded-full text-[10px] font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-(--color-hill-navy)/5 rounded-full group-hover:bg-(--color-hill-gold)/10 transition-colors"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;