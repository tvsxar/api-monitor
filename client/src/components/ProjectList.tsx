import type { Project } from '../types/project'

type ProjectListProps = {
  projects: Project[]
  saving: boolean
  onEdit: (project: Project) => void
}

export function ProjectList({ projects, saving, onEdit }: ProjectListProps) {
  if (projects.length === 0) return <p>No projects yet.</p>

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <strong>{project.name}</strong> <span>{project.baseUrl}</span>{' '}
          <button
            type="button"
            disabled={saving}
            onClick={() => onEdit(project)}
            aria-label={`Edit ${project.name} (${project.baseUrl})`}
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  )
}
