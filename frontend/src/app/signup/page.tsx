'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const res = await fetch('http://localhost:4567/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
            const { error } = await res.json()
            setError(error || 'Erro ao criar conta')
            return
        }

        const { token } = await res.json()
        localStorage.setItem('token', token)
        router.push('/profile')
    }

    return (
        <div>
            <h1>Criação de Conta</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Criar Conta</button>
            </form>
        </div>
    )
}