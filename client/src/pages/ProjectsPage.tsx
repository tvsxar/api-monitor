import { useEffect, useRef, useState, type SubmitEvent } from 'react'
import { signOut } from '../api/auth'
import { fetchProjects, saveProject } from '../api/projects'
import { ProjectFooter } from '../components/ProjectFooter'
import { ProjectForm } from '../components/ProjectForm'
import { ProjectList } from '../components/ProjectList'
import { ProjectSidebar } from '../components/ProjectSidebar'
import type { Project } from '../types/project'

export function ProjectsPage({ email }: { email: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [editing, setEditing] = useState<Project | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (formOpen) dialog.showModal()
    else dialog.close()
  }, [formOpen])

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const items = await fetchProjects(controller.signal)
        if (!controller.signal.aborted) setProjects(items)
      } catch {
        if (!controller.signal.aborted) setLoadError(true)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void load()
    return () => controller.abort()
  }, [loadAttempt])

  async function handleSaveProject(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const fields = new FormData(form)
    setSaving(true)
    setSaveError('')

    try {
      const saved = await saveProject({
        name: String(fields.get('name') ?? ''),
        baseUrl: String(fields.get('baseUrl') ?? ''),
      }, editing?.id)

      setProjects((items) => editing
        ? items.map((item) => item.id === saved.id ? saved : item)
        : [saved, ...items])
      setFormOpen(false)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save the project. Try again.')
    } finally {
      setSaving(false)
    }
  }

  function selectProject(project: Project | null) {
    setEditing(project)
    setSaveError('')
    setFormOpen(true)
  }

  async function handleSignOut() {
    setError('')
    setSubmitting(true)
    try {
      const result = await signOut()
      if (result.error) setError('Could not sign out. Try again.')
    } catch {
      setError('Could not sign out. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-zinc-950 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.10),transparent_52%)] font-sans text-zinc-100 scheme-dark">
      <div className="mx-auto box-border grid w-full max-w-7xl flex-1 items-start gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8 lg:py-6">
        <ProjectSidebar />
        <section aria-labelledby="projectsHeading" className="min-w-0">
          <header className="mb-6 flex flex-wrap items-center justify-end gap-x-4 gap-y-2 rounded-xl border border-solid border-white/10 bg-zinc-900/65 px-4 py-3 backdrop-blur-md">
            <span className="min-w-0 text-sm wrap-anywhere text-zinc-400">{email}</span>
            <button type="button" disabled={submitting} onClick={handleSignOut} className="min-h-10 cursor-pointer rounded-lg border border-solid border-zinc-700 bg-zinc-900 px-3 font-sans text-sm font-medium text-zinc-200 enabled:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-green-400 disabled:opacity-60">
              {submitting ? 'Signing out…' : 'Sign out'}
            </button>
          </header>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h1 id="projectsHeading" className="m-0 text-3xl font-semibold tracking-tight">Projects</h1>
            <button type="button" aria-haspopup="dialog" disabled={loading || loadError} onClick={() => selectProject(null)} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border-0 bg-green-400 px-4 font-sans text-sm font-semibold text-zinc-950 enabled:hover:bg-green-300 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-green-400 disabled:opacity-60">
              <span aria-hidden="true" className="text-lg leading-none">+</span>
              New project
            </button>
          </div>
          {error && <p role="alert" className="m-0 mb-5 rounded-lg border border-solid border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}
          {loading ? (
            <p role="status" className="m-0 rounded-xl border border-solid border-zinc-800 bg-zinc-900 p-5 text-zinc-400">Loading projects…</p>
          ) : loadError ? (
            <div className="rounded-xl border border-solid border-zinc-800 bg-zinc-900 p-5">
              <p role="alert" className="m-0 mb-3 text-rose-200">Could not load projects.</p>
              <button type="button" className="min-h-10 cursor-pointer rounded-lg border border-solid border-zinc-700 bg-zinc-950 px-3 font-sans text-sm font-medium text-green-300 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-green-400" onClick={() => {
                setLoading(true)
                setLoadError(false)
                setLoadAttempt((attempt) => attempt + 1)
              }}>Retry</button>
            </div>
          ) : (
            <ProjectList projects={projects} saving={saving} onEdit={selectProject} />
          )}
        </section>
      </div>
      <ProjectFooter />
      <dialog
        ref={dialogRef}
        aria-labelledby="projectFormHeading"
        className="box-border max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-solid border-zinc-700 bg-zinc-900 p-0 text-zinc-100 shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm"
        onCancel={(event) => {
          event.preventDefault()
          if (!saving) setFormOpen(false)
        }}
      >
        {formOpen && (
          <ProjectForm
            key={editing?.id ?? 'new'}
            editing={editing}
            saving={saving}
            saveError={saveError}
            onSubmit={handleSaveProject}
            onCancel={() => setFormOpen(false)}
          />
        )}
      </dialog>
    </div>
  )
}
