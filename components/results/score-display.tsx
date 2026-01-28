"use client";

import { Card } from "@/components/ui/card";
import { getPerformanceMessage } from "@/lib/quiz-engine";

interface ScoreDisplayProps {
  score: number;
  total: number;
  percentage: number;
}

export function ScoreDisplay({ score, total, percentage }: ScoreDisplayProps) {
  const message = getPerformanceMessage(percentage);

  return (
    <Card className="p-4 md:p-8">
      <div className="text-center space-y-4 md:space-y-6">
        {/* Circular Score */}
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-32 h-32 md:w-40 md:h-40 transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
              className={`transition-all duration-1000 ${
                percentage >= 70 ? "text-green-600" : percentage >= 50 ? "text-yellow-600" : "text-red-600"
              }`}
              style={{
                strokeLinecap: "round",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl md:text-4xl font-bold">{percentage}%</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">
              {score}/{total}
            </div>
          </div>
        </div>

        {/* Performance Message */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{message}</h2>
        </div>
      </div>
    </Card>
  );
}
