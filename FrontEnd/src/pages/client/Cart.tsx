import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cart.store'

export default function Cart() {
  const navigate = useNavigate()
  const { items, increaseQuantity, decreaseQuantity, removeItem, total, totalItems } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex flex-col">

        {/* HEADER */}
        <header className="bg-white border-b border-brand-creme px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/cardapio')}
            className="text-brand-marrom text-xl"
          >
            ←
          </button>
          <h1 className="font-display text-brand-escuro text-xl font-semibold">
            Meu Carrinho
          </h1>
        </header>

        {/* VAZIO */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
            style={{ background: 'linear-gradient(135deg, #F5F0E8, #EDE5D0)' }}
          >
            🛒
          </div>
          <p className="text-brand-escuro font-display text-xl font-semibold">
            Carrinho vazio
          </p>
          <p className="text-brand-escuro/50 text-sm text-center">
            Adicione itens do cardápio para continuar
          </p>
          <button
            onClick={() => navigate('/cardapio')}
            className="text-white px-8 py-3 rounded-xl font-medium transition-colors"
            style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
          >
            Ver cardápio
          </button>
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-offwhite">

      {/* HEADER */}
      <header className="bg-white border-b border-brand-creme px-4 py-4 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => navigate('/cardapio')}
          className="text-brand-marrom text-xl"
        >
          ←
        </button>
        <h1 className="font-display text-brand-escuro text-xl font-semibold">
          Meu Carrinho
        </h1>
        <span className="ml-auto bg-brand-creme text-brand-escuro text-xs font-medium px-3 py-1 rounded-full">
          {totalItems()} {totalItems() === 1 ? 'item' : 'itens'}
        </span>
      </header>

      {/* ITENS */}
      <main className="max-w-2xl mx-auto px-4 py-4 pb-40">
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <div
              key={`${item.product.id}-${item.notes || ''}-${index}`}
              className="bg-white rounded-2xl p-4 border border-brand-creme/80 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">

                {/* Imagem / placeholder */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ background: 'linear-gradient(135deg, #F5F0E8, #EDE5D0)' }}
                >
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : '☕'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-brand-escuro font-semibold text-sm leading-snug">
                    {item.product.name}
                  </p>

                  {/* Observação — aparece só se existir */}
                  {item.notes && (
                    <p className="text-brand-oliva text-xs mt-0.5 italic flex items-center gap-1">
                      💬 {item.notes}
                    </p>
                  )}

                  <p className="text-brand-marrom font-bold text-sm mt-1">
                    R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-brand-escuro/40 text-xs">
                    R$ {item.product.price.toFixed(2).replace('.', ',')} cada
                  </p>
                </div>

                {/* Controles de quantidade */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => decreaseQuantity(item.product.id, item.notes)}
                    className="w-8 h-8 rounded-lg border border-brand-creme text-brand-escuro flex items-center justify-center text-lg hover:bg-brand-creme transition-colors active:scale-90"
                  >
                    −
                  </button>
                  <span className="text-brand-escuro font-bold text-sm w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.product.id, item.notes)}
                    className="w-8 h-8 rounded-lg text-white flex items-center justify-center text-lg transition-colors active:scale-90"
                    style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
                  >
                    +
                  </button>
                </div>

              </div>

              {/* Remover */}
              <button
                onClick={() => removeItem(item.product.id, item.notes)}
                className="text-xs text-red-400 hover:text-red-600 mt-3 transition-colors flex items-center gap-1"
              >
                🗑 Remover item
              </button>

            </div>
          ))}
        </div>

        {/* Resumo de valores */}
        <div className="bg-white rounded-2xl border border-brand-creme p-4 mt-4 shadow-sm">
          <div className="flex justify-between text-sm text-brand-escuro/60 mb-2">
            <span>{totalItems()} {totalItems() === 1 ? 'item' : 'itens'}</span>
            <span>R$ {total().toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between font-bold text-brand-escuro border-t border-brand-creme pt-2 mt-2">
            <span>Total</span>
            <span className="text-brand-marrom text-lg">
              R$ {total().toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

      </main>

      {/* RODAPÉ FIXO */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-creme px-4 py-4 z-40 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full text-white py-4 rounded-2xl font-semibold transition-all active:scale-95 shadow-md"
            style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
          >
            Finalizar pedido · R$ {total().toFixed(2).replace('.', ',')}
          </button>
        </div>
      </div>

    </div>
  )
}