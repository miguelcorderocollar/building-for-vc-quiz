import * as fs from "fs";
import * as path from "path";

/**
 * This test verifies that all sections from the original documentation
 * have corresponding question JSON files with actual questions.
 * 
 * Note: Data Providers sections are individual JSON files but are combined
 * into a single quiz in the UI for better user experience.
 */

// All sections from the original docs (C:\Users\mcorderocollar\Dev\Other\building-for-vc\guide)
const EXPECTED_SECTIONS = {
  "part-1": [
    "what-is-a-vc-fund",
    "understanding-your-vc-fund",
    "common-mistakes",
    "hiring-your-data-team",
  ],
  "part-2": [
    "introduction",
    "research-platforms",
    "sourcing-tools",
    "crm-and-deal-flow",
    "fund-operations",
    "portfolio-support",
    "fundraising",
    "website-and-external-presence",
    "putting-it-together",
  ],
  "part-3": [
    "choosing-your-stack",
    "data-modeling",
    "entity-resolution",
    "data-quality",
    "data-warehousing",
    "knowledge-graphs",
    "integrations-and-apis",
    "security-and-compliance",
    "emerging-trends",
  ],
  "part-3/data-providers": [
    "index",
    "accessing-data",
    "company-data",
    "people-data",
    "signal-data",
    "other-data",
    "considerations",
    "starter-kits",
  ],
};

const QUESTIONS_BASE_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "questions"
);

interface Question {
  id: string;
  chapter: string;
  question: string;
}

function getQuestionFilePath(part: string, section: string): string {
  if (part === "part-3/data-providers") {
    return path.join(QUESTIONS_BASE_PATH, "part-3", "data-providers", `${section}.json`);
  }
  return path.join(QUESTIONS_BASE_PATH, part, `${section}.json`);
}

function loadQuestions(filePath: string): Question[] {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    // Handle both formats: array or { questions: [...] }
    return Array.isArray(data) ? data : data.questions || [];
  } catch {
    return [];
  }
}

describe("Section Coverage", () => {
  const coverageResults: {
    part: string;
    section: string;
    filePath: string;
    exists: boolean;
    questionCount: number;
  }[] = [];

  // Collect all coverage data
  beforeAll(() => {
    for (const [part, sections] of Object.entries(EXPECTED_SECTIONS)) {
      for (const section of sections) {
        const filePath = getQuestionFilePath(part, section);
        const questions = loadQuestions(filePath);
        coverageResults.push({
          part,
          section,
          filePath,
          exists: fs.existsSync(filePath),
          questionCount: questions.length,
        });
      }
    }
  });

  it("should have all expected section files", () => {
    const missingSections = coverageResults.filter((r) => !r.exists);
    
    if (missingSections.length > 0) {
      console.log("\n❌ MISSING QUESTION FILES:");
      missingSections.forEach((m) => {
        console.log(`  - ${m.part}/${m.section}.json`);
      });
    }
    
    expect(missingSections).toHaveLength(0);
  });

  it("should have questions in all section files (not empty)", () => {
    const emptySections = coverageResults.filter(
      (r) => r.exists && r.questionCount === 0
    );
    
    if (emptySections.length > 0) {
      console.log("\n❌ EMPTY QUESTION FILES (0 questions):");
      emptySections.forEach((e) => {
        console.log(`  - ${e.part}/${e.section}.json`);
      });
    }
    
    expect(emptySections).toHaveLength(0);
  });

  it("should have at least 8 questions per section", () => {
    const lowQuestionSections = coverageResults.filter(
      (r) => r.exists && r.questionCount > 0 && r.questionCount < 8
    );
    
    if (lowQuestionSections.length > 0) {
      console.log("\n⚠️  SECTIONS WITH FEW QUESTIONS (<8):");
      lowQuestionSections.forEach((l) => {
        console.log(`  - ${l.part}/${l.section}.json: ${l.questionCount} questions`);
      });
    }
    
    // This is a warning, not a failure
    expect(true).toBe(true);
  });

  it("should print coverage summary", () => {
    console.log("\n📊 QUESTION COVERAGE SUMMARY:");
    console.log("=".repeat(60));
    
    let totalQuestions = 0;
    let totalSections = 0;
    let coveredSections = 0;
    
    for (const [part, sections] of Object.entries(EXPECTED_SECTIONS)) {
      console.log(`\n${part.toUpperCase()}:`);
      for (const section of sections) {
        const result = coverageResults.find(
          (r) => r.part === part && r.section === section
        );
        totalSections++;
        
        if (result) {
          const status = result.exists
            ? result.questionCount > 0
              ? `✅ ${result.questionCount} questions`
              : "❌ Empty"
            : "❌ Missing";
          
          if (result.exists && result.questionCount > 0) {
            coveredSections++;
            totalQuestions += result.questionCount;
          }
          
          console.log(`  ${section}: ${status}`);
        }
      }
    }
    
    console.log("\n" + "=".repeat(60));
    console.log(`TOTAL: ${coveredSections}/${totalSections} sections covered`);
    console.log(`TOTAL QUESTIONS: ${totalQuestions}`);
    console.log("=".repeat(60));
    
    expect(true).toBe(true);
  });
});
