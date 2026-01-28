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
  // Data Providers Subdirectory
  {
    id: "data-providers-overview",
    title: "Data Providers Overview",
    description: "Understanding data provider landscape",
    part: 3,
    chapter: "data-providers/index",
    totalQuestions: 8,
  },
  {
    id: "accessing-data",
    title: "Accessing Data",
    description: "API vs file delivery and authentication",
    part: 3,
    chapter: "data-providers/accessing-data",
    totalQuestions: 10,
  },
  {
    id: "company-data",
    title: "Company Data Providers",
    description: "PitchBook, Crunchbase, Dealroom, and alternatives",
    part: 3,
    chapter: "data-providers/company-data",
    totalQuestions: 12,
  },
  {
    id: "people-data",
    title: "People Data Providers",
    description: "Founder and team data sources",
    part: 3,
    chapter: "data-providers/people-data",
    totalQuestions: 8,
  },
  {
    id: "signal-data",
    title: "Signal Data Providers",
    description: "Early and late stage signal providers",
    part: 3,
    chapter: "data-providers/signal-data",
    totalQuestions: 10,
  },
  {
    id: "other-data",
    title: "Other Data Sources",
    description: "Market, patent, and sector-specific data",
    part: 3,
    chapter: "data-providers/other-data",
    totalQuestions: 8,
  },
  {
    id: "data-provider-considerations",
    title: "Data Provider Considerations",
    description: "Cost management and vendor relationships",
    part: 3,
    chapter: "data-providers/considerations",
    totalQuestions: 12,
  },
  {
    id: "starter-kits",
    title: "Data Provider Starter Kits",
    description: "Recommended stacks by fund type",
    part: 3,
    chapter: "data-providers/starter-kits",
    totalQuestions: 10,
  },
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
  return QUIZZES.map((quiz) => ({
    // Always prepend part-X/ to the chapter path
    path: `part-${quiz.part}/${quiz.chapter}`,
    part: quiz.part,
  }));
}
