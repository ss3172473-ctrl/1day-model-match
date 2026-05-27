'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChevronLeft } from 'lucide-react';

export default function CreateJobPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('공고가 등록되었습니다!');
    router.push('/jobs');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-toss-text)]">새 공고 올리기</h1>
      </div>

      <div className="flex-1 px-5 py-2 pb-24">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--color-toss-text)]">공고 제목</label>
            <input required type="text" placeholder="예: 강남 프라이빗 라운지 VIP 파티 모델" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--color-toss-text)]">일시</label>
            <input required type="datetime-local" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--color-toss-text)]">장소</label>
            <input required type="text" placeholder="상세 주소를 입력해주세요" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-semibold text-[var(--color-toss-text)]">일당 (원)</label>
              <input required type="text" placeholder="300,000" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
            </div>
            <div className="flex flex-col gap-2 w-32">
              <label className="text-sm font-semibold text-[var(--color-toss-text)]">인원 (명)</label>
              <input required type="number" min="1" defaultValue="1" className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--color-toss-text)]">추가 요구 사항 (선택)</label>
            <textarea placeholder="복장, 컨셉, 역할 등을 자유롭게 적어주세요." rows={4} className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--color-toss-blue)] focus:ring-1 focus:ring-[var(--color-toss-blue)] outline-none resize-none" />
          </div>

          <div className="fixed bottom-6 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pb-[env(safe-area-inset-bottom)] pointer-events-none">
            <div className="pointer-events-auto">
              <Button type="submit" size="lg" fullWidth className="shadow-lg shadow-blue-500/30">
                등록하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
