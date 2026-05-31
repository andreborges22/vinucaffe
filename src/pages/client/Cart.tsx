export default function Cart() {
  return (
    <div className="min-h-screen bg-brand-offwhite">
      <header className="bg-brand-cafe px-6 py-4">
        <h1 className="font-display text-brand-creme text-2xl font-bold">
          Meu Carrinho
        </h1>
      </header>

      <main className="px-6 py-6">
        <p className="text-brand-madeira text-center mt-20">
          Seu carrinho está vazio
        </p>
      </main>
    </div>
  )
}