"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface IdentityThemeProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function IdentityTheme({ children, title, subtitle }: IdentityThemeProps) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-2xl px-6 py-16">
        {(title || subtitle) && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center"
          >
            {subtitle && (
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                {subtitle}
              </span>
            )}
            {title && (
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {title}
              </h1>
            )}
          </motion.header>
        )}

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export function IdentityCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function IdentityButton({
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
  const baseStyles = "rounded-full px-8 py-3 text-sm font-medium transition-all duration-200";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-[0.98]",
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

export function IdentityProgress({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between text-xs text-slate-400">
        <span>{current} / {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-slate-900"
        />
      </div>
    </div>
  );
}
