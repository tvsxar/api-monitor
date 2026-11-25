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
    <AuthForm
      registering={registering}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      onToggleMode={toggleMode}
    />
  )
}
