'use client';

import { useState } from 'react';
import { LiveCameraInput } from '@/components/ui/LiveCameraInput';
import { Button } from '@/components/ui/Button';
import { ShieldCheck } from 'lucide-react';

export default function ModelVerifyPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) return;
    
    // Simulate sending photo to server and verifying
    setIsVerified(true);
  };

  if (isVerified) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)] items-center justify-center px-5">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-toss-text)] text-center mb-2">
          현장 인증이<br/>완료되었습니다
        </h1>
        <p className="text-[var(--color-toss-text-sec)] text-center">
          주최자에게 최종 지원이 접수되었습니다.<br/>이제 창을 닫으셔도 좋습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 px-5 flex flex-col pt-12 pb-32">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2 leading-snug">
            에이전시 대리 지원을 위해<br/>현장 사진을 찍어주세요
          </h1>
          <p className="text-[15px] text-gray-400">
            강남 프라이빗 라운지 VIP 파티 모델 공고
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-center relative">
          <div className="bg-white/10 rounded-3xl p-1 backdrop-blur-md overflow-hidden">
             <LiveCameraInput 
              label=""
              onImageCaptured={(file) => setPhoto(file)} 
            />
          </div>

          <div className="fixed bottom-6 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pb-[env(safe-area-inset-bottom)] pointer-events-none">
            <div className="pointer-events-auto">
              <Button 
                type="submit" 
                size="lg" 
                fullWidth 
                className="shadow-lg shadow-blue-500/30 text-lg" 
                disabled={!photo}
              >
                촬영 완료 및 전송하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
