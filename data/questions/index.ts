import type { Quiz } from "@/types/quiz";

// Global quiz is a special quiz that aggregates questions from all chapters
export const GLOBAL_QUIZ: Quiz = {
  id: "global",
  title: "Global Quiz",
  description: "Test your knowledge across all topics with questions from every chapter",
  part: 0 as 1 | 2 | 3, // Special part for global quiz
  chapter: "global",
  totalQuestions: 0, // Will be calculated dynamically
};

export const QUIZZES: Quiz[] = [
  // Part 1: Understanding VC
  {
    id: "what-is-a-vc-fund",
    title: "What is a VC Fund?",
    description: "Fund structure, LP/GP roles, capital lifecycle, and key terms",
    part: 1,
    chapter: "what-is-a-vc-fund",
    totalQuestions: 20,
  },
  {
    id: "understanding-your-vc-fund",
    title: "Understanding Your VC Fund",
    description: "Fund types, investment strategies, and thesis analysis",
    part: 1,
    chapter: "understanding-your-vc-fund",
    totalQuestions: 15,
  },
  {
    id: "common-mistakes",
    title: "Common Mistakes",
    description: "Seven common mistakes when building for VC funds",
    part: 1,
    chapter: "common-mistakes",
    totalQuestions: 15,
  },
  {
    id: "hiring-your-data-team",
    title: "Hiring Your Data Team",
    description: "When and how to build your data team",
    part: 1,
    chapter: "hiring-your-data-team",
    totalQuestions: 10,
  },
  // Part 2: The VC Tech Stack
  {
    id: "tech-stack-introduction",
    title: "Tech Stack Introduction",
    description: "Understanding the VC technology landscape",
    part: 2,
    chapter: "introduction",
    totalQuestions: 10,
  },
  {
    id: "research-platforms",
    title: "Research Platforms",
    description: "Building competitive advantage through research infrastructure",
    part: 2,
    chapter: "research-platforms",
    totalQuestions: 15,
  },
  {
    id: "sourcing-tools",
    title: "Sourcing Tools",
    description: "Deal sourcing technology and when it works",
    part: 2,
    chapter: "sourcing-tools",
    totalQuestions: 15,
  },
  {
    id: "crm-and-deal-flow",
    title: "CRM and Deal Flow",
    description: "Choosing and implementing CRM systems for VC",
    part: 2,
    chapter: "crm-and-deal-flow",
    totalQuestions: 20,
  },
  {
    id: "fund-operations",
    title: "Fund Operations",
    description: "Fund operations platforms and capital management",
    part: 2,
    chapter: "fund-operations",
    totalQuestions: 15,
  },
  {
    id: "portfolio-support",
    title: "Portfolio Support",
    description: "Technology for supporting portfolio companies",
    part: 2,
    chapter: "portfolio-support",
    totalQuestions: 15,
  },
  {
    id: "fundraising",
    title: "Fundraising",
    description: "Technology and tools for fundraising",
    part: 2,
    chapter: "fundraising",
    totalQuestions: 10,
  },
  {
    id: "website-and-external-presence",
    title: "Website and External Presence",
    description: "Building your fund's online presence",
    part: 2,
    chapter: "website-and-external-presence",
    totalQuestions: 10,
  },
  {
    id: "putting-it-together",
    title: "Putting It Together",
    description: "Implementation phases and priorities",
    part: 2,
    chapter: "putting-it-together",
    totalQuestions: 10,
  },
  // Part 3: Technical Foundations
  {
    id: "choosing-your-stack",
    title: "Choosing Your Stack",
    description: "Technology stack selection for VC infrastructure",
    part: 3,
    chapter: "choosing-your-stack",
    totalQuestions: 15,
  },
  {
    id: "data-modeling",
    title: "Data Modeling",
    description: "Core entities and schema design for VC data",
    part: 3,
    chapter: "data-modeling",
    totalQuestions: 20,
  },
  {
    id: "entity-resolution",
    title: "Entity Resolution",
    description: "Matching and deduplicating entities across data sources",
    part: 3,
    chapter: "entity-resolution",
    totalQuestions: 15,
  },
  {
    id: "data-quality",
    title: "Data Quality",
    description: "Building trust in your data infrastructure",
    part: 3,
    chapter: "data-quality",
    totalQuestions: 15,
  },
  {
    id: "data-warehousing",
    title: "Data Warehousing",
    description: "Data warehouse selection and ELT with dbt",
    part: 3,
    chapter: "data-warehousing",
    totalQuestions: 15,
  },
  {
    id: "knowledge-graphs",
    title: "Knowledge Graphs",
    description: "Graph databases and GraphRAG for VC",
    part: 3,
    chapter: "knowledge-graphs",
    totalQuestions: 10,
  },
  {
    id: "integrations-and-apis",
    title: "Integrations and APIs",
    description: "Building robust API integrations",
    part: 3,
    chapter: "integrations-and-apis",
    totalQuestions: 15,
  },
  {
    id: "security-and-compliance",
    title: "Security and Compliance",
    description: "Handling sensitive data and compliance requirements",
    part: 3,
    chapter: "security-and-compliance",
    totalQuestions: 15,
  },
  {
    id: "emerging-trends",
    title: "Emerging Trends",
    description: "MCP, AI-assisted development, and file-native agents",
    part: 3,
    chapter: "emerging-trends",
    totalQuestions: 10,
  },
  // Data Providers - Combined quiz (aggregates all data provider topics)
  {
    id: "data-providers",
    title: "Data Providers",
    description: "Company, people, and signal data sources, access patterns, and vendor considerations",
    part: 3,
    chapter: "data-providers", // Special marker for combined quiz
    totalQuestions: 78, // Sum of all data provider questions
  },
];

