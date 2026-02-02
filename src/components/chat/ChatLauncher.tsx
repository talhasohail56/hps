"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Zap } from "lucide-react";
import { ChatWidget } from "./ChatWidget";

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show the tooltip after 3 seconds on first load
  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, [open]);

  // Hide tooltip when widget opens
  useEffect(() => {
    if (open) setShowTooltip(false);
  }, [open]);

  // Listen for "open-chat" custom event (e.g. from Hero trial banner)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && <ChatWidget onClose={() => setOpen(false)} />}
      </AnimatePresence>

      {/* Tooltip bubble — visible when widget is closed */}
      <AnimatePresence>
        {showTooltip && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 sm:right-6"
          >
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2.5 shadow-lg transition-all hover:shadow-xl hover:border-hydra-300"
            >
              <Zap className="h-4 w-4 text-hydra-500" />
              <span className="text-xs font-semibold text-navy">
                Free estimate in 3 questions
              </span>
            </button>
            {/* Arrow pointing to FAB */}
            <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-border-light bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hydra-600 text-white shadow-lg shadow-hydra-600/30 transition-colors hover:bg-hydra-700 sm:right-6"
        aria-label={open ? "Close quote assistant" : "Free estimate in 3 questions"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
