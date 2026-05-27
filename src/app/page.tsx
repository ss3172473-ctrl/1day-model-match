'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'ORGANIZER' | 'MODEL' | 'MD'>('MODEL');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase Auth Login
    // For MVP frontend demo, just route based on role
    if (role === 'ORGANIZER') {
      router.push('/jobs');
    } else {
      router.push('/jobs');
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-5 py-10 bg-[var(--color-toss-bg)]">
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--color-toss-text)] mb-2">saozi</h1>
          <p className="text-[var(--color-toss-text-sec)]">파티/행사 당일 알바 매칭</p>
        </div>

        <Card className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[var(--color-toss-text)]">어떤 역할로 시작할까요?</span>
            <div className="grid grid-cols-3 gap-2">
              {(['ORGANIZER', 'MODEL', 'MD'] as const).map((r) => (
                <div
                  key={r}
                  onClick={() => setRole(r)}
                  className={`p-3 text-center rounded-xl font-medium text-sm cursor-pointer transition-colors border-2 ${
                    role === r 
                      ? 'border-[var(--color-toss-blue)] bg-blue-50 text-[var(--color-toss-blue)]' 
                      : 'border-transparent bg-[var(--color-toss-bg)] text-[var(--color-toss-text-sec)]'
                  }`}
                >
                  {r === 'ORGANIZER' ? '주최자' : r === 'MODEL' ? '모델' : 'MD'}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="이메일" 
                className="w-full p-4 rounded-xl bg-[var(--color-toss-bg)] border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)] text-[var(--color-toss-text)] placeholder-[var(--color-toss-text-sec)]"
                required 
              />
              <input 
                type="password" 
                placeholder="비밀번호" 
                className="w-full p-4 rounded-xl bg-[var(--color-toss-bg)] border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)] text-[var(--color-toss-text)] placeholder-[var(--color-toss-text-sec)]"
                required 
              />
            </div>
            
            <Button type="submit" size="lg" fullWidth>
              시작하기
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
