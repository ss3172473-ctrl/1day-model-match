'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'organizer' | 'model' | 'md'>('model');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert('로그인 실패: ' + error.message);
        setLoading(false);
        return;
      }
      
      // Fetch role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single();
        if (userData?.role === 'organizer') router.push('/organizer/dashboard');
        else if (userData?.role === 'md') router.push('/md/models');
        else router.push('/model/jobs');
      }
    } else {
      // Signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        alert('회원가입 실패: ' + error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Insert role into public.users
        await supabase.from('users').insert({
          id: data.user.id,
          email: email,
          role: role
        });
        alert('회원가입 성공! 로그인해주세요.');
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)] items-center justify-center p-5">
      <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-[var(--color-toss-blue)]">Saozi</h1>
        
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-2 mb-2">
              <label className="text-sm font-bold text-gray-700">가입할 역할 선택</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setRole('model')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${role === 'model' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>모델</button>
                <button type="button" onClick={() => setRole('organizer')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${role === 'organizer' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>주최자</button>
                <button type="button" onClick={() => setRole('md')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${role === 'md' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>MD</button>
              </div>
            </div>
          )}

          <input 
            type="email" 
            placeholder="이메일" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)]" 
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)]" 
          />

          <Button type="submit" size="lg" disabled={loading} className="mt-4">
            {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-[14px] text-gray-500 font-medium hover:text-[var(--color-toss-blue)] transition-colors"
          >
            {isLogin ? '계정이 없으신가요? 회원가입하기' : '이미 계정이 있으신가요? 로그인하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
