"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultCard } from "@/components/results/result-card";
import { getQuizResults, clearAllProgress } from "@/lib/storage";
import type { QuizResult } from "@/types/quiz";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function ResultsHistoryPage() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showClearDialog, setShowClearDialog] = useState(false);

  useEffect(() => {
    setResults(getQuizResults());
  }, []);

  const handleClearHistory = () => {
    clearAllProgress();
    setResults([]);
    setShowClearDialog(false);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Quiz History</h1>
            <p className="text-lg text-muted-foreground">
              Review your past quiz attempts
            </p>
          </div>

          {results.length > 0 && (
            <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
              <DialogTrigger
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Clear All History?</DialogTitle>
                  <DialogDescription>
                    This will permanently delete all your quiz results and progress. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowClearDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleClearHistory}>
                    Clear All
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {results.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-semibold mb-2">No quizzes taken yet</h2>
            <p className="text-muted-foreground mb-6">
              Start your first quiz to see your results here
            </p>
            <Link href="/quiz" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Browse Quizzes
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
