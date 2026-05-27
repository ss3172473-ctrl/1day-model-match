'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CreateJobPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('새 공고가 등록되었습니다!');
    router.replace('/organizer/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-[var(--color-toss-text)]">새 공고 올리기</h1>
        </div>
      </div>

      <div className="flex-1 px-5 py-2 pb-32">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-[var(--color-toss-text)] mb-2">공고 제목</label>
              <input type="text" placeholder="예: 강남 라운지 샴페인 모델" className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)]" required />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[var(--color-toss-text)] mb-2">알바비 (일당)</label>
              <div className="relative">
                <input type="number" placeholder="300000" className="w-full p-4 pr-12 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)]" required />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">원</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--color-toss-text)] mb-2">일시 및 장소</label>
              <input type="datetime-local" className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)] mb-3" required />
              <input type="text" placeholder="상세 장소 입력" className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)]" required />
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--color-toss-text)] mb-2">모집 인원</label>
              <div className="relative">
                <input type="number" placeholder="3" className="w-full p-4 pr-12 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)]" required />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">명</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--color-toss-text)] mb-2">추가 요구 사항 (복장, 컨셉 등)</label>
              <textarea placeholder="블랙 원피스 착용 필수입니다." rows={4} className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[var(--color-toss-blue)] resize-none" required />
            </div>
          </div>
          
          <div className="fixed bottom-24 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pointer-events-none">
            <div className="pointer-events-auto">
              <Button type="submit" size="lg" fullWidth className="shadow-lg shadow-blue-500/30 text-lg">
                등록하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
