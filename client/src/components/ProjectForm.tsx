import type { SubmitEventHandler } from 'react'
import type { Project } from '../types/project'

type ProjectFormProps = {
  editing: Project | null
  saving: boolean
  saveError: string
  onSubmit: SubmitEventHandler<HTMLFormElement>
  onCancel: () => void
}

const inputClass = 'box-border block w-full rounded-lg border border-solid border-zinc-700 bg-zinc-950 px-3.5 py-3.5 font-sans text-base text-zinc-100 placeholder:text-zinc-500 focus:border-green-400 focus:outline-2 focus:outline-solid focus:outline-offset-1 focus:outline-green-400'

export function ProjectForm({ editing, saving, saveError, onSubmit, onCancel }: ProjectFormProps) {
  return (
    <form onSubmit={onSubmit} className="m-0 p-6 sm:p-8">
      <h2 id="projectFormHeading" className="m-0 mb-5 text-xl font-semibold tracking-tight">{editing ? 'Edit project' : 'New project'}</h2>
      <fieldset disabled={saving} className="m-0 min-w-0 space-y-4 border-0 p-0 disabled:opacity-60">
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          Name
          <input className={inputClass} name="name" defaultValue={editing?.name} maxLength={100} required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          Base URL
          <input className={inputClass} name="baseUrl" type="url" defaultValue={editing?.baseUrl}
            placeholder="https://api.example.com" maxLength={2048} required />
        </label>
        <div className="flex flex-wrap gap-3 pt-1">
          <button type="submit" className="min-h-11 cursor-pointer rounded-lg border-0 bg-green-400 px-4 font-sans text-sm font-semibold text-zinc-950 enabled:hover:bg-green-300 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-green-400 disabled:cursor-wait">
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Create project'}
          </button>
          <button type="button" onClick={onCancel} className="min-h-11 cursor-pointer rounded-lg border border-solid border-zinc-700 bg-zinc-950 px-4 font-sans text-sm text-zinc-200 enabled:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-green-400">
            Cancel
          </button>
        </div>
      </fieldset>
      {saveError && <p role="alert" className="m-0 mt-4 rounded-lg border border-solid border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-200">{saveError}</p>}
    </form>
  )
}
