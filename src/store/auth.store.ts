import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Os 3 perfis de acesso do sistema
export type UserRole = 'client' | 'employee' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  token: string
}

interface AuthStore {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user: AuthUser) => set({
        user,
        isAuthenticated: true,
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
      }),
    }),
    { name: 'vinu-auth' } // Salva no localStorage
  )
)