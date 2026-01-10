'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

// 1. Updated Interface to include 'link'
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  size: 'small' | 'large';
  link?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '', 
    size: 'small' as 'small' | 'large',
    link: '', // Added link here
  });
  const [message, setMessage] = useState('');

  // 2. Moved fetchProjects ABOVE the useEffect to fix the "access before declaration" error
  // We use useCallback to keep the function stable
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.push('/admin');
    } else {
      fetchProjects();
    }
  }, [router, fetchProjects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    const projectToAdd = {
      ...newProject,
      tech: newProject.tech.split(',').map(s => s.trim()).filter(s => s !== ''),
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
    };

    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectToAdd),
    });

    if (res.ok) {
      setMessage('Project added successfully!');
      // 3. Fixed the TypeScript error by including 'link' in the reset state
      setNewProject({ title: '', description: '', tech: '', size: 'small', link: '' }); 
      fetchProjects();
    } else {
      setMessage('Failed to add project.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin');
  };

  if (!isLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center text-hill-navy">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-hill-cloud py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-hill-navy/5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-hill-navy">Admin Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded-md mb-4 ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <h2 className="text-2xl font-bold text-hill-green mb-4">Add New Project</h2>
        <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-hill-slate/10 rounded-md focus:outline-none focus:border-hill-gold"
            required
          />
          <input
            type="text"
            name="tech"
            placeholder="Technologies (comma separated)"
            value={newProject.tech}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-hill-slate/10 rounded-md focus:outline-none focus:border-hill-gold"
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleInputChange}
            rows={3}
            className="md:col-span-2 w-full px-4 py-3 border border-hill-slate/10 rounded-md focus:outline-none focus:border-hill-gold"
            required
          ></textarea>
          
          {/* 4. Added Link Input Field */}
          <input
            type="url"
            name="link"
            placeholder="Live Project URL (https://...)"
            value={newProject.link}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-hill-slate/10 rounded-md focus:outline-none focus:border-hill-gold"
          />

          <select
            name="size"
            title="Grid Size"
            value={newProject.size}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-hill-slate/10 rounded-md focus:outline-none focus:border-hill-gold"
          >
            <option value="small">Small (1 column)</option>
            <option value="large">Large (2 columns)</option>
          </select>

          <button
            type="submit"
            className="md:col-span-2 bg-hill-gold text-hill-navy font-bold py-3 rounded-md hover:brightness-110 transition-all"
          >
            Add Project
          </button>
        </form>

        <h2 className="text-2xl font-bold text-hill-navy mb-4">Current Projects</h2>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-hill-slate/70">No projects yet. Add one above!</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="bg-hill-cloud p-4 rounded-md border border-hill-slate/5">
                <h3 className="text-xl font-bold text-hill-navy">{project.title}</h3>
                <p className="text-hill-slate/80 text-sm mt-1">{project.description}</p>
                <div className="flex justify-between items-end mt-2">
                   <div>
                      <p className="text-xs text-hill-slate/60">Tech: {project.tech.join(', ')}</p>
                      <p className="text-xs text-hill-slate/60">Size: {project.size}</p>
                   </div>
                   {project.link && <span className="text-[10px] text-hill-green font-bold uppercase tracking-widest">Link Attached</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}