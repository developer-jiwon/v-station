"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RetroThemeProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function RetroTheme({ children, title, subtitle }: RetroThemeProps) {
  return (
    <div className="theme-retro min-h-screen bg-[#008080]">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {(title || subtitle) && (
          <motion.header
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <RetroWindow title={title || "V-STATION"}>
              <div className="text-center">
                {subtitle && (
                  <p className="mb-2 text-sm text-[#808080]">{subtitle}</p>
                )}
                <div className="flex justify-center gap-4">
                  <span className="text-[#FF00FF]">★</span>
                  <span className="font-bold">{title}</span>
                  <span className="text-[#00FFFF]">★</span>
                </div>
              </div>
            </RetroWindow>
          </motion.header>
        )}

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export function RetroWindow({ children, title = "Window" }: { children: ReactNode; title?: string }) {
  return (
    <div className="overflow-hidden border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff]">
      {/* Title bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1">
        <span className="text-sm font-bold text-white">{title}</span>
        <div className="flex gap-1">
          <button className="h-4 w-4 border border-[#dfdfdf] border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] text-xs leading-none">
            _
          </button>
          <button className="h-4 w-4 border border-[#dfdfdf] border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] text-xs leading-none">
            □
          </button>
          <button className="h-4 w-4 border border-[#dfdfdf] border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] text-xs font-bold leading-none">
            ×
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

export function RetroButton({
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
  const baseStyles = `
    px-6 py-2 text-sm font-bold
    border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040]
    bg-[#c0c0c0]
    active:border-[#404040] active:border-b-[#dfdfdf] active:border-r-[#dfdfdf]
    active:translate-x-[1px] active:translate-y-[1px]
  `;

  const variants = {
    primary: "text-black",
    secondary: "text-[#000080]",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {children}
    </motion.button>
  );
}

export function RetroProgress({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="mb-1 text-xs">
        Loading... {current}/{total}
      </div>
      <div className="h-5 border-2 border-[#404040] border-b-[#dfdfdf] border-r-[#dfdfdf] bg-white p-[2px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full"
          style={{
            background: "repeating-linear-gradient(90deg, #000080, #000080 10px, #1084d0 10px, #1084d0 20px)",
          }}
        />
      </div>
    </div>
  );
}

export function RetroErrorPopup({
  title,
  message,
  errorCode,
  onClose,
}: {
  title: string;
  message: string;
  errorCode?: string;
  onClose?: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-block"
    >
      <RetroWindow title={title}>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff0000] text-2xl text-white">
            ✕
          </div>
          <div>
            <p className="mb-2 font-bold">{message}</p>
            {errorCode && (
              <p className="text-xs text-[#808080]">Error Code: {errorCode}</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <RetroButton onClick={onClose}>OK</RetroButton>
          <RetroButton variant="secondary">Cancel</RetroButton>
        </div>
      </RetroWindow>
    </motion.div>
  );
}

export function RetroReceipt({ items, total }: { items: { name: string; price: string }[]; total?: string }) {
  return (
    <div className="bg-white p-4 font-mono text-xs">
      <div className="mb-4 border-b border-dashed border-black pb-2 text-center">
        <div className="text-lg font-bold">V-STATION</div>
        <div>Receipt</div>
      </div>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
      {total && (
        <div className="mt-4 border-t border-dashed border-black pt-2">
          <div className="flex justify-between font-bold">
            <span>TOTAL</span>
            <span>{total}</span>
          </div>
        </div>
      )}
      <div className="mt-4 text-center text-[8px] text-[#808080]">
        Thank you for your visit!
      </div>
    </div>
  );
}
