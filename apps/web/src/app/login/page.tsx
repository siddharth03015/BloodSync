'use client';

import { useState, useEffect } from 'react';
import { supabase } from 'shared';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'register') {
        setIsLogin(false);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    let authError = null;
    let authData = null;

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: formattedPhone,
        password: password,
      });
      authData = data;
      authError = error;
    } else {
      const { data, error } = await supabase.auth.signUp({
        phone: formattedPhone,
        password: password,
      });
      authData = data;
      authError = error;
    }

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else if (authData?.user) {
      const { data: profile } = await supabase
        .from('users')
        .select('id')
        .eq('id', authData.user.id)
        .single();
        
      if (!profile) {
        router.push('/register');
      } else {
        router.push('/profile');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#ffffff] rounded-[4px] p-8 sm:p-10 border border-[#e0e0e0]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#cc0000] rounded-full mb-5">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#333333] mb-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-[#666666] text-sm">
              {isLogin ? 'Sign in with your phone and password' : 'Sign up to become a donor'}
            </p>
          </div>

          {error && (
            <div className="bg-[#fff0f0] border border-[#ffcccc] text-[#cc0000] px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#333333] mb-2">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-[#f4f4f4] border border-r-0 border-[#e0e0e0] text-sm font-bold text-[#666666]">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="flex-1 px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] focus:outline-none focus:border-[#cc0000] text-[#333333] placeholder-[#aaaaaa]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#333333] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] focus:outline-none focus:border-[#cc0000] text-[#333333] placeholder-[#aaaaaa]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-[#cc0000] hover:bg-[#aa0000] text-white rounded-[4px] font-bold text-base transition-colors"
            >
              {loading ? (isLogin ? 'Signing In...' : 'Signing Up...') : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-sm text-[#cc0000] hover:underline"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-[#666666] mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
