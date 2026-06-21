import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FEEDBACK_TAGS = [
  { id: 'food',     label: '😋 Comida deliciosa' },
  { id: 'fast',     label: '⚡ Atendimento rápido' },
  { id: 'clean',    label: '✨ Ambiente limpo' },
  { id: 'price',    label: '💰 Preço justo' },
  { id: 'portions', label: '🍽️ Porções generosas' },
  { id: 'return',   label: '🔁 Voltarei mais vezes' },
]

const STAR_LABELS: Record<number, string> = {
  1: 'Muito ruim 😞',
  2: 'Ruim 😕',
  3: 'Regular 😐',
  4: 'Bom 😊',
  5: 'Excelente! 🤩',
}

export default function Review() {
  const navigate = useNavigate()

  const [rating, setRating]             = useState(0)
  const [hovered, setHovered]           = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [comment, setComment]           = useState('')
  const [submitted, setSubmitted]       = useState(false)

  function toggleTag(id: string) {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  function handleSubmit() {
    if (rating === 0) return
    setSubmitted(true)
  }

  // ── Tela de sucesso ──
  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2C1A0E 0%, #4A3728 50%, #B5651D 100%)' }}
      >
        <div className="absolute top-10 right-10 text-white/5 text-[160px] font-bold select-none leading-none">✳</div>

        <div className="bg-brand-offwhite rounded-3xl p-10 w-full max-w-sm text-center shadow-2xl relative">
          <div
            className="h-2 w-full absolute top-0 left-0 rounded-t-3xl"
            style={{ background: 'linear-gradient(90deg, #B5651D, #6B7C3A, #B5651D)' }}
          />
          <div className="text-7xl mb-4 mt-2">🙏</div>
          <h1 className="font-display text-brand-escuro text-3xl font-bold mb-2">
            Obrigado!
          </h1>
          <p className="text-brand-escuro/50 text-sm mb-8">
            Sua avaliação nos ajuda a melhorar cada dia mais. Até a próxima!
          </p>
          <button
            onClick={() => navigate('/cardapio')}
            className="w-full text-white py-4 rounded-xl font-semibold active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
          >
            Voltar ao Cardápio
          </button>
        </div>
      </div>
    )
  }

  // ── Tela principal ──
  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col">

      {/* Header */}
      <header
        className="px-6 py-4 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #2C1A0E, #4A3728)' }}
      >
        <button
          onClick={() => navigate('/acompanhamento')}
          className="text-white/60 hover:text-white text-2xl transition-colors"
        >
          ←
        </button>
        <h1 className="font-display text-white text-2xl font-bold">
          Avaliar Experiência
        </h1>
        <span className="ml-auto text-brand-oliva text-2xl">✳</span>
      </header>

      <main className="flex-1 px-4 py-6 space-y-4 max-w-2xl w-full mx-auto">

        {/* Card das estrelas */}
        <div className="bg-white rounded-2xl border border-brand-creme p-6 text-center shadow-sm">
          <p className="text-brand-escuro font-display text-lg font-semibold mb-1">
            Como foi sua experiência?
          </p>
          <p className="text-brand-escuro/40 text-sm mb-6">
            Toque nas estrelas para avaliar
          </p>

          <div className="flex items-center justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <span className={`text-5xl transition-all duration-150 ${
                  star <= (hovered || rating) ? 'opacity-100' : 'opacity-20'
                }`}>
                  ⭐
                </span>
              </button>
            ))}
          </div>

          <p className={`text-sm font-semibold transition-all duration-300 ${
            rating > 0 ? 'opacity-100' : 'opacity-0'
          }`}
            style={{ color: '#B5651D' }}
          >
            {STAR_LABELS[rating] ?? ''}
          </p>
        </div>

        {/* Tags de feedback */}
        <div className="bg-white rounded-2xl border border-brand-creme p-5 shadow-sm">
          <p className="text-brand-escuro font-semibold mb-3">
            O que você achou?
            <span className="text-brand-escuro/40 font-normal text-sm ml-2">(opcional)</span>
          </p>

          <div className="flex flex-wrap gap-2">
            {FEEDBACK_TAGS.map(tag => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all active:scale-95"
                style={selectedTags.includes(tag.id) ? {
                  background: 'linear-gradient(135deg, #B5651D, #4A3728)',
                  color: 'white',
                  borderColor: 'transparent',
                } : {
                  background: 'white',
                  color: '#4A3728',
                  borderColor: '#F2E8D0',
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comentário */}
        <div className="bg-white rounded-2xl border border-brand-creme p-5 shadow-sm">
          <p className="text-brand-escuro font-semibold mb-3">
            Deixe um comentário
            <span className="text-brand-escuro/40 font-normal text-sm ml-2">(opcional)</span>
          </p>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Conte como foi sua visita ao Vinu Caffè..."
            rows={4}
            className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-escuro text-sm placeholder:text-brand-escuro/30 focus:outline-none focus:border-brand-marrom resize-none"
          />
        </div>

      </main>

      {/* Botão enviar */}
      <footer className="bg-white border-t border-brand-creme px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-95"
            style={rating > 0 ? {
              background: 'linear-gradient(135deg, #B5651D, #4A3728)',
              color: 'white',
            } : {
              background: '#F5F0E8',
              color: '#4A372840',
              cursor: 'not-allowed',
            }}
          >
            {rating === 0 ? 'Selecione uma nota para enviar' : 'Enviar Avaliação ⭐'}
          </button>
        </div>
      </footer>

    </div>
  )
}