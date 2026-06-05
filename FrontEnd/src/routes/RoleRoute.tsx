import { Navigate } from 'react-router-dom'
import { useAuthStore, UserRole } from '../store/auth.store'

interface Props {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

// Se não tiver a permissão certa → redireciona para /login
export default function RoleRoute({ children, allowedRoles }: Props) {
  const user = useAuthStore(state => state.user)

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}