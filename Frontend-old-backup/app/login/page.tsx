'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Github } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/github';
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-display font-bold mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-400">
            Sign in to continue your streak
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="btn-primary w-full text-lg py-4"
        >
          <Github className="inline-block mr-2 h-6 w-6" />
          Continue with GitHub
        </button>

        <p className="text-sm text-gray-500">
          By signing in, you agree to sync your GitHub activity
        </p>
      </div>
    </div>
  );
}
