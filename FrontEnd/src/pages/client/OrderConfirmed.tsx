import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from '../../store/cart.store'
import { useAuthStore } from '../../store/auth.store'

export default function OrderConfirmed() {
  const navigate = useNavigate()
  const clearCart = useCartStore(state => state.clearCart)
  const user = useAuthStore(state => state.user)

  const [protocol] = useState(() =>
    Math.floor(100000 + Math.random() * 900000).toString()
  )

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2C1A0E 0%, #4A3728 50%, #B5651D 100%)' }}
    >

      {/* Decoração de fundo */}
      <div className="absolute top-10 right-10 text-white/5 text-[160px] font-bold select-none leading-none pointer-events-none">
        ✳
      </div>
      <div className="absolute bottom-0 -left-10 text-white/5 text-[200px] font-bold select-none leading-none pointer-events-none">
        ✳
      </div>

      {/* Card */}
      <div className="relative bg-brand-offwhite rounded-3xl p-10 w-full max-w-sm text-center shadow-2xl">

        {/* Faixa superior */}
        <div
          className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg, #B5651D, #6B7C3A, #B5651D)' }}
        />

        {/* Ícone animado */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 mt-2 shadow-lg animate-bounce"
          style={{ background: 'linear-gradient(135deg, #6B7C3A, #4A3728)' }}
        >
          <span className="text-4xl text-white">✓</span>
        </div>

        <h1 className="font-display text-brand-escuro text-3xl font-bold mb-2">
          Pedido Feito!
        </h1>
        <p className="text-brand-escuro/50 text-sm mb-6">
          Seu pedido foi recebido e já está sendo preparado com carinho.
        </p>

        {/* Número do protocolo */}
        <div
          className="rounded-2xl p-4 mb-6"
          style={{ background: 'linear-gradient(135deg, #F5F0E8, #EDE5D0)' }}
        >
          <p className="text-brand-escuro/50 text-xs uppercase tracking-widest mb-1">
            Número do Pedido
          </p>
          <p className="font-display text-brand-marrom text-4xl font-bold tracking-wider">
            #{protocol}
          </p>
        </div>

        {/* Tempo estimado */}
        <div className="flex items-center justify-center gap-2 bg-brand-oliva/10 border border-brand-oliva/20 rounded-xl px-4 py-3 mb-8">
          <span className="text-xl">⏱</span>
          <p className="text-brand-escuro text-sm font-medium">
            Tempo estimado: <span className="font-bold">15–20 minutos</span>
          </p>
        </div>

        {/* Botões */}
        <div className="space-y-3">
          {user ? (
            // ── Cliente logado: pode acompanhar em tempo real ──
            <button
              onClick={() => navigate('/acompanhamento')}
              className="w-full text-white py-3.5 rounded-xl font-semibold transition-all active:scale-95 shadow-md"
              style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
            >
              Acompanhar Pedido
            </button>
          ) : (
            // ── Visitante: incentivo a criar conta ──
            <Link
              to="/login"
              className="block w-full text-white py-3.5 rounded-xl font-semibold transition-all active:scale-95 shadow-md text-center"
              style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
            >
              ✨ Criar conta e acompanhar
            </Link>
          )}

          <button
            onClick={() => navigate('/cardapio')}
            className="w-full border-2 border-brand-creme text-brand-escuro/70 py-3.5 rounded-xl font-medium hover:bg-brand-creme/50 transition-colors"
          >
            Pedir Mais Itens
          </button>
        </div>

      </div>
    </div>
  )
}