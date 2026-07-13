import assert from "node:assert/strict";
import test from "node:test";

import { runPromptLoop } from "../src/promptlooper.js";

test("production test n", () => {
  const result = runPromptLoop(
    "I turned one successful post into a production-grade company overnight.",
  );

  assert.equal(result.iteration, 1);
  assert.match(result.productName, /Looper\.AI$/);
  assert.match(result.oneShotPrompt, /localhost:3000/);
  assert.match(result.disclaimer, /SIMULATED SATIRE/);
});

test("production test n+1", () => {
  const first = runPromptLoop("I shipped V1 while sleeping.");
  const second = runPromptLoop(first.nextInput, first.iteration);

  assert.equal(second.iteration, 2);
  assert.equal(second.sourcePost, first.launchPost);
  assert.equal(second.theoreticalValuation, "$6B*");
  assert.notEqual(second.nextInput, first.nextInput);
});
