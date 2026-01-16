"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Content, Option } from "@/types/content";
import { createInitialState, processAnswer } from "@/lib/quiz-engine";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { PlayfulTheme, PlayfulProgress, PlayfulCard } from "@/components/themes/PlayfulTheme";

interface QuizContainerProps {
  content: Content;
}

export function QuizContainer({ content }: QuizContainerProps) {
  const [state, setState] = useState(createInitialState());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = useCallback(
    (option: Option) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      const currentQuestion = content.questions[state.currentQuestion];

      setTimeout(() => {
        setState((prev) => processAnswer(prev, content, currentQuestion.id, option));
        setIsTransitioning(false);
      }, 300);
    },
    [content, state.currentQuestion, isTransitioning]
  );

  const handleRestart = useCallback(() => {
    setState(createInitialState());
  }, []);

  const currentQuestion = content.questions[state.currentQuestion];

  return (
    <PlayfulTheme title={content.title} subtitle={content.subtitle} slug={content.slug} theme={content.theme}>
      <AnimatePresence mode="wait">
        {state.isComplete && state.result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <QuizResult
              result={state.result}
              content={content}
              onRestart={handleRestart}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`question-${state.currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <PlayfulProgress
              current={state.currentQuestion + 1}
              total={content.questions.length}
              theme={content.theme}
            />
            <PlayfulCard slug={content.slug} theme={content.theme}>
              <QuizQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                theme={content.theme}
                disabled={isTransitioning}
              />
            </PlayfulCard>
          </motion.div>
        )}
      </AnimatePresence>
    </PlayfulTheme>
  );
}
