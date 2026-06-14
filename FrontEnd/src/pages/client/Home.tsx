import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cart.store'
import { useAuthStore } from '../../store/auth.store'
import { Product } from '../../types'
import ProductModal from '../../components/ProductModal'

const categories = [
  { id: 'cafes',      label: 'Cafés' },
  { id: 'gelados',    label: 'Cafés Gelados' },
  { id: 'combos',     label: 'Combos' },
  { id: 'bebidas',    label: 'Bebidas' },
  { id: 'entradas',   label: 'Entradas' },
  { id: 'refeicoes',  label: 'Refeições' },
  { id: 'crepes',     label: 'Crepes' },
  { id: 'sanduiches', label: 'Sanduíches' },
  { id: 'sobremesas', label: 'Sobremesas' },
  { id: 'bolos',      label: 'Bolos e Tortas' },
  { id: 'adicional',  label: 'Adicionais' },
]

const products: Product[] = [
  { id: 1,  name: 'Café Coado Tradicional', description: 'Café coado fresquinho', price: 5.00,  category: 'cafes' },
  { id: 2,  name: 'Café Espresso',          description: '50ml de puro café',      price: 6.00,  category: 'cafes' },
  { id: 3,  name: 'Café Espresso Duplo',    description: 'Dose dupla de espresso', price: 12.00, category: 'cafes' },
  { id: 4,  name: 'Machiatto',              description: 'Espresso com toque de leite', price: 6.50, category: 'cafes' },
  { id: 5,  name: 'Latte',                  description: 'Café com leite vaporizado', price: 12.00, category: 'cafes' },
  { id: 6,  name: 'Cappuccino Cremoso',     description: 'Cremoso e aromático',    price: 14.00, category: 'cafes' },
  { id: 7,  name: 'Cappuccino Italiano',    description: 'Receita italiana clássica', price: 14.00, category: 'cafes' },
  { id: 8,  name: 'Moccaccino',             description: 'Café com chocolate',     price: 10.00, category: 'cafes' },
  { id: 9,  name: 'Chocolate Cremoso',      description: 'Chocolate quente cremoso', price: 17.00, category: 'cafes' },
  { id: 10, name: 'Café Conexão',           description: 'Espresso com Chantilly e creme de Avelã', price: 16.00, category: 'cafes' },
  { id: 11, name: 'Chá Tradicional',        description: 'Chá selecionado',        price: 5.00,  category: 'cafes' },
  { id: 12, name: 'Coffee Shake de Avelã',      description: 'Café gelado com avelã',      price: 22.00, category: 'gelados' },
  { id: 13, name: 'Coffee Shake de Ovomaltine', description: 'Café gelado com ovomaltine', price: 22.00, category: 'gelados' },
  { id: 14, name: 'Affogato',                   description: 'Espresso com sorvete',       price: 22.00, category: 'gelados' },
  { id: 15, name: 'Pão de Forma com Ovo, Bacon e Café', description: 'Combo completo para o dia', price: 18.00, category: 'combos' },
  { id: 16, name: 'Bolo Tradicional e Café',            description: 'Fatia de bolo + café',      price: 16.00, category: 'combos' },
  { id: 17, name: 'Cuscuz com Ovo e Café',              description: 'Manteiga opcional',         price: 20.00, category: 'combos' },
  { id: 18, name: 'Refrigerante 200ml',    description: 'Gelado e refrescante',    price: 5.00,  category: 'bebidas' },
  { id: 19, name: 'Refrigerante 350ml',    description: 'Gelado e refrescante',    price: 7.00,  category: 'bebidas' },
  { id: 20, name: 'Água Mineral 500ml',    description: 'Água gelada',             price: 4.00,  category: 'bebidas' },
  { id: 21, name: 'Água com Gás 500ml',    description: 'Água gaseificada gelada', price: 5.00,  category: 'bebidas' },
  { id: 22, name: 'Suco de Laranja 300ml', description: 'Suco natural de laranja', price: 12.00, category: 'bebidas' },
  { id: 23, name: 'Suco Detox',            description: 'Suco detox natural',      price: 15.00, category: 'bebidas' },
  { id: 24, name: 'Suco de Morango',       description: 'Suco natural de morango', price: 14.00, category: 'bebidas' },
  { id: 25, name: 'Vitamina de Frutas',    description: 'Vitamina cremosa',        price: 14.00, category: 'bebidas' },
  { id: 26, name: 'Cerveja 330ml',         description: 'Gelada',                  price: 15.00, category: 'bebidas' },
  { id: 27, name: 'Focaccia',              description: 'Pão italiano artesanal',  price: 30.00, category: 'entradas' },
  { id: 28, name: 'Caldo Verde / Bacon',   description: '300ml, quentinho',        price: 25.00, category: 'entradas' },
  { id: 29, name: 'Filé de Frango',               description: 'Com arroz açafrão, integral e mix de folhas', price: 45.00, category: 'refeicoes' },
  { id: 30, name: 'Filé Mignon ao Molho Madeira', description: 'Com arroz branco e purê de batata',          price: 79.00, category: 'refeicoes' },
  { id: 31, name: 'Salada ao Molho da Casa',       description: 'Com croutons e grão de bico',               price: 35.00, category: 'refeicoes' },
  { id: 32, name: 'Moqueca Vegana',                description: 'Banana da terra, cenoura, abobrinha',       price: 45.00, category: 'refeicoes' },
  { id: 33, name: 'Penne com Ragú de Linguiça',    description: 'Massa ao molho especial',                   price: 45.00, category: 'refeicoes' },
  { id: 34, name: 'Fettuccine Camarão',            description: 'Ao molho branco',                           price: 65.00, category: 'refeicoes' },
  { id: 35, name: 'Fettuccine à Bolonhesa',        description: 'Clássico italiano',                         price: 45.00, category: 'refeicoes' },
  { id: 36, name: 'Moqueca de Camarão',            description: 'Com arroz, pirão e farofa — toda sexta',    price: 55.00, category: 'refeicoes' },
  { id: 37, name: 'Strogonoff',                    description: 'Com arroz branco e batatas',                price: 59.00, category: 'refeicoes' },
  { id: 38, name: 'Cuscuz Recheado',               description: 'Carne seca e banana da terra ou frango',    price: 30.00, category: 'refeicoes' },
  { id: 39, name: 'Crepe Marguerita',    description: 'Queijo, tomate, manjericão e orégano', price: 40.00, category: 'crepes' },
  { id: 40, name: 'Crepe Calabresa',     description: 'Queijo, calabresa, tomate e orégano',  price: 40.00, category: 'crepes' },
  { id: 41, name: 'Crepe Frango',        description: 'Queijo, frango desfiado e milho',      price: 40.00, category: 'crepes' },
  { id: 42, name: 'Crepe Carne Seca',    description: 'Queijo, carne seca e banana da terra', price: 40.00, category: 'crepes' },
  { id: 43, name: 'Crepe Carne de Jaca', description: 'Queijo e carne de jaca',               price: 55.00, category: 'crepes' },
  { id: 44, name: 'Crepe Camarão',       description: 'Queijo, camarão e molho branco',       price: 55.00, category: 'crepes' },
  { id: 45, name: 'Crepe Doce',          description: 'Brigadeiro Romeu e Julieta',           price: 20.00, category: 'crepes' },
  { id: 46, name: 'Misto',               description: 'Clássico e gostoso',                   price: 16.00, category: 'sanduiches' },
  { id: 47, name: 'Misto Sem Glúten',    description: 'Pão sem glúten',                       price: 18.00, category: 'sanduiches' },
  { id: 48, name: 'Sanduíche Natural',   description: 'Frango ou atum',                       price: 15.00, category: 'sanduiches' },
  { id: 49, name: 'Toast',               description: 'Carne de panela, frango ou queijo',    price: 25.00, category: 'sanduiches' },
  { id: 50, name: 'Pão de Queijo Minas', description: 'Porção com 6 unidades',                price: 18.00, category: 'sanduiches' },
  { id: 51, name: 'Coxinha',             description: 'Porção com 6 unidades',                price: 22.00, category: 'sanduiches' },
  { id: 52, name: 'Kibe',                description: 'Porção com 6 unidades',                price: 22.00, category: 'sanduiches' },
  { id: 53, name: 'Mousse de Maracujá',  description: 'Cremoso e refrescante',               price: 14.00, category: 'sobremesas' },
  { id: 54, name: 'Brigadeiro',          description: 'Caseiro e irresistível',              price: 4.00,  category: 'sobremesas' },
  { id: 55, name: 'Brownie',             description: 'Quentinho e fudgy',                   price: 10.00, category: 'sobremesas' },
  { id: 56, name: 'Brownie de Pote',     description: 'Brownie cremoso no pote',             price: 14.00, category: 'sobremesas' },
  { id: 57, name: 'Banoffe de Pote',     description: 'Banana, doce de leite e chantilly',  price: 16.00, category: 'sobremesas' },
  { id: 58, name: 'Cheese Cake de Pote', description: 'Cremoso com calda',                  price: 16.00, category: 'sobremesas' },
  { id: 59, name: 'Torta de Limão de Pote',   description: 'Azedinha e cremosa', price: 16.00, category: 'bolos' },
  { id: 60, name: 'Fatia de Torta Doce',      description: 'Sabores variados',   price: 25.00, category: 'bolos' },
  { id: 61, name: 'Mini Bolo Diversos',        description: 'Sabores do dia',    price: 20.00, category: 'bolos' },
  { id: 62, name: 'Fatia de Bolo Tradicional', description: 'Com cobertura',     price: 14.00, category: 'bolos' },
  { id: 63, name: 'Pirão 100g',             description: 'Acompanhamento', price: 12.00, category: 'adicional' },
  { id: 64, name: 'Farofa 100g',            description: 'Acompanhamento', price: 12.00, category: 'adicional' },
  { id: 65, name: 'Ovo Frito / Mexido',     description: 'Fresquinho',     price: 5.00,  category: 'adicional' },
  { id: 66, name: 'Arroz 150g',             description: 'Acompanhamento', price: 10.00, category: 'adicional' },
  { id: 67, name: 'Porção Extra de Queijo', description: 'Queijo extra',   price: 10.00, category: 'adicional' },
]

