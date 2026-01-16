"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import type { Content, ResultType } from "@/types/content";

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

  // 테스트별 커스텀 결과 UI
  const renderCustomResult = () => {
    switch (content.slug) {
      case "soul-color":
        return <SoulColorResult result={result} />;
      case "cyber-pet":
        return <CyberPetResult result={result} />;
      case "flip-phone":
        return <FlipPhoneResult result={result} />;
      case "messenger-status":
        return <MessengerResult result={result} />;
      case "video-title":
        return <VideoTitleResult result={result} />;
      case "brand-slogan":
        return <BrandSloganResult result={result} />;
      case "magazine-cover":
        return <MagazineCoverResult result={result} />;
      case "personal-font":
        return <PersonalFontResult result={result} />;
      case "cassette-tape":
        return <CassetteTapeResult result={result} />;
      default:
        return <DefaultResult result={result} content={content} />;
    }
  };

  return (
    <div>
      {/* 결과 카드 */}
      <motion.div
        ref={resultRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative mb-8 overflow-hidden rounded-2xl border-3 border-black shadow-[6px_6px_0_0_#000]"
      >
        {renderCustomResult()}
      </motion.div>

      {/* 액션 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
    </div>
  );
}

// ========== 테스트별 커스텀 결과 UI ==========

// Soul Color - 그라데이션 컬러 카드
function SoulColorResult({ result }: { result: ResultType }) {
  const colors = result.colors || ["#FF6B6B", "#4ECDC4", "#FFE66D"];
  const gradient = `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]}, ${colors[2] || colors[0]})`;

  return (
    <div className="relative min-h-[450px] p-6" style={{ background: gradient }}>
      {/* 빛나는 효과 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        {/* 컬러 팔레트 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex gap-2 mb-6"
        >
          {colors.map((color, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
              style={{ backgroundColor: color }}
            />
          ))}
        </motion.div>

        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm opacity-80 mb-2">당신의 영혼 컬러는</p>
          <h2 className="text-4xl font-black mb-2 drop-shadow-lg">{result.title}</h2>
          <p className="text-lg font-bold opacity-90 mb-6">{result.subtitle}</p>
        </motion.div>

        {/* 설명 - 카드 형태 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 max-w-sm"
        >
          <p className="text-sm leading-relaxed whitespace-pre-line">{result.description}</p>
        </motion.div>

        {/* 해시태그 */}
        {result.tags && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            {result.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-white/30 rounded-full px-3 py-1">{tag}</span>
            ))}
          </motion.div>
        )}

        {/* 로고 */}
        <p className="absolute bottom-4 text-xs opacity-50">V-STATION ★ soul-color</p>
      </div>
    </div>
  );
}

