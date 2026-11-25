import type { SubmitEventHandler } from 'react'

type AuthFormProps = {
  registering: boolean
  submitting: boolean
  error: string
  onSubmit: SubmitEventHandler<HTMLFormElement>
  onToggleMode: () => void
}

const inputClass = 'box-border block w-full rounded-lg border border-solid border-zinc-700 bg-zinc-950 px-3.5 py-3.5 font-sans text-base text-zinc-100 placeholder:text-zinc-500 focus:border-green-400 focus:outline-2 focus:outline-solid focus:outline-offset-1 focus:outline-green-400'

export function AuthForm({ registering, submitting, error, onSubmit, onToggleMode }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="m-0 rounded-2xl border border-solid border-zinc-800 bg-zinc-900 p-7 sm:p-11">
      <h2 className="m-0 mb-6 text-3xl font-semibold tracking-tight">{registering ? 'Create an account' : 'Sign in'}</h2>
      {registering && (
        <label className="mb-4 grid gap-2 text-base font-medium text-zinc-300">
          Name
          <input className={inputClass} name="name" autoComplete="name" required />
        </label>
      )}
      <label className="mb-4 grid gap-2 text-base font-medium text-zinc-300">
        Email
        <input className={inputClass} name="email" type="email" autoComplete="email" required />
      </label>
      <label className="grid gap-2 text-base font-medium text-zinc-300">
        Password
        <input
          className={inputClass}
          name="password"
          type="password"
          autoComplete={registering ? 'new-password' : 'current-password'}
          minLength={registering ? 8 : undefined}
          aria-describedby={registering ? 'password-hint' : undefined}
          required
        />
      </label>
      {registering && <p id="password-hint" className="m-0 mt-2 text-sm text-zinc-400">Use at least 8 characters.</p>}
      {error && <p role="alert" className="m-0 mt-4 rounded-lg border border-solid border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full cursor-pointer rounded-lg border-0 bg-green-400 px-4 py-4 font-sans text-base font-semibold text-zinc-950 transition-colors enabled:hover:bg-green-300 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-green-400 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? (registering ? 'Creating account…' : 'Signing in…') : (registering ? 'Create account' : 'Sign in')}
      </button>
      <p className="m-0 mt-5 text-center text-base text-zinc-400">
        {registering ? 'Already have an account?' : 'New to PulseKit?'}{' '}
        <button
          type="button"
          disabled={submitting}
          onClick={onToggleMode}
          className="cursor-pointer rounded-sm border-0 bg-transparent p-0 font-sans text-base font-medium text-green-300 enabled:hover:text-green-200 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-green-400 disabled:cursor-wait disabled:opacity-60"
        >
          {registering ? 'Sign in' : 'Create an account'}
        </button>
      </p>
    </form>
  )
}
