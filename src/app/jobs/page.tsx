import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Calendar, Users } from 'lucide-react';

const MOCK_JOBS = [
  {
    id: '1',
    title: '강남 프라이빗 라운지 VIP 파티 모델',
    event_datetime: '2026-06-01T20:00:00Z',
    location_detail: '서울 강남구 역삼동 123-45 (청담라운지)',
    pay_amount: '300,000원',
    required_headcount: 3,
    status: 'OPEN',
  },
  {
    id: '2',
    title: '요트 선상 파티 샴페인 모델',
    event_datetime: '2026-06-05T18:00:00Z',
    location_detail: '서울 서초구 한강시민공원 요트장',
    pay_amount: '500,000원',
    required_headcount: 2,
    status: 'OPEN',
  }
];

export default function JobsPage() {
  return (
    <div className="flex flex-col min-h-screen px-5 py-6 bg-[var(--color-toss-bg)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-toss-text)]">알바 공고</h1>
        <Link href="/profile">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-300" />
        </Link>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {MOCK_JOBS.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id}>
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold text-[var(--color-toss-text)] line-clamp-2 pr-4">{job.title}</h2>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-lg whitespace-nowrap">
                    모집중
                  </span>
                </div>
                
                <div className="flex flex-col gap-1 text-[var(--color-toss-text-sec)] text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(job.event_datetime).toLocaleString('ko-KR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span className="line-clamp-1">{job.location_detail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{job.required_headcount}명 모집</span>
                  </div>
                </div>

                <div className="mt-2 pt-3 border-t border-[var(--color-toss-border)]">
                  <span className="text-lg font-bold text-[var(--color-toss-text)]">{job.pay_amount}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-6 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pb-[env(safe-area-inset-bottom)] pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/jobs/create">
            <Button size="lg" fullWidth className="shadow-lg shadow-blue-500/30">
              새 공고 올리기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
