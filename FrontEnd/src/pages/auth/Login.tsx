import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

// Usuários mock — depois virão da API
const MOCK_USERS = [
  {
    id: '1',
    name: 'Cliente Teste',
    email: 'cliente@teste.com',
    password: '123456',
    role: 'client' as const,
    token: 'mock-token-client',
  },
  {
    id: '2',
    name: 'Funcionário Teste',
    email: 'funcionario@teste.com',
    password: '123456',
    role: 'employee' as const,
    token: 'mock-token-employee',
  },
  {
    id: '3',
    name: 'Admin Teste',
    email: 'admin@teste.com',
    password: '123456',
    role: 'admin' as const,
    token: 'mock-token-admin',
  },
]

// Redireciona cada perfil para sua área correta
const ROLE_REDIRECT = {
  client:   '/cardapio',
  employee: '/funcionario',
  admin:    '/admin',
}

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  function handleLogin() {
    setError('')

    // Busca o usuário mock pelo e-mail e senha
    const found = MOCK_USERS.find(
      u => u.email === email && u.password === password
    )

    if (!found) {
      setError('E-mail ou senha incorretos')
      return
    }

    // Salva no store (sem a senha!)
    login({
      id:    found.id,
      name:  found.name,
      email: found.email,
      role:  found.role,
      token: found.token,
    })

    // Redireciona conforme o perfil
    navigate(ROLE_REDIRECT[found.role])
  }

  return (
    <div className="min-h-screen bg-brand-offwhite flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-cafe rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-brand-creme font-display text-2xl font-bold">V</span>
          </div>
          <h1 className="font-display text-brand-cafe text-3xl font-bold">
            Vinu Caffè
          </h1>
          <p className="text-brand-madeira/60 text-sm mt-1">
            Faça seu login para continuar
          </p>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="text-brand-cafe text-sm font-medium block mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm placeholder:text-brand-madeira/40 focus:outline-none focus:border-brand-amber"
            />
          </div>

          <div>
            <label className="text-brand-cafe text-sm font-medium block mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm placeholder:text-brand-madeira/40 focus:outline-none focus:border-brand-amber"
            />
          </div>

          {/* Mensagem de erro */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-brand-cafe text-brand-creme py-4 rounded-xl font-semibold hover:bg-brand-madeira transition-colors active:scale-95 mt-2"
          >
            Entrar
          </button>

          {/* Dica dos logins de teste */}
          <div className="bg-brand-amber/10 rounded-xl p-4 mt-4">
            <p className="text-brand-cafe text-xs font-semibold mb-2">
              🧪 Logins para teste:
            </p>
            <p className="text-brand-madeira text-xs">cliente@teste.com → /cardapio</p>
            <p className="text-brand-madeira text-xs">funcionario@teste.com → /funcionario</p>
            <p className="text-brand-madeira text-xs">admin@teste.com → /admin</p>
            <p className="text-brand-madeira text-xs font-medium mt-1">Senha: 123456</p>
          </div>

          <p className="text-center text-brand-madeira/60 text-sm mt-4">
            Não tem conta?{' '}
            <Link to="/cadastro" className="text-brand-cafe font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}