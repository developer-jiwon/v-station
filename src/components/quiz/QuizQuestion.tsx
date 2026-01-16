"use client";

import { motion } from "framer-motion";
import type { Question, Option, ThemeType } from "@/types/content";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (option: Option) => void;
  theme: ThemeType;
  disabled: boolean;
}

export function QuizQuestion({ question, onAnswer, theme, disabled }: QuizQuestionProps) {
  return (
    <div>
      {/* 질문 텍스트 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-xl font-black leading-relaxed text-gray-800 sm:text-2xl">
          {question.text}
        </h2>
      </motion.div>

      {/* 선택지 */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <PlayfulOptionButton
              option={option}
              onClick={() => onAnswer(option)}
              theme={theme}
              disabled={disabled}
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PlayfulOptionButton({
  option,
  onClick,
  theme,
  disabled,
  index,
}: {
  option: Option;
  onClick: () => void;
  theme: ThemeType;
  disabled: boolean;
  index: number;
}) {
  // 테마별 색상
  const colors = theme === "identity"
    ? ["bg-violet-100 hover:bg-violet-200 border-violet-300", "bg-pink-100 hover:bg-pink-200 border-pink-300", "bg-cyan-100 hover:bg-cyan-200 border-cyan-300", "bg-amber-100 hover:bg-amber-200 border-amber-300"]
    : ["bg-cyan-100 hover:bg-cyan-200 border-cyan-300", "bg-pink-100 hover:bg-pink-200 border-pink-300", "bg-lime-100 hover:bg-lime-200 border-lime-300", "bg-orange-100 hover:bg-orange-200 border-orange-300"];

  const colorClass = colors[index % colors.length];
  const labels = ["A", "B", "C", "D"];

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02, x: disabled ? 0 : 4 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative w-full rounded-xl border-2 border-black p-4 text-left
        shadow-[3px_3px_0_0_#000] transition-all
        hover:shadow-[5px_5px_0_0_#000]
        active:shadow-[1px_1px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px]
        disabled:cursor-not-allowed disabled:opacity-50
        ${colorClass}
      `}
    >
      <div className="flex items-center gap-3">
        {/* 라벨 */}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white text-sm font-black">
          {labels[index]}
        </span>

        {/* 텍스트 */}
        <span className="flex-1 text-sm font-medium text-gray-800 sm:text-base">
          {option.text}
        </span>

        {/* 화살표 (호버시) */}
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-lg opacity-0 transition-opacity group-hover:opacity-100"
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
}
