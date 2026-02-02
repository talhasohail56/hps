"use client";

import { motion } from "framer-motion";

interface ChatMessageProps {
  from: "bot" | "user";
  children: React.ReactNode;
}

export function ChatMessage({ from, children }: ChatMessageProps) {
  const isBot = from === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? "bg-hydra-50 text-navy rounded-bl-md"
            : "bg-hydra-600 text-white rounded-br-md"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}
