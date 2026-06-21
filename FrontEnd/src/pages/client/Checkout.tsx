import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from '../../store/cart.store'
import { useAuthStore } from '../../store/auth.store'

type PaymentOption = 'pix' | 'credito' | 'debito'

export default function Checkout() {
  const navigate = useNavigate()

  const items = useCartStore(state => state.items)
  const total = useCartStore(state => state.total)
  const user  = useAuthStore(state => state.user)

  const [tableNumber, setTableNumber] = useState('05')
  const [payment, setPayment] = useState<PaymentOption>('pix')

  if (items.length === 0) {
    navigate('/cardapio')
    return null
  }

  const paymentOptions: { value: PaymentOption; label: string; emoji: string }[] = [
    { value: 'pix',     label: 'PIX',               emoji: '⚡' },
    { value: 'credito', label: 'Cartão de Crédito', emoji: '💳' },
    { value: 'debito',  label: 'Cartão de Débito',  emoji: '💳' },
  ]

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col">

      {/* Header */}
      <header className="bg-brand-escuro px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/carrinho')}
          className="text-brand-creme/70 hover:text-brand-creme text-2xl transition-colors"
        >
          ←
        </button>
        <h1 className="font-display text-brand-creme text-2xl font-bold">
          Confirmar Pedido
        </h1>
      </header>

      <main className="flex-1 px-6 py-6 space-y-6 max-w-2xl w-full mx-auto">

        {/* ── Banner de incentivo ao login ── */}
        {!user && (
          <section
            className="rounded-2xl p-5 text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
          >
            <div className="absolute -right-6 -top-6 text-white/10 text-7xl">✳</div>
            <div className="relative z-10">
              <p className="font-display text-lg font-bold mb-1">
                ☕ Faça login e ganhe pontos!
              </p>
              <p className="text-white/80 text-sm mb-4">
                Acumule pontos a cada pedido, acompanhe seu pedido em tempo real
                e receba promoções exclusivas do Vinu Caffè.
              </p>
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="flex-1 bg-white text-brand-escuro text-center font-semibold text-sm py-2.5 rounded-xl hover:bg-brand-creme transition-colors"
                >
                  Entrar ou Cadastrar
                </Link>
                <button
                  onClick={() => {
                    const section = document.getElementById('checkout-form')
                    section?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex-1 bg-white/10 text-white text-center font-medium text-sm py-2.5 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Continuar sem login
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Saudação para quem já está logado */}
        {user && (
          <section className="bg-brand-oliva/10 border border-brand-oliva/30 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">👋</span>
            <p className="text-brand-escuro text-sm">
              Olá, <strong>{user.name}</strong>! Você poderá acompanhar este pedido em tempo real.
            </p>
          </section>
        )}

        <div id="checkout-form" className="space-y-6">

          {/* Resumo dos itens */}
          <section className="bg-white rounded-2xl border border-brand-creme p-5">
            <h2 className="text-brand-escuro font-semibold mb-4 font-display text-lg">
              Resumo do Pedido
            </h2>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">☕</span>
                    <div>
                      <p className="text-brand-escuro text-sm font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-brand-escuro/50 text-xs">
                         {item.quantity}x R$ {item.product.price.toFixed(2).replace('.', ',')}
                      </p>
                       {item.notes && (
                      <p className="text-brand-oliva text-xs italic mt-0.5 flex items-center gap-1">
                        💬 {item.notes}
                      </p>
                    )} 
                     </div>
                  </div>
                  <span className="text-brand-escuro font-semibold text-sm">
                    R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-creme mt-4 pt-4 flex justify-between">
              <span className="text-brand-escuro/60 font-medium">Total</span>
              <span className="text-brand-escuro font-display text-xl font-bold">
                R$ {total().toFixed(2).replace('.', ',')}
              </span>
            </div>
          </section>

          {/* Número da mesa */}
          <section className="bg-white rounded-2xl border border-brand-creme p-5">
            <h2 className="text-brand-escuro font-semibold mb-3 font-display text-lg">
              Número da Mesa
            </h2>
            <input
              type="number"
              value={tableNumber}
              onChange={e => setTableNumber(e.target.value)}
              className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-escuro text-center text-2xl font-bold focus:outline-none focus:border-brand-marrom"
            />
          </section>

          {/* Forma de pagamento */}
          <section className="bg-white rounded-2xl border border-brand-creme p-5">
            <h2 className="text-brand-escuro font-semibold mb-3 font-display text-lg">
              Forma de Pagamento
            </h2>

            <div className="space-y-2">
              {paymentOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setPayment(option.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-colors ${
                    payment === option.value
                      ? 'border-brand-marrom bg-brand-marrom/5'
                      : 'border-brand-creme hover:border-brand-marrom/40'
                  }`}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className={`font-medium text-sm ${
                    payment === option.value
                      ? 'text-brand-escuro'
                      : 'text-brand-escuro/60'
                  }`}>
                    {option.label}
                  </span>

                  <div className="ml-auto w-5 h-5 rounded-full border-2 border-brand-creme flex items-center justify-center">
                    {payment === option.value && (
                      <div className="w-3 h-3 rounded-full bg-brand-marrom" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

      </main>

      {/* Botão confirmar */}
      <footer className="bg-white border-t border-brand-creme px-6 py-5">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/pedido-confirmado')}
            className="w-full bg-brand-marrom text-white py-4 rounded-xl font-semibold text-base hover:bg-brand-escuro transition-colors active:scale-95"
          >
            Confirmar Pedido • R$ {total().toFixed(2).replace('.', ',')}
          </button>
        </div>
      </footer>

    </div>
  )
}