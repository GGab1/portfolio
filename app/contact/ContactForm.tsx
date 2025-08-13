'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.currentTarget;
        const formData = {
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                form.reset();
            } else throw new Error();
        } catch (err) {
            setStatus('error');
            console.log('Error :', err)
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-5xl">👇</span>
                <h2 className="text-3xl font-bold text-center">Contactez-moi</h2>
                <span className="text-5xl transform -scale-x-100">👇</span>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <label className="flex flex-col gap-1 w-full">
                    <span className="text-sm">Adresse e-mail</span>
                    <input
                        type="email"
                        name="email"
                        className="w-full rounded-lg bg-white/20 border border-white px-4 py-2 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="votre@email.com"
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 w-full">
                    <span className="text-sm">Sujet</span>
                    <input
                        type="text"
                        name="subject"
                        className="w-full rounded-lg bg-white/20 border border-white px-4 py-2 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="Sujet de votre message"
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 w-full">
                    <span className="text-sm">Message</span>
                    <textarea
                        name="message"
                        className="w-full rounded-lg bg-white/20 border border-white px-4 py-2 h-[225px] resize-none placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="Votre message..."
                        required
                    />
                </label>

                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-white/90 transition"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Envoi...' : 'Envoyer'}
                    </button>
                </div>

                {status === 'success' && (
                    <p className="text-center text-green-400 mt-2">Message envoyé avec succès !</p>
                )}
                {status === 'error' && (
                    <p className="text-center text-red-400 mt-2">Erreur lors de l’envoi.</p>
                )}
            </form>
        </div>
    );
}
