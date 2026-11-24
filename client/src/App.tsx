import { useState, type SubmitEvent } from 'react'
import { authClient } from './lib/auth'

export default function App() {
  const { data: session, isPending, error: sessionError, refetch } = authClient.useSession()
  const [registering, setRegistering] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const email = String(fields.get('email')).trim()
    const password = String(fields.get('password'))

    setError('')
    setSubmitting(true)
    try {
      const result = registering
        ? await authClient.signUp.email({ name: String(fields.get('name')).trim(), email, password })
        : await authClient.signIn.email({ email, password })

      if (result.error) {
        setError(registering ? 'Could not create your account.' : 'Could not sign in. Check your email and password.')
      }
    } catch {
      setError('Could not reach the authentication service.')
    } finally {
      setSubmitting(false)
    }
  }

  async function signOut() {
    setError('')
    setSubmitting(true)
    try {
      const result = await authClient.signOut()
      if (result.error) setError('Could not sign out. Try again.')
    } catch {
      setError('Could not sign out. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <h1>PulseKit</h1>
      {isPending ? (
        <p role="status">Checking your session…</p>
      ) : sessionError ? (
        <>
          <p role="alert">Could not check your session.</p>
          <button type="button" onClick={() => void refetch()}>Retry</button>
        </>
      ) : session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <button type="button" disabled={submitting} onClick={signOut}>Sign out</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
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
          <button type="button" disabled={submitting} onClick={() => {
            setRegistering(!registering)
            setError('')
          }}>
            {registering ? 'Use an existing account' : 'Create an account'}
          </button>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
    </main>
  )
}
