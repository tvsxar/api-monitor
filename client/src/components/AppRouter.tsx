import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { useSession } from '../api/auth'
import { LoginPage } from '../pages/LoginPage'
import { ProjectsPage } from '../pages/ProjectsPage'

export function AppRouter() {
  const { data: session, isPending, error, refetch } = useSession()

  return (
    <BrowserRouter>
      <main>
        <h1>PulseKit</h1>
        {isPending ? (
          <p role="status">Checking your session…</p>
        ) : error ? (
          <>
            <p role="alert">Could not check your session.</p>
            <button type="button" onClick={() => void refetch()}>Retry</button>
          </>
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
