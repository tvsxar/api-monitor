import type { SubmitEventHandler } from 'react'

type AuthFormProps = {
  registering: boolean
  submitting: boolean
  error: string
  onSubmit: SubmitEventHandler<HTMLFormElement>
  onToggleMode: () => void
}

export function AuthForm({ registering, submitting, error, onSubmit, onToggleMode }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <h2>{registering ? 'Create an account' : 'Sign in'}</h2>
      {registering && (
        <p>
          <label>Name <input name="name" autoComplete="name" required /></label>
        </p>
      )}
      <p>
        <label>Email <input name="email" type="email" autoComplete="email" required /></label>
      </p>
      <p>
        <label>
          Password <input name="password" type="password" autoComplete={registering ? 'new-password' : 'current-password'} minLength={registering ? 8 : undefined} required />
        </label>
      </p>
      <button disabled={submitting}>{registering ? 'Create account' : 'Sign in'}</button>{' '}
      <button type="button" disabled={submitting} onClick={onToggleMode}>
        {registering ? 'Use an existing account' : 'Create an account'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  )
}
