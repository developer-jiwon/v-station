import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "V-STATION | Psychological Test Gallery",
  description: "심리테스트 컬렉션 - 나를 발견하는 테스트들",
  openGraph: {
    title: "V-STATION | Psychological Test Gallery",
    description: "심리테스트 컬렉션 - 나를 발견하는 테스트들",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${newsreader.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
