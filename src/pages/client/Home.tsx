export default function Home() {
  return (
    <div className="min-h-screen bg-brand-offwhite">
      <header className="bg-brand-cafe px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-brand-creme text-2xl font-bold">
          Vinu Caffè
        </h1>
        <span className="bg-brand-amber text-brand-cafe text-xs font-medium px-3 py-1 rounded-full">
          Mesa 05
        </span>
      </header>

      <main className="px-6 py-6">
        <p className="text-brand-cafe text-xl font-display font-semibold mb-4">
          O que vai querer hoje?
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Cappuccino", price: 12.90, emoji: "☕" },
            { name: "Croissant", price: 8.90, emoji: "🥐" },
            { name: "Salada Verde", price: 24.90, emoji: "🥗" },
            { name: "Suco Natural", price: 10.90, emoji: "🧃" },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-4 border border-brand-creme"
            >
              <div className="bg-brand-offwhite rounded-xl h-20 flex items-center justify-center text-4xl mb-3">
                {item.emoji}
              </div>
              <p className="text-brand-cafe font-medium text-sm">{item.name}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-brand-amber font-semibold">
                  R$ {item.price.toFixed(2)}
                </span>
                <button className="bg-brand-cafe text-brand-creme w-7 h-7 rounded-lg text-lg flex items-center justify-center hover:bg-brand-madeira transition-colors">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}