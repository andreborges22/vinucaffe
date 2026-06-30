import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginGoogle } from '../services/authApi'
import { useAuthStore } from '../store/auth.store'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const ROLE_REDIRECT = {
  client: '/cardapio',
  employee: '/funcionario',
  admin: '/admin',
}

interface Props {
  onError: (message: string) => void
}

export default function GoogleLoginButton({ onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return
    if (window.google?.accounts?.id) {
      setScriptReady(true)
      return
    }

    const existing = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]')
    if (existing) {
      existing.addEventListener('load', () => setScriptReady(true), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => setScriptReady(true)
    script.onerror = () => onError('Não foi possível carregar o login do Google.')
    document.head.appendChild(script)
  }, [onError])

  useEffect(() => {
    if (!scriptReady || !GOOGLE_CLIENT_ID || !containerRef.current || !window.google?.accounts?.id) return

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async ({ credential }) => {
        if (!credential) {
          onError('O Google não retornou uma credencial válida.')
          return
        }

        try {
          const user = await loginGoogle(credential)
          login(user)
          navigate(ROLE_REDIRECT[user.role])
        } catch (err) {
          onError(err instanceof Error ? err.message : 'Não foi possível entrar com Google.')
        }
      },
    })

    containerRef.current.innerHTML = ''
    window.google.accounts.id.renderButton(containerRef.current, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'pill',
      width: 320,
    })
  }, [login, navigate, onError, scriptReady])

  if (!GOOGLE_CLIENT_ID) {
    return (
      <p className="text-center text-brand-escuro/40 text-xs leading-relaxed">
        Login com Google aguardando configuração.
      </p>
    )
  }

  return <div ref={containerRef} className="flex justify-center" />
}
