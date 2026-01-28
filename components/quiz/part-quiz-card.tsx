"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Cpu, Wrench } from "lucide-react";
import { getQuizzesByPart } from "@/data/questions";
import { getQuizResults } from "@/lib/storage";
import type { QuizResult } from "@/types/quiz";

interface PartQuizCardProps {
  part: 1 | 2 | 3;
}

const PART_CONFIG = {
  1: {
    title: "Understanding VC",
    subtitle: "Fund structure, LP/GP roles, and data teams",
    icon: BookOpen,
    iconBg: "from-blue-500 to-blue-600",
  },
  2: {
    title: "The VC Tech Stack",
    subtitle: "CRM, research, sourcing, and operations",
    icon: Wrench,
    iconBg: "from-purple-500 to-purple-600",
  },
  3: {
    title: "Technical Foundations",
    subtitle: "Data modeling, integrations, and providers",
    icon: Cpu,
    iconBg: "from-emerald-500 to-emerald-600",
  },
};

export function PartQuizCard({ part }: PartQuizCardProps) {
  const config = PART_CONFIG[part];
  const Icon = config.icon;
  
  const partQuizzes = getQuizzesByPart(part);
  const totalQuestions = partQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0);
  
  // Use state to prevent hydration mismatch - only read from localStorage after mount
  const [bestResult, setBestResult] = useState<QuizResult | null>(null);
  const [partResults, setPartResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    // Get best score for this part's quiz
    // Synchronizing with localStorage (external system) - valid use of useEffect
    const allResults = getQuizResults();
    const filteredResults = allResults.filter((r) => r.quizId === `part-${part}`);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Reading from localStorage (external system)
    setPartResults(filteredResults);
    
    if (filteredResults.length > 0) {
      const best = filteredResults.reduce((best, curr) => 
        curr.percentage > best.percentage ? curr : best
      );
      setBestResult(best);
    }
  }, [part]);

  return (
    <Card className="relative overflow-hidden bg-card/50 hover:bg-card/80 transition-colors">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${config.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className="h-4 w-4 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-base sm:text-lg">{config.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {partQuizzes.length} chapters
              </Badge>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              {config.subtitle}
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <span>
                  <span className="text-muted-foreground">Questions: </span>
                  <span className="font-medium">{totalQuestions}</span>
                </span>
                {bestResult && (
                  <span>
                    <span className="text-muted-foreground">Best: </span>
                    <span className="font-medium text-green-600 dark:text-green-500">
                      {bestResult.percentage}%
                    </span>
                  </span>
                )}
              </div>

              <Link href={`/quiz/part/${part}`}>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  {partResults.length > 0 ? "Retake" : "Start"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
