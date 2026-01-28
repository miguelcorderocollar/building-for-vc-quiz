import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";

interface AnswerFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  sourceUrl: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function AnswerFeedback({
  isCorrect,
  explanation,
  sourceUrl,
  onNext,
  isLastQuestion,
}: AnswerFeedbackProps) {
  // Convert relative URLs to absolute
  const fullSourceUrl = sourceUrl.startsWith("/") 
    ? `https://buildingfor.vc${sourceUrl}`
    : sourceUrl;

  return (
    <div className="space-y-4">
      <Alert
        className={
          isCorrect
            ? "border-green-600 bg-green-50 dark:bg-green-950"
            : "border-red-600 bg-red-50 dark:bg-red-950"
        }
      >
        <div className="flex items-start gap-3">
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1 space-y-2">
            <p className="font-semibold">
              {isCorrect ? "Correct!" : "Incorrect"}
            </p>
            <p className="text-sm">{explanation}</p>
            <a
              href={fullSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              Read more in the guide
            </a>
          </div>
        </div>
      </Alert>

      <Button onClick={onNext} className="w-full" size="lg">
        {isLastQuestion ? "See Results" : "Next Question"}
      </Button>
    </div>
  );
}
