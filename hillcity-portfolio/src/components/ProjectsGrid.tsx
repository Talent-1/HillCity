"use client";

import { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function ProjectsGrid() {
  const [active, setActive] = useState<string | null>(null);
  const project = projects.find((p) => p.id === active) || null;

  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-hill-navy">Selected Work</h2>
          <p className="text-hill-slate mt-3">Real projects I’ve built and shipped</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-hill-navy">{p.name}</h3>
                <p className="text-sm text-hill-slate mt-2">{p.shortDesc}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-hill-navy/5 text-hill-navy rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-hill-green text-white px-4 py-2 rounded-full font-bold hover:brightness-105 shadow"
                  >
                    Live Demo
                  </a>

                  <button
                    onClick={() => setActive(p.id)}
                    className="border-2 border-hill-navy/10 text-hill-navy px-4 py-2 rounded-full font-bold hover:bg-hill-navy/5"
                  >
                    Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {project && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 w-full bg-gray-100 rounded-t-2xl">
              <Image src={project.image} alt={project.name} fill className="object-cover rounded-t-2xl" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-hill-navy">{project.name}</h3>
                  <p className="text-hill-slate mt-2">{project.shortDesc}</p>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-hill-green text-white px-4 py-2 rounded-full font-bold hover:brightness-105"
                  >
                    View Live
                  </a>
                </div>
              </div>

              <div className="mt-6 text-sm text-hill-slate whitespace-pre-line">{project.caseStudy}</div>

              <div className="mt-6 flex gap-3">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 bg-hill-navy/5 text-hill-navy rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setActive(null)}
                  className="px-4 py-2 rounded-full border-2 border-hill-navy/10 font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
