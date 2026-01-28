"use client";

import { QuizCard } from "@/components/quiz/quiz-card";
import { GlobalQuizCard } from "@/components/quiz/global-quiz-card";
import { PartQuizCard } from "@/components/quiz/part-quiz-card";
import { getQuizzesByPart } from "@/data/questions";

export default function QuizSelectionPage() {
  const part1Quizzes = getQuizzesByPart(1);
  const part2Quizzes = getQuizzesByPart(2);
  const part3Quizzes = getQuizzesByPart(3);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Choose Your Quiz</h1>
        <p className="text-lg text-muted-foreground">
          Select a topic to test your knowledge
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Global Quiz Card */}
        <section>
          <GlobalQuizCard />
        </section>

        {/* Part Quizzes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Quiz by Part</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <PartQuizCard part={1} />
            <PartQuizCard part={2} />
            <PartQuizCard part={3} />
          </div>
        </section>

        {/* Part 1 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Part 1: Understanding VC
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {part1Quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        {/* Part 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Part 2: The VC Tech Stack
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {part2Quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        {/* Part 3 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Part 3: Technical Foundations
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {part3Quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
