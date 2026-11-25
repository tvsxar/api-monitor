import { Link } from 'react-router'

export function ProjectSidebar() {
  return (
    <aside className="rounded-2xl border border-solid border-white/10 bg-zinc-900/65 p-4 backdrop-blur-md lg:sticky lg:top-6">
      <div className="flex items-center gap-3 font-semibold tracking-tight">
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl border border-solid border-green-400/25 bg-green-500/15 text-green-300">
          <span className="size-2.5 rotate-45 rounded-xs bg-current" />
        </span>
        PulseKit
      </div>
      <nav aria-label="Workspace" className="mt-4">
        <Link to="/projects" aria-current="page" className="flex min-h-10 items-center gap-3 rounded-lg border border-solid border-green-400/20 bg-green-400/10 px-3 text-sm font-medium text-green-200 no-underline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-green-400">
          <span aria-hidden="true" className="size-2 rounded-full bg-green-400" />
          Projects
        </Link>
      </nav>
    </aside>
  )
}
