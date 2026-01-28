"use client";

import { useState } from "react";
import { QuizCard } from "@/components/quiz/quiz-card";
import { QuizFilter } from "@/components/quiz/quiz-filter";
import { GlobalQuizCard } from "@/components/quiz/global-quiz-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllQuizzes, getQuizzesByPart } from "@/data/questions";
import type { Part } from "@/types/quiz";

export default function QuizSelectionPage() {
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const allQuizzes = getAllQuizzes();

  const filteredQuizzes =
    selectedParts.length > 0
      ? allQuizzes.filter((q) => selectedParts.includes(q.part))
      : allQuizzes;

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

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar Filter */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <QuizFilter
            selectedParts={selectedParts}
            onPartChange={setSelectedParts}
          />
        </aside>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Global Quiz Card */}
          <GlobalQuizCard />

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Chapters</TabsTrigger>
              <TabsTrigger value="by-part">By Part</TabsTrigger>
            </TabsList>

            {/* All Chapters */}
            <TabsContent value="all">
              {filteredQuizzes.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  No quizzes match your filters
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* By Part */}
            <TabsContent value="by-part" className="space-y-12">
              {/* Part 1 */}
              {(selectedParts.length === 0 || selectedParts.includes(1)) && (
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
              )}

              {/* Part 2 */}
              {(selectedParts.length === 0 || selectedParts.includes(2)) && (
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
              )}

              {/* Part 3 */}
              {(selectedParts.length === 0 || selectedParts.includes(3)) && (
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
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
