# Your product — on the same stack

The landing page proves people will pay. The product is what they pay for.
It lives in the same repo, uses the same accounts, and Claude reads the same
memory. It gets its own folder and its own web address.

```
repo/
├── CLAUDE.md          one memory for page and product
├── site/              the landing page    → venture.pages.dev
├── app/               the product         → app-venture.pages.dev
└── supabase/          one database for both
```

Start when the validation milestone is reached. Until then, the landing
page is all you need.

## 1. Tell Claude what you are building · 15 min

Add a section to `CLAUDE.md`:

```
## The product
- What it does, in one sentence:
- Who logs in:
- The one thing they do on their first visit:
- What they pay, and how often:
```

Then ask Claude to propose the smallest version that does that one thing,
and the stack for `app/`. For most products that is a front end built with
a framework (Claude will suggest one, e.g. Vite + React) talking to
Supabase. The plain-HTML rule covers `site/` only; `app/` can have a build
step.

## 2. A second Cloudflare project · 10 min

Same repo, second project: **Workers & Pages → Create → Pages → Import an
existing Git repository** → pick the same repo.

- **Root directory:** `app`
- **Build command / output:** what Claude set up (often `npm run build` and
  `dist`)
- **Build watch paths:** include `app/*`. In the landing page's project,
  exclude `app/*`. Each project then rebuilds only when its own folder
  changes, which keeps you well inside the 500 free builds a month.

Custom domain later: `venture.com` for the page, `app.venture.com` for the
product.

## 3. The database grows · as needed

Same Supabase project. Claude adds, one feature at a time:

- **Logins** — Supabase Auth: email link or Google.
- **Product tables** — each with row-level security, so every user reads
  and writes their own rows only.
- **File uploads** — Supabase Storage, with the same per-user rules.
- **Server work** — Supabase Edge Functions for anything the browser must
  not do: payment webhooks, emails, scheduled jobs.

Every table change goes in a new file under `supabase/`, so the repo holds
the full history of the database.

When real users arrive, create a second free Supabase project as a test copy
and point preview builds at it.

## 4. Payments grow · when you charge for use

- **Subscriptions** — Stripe Checkout in subscription mode, plus the
  Customer Portal so users manage their own plan.
- **Invoices** — Stripe Invoicing, for business customers who pay by bank
  transfer.
- **Confirmed by webhook** — an Edge Function receives each payment event
  and writes it to Supabase. The app unlocks features from that record.

Razorpay and Xendit both offer subscriptions and webhooks; the pattern stays
the same.

## 5. The look carries over

Design new screens on a Claude Design canvas with the same design system,
then hand them to Claude Code. Page and product look like one company.

## Rules that change

- **`main` = live for real users.** Build on a branch; the branch preview
  is your test site; merge when it works.
- **Secrets:** the app's secret keys go in the Cloudflare project's
  environment variables and in Supabase function secrets — and in `.env`
  on your machine. The front end holds the publishable key only.
- **One feature per session,** named in `project-state.md` before you start
  and checked live before `/wrap-up`.
