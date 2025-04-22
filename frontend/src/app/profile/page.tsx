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

        fetch('http://localhost:4567/users/me', {
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
        <div>
            <h1>Bem-vindo!</h1>
        </div>
    )
}