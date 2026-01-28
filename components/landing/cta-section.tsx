import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CTASection() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-20 border-t">
      <Card className="p-12 text-center bg-muted/50 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to test your knowledge?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start with a quick 10-question quiz or dive deep into specific topics. Track your progress and see how you improve over time.
        </p>
        <Link href="/quiz" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90">
          Get Started
        </Link>
      </Card>
    </section>
  );
}
