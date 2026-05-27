'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const MY_MODELS = [
  { id: 'm1', name: '김모델', age: 24, height: 168, weight: 50 },
  { id: 'm2', name: '이모델', age: 22, height: 165, weight: 48 },
];

export default function MdApplyPage() {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleSendAuthLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel) {
      alert('지원할 모델을 선택해주세요.');
      return;
    }
    
    // Toast or state update to show success
    setIsSent(true);
    setTimeout(() => {
      router.push('/jobs');
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-toss-bg)]">
      <div className="sticky top-0 bg-[var(--color-toss-bg)] z-10 px-5 py-4 flex items-center justify-between gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 px-5 py-6 pb-32 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-[var(--color-toss-text)] leading-snug mb-2">
              어떤 모델을 <br/>대리 지원할까요?
            </h1>
            <p className="text-[15px] text-[var(--color-toss-text-sec)]">
              모델을 선택하면 해당 모델의 카카오톡으로 현장 카메라 인증 링크가 전송됩니다.
            </p>
          </div>

          {!isSent ? (
            <div className="flex flex-col gap-3">
              {MY_MODELS.map((model) => (
                <div 
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`p-5 rounded-[24px] border-2 cursor-pointer transition-all ${
                    selectedModel === model.id 
                      ? 'border-[var(--color-toss-blue)] bg-blue-50/50' 
                      : 'border-transparent bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-[var(--color-toss-text)] text-lg">
                        {model.name} <span className="text-[15px] text-gray-400 font-medium ml-1">{model.age}세</span>
                      </h3>
                      <p className="text-[14px] text-[var(--color-toss-text-sec)] font-medium mt-0.5">
                        {model.height}cm · {model.weight}kg
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
                <Send size={36} />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-toss-text)] text-center">
                카카오톡으로<br/>인증 링크를 보냈어요
              </h2>
              <p className="text-[var(--color-toss-text-sec)] text-center mt-2">
                모델이 현장 카메라 인증을 완료하면<br/>대리 지원이 최종 접수됩니다.
              </p>
            </div>
          )}
        </div>

        {!isSent && (
          <div className="fixed bottom-6 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pb-[env(safe-area-inset-bottom)] pointer-events-none">
            <div className="pointer-events-auto">
              <form onSubmit={handleSendAuthLink}>
                <Button type="submit" size="lg" fullWidth className="shadow-lg shadow-blue-500/30" disabled={!selectedModel}>
                  인증 링크 전송하기
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
