import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cart.store'

export default function Cart() {
  const navigate = useNavigate()

  const items           = useCartStore(state => state.items)
  const increaseQuantity = useCartStore(state => state.increaseQuantity)
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
  const removeItem       = useCartStore(state => state.removeItem)
  const total            = useCartStore(state => state.total)

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col">

      {/* Header */}
      <header className="bg-brand-cafe px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/cardapio')}
          className="text-brand-creme/70 hover:text-brand-creme text-2xl transition-colors"
        >
          ←
        </button>
        <h1 className="font-display text-brand-creme text-2xl font-bold">
          Meu Carrinho
        </h1>
      </header>

      {/* Lista de itens */}
      <main className="flex-1 px-6 py-6">

        {/* Carrinho vazio */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <span className="text-6xl">🛒</span>
            <p className="text-brand-madeira text-center">
              Seu carrinho está vazio
            </p>
            <button
              onClick={() => navigate('/cardapio')}
              className="bg-brand-cafe text-brand-creme px-6 py-2 rounded-xl text-sm hover:bg-brand-madeira transition-colors"
            >
              Ver cardápio
            </button>
          </div>
        )}

        {/* Itens do carrinho */}
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 border border-brand-creme flex items-center gap-4"
            >
              {/* Emoji do produto */}
              <div className="bg-brand-offwhite rounded-xl w-14 h-14 flex items-center justify-center text-3xl flex-shrink-0">
                {product.imageUrl}
              </div>

              {/* Nome e preço unitário */}
              <div className="flex-1 min-w-0">
                <p className="text-brand-cafe font-medium text-sm truncate">
                  {product.name}
                </p>
                <p className="text-brand-madeira/70 text-xs">
                  R$ {product.price.toFixed(2).replace('.', ',')} cada
                </p>
                <p className="text-brand-amber font-semibold text-sm mt-1">
                  R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                </p>
              </div>

              {/* Controles de quantidade */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="bg-brand-offwhite text-brand-cafe w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:bg-brand-creme transition-colors"
                >
                  −
                </button>
                <span className="text-brand-cafe font-semibold w-4 text-center text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="bg-brand-cafe text-brand-creme w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:bg-brand-madeira transition-colors"
                >
                  +
                </button>
              </div>

              {/* Botão remover */}
              <button
                onClick={() => removeItem(product.id)}
                className="text-red-300 hover:text-red-500 transition-colors text-lg flex-shrink-0"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Rodapé com total e botão de finalizar */}
      {items.length > 0 && (
        <footer className="bg-white border-t border-brand-creme px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-brand-madeira font-medium">Total</span>
            <span className="text-brand-cafe font-display text-2xl font-bold">
              R$ {total().toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-brand-cafe text-brand-creme py-4 rounded-xl font-semibold text-base hover:bg-brand-madeira transition-colors active:scale-95"
          >
            Finalizar Pedido
          </button>
        </footer>
      )}

    </div>
  )
}