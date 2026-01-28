import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-2">VC Quiz Platform</h3>
            <p className="text-sm text-muted-foreground">
              Test your knowledge of venture capital technology and fund operations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-foreground">
                  Browse Quizzes
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-muted-foreground hover:text-foreground">
                  My Results
                </Link>
              </li>
              <li>
                <a
                  href="https://buildingfor.vc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Read the Guide
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/miguelcorderocollar/building-for-vc-quiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Quiz Platform GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/alexpatow/building-for-vc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Original GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/alexpatow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Author: Alex Patow
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-xs text-muted-foreground text-center">
            Based on{" "}
            <a
              href="https://buildingfor.vc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Building for VC
            </a>{" "}
            by{" "}
            <a
              href="https://www.linkedin.com/in/alexpatow/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Alex Patow
            </a>
            . Licensed under MIT. This quiz platform is not affiliated with the original authors.
          </p>
        </div>
      </div>
    </footer>
  );
}
