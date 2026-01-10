// src/app/admin/dashboard/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Define the Project type for better type safety
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  size: 'small' | 'large';
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '', // Comma separated string
    size: 'small' as 'small' | 'large',
  });
  const [message, setMessage] = useState('');

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.push('/admin'); // Redirect to login if not logged in
    } else {
      fetchProjects();
    }
  }, [router]);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    const projectToAdd = {
      ...newProject,
      tech: newProject.tech.split(',').map(s => s.trim()).filter(s => s !== ''), // Convert string to array
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1, // Simple ID generation
    };

    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In a real app, you'd send an auth token here
      },
      body: JSON.stringify(projectToAdd),
    });

    if (res.ok) {
      setMessage('Project added successfully!');
      setNewProject({ title: '', description: '', tech: '', size: 'small' }); // Reset form
      fetchProjects(); // Refresh the list
    } else {
      setMessage('Failed to add project.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin');
  };

  if (!isLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center text-(--color-hill-navy)">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-(--color-hill-cloud) py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-(--color-hill-navy)/5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-(--color-hill-navy)">Admin Dashboard</h1>
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

        <h2 className="text-2xl font-bold text-(--color-hill-green) mb-4">Add New Project</h2>
        <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-(--color-hill-slate)/10 rounded-md focus:outline-none focus:border-(--color-hill-gold)"
            required
          />
          <input
            type="text"
            name="tech"
            placeholder="Technologies (comma separated)"
            value={newProject.tech}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-(--color-hill-slate)/10 rounded-md focus:outline-none focus:border-(--color-hill-gold)"
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleInputChange}
            rows={3}
            className="md:col-span-2 w-full px-4 py-3 border border-(--color-hill-slate)/10 rounded-md focus:outline-none focus:border-(--color-hill-gold)"
            required
          ></textarea>
          <select
            name="size"
            value={newProject.size}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-(--color-hill-slate)/10 rounded-md focus:outline-none focus:border-(--color-hill-gold)"
          >
            <option value="small">Small (1 column)</option>
            <option value="large">Large (2 columns)</option>
          </select>
          <button
            type="submit"
            className="md:col-span-2 bg-(--color-hill-gold) text-(--color-hill-navy) font-bold py-3 rounded-md hover:brightness-110 transition-all"
          >
            Add Project
          </button>
        </form>

        <h2 className="text-2xl font-bold text-(--color-hill-navy) mb-4">Current Projects</h2>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-(--color-hill-slate)/70">No projects yet. Add one above!</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="bg-(--color-hill-cloud) p-4 rounded-md border border-(--color-hill-slate)/5">
                <h3 className="text-xl font-bold text-(--color-hill-navy)">{project.title}</h3>
                <p className="text-(--color-hill-slate)/80 text-sm mt-1">{project.description}</p>
                <p className="text-xs text-(--color-hill-slate)/60 mt-2">Tech: {project.tech.join(', ')}</p>
                <p className="text-xs text-(--color-hill-slate)/60">Size: {project.size}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}