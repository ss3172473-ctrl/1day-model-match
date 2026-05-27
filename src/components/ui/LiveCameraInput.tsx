'use client';

import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

interface LiveCameraInputProps {
  onImageCaptured: (file: File) => void;
  label?: string;
  previewUrl?: string | null;
}

export function LiveCameraInput({ onImageCaptured, label = "사진 촬영 (필수)", previewUrl }: LiveCameraInputProps) {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      // Pass file up to parent
      onImageCaptured(file);
    }
  };

  const handleBoxClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-semibold text-[var(--color-toss-text)]">{label}</span>}
      
      <div 
        onClick={handleBoxClick}
        className={`relative w-full aspect-[3/4] bg-[var(--color-toss-bg)] rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center border-2 border-dashed ${preview ? 'border-transparent' : 'border-[var(--color-toss-border)] hover:bg-gray-200'} transition-colors`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-[var(--color-toss-text-sec)]">
            <Camera size={40} />
            <span className="text-sm font-medium">여기를 눌러 카메라를 실행하세요</span>
          </div>
        )}

        {preview && (
          <div className="absolute bottom-4 right-4 bg-black/60 rounded-full p-2 text-white backdrop-blur-sm">
            <ImageIcon size={20} />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleCapture}
        className="hidden"
      />
    </div>
  );
}
