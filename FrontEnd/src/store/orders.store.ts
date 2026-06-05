import { create } from 'zustand'
import { Order, OrderStatus } from '../types'

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Order) => void
  updateStatus: (orderId: string, status: OrderStatus) => void
}

// Pedidos mock iniciais — depois virão do back-end via Socket.io
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    protocol: '392565',
    tableNumber: '05',
    status: 'received',
    createdAt: new Date(),
    total: 34.70,
    items: [
      { productName: 'Cappuccino', quantity: 2, price: 12.90 },
      { productName: 'Croissant',  quantity: 1, price: 8.90  },
    ],
  },
  {
    id: '2',
    protocol: '847291',
    tableNumber: '03',
    status: 'preparing',
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 min atrás
    total: 24.90,
    items: [
      { productName: 'Salada Verde', quantity: 1, price: 24.90 },
    ],
  },
  {
    id: '3',
    protocol: '615038',
    tableNumber: '08',
    status: 'ready',
    createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 min atrás
    total: 10.90,
    items: [
      { productName: 'Suco Natural', quantity: 1, price: 10.90 },
    ],
  },
]

export const useOrdersStore = create<OrdersStore>()((set) => ({
  orders: MOCK_ORDERS,

  addOrder: (order) =>
    set(state => ({ orders: [order, ...state.orders] })),

  updateStatus: (orderId, status) =>
    set(state => ({
      orders: state.orders.map(o =>
        o.id === orderId ? { ...o, status } : o
      ),
    })),
}))