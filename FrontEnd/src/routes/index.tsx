import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RoleRoute    from './RoleRoute'

import Login          from '../pages/auth/Login'
import Register       from '../pages/auth/Register'
import Home           from '../pages/client/Home'
import Cart           from '../pages/client/Cart'
import Checkout       from '../pages/client/Checkout'
import OrderConfirmed from '../pages/client/OrderConfirmed'
import OrderTracking  from '../pages/client/OrderTracking'
import Review         from '../pages/client/Review'
import Dashboard      from '../pages/admin/Dashboard'
import OrderQueue     from '../pages/employee/OrderQueue'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz → vai direto pro cardápio (QR Code da mesa) */}
        <Route path="/" element={<Navigate to="/cardapio" />} />

        {/* Autenticação */}
        <Route path="/login"    element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        {/* ── Rotas PÚBLICAS do cliente ── */}
        {/* Cliente navega, monta carrinho e vê checkout sem precisar logar */}
        <Route path="/cardapio" element={<Home />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Rotas que exigem login */}
        {/* Confirmação básica — todo cliente recebe, c/ ou sem login */}
        <Route path="/pedido-confirmado" element={<OrderConfirmed />} />

        {/* Exclusivo de quem tem conta */}
        <Route path="/acompanhamento" element={
          <PrivateRoute><OrderTracking /></PrivateRoute>
        } />
        <Route path="/avaliacao" element={
          <PrivateRoute><Review /></PrivateRoute>
        } />

        {/* Rota do funcionário */}
        <Route path="/funcionario" element={
          <RoleRoute allowedRoles={['employee', 'admin']}>
            <OrderQueue />
          </RoleRoute>
        } />

        {/* Rota do admin */}
        <Route path="/admin" element={
          <RoleRoute allowedRoles={['admin']}>
            <Dashboard />
          </RoleRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}