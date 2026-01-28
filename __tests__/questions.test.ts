import { QUIZZES, getQuizById, getQuizzesByPart, getAllQuizzes, getTotalQuestions } from "@/data/questions";

describe("Questions Data", () => {
  describe("QUIZZES", () => {
    it("should have quizzes defined", () => {
      expect(QUIZZES.length).toBeGreaterThan(0);
    });

    it("should have valid quiz structure", () => {
      QUIZZES.forEach((quiz) => {
        expect(quiz).toHaveProperty("id");
        expect(quiz).toHaveProperty("title");
        expect(quiz).toHaveProperty("description");
        expect(quiz).toHaveProperty("part");
        expect(quiz).toHaveProperty("chapter");
        expect(quiz).toHaveProperty("totalQuestions");
        expect([1, 2, 3]).toContain(quiz.part);
        expect(quiz.totalQuestions).toBeGreaterThan(0);
      });
    });

    it("should have unique quiz IDs", () => {
      const ids = QUIZZES.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("getQuizById", () => {
    it("should return quiz for valid ID", () => {
      const quiz = getQuizById("what-is-a-vc-fund");
      expect(quiz).toBeDefined();
      expect(quiz?.id).toBe("what-is-a-vc-fund");
    });

    it("should return undefined for invalid ID", () => {
      const quiz = getQuizById("nonexistent-quiz");
      expect(quiz).toBeUndefined();
    });
  });

  describe("getQuizzesByPart", () => {
    it("should return quizzes for Part 1", () => {
      const quizzes = getQuizzesByPart(1);
      expect(quizzes.length).toBeGreaterThan(0);
      quizzes.forEach((quiz) => {
        expect(quiz.part).toBe(1);
      });
    });

    it("should return quizzes for Part 2", () => {
      const quizzes = getQuizzesByPart(2);
      expect(quizzes.length).toBeGreaterThan(0);
      quizzes.forEach((quiz) => {
        expect(quiz.part).toBe(2);
      });
    });

    it("should return quizzes for Part 3", () => {
      const quizzes = getQuizzesByPart(3);
      expect(quizzes.length).toBeGreaterThan(0);
      quizzes.forEach((quiz) => {
        expect(quiz.part).toBe(3);
      });
    });
  });

  describe("getAllQuizzes", () => {
    it("should return all quizzes", () => {
      const quizzes = getAllQuizzes();
      expect(quizzes).toEqual(QUIZZES);
    });
  });

  describe("getTotalQuestions", () => {
    it("should return sum of all questions", () => {
      const total = getTotalQuestions();
      const expectedTotal = QUIZZES.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
      expect(total).toBe(expectedTotal);
    });

    it("should return a positive number", () => {
      const total = getTotalQuestions();
      expect(total).toBeGreaterThan(0);
    });
  });
});
