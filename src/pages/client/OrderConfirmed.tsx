import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cart.store'

export default function OrderConfirmed() {
  const navigate = useNavigate()
  const clearCart = useCartStore(state => state.clearCart)

  // Gera um número de protocolo aleatório (depois virá do back-end)
  const [protocol] = useState(() =>
    Math.floor(100000 + Math.random() * 900000).toString()
  )

  // Limpa o carrinho quando essa tela abre
  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col items-center justify-center px-6">

      {/* Animação de sucesso */}
      <div className="bg-white rounded-3xl p-10 w-full max-w-sm text-center border border-brand-creme shadow-sm">

        {/* Ícone animado */}
        <div className="w-24 h-24 bg-brand-cafe rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <span className="text-4xl">✓</span>
        </div>

        <h1 className="font-display text-brand-cafe text-3xl font-bold mb-2">
          Pedido Feito!
        </h1>
        <p className="text-brand-madeira text-sm mb-6">
          Seu pedido foi recebido e já está sendo preparado com carinho.
        </p>

        {/* Número do protocolo */}
        <div className="bg-brand-offwhite rounded-2xl p-4 mb-6">
          <p className="text-brand-madeira/60 text-xs uppercase tracking-widest mb-1">
            Número do Pedido
          </p>
          <p className="font-display text-brand-cafe text-4xl font-bold tracking-wider">
            #{protocol}
          </p>
        </div>

        {/* Tempo estimado */}
        <div className="flex items-center justify-center gap-2 bg-brand-amber/10 rounded-xl px-4 py-3 mb-8">
          <span className="text-xl">⏱</span>
          <p className="text-brand-cafe text-sm font-medium">
            Tempo estimado: <span className="font-bold">15–20 minutos</span>
          </p>
        </div>

        {/* Botões */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/acompanhamento')}
            className="w-full bg-brand-cafe text-brand-creme py-3 rounded-xl font-semibold hover:bg-brand-madeira transition-colors"
          >
            Acompanhar Pedido
          </button>
          <button
            onClick={() => navigate('/acompanhamento')}
            className="w-full border border-brand-creme text-brand-madeira py-3 rounded-xl font-medium hover:bg-brand-creme/50 transition-colors"
          >
            Pedir Mais Itens
          </button>
        </div>

      </div>
    </div>
  )
}