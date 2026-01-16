"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import type { Content, ResultType, ThemeType } from "@/types/content";

interface QuizResultProps {
  result: ResultType;
  content: Content;
  onRestart: () => void;
}

export function QuizResult({ result, content, onRestart }: QuizResultProps) {
  const resultRef = useRef<HTMLDivElement>(null);

  const handleShare = useCallback(async () => {
    if (!resultRef.current) return;

    try {
      const dataUrl = await toPng(resultRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `${content.slug}-result.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  }, [content.slug]);

  const handleCopyLink = useCallback(() => {
    const url = `${window.location.origin}/quiz/${content.slug}`;
    navigator.clipboard.writeText(url);
  }, [content.slug]);

  const themeColor = content.theme === "identity" ? "violet" : "cyan";

  return (
    <div>
      {/* 결과 카드 */}
      <motion.div
        ref={resultRef}
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative mb-8 overflow-hidden rounded-2xl border-3 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]"
      >
        {/* 배경 장식 */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-pink-200 to-violet-200 opacity-50 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-200 to-yellow-200 opacity-50 blur-2xl" />

        <div className="relative">
          {/* 컬러칩 */}
          {result.colors && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex justify-center gap-3"
            >
              {result.colors.map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  className="h-14 w-14 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </motion.div>
          )}

          {/* 서브타이틀 */}
          {result.subtitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-2 text-center"
            >
              <span className={`inline-block rounded-full border-2 border-black bg-${themeColor}-200 px-3 py-1 text-xs font-bold`}>
                {result.subtitle}
              </span>
            </motion.div>
          )}

          {/* 메인 타이틀 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-4 text-center text-2xl font-black text-gray-900 sm:text-3xl"
            style={{ textShadow: "2px 2px 0 #fcd34d" }}
          >
            {result.title}
          </motion.h2>

          {/* 설명 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6 whitespace-pre-line text-center text-sm leading-relaxed text-gray-600"
          >
            {result.description}
          </motion.p>

          {/* 특성 태그 */}
          {result.traits && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-4 flex flex-wrap justify-center gap-2"
            >
              {result.traits.map((trait, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05, type: "spring" }}
                  className={`rounded-lg border-2 border-black bg-${themeColor}-100 px-3 py-1 text-xs font-bold shadow-[2px_2px_0_0_#000]`}
                >
                  {trait}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* 해시태그 */}
          {result.tags && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {result.tags.map((tag, i) => (
                <span key={i} className="text-xs font-medium text-gray-400">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* V-STATION 로고 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <span className="text-xs font-bold text-gray-300">V-STATION ★</span>
          </motion.div>
        </div>

        {/* 결과 스티커 */}
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute -right-2 -top-2 rounded-lg border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-black shadow-[2px_2px_0_0_#000]`}
        >
          ⭐ 결과
        </motion.div>
      </motion.div>

      {/* 액션 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="flex flex-col gap-3 sm:flex-row sm:justify-center"
      >
        <PlayfulButton onClick={handleShare} variant="primary">
          📸 이미지 저장
        </PlayfulButton>
        <PlayfulButton onClick={handleCopyLink} variant="secondary">
          🔗 링크 복사
        </PlayfulButton>
        <PlayfulButton onClick={onRestart} variant="secondary">
          🔄 다시 하기
        </PlayfulButton>
      </motion.div>

      {/* 공유 텍스트 */}
      {content.shareText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-6 text-center text-xs text-gray-400"
        >
          {content.shareText}
        </motion.p>
      )}
    </div>
  );
}

function PlayfulButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) {
  const baseStyles = `
    rounded-xl border-2 border-black px-6 py-3 text-sm font-bold
    shadow-[3px_3px_0_0_#000] transition-all
    hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5
    active:shadow-[1px_1px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px]
  `;

  const variants = {
    primary: "bg-yellow-300 text-black",
    secondary: "bg-white text-gray-800",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </motion.button>
  );
}
