import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { useOrdersStore } from '../../store/orders.store'
import AdminProducts from '../admin/AdminProducts'

type AdminTab = 'dashboard' | 'products' | 'orders'

export default function Dashboard() {
  const navigate     = useNavigate()
  const user         = useAuthStore(state => state.user)
  const logout       = useAuthStore(state => state.logout)
  const orders       = useOrdersStore(state => state.orders)
  const [tab, setTab] = useState<AdminTab>('dashboard')

  // Métricas calculadas dos pedidos mock
  const totalOrders    = orders.length
  const delivered      = orders.filter(o => o.status === 'delivered').length
  const active         = orders.filter(o => o.status !== 'delivered').length
  const totalRevenue   = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col">

      {/* Header */}
      <header className="bg-brand-cafe px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-brand-creme text-xl font-bold">
            Vinu Caffè Admin
          </h1>
          <p className="text-brand-creme/60 text-xs">
            Olá, {user?.name} 👋
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-brand-creme/60 hover:text-brand-creme text-sm transition-colors"
        >
          Sair
        </button>
      </header>

      {/* Navegação por abas */}
      <nav className="bg-white border-b border-brand-creme px-4 flex gap-1">
        {[
          { id: 'dashboard', label: '📊 Dashboard' },
          { id: 'products',  label: '🍽️ Produtos'  },
          { id: 'orders',    label: '📋 Pedidos'   },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id as AdminTab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === item.id
                ? 'border-brand-cafe text-brand-cafe'
                : 'border-transparent text-brand-madeira/60 hover:text-brand-cafe'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Conteúdo da aba */}
      <main className="flex-1 px-4 py-6">

        {/* ── ABA DASHBOARD ── */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-brand-cafe font-display text-xl font-bold">
              Resumo do Dia
            </h2>

            {/* Cards de métricas */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                emoji="💰"
                label="Faturamento"
                value={`R$ ${totalRevenue.toFixed(2).replace('.', ',')}`}
                color="bg-green-50 border-green-200"
              />
              <MetricCard
                emoji="📋"
                label="Total de Pedidos"
                value={totalOrders.toString()}
                color="bg-blue-50 border-blue-200"
              />
              <MetricCard
                emoji="⏳"
                label="Em Andamento"
                value={active.toString()}
                color="bg-brand-amber/10 border-brand-amber/30"
              />
              <MetricCard
                emoji="✅"
                label="Entregues"
                value={delivered.toString()}
                color="bg-brand-offwhite border-brand-creme"
              />
            </div>

            {/* Últimos pedidos */}
            <section>
              <h3 className="text-brand-cafe font-semibold mb-3">
                Últimos Pedidos
              </h3>
              <div className="space-y-2">
                {orders.slice(0, 5).map(order => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-brand-creme px-4 py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-brand-cafe text-sm font-medium">
                        Mesa {order.tableNumber} · #{order.protocol}
                      </p>
                      <p className="text-brand-madeira/50 text-xs">
                        {order.items.length} iten{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-brand-cafe font-semibold text-sm">
                        R$ {order.total.toFixed(2).replace('.', ',')}
                      </p>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ── ABA PRODUTOS ── */}
        {tab === 'products' && <AdminProducts />}

        {/* ── ABA PEDIDOS ── */}
        {tab === 'orders' && (
          <div className="space-y-3">
            <h2 className="text-brand-cafe font-display text-xl font-bold">
              Todos os Pedidos
            </h2>
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-brand-creme p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-brand-cafe font-bold">
                    Mesa {order.tableNumber}
                  </p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-brand-madeira/60 text-xs mb-3">
                  #{order.protocol}
                </p>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-brand-cafe text-sm">
                      {item.quantity}x {item.productName}
                    </p>
                  ))}
                </div>
                <div className="border-t border-brand-creme mt-3 pt-3 flex justify-between">
                  <span className="text-brand-madeira text-sm">Total</span>
                  <span className="text-brand-cafe font-bold">
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}

// ── Componentes auxiliares ──────────────────────────────────────

function MetricCard({
  emoji, label, value, color
}: {
  emoji: string
  label: string
  value: string
  color: string
}) {
  return (
    <div className={`rounded-2xl border-2 p-4 ${color}`}>
      <span className="text-2xl">{emoji}</span>
      <p className="text-brand-madeira/60 text-xs mt-2">{label}</p>
      <p className="text-brand-cafe font-display text-xl font-bold mt-1">
        {value}
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string }> = {
    received:  { label: 'Recebido',   color: 'bg-blue-100 text-blue-700'   },
    preparing: { label: 'Preparando', color: 'bg-yellow-100 text-yellow-700' },
    ready:     { label: 'Pronto',     color: 'bg-green-100 text-green-700'  },
    delivered: { label: 'Entregue',   color: 'bg-gray-100 text-gray-600'   },
  }
  const c = config[status] ?? { label: status, color: 'bg-gray-100 text-gray-600' }
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.color}`}>
      {c.label}
    </span>
  )
}