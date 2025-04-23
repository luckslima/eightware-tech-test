'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
            return
        }

        fetch('/api/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async res => {
            if (!res.ok) {
                router.push('/login')
            } else {
                const data = await res.json()
                setUser(data)
            }
        })
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
            <h1 className="text-3xl font-black text-white mb-4 text-center">
                Bem-vindo!
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {user ? (
                    <div className="text-gray-700">
                        <p className="mb-2">
                            <span className="font-medium">Nome:</span> {user.name || 'Usuário'}
                        </p>
                        <p className="mb-2">
                            <span className="font-medium">Email:</span> {user.email}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">Carregando informações...</p>
                )}
            </div>
        </div>
    )
}