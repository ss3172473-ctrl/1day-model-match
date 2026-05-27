'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChevronLeft, Check, X } from 'lucide-react';

const MOCK_APPLICANTS = [
  {
    id: '1',
    name: '김모델',
    age: 24,
    height: 168,
    weight: 50,
    live_photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    status: 'PENDING',
  },
  {
    id: '2',
    name: '이수진 (MD소속)',
    age: 22,
    height: 172,
    weight: 52,
    live_photo_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    status: 'APPROVED',
  }
];

export default function ApplicantsPage() {
  const router = useRouter();

  const handleApprove = (id: string) => {
    alert('승인되었습니다!');
  };

  const handleReject = (id: string) => {
    alert('거절되었습니다.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-toss-text)]">지원자 관리</h1>
      </div>

      <div className="flex-1 px-5 py-2 pb-10 flex flex-col gap-6">
        {MOCK_APPLICANTS.map((applicant) => (
          <Card key={applicant.id} className="overflow-hidden p-0">
            <div className="aspect-[3/4] w-full relative bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={applicant.live_photo_url} alt="live" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-sm">
                실시간 인증됨
              </div>
            </div>
            
            <div className="p-5 flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold text-[var(--color-toss-text)]">{applicant.name}</h3>
                  {applicant.status === 'APPROVED' && (
                    <span className="text-blue-600 font-bold text-sm">승인됨</span>
                  )}
                </div>
                <p className="text-[var(--color-toss-text-sec)]">
                  {applicant.age}세 · {applicant.height}cm · {applicant.weight}kg
                </p>
              </div>

              {applicant.status === 'PENDING' && (
                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1 text-red-500 font-bold" onClick={() => handleReject(applicant.id)}>
                    <X size={20} className="mr-1" /> 거절
                  </Button>
                  <Button className="flex-1" onClick={() => handleApprove(applicant.id)}>
                    <Check size={20} className="mr-1" /> 승인
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
