#!/usr/bin/env bun
/**
 * Script to validate source URLs in question files
 * Checks that all URLs point to valid pages on buildingfor.vc
 */

import { readdir, readFile } from "fs/promises";
import { join } from "path";

interface Question {
  id: string;
  sourceUrl: string;
}

interface QuestionFile {
  questions: Question[];
}

interface ValidationResult {
  valid: boolean;
  errors: { questionId: string; url: string; error: string }[];
  warnings: { questionId: string; url: string; warning: string }[];
  checked: number;
}

async function getAllQuestionFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(currentDir: string) {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith(".json")) {
        files.push(fullPath);
      }
    }
  }

  await walk(dir);
  return files;
}

/**
 * Normalize URL to absolute URL
 */
function normalizeUrl(url: string): string {
  if (url.startsWith("https://buildingfor.vc/")) {
    return url;
  }
  if (url.startsWith("/guide/")) {
    return `https://buildingfor.vc${url}`;
  }
  return url;
}

/**
 * Extract hash fragment from URL
 */
function extractHash(url: string): string | null {
  const hashIndex = url.indexOf("#");
  if (hashIndex === -1) {
    return null;
  }
  return url.substring(hashIndex + 1);
}

/**
 * Normalize hash to match common ID patterns in HTML
 * Handles cases where IDs use different formats than URLs
 * e.g., URL: mistake-1-jumping -> HTML ID: mistake-#1:-jumping
 */
function normalizeHashForMatching(hash: string): string[] {
  const variations: Set<string> = new Set([hash]);
  
  // Helper function to apply apostrophe fixes
  const fixApostrophes = (str: string): string[] => {
    const results = [str];
    const apostrophePatterns = [
      [/dont/g, "don't"],
      [/wont/g, "won't"],
      [/cant/g, "can't"],
      [/isnt/g, "isn't"],
      [/arent/g, "aren't"],
      [/havent/g, "haven't"],
      [/hasnt/g, "hasn't"],
    ];
    
    for (const [pattern, replacement] of apostrophePatterns) {
      if (pattern.test(str)) {
        results.push(str.replace(pattern, replacement));
      }
    }
    return results;
  };
  
  // Helper function to add dollar signs
  const addDollars = (str: string): string[] => {
    const amountPattern = /(\d+[kmb]?)/gi;
    const withDollars = str.replace(amountPattern, "$$$1");
    return withDollars !== str ? [str, withDollars] : [str];
  };
  
  // Start with base hash and apply apostrophes first
  let currentVariations = [hash, ...fixApostrophes(hash)];
  
  // Pattern 1: mistake-1-xxx -> mistake-#1:-xxx (numbered sections)
  // Apply to both original and apostrophe-fixed versions
  const numberedPattern = /^([a-z-]+)-(\d+)(-.*)?$/i;
  const numberedMatches: string[] = [];
  for (const v of currentVariations) {
    const match = v.match(numberedPattern);
    if (match) {
      const [, prefix, number, suffix] = match;
      const numbered1 = `${prefix}-#${number}:${suffix || ""}`;
      const numbered2 = `${prefix}-%23${number}%3A${suffix || ""}`;
      numberedMatches.push(numbered1);
      numberedMatches.push(numbered2);
    }
  }
  currentVariations.push(...numberedMatches);
  
  // Pattern 2: Add colons after certain words
  const colonPatterns = [
    /^(limited-partners)(-.*)$/i,
    /^(general-partners)(-.*)$/i,
    /^(portfolio-companies)(-.*)$/i,
    /^(pre-seed-and-seed-funds)(-.*)$/i,
    /^(series-a-and-b-funds)(-.*)$/i,
    /^(growth-equity)(-.*)$/i,
    /^(private-equity)(-.*)$/i,
  ];
  
  const colonMatches: string[] = [];
  for (const v of currentVariations) {
    for (const pattern of colonPatterns) {
      const m = v.match(pattern);
      if (m) {
        const [, prefix, suffix] = m;
        const colonVar = `${prefix}:${suffix}`;
        colonMatches.push(colonVar);
        // Also apply apostrophe fixes to colon variations
        colonMatches.push(...fixApostrophes(colonVar));
      }
    }
  }
  currentVariations.push(...colonMatches);
  
  // Pattern 3: Apply apostrophe fixes to all variations (including base)
  const apostropheMatches: string[] = [];
  for (const v of currentVariations) {
    apostropheMatches.push(...fixApostrophes(v));
  }
  currentVariations.push(...apostropheMatches);
  
  // Pattern 4: Add dollar signs to all variations
  const dollarMatches: string[] = [];
  for (const v of currentVariations) {
    dollarMatches.push(...addDollars(v));
  }
  currentVariations.push(...dollarMatches);
  
  // Pattern 5: Try with underscores
  currentVariations.push(hash.replace(/-/g, "_"));
  
  // Add all to set
  for (const v of currentVariations) {
    variations.add(v);
  }
  
  // Pattern 6: Try URL-decoded version
  try {
    const decoded = decodeURIComponent(hash);
    if (decoded !== hash) {
      variations.add(decoded);
      // Apply transformations to decoded version too
      for (const v of fixApostrophes(decoded)) {
        variations.add(v);
      }
    }
  } catch {
    // Ignore decode errors
  }
  
  return Array.from(variations);
}

