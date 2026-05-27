'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Share, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ApplicantsPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // In a real app, generate a unique token link
    navigator.clipboard.writeText('https://saozi.vercel.app/jobs/1/applicants?token=cohost123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-[var(--color-toss-text)]">지원자 심사</h1>
        </div>
        
        <button 
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-[var(--color-toss-text)] rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Share size={16} />}
          {copied ? '복사 완료!' : '공동 호스트 초대'}
        </button>
      </div>

      <div className="flex-1 px-5 py-2 pb-32 flex flex-col items-center">
        <div className="w-full max-w-sm aspect-[3/4] bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden relative border border-gray-100 flex flex-col">
          {/* Camera Photo Placeholder */}
          <div className="flex-1 bg-gray-200 relative">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              실시간 인증됨
            </div>
          </div>
          
          <div className="p-6 bg-white flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-[var(--color-toss-text)]">김모델 <span className="text-lg text-gray-400 font-medium ml-1">24</span></h2>
            <div className="flex gap-2 text-[15px] font-medium text-[var(--color-toss-text-sec)]">
              <span>168cm</span>
              <span>·</span>
              <span>50kg</span>
            </div>
            
            <div className="flex gap-3 mt-4">
              <Button size="lg" className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-none border-none">
                <X size={24} />
              </Button>
              <Button size="lg" className="flex-1 bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-500/30 border-none text-white">
                <Check size={24} />
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-[var(--color-toss-text-sec)] mt-6 font-medium">
          총 5명의 대기자가 있습니다.
        </p>
      </div>
    </div>
  );
}
