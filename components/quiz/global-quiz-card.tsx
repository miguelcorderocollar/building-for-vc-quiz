"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Sparkles } from "lucide-react";
import { getTotalQuestions } from "@/data/questions";
import { getQuizResults } from "@/lib/storage";

export function GlobalQuizCard() {
  const totalQuestions = getTotalQuestions();
  
  // Get best score for global quiz
  const allResults = getQuizResults();
  const globalResults = allResults.filter((r) => r.quizId === "global");
  const bestResult = globalResults.length > 0
    ? globalResults.reduce((best, curr) => 
        curr.percentage > best.percentage ? curr : best
      )
    : null;

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="relative p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
            <Globe className="h-6 w-6 text-primary-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-xl">Global Quiz</h3>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                All Topics
              </Badge>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">
              Challenge yourself with questions from every chapter. Choose 10, 20, or 50 
              questions randomly selected from {totalQuestions} total questions.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Questions: </span>
                <span className="font-medium">{totalQuestions}</span>
              </div>
              {bestResult && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Best: </span>
                  <span className="font-medium text-green-600 dark:text-green-500">
                    {bestResult.percentage}%
                  </span>
                </div>
              )}
              {globalResults.length > 0 && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Attempts: </span>
                  <span className="font-medium">{globalResults.length}</span>
                </div>
              )}
            </div>

            {/* Button */}
            <Link href="/quiz/global">
              <Button className="w-full sm:w-auto">
                {globalResults.length > 0 ? "Take Global Quiz" : "Start Global Quiz"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
