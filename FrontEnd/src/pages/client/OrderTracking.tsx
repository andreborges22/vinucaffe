import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderStatus } from '../../types'

const ORDER_STEPS: {
  status: OrderStatus
  emoji: string
  title: string
  description: string
}[] = [
  { status: 'received',  emoji: '📋', title: 'Pedido Recebido', description: 'Sua comanda chegou na cozinha' },
  { status: 'preparing', emoji: '👨‍🍳', title: 'Preparando',      description: 'Nosso time está preparando tudo com carinho' },
  { status: 'ready',     emoji: '✅', title: 'Pronto!',          description: 'Seu pedido está pronto para retirar' },
  { status: 'delivered', emoji: '🍽️', title: 'Entregue',         description: 'Bom apetite! Aproveite sua refeição' },
]

const STATUS_INDEX: Record<OrderStatus, number> = {
  received: 0, preparing: 1, ready: 2, delivered: 3,
}

const ESTIMATIVAS = [
  'Estimativa: 15–20 minutos',
  'Estimativa: 10–15 minutos',
  'Pronto para retirar! 🎉',
]

export default function OrderTracking() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<OrderStatus>('received')
  const [protocol] = useState('392565')

  useEffect(() => {
    const sequence: OrderStatus[] = ['received', 'preparing', 'ready', 'delivered']
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex += 1
      if (currentIndex < sequence.length) {
        setStatus(sequence[currentIndex])
      } else {
        clearInterval(interval)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentIndex = STATUS_INDEX[status]
  const isDelivered  = status === 'delivered'

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#FAFAF8' }}
    >

      {/* Header */}
      <header
        className="px-6 py-4 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #2C1A0E, #4A3728)' }}
      >
        <button
          onClick={() => navigate('/cardapio')}
          className="text-white/60 hover:text-white text-2xl transition-colors"
        >
          ←
        </button>
        <div className="flex-1">
          <h1 className="font-display text-white text-xl font-bold">
            Meu Pedido
          </h1>
          <span className="text-white/50 text-xs">
            #{protocol} · Mesa 05
          </span>
        </div>
        <span className="text-brand-oliva text-2xl">✳</span>
      </header>

      <main className="flex-1 px-4 py-6 space-y-4 max-w-2xl w-full mx-auto">

        {/* Card de status atual */}
        <div
          className="rounded-2xl p-6 text-center relative overflow-hidden"
          style={{
            background: isDelivered
              ? 'linear-gradient(135deg, #4A5C3F, #6B7C3A)'
              : 'linear-gradient(135deg, #2C1A0E, #B5651D)',
          }}
        >
          {/* Asterisco decorativo */}
          <div className="absolute -right-4 -top-4 text-white/5 text-[120px] font-bold select-none leading-none">
            ✳
          </div>

          <div className={`text-6xl mb-3 inline-block relative z-10 ${!isDelivered ? 'animate-pulse' : ''}`}>
            {ORDER_STEPS[currentIndex].emoji}
          </div>

          <h2 className="font-display text-white text-2xl font-bold relative z-10">
            {ORDER_STEPS[currentIndex].title}
          </h2>
          <p className="text-white/70 text-sm mt-1 relative z-10">
            {ORDER_STEPS[currentIndex].description}
          </p>

          {!isDelivered && currentIndex < 3 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 relative z-10">
              <span>⏱</span>
              <span className="text-white text-sm font-medium">
                {ESTIMATIVAS[currentIndex]}
              </span>
            </div>
          )}
        </div>

        {/* Número do protocolo */}
        <div className="bg-white rounded-2xl border border-brand-creme p-4 flex items-center justify-between shadow-sm">
          <span className="text-brand-escuro/50 text-sm">Número do pedido</span>
          <span className="font-display text-brand-marrom text-xl font-bold">
            #{protocol}
          </span>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-brand-creme p-5 shadow-sm">
          <h3 className="text-brand-escuro font-display text-lg font-semibold mb-5">
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

                  {/* Indicador */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all duration-500"
                      style={{
                        background: isDone    ? 'linear-gradient(135deg, #B5651D, #4A3728)' :
                                    isCurrent ? 'linear-gradient(135deg, #6B7C3A, #4A5C3F)' :
                                                '#F5F0E8',
                        color:      isPending ? '#B5651D40' : 'white',
                        border:     isCurrent ? '3px solid #6B7C3A' : 'none',
                        boxShadow:  isCurrent ? '0 0 0 4px #6B7C3A20' : 'none',
                      }}
                    >
                      {isDone ? '✓' : step.emoji}
                    </div>

                    {!isLast && (
                      <div
                        className="w-0.5 flex-1 min-h-[24px] my-1 transition-all duration-700"
                        style={{ background: isDone ? '#B5651D' : '#F5F0E8' }}
                      />
                    )}
                  </div>

                  {/* Texto */}
                  <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                    <p
                      className="font-semibold text-sm transition-colors"
                      style={{
                        color: isCurrent ? '#6B7C3A' :
                               isDone    ? '#B5651D' :
                                           '#4A372840'
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      className="text-xs mt-0.5 transition-colors"
                      style={{ color: isPending ? '#4A372830' : '#4A372880' }}
                    >
                      {step.description}
                    </p>
                  </div>

                </div>
              )
            })}
          </div>
        </div>

        {/* Botões — só aparecem quando entregue */}
        {isDelivered && (
          <div className="space-y-3">
            <button
              onClick={() => navigate('/avaliacao')}
              className="w-full text-white py-4 rounded-2xl font-semibold shadow-lg active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
            >
              ⭐ Avaliar Atendimento
            </button>
            <button
              onClick={() => navigate('/cardapio')}
              className="w-full border-2 border-brand-creme text-brand-escuro/60 py-3.5 rounded-2xl font-medium hover:bg-brand-creme/50 transition-colors"
            >
              Fazer Novo Pedido
            </button>
          </div>
        )}

      </main>
    </div>
  )
}