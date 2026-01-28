import type {
  QuizResult,
  QuizProgress,
  UserProgress,
  QuizMetadata,
} from "@/types/quiz";

const STORAGE_KEYS = {
  USER_PROGRESS: "vc-quiz-user-progress",
  CURRENT_QUIZ: "vc-quiz-current-progress",
} as const;

// User Progress Management
export function getUserProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { quizMetadata: {}, results: [] };
  }

  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
  if (!stored) {
    return { quizMetadata: {}, results: [] };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return { quizMetadata: {}, results: [] };
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
}

export function addQuizResult(result: QuizResult): void {
  const progress = getUserProgress();
  progress.results.unshift(result); // Add to beginning

  // Update metadata
  const metadata = progress.quizMetadata[result.quizId] || {
    quizId: result.quizId,
    attempts: 0,
    bestScore: 0,
  };

  metadata.attempts += 1;
  metadata.bestScore = Math.max(metadata.bestScore, result.percentage);
  metadata.lastAttemptAt = result.completedAt;

  progress.quizMetadata[result.quizId] = metadata;

  saveUserProgress(progress);
}

export function getQuizMetadata(quizId: string): QuizMetadata | null {
  const progress = getUserProgress();
  return progress.quizMetadata[quizId] || null;
}

export function getQuizResults(quizId?: string): QuizResult[] {
  const progress = getUserProgress();
  if (quizId) {
    return progress.results.filter((r) => r.quizId === quizId);
  }
  return progress.results;
}

export function clearAllProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_QUIZ);
}

// Current Quiz Progress (for resuming)
export function getCurrentQuizProgress(): QuizProgress | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_QUIZ);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveCurrentQuizProgress(progress: QuizProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_QUIZ, JSON.stringify(progress));
}

export function clearCurrentQuizProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_QUIZ);
}
