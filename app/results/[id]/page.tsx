"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ScoreDisplay } from "@/components/results/score-display";
import { ScoreBreakdown } from "@/components/results/score-breakdown";
import { ShareButtons } from "@/components/results/share-buttons";
import { getQuizResults } from "@/lib/storage";
import type { QuizResult, Question } from "@/types/quiz";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ResultDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [result] = useState<QuizResult | null>(() => {
    const allResults = getQuizResults();
    return allResults.find((r) => r.id === id) || null;
  });
  const [questions] = useState<Question[]>([]);

  useEffect(() => {
    if (!result) {
      // Result not found, redirect
      router.push("/results");
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <p>Loading result...</p>
      </div>
    );
  }

  const formattedDate = new Date(result.completedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link
          href="/results"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to history
        </Link>

        {/* Quiz Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{result.quizTitle}</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>

        {/* Score Display */}
        <ScoreDisplay
          score={result.score}
          total={result.total}
          percentage={result.percentage}
        />

        {/* Score Breakdown */}
        {questions.length > 0 && (
          <ScoreBreakdown answers={result.answers} questions={questions} />
        )}

        {/* Share Buttons */}
        <ShareButtons result={result} />

        {/* Actions */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/quiz/${result.quizId}`} className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Retake Quiz
            </Link>
            <Link href="/quiz" className="flex-1 inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              Try Another Quiz
            </Link>
            <Link href="/" className="flex-1 inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              Back to Home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
