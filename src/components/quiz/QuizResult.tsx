"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import type { Content, ResultType, ThemeType } from "@/types/content";
import { IdentityButton, IdentityCard } from "@/components/themes/IdentityTheme";
import { DevButton, DevCard, DevCodeBlock } from "@/components/themes/DevTheme";
import { RetroButton, RetroWindow, RetroErrorPopup } from "@/components/themes/RetroTheme";

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
        backgroundColor: content.theme === "dev" ? "#0d1117" : "#ffffff",
      });

      // Create download link
      const link = document.createElement("a");
      link.download = `${content.slug}-result.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  }, [content.slug, content.theme]);

  const handleCopyLink = useCallback(() => {
    const url = `${window.location.origin}/quiz/${content.slug}`;
    navigator.clipboard.writeText(url);
  }, [content.slug]);

  return (
    <div>
      <ResultCard
        ref={resultRef}
        result={result}
        content={content}
        theme={content.theme}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={getActionsStyles(content.theme)}
      >
        <ActionButtons
          theme={content.theme}
          onShare={handleShare}
          onRestart={onRestart}
          onCopyLink={handleCopyLink}
        />
      </motion.div>
    </div>
  );
}

interface ResultCardProps {
  result: ResultType;
  content: Content;
  theme: ThemeType;
}

const ResultCard = ({ ref, result, content, theme }: ResultCardProps & { ref: React.RefObject<HTMLDivElement | null> }) => {
  if (theme === "identity") {
    return (
      <IdentityCard className="mb-8">
        <div ref={ref} className="p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            {result.colors && (
              <div className="mb-6 flex justify-center gap-3">
                {result.colors.map((color, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="h-16 w-16 rounded-2xl shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}

            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              {result.subtitle}
            </span>
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              {result.title}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              {result.description}
            </p>

            {result.traits && (
              <div className="flex flex-wrap justify-center gap-2">
                {result.traits.map((trait, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            )}

            {result.tags && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {result.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </IdentityCard>
    );
  }

  if (theme === "dev") {
    return (
      <DevCard className="mb-8">
        <div ref={ref} className="p-4">
          <DevCodeBlock title="result.json">
            {`{
  "type": "${result.id}",
  "title": "${result.title}",
  "subtitle": "${result.subtitle || ""}",
  "description": "${result.description}",
  ${result.colors ? `"colors": ${JSON.stringify(result.colors)},` : ""}
  ${result.traits ? `"traits": ${JSON.stringify(result.traits)},` : ""}
  "status": "success"
}`}
          </DevCodeBlock>

          {result.colors && (
            <div className="mt-4 flex gap-2">
              {result.colors.map((color, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-mono text-xs text-[#8b949e]">{color}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DevCard>
    );
  }

  // Retro theme
  if (content.slug === "win95-error" && result.imageData) {
    return (
      <div ref={ref} className="mb-8">
        <RetroErrorPopup
          title={result.title}
          message={result.imageData.message || result.description}
          errorCode={result.imageData.errorCode}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="mb-8">
      <RetroWindow title={`Result - ${result.title}`}>
        <div className="text-center">
          {result.colors && (
            <div className="mb-4 flex justify-center gap-2">
              {result.colors.map((color, i) => (
                <div
                  key={i}
                  className="h-8 w-8 border-2 border-[#404040] border-b-[#dfdfdf] border-r-[#dfdfdf]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          <h2 className="mb-2 text-lg font-bold">{result.title}</h2>
          {result.subtitle && (
            <p className="mb-4 text-sm text-[#808080]">{result.subtitle}</p>
          )}
          <p className="mb-4 whitespace-pre-line text-sm">{result.description}</p>

          {result.traits && (
            <div className="flex flex-wrap justify-center gap-2">
              {result.traits.map((trait, i) => (
                <span
                  key={i}
                  className="bg-[#000080] px-2 py-1 text-xs text-white"
                >
                  {trait}
                </span>
              ))}
            </div>
          )}
        </div>
      </RetroWindow>
    </div>
  );
};

function ActionButtons({
  theme,
  onShare,
  onRestart,
  onCopyLink,
}: {
  theme: ThemeType;
  onShare: () => void;
  onRestart: () => void;
  onCopyLink: () => void;
}) {
  if (theme === "identity") {
    return (
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <IdentityButton onClick={onShare}>Save as Image</IdentityButton>
        <IdentityButton variant="secondary" onClick={onCopyLink}>
          Copy Link
        </IdentityButton>
        <IdentityButton variant="secondary" onClick={onRestart}>
          Try Again
        </IdentityButton>
      </div>
    );
  }

  if (theme === "dev") {
    return (
      <div className="flex flex-wrap gap-3">
        <DevButton onClick={onShare}>$ save --format=png</DevButton>
        <DevButton variant="secondary" onClick={onCopyLink}>
          $ copy --link
        </DevButton>
        <DevButton variant="secondary" onClick={onRestart}>
          $ restart
        </DevButton>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <RetroButton onClick={onShare}>Save Image</RetroButton>
      <RetroButton variant="secondary" onClick={onCopyLink}>
        Copy Link
      </RetroButton>
      <RetroButton variant="secondary" onClick={onRestart}>
        Restart
      </RetroButton>
    </div>
  );
}

function getActionsStyles(theme: ThemeType): string {
  switch (theme) {
    case "dev":
      return "mt-8";
    case "retro":
      return "mt-6";
    default:
      return "mt-8";
  }
}
