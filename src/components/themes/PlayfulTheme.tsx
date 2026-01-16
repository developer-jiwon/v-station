"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Link from "next/link";

interface PlayfulThemeProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  slug: string;
  theme: string;
}

// 각 테스트별 배경 스타일
function getBackgroundStyle(slug: string, theme: string) {
  // Identity 테마
  if (theme === "identity") {
    switch (slug) {
      case "soul-color":
        return {
          background: "linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)",
          className: "",
        };
      case "personal-font":
        return {
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          className: "",
        };
      case "brand-slogan":
        return {
          background: "linear-gradient(135deg, #831843, #581c87)",
          className: "",
        };
      case "minimalism-index":
        return {
          background: "#ffffff",
          className: "",
        };
      case "digital-persona":
        return {
          background: "linear-gradient(135deg, #4c1d95, #164e63)",
          className: "",
        };
      default:
        return {
          background: "linear-gradient(135deg, #fef3c7, #fce7f3, #e0f2fe)",
          className: "",
        };
    }
  }

  // Retro 테마
  switch (slug) {
    case "retro-error":
      return {
        background: "#008080",
        className: "",
      };
    case "pixel-character":
      return {
        background: "#1a1a2e",
        className: "",
      };
    case "cassette-tape":
      return {
        background: "linear-gradient(135deg, #831843, #581c87)",
        className: "",
      };
    case "digital-pet":
      return {
        background: "#9bbc0f",
        className: "",
      };
    case "receipt":
      return {
        background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
        className: "",
      };
    case "video-title":
      return {
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        className: "",
      };
    case "magazine-cover":
      return {
        background: "linear-gradient(135deg, #ef4444, #ec4899)",
        className: "",
      };
    case "diary-cipher":
      return {
        background: "linear-gradient(135deg, #312e81, #581c87)",
        className: "",
      };
    case "scent-spectrum":
      return {
        background: "linear-gradient(135deg, #9f1239, #581c87)",
        className: "",
      };
    default:
      return {
        background: "#008080",
        className: "",
      };
  }
}

// 테마별 텍스트 색상
function getTextColor(slug: string, theme: string): string {
  const darkBgSlugs = [
    "personal-font", "brand-slogan", "digital-persona",
    "retro-error", "pixel-character", "cassette-tape",
    "video-title", "diary-cipher", "scent-spectrum"
  ];
  return darkBgSlugs.includes(slug) ? "text-white" : "text-black";
}

export function PlayfulTheme({ children, title, subtitle, slug, theme }: PlayfulThemeProps) {
  const bgStyle = getBackgroundStyle(slug, theme);
  const textColor = getTextColor(slug, theme);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: bgStyle.background }}>
      {/* 노이즈 오버레이 */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 패턴 배경 */}
      <BackgroundPattern slug={slug} theme={theme} />

      {/* 헤더 */}
      <header className="relative z-40 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: [-3, 3, 0] }}
              className="text-xl font-black tracking-tighter"
            >
              V—STATION
            </motion.div>
            <span className="text-yellow-500">★</span>
          </Link>

          <motion.div
            initial={{ rotate: -3 }}
            whileHover={{ rotate: 3, scale: 1.05 }}
            className={`rounded-full border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0_0_#000] ${
              theme === "identity" ? "bg-violet-300" : "bg-cyan-300"
            }`}
          >
            {theme === "identity" ? "🔮 Identity" : "🕹️ Retro"}
          </motion.div>
        </div>
      </header>

      {/* 타이틀 */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            {subtitle && (
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-4 inline-block rounded-lg border-3 border-black bg-white px-3 py-1.5 text-xs font-bold shadow-[3px_3px_0_0_#000]"
              >
                {subtitle}
              </motion.div>
            )}
            {title && (
              <h1 className={`text-3xl font-black tracking-tight sm:text-4xl ${textColor}`}
                style={{ textShadow: textColor === "text-white" ? "2px 2px 0 rgba(0,0,0,0.3)" : "2px 2px 0 #fcd34d" }}
              >
                {title}
              </h1>
            )}
          </motion.div>
        )}
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-12">
        {children}
      </div>

      {/* 푸터 */}
      <footer className="relative z-10 border-t-4 border-black bg-black py-4">
        <div className="text-center">
          <p className="text-sm font-bold text-white">V-STATION ★ 2025</p>
        </div>
      </footer>
    </div>
  );
}

