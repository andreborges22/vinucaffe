import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Tags de feedback rápido — cliente clica nas que se aplicam
const FEEDBACK_TAGS = [
  { id: 'food',     label: '😋 Comida deliciosa' },
  { id: 'fast',     label: '⚡ Atendimento rápido' },
  { id: 'clean',    label: '✨ Ambiente limpo' },
  { id: 'price',    label: '💰 Preço justo' },
  { id: 'portions', label: '🍽️ Porções generosas' },
  { id: 'return',   label: '🔁 Voltarei mais vezes' },
]

// Texto que aparece embaixo das estrelas conforme a nota
const STAR_LABELS: Record<number, string> = {
  1: 'Muito ruim 😞',
  2: 'Ruim 😕',
  3: 'Regular 😐',
  4: 'Bom 😊',
  5: 'Excelente! 🤩',
}

export default function Review() {
  const navigate = useNavigate()

  const [rating, setRating]           = useState(0)      // Estrela selecionada
  const [hovered, setHovered]         = useState(0)      // Estrela com hover
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [comment, setComment]         = useState('')
  const [submitted, setSubmitted]     = useState(false)  // Controla tela de sucesso

  // Alterna a tag — se já estava selecionada, remove; senão, adiciona
  function toggleTag(id: string) {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  // Simula o envio — depois chamará a API real
  function handleSubmit() {
    if (rating === 0) return // Obriga pelo menos 1 estrela
    setSubmitted(true)
  }

  // ─── Tela de sucesso após enviar ───────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 w-full max-w-sm text-center border border-brand-creme shadow-sm">

          <div className="text-7xl mb-4">🙏</div>

          <h1 className="font-display text-brand-cafe text-3xl font-bold mb-2">
            Obrigado!
          </h1>
          <p className="text-brand-madeira/70 text-sm mb-8">
            Sua avaliação nos ajuda a melhorar cada dia mais. Até a próxima!
          </p>

          <button
            onClick={() => navigate('/cardapio')}
            className="w-full bg-brand-cafe text-brand-creme py-4 rounded-xl font-semibold hover:bg-brand-madeira transition-colors"
          >
            Voltar ao Cardápio
          </button>
        </div>
      </div>
    )
  }

  // ─── Tela principal de avaliação ───────────────────────────────
  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col">

      {/* Header */}
      <header className="bg-brand-cafe px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/acompanhamento')}
          className="text-brand-creme/70 hover:text-brand-creme text-2xl transition-colors"
        >
          ←
        </button>
        <h1 className="font-display text-brand-creme text-2xl font-bold">
          Avaliar Experiência
        </h1>
      </header>

      <main className="flex-1 px-6 py-6 space-y-6">

        {/* Card das estrelas */}
        <div className="bg-white rounded-2xl border border-brand-creme p-6 text-center">
          <p className="text-brand-cafe font-display text-lg font-semibold mb-1">
            Como foi sua experiência?
          </p>
          <p className="text-brand-madeira/60 text-sm mb-6">
            Toque nas estrelas para avaliar
          </p>

          {/* Estrelas interativas */}
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
                  star <= (hovered || rating)
                    ? 'opacity-100'       // Estrela preenchida
                    : 'opacity-25'        // Estrela apagada
                }`}>
                  ⭐
                </span>
              </button>
            ))}
          </div>

          {/* Label da nota */}
          <p className={`text-sm font-medium transition-all duration-300 ${
            rating > 0 ? 'text-brand-amber opacity-100' : 'opacity-0'
          }`}>
            {STAR_LABELS[rating] ?? ''}
          </p>
        </div>

        {/* Tags de feedback rápido */}
        <div className="bg-white rounded-2xl border border-brand-creme p-5">
          <p className="text-brand-cafe font-semibold mb-3">
            O que você achou?
            <span className="text-brand-madeira/50 font-normal text-sm ml-2">
              (opcional)
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            {FEEDBACK_TAGS.map(tag => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  selectedTags.includes(tag.id)
                    ? 'bg-brand-cafe text-brand-creme border-brand-cafe'
                    : 'bg-white text-brand-madeira border-brand-creme hover:border-brand-amber/50'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comentário livre */}
        <div className="bg-white rounded-2xl border border-brand-creme p-5">
          <p className="text-brand-cafe font-semibold mb-3">
            Deixe um comentário
            <span className="text-brand-madeira/50 font-normal text-sm ml-2">
              (opcional)
            </span>
          </p>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Conte como foi sua visita ao Vinu Caffè..."
            rows={4}
            className="w-full border border-brand-creme rounded-xl px-4 py-3 text-brand-cafe text-sm placeholder:text-brand-madeira/40 focus:outline-none focus:border-brand-amber resize-none"
          />
        </div>

      </main>

      {/* Botão enviar */}
      <footer className="bg-white border-t border-brand-creme px-6 py-5">
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-4 rounded-xl font-semibold text-base transition-all ${
            rating > 0
              ? 'bg-brand-cafe text-brand-creme hover:bg-brand-madeira active:scale-95'
              : 'bg-brand-creme text-brand-madeira/40 cursor-not-allowed'
          }`}
        >
          {rating === 0 ? 'Selecione uma nota para enviar' : 'Enviar Avaliação ⭐'}
        </button>
      </footer>

    </div>
  )
}