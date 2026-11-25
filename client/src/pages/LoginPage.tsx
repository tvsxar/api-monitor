import { useState, type SubmitEvent } from 'react'
import { signIn, signUp } from '../api/auth'
import { AuthForm } from '../components/AuthForm'

export function LoginPage() {
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
        ? await signUp(String(fields.get('name')).trim(), email, password)
        : await signIn(email, password)

      if (result.error) {
        setError(registering ? 'Could not create your account.' : 'Could not sign in. Check your email and password.')
      }
    } catch {
      setError('Could not reach the authentication service.')
    } finally {
      setSubmitting(false)
    }
  }

  function toggleMode() {
    setRegistering(!registering)
    setError('')
  }

  return (
    <div className="grid min-h-dvh box-border place-items-center bg-zinc-950 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent_57%)] px-5 py-10 font-sans text-zinc-100 scheme-dark">
      <div className="w-full max-w-[34rem]">
        <h1 className="m-0 mb-7 flex items-center gap-3 text-lg font-semibold tracking-tight">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl border border-solid border-green-400/25 bg-green-500/15 text-green-300">
            <span className="size-2.5 rotate-45 rounded-xs bg-current" />
          </span>
          PulseKit
        </h1>
        <AuthForm
          registering={registering}
          submitting={submitting}
          error={error}
          onSubmit={handleSubmit}
          onToggleMode={toggleMode}
        />
      </div>
    </div>
  )
}
