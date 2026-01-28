"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { QuestionCard } from "@/components/quiz/question-card";
import { AnswerFeedback } from "@/components/quiz/answer-feedback";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getAllQuizPaths } from "@/data/questions";
import type { Question, QuizAnswer } from "@/types/quiz";
import {
  selectRandomQuestions,
  isAnswerCorrect,
  calculateScore,
  generateResultId,
} from "@/lib/quiz-engine";
import { addQuizResult, clearCurrentQuizProgress } from "@/lib/storage";
import { X } from "lucide-react";

function GlobalQuizPlayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const count = parseInt(searchParams.get("count") || "20");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load questions from all chapters on mount
  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        setError(null);
        const quizPaths = getAllQuizPaths();
        
        // Fetch all question files in parallel
        const responses = await Promise.allSettled(
          quizPaths.map(async ({ path }) => {
            const response = await fetch(`/data/questions/${path}.json`);
            if (!response.ok) {
              console.warn(`Failed to load questions from ${path}`);
              return [];
            }
            const data = await response.json();
            // Handle both formats: { questions: [...] } and [...]
            return Array.isArray(data) ? data : data.questions || [];
          })
        );

        // Aggregate all questions from successful fetches
        const allQuestions: Question[] = responses
          .filter((result): result is PromiseFulfilledResult<Question[]> => 
            result.status === "fulfilled"
          )
          .flatMap((result) => result.value);

        if (allQuestions.length === 0) {
          throw new Error("No questions available. Please try again later.");
        }

        // Select random subset from all questions
        const selected = selectRandomQuestions(allQuestions, count);
        if (selected.length === 0) {
          throw new Error("Unable to select questions. Please try a different quiz length.");
        }
        setQuestions(selected);
        setIsLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    loadAllQuestions();
  }, [count]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <p className="text-muted-foreground">Loading global quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading Quiz</h1>
        <p className="text-muted-foreground mb-6">{error}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/quiz")}>Back to Quizzes</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
        <p className="text-muted-foreground mb-6">No questions are available for the global quiz.</p>
        <Button onClick={() => router.push("/quiz")}>Back to Quizzes</Button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswerChange = (newAnswers: string[]) => {
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correct = isAnswerCorrect(currentQuestion, selectedAnswers);
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswers,
      correct,
      timestamp: Date.now(),
    };
    setAnswers([...answers, answer]);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Quiz complete - save result and navigate
      const { score, total, percentage } = calculateScore([
        ...answers,
        {
          questionId: currentQuestion.id,
          selectedAnswers,
          correct: isAnswerCorrect(currentQuestion, selectedAnswers),
          timestamp: Date.now(),
        },
      ]);

      const resultId = generateResultId();
      const result = {
        id: resultId,
        quizId: "global",
        quizTitle: "Global Quiz",
        score,
        total,
        percentage,
        completedAt: new Date().toISOString(),
        answers: [
          ...answers,
          {
            questionId: currentQuestion.id,
            selectedAnswers,
            correct: isAnswerCorrect(currentQuestion, selectedAnswers),
            timestamp: Date.now(),
          },
        ],
      };

      addQuizResult(result);
      clearCurrentQuizProgress();
      router.push(`/results/${resultId}`);
    } else {
      // Move to next question
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswers([]);
      setIsSubmitted(false);
    }
  };

  const handleExit = () => {
    router.push("/quiz");
  };

  return (
    <>
      <div className="min-h-screen w-full bg-muted/30">
        {/* Header */}
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="w-full">
            <div className="mx-auto max-w-3xl px-4 md:px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-semibold">Global Quiz</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowExitDialog(true)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <QuizProgress current={currentIndex + 1} total={questions.length} />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="w-full">
          <div className="mx-auto max-w-3xl px-4 md:px-6 py-12 space-y-6">
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              selectedAnswers={selectedAnswers}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleSubmit}
              isSubmitted={isSubmitted}
            />

            {isSubmitted && (
              <AnswerFeedback
                isCorrect={isAnswerCorrect(currentQuestion, selectedAnswers)}
                explanation={currentQuestion.explanation}
                sourceUrl={currentQuestion.sourceUrl}
                onNext={handleNext}
                isLastQuestion={isLastQuestion}
              />
            )}
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Quiz?</DialogTitle>
            <DialogDescription>
              Your progress will not be saved. Are you sure you want to exit?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Continue Quiz
            </Button>
            <Button variant="destructive" onClick={handleExit}>
              Exit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function GlobalQuizPlayPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <p className="text-muted-foreground">Loading global quiz...</p>
      </div>
    }>
      <GlobalQuizPlayContent />
    </Suspense>
  );
}
