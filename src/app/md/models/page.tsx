'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MY_MODELS = [
  { id: 'm1', name: '김모델', age: 24, height: 168, weight: 50 },
  { id: 'm2', name: '이모델', age: 22, height: 165, weight: 48 },
];

export default function MdModelsPage() {
  return (
    <div className="flex flex-col min-h-screen px-5 py-6 bg-[var(--color-toss-bg)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-toss-text)]">소속 모델</h1>
        <p className="text-[15px] text-[var(--color-toss-text-sec)] mt-1">대리 지원할 소속 모델 프로필을 관리하세요.</p>
      </div>

      <div className="flex flex-col gap-4 flex-1 pb-24">
        {MY_MODELS.map((model) => (
          <Card key={model.id} className="border border-transparent">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[var(--color-toss-text)] mb-1">
                  {model.name} <span className="text-[15px] text-gray-400 font-medium ml-1">{model.age}세</span>
                </h2>
                <div className="text-[14px] text-[var(--color-toss-text-sec)] font-medium">
                  {model.height}cm · {model.weight}kg
                </div>
              </div>
              <Button size="sm" variant="secondary">
                수정
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-24 w-full max-w-[480px] left-1/2 -translate-x-1/2 px-5 pointer-events-none">
        <div className="pointer-events-auto">
          <Button size="lg" fullWidth className="shadow-lg shadow-blue-500/30 text-lg">
            새 모델 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
