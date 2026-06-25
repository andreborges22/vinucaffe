import type { AuthUser } from '../store/auth.store'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

interface AuthResponse {
  user: AuthUser
}

async function parseResponse(response: Response): Promise<AuthResponse> {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const detail = data.detail ?? Object.values(data).flat().join(' ')
    throw new Error(detail || 'Não foi possível concluir a autenticação.')
  }

  return data as AuthResponse
}

export async function loginCliente(email: string, password: string): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await parseResponse(response)
  return data.user
}

export async function registerCliente(input: {
  name: string
  phone: string
  email: string
  password: string
}): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: input.name,
      celular: input.phone,
      email: input.email,
      senha: input.password,
    }),
  })

  const data = await parseResponse(response)
  return data.user
}

export async function loginGoogle(credential: string): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/google/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential }),
  })

  const data = await parseResponse(response)
  return data.user
}
