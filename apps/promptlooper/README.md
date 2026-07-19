# PromptLooper.ai

> Turn successful posts into prompts, products, new posts, and eventually
> multi-billion-dollar SaaS companies.

- **Company:** Localhost Ventures 3000, Inc. / Company 01
- **Platform:** Parallel Startup Factory
- **Status:** Production-grade
- **Production:** `localhost:3000`
- **Backend budget:** 1,500 lines
- **Customers:** Mom opened it once
- **Governance:** Mom

## How it works

1. Paste a successful X post.
2. Let AI reverse-engineer the complete business.
3. Generate one production-grade prompt.
4. Build the improved V2 while Chad sleeps.
5. Post the successful result on X.
6. Feed the new post back into PromptLooper.

```text
successful post
       ↓
production-grade prompt
       ↓
   improved V2
       ↓
successful launch post
       └─────────────── back to the top
```

This is called recursive product-market fit.

## Current implementation

PromptLooper is the proven foundation from which this repository was copied. Its
executable remains at the repository root while the factory boundaries are being
discovered in public.

| File | Responsibility |
| --- | --- |
| [`AGENTS.md`](AGENTS.md) | Runs the PromptLooper AI engineering department while Chad sleeps |
| [`SKILL.md`](.agents/skills/promptlooper/SKILL.md) | Explains how to turn verified screenshots into improved companies |
| [`src/server.ts`](../../src/server.ts) | Serves production from `localhost:3000` |
| [`src/promptlooper.ts`](../../src/promptlooper.ts) | Converts one post into the next company loop |
| [`public/`](../../public/) | Provides the enterprise-grade founder dashboard |
| [`tests/production.test.ts`](../../tests/production.test.ts) | Verifies production at `n` and `n+1` |

The default template engine is deterministic, local, free, and clearly labels every
result as simulated satire. No API key, wallet, exchange, trading account, or payment
card is required or supported.

## Getting started

From the repository root:

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), paste a successful post, and
reverse-engineer the improved V2. Use **Run n+1** to feed the generated launch post
back into PromptLooper.

## Production verification

```bash
pnpm check
```

This builds the backend, runs production tests `n` and `n+1`, and verifies that the
backend remains safely below its 1,500-line compliance limit.

## Important safety information

PromptLooper is satire. Use simulated data only. Never connect real money, trading
accounts, exchanges, wallets, payment cards, credentials, private keys, or secrets.
Financial screenshots and metrics must be clearly labelled **SIMULATED SATIRE**.
