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

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
            const response = await res.json();

            const error = response.errors?.[0];

            if (error === 'Email has already been taken') {
                setError('Este email já está cadastrado.');
            } else {
                setError(error || 'Ocorreu um erro. Tente novamente.');
            }
            return;
        }

        const { token } = await res.json()
        localStorage.setItem('token', token)
        router.push('/profile')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
            <h1 className="text-4xl font-black text-white mb-6">Crie sua conta</h1>
            <form
                onSubmit={handleSignup}
                className="bg-white p-6 rounded-lg shadow-lg w-80"
            >
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Senha:
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Criar Conta
                </button>
            </form>
            <p className="mt-4 text-gray-700 text-center">
                Já tem uma conta?{' '}
                <a href="/login" className="text-blue-800 hover:underline">
                    Faça login
                </a>
            </p>
        </div>
    )
}