/**
 * Check if hash fragment exists in HTML content
 */
function hashExistsInHtml(html: string, hash: string): boolean {
  // Get all possible variations of the hash
  const hashVariations = normalizeHashForMatching(hash);
  
  // Escape special regex characters
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Also try a more flexible approach: extract key parts and match flexibly
  // For mistake-4-over-engineering-for-scale-you-dont-have
  // We want to match mistake-#4:-over-engineering-for-scale-you-don't-have
  // So we need to match the structure flexibly
  
  // Check each variation
  for (const variation of hashVariations) {
    const escaped = escapeRegex(variation);
    
    // Pattern 1: Exact match - id="hash" or id='hash'
    const idPattern1 = new RegExp(`id\\s*=\\s*["']${escaped}["']`, "i");
    let idPattern2: RegExp | null = null;
    try {
      const decoded = decodeURIComponent(variation);
      idPattern2 = new RegExp(`id\\s*=\\s*["']${escapeRegex(decoded)}["']`, "i");
    } catch {
      // Ignore decode errors
    }
    
    // Pattern 2: name attribute (for anchors)
    const namePattern1 = new RegExp(`name\\s*=\\s*["']${escaped}["']`, "i");
    
    // Pattern 3: Partial match - hash appears as part of an ID
    const partialPattern = new RegExp(`id\\s*=\\s*["'][^"']*${escaped}[^"']*["']`, "i");
    
    if (
      idPattern1.test(html) ||
      (idPattern2 && idPattern2.test(html)) ||
      namePattern1.test(html) ||
      partialPattern.test(html)
    ) {
      return true;
    }
  }
  
  // Additional flexible matching: if hash has numbered pattern, try matching with #N: and apostrophes
  const numberedPattern = /^([a-z-]+)-(\d+)(-.*)?$/i;
  const match = hash.match(numberedPattern);
  if (match) {
    const [, prefix, number, suffix] = match;
    
    // Try: prefix-#number: + suffix (with potential apostrophe fixes)
    const basePattern = `${prefix}-#${number}:`;
    const suffixStr = suffix || "";
    
    // Build flexible patterns that allow apostrophes and handle variations
    const escapedBase = escapeRegex(basePattern);
    
    // Try multiple approaches:
    // 1. Exact match with apostrophe variations
    const suffixVariations = [
      suffixStr,
      suffixStr.replace(/dont/g, "don't"),
      suffixStr.replace(/wont/g, "won't"),
      suffixStr.replace(/cant/g, "can't"),
    ];
    
    for (const suffixVar of suffixVariations) {
      // Try exact match
      const exactPattern = new RegExp(
        `id\\s*=\\s*["']${escapedBase}${escapeRegex(suffixVar)}["']`,
        "i"
      );
      if (exactPattern.test(html)) {
        return true;
      }
      
      // Try partial match (allowing extra characters)
      const partialPattern = new RegExp(
        `id\\s*=\\s*["'][^"'"]*${escapedBase}[^"'"]*${escapeRegex(suffixVar)}[^"'"]*["']`,
        "i"
      );
      if (partialPattern.test(html)) {
        return true;
      }
    }
    
    // Also try matching just the base pattern + any suffix
    const baseOnlyPattern = new RegExp(
      `id\\s*=\\s*["'][^"'"]*${escapedBase}[^"'"]*["']`,
      "i"
    );
    if (baseOnlyPattern.test(html) && suffixStr) {
      // If we found the base, check if suffix parts appear nearby
      const suffixParts = suffixStr.split("-").filter(p => p.length > 2);
      const baseMatch = html.match(baseOnlyPattern);
      if (baseMatch) {
        // Check if suffix parts appear after the base match
        const matchIndex = html.indexOf(baseMatch[0]);
        const afterMatch = html.substring(matchIndex, matchIndex + 1000).toLowerCase();
        const allPartsFound = suffixParts.every(part => 
          afterMatch.includes(part.toLowerCase()) ||
          afterMatch.includes(part.toLowerCase().replace(/dont/g, "don't"))
        );
        if (allPartsFound) {
          return true;
        }
      }
    }
  }
  
  // Handle double dashes (e.g., private-equity--buyout-funds)
  if (hash.includes("--")) {
    const doubleDashVariations = [
      hash,
      hash.replace(/--/g, "-"),
      hash.replace(/--/g, ":-"),
    ];
    for (const variation of doubleDashVariations) {
      const escaped = escapeRegex(variation);
      const pattern = new RegExp(`id\\s*=\\s*["'][^"'"]*${escaped}[^"'"]*["']`, "i");
      if (pattern.test(html)) {
        return true;
      }
    }
  }
  
  // Try a more lenient partial match for long hashes
  // Split hash into key parts and check if they all appear in an ID
  const hashParts = hash.split("-").filter(p => p.length > 3);
  if (hashParts.length >= 3) {
    // Extract all IDs from HTML
    const allIds = html.match(/id\s*=\s*["']([^"']+)["']/gi);
    if (allIds) {
      for (const idAttr of allIds) {
        const idMatch = idAttr.match(/id\s*=\s*["']([^"']+)["']/i);
        if (idMatch) {
          const id = idMatch[1].toLowerCase();
          // Check if most hash parts appear in this ID
          const matchingParts = hashParts.filter(part => 
            id.includes(part.toLowerCase()) ||
            id.includes(part.toLowerCase().replace(/dont/g, "don't"))
          );
          // If at least 70% of parts match, consider it a match
          if (matchingParts.length >= Math.ceil(hashParts.length * 0.7)) {
            return true;
          }
        }
      }
    }
  }
  
  return false;
}