// Data provider chapter paths for the combined quiz
export const DATA_PROVIDER_CHAPTERS = [
  "data-providers/index",
  "data-providers/accessing-data",
  "data-providers/company-data",
  "data-providers/people-data",
  "data-providers/signal-data",
  "data-providers/other-data",
  "data-providers/considerations",
  "data-providers/starter-kits",
];

export function getQuizById(id: string): Quiz | undefined {
  return QUIZZES.find((q) => q.id === id);
}

export function getQuizzesByPart(part: 1 | 2 | 3): Quiz[] {
  return QUIZZES.filter((q) => q.part === part);
}

export function getAllQuizzes(): Quiz[] {
  return QUIZZES;
}

export function getTotalQuestions(): number {
  return QUIZZES.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
}

export function getGlobalQuiz(): Quiz {
  return {
    ...GLOBAL_QUIZ,
    totalQuestions: getTotalQuestions(),
  };
}

// Get all quiz paths for loading questions (used by global quiz)
export function getAllQuizPaths(): { path: string; part: number }[] {
  const paths: { path: string; part: number }[] = [];
  
  for (const quiz of QUIZZES) {
    if (quiz.chapter === "data-providers") {
      // Expand data-providers to all individual chapter paths
      for (const chapter of DATA_PROVIDER_CHAPTERS) {
        paths.push({ path: `part-3/${chapter}`, part: 3 });
      }
    } else {
      paths.push({
        path: `part-${quiz.part}/${quiz.chapter}`,
        part: quiz.part,
      });
    }
  }
  
  return paths;
}

// Get quiz paths for a specific part (used by part quizzes)
export function getQuizPathsByPart(part: 1 | 2 | 3): string[] {
  const paths: string[] = [];
  
  for (const quiz of QUIZZES.filter((q) => q.part === part)) {
    if (quiz.chapter === "data-providers") {
      // Expand data-providers to all individual chapter paths
      for (const chapter of DATA_PROVIDER_CHAPTERS) {
        paths.push(`part-3/${chapter}`);
      }
    } else {
      paths.push(`part-${quiz.part}/${quiz.chapter}`);
    }
  }
  
  return paths;
}

// Get paths for a specific quiz (handles data-providers special case)
export function getQuizChapterPaths(quizId: string): string[] {
  const quiz = getQuizById(quizId);
  if (!quiz) return [];
  
  if (quiz.chapter === "data-providers") {
    return DATA_PROVIDER_CHAPTERS.map((chapter) => `part-3/${chapter}`);
  }
  
  return [`part-${quiz.part}/${quiz.chapter}`];
}
