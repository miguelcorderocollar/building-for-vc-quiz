"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuestionCountOption {
  value: number;
  label: string;
  description: string;
}

interface QuestionCountSelectorProps {
  totalAvailable: number;
  selected: number;
  onSelect: (count: number) => void;
}

export function QuestionCountSelector({
  totalAvailable,
  selected,
  onSelect,
}: QuestionCountSelectorProps) {
  const getOptions = (): QuestionCountOption[] => {
    const options: QuestionCountOption[] = [];

    // Quick option (10 questions)
    if (totalAvailable >= 10) {
      options.push({
        value: 10,
        label: "Quick",
        description: "10 questions • ~5 minutes",
      });
    }

    // Standard option (25 questions)
    if (totalAvailable >= 25) {
      options.push({
        value: 25,
        label: "Standard",
        description: "25 questions • ~12 minutes",
      });
    }

    // Comprehensive option (all questions)
    options.push({
      value: totalAvailable,
      label: "Comprehensive",
      description: `${totalAvailable} questions • ~${Math.ceil(totalAvailable / 2)} minutes`,
    });

    return options;
  };

  const options = getOptions();

  return (
    <div className="space-y-3">
      <h3 className="font-semibold mb-3">Choose Quiz Length</h3>
      <div className="grid gap-3">
        {options.map((option) => (
          <Card
            key={option.value}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selected === option.value
                ? "ring-2 ring-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
            onClick={() => onSelect(option.value)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{option.label}</span>
                  {option.value === totalAvailable && (
                    <Badge variant="secondary" className="text-xs">
                      All
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
              <div
                className={`h-5 w-5 rounded-full border-2 ${
                  selected === option.value
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                }`}
              >
                {selected === option.value && (
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
  );
}