/**
 * Validate a single URL by fetching it and checking hash fragment
 */
async function validateUrl(url: string, debug: boolean = false): Promise<{ valid: boolean; error?: string; debugInfo?: string }> {
  try {
    const normalizedUrl = normalizeUrl(url);
    const response = await fetch(normalizedUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; URL-Validator/1.0)",
      },
    });

    if (!response.ok) {
      return {
        valid: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const html = await response.text();
    const hash = extractHash(url);

    // If URL has a hash fragment, validate it exists
    if (hash) {
      if (!hashExistsInHtml(html, hash)) {
        // Try to find similar IDs in the HTML for debugging
        let debugInfo = "";
        if (debug) {
          // Extract all IDs from the HTML
          const idMatches = html.match(/id\s*=\s*["']([^"']+)["']/gi);
          if (idMatches) {
            const ids = idMatches.map(m => {
              const match = m.match(/id\s*=\s*["']([^"']+)["']/i);
              return match ? match[1] : "";
            }).filter(Boolean);
            
            // Find IDs that contain parts of the hash
            const hashParts = hash.split("-");
            const similarIds = ids.filter(id => 
              hashParts.some(part => id.toLowerCase().includes(part.toLowerCase()))
            ).slice(0, 5);
            
            if (similarIds.length > 0) {
              debugInfo = ` Similar IDs found: ${similarIds.join(", ")}`;
            }
          }
        }
        
        return {
          valid: false,
          error: `Hash fragment "#${hash}" not found on page${debugInfo}`,
        };
      }
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function validateUrls(): Promise<ValidationResult> {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    checked: 0,
  };

  const questionsDir = join(process.cwd(), "data", "questions");
  const files = await getAllQuestionFiles(questionsDir);

  console.log(`Found ${files.length} question files to validate`);
  console.log(`Validating URLs (this may take a while)...\n`);

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    let data: QuestionFile;

    try {
      data = JSON.parse(content);
    } catch (e) {
      result.errors.push({
        questionId: "N/A",
        url: file,
        error: `Invalid JSON in file: ${file}`,
      });
      result.valid = false;
      continue;
    }

    // Handle both formats: { questions: [...] } and [...]
    const questions = Array.isArray(data) ? data : data.questions;
    
    if (!questions || !Array.isArray(questions)) {
      result.warnings.push({
        questionId: "N/A",
        url: file,
        warning: `No questions array in file: ${file}`,
      });
      continue;
    }

    for (const question of questions) {
      result.checked++;

      if (!question.sourceUrl) {
        result.errors.push({
          questionId: question.id,
          url: "missing",
          error: "Missing sourceUrl",
        });
        result.valid = false;
        continue;
      }

      // Check URL format - accept both absolute and relative URLs
      const isAbsoluteUrl = question.sourceUrl.startsWith("https://buildingfor.vc/");
      const isRelativeUrl = question.sourceUrl.startsWith("/guide/");
      
      if (!isAbsoluteUrl && !isRelativeUrl) {
        result.errors.push({
          questionId: question.id,
          url: question.sourceUrl,
          error: "URL does not start with https://buildingfor.vc/ or /guide/",
        });
        result.valid = false;
        continue;
      }

      // Check for common URL issues
      if (question.sourceUrl.includes(" ")) {
        result.errors.push({
          questionId: question.id,
          url: question.sourceUrl,
          error: "URL contains spaces",
        });
        result.valid = false;
        continue;
      }

      // Warn about anchor format (colons should be URL-encoded)
      const hashIndex = question.sourceUrl.indexOf("#");
      if (hashIndex !== -1) {
        const anchor = question.sourceUrl.substring(hashIndex + 1);
        if (anchor.includes(":") && !anchor.includes("%3A")) {
          result.warnings.push({
            questionId: question.id,
            url: question.sourceUrl,
            warning: "Anchor contains colon that may need URL encoding (%3A)",
          });
        }
      }

      // Validate URL by fetching it and checking hash fragment
      if (result.checked % 10 === 0) {
        process.stdout.write(`\rChecked ${result.checked} URLs...`);
      }
      // Enable debug for first few errors to understand the issue
      const debug = result.errors.length < 3;
      const validation = await validateUrl(question.sourceUrl, debug);
      if (!validation.valid) {
        result.errors.push({
          questionId: question.id,
          url: question.sourceUrl,
          error: validation.error || "URL validation failed",
        });
        result.valid = false;
      }
    }
  }

  process.stdout.write("\r"); // Clear progress line
  return result;
}

async function main() {
  console.log("🔍 Validating source URLs in question files...\n");

  const result = await validateUrls();

  console.log(`\n📊 Validation Results:`);
  console.log(`   Total URLs checked: ${result.checked}`);
  console.log(`   Errors: ${result.errors.length}`);
  console.log(`   Warnings: ${result.warnings.length}`);

  if (result.errors.length > 0) {
    console.log("\n❌ Errors:");
    for (const error of result.errors) {
      console.log(`   - [${error.questionId}] ${error.error}`);
      console.log(`     URL: ${error.url}`);
    }
  }

  if (result.warnings.length > 0) {
    console.log("\n⚠️ Warnings:");
    for (const warning of result.warnings.slice(0, 10)) {
      console.log(`   - [${warning.questionId}] ${warning.warning}`);
      console.log(`     URL: ${warning.url}`);
    }
    if (result.warnings.length > 10) {
      console.log(`   ... and ${result.warnings.length - 10} more warnings`);
    }
  }

  if (result.valid && result.warnings.length === 0) {
    console.log("\n✅ All URLs are valid!");
  } else if (result.valid) {
    console.log("\n✅ All URLs are valid (with warnings)");
  } else {
    console.log("\n❌ Validation failed");
    process.exit(1);
  }
}

main().catch(console.error);
