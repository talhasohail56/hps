"use client";

import { useRef, useCallback } from "react";
import { Camera, Upload, SkipForward } from "lucide-react";
import { ChatMessage } from "../ChatMessage";

interface PhotoStepProps {
  onUpload: (base64: string) => void;
  onSkip: () => void;
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 800;
        let w = img.width;
        let h = img.height;
        if (w > MAX || h > MAX) {
          if (w > h) {
            h = Math.round((h * MAX) / w);
            w = MAX;
          } else {
            w = Math.round((w * MAX) / h);
            h = MAX;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PhotoStep({ onUpload, onSkip }: PhotoStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const compressed = await compressImage(file);
        onUpload(compressed);
      } catch {
        // fallback — read without compression
        const reader = new FileReader();
        reader.onload = () => onUpload(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [onUpload]
  );

  return (
    <>
      <ChatMessage from="bot">
        <div className="flex items-center gap-2 mb-1 font-semibold">
          <Camera className="h-4 w-4 text-hydra-600" />
          Pool Photo
        </div>
        <p>
          Upload a photo of your pool so we can better understand your setup.
          This is optional but helps us tailor the quote.
        </p>
      </ChatMessage>

      <div className="flex gap-2 mt-1 justify-end">
        <button
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-full bg-hydra-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-hydra-700"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload Photo
        </button>
        <button
          onClick={onSkip}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-light px-4 py-2 text-xs font-semibold text-slate-light transition-colors hover:border-hydra-300 hover:text-hydra-600"
        >
          <SkipForward className="h-3.5 w-3.5" />
          Skip
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </>
  );
}
