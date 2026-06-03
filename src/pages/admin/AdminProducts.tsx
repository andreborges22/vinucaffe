import { useState } from 'react'
import { Product } from '../../types'

// Produtos mock iniciais
const INITIAL_PRODUCTS: Product[] = [
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

// Formulário vazio para novo produto
const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  categoryId: 'bebidas',
  isAvailable: true,
}

export default function AdminProducts() {
  const [products, setProducts]   = useState<Product[]>(INITIAL_PRODUCTS)
  const [showForm, setShowForm]   = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm]           = useState(EMPTY_FORM)

  // Abre o formulário para novo produto
  function handleNew() {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowForm(true)
  }

  // Abre o formulário preenchido para edição
  function handleEdit(product: Product) {
    setForm({
      name:        product.name,
      description: product.description,
      price:       product.price.toString(),
      imageUrl:    product.imageUrl,
      categoryId:  product.categoryId,
      isAvailable: product.isAvailable,
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  // Remove o produto da lista
  function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // Salva — cria novo ou atualiza existente
  function handleSave() {
    if (!form.name || !form.price) return

    if (editingId) {
      // Edição
      setProducts(prev => prev.map(p =>
        p.id === editingId
          ? { ...p, ...form, price: parseFloat(form.price) }
          : p
      ))
    } else {
      // Novo produto
      const newProduct: Product = {
        id:          Date.now().toString(),
        name:        form.name,
        description: form.description,
        price:       parseFloat(form.price),
        imageUrl:    form.imageUrl || '🍽️',
        categoryId:  form.categoryId,
        isAvailable: form.isAvailable,
      }
      setProducts(prev => [newProduct, ...prev])
    }

    setShowForm(false)
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  return (
    <div className="space-y-4">

      {/* Cabeçalho com botão novo */}
      <div className="flex items-center justify-between">
        <h2 className="text-brand-cafe font-display text-xl font-bold">
          Produtos ({products.length})
        </h2>
        <button
          onClick={handleNew}
          className="bg-brand-cafe text-brand-creme text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-madeira transition-colors"
        >
          + Novo Produto
        </button>
      </div>

      {/* Formulário de cadastro/edição */}
      {showForm && (
        <div className="bg-white rounded-2xl border-2 border-brand-amber/30 p-5 space-y-4">
          <h3 className="text-brand-cafe font-semibold font-display text-lg">
            {editingId ? 'Editar Produto' : 'Novo Produto'}
          </h3>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nome do produto *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm focus:outline-none focus:border-brand-amber"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm focus:outline-none focus:border-brand-amber"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Preço *"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm focus:outline-none focus:border-brand-amber"
              />
              <input
                type="text"
                placeholder="Emoji (ex: ☕)"
                value={form.imageUrl}
                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm focus:outline-none focus:border-brand-amber"
              />
            </div>

            <select
              value={form.categoryId}
              onChange={e => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm focus:outline-none focus:border-brand-amber"
            >
              <option value="bebidas">Bebidas</option>
              <option value="lanches">Lanches</option>
              <option value="pratos">Pratos</option>
              <option value="sobremesas">Sobremesas</option>
            </select>

            {/* Toggle de disponibilidade */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setForm({ ...form, isAvailable: !form.isAvailable })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  form.isAvailable ? 'bg-brand-cafe' : 'bg-brand-creme'
                } relative`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  form.isAvailable ? 'left-6' : 'left-0.5'
                }`} />
              </div>
              <span className="text-brand-cafe text-sm">
                {form.isAvailable ? 'Disponível' : 'Indisponível'}
              </span>
            </label>
          </div>

          {/* Botões do formulário */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-brand-cafe text-brand-creme py-3 rounded-xl font-semibold hover:bg-brand-madeira transition-colors"
            >
              {editingId ? 'Salvar Alterações' : 'Cadastrar Produto'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 border border-brand-creme text-brand-madeira py-3 rounded-xl font-medium hover:bg-brand-creme/50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de produtos */}
      <div className="space-y-3">
        {products.map(product => (
          <div
            key={product.id}
            className={`bg-white rounded-2xl border p-4 flex items-center gap-4 ${
              product.isAvailable ? 'border-brand-creme' : 'border-red-200 opacity-60'
            }`}
          >
            {/* Emoji */}
            <div className="bg-brand-offwhite rounded-xl w-14 h-14 flex items-center justify-center text-3xl flex-shrink-0">
              {product.imageUrl}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-brand-cafe font-semibold text-sm truncate">
                  {product.name}
                </p>
                {!product.isAvailable && (
                  <span className="text-xs text-red-500 font-medium">
                    Indisponível
                  </span>
                )}
              </div>
              <p className="text-brand-madeira/60 text-xs truncate">
                {product.description}
              </p>
              <p className="text-brand-amber font-bold text-sm mt-1">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => handleEdit(product)}
                className="text-xs text-brand-cafe border border-brand-creme px-3 py-1.5 rounded-lg hover:bg-brand-offwhite transition-colors"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                🗑 Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}