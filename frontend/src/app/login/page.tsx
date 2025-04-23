'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null);

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
            const { error } = await res.json();

            if (error === 'Invalid email or password') {
                setError('Email ou senha inválidos.');
            } else {
                setError(error || 'Ocorreu um erro. Tente novamente.');
            }
            return;
        }

        const data = await res.json();
        localStorage.setItem('token', data.token);
        router.push('/profile');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
            <h1 className="text-4xl font-black text-white mb-6 ">Faça Login</h1>
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-lg w-80"
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-700"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-700"
                />
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Entrar
                </button>
            </form>
            <p className="mt-4 text-gray-700 text-center">
                Não tem uma conta?{' '}
                <Link href="/signup" className="text-blue-800 hover:underline">
                    Registre-se
                </Link>
            </p>
        </div>
    );
}