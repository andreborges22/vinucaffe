import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../pages/client/Home'
import Cart from '../pages/client/Cart'
import Checkout from '../pages/client/Checkout'
import OrderTracking  from '../pages/client/OrderTracking'
import OrderConfirmed from '../pages/client/OrderConfirmed'
import Dashboard from '../pages/admin/Dashboard'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        <Route path="/cardapio" element={<Home />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pedido-confirmado" element={<OrderConfirmed />} />
        <Route path="/acompanhamento" element={<OrderTracking />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}