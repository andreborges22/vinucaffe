// ===========================
// USUÁRIO
// ===========================
export type UserRole = 'cliente' | 'funcionario' | 'admin'

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
  | 'pendente'
  | 'confirmado'
  | 'preparando'
  | 'pronto'
  | 'entregue'
  | 'cancelado'

export type PaymentMethod = 'pix' | 'credito' | 'debito'
export type PaymentStatus = 'aguardando' | 'aprovado' | 'recusado'

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  unitPrice: number
  subtotal: number
  notes?: string
}

export interface Order {
  id: string
  userId: string
  tableNumber: string
  items: OrderItem[]
  status: OrderStatus
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  createdAt: string
  updatedAt: string
}