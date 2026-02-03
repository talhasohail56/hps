"use client";

import { CheckCircle, Phone, RotateCcw } from "lucide-react";
import { ChatMessage } from "../ChatMessage";

interface InquiryResultStepProps {
  onReset: () => void;
}

export function InquiryResultStep({ onReset }: InquiryResultStepProps) {
  return (
    <>
      <ChatMessage from="bot">
        <div className="flex items-center gap-2 mb-2 font-semibold">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Message Sent
        </div>
        <p className="text-sm">
          Thanks for reaching out! Our team will get back to you within 24
          hours. Need something sooner? Give us a call.
        </p>
      </ChatMessage>

      <div className="flex gap-2 mt-2">
        <a
          href="tel:+12142336803"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-hydra-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-hydra-700"
        >
          <Phone className="h-3.5 w-3.5" />
          Call Now
        </a>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-light px-4 py-2.5 text-xs font-semibold text-slate-light transition-colors hover:border-hydra-300 hover:text-hydra-600"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Start Over
        </button>
      </div>
    </>
  );
}
