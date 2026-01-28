import {
  getUserProgress,
  saveUserProgress,
  addQuizResult,
  getQuizMetadata,
  getQuizResults,
  clearAllProgress,
} from "@/lib/storage";
import type { QuizResult, UserProgress } from "@/types/quiz";

describe("Storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
  });

  describe("getUserProgress", () => {
    it("should return empty progress when nothing is stored", () => {
      const progress = getUserProgress();
      expect(progress).toEqual({ quizMetadata: {}, results: [] });
    });

    it("should return stored progress", () => {
      const mockProgress: UserProgress = {
        quizMetadata: {
          "quiz-1": {
            quizId: "quiz-1",
            attempts: 2,
            bestScore: 80,
          },
        },
        results: [],
      };
      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(mockProgress));

      const progress = getUserProgress();
      expect(progress).toEqual(mockProgress);
    });

    it("should handle invalid JSON gracefully", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("invalid json");

      const progress = getUserProgress();
      expect(progress).toEqual({ quizMetadata: {}, results: [] });
    });
  });

  describe("addQuizResult", () => {
    it("should add result and update metadata", () => {
      const result: QuizResult = {
        id: "result-1",
        quizId: "quiz-1",
        quizTitle: "Test Quiz",
        score: 8,
        total: 10,
        percentage: 80,
        completedAt: new Date().toISOString(),
        answers: [],
      };

      addQuizResult(result);

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe("getQuizResults", () => {
    it("should return all results when no quizId specified", () => {
      const mockProgress: UserProgress = {
        quizMetadata: {},
        results: [
          {
            id: "r1",
            quizId: "q1",
            quizTitle: "Quiz 1",
            score: 8,
            total: 10,
            percentage: 80,
            completedAt: new Date().toISOString(),
            answers: [],
          },
          {
            id: "r2",
            quizId: "q2",
            quizTitle: "Quiz 2",
            score: 9,
            total: 10,
            percentage: 90,
            completedAt: new Date().toISOString(),
            answers: [],
          },
        ],
      };
      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(mockProgress));

      const results = getQuizResults();
      expect(results).toHaveLength(2);
    });

    it("should filter results by quizId", () => {
      const mockProgress: UserProgress = {
        quizMetadata: {},
        results: [
          {
            id: "r1",
            quizId: "q1",
            quizTitle: "Quiz 1",
            score: 8,
            total: 10,
            percentage: 80,
            completedAt: new Date().toISOString(),
            answers: [],
          },
          {
            id: "r2",
            quizId: "q2",
            quizTitle: "Quiz 2",
            score: 9,
            total: 10,
            percentage: 90,
            completedAt: new Date().toISOString(),
            answers: [],
          },
        ],
      };
      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(mockProgress));

      const results = getQuizResults("q1");
      expect(results).toHaveLength(1);
      expect(results[0].quizId).toBe("q1");
    });
  });

  describe("clearAllProgress", () => {
    it("should clear all storage keys", () => {
      clearAllProgress();
      expect(localStorage.removeItem).toHaveBeenCalled();
    });
  });
});
