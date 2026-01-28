"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Quiz } from "@/types/quiz";
import { getQuizMetadata } from "@/lib/storage";
import type { QuizMetadata } from "@/types/quiz";
import { CheckCircle2 } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
}

export function QuizCard({ quiz }: QuizCardProps) {
  // Use state to prevent hydration mismatch - only read from localStorage after mount
  const [metadata, setMetadata] = useState<QuizMetadata | null>(null);

  useEffect(() => {
    // Synchronizing with localStorage (external system) - valid use of useEffect
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Reading from localStorage (external system)
    setMetadata(getQuizMetadata(quiz.id));
  }, [quiz.id]);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">Part {quiz.part}</Badge>
              <Badge variant="secondary">{quiz.totalQuestions} questions</Badge>
            </div>
            <h3 className="font-semibold text-lg">{quiz.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {quiz.description}
            </p>
          </div>
          {metadata && metadata.attempts > 0 && (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          )}
        </div>

        {metadata && metadata.attempts > 0 && (
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Best: </span>
              <span className="font-medium">{metadata.bestScore}%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Attempts: </span>
              <span className="font-medium">{metadata.attempts}</span>
            </div>
          </div>
        )}

          <Link href={`/quiz/${quiz.id}`} className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            {metadata && metadata.attempts > 0 ? "Retake Quiz" : "Start Quiz"}
          </Link>
      </div>
    </Card>
  );
}
