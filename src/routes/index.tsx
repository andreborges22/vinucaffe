import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../pages/client/Home'
import Cart from '../pages/client/Cart'
import Dashboard from '../pages/admin/Dashboard'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rota raiz — redireciona para o login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        {/* Rotas do cliente */}
        <Route path="/cardapio" element={<Home />} />
        <Route path="/carrinho" element={<Cart />} />

        {/* Rotas do admin */}
        <Route path="/admin" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}