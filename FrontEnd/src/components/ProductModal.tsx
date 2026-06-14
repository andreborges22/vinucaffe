import { useState } from 'react'
import { Product } from '../types'

interface ProductModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product, quantity: number, notes: string) => void
}

// Emoji temático por categoria — usado quando não há foto real
const CATEGORY_EMOJI: Record<string, string> = {
  cafes:      '☕',
  gelados:    '🧊',
  combos:     '🍱',
  bebidas:    '🥤',
  entradas:   '🥖',
  refeicoes:  '🍝',
  crepes:     '🥞',
  sanduiches: '🥪',
  sobremesas: '🍰',
  bolos:      '🎂',
  adicional:  '➕',
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')

  const emoji = CATEGORY_EMOJI[product.category] || '☕'
  const subtotal = product.price * quantity

  function handleAdd() {
    onAddToCart(product, quantity, notes)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >

        {/* Imagem / Ilustração */}
        <div className="relative">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-56 object-cover rounded-t-3xl md:rounded-t-3xl"
            />
          ) : (
            <div
              className="w-full h-48 flex items-center justify-center rounded-t-3xl md:rounded-t-3xl"
              style={{ background: 'linear-gradient(135deg, #F5F0E8, #B5651D30)' }}
            >
              <span className="text-7xl">{emoji}</span>
            </div>
          )}

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-brand-escuro text-lg shadow-md hover:bg-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <h2 className="font-display text-brand-escuro text-2xl font-bold">
            {product.name}
          </h2>
          <p className="text-brand-marrom font-bold text-xl mt-1">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-brand-escuro/60 text-sm mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Campo de observação */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-brand-escuro text-sm font-semibold">
                Algum comentário?
              </label>
              <span className="text-brand-escuro/30 text-xs">
                {notes.length} / 140
              </span>
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value.slice(0, 140))}
              placeholder="Ex: tirar a cebola, sem açúcar etc."
              rows={2}
              className="w-full border border-brand-creme rounded-xl px-4 py-3 text-sm text-brand-escuro placeholder:text-brand-escuro/30 focus:outline-none focus:border-brand-marrom resize-none"
            />
          </div>
        </div>

        {/* Rodapé fixo — contador + adicionar */}
        <div className="sticky bottom-0 bg-white border-t border-brand-creme px-6 py-4 flex items-center gap-3">

          {/* Contador de quantidade */}
          <div className="flex items-center gap-3 bg-brand-creme/50 rounded-xl px-2 py-1.5">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg bg-white text-brand-escuro flex items-center justify-center text-lg font-bold shadow-sm active:scale-90 transition-transform"
            >
              −
            </button>
            <span className="text-brand-escuro font-bold text-base w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 rounded-lg bg-white text-brand-escuro flex items-center justify-center text-lg font-bold shadow-sm active:scale-90 transition-transform"
            >
              +
            </button>
          </div>

          {/* Botão adicionar */}
          <button
            onClick={handleAdd}
            className="flex-1 text-white font-semibold text-sm py-3.5 rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
          >
            <span>🛒</span>
            Adicionar ao carrinho · R$ {subtotal.toFixed(2).replace('.', ',')}
          </button>
        </div>

      </div>
    </div>
  )
}