export default function Login() {
  return (
    <div className="min-h-screen bg-brand-offwhite flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-sm border border-brand-creme">
        
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-brand-cafe font-bold">
            Vinucaffè
          </h1>
          <p className="text-brand-madeira text-sm mt-1">
            Entre para fazer seu pedido
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-brand-cafe text-sm font-medium block mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full border border-brand-creme rounded-lg px-4 py-3 text-brand-cafe placeholder:text-brand-madeira/50 focus:outline-none focus:border-brand-amber"
            />
          </div>

          <div>
            <label className="text-brand-cafe text-sm font-medium block mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-brand-creme rounded-lg px-4 py-3 text-brand-cafe placeholder:text-brand-madeira/50 focus:outline-none focus:border-brand-amber"
            />
          </div>

          <button className="w-full bg-brand-cafe text-brand-creme py-3 rounded-lg font-medium hover:bg-brand-madeira transition-colors">
            Entrar
          </button>

          <p className="text-center text-brand-madeira text-sm">
            Não tem conta?{" "}
            <span className="text-brand-amber font-medium cursor-pointer hover:underline">
              Cadastre-se
            </span>
          </p>
        </div>

      </div>
    </div>
  )
}