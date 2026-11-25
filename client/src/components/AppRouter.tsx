import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { useSession } from '../api/auth'
import { LoginPage } from '../pages/LoginPage'
import { ProjectsPage } from '../pages/ProjectsPage'

export function AppRouter() {
  const { data: session, isPending, error, refetch } = useSession()

  return (
    <BrowserRouter>
      <main>
        {isPending ? (
          <div className="grid min-h-dvh place-items-center bg-zinc-950 font-sans text-zinc-300 scheme-dark">
            <p role="status">Checking your session…</p>
          </div>
        ) : error ? (
          <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-6 font-sans text-zinc-300 scheme-dark">
            <p role="alert">Could not check your session.</p>
            <button type="button" className="cursor-pointer rounded-md border border-solid border-zinc-700 bg-zinc-900 px-4 py-2 text-green-200" onClick={() => void refetch()}>Retry</button>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={session ? <Navigate to="/projects" replace /> : <LoginPage />} />
            <Route path="/projects" element={session
              ? <ProjectsPage key={session.user.id} email={session.user.email} />
              : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to={session ? '/projects' : '/login'} replace />} />
          </Routes>
        )}
      </main>
    </BrowserRouter>
  )
}
