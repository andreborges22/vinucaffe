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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/"        element={<Navigate to="/login" />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        {/* Rotas do cliente — qualquer usuário logado */}
        <Route path="/cardapio" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
        <Route path="/carrinho" element={
          <PrivateRoute><Cart /></PrivateRoute>
        } />
        <Route path="/checkout" element={
          <PrivateRoute><Checkout /></PrivateRoute>
        } />
        <Route path="/pedido-confirmado" element={
          <PrivateRoute><OrderConfirmed /></PrivateRoute>
        } />
        <Route path="/acompanhamento" element={
          <PrivateRoute><OrderTracking /></PrivateRoute>
        } />
        <Route path="/avaliacao" element={
          <PrivateRoute><Review /></PrivateRoute>
        } />

        {/* Rotas do admin — só perfil admin */}
        <Route path="/admin" element={
          <RoleRoute allowedRoles={['admin']}>
            <Dashboard />
          </RoleRoute>
        } />

        {/* Rota do funcionário — será criada na próxima etapa */}
        <Route path="/funcionario" element={
          <RoleRoute allowedRoles={['employee', 'admin']}>
            <Dashboard />
          </RoleRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}