"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTotalQuestions } from "@/data/questions";
import { ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";

interface QuestionCountOption {
  value: number;
  label: string;
  description: string;
}

export default function GlobalQuizConfigPage() {
  const router = useRouter();
  const totalQuestions = getTotalQuestions();
  const [selectedCount, setSelectedCount] = useState(20);

  const options: QuestionCountOption[] = [
    {
      value: 10,
      label: "Quick",
      description: "10 questions • ~5 minutes",
    },
    {
      value: 20,
      label: "Standard",
      description: "20 questions • ~10 minutes",
    },
    {
      value: 50,
      label: "Comprehensive",
      description: "50 questions • ~25 minutes",
    },
  ];

  const handleStart = () => {
    router.push(`/quiz/global/play?count=${selectedCount}`);
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
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
            <Globe className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-4xl font-bold">Global Quiz</h1>
              <Badge variant="secondary">{totalQuestions} total questions</Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              Challenge yourself with questions from every chapter across all three parts. 
              Questions are randomly selected from the entire question bank.
            </p>
          </div>
        </div>

        {/* Question Count Selector */}
        <Card className="p-6">
          <div className="space-y-3">
            <h3 className="font-semibold mb-3">Choose Quiz Length</h3>
            <div className="grid gap-3">
              {options.map((option) => (
                <Card
                  key={option.value}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedCount === option.value
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedCount(option.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        selectedCount === option.value
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {selectedCount === option.value && (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-4 bg-muted/50 border-dashed">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> The global quiz draws questions from all {totalQuestions} questions 
            across Understanding VC, The VC Tech Stack, and Technical Foundations. Great for 
            comprehensive review or testing your overall knowledge.
          </p>
        </Card>

        {/* Start Button */}
        <div className="flex gap-4">
          <Button onClick={handleStart} size="lg" className="flex-1">
            Start Global Quiz
          </Button>
          <Link href="/quiz" className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
