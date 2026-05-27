'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MapPin, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  // Mock
  const isOrganizer = false; // Toggle this to see employer view

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
            <ChevronLeft size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 px-5 py-2 pb-32 flex flex-col gap-6">
        <div>
          <span className="px-3 py-1.5 bg-blue-50 text-[var(--color-toss-blue)] text-sm font-bold rounded-lg mb-4 inline-block">
            모집중
          </span>
          <h1 className="text-4xl font-bold text-[var(--color-toss-text)] tracking-tight mb-2">
            300,000원
          </h1>
          <p className="text-lg font-medium text-[var(--color-toss-text-sec)]">강남 프라이빗 라운지 VIP 파티 모델</p>
        </div>

        <div className="bg-white rounded-[24px] overflow-hidden divide-y divide-gray-100 border border-gray-100/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mt-2">
          <div className="flex items-center justify-between p-6">
            <span className="text-[15px] text-[var(--color-toss-text-sec)] flex items-center gap-2"><Calendar size={18}/> 일시</span>
            <span className="text-[15px] font-semibold text-[var(--color-toss-text)]">2026.06.01 (월) 오후 8:00</span>
          </div>
          <div className="flex items-center justify-between p-6">
            <span className="text-[15px] text-[var(--color-toss-text-sec)] flex items-center gap-2"><MapPin size={18}/> 장소</span>
            <span className="text-[15px] font-semibold text-[var(--color-toss-text)]">서울 강남구 역삼동</span>
          </div>
          <div className="flex items-center justify-between p-6">
            <span className="text-[15px] text-[var(--color-toss-text-sec)] flex items-center gap-2"><Users size={18}/> 모집 인원</span>
            <span className="text-[15px] font-semibold text-[var(--color-toss-text)]">3명</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <h2 className="text-lg font-bold text-[var(--color-toss-text)]">추가 요구 사항</h2>
          <div className="bg-white p-5 rounded-2xl text-[var(--color-toss-text)] leading-relaxed whitespace-pre-wrap">
            블랙 컨셉의 원피스 또는 세미정장 착용 부탁드립니다. VIP 응대 경험자 우대합니다.
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pb-[env(safe-area-inset-bottom)] pointer-events-none flex gap-3">
        <div className="pointer-events-auto flex-1 flex gap-3">
          {isOrganizer ? (
            <Link href={`/jobs/${id}/applicants`} className="w-full">
              <Button size="lg" fullWidth className="shadow-lg shadow-blue-500/30 flex justify-center gap-2">
                지원자 목록 보기
                <ChevronRight size={20} />
              </Button>
            </Link>
          ) : (
            <Link href={`/jobs/${id}/apply`} className="w-full">
              <Button size="lg" fullWidth className="shadow-lg shadow-blue-500/30">
                지원하기
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
