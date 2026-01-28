"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getQuizzesByPart } from "@/data/questions";
import { ArrowLeft, BookOpen, Wrench, Cpu } from "lucide-react";
import Link from "next/link";

const PART_CONFIG = {
  1: {
    title: "Understanding VC",
    description: "Test your knowledge on VC fund structure, LP/GP roles, capital lifecycle, common mistakes, and building data teams.",
    icon: BookOpen,
    iconBg: "from-blue-500 to-blue-600",
  },
  2: {
    title: "The VC Tech Stack",
    description: "Challenge yourself on CRM systems, research platforms, sourcing tools, fund operations, portfolio support, and more.",
    icon: Wrench,
    iconBg: "from-purple-500 to-purple-600",
  },
  3: {
    title: "Technical Foundations",
    description: "Dive into data modeling, entity resolution, data quality, warehousing, integrations, data providers, and emerging trends.",
    icon: Cpu,
    iconBg: "from-emerald-500 to-emerald-600",
  },
};

interface QuestionCountOption {
  value: number;
  label: string;
  description: string;
}

interface PageProps {
  params: Promise<{ partNum: string }>;
}

export default function PartQuizConfigPage({ params }: PageProps) {
  const { partNum } = use(params);
  const partNumber = parseInt(partNum) as 1 | 2 | 3;
  const router = useRouter();
  const [selectedCount, setSelectedCount] = useState(20);
  
  // Validate part number
  if (![1, 2, 3].includes(partNumber)) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <Card className="p-12 text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid Part</h1>
          <p className="text-muted-foreground mb-6">
            Please select a valid part (1, 2, or 3).
          </p>
          <Link href="/quiz" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Browse Quizzes
          </Link>
        </Card>
      </div>
    );
  }

  const config = PART_CONFIG[partNumber];
  const Icon = config.icon;
  const partQuizzes = getQuizzesByPart(partNumber);
  const totalQuestions = partQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0);

  const options: QuestionCountOption[] = [
    {
      value: 10,
      label: "Quick",
      description: "10 questions • ~5 min",
    },
    {
      value: 20,
      label: "Standard",
      description: "20 questions • ~10 min",
    },
    {
      value: Math.min(50, totalQuestions),
      label: "Comprehensive",
      description: `${Math.min(50, totalQuestions)} questions • ~${Math.ceil(Math.min(50, totalQuestions) / 2)} min`,
    },
  ];

  const handleStart = () => {
    router.push(`/quiz/part/${partNumber}/play?count=${selectedCount}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
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
          <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${config.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold">{config.title}</h1>
              <Badge variant="secondary">{totalQuestions} questions</Badge>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              {config.description}
            </p>
          </div>
        </div>

        {/* Question Count Selector */}
        <Card className="p-4 sm:p-6">
          <h3 className="font-semibold mb-3">Choose Quiz Length</h3>
          <div className="grid gap-2 sm:gap-3">
            {options.map((option) => (
              <Card
                key={option.value}
                className={`p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedCount === option.value
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedCount(option.value)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sm sm:text-base">{option.label}</span>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-full border-2 shrink-0 ${
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
        </Card>

        {/* Chapters included */}
        <Card className="p-3 sm:p-4 bg-muted/50 border-dashed">
          <p className="text-xs sm:text-sm text-muted-foreground">
            <strong>Chapters:</strong> {partQuizzes.map(q => q.title).join(", ")}
          </p>
        </Card>

        {/* Start Button */}
        <div className="flex gap-3">
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