export default function Home() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('cafes')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { addItem, totalItems, total } = useCartStore()
  const { user, logout } = useAuthStore()
  const cartCount = totalItems()
  const cartTotal = total()

  const filtered = products.filter(p => {
    const inCategory = p.category === activeCategory
    const inSearch   = p.name.toLowerCase().includes(search.toLowerCase())
    return inCategory && (search === '' ? true : inSearch)
  })

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-brand-offwhite pb-32">

      {/* ── BANNER DO RESTAURANTE ── */}
      <div
        className="h-36 relative"
        style={{ background: 'linear-gradient(135deg, #2C1A0E 0%, #4A3728 50%, #B5651D 100%)' }}
      >
        {/* Botão de usuário no canto superior direito do banner */}
        <div className="absolute top-4 right-4 z-10">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-xs hidden sm:block">
                Olá, {user.name.split(' ')[0]}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 transition-colors"
            >
              Entrar
            </button>
          )}
        </div>

        <div className="absolute -right-6 -top-10 text-white/5 text-[160px] font-bold select-none leading-none">
          ✳
        </div>
      </div>

      {/* ── CARTÃO DA LOJA ── */}
      <div className="max-w-2xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 border border-brand-creme">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ background: 'linear-gradient(135deg, #4A3728, #B5651D)' }}
          >
            <span className="text-white font-display text-2xl font-bold">V</span>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-display text-brand-escuro text-xl font-bold leading-tight">
              Vinucaffè
            </h1>
            <p className="text-brand-escuro/50 text-xs mt-0.5">
              ✳ Café · Negócios · Propósito
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="bg-brand-oliva/10 text-brand-oliva text-xs font-semibold px-2 py-0.5 rounded-full">
                ● Aberto agora
              </span>
            </div>
          </div>

          <span className="bg-brand-creme text-brand-escuro text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
            Mesa 05
          </span>
        </div>
      </div>

      {/* ── BUSCA ── */}
      <div className="max-w-2xl mx-auto px-4 mt-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-escuro/30">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar no cardápio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-brand-creme rounded-xl pl-11 pr-4 py-3 text-sm text-brand-escuro placeholder:text-brand-escuro/30 focus:outline-none focus:border-brand-marrom shadow-sm"
          />
        </div>
      </div>

      {/* ── CATEGORIAS ── */}
      <div className="bg-brand-offwhite sticky top-0 z-20 mt-4 pt-2 pb-1 border-b border-brand-creme/60">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearch('') }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 border
                  ${activeCategory === cat.id
                    ? 'text-white border-transparent shadow-md'
                    : 'bg-white text-brand-escuro/60 border-brand-creme hover:border-brand-marrom/40'
                  }`}
                style={activeCategory === cat.id
                  ? { background: 'linear-gradient(135deg, #B5651D, #4A3728)' }
                  : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── LISTA DE PRODUTOS ── */}
      <main className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-brand-escuro text-2xl font-bold">
            {search !== ''
              ? `Resultados para "${search}"`
              : categories.find(c => c.id === activeCategory)?.label
            }
          </h2>
          <span className="text-brand-escuro/40 text-sm">
            {filtered.length} {filtered.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-brand-escuro/40">Nenhum item encontrado.</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {filtered.map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-brand-creme/80 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99]"
            >
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ background: 'linear-gradient(135deg, #F5F0E8, #EDE5D0)' }}
              >
                ☕
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-brand-escuro font-semibold text-sm leading-snug">
                  {product.name}
                </p>
                <p className="text-brand-escuro/50 text-xs mt-0.5 leading-snug line-clamp-2">
                  {product.description}
                </p>
                <p className="text-brand-marrom font-bold text-base mt-1.5">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <div
                className="w-10 h-10 text-white rounded-xl text-xl flex items-center justify-center flex-shrink-0 shadow-md"
                style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
              >
                +
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── CARRINHO FLUTUANTE ── */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-40 max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/carrinho')}
            className="w-full text-white py-4 rounded-2xl shadow-xl flex items-center justify-between px-5 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #B5651D, #4A3728)' }}
          >
            <span className="bg-white/20 text-white text-sm font-bold w-7 h-7 rounded-lg flex items-center justify-center">
              {cartCount}
            </span>
            <span className="font-semibold text-sm">Ver carrinho</span>
            <span className="font-bold text-sm">
              R$ {cartTotal.toFixed(2).replace('.', ',')}
            </span>
          </button>
        </div>
      )}

      {/* ── MODAL DE PRODUTO ── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, quantity, notes) => addItem(product, quantity, notes)}
        />
      )}

    </div>
  )
}