# Spark venture template

The build setup for ESSEC Spark APAC, Phase 2. One repo per venture: your
site, your evidence, your ledgers, and the memory Claude reads every session.

## Start

1. Open Claude Code and paste the prompt in [`SETUP.md`](SETUP.md). Claude
   creates your private team repo from this template, invites your
   co-founder, and walks you through the accounts. (By hand: **Use this
   template → Create a new repository**, private, and add your co-founder
   under *Settings → Collaborators*.)
2. In the repo, run **`/setup-venture`**. It turns your Demo Day page into
   the venture memory in `CLAUDE.md`.
3. Follow [`docs/setup.md`](docs/setup.md): design system, database,
   hosting, the ask. It ends with the **Ready to launch** checklist.

After that, the weekly loop is:
**`/experiment` → `/new-page` if the channel needs a page → `/publish` →
send → `/log` → `/wrap-up`**, and `/experiment` again on the read date.

## Already have your team repo?

Repos made from this template keep the version they started with. To bring
in a skill added since, paste this into Claude Code in your team repo:

```
Bring in the latest Spark template skills. Fetch
https://github.com/profjulien/spark-venture-template and copy into this
repo, replacing older copies: .claude/skills/experiment/,
.claude/skills/wrap-up/, experiments/README.md. In our CLAUDE.md, add the
template's rule 13 and any rows missing from the Skills and Where things
live tables. Add the "Experiment running" line under Now in our
project-state.md. Keep every other file of ours as it is. Show me the
changes, then commit: "Template update: /experiment".
```

Then start a new session so `/experiment` loads.

## Read next

- [`docs/how-this-works.md`](docs/how-this-works.md) — why this setup
- [`docs/converting-page.md`](docs/converting-page.md) — how a page that sells is built
- [`docs/design.md`](docs/design.md) — the look, with Claude Design
- [`docs/the-ask.md`](docs/the-ask.md) — what the page asks for: signup, form, booking or payment
- [`docs/measure.md`](docs/measure.md) — the funnel: visitors to confirmed, per channel
- [`docs/payments.md`](docs/payments.md) — Stripe, and how to swap it
- [`docs/hosting.md`](docs/hosting.md) — Cloudflare Pages, plus plan B
- [`docs/product.md`](docs/product.md) — your product, on the same stack
