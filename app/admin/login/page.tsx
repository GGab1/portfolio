'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        const res = await fetch('/api/admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        })

        if (res.ok) {
            router.push('/admin/space')
        } else {
            setError('Mot de passe incorrect.')
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center text-white p-4">
            <form
            onSubmit={handleSubmit}
            className="bg-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-sm border border-white/20"
            >
            <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">Connexion Admin</h1>

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/20 text-white mb-4 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="••••••••"
            />

            {error && <p className="text-red-400 mb-4 text-sm text-center">{error}</p>}

            <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all"
            >
                Se connecter
            </button>
            </form>
        </div>
    )

}
