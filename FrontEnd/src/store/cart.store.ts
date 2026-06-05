import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '../types'

// 1. Define a forma do estado e as ações disponíveis
interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearCart: () => void
  total: () => number
  totalItems: () => number
}

// 2. Cria o store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Adiciona produto ou aumenta quantidade se já existir
      addItem: (product: Product) => {
        const existing = get().items.find(i => i.product.id === product.id)
        if (existing) {
          set({
            items: get().items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          })
        } else {
          set({ items: [...get().items, { product, quantity: 1 }] })
        }
      },

      // Remove o item completamente
      removeItem: (productId: string) => {
        set({ items: get().items.filter(i => i.product.id !== productId) })
      },

      // Aumenta quantidade
      increaseQuantity: (productId: string) => {
        set({
          items: get().items.map(i =>
            i.product.id === productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        })
      },

      // Diminui quantidade — se chegar a 0, remove
      decreaseQuantity: (productId: string) => {
        const item = get().items.find(i => i.product.id === productId)
        if (!item) return
        if (item.quantity === 1) {
          get().removeItem(productId)
        } else {
          set({
            items: get().items.map(i =>
              i.product.id === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
          })
        }
      },

      // Limpa o carrinho (após finalizar pedido)
      clearCart: () => set({ items: [] }),

      // Calcula o total em R$
      total: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        ),

      // Conta o número total de itens
      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),

    // persist salva o carrinho no localStorage
    // Se o usuário fechar o navegador e voltar, o carrinho continua lá
    { name: 'vinu-cart' }
  )
)