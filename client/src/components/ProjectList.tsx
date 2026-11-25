import type { Project } from '../types/project'

type ProjectListProps = {
  projects: Project[]
  saving: boolean
  onEdit: (project: Project) => void
}

export function ProjectList({ projects, saving, onEdit }: ProjectListProps) {
  if (projects.length === 0) {
    return <p className="m-0 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-8 text-center text-zinc-400">No projects yet.</p>
  }

  return (
    <ul className="m-0 list-none space-y-3 p-0">
      {projects.map((project) => (
        <li key={project.id} className="flex items-center justify-between gap-4 rounded-xl border border-solid border-zinc-800 bg-zinc-900 p-4 sm:px-5">
          <div className="min-w-0">
            <h2 className="m-0 wrap-anywhere text-base font-semibold text-zinc-100">{project.name}</h2>
            <p className="m-0 mt-1 wrap-anywhere font-mono text-sm text-zinc-400">{project.baseUrl}</p>
          </div>
          <button
            type="button"
            disabled={saving}
            onClick={() => onEdit(project)}
            aria-label={`Edit ${project.name} (${project.baseUrl})`}
            className="min-h-10 shrink-0 cursor-pointer rounded-lg border border-solid border-zinc-700 bg-zinc-950 px-3 font-sans text-sm font-medium text-green-300 enabled:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-green-400 disabled:opacity-60"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  )
}
