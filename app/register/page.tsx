'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Automatically log the user in by redirecting to home or dashboard
            // The API already sets the session cookie upon registration
            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-slide-up">
                {/* Header with gradient */}
                <div className="p-8 pb-4">
                    <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue mb-2">
                        Create Account
                    </h1>
                    <p className="text-center text-text-secondary">
                        Join the AI Media Planner platform
                    </p>
                </div>

                <div className="p-8 pt-4">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-surface-light border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none transition-all placeholder-white/20 text-white"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-surface-light border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none transition-all placeholder-white/20 text-white"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 bg-surface-light border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none transition-all placeholder-white/20 text-white"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-gradient-from to-gradient-to text-white font-semibold hover:opacity-90 transition-opacity focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-[#1a0f2e] disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-purple-500/20"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-text-secondary">
                        Already have an account?{' '}
                        <Link href="/login" className="text-accent-blue hover:text-accent-purple transition-colors font-medium">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
