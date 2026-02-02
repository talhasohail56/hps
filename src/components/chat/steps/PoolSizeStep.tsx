"use client";

import { Droplets } from "lucide-react";
import { ChatMessage } from "../ChatMessage";
import type { PoolSize } from "../types";

interface PoolSizeStepProps {
  onSelect: (size: PoolSize) => void;
}

const OPTIONS: { value: PoolSize; label: string }[] = [
  { value: "10k-20k", label: "10,000 – 20,000 gal" },
  { value: "20k-30k", label: "20,000 – 30,000 gal" },
  { value: "30k+", label: "30,000+ gal" },
];

export function PoolSizeStep({ onSelect }: PoolSizeStepProps) {
  return (
    <>
      <ChatMessage from="bot">
        <div className="flex items-center gap-2 mb-1 font-semibold">
          <Droplets className="h-4 w-4 text-hydra-600" />
          Pool Size
        </div>
        <p>What&apos;s the approximate size of your pool?</p>
      </ChatMessage>

      <div className="flex flex-col gap-2 mt-1">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-left text-sm font-medium text-navy transition-all hover:border-hydra-300 hover:bg-hydra-50 hover:text-hydra-600"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </>
  );
}
