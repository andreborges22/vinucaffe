import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, notes?: string) => void
  removeItem: (productId: number, notes?: string) => void
  increaseQuantity: (productId: number, notes?: string) => void
  decreaseQuantity: (productId: number, notes?: string) => void
  clearCart: () => void
  total: () => number
  totalItems: () => number
}

// Considera o mesmo item se tiver o mesmo produto E a mesma observação
function sameItem(item: CartItem, productId: number, notes?: string) {
  return item.product.id === productId && (item.notes || '') === (notes || '')
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1, notes = '') => {
        const existing = get().items.find(i => sameItem(i, product.id, notes))
        if (existing) {
          set({
            items: get().items.map(i =>
              sameItem(i, product.id, notes)
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          })
        } else {
          set({ items: [...get().items, { product, quantity, notes }] })
        }
      },

      removeItem: (productId: number, notes?: string) => {
        set({ items: get().items.filter(i => !sameItem(i, productId, notes)) })
      },

      increaseQuantity: (productId: number, notes?: string) => {
        set({
          items: get().items.map(i =>
            sameItem(i, productId, notes)
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        })
      },

      decreaseQuantity: (productId: number, notes?: string) => {
        const item = get().items.find(i => sameItem(i, productId, notes))
        if (!item) return
        if (item.quantity === 1) {
          get().removeItem(productId, notes)
        } else {
          set({
            items: get().items.map(i =>
              sameItem(i, productId, notes)
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
          })
        }
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'vinu-cart' }
  )
)