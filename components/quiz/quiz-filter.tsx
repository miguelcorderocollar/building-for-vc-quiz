"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface QuizFilterProps {
  selectedParts: number[];
  onPartChange: (parts: number[]) => void;
}

export function QuizFilter({ selectedParts, onPartChange }: QuizFilterProps) {
  const parts = [
    { value: 1, label: "Part 1: Understanding VC" },
    { value: 2, label: "Part 2: Tech Stack" },
    { value: 3, label: "Part 3: Technical Foundations" },
  ];

  const handleCheckChange = (partValue: number, checked: boolean) => {
    if (checked) {
      onPartChange([...selectedParts, partValue]);
    } else {
      onPartChange(selectedParts.filter((p) => p !== partValue));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-3">Filter by Part</h3>
        <div className="space-y-2">
          {parts.map((part) => (
            <div key={part.value} className="flex items-center space-x-2">
              <Checkbox
                id={`part-${part.value}`}
                checked={selectedParts.includes(part.value)}
                onCheckedChange={(checked) =>
                  handleCheckChange(part.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`part-${part.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {part.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {selectedParts.length > 0 && (
        <button
          onClick={() => onPartChange([])}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
