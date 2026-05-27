'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Users } from 'lucide-react';

const MY_JOBS = [
  {
    id: '1',
    title: '강남 프라이빗 라운지 VIP 파티 모델',
    event_datetime: '2026-06-01T20:00:00Z',
    pay_amount: '300,000원',
    required_headcount: 3,
    applicant_count: 5,
    status: 'OPEN',
  }
];

export default function OrganizerDashboard() {
  return (
    <div className="flex flex-col min-h-screen px-5 py-6 bg-[var(--color-toss-bg)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-toss-text)]">내 공고</h1>
        <p className="text-[15px] text-[var(--color-toss-text-sec)] mt-1">올리신 공고의 지원 현황을 확인하세요.</p>
      </div>

      <div className="flex flex-col gap-4 flex-1 pb-24">
        {MY_JOBS.map((job) => (
          <Link href={`/organizer/jobs/${job.id}/applicants`} key={job.id}>
            <Card className="hover:scale-[0.98] transition-transform cursor-pointer border border-transparent hover:border-gray-200">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-2.5 py-1 bg-blue-50 text-[var(--color-toss-blue)] text-xs font-bold rounded-md">
                    모집중
                  </span>
                  <span className="text-xs font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-md">
                    새로운 지원자 {job.applicant_count}명
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-[var(--color-toss-text)] tracking-tight mb-1 line-clamp-1">
                  {job.title}
                </h2>
                <p className="text-[15px] font-bold text-[var(--color-toss-blue)] mb-4">
                  {job.pay_amount}
                </p>

                <div className="flex items-center justify-between text-[13px] font-medium text-[var(--color-toss-text-sec)] bg-gray-50 px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{new Date(job.event_datetime).toLocaleString('ko-KR', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} className="text-gray-400" />
                    <span>{job.required_headcount}명 모집</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-24 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/organizer/jobs/create">
            <Button size="lg" fullWidth className="shadow-lg shadow-blue-500/30 text-lg">
              새 공고 올리기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
