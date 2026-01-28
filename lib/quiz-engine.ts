import type { Question, QuizAnswer, QuizResult } from "@/types/quiz";

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Select random questions from a pool
export function selectRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  if (count >= questions.length) {
    return shuffleArray(questions);
  }
  return shuffleArray(questions).slice(0, count);
}

// Check if an answer is correct
export function isAnswerCorrect(
  question: Question,
  selectedAnswers: string[]
): boolean {
  if (selectedAnswers.length !== question.correctAnswers.length) {
    return false;
  }

  const sortedSelected = [...selectedAnswers].sort();
  const sortedCorrect = [...question.correctAnswers].sort();

  return sortedSelected.every((ans, idx) => ans === sortedCorrect[idx]);
}

// Calculate quiz score
export function calculateScore(answers: QuizAnswer[]): {
  score: number;
  total: number;
  percentage: number;
} {
  const score = answers.filter((a) => a.correct).length;
  const total = answers.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return { score, total, percentage };
}

// Generate performance message based on percentage
export function getPerformanceMessage(percentage: number): string {
  if (percentage >= 90) return "Outstanding! 🎉";
  if (percentage >= 80) return "Excellent work! 🌟";
  if (percentage >= 70) return "Great job! 👏";
  if (percentage >= 60) return "Good effort! 💪";
  if (percentage >= 50) return "Keep learning! 📚";
  return "Keep practicing! 🎯";
}

// Format time duration
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

// Generate shareable result URL
export function generateShareUrl(resultId: string): string {
  if (typeof window === "undefined") return "";
  const baseUrl = window.location.origin;
  return `${baseUrl}/results/${resultId}`;
}

// Generate share text for social media
export function generateShareText(result: QuizResult): string {
  const { score, total, percentage, quizTitle } = result;
  return `I scored ${score}/${total} (${percentage}%) on the "${quizTitle}" quiz! Test your VC tech knowledge at:`;
}

// Group answers by chapter/section
export function groupAnswersBySection(
  answers: QuizAnswer[],
  questions: Question[]
): Record<string, { correct: number; total: number }> {
  const grouped: Record<string, { correct: number; total: number }> = {};

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const key = question.section || question.chapter;
    if (!grouped[key]) {
      grouped[key] = { correct: 0, total: 0 };
    }

    grouped[key].total += 1;
    if (answer.correct) {
      grouped[key].correct += 1;
    }
  });

  return grouped;
}

// Generate unique result ID
export function generateResultId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
