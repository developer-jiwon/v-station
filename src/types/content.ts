export type ThemeType = "identity" | "dev" | "retro";

export type LogicType = "score" | "condition";

export interface Option {
  id: string;
  text: string;
  score?: Record<string, number>;
  condition?: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface ResultType {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  colors?: string[];
  traits?: string[];
  tags?: string[];
  imageData?: Record<string, string>;
  minScore?: number;
  maxScore?: number;
  conditions?: string[];
}

export interface Content {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  theme: ThemeType;
  logicType: LogicType;
  questions: Question[];
  results: ResultType[];
  shareText: string;
  ogImage?: string;
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<string, string>;
  scores: Record<string, number>;
  isComplete: boolean;
  result: ResultType | null;
}
