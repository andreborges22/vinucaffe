// ===========================
// USUÁRIO
// ===========================
export type UserRole = 'client' | 'employee' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: string
}

// ===========================
// PRODUTO
// ===========================
export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  categoryId: string
  isAvailable: boolean
  allergens?: string[]
}

// ===========================
// CATEGORIA
// ===========================
export interface Category {
  id: string
  name: string
  slug: string
  iconUrl?: string
  displayOrder: number
}

// ===========================
// CARRINHO
// ===========================
export interface CartItem {
  product: Product
  quantity: number
}

// ===========================
// PEDIDO
// ===========================
export type OrderStatus =
  | 'received'   // Recebido
  | 'preparing'  // Preparando
  | 'ready'      // Pronto
  | 'delivered'  // Entregue

export interface OrderStep {
  status: OrderStatus
  label: string
  description: string
  emoji: string
  estimatedMinutes: number
}

export type PaymentMethod = 'pix' | 'credito' | 'debito'
export type PaymentStatus = 'aguardando' | 'aprovado' | 'recusado'

export interface OrderItem {
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  protocol: string
  tableNumber: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  paymentMethod?: PaymentMethod
  paymentStatus?: PaymentStatus
  createdAt: Date
}