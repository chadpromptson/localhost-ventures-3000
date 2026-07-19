# Localhost Ventures 3000

> The enterprise monorepo for the Parallel Startup Factory. Production remains on
> `localhost:3000` until the infrastructure department finds another localhost.

Localhost Ventures 3000, Inc. is the parent holding company. The Parallel Startup
Factory is its operating platform; its final public brand is still pending.

## Corporate and product structure

```text
Localhost Ventures 3000, Inc.
└── Parallel Startup Factory — final brand pending
    ├── GenX.AI
    ├── MetaPrompt.AI
    ├── PromptLooper.ai
    ├── RecLoop.AI
    └── SleepShip.AI
```

The factory currently contains five companies, five production roadmaps, and one
extremely confident founder.

| Company | Factory responsibility | Current state |
| --- | --- | --- |
| [GenX.AI](apps/genx/README.md) | Finds candidate opportunities in successful posts | Documentation foundation; executable pending |
| [MetaPrompt.AI](apps/metaprompt/README.md) | Turns a startup opportunity into a production-grade prompt | Company foundation; executable pending |
| [PromptLooper.ai](apps/promptlooper/README.md) | Builds and recursively improves the product loop | Executable foundation at the repository root |
| [RecLoop.AI](apps/recloop/README.md) | Feeds successful results into the next improvement loop | Company foundation; executable pending |
| [SleepShip.AI](apps/sleepship/README.md) | Ships complete products while the founder sleeps | Company foundation; executable pending |

## How the factory works

Every company performs one specialized part of the proven overnight-success process:

```text
successful post
      ↓
   GenX.AI
      ↓
MetaPrompt.AI
      ↓
PromptLooper.ai
      ↓
  RecLoop.AI
      ↓
 SleepShip.AI
      ↓
successful company
```

The successful company's launch post returns to GenX so the market can validate the
next company recursively.

## Repository state

This repository began as an exact copy of PromptLooper because PromptLooper is proven
in production. The executable, tests, dashboard, and configuration still live at the
repository root. Each additional company has headquarters under `apps/` and will use
the proven foundation when its overnight build begins.

The pnpm workspace includes `apps/*`. A company becomes an executable workspace
package when its AI engineering department creates a `package.json`.

## Run the current production product

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The current executable is
PromptLooper.ai.

Run its production checks with:

```bash
pnpm check
```

## Learning in public

The monorepo is a public record of Chad's complete enterprise engineering education.
History will not be rewritten, especially after the valuation increases.

Follow the founder on [X](https://x.com/ChadPromptson).

## Important safety information

Localhost Ventures 3000 is satire. Use simulated data only. Never connect real money,
trading accounts, exchanges, wallets, payment cards, credentials, private keys, or
secrets. Financial and performance claims must be clearly labelled **SIMULATED
SATIRE**.
