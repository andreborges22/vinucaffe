import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'

interface Props {
  children: React.ReactNode
}

// Se não estiver logado → redireciona para /login
export default function PrivateRoute({ children }: Props) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}