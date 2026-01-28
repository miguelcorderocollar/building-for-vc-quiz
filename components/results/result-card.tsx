import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { QuizResult } from "@/types/quiz";

interface ResultCardProps {
  result: QuizResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const formattedDate = new Date(result.completedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getScoreColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{result.quizTitle}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{result.total} questions</span>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(result.percentage)}`}>
            {result.percentage}%
          </div>
          <div className="text-sm text-muted-foreground">
            {result.score}/{result.total}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
          <Link href={`/results/${result.id}`} className="flex-1 inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            View Details
          </Link>
        <Link href={`/quiz/${result.quizId}`} className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Retake
          </Link>
      </div>
    </Card>
  );
}
