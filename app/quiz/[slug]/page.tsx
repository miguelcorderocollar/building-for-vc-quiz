"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionCountSelector } from "@/components/quiz/question-count-selector";
import { getQuizById } from "@/data/questions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function QuizConfigPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const quiz = getQuizById(slug);
  const [selectedCount, setSelectedCount] = useState(
    quiz?.totalQuestions && quiz.totalQuestions >= 10 ? 10 : quiz?.totalQuestions || 10
  );

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <Card className="p-12 text-center">
          <h1 className="text-2xl font-bold mb-2">Quiz Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The quiz you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/quiz" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Browse Quizzes
          </Link>
        </Card>
      </div>
    );
  }

  const handleStart = () => {
    router.push(`/quiz/${slug}/play?count=${selectedCount}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Back Button */}
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to quizzes
        </Link>

        {/* Quiz Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-lg text-muted-foreground">{quiz.description}</p>
        </div>

        {/* Question Count Selector */}
        <Card className="p-6">
          <QuestionCountSelector
            totalAvailable={quiz.totalQuestions}
            selected={selectedCount}
            onSelect={setSelectedCount}
          />
        </Card>

        {/* Start Button */}
        <div className="flex gap-4">
          <Button onClick={handleStart} size="lg" className="flex-1">
            Start Quiz
          </Button>
          <Link href="/quiz" className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
