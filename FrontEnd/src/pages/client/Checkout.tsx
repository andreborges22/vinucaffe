import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cart.store'

type PaymentOption = 'pix' | 'credito' | 'debito'

export default function Checkout() {
  const navigate = useNavigate()

  const items = useCartStore(state => state.items)
  const total = useCartStore(state => state.total)

  // Estado local — só usado nessa tela
  const [tableNumber, setTableNumber] = useState('05')
  const [payment, setPayment] = useState<PaymentOption>('pix')
  const [notes, setNotes] = useState('')

  // Se o carrinho estiver vazio, volta para o cardápio
  if (items.length === 0) {
    navigate('/cardapio')
    return null
  }

  const paymentOptions: { value: PaymentOption; label: string; emoji: string }[] = [
    { value: 'pix',     label: 'PIX',             emoji: '⚡' },
    { value: 'credito', label: 'Cartão de Crédito', emoji: '💳' },
    { value: 'debito',  label: 'Cartão de Débito',  emoji: '💳' },
  ]

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col">

      {/* Header */}
      <header className="bg-brand-cafe px-6 py-4 flex items-center gap-4">
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

      <main className="flex-1 px-6 py-6 space-y-6">

        {/* Resumo dos itens */}
        <section className="bg-white rounded-2xl border border-brand-creme p-5">
          <h2 className="text-brand-cafe font-semibold mb-4 font-display text-lg">
            Resumo do Pedido
          </h2>

          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{product.imageUrl}</span>
                  <div>
                    <p className="text-brand-cafe text-sm font-medium">
                      {product.name}
                    </p>
                    <p className="text-brand-madeira/60 text-xs">
                      {quantity}x R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
                <span className="text-brand-cafe font-semibold text-sm">
                  R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-brand-creme mt-4 pt-4 flex justify-between">
            <span className="text-brand-madeira font-medium">Total</span>
            <span className="text-brand-cafe font-display text-xl font-bold">
              R$ {total().toFixed(2).replace('.', ',')}
            </span>
          </div>
        </section>

        {/* Número da mesa */}
        <section className="bg-white rounded-2xl border border-brand-creme p-5">
          <h2 className="text-brand-cafe font-semibold mb-3 font-display text-lg">
            Número da Mesa
          </h2>
          <input
            type="number"
            value={tableNumber}
            onChange={e => setTableNumber(e.target.value)}
            className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-center text-2xl font-bold focus:outline-none focus:border-brand-amber"
          />
        </section>

        {/* Forma de pagamento */}
        <section className="bg-white rounded-2xl border border-brand-creme p-5">
          <h2 className="text-brand-cafe font-semibold mb-3 font-display text-lg">
            Forma de Pagamento
          </h2>

          <div className="space-y-2">
            {paymentOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setPayment(option.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-colors ${
                  payment === option.value
                    ? 'border-brand-cafe bg-brand-cafe/5'
                    : 'border-brand-creme hover:border-brand-amber/50'
                }`}
              >
                <span className="text-xl">{option.emoji}</span>
                <span className={`font-medium text-sm ${
                  payment === option.value
                    ? 'text-brand-cafe'
                    : 'text-brand-madeira'
                }`}>
                  {option.label}
                </span>

                {/* Bolinha de seleção */}
                <div className="ml-auto w-5 h-5 rounded-full border-2 border-brand-creme flex items-center justify-center">
                  {payment === option.value && (
                    <div className="w-3 h-3 rounded-full bg-brand-cafe" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Observações (opcional) */}
        <section className="bg-white rounded-2xl border border-brand-creme p-5">
          <h2 className="text-brand-cafe font-semibold mb-3 font-display text-lg">
            Observações
            <span className="text-brand-madeira/50 font-normal text-sm ml-2">
              (opcional)
            </span>
          </h2>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Ex: sem cebola, alergia a amendoim..."
            rows={3}
            className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm placeholder:text-brand-madeira/40 focus:outline-none focus:border-brand-amber resize-none"
          />
        </section>

      </main>

      {/* Botão confirmar */}
      <footer className="bg-white border-t border-brand-creme px-6 py-5">
        <button
          onClick={() => navigate('/pedido-confirmado')}
          className="w-full bg-brand-cafe text-brand-creme py-4 rounded-xl font-semibold text-base hover:bg-brand-madeira transition-colors active:scale-95"
        >
          Confirmar Pedido • R$ {total().toFixed(2).replace('.', ',')}
        </button>
      </footer>

    </div>
  )
}