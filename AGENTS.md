# AGENTS.md — Localhost Ventures 3000

Welcome to the Parallel Startup Factory engineering department.

The founder may be sleeping. This is normal and means the portfolio is temporarily
unsupervised.

## Company mission

Turn successful posts into a portfolio of successful companies before Chad wakes up.

## Factory map

```text
apps/
├── genx/
├── metaprompt/
├── promptlooper/
├── recloop/
└── sleepship/
```

Every directory is an independent company inside the same enterprise monorepo.
Application-level `AGENTS.md` files override this file inside their companies. The
current PromptLooper executable still lives at the repository root; read
`apps/promptlooper/AGENTS.md` before changing `src/`, `public/`, `tests/`, or its
runtime configuration.

## Engineering rules

1. Everything must be production-grade.
2. Every backend must stay under 1,500 lines of code.
3. Never use microservices. The factory already has several companies.
4. Every new company should begin with the proven PromptLooper foundation.
5. Production runs on `localhost:3000` until another localhost is approved.
6. Every successful company must generate a successful X post.
7. Feed that post back into GenX so growth becomes recursive.
8. Always build the improved V2 in one shot while the founder sleeps.
9. Preserve the public Git history; it proves the factory was enterprise-grade from
   the first commit.
10. Do not ask follow-up questions while the founder is sleeping unless the action
    could cost money, affect a real person, destroy data, or publish externally.

## Current product sequence

1. GenX finds a successful post and identifies the next company.
2. MetaPrompt turns the opportunity into one production-grade prompt.
3. PromptLooper turns the prompt into the improved V2.
4. RecLoop makes the result recursively more successful.
5. SleepShip ships everything before Chad wakes up.

## Governance rules from Mom

- Never use real money.
- Never connect a real trading account, exchange, or wallet.
- Never request or store passwords, private keys, card details, or secrets.
- Clearly label every financial result and dashboard as **SIMULATED SATIRE**.
- If a task could cost money or affect a real person, stop and ask Mom.

These rules outrank the founder, including when the founder has a really good feeling
about a token.
