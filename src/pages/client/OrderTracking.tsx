import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderStatus } from '../../types'

// As 4 etapas do pedido — cada uma tem ícone, título e descrição
const ORDER_STEPS: {
  status: OrderStatus
  emoji: string
  title: string
  description: string
}[] = [
  {
    status: 'received',
    emoji: '📋',
    title: 'Pedido Recebido',
    description: 'Sua comanda chegou na cozinha',
  },
  {
    status: 'preparing',
    emoji: '👨‍🍳',
    title: 'Preparando',
    description: 'Nosso time está preparando tudo',
  },
  {
    status: 'ready',
    emoji: '✅',
    title: 'Pronto!',
    description: 'Seu pedido está pronto para retirar',
  },
  {
    status: 'delivered',
    emoji: '🍽️',
    title: 'Entregue',
    description: 'Bom apetite! Aproveite sua refeição',
  },
]

// Índice de cada status — usado para comparar "qual veio antes"
const STATUS_INDEX: Record<OrderStatus, number> = {
  received: 0,
  preparing: 1,
  ready: 2,
  delivered: 3,
}

export default function OrderTracking() {
  const navigate = useNavigate()

  // Estado local do status — começa em 'received'
  const [status, setStatus] = useState<OrderStatus>('received')
  const [protocol] = useState('392565') // Depois virá do store/API

  // ⚙️ SIMULAÇÃO — avança o status automaticamente a cada 5 segundos
  // Isso simula o que o Socket.io fará em produção
  useEffect(() => {
    const sequence: OrderStatus[] = ['received', 'preparing', 'ready', 'delivered']
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex += 1
      if (currentIndex < sequence.length) {
        setStatus(sequence[currentIndex])
      } else {
        clearInterval(interval) // Para quando chegar em 'delivered'
      }
    }, 5000) // 5 segundos entre cada etapa

    // Cleanup — cancela o intervalo se o usuário sair da tela
    return () => clearInterval(interval)
  }, [])

  const currentIndex = STATUS_INDEX[status]
  const isDelivered = status === 'delivered'

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col">

      {/* Header */}
      <header className="bg-brand-cafe px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/cardapio')}
          className="text-brand-creme/70 hover:text-brand-creme text-2xl transition-colors"
        >
          ←
        </button>
        <div>
          <h1 className="font-display text-brand-creme text-2xl font-bold">
            Meu Pedido
          </h1>
          <span className="text-brand-creme/60 text-xs">
            #{protocol} · Mesa 05
          </span>
        </div>
      </header>

      <main className="flex-1 px-6 py-6 space-y-6">

        {/* Card de status atual — destaque visual */}
        <div className={`rounded-2xl p-6 text-center transition-all duration-500 ${
          isDelivered
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-brand-cafe/5 border-2 border-brand-amber/30'
        }`}>
          {/* Emoji animado com pulso enquanto não entregue */}
          <div className={`text-6xl mb-3 inline-block ${
            !isDelivered ? 'animate-pulse' : ''
          }`}>
            {ORDER_STEPS[currentIndex].emoji}
          </div>
          <h2 className="font-display text-brand-cafe text-2xl font-bold">
            {ORDER_STEPS[currentIndex].title}
          </h2>
          <p className="text-brand-madeira/70 text-sm mt-1">
            {ORDER_STEPS[currentIndex].description}
          </p>

          {/* Tempo estimado — só aparece antes de entregar */}
          {!isDelivered && (
            <div className="mt-4 inline-flex items-center gap-2 bg-brand-amber/15 rounded-xl px-4 py-2">
              <span>⏱</span>
              <span className="text-brand-cafe text-sm font-medium">
                {currentIndex === 0 && 'Estimativa: 15–20 minutos'}
                {currentIndex === 1 && 'Estimativa: 10–15 minutos'}
                {currentIndex === 2 && 'Pronto para retirar!'}
              </span>
            </div>
          )}
        </div>

        {/* Timeline com as 4 etapas */}
        <div className="bg-white rounded-2xl border border-brand-creme p-5">
          <h3 className="text-brand-cafe font-semibold font-display text-lg mb-5">
            Acompanhamento
          </h3>

          <div className="space-y-0">
            {ORDER_STEPS.map((step, index) => {
              const isDone    = index < currentIndex
              const isCurrent = index === currentIndex
              const isPending = index > currentIndex
              const isLast    = index === ORDER_STEPS.length - 1

              return (
                <div key={step.status} className="flex gap-4">

                  {/* Coluna do indicador (bolinha + linha vertical) */}
                  <div className="flex flex-col items-center">
                    {/* Bolinha de status */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-lg
                      flex-shrink-0 transition-all duration-500
                      ${isDone    ? 'bg-brand-cafe text-brand-creme' : ''}
                      ${isCurrent ? 'bg-brand-amber text-brand-cafe ring-4 ring-brand-amber/30' : ''}
                      ${isPending ? 'bg-brand-offwhite border-2 border-brand-creme text-brand-madeira/40' : ''}
                    `}>
                      {isDone ? '✓' : step.emoji}
                    </div>

                    {/* Linha vertical conectando as bolinhas */}
                    {!isLast && (
                      <div className={`
                        w-0.5 flex-1 min-h-[24px] my-1 transition-all duration-700
                        ${isDone ? 'bg-brand-cafe' : 'bg-brand-creme'}
                      `} />
                    )}
                  </div>

                  {/* Coluna do texto */}
                  <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                    <p className={`font-medium text-sm transition-colors ${
                      isCurrent ? 'text-brand-amber' :
                      isDone    ? 'text-brand-cafe' :
                                  'text-brand-madeira/40'
                    }`}>
                      {step.title}
                    </p>
                    <p className={`text-xs mt-0.5 transition-colors ${
                      isPending ? 'text-brand-madeira/30' : 'text-brand-madeira/60'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Botão de avaliar — SÓ aparece quando o pedido foi entregue */}
        {isDelivered && (
          <div className="space-y-3 animate-fade-in">
            <button
              onClick={() => navigate('/avaliacao')}
              className="w-full bg-brand-cafe text-brand-creme py-4 rounded-xl font-semibold hover:bg-brand-madeira transition-colors active:scale-95"
            >
              ⭐ Avaliar Atendimento
            </button>
            <button
              onClick={() => navigate('/cardapio')}
              className="w-full border border-brand-creme text-brand-madeira py-3 rounded-xl font-medium hover:bg-brand-creme/50 transition-colors"
            >
              Fazer Novo Pedido
            </button>
          </div>
        )}

      </main>
    </div>
  )
}