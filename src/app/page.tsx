"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { getContentsByTheme } from "@/data/contents";
import type { Content } from "@/types/content";
import { Zap } from "lucide-react";

export default function HomePage() {
  const identityContents = getContentsByTheme("identity");
  const retroContents = getContentsByTheme("retro");
  const y2kContents = getContentsByTheme("y2k");
  const allContents = [...identityContents, ...retroContents, ...y2kContents];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50">
      {/* 손그림 스타일 노이즈 오버레이 */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header - 뽀짝한 느낌 */}
      <header className="relative z-40 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, -3, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl font-black tracking-tighter"
            >
              V—STATION
            </motion.div>
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              className="text-yellow-500"
            >
              ★
            </motion.span>
          </Link>

          {/* 스티커 느낌 뱃지 */}
          <motion.div
            initial={{ rotate: -3 }}
            whileHover={{ rotate: 3, scale: 1.1 }}
            className="flex items-center gap-1 rounded-full border-2 border-black bg-yellow-300 px-3 py-1.5 text-xs font-black shadow-[3px_3px_0_0_#000]"
          >
            <Zap size={12} fill="black" />
            {allContents.length}개 테스트
          </motion.div>
        </div>
      </header>

      {/* Hero - 놀이터 느낌 */}
      <section className="relative overflow-hidden border-b-4 border-black bg-gradient-to-br from-pink-100 via-amber-50 to-cyan-100 py-16">
        {/* 격자 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #000 1px, transparent 1px),
              linear-gradient(#000 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* 떠다니는 스티커들 */}
          {mounted && (
            <>
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [5, 10, 5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-2 top-8 rounded-lg border-3 border-black bg-pink-300 px-3 py-1.5 text-xs font-black shadow-[3px_3px_0_0_#000] sm:left-[5%]"
              >
                ✨ NEW
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0], rotate: [-5, -10, -5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute right-4 top-4 rounded-full border-3 border-black bg-cyan-300 px-3 py-1.5 text-xs font-black shadow-[3px_3px_0_0_#000] sm:right-[10%]"
              >
                🔥 HOT
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-[10%] text-4xl"
              >
                ⭐
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute bottom-20 right-[15%] text-3xl"
              >
                💫
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute right-[5%] top-1/2 text-2xl"
              >
                🌟
              </motion.div>
            </>
          )}

          {/* 메인 타이틀 */}
          <div className="relative z-10 py-8 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* 타이틀 뱃지 */}
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-6 inline-block rounded-xl border-3 border-black bg-white px-4 py-2 shadow-[4px_4px_0_0_#000]"
              >
                <span className="text-sm font-bold">🎯 심리테스트 정거장</span>
              </motion.div>

              <h1
                className="mb-4 text-5xl font-black tracking-tight sm:text-7xl"
                style={{ textShadow: "4px 4px 0 #fcd34d" }}
              >
                나를 발견하는
                <br />
                <span className="relative inline-block">
                  테스트들
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -right-10 -top-2 text-3xl"
                  >
                    !
                  </motion.span>
                </span>
              </h1>

              <p className="text-base text-gray-600 sm:text-lg">
                심리테스트부터 레트로 감성까지,{" "}
                <span className="font-bold text-black">골라서 즐겨요</span> 🎮
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Identity 섹션 */}
      <section className="relative border-b-4 border-black bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* 섹션 헤더 - 스티커 느낌 */}
          <div className="mb-8 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-lg border-3 border-black bg-violet-300 px-3 py-2 shadow-[3px_3px_0_0_#000]"
              >
                <span className="text-lg">🔮</span>
              </motion.div>
              <div>
                <h2 className="text-3xl font-black sm:text-4xl">Identity</h2>
                <p className="text-sm text-gray-500">나를 정의하는 질문들</p>
              </div>
            </div>
            <span className="rounded-full border-2 border-black bg-violet-100 px-3 py-1 text-sm font-bold">
              {identityContents.length}개
            </span>
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {identityContents.map((content, i) => (
              <IdentityCard key={content.id} content={content} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Retro 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-100 via-amber-50 to-pink-100 py-12">
        {/* 도트 패턴 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* 섹션 헤더 */}
          <div className="mb-8 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-lg border-3 border-black bg-cyan-300 px-3 py-2 shadow-[3px_3px_0_0_#000]"
              >
                <span className="text-lg">🕹️</span>
              </motion.div>
              <div>
                <h2 className="text-3xl font-black sm:text-4xl">Retro</h2>
                <p className="text-sm text-gray-500">90년대 감성 테스트</p>
              </div>
            </div>
            <span className="rounded-full border-2 border-black bg-cyan-100 px-3 py-1 text-sm font-bold">
              {retroContents.length}개
            </span>
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {retroContents.map((content, i) => (
              <RetroCard key={content.id} content={content} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Y2K 섹션 */}
      <section className="relative overflow-hidden border-b-4 border-black bg-gradient-to-br from-fuchsia-200 via-cyan-100 to-yellow-100 py-12">
        {/* Y2K 스타일 패턴 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #FF00FF 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, #00FFFF 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, #FFFF00 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px, 40px 40px, 50px 50px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* 섹션 헤더 */}
          <div className="mb-8 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="rounded-lg border-3 border-black bg-gradient-to-br from-fuchsia-400 to-cyan-400 px-3 py-2 shadow-[3px_3px_0_0_#000]"
              >
                <span className="text-lg">💿</span>
              </motion.div>
              <div>
                <h2 className="text-3xl font-black sm:text-4xl">Y2K</h2>
                <p className="text-sm text-gray-500">2000년대 추억 테스트</p>
              </div>
            </div>
            <span className="rounded-full border-2 border-black bg-gradient-to-r from-fuchsia-200 to-cyan-200 px-3 py-1 text-sm font-bold">
              {y2kContents.length}개
            </span>
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {y2kContents.map((content, i) => (
              <Y2KCard key={content.id} content={content} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <motion.p
            className="font-bold text-white"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            V-STATION ★ 2025
          </motion.p>
          <p className="mt-2 text-sm text-gray-500">
            매주 새로운 테스트가 추가됩니다 🎉
          </p>
        </div>
      </footer>
    </div>
  );
}

// Identity 카드 - 뽀짝한 프레임 + 데모 배경 (성능 최적화)
function IdentityCard({ content, index }: { content: Content; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-50px" });

  return (
    <Link href={`/quiz/${content.slug}`}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: Math.min(index * 0.05, 0.2) }}
        whileHover={{ y: -6, rotate: 1 }}
        className="group relative"
      >
        {/* 카드 프레임 */}
        <div className="relative h-[140px] sm:h-[200px] overflow-hidden rounded-xl sm:rounded-2xl border-2 sm:border-3 border-black bg-white shadow-[3px_3px_0_0_#000] sm:shadow-[5px_5px_0_0_#000] transition-shadow hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[7px_7px_0_0_#000]">
          {/* 데모 배경 - isInView일 때만 애니메이션 */}
          <div className="absolute inset-0">
            <IdentityCardBackground slug={content.slug} isAnimating={isInView} />
          </div>

          {/* 콘텐츠 오버레이 */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
            <h3 className="mb-1 text-lg font-black text-white">{content.title}</h3>
            <p className="text-xs text-white/70 line-clamp-2">{content.description}</p>
          </div>

          {/* 호버 시 화살표 */}
          <div className="absolute right-3 top-3 rounded-full border-2 border-white bg-black px-3 py-1 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
            GO →
          </div>
        </div>

        {/* 카테고리 스티커 - 정적으로 변경 */}
        <div className="absolute -left-2 -top-2 z-10 rounded-lg border-2 border-black bg-violet-300 px-2 py-1 text-[10px] font-bold shadow-[2px_2px_0_0_#000] -rotate-3">
          🔮 Identity
        </div>
      </motion.div>
    </Link>
  );
}

// Identity 배경 데모 (성능 최적화 - isAnimating prop 추가)
function IdentityCardBackground({ slug, isAnimating }: { slug: string; isAnimating: boolean }) {
  switch (slug) {
    case "soul-color":
      return (
        <div className="h-full w-full">
          <motion.div
            animate={isAnimating ? {
              background: [
                "linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b)",
                "linear-gradient(90deg, #f59e0b, #8b5cf6, #06b6d4)",
                "linear-gradient(135deg, #06b6d4, #ec4899, #8b5cf6)",
              ],
            } : undefined}
            initial={{ background: "linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b)" }}
            transition={{ duration: 5, repeat: Infinity }}
            className="h-full w-full"
          />
          <div className="absolute left-1/2 top-1/3 h-24 w-24 -translate-x-1/2 rounded-full bg-white/40 blur-2xl" />
        </div>
      );

    case "personal-font":
      return (
        <div className="flex h-full w-full flex-wrap items-center justify-center gap-3 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
          {["Aa", "가", "Bb", "나", "!", "?"].map((char, i) => (
            <motion.span
              key={i}
              animate={isAnimating ? { y: [0, -8, 0] } : undefined}
              transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
              className="text-3xl font-bold text-white/40"
              style={{ fontFamily: i % 2 === 0 ? "Georgia, serif" : "system-ui" }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      );

    case "brand-slogan":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-900 to-purple-900">
          <div
            className="text-5xl font-black text-pink-400"
            style={{ textShadow: "0 0 20px #f472b6, 0 0 40px #f472b6" }}
          >
            " "
          </div>
        </div>
      );

    case "minimalism-index":
      return (
        <div className="flex h-full w-full items-center justify-center bg-white">
          <motion.div
            animate={isAnimating ? { rotate: 360 } : undefined}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="relative h-24 w-24"
          >
            <div className="absolute left-1/2 top-0 h-12 w-[2px] -translate-x-1/2 bg-black" />
            <div className="absolute bottom-0 left-1/2 h-12 w-[2px] -translate-x-1/2 bg-black" />
            <div className="absolute left-0 top-1/2 h-[2px] w-12 -translate-y-1/2 bg-black" />
            <div className="absolute right-0 top-1/2 h-[2px] w-12 -translate-y-1/2 bg-black" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black" />
          </motion.div>
        </div>
      );

    case "digital-persona":
      return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 to-cyan-900">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={isAnimating ? { x: [0, i % 2 === 0 ? 4 : -4, 0], opacity: [0.4, 0.8, 0.4] } : undefined}
              initial={{ opacity: 0.6 }}
              transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.08 }}
              className="absolute text-5xl font-black"
              style={{ color: i === 0 ? "#f00" : i === 1 ? "#0f0" : "#00f", mixBlendMode: "screen" }}
            >
              @
            </motion.div>
          ))}
          {isAnimating && (
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
            />
          )}
        </div>
      );

    default:
      return (
        <div className="h-full w-full bg-gradient-to-br from-gray-700 to-gray-900">
          <div className="absolute left-1/4 top-1/4 h-20 w-20 rounded-full bg-violet-500/30 blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 h-16 w-16 rounded-full bg-cyan-500/30 blur-2xl" />
        </div>
      );
  }
}

// Retro 카드 - 뽀짝한 프레임 + 데모 (성능 최적화)
function RetroCard({ content, index }: { content: Content; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-50px" });

  return (
    <Link href={`/quiz/${content.slug}`}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: Math.min(index * 0.05, 0.2) }}
        whileHover={{ y: -6, rotate: -1 }}
        className="group relative"
      >
        {/* 카드 프레임 */}
        <div className="relative h-[140px] sm:h-[200px] overflow-hidden rounded-xl sm:rounded-2xl border-2 sm:border-3 border-black bg-white shadow-[3px_3px_0_0_#000] sm:shadow-[5px_5px_0_0_#000] transition-shadow hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[7px_7px_0_0_#000]">
          {/* 데모 배경 - isInView일 때만 애니메이션 */}
          <div className="absolute inset-0">
            <RetroCardDemo slug={content.slug} isAnimating={isInView} />
          </div>

          {/* 콘텐츠 오버레이 */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
            <h3 className="mb-1 text-lg font-black text-white">{content.title}</h3>
            <p className="text-xs text-white/70 line-clamp-2">{content.description}</p>
          </div>

          {/* 호버 시 */}
          <div className="absolute right-3 top-3 rounded-full border-2 border-white bg-black px-3 py-1 font-mono text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
            RUN.exe
          </div>
        </div>

        {/* 카테고리 스티커 - 정적으로 변경 */}
        <div className="absolute -right-2 -top-2 z-10 rounded-lg border-2 border-black bg-cyan-300 px-2 py-1 text-[10px] font-bold shadow-[2px_2px_0_0_#000] rotate-3">
          🕹️ Retro
        </div>
      </motion.div>
    </Link>
  );
}

// Retro 데모 배경 (성능 최적화 - isAnimating prop 추가)
function RetroCardDemo({ slug, isAnimating }: { slug: string; isAnimating: boolean }) {
  switch (slug) {
    case "retro-error":
      return (
        <div className="h-full w-full bg-[#008080]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040] bg-[#c0c0c0]"
              style={{ left: `${15 + i * 12}%`, top: `${10 + i * 10}%`, width: "140px" }}
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-0.5">
                <span className="text-[10px] font-bold text-white">Error</span>
                <span className="text-[10px] text-white">×</span>
              </div>
              <div className="flex items-center gap-2 p-2">
                <span className="text-xl">⚠️</span>
                <p className="text-[8px]">An error occurred.</p>
              </div>
            </div>
          ))}
        </div>
      );

    case "pixel-character":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[#1a1a2e]">
          <motion.div
            animate={isAnimating ? { y: [0, -6, 0] } : undefined}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="mb-3 grid grid-cols-5 gap-[2px]"
          >
            {[[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,1,1,1,0],[0,1,0,1,0]].flat().map((v, i) => (
              <div key={i} className={`h-2.5 w-2.5 ${v ? "bg-cyan-400" : "bg-transparent"}`} />
            ))}
          </motion.div>
          <div className="space-y-1 rounded border border-cyan-400/40 bg-black/60 p-2 text-[9px] font-mono text-cyan-400">
            <div className="flex items-center gap-2">
              <span>HP</span>
              <div className="h-1.5 w-16 bg-gray-800"><div className="h-full w-[80%] bg-green-500" /></div>
            </div>
            <div className="flex items-center gap-2">
              <span>MP</span>
              <div className="h-1.5 w-16 bg-gray-800"><div className="h-full w-[60%] bg-blue-500" /></div>
            </div>
          </div>
        </div>
      );

    case "cassette-tape":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-900 to-purple-900">
          <div className="relative h-24 w-40 rounded-lg border-4 border-gray-700 bg-gray-800 p-2">
            <div className="mx-auto mb-1 h-6 w-32 rounded bg-pink-200">
              <p className="pt-0.5 text-center text-[7px] text-pink-800">MY MIXTAPE VOL.1</p>
            </div>
            <div className="flex justify-center gap-6">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  animate={isAnimating ? { rotate: 360 } : undefined}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="relative h-10 w-10 rounded-full border-4 border-gray-600 bg-gray-900"
                >
                  <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );

    case "digital-pet":
      return (
        <div className="flex h-full w-full items-center justify-center bg-[#9bbc0f]">
          <div className="h-32 w-28 rounded-3xl border-8 border-[#6b8e23] bg-[#c4d67e] p-1.5">
            <div className="h-full rounded-lg bg-[#9bbc0f] p-2">
              <motion.div
                animate={isAnimating ? { y: [0, -4, 0] } : undefined}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="mb-1 text-center text-2xl"
              >
                🐣
              </motion.div>
              <div className="flex justify-center gap-1 text-sm">❤️🍖💤</div>
              <div className="mt-1 flex items-center gap-1 text-[7px]">
                <span>HP</span>
                <div className="flex gap-[1px]">
                  {[1,1,1,1,0].map((v, i) => (
                    <div key={i} className={`h-1.5 w-2 ${v ? "bg-[#306230]" : "bg-[#8bac0f]"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "receipt":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
          <div
            className="w-36 bg-white p-2 shadow-lg"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), 95% 100%, 90% calc(100% - 4px), 85% 100%, 80% calc(100% - 4px), 75% 100%, 70% calc(100% - 4px), 65% 100%, 60% calc(100% - 4px), 55% 100%, 50% calc(100% - 4px), 45% 100%, 40% calc(100% - 4px), 35% 100%, 30% calc(100% - 4px), 25% 100%, 20% calc(100% - 4px), 15% 100%, 10% calc(100% - 4px), 5% 100%, 0 calc(100% - 8px))" }}
          >
            <p className="mb-1 text-center font-mono text-[8px] font-bold text-gray-800">==== RECEIPT ====</p>
            <div className="space-y-0.5 font-mono text-[7px] text-gray-600">
              <div className="flex justify-between"><span>PERSONALITY</span><span>₩35,000</span></div>
              <div className="flex justify-between"><span>TASTE</span><span>₩28,000</span></div>
              <div className="flex justify-between"><span>STYLE</span><span>₩15,000</span></div>
              <div className="my-0.5 border-t border-dashed border-gray-400" />
              <div className="flex justify-between font-bold"><span>TOTAL</span><span>₩78,000</span></div>
            </div>
          </div>
        </div>
      );

    case "video-title":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="relative h-20 w-32 rounded bg-black">
            <div className="absolute inset-x-1.5 top-1.5 h-11 rounded bg-gradient-to-r from-yellow-400 to-orange-400">
              <p className="pt-0.5 text-center text-[7px] font-bold text-black">90s VIDEO</p>
              <p className="text-center font-mono text-[8px] font-bold text-black">MY LIFE STORY</p>
            </div>
            <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-3">
              <div className="h-3 w-6 rounded-sm bg-gray-800" />
              <div className="h-3 w-6 rounded-sm bg-gray-800" />
            </div>
          </div>
        </div>
      );

    case "magazine-cover":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500 to-pink-500">
          <div className="h-36 w-26 bg-white p-1.5 shadow-xl">
            <div className="h-full border border-gray-200 p-1.5">
              <p className="text-center text-sm font-black italic text-red-600" style={{ fontFamily: "Georgia, serif" }}>VOGUE</p>
              <div className="mt-1 h-16 bg-gradient-to-b from-pink-100 to-pink-200" />
              <p className="mt-0.5 text-center text-[5px] uppercase tracking-wider text-gray-500">Your Cover Story</p>
            </div>
          </div>
        </div>
      );

    case "diary-cipher":
      return (
        <div className="flex h-full w-full flex-wrap items-center justify-center gap-2 bg-gradient-to-br from-indigo-900 to-purple-900 p-6">
          {["◈", "◇", "●", "☾", "♡", "∞", "✧", "⌘"].map((symbol, i) => (
            <motion.span
              key={i}
              animate={isAnimating ? { opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] } : undefined}
              initial={{ opacity: 0.7 }}
              transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
              className="text-2xl text-purple-300"
            >
              {symbol}
            </motion.span>
          ))}
        </div>
      );

    case "scent-spectrum":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-900 to-purple-900">
          <div className="relative">
            {isAnimating && [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [-5, -40], x: [0, (i - 1) * 15], opacity: [0.5, 0], scale: [1, 1.8] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 rounded-full bg-pink-400/40 blur-md"
              />
            ))}
            <div className="relative">
              <div className="mx-auto h-3 w-3 rounded-full bg-amber-400" />
              <div className="mx-auto h-2 w-1.5 bg-amber-300" />
              <div className="mx-auto h-12 w-9 rounded-b-lg bg-gradient-to-b from-pink-300/70 to-purple-400/70" />
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-5xl opacity-40">
          📁
        </div>
      );
  }
}

// Y2K 카드 - 사이버 미래 감성 (성능 최적화)
function Y2KCard({ content, index }: { content: Content; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-50px" });

  return (
    <Link href={`/quiz/${content.slug}`}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: Math.min(index * 0.05, 0.2) }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="group relative"
      >
        {/* 카드 프레임 - Y2K 메탈릭 스타일 */}
        <div className="relative h-[140px] sm:h-[200px] overflow-hidden rounded-xl border-2 sm:border-3 border-black bg-gradient-to-br from-fuchsia-100 to-cyan-100 shadow-[3px_3px_0_0_#000] sm:shadow-[5px_5px_0_0_#000] transition-shadow hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[7px_7px_0_0_#000]">
          {/* 데모 배경 */}
          <div className="absolute inset-0">
            <Y2KCardBackground slug={content.slug} isAnimating={isInView} />
          </div>

          {/* 콘텐츠 오버레이 */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
            <h3 className="mb-1 text-lg font-black text-white">{content.title}</h3>
            <p className="text-xs text-white/70 line-clamp-2">{content.description}</p>
          </div>

          {/* 호버 시 화살표 */}
          <div className="absolute right-3 top-3 rounded-full border-2 border-fuchsia-400 bg-black px-3 py-1 text-xs font-bold text-fuchsia-400 opacity-0 transition-opacity group-hover:opacity-100">
            GO →
          </div>
        </div>

        {/* 카테고리 스티커 */}
        <div className="absolute -left-2 -top-2 z-10 rounded-lg border-2 border-black bg-gradient-to-r from-fuchsia-400 to-cyan-400 px-2 py-1 text-[10px] font-bold shadow-[2px_2px_0_0_#000] -rotate-3">
          💿 Y2K
        </div>
      </motion.div>
    </Link>
  );
}

// Y2K 배경 데모
function Y2KCardBackground({ slug, isAnimating }: { slug: string; isAnimating: boolean }) {
  switch (slug) {
    case "cyber-pet":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-500">
          <div className="relative">
            {/* 배터리 UI */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 rounded border-2 border-white/50 bg-black/30 px-2 py-1">
                <span className="text-[8px] text-white">BATTERY</span>
                <div className="flex gap-0.5">
                  {[1, 1, 1, 0].map((v, i) => (
                    <motion.div
                      key={i}
                      animate={isAnimating && v ? { opacity: [0.5, 1, 0.5] } : undefined}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                      className={`h-2 w-1.5 ${v ? "bg-green-400" : "bg-gray-600"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* 펫 */}
            <motion.div
              animate={isAnimating ? { y: [0, -8, 0], rotate: [0, 5, -5, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🐰
            </motion.div>
            {/* 상태 아이콘 */}
            <div className="mt-2 flex justify-center gap-2">
              {["❤️", "⚡", "✨"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={isAnimating ? { scale: [1, 1.3, 1] } : undefined}
                  transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                  className="text-lg"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      );

    case "flip-phone":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500">
          <div className="relative">
            {/* 폴더폰 */}
            <motion.div
              animate={isAnimating ? { rotateX: [0, -15, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ perspective: "1000px" }}
              className="relative"
            >
              {/* 상단 화면 */}
              <div className="relative z-10 h-20 w-14 rounded-t-xl border-2 border-gray-800 bg-gradient-to-b from-gray-300 to-gray-400 p-1">
                <div className="h-full rounded-t-lg bg-blue-200">
                  <div className="flex h-full flex-col items-center justify-center">
                    <span className="text-2xl">📱</span>
                    <p className="text-[6px] text-gray-600">CYWORLD</p>
                  </div>
                </div>
              </div>
              {/* 하단 키패드 */}
              <div className="relative z-0 h-16 w-14 rounded-b-xl border-2 border-t-0 border-gray-800 bg-gradient-to-b from-gray-400 to-gray-500 p-1">
                <div className="grid grid-cols-3 gap-0.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((n, i) => (
                    <div key={i} className="flex h-2.5 items-center justify-center rounded-sm bg-gray-600 text-[4px] text-white">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* 장식 */}
            <motion.div
              animate={isAnimating ? { rotate: 360 } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -right-4 -top-2 text-xl"
            >
              ⭐
            </motion.div>
          </div>
        </div>
      );

    case "messenger-status":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-teal-500">
          <div className="relative w-44">
            {/* MSN 창 */}
            <div className="overflow-hidden rounded-t-lg border-2 border-blue-900 bg-white shadow-lg">
              {/* 타이틀바 */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 px-2 py-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-xs">🦋</span>
                  <span className="text-[8px] text-white">MSN Messenger</span>
                </div>
                <div className="flex gap-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                </div>
              </div>
              {/* 내용 */}
              <div className="p-2">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <motion.div
                    animate={isAnimating ? { scale: [1, 1.2, 1] } : undefined}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-6 w-6 rounded-full bg-gradient-to-br from-green-300 to-green-500"
                  />
                  <div>
                    <p className="text-[7px] font-bold text-gray-800">★~My Status~★</p>
                    <motion.p
                      animate={isAnimating ? { opacity: [0.5, 1, 0.5] } : undefined}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-[6px] text-gray-500"
                    >
                      ♬ 오늘 기분 좋아 ~ ♬
                    </motion.p>
                  </div>
                </div>
                <div className="space-y-0.5 border-t pt-1">
                  {["🟢 Online (3)", "🟡 Away (2)", "🔴 Busy (1)"].map((status, i) => (
                    <p key={i} className="text-[6px] text-gray-600">{status}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-fuchsia-500 to-cyan-500">
          <motion.span
            animate={isAnimating ? { rotate: 360, scale: [1, 1.2, 1] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl"
          >
            💿
          </motion.span>
        </div>
      );
  }
}
