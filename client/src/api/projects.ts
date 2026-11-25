import type { Project } from '../types/project'

export async function fetchProjects(signal: AbortSignal): Promise<Project[]> {
  const res = await fetch('/api/projects', { signal })
  if (!res.ok) throw new Error('Could not load projects.')
  return res.json()
}

export async function saveProject(
  data: Pick<Project, 'name' | 'baseUrl'>,
  id?: string,
): Promise<Project> {
  const res = await fetch(id ? `/api/projects/${id}` : '/api/projects', {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(error?.message || 'Could not save the project. Try again.')
  }
  return res.json()
}
