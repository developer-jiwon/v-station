"use client";

import { motion } from "framer-motion";
import type { Question, Option, ThemeType } from "@/types/content";
import { IdentityButton } from "@/components/themes/IdentityTheme";
import { DevButton } from "@/components/themes/DevTheme";
import { RetroButton } from "@/components/themes/RetroTheme";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (option: Option) => void;
  theme: ThemeType;
  disabled: boolean;
}

export function QuizQuestion({ question, onAnswer, theme, disabled }: QuizQuestionProps) {
  const ButtonComponent = getButtonComponent(theme);

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={getQuestionStyles(theme)}
      >
        {question.text}
      </motion.h2>

      <div className={getOptionsContainerStyles(theme)}>
        {question.options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <OptionButton
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

function OptionButton({
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
  if (theme === "identity") {
    return (
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={onClick}
        disabled={disabled}
        className={`
          w-full rounded-xl border border-slate-200 bg-white px-6 py-4 text-left
          transition-all duration-200 hover:border-slate-300 hover:shadow-sm
          disabled:cursor-not-allowed disabled:opacity-50
        `}
      >
        <span className="text-sm text-slate-600">{option.text}</span>
      </motion.button>
    );
  }

  if (theme === "dev") {
    return (
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        whileTap={{ scale: disabled ? 1 : 0.99 }}
        onClick={onClick}
        disabled={disabled}
        className={`
          w-full rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-3
          text-left font-mono text-sm text-[#c9d1d9]
          transition-all duration-150 hover:border-[#58a6ff] hover:bg-[#161b22]
          disabled:cursor-not-allowed disabled:opacity-50
        `}
      >
        <span className="mr-2 text-[#8b949e]">[{index + 1}]</span>
        {option.text}
      </motion.button>
    );
  }

  // Retro theme
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040]
        bg-[#c0c0c0] px-4 py-3 text-left text-sm
        active:border-[#404040] active:border-b-[#dfdfdf] active:border-r-[#dfdfdf]
        disabled:cursor-not-allowed disabled:opacity-50
      `}
    >
      <span className="mr-2 text-[#000080]">▶</span>
      {option.text}
    </motion.button>
  );
}

function getButtonComponent(theme: ThemeType) {
  switch (theme) {
    case "dev":
      return DevButton;
    case "retro":
      return RetroButton;
    default:
      return IdentityButton;
  }
}

function getQuestionStyles(theme: ThemeType): string {
  switch (theme) {
    case "dev":
      return "mb-8 text-lg font-mono text-[#c9d1d9]";
    case "retro":
      return "mb-6 text-base font-bold";
    default:
      return "mb-8 text-xl font-medium text-slate-800";
  }
}

function getOptionsContainerStyles(theme: ThemeType): string {
  switch (theme) {
    case "dev":
      return "space-y-3";
    case "retro":
      return "space-y-2";
    default:
      return "space-y-4";
  }
}
