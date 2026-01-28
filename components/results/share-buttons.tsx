"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTwitterShareUrl } from "@/lib/share";
import { generateShareUrl, generateShareText } from "@/lib/quiz-engine";
import type { QuizResult } from "@/types/quiz";
import { XLogo } from "@/components/shared/x-logo";

interface ShareButtonsProps {
  result: QuizResult;
}

export function ShareButtons({ result }: ShareButtonsProps) {
  const shareUrl = generateShareUrl(result.id);
  const shareText = generateShareText(result);

  const handleTwitterShare = () => {
    const url = getTwitterShareUrl(shareText, shareUrl);
    window.open(url, "_blank", "width=550,height=420");
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Share Your Score</h3>
      <div className="grid gap-3">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleTwitterShare}
        >
          <XLogo size={16} className="mr-2" />
          Share on X
        </Button>
      </div>
    </Card>
  );
}
