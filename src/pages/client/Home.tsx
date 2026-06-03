import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cart.store'
import { Product } from '../../types'

// Dados temporários — depois virão da API do Django
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cappuccino',
    description: 'Espresso cremoso com leite vaporizado',
    price: 12.90,
    imageUrl: '☕',
    categoryId: 'bebidas',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Croissant',
    description: 'Massa folhada amanteigada, crocante por fora',
    price: 8.90,
    imageUrl: '🥐',
    categoryId: 'lanches',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Salada Verde',
    description: 'Mix de folhas frescas com azeite e limão',
    price: 24.90,
    imageUrl: '🥗',
    categoryId: 'pratos',
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Suco Natural',
    description: 'Laranja, limão ou maracujá — fresquinho',
    price: 10.90,
    imageUrl: '🧃',
    categoryId: 'bebidas',
    isAvailable: true,
  },
]

export default function Home() {
  const navigate = useNavigate()

  // Pega as funções e dados do store
  const addItem = useCartStore(state => state.addItem)
  const items = useCartStore(state => state.items)

// Calcula inline — reativo ao array
const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <div className="min-h-screen bg-brand-offwhite">

      {/* Header */}
      <header className="bg-brand-cafe px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-brand-creme text-2xl font-bold">
            Vinu Caffè
          </h1>
          <span className="text-brand-creme/60 text-xs">Mesa 05</span>
        </div>

        {/* Botão do carrinho com contador */}
        <button
          onClick={() => navigate('/carrinho')}
          className="relative bg-brand-amber/20 hover:bg-brand-amber/30 transition-colors rounded-xl p-3"
        >
          <span className="text-2xl">🛒</span>

          {/* Badge com número de itens — só aparece se tiver algo no carrinho */}
          {totalItemsCount > 0 && (
  <span className="absolute -top-1 -right-1 bg-brand-amber text-brand-cafe text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
    {totalItemsCount}
  </span>
)}
        </button>
      </header>

      {/* Conteúdo */}
      <main className="px-6 py-6">
        <p className="text-brand-cafe text-xl font-display font-semibold mb-6">
          O que vai querer hoje?
        </p>

        <div className="grid grid-cols-2 gap-4">
          {mockProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 border border-brand-creme shadow-sm"
            >
              {/* Imagem / emoji do produto */}
              <div className="bg-brand-offwhite rounded-xl h-20 flex items-center justify-center text-4xl mb-3">
                {product.imageUrl}
              </div>

              {/* Nome e descrição */}
              <p className="text-brand-cafe font-medium text-sm leading-tight">
                {product.name}
              </p>
              <p className="text-brand-madeira/70 text-xs mt-1 leading-tight">
                {product.description}
              </p>

              {/* Preço e botão */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-brand-amber font-semibold text-sm">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>

                <button
                  onClick={() => addItem(product)}
                  className="bg-brand-cafe text-brand-creme w-8 h-8 rounded-lg text-xl flex items-center justify-center hover:bg-brand-madeira transition-colors active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}