// Cyber Pet - 다마고치 스타일
function CyberPetResult({ result }: { result: ResultType }) {
  const colors = result.colors || ["#FF00FF", "#00FFFF", "#FFFF00"];

  return (
    <div className="min-h-[450px] p-6 bg-gradient-to-br from-fuchsia-500 via-violet-600 to-cyan-500">
      <div className="flex flex-col items-center justify-center h-full">
        {/* 사이버펫 디바이스 */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="relative bg-gradient-to-b from-pink-300 to-pink-400 rounded-[40px] p-4 border-4 border-pink-600 shadow-2xl"
        >
          {/* 화면 */}
          <div className="bg-[#9bbc0f] rounded-2xl p-4 w-64 border-4 border-[#6b8e23]">
            {/* 상태바 */}
            <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-[#306230]">
              <span>CYBER PET v2.0</span>
              <span>♥♥♥</span>
            </div>

            {/* 펫 이모지 */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl text-center mb-3"
            >
              {result.title.includes("하이퍼") ? "🐰" :
               result.title.includes("슬리피") ? "🐱" :
               result.title.includes("젠") ? "🐢" : "🐙"}
            </motion.div>

            {/* 스탯 */}
            <div className="space-y-2 font-mono text-[10px] text-[#306230]">
              <div className="flex items-center gap-2">
                <span>HP</span>
                <div className="flex gap-0.5">
                  {[1,1,1,1,0].map((v, i) => (
                    <div key={i} className={`w-4 h-2 ${v ? "bg-[#306230]" : "bg-[#8bac0f]"}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>MP</span>
                <div className="flex gap-0.5">
                  {[1,1,1,0,0].map((v, i) => (
                    <div key={i} className={`w-4 h-2 ${v ? "bg-[#306230]" : "bg-[#8bac0f]"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* 타입 */}
            <div className="mt-3 text-center">
              <p className="text-[#306230] font-bold text-sm">{result.title}</p>
              <p className="text-[#306230] text-[10px]">{result.subtitle}</p>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex justify-center gap-4 mt-3">
            {["●", "●", "●"].map((btn, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-pink-600 border-2 border-pink-800" />
            ))}
          </div>
        </motion.div>

        {/* 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-white text-center max-w-sm"
        >
          <p className="text-sm leading-relaxed whitespace-pre-line bg-black/30 rounded-xl p-4">
            {result.description}
          </p>
        </motion.div>

        {/* 해시태그 */}
        {result.tags && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {result.tags.map((tag, i) => (
              <span key={i} className="text-xs text-white/80 bg-white/20 rounded-full px-3 py-1">{tag}</span>
            ))}
          </div>
        )}

        <p className="mt-4 text-xs text-white/50">V-STATION ★ cyber-pet</p>
      </div>
    </div>
  );
}

// Flip Phone - 폴더폰 화면
function FlipPhoneResult({ result }: { result: ResultType }) {
  return (
    <div className="min-h-[480px] p-6 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center">
      <motion.div
        initial={{ rotateY: -90 }}
        animate={{ rotateY: 0 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="relative"
        style={{ perspective: "1000px" }}
      >
        {/* 폴더폰 상단 (화면) */}
        <div className="w-52 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-3xl p-3 border-4 border-gray-600">
          <div className="bg-blue-100 rounded-xl p-3 h-56 overflow-hidden">
            {/* 상태바 */}
            <div className="flex justify-between text-[8px] text-gray-500 mb-2">
              <span>📶 SKT</span>
              <span>오후 3:42</span>
              <span>🔋</span>
            </div>

            {/* 결과 내용 */}
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                {result.title.includes("인싸") ? "🌟" :
                 result.title.includes("쿨한") ? "😎" :
                 result.title.includes("감성") ? "💕" : "🔮"}
              </motion.div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">{result.title}</h3>
              <p className="text-[10px] text-gray-600 mb-2">{result.subtitle}</p>

              {/* 폴더폰 스타일 메시지 */}
              <div className="bg-white rounded-lg p-2 text-[9px] text-left text-gray-700 leading-relaxed max-h-24 overflow-hidden">
                {result.description.split("\n")[0]}
              </div>
            </div>
          </div>
        </div>

        {/* 힌지 */}
        <div className="w-52 h-2 bg-gradient-to-b from-gray-600 to-gray-700" />

        {/* 폴더폰 하단 (키패드) */}
        <div className="w-52 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-3xl p-3 border-4 border-t-0 border-gray-600">
          <div className="grid grid-cols-3 gap-1">
            {[1,2,3,4,5,6,7,8,9,"*",0,"#"].map((key, i) => (
              <div key={i} className="bg-gray-500 rounded text-white text-[10px] py-1.5 text-center font-bold">
                {key}
              </div>
            ))}
          </div>

          {/* 통화 버튼 */}
          <div className="flex justify-center gap-8 mt-2">
            <div className="w-8 h-4 bg-green-500 rounded-full" />
            <div className="w-8 h-4 bg-red-500 rounded-full" />
          </div>
        </div>

        {/* 폰줄 장식 */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -right-8 top-10 text-2xl"
        >
          ⭐
        </motion.div>
      </motion.div>
    </div>
  );
}

// MSN Messenger 스타일
function MessengerResult({ result }: { result: ResultType }) {
  const colors = result.colors || ["#4169E1", "#87CEEB", "#E0FFFF"];

  return (
    <div className="min-h-[450px] p-6 bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        className="w-full max-w-sm"
      >
        {/* MSN 창 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl border-2 border-blue-800">
          {/* 타이틀바 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🦋</span>
              <span className="text-white text-sm font-bold">Windows Live Messenger</span>
            </div>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-blue-400 hover:bg-blue-300" />
              <div className="w-3 h-3 rounded-sm bg-blue-400 hover:bg-blue-300" />
              <div className="w-3 h-3 rounded-sm bg-red-500 hover:bg-red-400" />
            </div>
          </div>

          {/* 내용 */}
          <div className="p-4">
            {/* 프로필 */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
              >
                {result.title.includes("열정") ? "🔥" :
                 result.title.includes("감성") ? "💧" :
                 result.title.includes("긍정") ? "☀️" : "🌙"}
              </motion.div>
              <div>
                <p className="font-bold text-gray-800">{result.title}</p>
                <p className="text-xs text-gray-500">{result.subtitle}</p>
              </div>
              <div className="ml-auto">
                <span className="text-green-500 text-xl">●</span>
              </div>
            </div>

            {/* 상태 메시지 */}
            <div className="bg-gray-100 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-500 mb-1">♪ 상태 메시지</p>
              <p className="text-sm text-gray-700 italic">"{result.subtitle}"</p>
            </div>

            {/* 설명 - 대화형 */}
            <div className="space-y-2 text-sm">
              <div className="bg-blue-100 rounded-lg rounded-tl-none p-2 max-w-[80%]">
                <p className="text-gray-700 whitespace-pre-line text-xs">{result.description.split("\n\n")[0]}</p>
              </div>
              {result.description.split("\n\n")[1] && (
                <div className="bg-yellow-100 rounded-lg rounded-tl-none p-2 max-w-[80%]">
                  <p className="text-gray-700 text-xs">{result.description.split("\n\n")[1]}</p>
                </div>
              )}
            </div>

            {/* 해시태그 */}
            {result.tags && (
              <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t">
                {result.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] text-blue-600">{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* 하단 */}
          <div className="bg-gray-100 px-3 py-2 text-center">
            <p className="text-[10px] text-gray-400">V-STATION ★ messenger-status</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// VHS 비디오테이프 스타일
function VideoTitleResult({ result }: { result: ResultType }) {
  const colors = result.colors || ["#FFD700", "#8B4513", "#000080"];

  return (
    <div className="min-h-[450px] p-6 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
      <motion.div
        initial={{ rotateY: -30, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ type: "spring" }}
        className="relative"
        style={{ perspective: "1000px" }}
      >
        {/* VHS 케이스 */}
        <div className="w-72 bg-black rounded-lg p-2 shadow-2xl">
          {/* 라벨 */}
          <div
            className="rounded p-4 h-80"
            style={{ background: `linear-gradient(180deg, ${colors[0]}, ${colors[1] || colors[0]})` }}
          >
            {/* 상단 장식 */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-black/70">VHS</span>
              <span className="text-[10px] font-bold text-black/70">HI-FI STEREO</span>
            </div>

            {/* 장르 */}
            <div className="text-center mb-4">
              <span className="bg-black text-white px-3 py-1 text-xs font-bold">
                {result.title.includes("대서사시") ? "EPIC" :
                 result.title.includes("코미디") ? "COMEDY" :
                 result.title.includes("멜로") ? "ROMANCE" : "THRILLER"}
              </span>
            </div>

            {/* 메인 타이틀 */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-black text-black mb-1" style={{ fontFamily: "Georgia, serif" }}>
                {result.title}
              </h2>
              <p className="text-sm text-black/70">{result.subtitle}</p>
            </div>

            {/* 설명 */}
            <div className="bg-black/20 rounded p-2 mb-4">
              <p className="text-[10px] text-black/80 leading-relaxed whitespace-pre-line">
                {result.description.split("\n\n")[0]}
              </p>
            </div>

            {/* 하단 정보 */}
            <div className="flex justify-between items-end text-[8px] text-black/60">
              <span>© V-STATION 2025</span>
              <span>COLOR / 120min</span>
            </div>
          </div>

          {/* 테이프 구멍 */}
          <div className="flex justify-center gap-12 mt-2">
            <div className="w-8 h-8 rounded bg-gray-800 border-2 border-gray-700" />
            <div className="w-8 h-8 rounded bg-gray-800 border-2 border-gray-700" />
          </div>
        </div>

        {/* 팩폭 스티커 */}
        {result.description.includes("팩폭") && (
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-4 -bottom-4 bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg -rotate-12"
          >
            ⚠️ 팩폭 주의
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// 브랜드 슬로건 - 명함 스타일
function BrandSloganResult({ result }: { result: ResultType }) {
  return (
    <div className="min-h-[450px] p-6 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
      <motion.div
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="relative"
        style={{ perspective: "1000px" }}
      >
        {/* 명함 */}
        <div className="w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* 상단 컬러바 */}
          <div className="h-2 bg-gradient-to-r from-black to-gray-700" />

          <div className="p-8">
            {/* 슬로건 */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black text-center mb-2 text-gray-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {result.title}
            </motion.h2>

            {/* 서브타이틀 */}
            <p className="text-center text-gray-500 text-sm mb-6">{result.subtitle}</p>

            {/* 구분선 */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs">YOUR BRAND</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* 설명 */}
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-6">
              {result.description}
            </p>

            {/* 해시태그 */}
            {result.tags && (
              <div className="flex flex-wrap justify-center gap-2">
                {result.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 하단 */}
          <div className="bg-gray-50 px-8 py-3 text-center">
            <p className="text-[10px] text-gray-400">V-STATION ★ brand-slogan</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 매거진 커버 스타일
function MagazineCoverResult({ result }: { result: ResultType }) {
  const colors = result.colors || ["#000000", "#FF0000", "#FFFFFF"];

  return (
    <div className="min-h-[500px] p-6 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        className="relative"
      >
        {/* 매거진 */}
        <div
          className="w-72 h-96 rounded shadow-2xl overflow-hidden"
          style={{ backgroundColor: colors[2] || "#FFFFFF" }}
        >
          {/* 매거진명 */}
          <div className="pt-4 px-4">
            <h1
              className="text-4xl font-black text-center tracking-tighter"
              style={{ color: colors[0], fontFamily: "Georgia, serif" }}
            >
              {result.title.split(" ")[0]}
            </h1>
          </div>

          {/* 커버 이미지 영역 */}
          <div
            className="mx-4 my-3 h-44 rounded flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${colors[0]}22, ${colors[1]}44)` }}
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl"
            >
              {result.title.includes("WIRED") ? "🤖" :
               result.title.includes("KINFOLK") ? "🌿" :
               result.title.includes("i-D") ? "🎨" : "💼"}
            </motion.span>
          </div>

          {/* 헤드라인 */}
          <div className="px-4">
            <p
              className="text-lg font-bold mb-1"
              style={{ color: colors[0] }}
            >
              {result.subtitle}
            </p>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              {result.description.split("\n")[0]}
            </p>
          </div>

          {/* 하단 바코드 */}
          <div className="absolute bottom-3 right-3 flex items-end gap-1">
            {[1,1,0,1,1,0,1,0,1,1].map((v, i) => (
              <div key={i} className={`w-0.5 bg-black ${v ? "h-4" : "h-2"}`} />
            ))}
          </div>

          {/* 가격 */}
          <div className="absolute bottom-3 left-3 text-[8px] text-gray-400">
            V-STATION ★ ₩9,900
          </div>
        </div>

        {/* 스티커 */}
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -right-3 top-8 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
        >
          HOT!
        </motion.div>
      </motion.div>
    </div>
  );
}

// Personal Font - 타이포그래피 스타일
function PersonalFontResult({ result }: { result: ResultType }) {
  const colors = result.colors || ["#000000", "#666666", "#CCCCCC"];

  return (
    <div className="min-h-[450px] p-6 bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-sm text-center"
      >
        {/* 폰트 프리뷰 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <p className="text-8xl font-black mb-2" style={{ color: colors[0] }}>Aa</p>
          <p className="text-xl text-gray-400">가나다라</p>
        </motion.div>

        {/* 폰트 이름 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{result.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{result.subtitle}</p>
        </motion.div>

        {/* 폰트 특성 바 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-6"
        >
          {["Weight", "Contrast", "Emotion"].map((attr, i) => (
            <div key={attr} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-16 text-left">{attr}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${60 + i * 15}%` }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: colors[0] }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* 설명 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 rounded-xl p-4 text-left"
        >
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {result.description}
          </p>
        </motion.div>

        {/* 해시태그 */}
        {result.tags && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            {result.tags.map((tag, i) => (
              <span key={i} className="text-xs text-gray-400">{tag}</span>
            ))}
          </motion.div>
        )}

        <p className="mt-6 text-[10px] text-gray-300">V-STATION ★ personal-font</p>
      </motion.div>
    </div>
  );
}

// 카세트 테이프 스타일
function CassetteTapeResult({ result }: { result: ResultType }) {
  const colors = result.colors || ["#FF6B6B", "#4ECDC4", "#FFE66D"];

  return (
    <div
      className="min-h-[450px] p-6 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${colors[0]}44, ${colors[1]}44, ${colors[2]}44)` }}
    >
      <motion.div
        initial={{ rotateZ: -5, opacity: 0 }}
        animate={{ rotateZ: 0, opacity: 1 }}
        transition={{ type: "spring" }}
      >
        {/* 카세트 테이프 */}
        <div className="w-80 bg-gray-900 rounded-lg p-4 shadow-2xl">
          {/* 상단 */}
          <div className="flex justify-between text-[8px] text-gray-400 mb-2">
            <span>LUCKY CASSETTE</span>
            <span>C-90</span>
          </div>

          {/* 라벨 */}
          <div
            className="rounded p-4 mb-3"
            style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
          >
            <div className="text-center text-white">
              <p className="text-xs opacity-80 mb-1">이번 달 추천곡</p>
              <h2 className="text-2xl font-black mb-1">{result.title}</h2>
              <p className="text-sm opacity-90">{result.subtitle}</p>
            </div>
          </div>

          {/* 테이프 릴 */}
          <div className="flex justify-center gap-16 mb-3">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-white" />
              </motion.div>
            ))}
          </div>

          {/* 설명 */}
          <div className="bg-gray-800 rounded p-3">
            <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
              {result.description}
            </p>
          </div>

          {/* 해시태그 */}
          {result.tags && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {result.tags.map((tag, i) => (
                <span key={i} className="text-[10px] text-gray-500">{tag}</span>
              ))}
            </div>
          )}

          {/* 하단 */}
          <div className="text-center mt-3 text-[8px] text-gray-600">
            V-STATION ★ cassette-tape
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 기본 결과 UI (다른 테스트용)
function DefaultResult({ result, content }: { result: ResultType; content: Content }) {
  const colors = result.colors || ["#FF6B6B", "#4ECDC4", "#FFE66D"];
  const themeColor = content.theme === "identity" ? "violet" :
                     content.theme === "y2k" ? "fuchsia" : "cyan";

  return (
    <div className="relative bg-white p-6 min-h-[400px]">
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
        className="absolute -right-2 -top-2 rounded-lg border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-black shadow-[2px_2px_0_0_#000]"
      >
        ⭐ 결과
      </motion.div>
    </div>
  );
}

// ========== 공통 컴포넌트 ==========

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
