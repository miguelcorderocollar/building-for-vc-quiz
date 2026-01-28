import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTotalQuestions, QUIZZES } from "@/data/questions";

export function Hero() {
  const totalQuestions = getTotalQuestions();
  const totalChapters = QUIZZES.length;

  return (
    <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Test Your VC Tech Knowledge
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
          {totalQuestions}+ questions covering fund structure, tech stack, and technical foundations
        </p>

        {/* Original Documentation Banner */}
        <div className="mt-8 mx-auto max-w-xl">
          <a
            href="https://buildingfor.vc"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border-2 border-primary/20 bg-primary/5 p-4 transition-all hover:border-primary/40 hover:bg-primary/10"
          >
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              Based on the open-source guide
            </div>
            <div className="mt-1 text-lg font-semibold group-hover:underline">
              Building for VC
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              by Alex Patow — Read the full guide at buildingfor.vc
            </div>
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/quiz" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90">
            Start Quiz
          </Link>
          <Link href="/quiz" className="inline-flex items-center justify-center rounded-md border border-input px-8 py-3 text-lg font-medium hover:bg-accent hover:text-accent-foreground">
            Browse Topics
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold">{totalQuestions}+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Questions</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">{totalChapters}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Topics</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">5-30</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Minutes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
