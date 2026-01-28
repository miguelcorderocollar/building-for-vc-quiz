export type Difficulty = "beginner" | "intermediate" | "advanced";
export type QuestionType = "single" | "multiple";
export type Part = 1 | 2 | 3;

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  chapter: string;
  section?: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  sourceUrl: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  part: Part;
  chapter: string;
  totalQuestions: number;
}

export interface QuizConfig {
  quizId: string;
  questionCount: number; // 10, 25, or all
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswers: string[];
  correct: boolean;
  timestamp: number;
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  answers: QuizAnswer[];
  timeSpent?: number; // in seconds
}

export interface QuizProgress {
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  startedAt: number;
}

export interface QuizMetadata {
  quizId: string;
  attempts: number;
  bestScore: number;
  lastAttemptAt?: string;
}

export interface UserProgress {
  quizMetadata: Record<string, QuizMetadata>;
  results: QuizResult[];
}
