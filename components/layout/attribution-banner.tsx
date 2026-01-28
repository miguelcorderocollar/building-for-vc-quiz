import { Alert } from "@/components/ui/alert";
import Link from "next/link";

export function AttributionBanner() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Alert className="bg-muted/50">
        <div className="flex flex-col gap-2 text-sm">
          <p>
            <strong>Content Attribution:</strong> All quiz questions are based on the open-source{" "}
            <a
              href="https://buildingfor.vc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground font-medium"
            >
              Building for VC
            </a>{" "}
            guide by{" "}
            <a
              href="https://www.linkedin.com/in/alexpatow/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground font-medium"
            >
              Alex Patow
            </a>
            .
          </p>
          <p className="text-muted-foreground">
            We encourage you to read the full guide for comprehensive coverage of building technology for VC funds. The original content is licensed under MIT.
          </p>
        </div>
      </Alert>
    </div>
  );
}
