import { Card } from "@/components/ui/card";
import { BookOpen, Settings, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Coverage",
    description: "3 parts, 28 chapters, 360+ questions covering everything from fund basics to technical implementation",
  },
  {
    icon: Settings,
    title: "Flexible Quizzes",
    description: "Choose from Quick (10), Standard (25), or Comprehensive (all available) question sets",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Save results locally, review performance by topic, and share your achievements",
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-20 border-t">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Use This Quiz Platform?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
