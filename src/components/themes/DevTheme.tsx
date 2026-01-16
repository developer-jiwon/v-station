"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DevThemeProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DevTheme({ children, title, subtitle }: DevThemeProps) {
  return (
    <div className="theme-dev min-h-screen bg-[#0d1117] font-mono text-[#c9d1d9]">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {(title || subtitle) && (
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 text-[#8b949e]">
              <span className="text-[#3fb950]">$</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {subtitle || "run test"}
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 inline-block h-4 w-2 bg-[#58a6ff]"
              />
            </div>
            {title && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-2xl font-bold text-[#58a6ff]"
              >
                # {title}
              </motion.h1>
            )}
          </motion.header>
        )}

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export function DevCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border border-[#30363d] bg-[#161b22] p-6 ${className}`}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-[#f85149]" />
        <div className="h-3 w-3 rounded-full bg-[#d29922]" />
        <div className="h-3 w-3 rounded-full bg-[#3fb950]" />
      </div>
      {children}
    </motion.div>
  );
}

export function DevButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}) {
  const baseStyles = "rounded-md px-6 py-2 font-mono text-sm transition-all duration-150";
  const variants = {
    primary: "bg-[#238636] text-white hover:bg-[#2ea043] border border-[#238636]",
    secondary: "bg-transparent text-[#58a6ff] hover:bg-[#1f6feb]/10 border border-[#30363d]",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {children}
    </motion.button>
  );
}

export function DevProgress({ current, total }: { current: number; total: number }) {
  const blocks = Array.from({ length: total }, (_, i) => i < current);

  return (
    <div className="mb-8 font-mono">
      <div className="mb-2 text-sm text-[#8b949e]">
        Progress: [{blocks.map((filled, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={filled ? "text-[#3fb950]" : "text-[#30363d]"}
          >
            {filled ? "█" : "░"}
          </motion.span>
        ))}] {current}/{total}
      </div>
    </div>
  );
}

export function DevCodeBlock({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#30363d]">
      {title && (
        <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-2 text-xs text-[#8b949e]">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto bg-[#0d1117] p-4 text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}
