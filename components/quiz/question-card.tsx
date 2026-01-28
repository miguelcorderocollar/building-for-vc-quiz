"use client";

import { Card } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/types/quiz";
import { ExternalLink } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswers: string[];
  onAnswerChange: (answers: string[]) => void;
  onSubmit: () => void;
  isSubmitted: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedAnswers,
  onAnswerChange,
  onSubmit,
  isSubmitted,
}: QuestionCardProps) {
  const handleSingleChoice = (value: string) => {
    if (!isSubmitted) {
      onAnswerChange([value]);
    }
  };

  const handleMultipleChoice = (optionId: string, checked: boolean) => {
    if (!isSubmitted) {
      if (checked) {
        onAnswerChange([...selectedAnswers, optionId]);
      } else {
        onAnswerChange(selectedAnswers.filter((id) => id !== optionId));
      }
    }
  };

  const isCorrect = (optionId: string) => question.correctAnswers.includes(optionId);
  const isSelected = (optionId: string) => selectedAnswers.includes(optionId);

  // Convert relative URLs to absolute
  const fullSourceUrl = question.sourceUrl.startsWith("/") 
    ? `https://buildingfor.vc${question.sourceUrl}`
    : question.sourceUrl;

  const getOptionClassName = (optionId: string) => {
    if (!isSubmitted) {
      return isSelected(optionId)
        ? "ring-2 ring-primary bg-primary/5"
        : "hover:bg-muted/50";
    }

    // After submission
    if (isCorrect(optionId) && isSelected(optionId)) {
      return "ring-2 ring-green-600 bg-green-50 dark:bg-green-950";
    }
    if (isCorrect(optionId) && !isSelected(optionId)) {
      return "ring-2 ring-green-600/50 bg-green-50/50 dark:bg-green-950/50";
    }
    if (!isCorrect(optionId) && isSelected(optionId)) {
      return "ring-2 ring-red-600 bg-red-50 dark:bg-red-950";
    }
    return "";
  };

  return (
    <Card className="p-4 md:p-8">
      <div className="space-y-4 md:space-y-6">
        {/* Question Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Question {questionNumber}</Badge>
            <Badge variant="secondary">{question.difficulty}</Badge>
            {question.type === "multiple" && (
              <Badge>Multiple Choice</Badge>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold">{question.question}</h2>
          <a
            href={fullSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            View source documentation
          </a>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.type === "single" ? (
            <RadioGroup
              value={selectedAnswers[0] || ""}
              onValueChange={handleSingleChoice}
              disabled={isSubmitted}
            >
              {question.options.map((option) => (
                <Card
                  key={option.id}
                  className={`p-3 md:p-4 cursor-pointer transition-all ${getOptionClassName(option.id)}`}
                  onClick={() => !isSubmitted && handleSingleChoice(option.id)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      value={option.id}
                      checked={isSelected(option.id)}
                      disabled={isSubmitted}
                      onChange={() => handleSingleChoice(option.id)}
                      className="h-4 w-4 mt-0.5 flex-shrink-0"
                    />
                    <label className="flex-1 cursor-pointer text-sm">
                      {option.text}
                    </label>
                  </div>
                </Card>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              {question.options.map((option) => (
                <Card
                  key={option.id}
                  className={`p-3 md:p-4 cursor-pointer transition-all ${getOptionClassName(option.id)}`}
                  onClick={() =>
                    !isSubmitted &&
                    handleMultipleChoice(option.id, !isSelected(option.id))
                  }
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={option.id}
                      checked={isSelected(option.id)}
                      onCheckedChange={(checked) =>
                        handleMultipleChoice(option.id, checked as boolean)
                      }
                      disabled={isSubmitted}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <label
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {option.text}
                    </label>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <Button
            onClick={onSubmit}
            disabled={selectedAnswers.length === 0}
            className="w-full"
            size="lg"
          >
            Check Answer
          </Button>
        )}
      </div>
    </Card>
  );
}
