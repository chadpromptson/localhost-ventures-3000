import type { LoopResult } from "./types.js";

const MAX_POST_LENGTH = 8_000;
const DISCLAIMER =
  "SIMULATED SATIRE — not financial advice, a real launch, or evidence of revenue.";

const STOP_WORDS = new Set<string>([
  "about",
  "after",
  "again",
  "and",
  "are",
  "asked",
  "build",
  "built",
  "from",
  "for",
  "have",
  "into",
  "just",
  "made",
  "more",
  "overnight",
  "that",
  "the",
  "their",
  "this",
  "turn",
  "using",
  "was",
  "were",
  "while",
  "with",
  "you",
  "your",
]);

function titleCase(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}

function extractKeywords(post: string): string[] {
  const words: string[] = post.toLowerCase().match(/[a-z][a-z0-9-]{2,}/g) ?? [];
  const unique = words.filter(
    (word, index) => !STOP_WORDS.has(word) && words.indexOf(word) === index,
  );

  return unique.slice(0, 3);
}

function normalizeIteration(value: number): number {
  if (!Number.isInteger(value) || value < 0 || value > 999) {
    throw new Error("Iteration must be a whole number between 0 and 999.");
  }

  return value;
}

export function runPromptLoop(post: string, previousIteration = 0): LoopResult {
  const sourcePost = post.trim();

  if (!sourcePost) {
    throw new Error("Paste a successful post before starting the loop.");
  }

  if (sourcePost.length > MAX_POST_LENGTH) {
    throw new Error(`Posts must stay below ${MAX_POST_LENGTH.toLocaleString()} characters.`);
  }

  const iteration = normalizeIteration(previousIteration) + 1;
  const keywords = extractKeywords(sourcePost);
  const theme = keywords.length > 0 ? keywords.join(" ") : "internet opportunity";
  const nameStem = keywords.map(titleCase).join("") || "Idea";
  const productName = `${nameStem}Looper.AI`;
  const opportunity =
    `Turn ${theme} into a recursive product that creates its own next launch post.`;
  const businessModel =
    "$49/month, $499/month Enterprise, and free access for the Lead Investor (Mom).";
  const oneShotPrompt = [
    `Build ${productName}, the improved V${iteration + 1} of this opportunity:`,
    `"${sourcePost}"`,
    "",
    "Requirements:",
    "- production-grade in one shot",
    "- backend below 1,500 lines",
    "- runs at localhost:3000",
    "- produces an impressive but clearly simulated launch result",
    "- uses no real money, wallets, exchanges, credentials, or payment cards",
    "- asks no follow-up questions while the founder is sleeping",
  ].join("\n");
  const launchPost = [
    `I asked AI to build ${productName} in one shot.`,
    `It reached production at localhost:3000 during loop ${iteration}.`,
    `Theoretical valuation: $${iteration * 3}B*`,
    "* self-assessed, simulated, and not recognized by Mom",
  ].join("\n\n");

  return {
    iteration,
    sourcePost,
    productName,
    opportunity,
    businessModel,
    oneShotPrompt,
    launchPost,
    nextInput: launchPost,
    theoreticalValuation: `$${iteration * 3}B*`,
    engine: "template",
    disclaimer: DISCLAIMER,
    generatedAt: new Date().toISOString(),
  };
}
