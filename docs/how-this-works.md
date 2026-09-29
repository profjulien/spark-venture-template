# How this works, and why

## Six jobs, one tool each

| Job | Tool | What it fixes |
|---|---|---|
| Design | Claude Design | a page that looks like every other AI-made page |
| Write | Claude Code | code copied between chats; every session starting from zero |
| Remember | GitHub | a single copy on one laptop, and every mistake permanent |
| Publish | Cloudflare Pages | a page only you can see |
| Store | Supabase | leads scattered across inboxes, and a guessed count |
| Collect | Stripe (or your local provider) | interest in place of payment — and the milestone counts payment |

The chain in one line: **Claude Design sets the look, Claude Code writes,
GitHub remembers, Cloudflare publishes, Supabase stores, Stripe collects.**

## The one idea: memory lives in the repo

Claude starts every session blank. `CLAUDE.md` and `project-state.md` are
how it catches up in seconds — who the customer is,
what you promised, what you proved, what is next.

Because the memory is in files, it travels:

- **between co-founders** — Khushi picks up where Toshika stopped;
- **between machines** — laptop today, claude.ai/code in the browser tomorrow;
- **between models** — next year's Claude reads the same files.

Keep these two files true and every session starts strong.

## The loop

```
/new-page  →  preview  →  /publish  →  check the live page  →  /wrap-up
```

Small steps, each one live. A change that breaks something is one
`git revert` away, because GitHub holds every version.

## Why plain HTML

Plain files, published as they are. Fewer moving parts, fewer ways to
break, and a page that loads fast on a phone in Jakarta. You can graduate to a framework when a prototype needs one.

## Public and secret keys

- **Public** (fine in `site/config.js`): the Supabase URL and publishable
  key, your payment link. Anyone can see them in the browser. The row-level
  security rules decide what those keys can do: add a lead, add an event.
- **Secret** (`.env` only): Stripe `sk_…`, Supabase secret keys. They can
  read and change everything. They stay off the page, out of chat, out of git.

## What it costs

All free at this scale:

- **Cloudflare Pages** — 500 publishes a month, page traffic free.
- **Supabase** — free project; it pauses after about a week idle.
- **GitHub** — free private repos.
- **Stripe** — free to set up; a fee per successful payment.

Your Claude subscription is the one fixed cost.
