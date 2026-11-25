import { useEffect, useState, type SubmitEvent } from 'react'
import { signOut } from '../api/auth'
import { fetchProjects, saveProject } from '../api/projects'
import { ProjectForm } from '../components/ProjectForm'
import { ProjectList } from '../components/ProjectList'
import type { Project } from '../types/project'

export function ProjectsPage({ email }: { email: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [editing, setEditing] = useState<Project | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

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
      form.reset()
      setEditing(null)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save the project. Try again.')
    } finally {
      setSaving(false)
    }
  }

  function selectProject(project: Project | null) {
    setEditing(project)
    setSaveError('')
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
    <>
      <p>Signed in as {email}</p>
      <button type="button" disabled={submitting} onClick={handleSignOut}>Sign out</button>
      <section aria-labelledby="projectsHeading">
        <h2 id="projectsHeading">Projects</h2>
        {loading ? (
          <p role="status">Loading projects…</p>
        ) : loadError ? (
          <>
            <p role="alert">Could not load projects.</p>
            <button type="button" onClick={() => {
              setLoading(true)
              setLoadError(false)
              setLoadAttempt((attempt) => attempt + 1)
            }}>Retry</button>
          </>
        ) : (
          <>
            <ProjectList projects={projects} saving={saving} onEdit={selectProject} />
            <ProjectForm
              key={editing?.id ?? 'new'}
              editing={editing}
              saving={saving}
              saveError={saveError}
              onSubmit={handleSaveProject}
              onCancel={() => selectProject(null)}
            />
          </>
        )}
      </section>
      {error && <p role="alert">{error}</p>}
    </>
  )
}
