'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('프로필이 저장되었습니다.');
    router.back();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-toss-text)]">프로필 관리</h1>
      </div>

      <div className="flex-1 px-5 py-2 pb-24">
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--color-toss-text)]">활동명 (이름)</label>
            <input required type="text" defaultValue="김모델" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-semibold text-[var(--color-toss-text)]">나이</label>
              <input required type="number" defaultValue="24" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-semibold text-[var(--color-toss-text)]">키 (cm)</label>
              <input required type="number" defaultValue="168" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-semibold text-[var(--color-toss-text)]">몸무게 (kg)</label>
              <input required type="number" defaultValue="50" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--color-toss-text)]">기본 프로필 사진</label>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-[3/4] bg-gray-200 rounded-xl"></div>
              <div className="aspect-[3/4] bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer">+</div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--color-toss-text)]">인스타그램</label>
            <input type="text" placeholder="@username" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
          </div>

          <div className="fixed bottom-6 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pb-[env(safe-area-inset-bottom)] pointer-events-none">
            <div className="pointer-events-auto">
              <Button type="submit" size="lg" fullWidth className="shadow-lg shadow-blue-500/30">
                저장하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
