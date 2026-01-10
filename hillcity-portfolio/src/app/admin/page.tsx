// src/app/admin/page.tsx
'use client'; // This component uses client-side state

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // In a real app, you'd hash this password and check against a secure store.
    // For this demo, we'll use a hardcoded value. CHANGE THIS FOR PROD!
    if (password === 'hillcityadmin2026') { 
      // Set a simple flag in localStorage or a cookie for persistence
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-hill-cloud)">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center border border-(--color-hill-navy)/5">
        <h1 className="text-3xl font-bold text-(--color-hill-navy) mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-(--color-hill-slate)/10 rounded-md focus:outline-none focus:border-(--color-hill-gold)"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-(--color-hill-green) text-white font-bold py-3 rounded-md hover:brightness-110 transition-all"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}