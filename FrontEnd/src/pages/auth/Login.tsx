import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

const MOCK_USERS = [
  { id: '1', name: 'Cliente Teste',     email: 'cliente@teste.com',     password: '123456', role: 'client'   as const, token: 'mock-token-client' },
  { id: '2', name: 'Funcionário Teste', email: 'funcionario@teste.com', password: '123456', role: 'employee' as const, token: 'mock-token-employee' },
  { id: '3', name: 'Admin Teste',       email: 'admin@teste.com',       password: '123456', role: 'admin'    as const, token: 'mock-token-admin' },
]

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
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (!found) { setError('E-mail ou senha incorretos'); return }
    login({ id: found.id, name: found.name, email: found.email, role: found.role, token: found.token })
    navigate(ROLE_REDIRECT[found.role])
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2C1A0E 0%, #4A3728 40%, #6B4C2A 70%, #B5651D 100%)' }}
    >

      {/* ── Elementos decorativos de fundo ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculo grande desfocado canto superior esquerdo */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #B5651D, transparent 70%)' }}
        />
        {/* Círculo médio canto inferior direito */}
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #6B7C3A, transparent 70%)' }}
        />
        {/* Asterisco grande decorativo */}
        <div className="absolute top-12 right-12 text-white/5 text-[180px] font-bold select-none leading-none">
          ✳
        </div>
        {/* Asterisco médio decorativo */}
        <div className="absolute bottom-16 left-10 text-white/5 text-[100px] font-bold select-none leading-none">
          ✳
        </div>
        {/* Linhas decorativas */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5" />
      </div>

      {/* ── Card central ── */}
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(250, 246, 238, 0.97)', backdropFilter: 'blur(20px)' }}
      >

        {/* Faixa superior decorativa */}
        <div
          className="h-2 w-full"
          style={{ background: 'linear-gradient(90deg, #B5651D, #6B7C3A, #B5651D)' }}
        />

        <div className="px-8 py-10">

          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #4A3728, #B5651D)' }}
            >
              <span className="text-white font-display text-2xl font-bold">V</span>
            </div>
            <h1 className="font-display text-brand-escuro text-3xl font-bold tracking-tight">
              Vinucaffè
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="h-px w-8 bg-brand-marrom/30" />
              <span className="text-brand-oliva text-sm">✳</span>
              <div className="h-px w-8 bg-brand-marrom/30" />
            </div>
            <p className="text-brand-escuro/40 text-xs mt-2 tracking-wide uppercase">
              Café · Negócios · Propósito
            </p>
          </div>

          {/* Título do formulário */}
          <div className="mb-6">
            <h2 className="text-brand-escuro text-xl font-semibold">Bem-vindo de volta</h2>
            <p className="text-brand-escuro/40 text-sm mt-0.5">Entre com sua conta para continuar</p>
          </div>

          {/* Campos */}
          <div className="space-y-4">
            <div>
              <label className="text-brand-escuro/70 text-xs font-semibold uppercase tracking-wider block mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="seu@email.com"
                className="w-full border-2 border-brand-creme rounded-2xl px-4 py-3.5 text-brand-escuro text-sm placeholder:text-brand-escuro/25 focus:outline-none focus:border-brand-marrom bg-white/80 transition-all"
              />
            </div>

            <div>
              <label className="text-brand-escuro/70 text-xs font-semibold uppercase tracking-wider block mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••"
                className="w-full border-2 border-brand-creme rounded-2xl px-4 py-3.5 text-brand-escuro text-sm placeholder:text-brand-escuro/25 focus:outline-none focus:border-brand-marrom bg-white/80 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                <span className="text-red-500 text-sm">⚠</span>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Botão */}
            <button
              onClick={handleLogin}
              className="w-full text-white py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95 shadow-lg mt-2"
              style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
            >
              Entrar
            </button>

            {/* Logins de teste */}
            <div
              className="rounded-2xl p-4 mt-1"
              style={{ background: 'linear-gradient(135deg, #F5F0E8, #EDE5D0)' }}
            >
              <p className="text-brand-escuro text-xs font-semibold mb-2">🧪 Logins para teste</p>
              <div className="space-y-0.5">
                <p className="text-brand-escuro/50 text-xs">cliente@teste.com → cardápio</p>
                <p className="text-brand-escuro/50 text-xs">funcionario@teste.com → fila</p>
                <p className="text-brand-escuro/50 text-xs">admin@teste.com → painel</p>
              </div>
              <div className="mt-2 pt-2 border-t border-brand-creme flex items-center gap-1.5">
                <span className="text-brand-escuro/40 text-xs">Senha:</span>
                <code className="text-brand-marrom text-xs font-bold tracking-widest">123456</code>
              </div>
            </div>

            <p className="text-center text-brand-escuro/40 text-sm pt-1">
              Não tem conta?{' '}
              <Link to="/cadastro" className="text-brand-marrom font-semibold hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>

        </div>

        {/* Faixa inferior */}
        <div
          className="h-1 w-full opacity-40"
          style={{ background: 'linear-gradient(90deg, #6B7C3A, #B5651D, #6B7C3A)' }}
        />
      </div>

    </div>
  )
}