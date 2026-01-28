"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-5" />
          <span className="text-base font-semibold leading-none font-sans">Building for VC Quiz</span>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/quiz" className="text-sm font-medium transition-colors hover:text-primary">
            Quizzes
          </Link>
          <Link href="/results" className="text-sm font-medium transition-colors hover:text-primary">
            My Results
          </Link>
          <a
            href="https://github.com/miguelcorderocollar/building-for-vc-quiz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
          <Link href="/quiz" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Start Quiz
          </Link>
        </nav>

        {/* Mobile Menu Button - shown on mobile only */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger>
              <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader className="text-left">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6 px-4">
                <SheetClose asChild>
                  <Link
                    href="/quiz"
                    className="text-base font-medium transition-colors hover:text-primary py-2 text-left"
                  >
                    Quizzes
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/results"
                    className="text-base font-medium transition-colors hover:text-primary py-2 text-left"
                  >
                    My Results
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="https://github.com/miguelcorderocollar/building-for-vc-quiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium transition-colors hover:text-primary py-2 text-left flex items-center gap-2"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 mt-4 w-full"
                  >
                    Start Quiz
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
