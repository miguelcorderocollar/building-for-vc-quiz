import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { QuizAnswer, Question } from "@/types/quiz";
import { groupAnswersBySection } from "@/lib/quiz-engine";

interface ScoreBreakdownProps {
  answers: QuizAnswer[];
  questions: Question[];
}

export function ScoreBreakdown({ answers, questions }: ScoreBreakdownProps) {
  const grouped = groupAnswersBySection(answers, questions);
  const sections = Object.entries(grouped);

  if (sections.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Performance by Topic</h3>
      <div className="space-y-4">
        {sections.map(([section, stats], index) => {
          const percentage = Math.round((stats.correct / stats.total) * 100);
          return (
            <div key={section}>
              {index > 0 && <Separator className="my-4" />}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">
                    {section.replace(/-/g, " ")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stats.correct}/{stats.total} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      percentage >= 70
                        ? "bg-green-600"
                        : percentage >= 50
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
