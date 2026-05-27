'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ApplyPage() {
  const router = useRouter();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to camera step
    router.push(window.location.pathname + '/camera');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center justify-between gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 px-5 py-6 pb-32 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-[var(--color-toss-text)] leading-snug mb-2">
              이 프로필로 <br/>지원할까요?
            </h1>
            <p className="text-[15px] text-[var(--color-toss-text-sec)]">주최자에게 아래 프로필 정보가 전달됩니다.</p>
          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden shrink-0 mt-2" />
            <div className="text-center">
              <h3 className="font-bold text-[var(--color-toss-text)] text-2xl">김모델</h3>
              <p className="text-[15px] font-medium text-[var(--color-toss-text-sec)] mt-1">24세 · 168cm · 50kg</p>
            </div>
            <button type="button" className="mt-2 text-[15px] font-bold text-[var(--color-toss-blue)] px-4 py-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              프로필 변경
            </button>
          </div>
        </div>

        <div className="fixed bottom-6 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pb-[env(safe-area-inset-bottom)] pointer-events-none">
          <div className="pointer-events-auto">
            <form onSubmit={handleNextStep}>
              <Button type="submit" size="lg" fullWidth className="shadow-lg shadow-blue-500/30">
                네, 이 프로필로 지원할게요
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
