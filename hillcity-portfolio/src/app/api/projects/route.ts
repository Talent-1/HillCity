// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// Define the Project type for better type safety
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  size: 'small' | 'large';
}

const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.ts');

// Helper to read projects from the file
async function getProjects(): Promise<Project[]> {
  try {
    const fileContent = await fs.readFile(projectsFilePath, 'utf-8');
    // Extract the array from the 'export const projects = [...]' string
    const match = fileContent.match(/export const projects = (\[.*?\]);/s);
    if (match && match[1]) {
      // Safely parse the JSON array
      return JSON.parse(match[1]);
    }
    return [];
  } catch (error) {
    console.error("Error reading projects file:", error);
    return [];
  }
}

// Helper to write projects back to the file
async function saveProjects(projects: Project[]): Promise<void> {
  const content = `export const projects = ${JSON.stringify(projects, null, 2)};\n`;
  await fs.writeFile(projectsFilePath, content, 'utf-8');
}

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const newProject: Project = await request.json();
  const currentProjects = await getProjects();

  // Basic validation (add more as needed)
  if (!newProject.title || !newProject.description || !newProject.tech || !newProject.size) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  // Ensure unique ID - client-side generates, but server can double check
  newProject.id = currentProjects.length > 0 
    ? Math.max(...currentProjects.map(p => p.id)) + 1 
    : 1;

  currentProjects.push(newProject);
  await saveProjects(currentProjects);

  // Invalidate cache for the homepage to show new project
  // You might need to use `revalidatePath` in a real-world scenario with server components
  // For now, clients will fetch updated data on next page load or refresh.

  return NextResponse.json({ message: 'Project added successfully' });
}