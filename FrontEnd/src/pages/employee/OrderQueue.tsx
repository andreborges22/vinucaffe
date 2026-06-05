import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { useOrdersStore } from '../../store/orders.store'
import { Order, OrderStatus } from '../../types'

// Configuração visual de cada status
const STATUS_CONFIG: Record<OrderStatus, {
  label: string
  emoji: string
  color: string
  next: OrderStatus | null
  nextLabel: string | null
}> = {
  received: {
    label:     'Recebido',
    emoji:     '📋',
    color:     'bg-blue-50 border-blue-200',
    next:      'preparing',
    nextLabel: 'Iniciar Preparo',
  },
  preparing: {
    label:     'Preparando',
    emoji:     '👨‍🍳',
    color:     'bg-brand-amber/10 border-brand-amber/30',
    next:      'ready',
    nextLabel: 'Marcar como Pronto',
  },
  ready: {
    label:     'Pronto',
    emoji:     '✅',
    color:     'bg-green-50 border-green-200',
    next:      'delivered',
    nextLabel: 'Confirmar Entrega',
  },
  delivered: {
    label:     'Entregue',
    emoji:     '🍽️',
    color:     'bg-gray-50 border-gray-200',
    next:      null,
    nextLabel: null,
  },
}

// Calcula há quantos minutos o pedido foi feito
function minutesAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 60000)
  if (diff === 0) return 'agora mesmo'
  if (diff === 1) return 'há 1 min'
  return `há ${diff} min`
}

// Card individual de cada pedido
function OrderCard({ order }: { order: Order }) {
  const updateStatus = useOrdersStore(state => state.updateStatus)
  const config = STATUS_CONFIG[order.status]

  return (
    <div className={`rounded-2xl border-2 p-4 ${config.color}`}>

      {/* Cabeçalho do card */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{config.emoji}</span>
          <div>
            <p className="text-brand-cafe font-bold text-sm">
              Mesa {order.tableNumber}
            </p>
            <p className="text-brand-madeira/60 text-xs">
              #{order.protocol} · {minutesAgo(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Badge de status */}
        <span className="text-xs font-semibold text-brand-cafe bg-white/80 px-3 py-1 rounded-full border border-brand-creme">
          {config.label}
        </span>
      </div>

      {/* Lista de itens */}
      <div className="space-y-1 mb-4">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-brand-cafe text-sm">
              {item.quantity}x {item.productName}
            </span>
            <span className="text-brand-madeira/60 text-xs">
              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
            </span>
          </div>
        ))}
      </div>

      {/* Total e botão de avançar status */}
      <div className="flex items-center justify-between pt-3 border-t border-white/60">
        <span className="text-brand-cafe font-bold">
          R$ {order.total.toFixed(2).replace('.', ',')}
        </span>

        {config.next && (
          <button
            onClick={() => updateStatus(order.id, config.next!)}
            className="bg-brand-cafe text-brand-creme text-xs font-semibold px-4 py-2 rounded-xl hover:bg-brand-madeira transition-colors active:scale-95"
          >
            {config.nextLabel}
          </button>
        )}

        {!config.next && (
          <span className="text-green-600 text-xs font-semibold">
            ✓ Concluído
          </span>
        )}
      </div>
    </div>
  )
}

// Tela principal
export default function OrderQueue() {
  const navigate = useNavigate()
  const user     = useAuthStore(state => state.user)
  const logout   = useAuthStore(state => state.logout)
  const orders   = useOrdersStore(state => state.orders)

  const active    = orders.filter(o => o.status !== 'delivered')
  const delivered = orders.filter(o => o.status === 'delivered')

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-brand-offwhite">

      {/* Header */}
      <header className="bg-brand-cafe px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-brand-creme text-xl font-bold">
            Fila de Pedidos
          </h1>
          <p className="text-brand-creme/60 text-xs">
            Olá, {user?.name} 👋
          </p>
        </div>

        <div className="flex items-center gap-3">
          {active.length > 0 && (
            <span className="bg-brand-amber text-brand-cafe text-xs font-bold px-3 py-1 rounded-full">
              {active.length} ativo{active.length > 1 ? 's' : ''}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-brand-creme/60 hover:text-brand-creme text-sm transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">

        {/* Fila ativa */}
        {active.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <span className="text-5xl">🎉</span>
            <p className="text-brand-madeira text-center font-medium">
              Nenhum pedido pendente!
            </p>
            <p className="text-brand-madeira/50 text-sm text-center">
              Novos pedidos aparecerão aqui automaticamente
            </p>
          </div>
        ) : (
          <section>
            <h2 className="text-brand-cafe font-semibold mb-3 px-1">
              Pedidos Ativos
            </h2>
            <div className="space-y-3">
              {active.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}

        {/* Pedidos entregues */}
        {delivered.length > 0 && (
          <section>
            <h2 className="text-brand-madeira/50 font-semibold mb-3 px-1 text-sm">
              Entregues hoje ({delivered.length})
            </h2>
            <div className="space-y-2">
              {delivered.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-brand-creme px-4 py-3 flex items-center justify-between opacity-60"
                >
                  <div>
                    <p className="text-brand-cafe text-sm font-medium">
                      Mesa {order.tableNumber} · #{order.protocol}
                    </p>
                    <p className="text-brand-madeira/50 text-xs">
                      {minutesAgo(order.createdAt)}
                    </p>
                  </div>
                  <span className="text-green-600 text-sm">✓ Entregue</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  )
}