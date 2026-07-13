const form = document.querySelector("#loop-form");
const sourcePost = document.querySelector("#source-post");
const runButton = document.querySelector("#run-button");
const loopAgain = document.querySelector("#loop-again");
const resultSection = document.querySelector("#result");

let currentIteration = 0;
let nextInput = "";

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function updateCharacterCount() {
  setText("#character-count", `${sourcePost.value.length.toLocaleString()} / 8,000`);
}

function renderResult(result) {
  currentIteration = result.iteration;
  nextInput = result.nextInput;

  setText("#loop-count", String(result.iteration));
  setText("#valuation", result.theoreticalValuation);
  setText("#iteration-label", result.iteration === 1 ? "N" : `N+${result.iteration - 1}`);
  setText("#product-name", result.productName);
  setText("#opportunity", result.opportunity);
  setText("#business-model", result.businessModel);
  setText("#one-shot-prompt", result.oneShotPrompt);
  setText("#launch-post", result.launchPost);
  setText("#disclaimer", result.disclaimer);

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function runLoop(post, iteration) {
  runButton.disabled = true;
  runButton.textContent = "AI IS THINKING PROFESSIONALLY...";

  try {
    const response = await fetch("/api/loop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post, iteration }),
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error ?? "The recursive growth loop experienced a vibe issue.");
    }

    renderResult(payload);
  } catch (error) {
    window.alert(error instanceof Error ? error.message : "Unexpected production event.");
  } finally {
    runButton.disabled = false;
    runButton.textContent = "REVERSE-ENGINEER V2 →";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  void runLoop(sourcePost.value, currentIteration);
});

loopAgain.addEventListener("click", () => {
  sourcePost.value = nextInput;
  updateCharacterCount();
  void runLoop(nextInput, currentIteration);
});

sourcePost.addEventListener("input", updateCharacterCount);
updateCharacterCount();

fetch("/api/health")
  .then((response) => response.json())
  .then((health) => {
    setText(
      "#health-status",
      `${health.status.toUpperCase()} · ${health.production.toUpperCase()}`,
    );
  })
  .catch(() => setText("#health-status", "PRODUCTION IS TEMPORARILY LOCAL"));
