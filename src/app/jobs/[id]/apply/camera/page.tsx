'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LiveCameraInput } from '@/components/ui/LiveCameraInput';

export default function CameraPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      alert('실시간 카메라 사진 인증이 필수입니다.');
      return;
    }
    // TODO: Upload photo to Supabase storage, insert application record
    alert('사진이 성공적으로 전송되어 지원이 완료되었습니다!');
    router.replace('/jobs');
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="sticky top-0 bg-transparent z-10 px-5 py-4 flex items-center justify-between gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full bg-black/50 text-white backdrop-blur-sm">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 px-5 flex flex-col pt-4 pb-32">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2 leading-snug">
            현장 인증을 위해 <br/>사진을 찍어주세요
          </h1>
          <p className="text-[15px] text-gray-400">보정 어플 없이 기본 카메라로 촬영됩니다.</p>
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
                촬영 완료 및 지원하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
