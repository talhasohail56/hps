"use client";

import { Waves, Wrench, HelpCircle } from "lucide-react";
import { ChatMessage } from "../ChatMessage";
import type { ServiceType } from "../types";

interface ServiceTypeStepProps {
  onSelect: (type: ServiceType) => void;
}

const OPTIONS: {
  value: ServiceType;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: "cleaning",
    label: "Pool Cleaning",
    description: "Get an instant quote for recurring service",
    icon: Waves,
  },
  {
    value: "repair",
    label: "Repairs & Equipment",
    description: "Report an issue or request a repair",
    icon: Wrench,
  },
  {
    value: "question",
    label: "General Question",
    description: "Ask about our services or get help",
    icon: HelpCircle,
  },
];

export function ServiceTypeStep({ onSelect }: ServiceTypeStepProps) {
  return (
    <>
      <ChatMessage from="bot">
        <p className="font-semibold mb-1">
          Welcome to Hydra Pool Services!
        </p>
        <p>How can we help you today?</p>
      </ChatMessage>

      <div className="flex flex-col gap-2 mt-2">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className="flex items-center gap-3 w-full rounded-xl border border-border-light bg-white px-4 py-3.5 text-left transition-all hover:border-hydra-300 hover:bg-hydra-50 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hydra-50">
                <Icon className="h-4.5 w-4.5 text-hydra-600" />
              </div>
              <div className="min-w-0">
                <span className="block text-sm font-semibold text-navy">
                  {opt.label}
                </span>
                <span className="block text-xs text-slate-light mt-0.5">
                  {opt.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
