import { authClient } from '../lib/auth'

export const useSession = authClient.useSession

export function signIn(email: string, password: string) {
  return authClient.signIn.email({ email, password })
}

export function signUp(name: string, email: string, password: string) {
  return authClient.signUp.email({ name, email, password })
}

export function signOut() {
  return authClient.signOut()
}
