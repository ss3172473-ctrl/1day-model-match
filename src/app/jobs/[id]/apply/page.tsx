'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { LiveCameraInput } from '@/components/ui/LiveCameraInput';
import { ChevronLeft } from 'lucide-react';

export default function ApplyPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      alert('실시간 카메라 사진 인증이 필수입니다.');
      return;
    }
    // TODO: Upload photo to Supabase storage, insert application record
    alert('지원이 완료되었습니다!');
    router.push('/jobs');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-toss-text)]">지원하기</h1>
      </div>

      <div className="flex-1 px-5 py-2 pb-24">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
          <p className="text-sm text-[var(--color-toss-blue)] font-medium leading-relaxed">
            현재 상태를 확인하기 위해 실시간 카메라 촬영이 필수입니다. 
            보정 어플 없이 기본 카메라로 촬영해 주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <LiveCameraInput 
            label="실시간 인증 사진 (필수)"
            onImageCaptured={(file) => setPhoto(file)} 
          />

          <div className="fixed bottom-6 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pb-[env(safe-area-inset-bottom)] pointer-events-none">
            <div className="pointer-events-auto">
              <Button type="submit" size="lg" fullWidth className="shadow-lg shadow-blue-500/30" disabled={!photo}>
                사진 촬영 완료 및 지원하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
