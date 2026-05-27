'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleRoleSelect = (role: 'organizer' | 'model' | 'md') => {
    // In a real app, we would save this to state/context and proceed to login/signup
    if (role === 'organizer') {
      router.push('/organizer/dashboard');
    } else if (role === 'md') {
      router.push('/md/models');
    } else {
      router.push('/model/jobs');
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-5 py-8 bg-[var(--color-toss-bg)]">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-toss-text)] mb-3 leading-snug">
            어떤 역할로 <br/>시작할까요?
          </h1>
          <p className="text-[15px] text-[var(--color-toss-text-sec)]">saozi에서 파티/행사 알바를 쉽고 빠르게 매칭해 보세요.</p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => handleRoleSelect('organizer')}
            className="flex items-center p-6 bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:scale-[0.98] transition-transform text-left border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-50 text-[var(--color-toss-blue)] rounded-full flex items-center justify-center mr-4 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-toss-text)]">파티 주최자</h2>
              <p className="text-sm text-[var(--color-toss-text-sec)] mt-1">모델이 필요하신가요? 공고를 올려보세요.</p>
            </div>
          </button>

          <button 
            onClick={() => handleRoleSelect('model')}
            className="flex items-center p-6 bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:scale-[0.98] transition-transform text-left border border-gray-100"
          >
            <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mr-4 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Z"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-toss-text)]">모델 지원자</h2>
              <p className="text-sm text-[var(--color-toss-text-sec)] mt-1">현장 인증으로 바로 알바에 지원해 보세요.</p>
            </div>
          </button>

          <button 
            onClick={() => handleRoleSelect('md')}
            className="flex items-center p-6 bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:scale-[0.98] transition-transform text-left border border-gray-100"
          >
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mr-4 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-toss-text)]">에이전시 (MD)</h2>
              <p className="text-sm text-[var(--color-toss-text-sec)] mt-1">소속 모델들을 관리하고 대신 지원해 주세요.</p>
            </div>
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center pb-safe">
        <p className="text-xs text-[var(--color-toss-text-sec)]">이미 계정이 있으신가요? <button className="font-bold text-[var(--color-toss-blue)] hover:underline ml-1">로그인하기</button></p>
      </div>
    </div>
  );
}
