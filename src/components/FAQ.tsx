"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/data/faqs";

interface FAQProps {
  faqs: FAQ[];
}

export function FAQ({ faqs }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full divide-y divide-border-light">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;

        return (
          <div key={faq.id} className="overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              className={cn(
                "flex w-full items-center justify-between gap-4 py-5 text-left",
                "transition-colors duration-200 hover:text-hydra-600",
                "focus-visible:outline-2 focus-visible:outline-hydra-500"
              )}
            >
              <span className="text-base font-medium text-navy sm:text-lg">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-hydra-500" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-12 text-sm leading-relaxed text-slate sm:text-base">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
