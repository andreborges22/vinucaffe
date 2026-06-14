import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export default function Register() {
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)

  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  function handleRegister() {
    setError('')

    // Validações
    if (!name.trim()) {
      setError('Por favor, informe seu nome.')
      return
    }
    if (!email.includes('@')) {
      setError('Por favor, informe um e-mail válido.')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }

    // Simula criação de conta (depois virá da API do Django)
    setLoading(true)
    setTimeout(() => {
      login({
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        role: 'client',
        token: 'mock-token-new-client',
      })
      navigate('/cardapio')
    }, 1000)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2C1A0E 0%, #4A3728 50%, #B5651D 100%)' }}
    >

      {/* Decoração de fundo */}
      <div className="absolute top-10 right-10 text-white/5 text-[160px] font-bold select-none leading-none pointer-events-none">✳</div>
      <div className="absolute bottom-0 -left-10 text-white/5 text-[200px] font-bold select-none leading-none pointer-events-none">✳</div>

      {/* Card */}
      <div className="relative bg-brand-offwhite rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">

        {/* Faixa superior */}
        <div
          className="h-2 w-full"
          style={{ background: 'linear-gradient(90deg, #B5651D, #6B7C3A, #B5651D)' }}
        />

        <div className="px-8 py-8">

          {/* Logo */}
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #4A3728, #B5651D)' }}
            >
              <span className="text-white font-display text-xl font-bold">V</span>
            </div>
            <h1 className="font-display text-brand-escuro text-2xl font-bold">
              Criar conta
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="h-px w-6 bg-brand-marrom/30" />
              <span className="text-brand-oliva text-sm">✳</span>
              <div className="h-px w-6 bg-brand-marrom/30" />
            </div>
            <p className="text-brand-escuro/40 text-xs mt-1">
              Acumule pontos e acompanhe seus pedidos
            </p>
          </div>

          {/* Campos */}
          <div className="space-y-3">
            <div>
              <label className="text-brand-escuro/70 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full border-2 border-brand-creme rounded-xl px-4 py-3 text-brand-escuro text-sm placeholder:text-brand-escuro/25 focus:outline-none focus:border-brand-marrom bg-white transition-colors"
              />
            </div>

            <div>
              <label className="text-brand-escuro/70 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full border-2 border-brand-creme rounded-xl px-4 py-3 text-brand-escuro text-sm placeholder:text-brand-escuro/25 focus:outline-none focus:border-brand-marrom bg-white transition-colors"
              />
            </div>

            <div>
              <label className="text-brand-escuro/70 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full border-2 border-brand-creme rounded-xl px-4 py-3 text-brand-escuro text-sm placeholder:text-brand-escuro/25 focus:outline-none focus:border-brand-marrom bg-white transition-colors"
              />
            </div>

            <div>
              <label className="text-brand-escuro/70 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                placeholder="••••••••"
                className="w-full border-2 border-brand-creme rounded-xl px-4 py-3 text-brand-escuro text-sm placeholder:text-brand-escuro/25 focus:outline-none focus:border-brand-marrom bg-white transition-colors"
              />
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="text-red-500 text-sm">⚠</span>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Botão */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full text-white py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg mt-1 disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>

            {/* Benefícios */}
            <div
              className="rounded-xl p-3 mt-1"
              style={{ background: 'linear-gradient(135deg, #F5F0E8, #EDE5D0)' }}
            >
              <p className="text-brand-escuro/60 text-xs text-center leading-relaxed">
                ☕ Acumule pontos · 📦 Acompanhe pedidos · 🎁 Promoções exclusivas
              </p>
            </div>

            <p className="text-center text-brand-escuro/40 text-sm pt-1">
              Já tem conta?{' '}
              <Link to="/login" className="text-brand-marrom font-semibold hover:underline">
                Entrar
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