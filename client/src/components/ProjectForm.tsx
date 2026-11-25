import type { SubmitEventHandler } from 'react'
import type { Project } from '../types/project'

type ProjectFormProps = {
  editing: Project | null
  saving: boolean
  saveError: string
  onSubmit: SubmitEventHandler<HTMLFormElement>
  onCancel: () => void
}

export function ProjectForm({ editing, saving, saveError, onSubmit, onCancel }: ProjectFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <h3>{editing ? 'Edit project' : 'New project'}</h3>
      <fieldset disabled={saving}>
        <p><label>Name <input name="name" defaultValue={editing?.name} maxLength={100} required /></label></p>
        <p>
          <label>
            Base URL <input name="baseUrl" type="url" defaultValue={editing?.baseUrl}
              placeholder="https://api.example.com" maxLength={2048} required />
          </label>
        </p>
        <button>{editing ? 'Save changes' : 'Create project'}</button>{' '}
        {editing && <button type="button" onClick={onCancel}>Cancel</button>}
      </fieldset>
      {saveError && <p role="alert">{saveError}</p>}
    </form>
  )
}
