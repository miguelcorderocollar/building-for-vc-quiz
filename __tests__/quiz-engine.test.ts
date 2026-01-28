import {
  shuffleArray,
  selectRandomQuestions,
  isAnswerCorrect,
  calculateScore,
  getPerformanceMessage,
  formatDuration,
  generateResultId,
} from "@/lib/quiz-engine";
import type { Question, QuizAnswer } from "@/types/quiz";

describe("Quiz Engine", () => {
  describe("shuffleArray", () => {
    it("should return an array of the same length", () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result).toHaveLength(input.length);
    });

    it("should contain all original elements", () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result.sort()).toEqual(input.sort());
    });

    it("should not modify the original array", () => {
      const input = [1, 2, 3, 4, 5];
      const original = [...input];
      shuffleArray(input);
      expect(input).toEqual(original);
    });
  });

  describe("selectRandomQuestions", () => {
    const mockQuestions: Question[] = [
      {
        id: "q1",
        chapter: "test",
        difficulty: "beginner",
        type: "single",
        question: "Question 1?",
        options: [{ id: "a", text: "A" }],
        correctAnswers: ["a"],
        explanation: "Test",
        sourceUrl: "https://example.com",
      },
      {
        id: "q2",
        chapter: "test",
        difficulty: "intermediate",
        type: "single",
        question: "Question 2?",
        options: [{ id: "a", text: "A" }],
        correctAnswers: ["a"],
        explanation: "Test",
        sourceUrl: "https://example.com",
      },
      {
        id: "q3",
        chapter: "test",
        difficulty: "advanced",
        type: "single",
        question: "Question 3?",
        options: [{ id: "a", text: "A" }],
        correctAnswers: ["a"],
        explanation: "Test",
        sourceUrl: "https://example.com",
      },
    ];

    it("should return requested number of questions", () => {
      const result = selectRandomQuestions(mockQuestions, 2);
      expect(result).toHaveLength(2);
    });

    it("should return all questions if count exceeds available", () => {
      const result = selectRandomQuestions(mockQuestions, 10);
      expect(result).toHaveLength(mockQuestions.length);
    });

    it("should return unique questions", () => {
      const result = selectRandomQuestions(mockQuestions, 3);
      const ids = result.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("isAnswerCorrect", () => {
    const singleChoiceQuestion: Question = {
      id: "q1",
      chapter: "test",
      difficulty: "beginner",
      type: "single",
      question: "Test?",
      options: [
        { id: "a", text: "A" },
        { id: "b", text: "B" },
      ],
      correctAnswers: ["a"],
      explanation: "Test",
      sourceUrl: "https://example.com",
    };

    const multiChoiceQuestion: Question = {
      id: "q2",
      chapter: "test",
      difficulty: "intermediate",
      type: "multiple",
      question: "Test?",
      options: [
        { id: "a", text: "A" },
        { id: "b", text: "B" },
        { id: "c", text: "C" },
      ],
      correctAnswers: ["a", "c"],
      explanation: "Test",
      sourceUrl: "https://example.com",
    };

    it("should return true for correct single choice answer", () => {
      expect(isAnswerCorrect(singleChoiceQuestion, ["a"])).toBe(true);
    });

    it("should return false for incorrect single choice answer", () => {
      expect(isAnswerCorrect(singleChoiceQuestion, ["b"])).toBe(false);
    });

    it("should return true for correct multiple choice answers", () => {
      expect(isAnswerCorrect(multiChoiceQuestion, ["a", "c"])).toBe(true);
      expect(isAnswerCorrect(multiChoiceQuestion, ["c", "a"])).toBe(true);
    });

    it("should return false for incomplete multiple choice answers", () => {
      expect(isAnswerCorrect(multiChoiceQuestion, ["a"])).toBe(false);
    });

    it("should return false for incorrect multiple choice answers", () => {
      expect(isAnswerCorrect(multiChoiceQuestion, ["a", "b"])).toBe(false);
    });
  });

  describe("calculateScore", () => {
    it("should calculate correct score", () => {
      const answers: QuizAnswer[] = [
        { questionId: "q1", selectedAnswers: ["a"], correct: true, timestamp: 1 },
        { questionId: "q2", selectedAnswers: ["b"], correct: false, timestamp: 2 },
        { questionId: "q3", selectedAnswers: ["a"], correct: true, timestamp: 3 },
      ];

      const result = calculateScore(answers);
      expect(result.score).toBe(2);
      expect(result.total).toBe(3);
      expect(result.percentage).toBe(67);
    });

    it("should handle empty answers", () => {
      const result = calculateScore([]);
      expect(result.score).toBe(0);
      expect(result.total).toBe(0);
      expect(result.percentage).toBe(0);
    });

    it("should handle perfect score", () => {
      const answers: QuizAnswer[] = [
        { questionId: "q1", selectedAnswers: ["a"], correct: true, timestamp: 1 },
        { questionId: "q2", selectedAnswers: ["b"], correct: true, timestamp: 2 },
      ];

      const result = calculateScore(answers);
      expect(result.percentage).toBe(100);
    });
  });

  describe("getPerformanceMessage", () => {
    it("should return appropriate message for different score ranges", () => {
      expect(getPerformanceMessage(95)).toContain("Outstanding");
      expect(getPerformanceMessage(85)).toContain("Excellent");
      expect(getPerformanceMessage(75)).toContain("Great");
      expect(getPerformanceMessage(65)).toContain("Good");
      expect(getPerformanceMessage(55)).toContain("Keep learning");
      expect(getPerformanceMessage(40)).toContain("Keep practicing");
    });
  });

  describe("formatDuration", () => {
    it("should format seconds only", () => {
      expect(formatDuration(45)).toBe("45s");
    });

    it("should format minutes and seconds", () => {
      expect(formatDuration(125)).toBe("2m 5s");
    });

    it("should handle exact minutes", () => {
      expect(formatDuration(120)).toBe("2m 0s");
    });
  });

  describe("generateResultId", () => {
    it("should generate unique IDs", () => {
      const id1 = generateResultId();
      const id2 = generateResultId();
      expect(id1).not.toBe(id2);
    });

    it("should return a string", () => {
      const id = generateResultId();
      expect(typeof id).toBe("string");
    });
  });
});
