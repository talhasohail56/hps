"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageSquare } from "lucide-react";
import {
  chatReducer,
  initialChatState,
  type ChatState,
  type PoolSize,
  type Schedule,
  type ContactDetails,
} from "./types";
import { getMonthlyPrice } from "./pricing";
import { submitQuote } from "@/app/actions/quote";

import { ChatMessage } from "./ChatMessage";
import { PhotoStep } from "./steps/PhotoStep";
import { PoolSizeStep } from "./steps/PoolSizeStep";
import { ScheduleStep } from "./steps/ScheduleStep";
import { DetailsStep } from "./steps/DetailsStep";
import { QuoteResultStep } from "./steps/QuoteResultStep";

const STORAGE_KEY = "hps-quote-chat";

function loadState(): ChatState {
  if (typeof window === "undefined") return initialChatState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatState;
      // don't restore mid-submission state
      if (parsed.step === "submitting") parsed.step = "details";
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return initialChatState;
}

interface ChatWidgetProps {
  onClose: () => void;
}

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const [state, dispatch] = useReducer(chatReducer, initialChatState, loadState);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Auto-scroll to bottom on step change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.step]);

  /* ---------- handlers ---------- */
  /* Flow: welcome → poolSize → schedule → details → photo (optional) → result */

  const handlePoolSize = useCallback((size: PoolSize) => {
    dispatch({ type: "SET_POOL_SIZE", poolSize: size });
  }, []);

  const handleSchedule = useCallback((schedule: Schedule) => {
    dispatch({ type: "SET_SCHEDULE", schedule });
  }, []);

  const handleDetails = useCallback((details: ContactDetails) => {
    dispatch({ type: "SET_DETAILS", details });
    // reducer moves to "photo" step
  }, []);

  const doSubmit = useCallback(
    async (photo?: string) => {
      dispatch({ type: "SET_STEP", step: "submitting" });

      const price = getMonthlyPrice(state.schedule!, state.poolSize!);
      dispatch({ type: "SET_PRICE", price });

      const details = state.details!;
      const result = await submitQuote({
        photo: photo || undefined,
        poolSize: state.poolSize!,
        schedule: state.schedule!,
        monthlyPrice: price,
        name: details.name,
        email: details.email,
        phone: details.phone,
        address: details.address,
      });

      if (result.success) {
        dispatch({ type: "SET_QUOTE_ID", quoteId: result.quoteId });
      } else {
        dispatch({ type: "SET_ERROR", error: result.error });
      }
    },
    [state.poolSize, state.schedule, state.details]
  );

  const handlePhoto = useCallback(
    (base64: string) => {
      dispatch({ type: "SET_PHOTO", photo: base64 });
      doSubmit(base64);
    },
    [doSubmit]
  );

  const handleSkipPhoto = useCallback(() => {
    doSubmit();
  }, [doSubmit]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "RESET" });
  }, []);

  /* ---------- render step ---------- */

  function renderStep() {
    switch (state.step) {
      case "welcome":
        return (
          <>
            <ChatMessage from="bot">
              <p className="font-semibold mb-1">
                Welcome to Hydra Pool Services!
              </p>
              <p>
                Get a free estimate in just 3 questions — takes under 30
                seconds. Let&apos;s go!
              </p>
            </ChatMessage>
            <div className="flex justify-end mt-1">
              <button
                onClick={() => dispatch({ type: "SET_STEP", step: "poolSize" })}
                className="rounded-full bg-hydra-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-hydra-700"
              >
                Get My Estimate
              </button>
            </div>
          </>
        );

      case "poolSize":
        return <PoolSizeStep onSelect={handlePoolSize} />;

      case "schedule":
        return (
          <>
            <ChatMessage from="user">
              Pool size:{" "}
              {state.poolSize === "30k+"
                ? "30,000+ gal"
                : state.poolSize?.replace("k", ",000").replace("-", " – ") +
                  " gal"}
            </ChatMessage>
            <ScheduleStep onSelect={handleSchedule} />
          </>
        );

      case "details":
        return (
          <>
            <ChatMessage from="user">
              Schedule: <span className="capitalize">{state.schedule}</span>
            </ChatMessage>
            {state.error && (
              <ChatMessage from="bot">
                <p className="text-red-600 text-xs">{state.error}</p>
              </ChatMessage>
            )}
            <DetailsStep onSubmit={handleDetails} />
          </>
        );

      case "photo":
        return <PhotoStep onUpload={handlePhoto} onSkip={handleSkipPhoto} />;

      case "submitting":
        return (
          <ChatMessage from="bot">
            <p className="text-sm text-slate-light animate-pulse">
              Generating your quote…
            </p>
          </ChatMessage>
        );

      case "result":
        return (
          <QuoteResultStep
            monthlyPrice={state.monthlyPrice!}
            schedule={state.schedule!}
            poolSize={state.poolSize!}
            quoteId={state.quoteId!}
            onReset={handleReset}
          />
        );

      default:
        return null;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="fixed bottom-24 right-4 z-50 flex w-[370px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border-light bg-white shadow-2xl sm:right-6"
      style={{ maxHeight: "min(600px, calc(100dvh - 8rem))" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl bg-hydra-600 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Quote Assistant</p>
            <p className="text-[11px] text-hydra-100">
              Instant pool service quotes
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ minHeight: 200 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-border-light px-4 py-2.5">
        <p className="text-center text-[10px] text-slate-light/60">
          Powered by Hydra Pool Services
        </p>
      </div>
    </motion.div>
  );
}