// 배경 패턴
function BackgroundPattern({ slug, theme }: { slug: string; theme: string }) {
  if (theme === "identity") {
    switch (slug) {
      case "soul-color":
        return (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-white/20 blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-white/20 blur-3xl"
            />
          </>
        );
      case "personal-font":
        return (
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {["Aa", "Bb", "가", "나", "?", "!"].map((char, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                className="absolute text-6xl font-bold text-white/30"
                style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        );
      case "minimalism-index":
        return (
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        );
      case "digital-persona":
        return (
          <>
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
            />
          </>
        );
      default:
        return null;
    }
  }

  // Retro 패턴
  switch (slug) {
    case "retro-error":
      return (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="absolute border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040] bg-[#c0c0c0]"
              style={{
                right: `${5 + i * 8}%`,
                top: `${15 + i * 12}%`,
                width: "120px",
                transform: `rotate(${-5 + i * 5}deg)`
              }}
            >
              <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-0.5">
                <span className="text-[10px] font-bold text-white">Error</span>
              </div>
              <div className="p-2 text-[8px]">⚠️ Error occurred</div>
            </motion.div>
          ))}
        </>
      );
    case "pixel-character":
      return (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
              className="absolute grid grid-cols-3 gap-[2px]"
              style={{ left: `${10 + i * 25}%`, top: `${60 + (i % 2) * 15}%` }}
            >
              {[0,1,0,1,1,1,0,1,0].map((v, j) => (
                <div key={j} className={`h-3 w-3 ${v ? "bg-cyan-400" : ""}`} />
              ))}
            </motion.div>
          ))}
        </div>
      );
    case "cassette-tape":
      return (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute right-[10%] top-[20%] h-20 w-20 rounded-full border-8 border-gray-600/30 bg-gray-900/30"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-[10%] bottom-[30%] h-16 w-16 rounded-full border-8 border-gray-600/30 bg-gray-900/30"
          />
        </div>
      );
    case "digital-pet":
      return (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {["❤️", "🍖", "💤", "⭐"].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              className="absolute text-3xl"
              style={{ left: `${15 + i * 20}%`, top: `${25 + (i % 2) * 40}%` }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      );
    case "receipt":
      return (
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)`,
          }}
        />
      );
    default:
      return null;
  }
}

export function PlayfulProgress({ current, total, theme }: { current: number; total: number; theme: string }) {
  const progress = (current / total) * 100;
  const bgColor = theme === "identity" ? "bg-violet-400" : "bg-cyan-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="mb-2 flex items-center justify-between">
        <motion.span
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-lg border-2 border-black bg-white px-2 py-0.5 text-xs font-bold shadow-[2px_2px_0_0_#000]"
        >
          Q{current}
        </motion.span>
        <span className="rounded-full border-2 border-black bg-white px-2 py-0.5 text-xs font-bold">
          {current} / {total}
        </span>
      </div>
      <div className="h-4 overflow-hidden rounded-full border-3 border-black bg-white shadow-[3px_3px_0_0_#000]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
          className={`h-full ${bgColor}`}
          style={{
            backgroundImage: theme === "retro"
              ? "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 16px)"
              : undefined
          }}
        />
      </div>
    </motion.div>
  );
}

export function PlayfulCard({ children, slug, theme }: { children: ReactNode; slug: string; theme: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* 카드 본체 */}
      <div className="rounded-2xl border-3 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]">
        {children}
      </div>

      {/* 장식 스티커 */}
      <motion.div
        animate={{ rotate: [-5, 5, -5], y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className={`absolute -right-3 -top-3 rounded-lg border-2 border-black px-2 py-1 text-xs font-bold shadow-[2px_2px_0_0_#000] ${
          theme === "identity" ? "bg-violet-300" : "bg-cyan-300"
        }`}
      >
        {theme === "identity" ? "🔮" : "🕹️"}
      </motion.div>
    </motion.div>
  );
}
