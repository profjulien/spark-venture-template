# [Venture name]

> **Claude:** read this file and `project-state.md` at the start of every
> session. The first section is the venture's memory — `/setup-venture` fills
> it, and it stays true: update it whenever a stable fact changes. The second
> section is how we build. Follow it.

---

## The venture

- **Team:** [names — and the city each founder is based in]
- **Segment:** [who, specifically — narrow enough to find 50 of them]
- **Struggle:** [the situation they are in, in their words]
- **Single proposition:** For [segment], [product], so they can [progress].
- **The deposit:** [amount + currency] reserves [what]. Refundable [terms].
  Delivery [window].
  <!-- B2B teams: replace with **The pilot ask:** feature scope · what the
  client commits to (deploy and test once ready) · who signs. -->
- **Milestone:** [10 paid deposits | 1 signed pilot] by [date]. Next: [50 | 3 accounts].
- **Evidence so far** — every line labelled EVIDENCE · INFERENCE · UNKNOWN:
  - [EVIDENCE] …
  - [INFERENCE] …
  - [UNKNOWN] …
- **Voice on the page:** [how the segment talks · words to use · words to avoid]
- **Design system:** [Claude Design link] — snapshot in `design/`
- **Live page:** [https://….pages.dev]
- **Payment provider:** see `site/config.js`.

---

## How we build

### The stack — six jobs, one tool each

| Job | Tool | Where it shows up here |
|---|---|---|
| Design | Claude Design | the design system (look) and canvas (mockups), on claude.ai |
| Write | Claude Code | this conversation |
| Remember | GitHub | this repo — every file, every version |
| Publish | Cloudflare Pages | serves the `site/` folder; every push to `main` goes live |
| Store | Supabase | `leads` and `events` tables, fed by the page |
| Collect | Stripe by default — Razorpay, Xendit or manual also fit | a payment link in `site/config.js` |

### Where things live

| Path | Holds |
|---|---|
| `CLAUDE.md` | stable memory: the venture + these rules |
| `project-state.md` | moving memory: counts, this week's metric, next action |
| `evidence/` | interviews, quotes, screenshots, the Demo Day page |
| `evidence/deposits.csv` | every deposit, any provider — the milestone count |
| `evidence/spend.csv` + `evidence/receipts/` | team spend — what ESSEC matches |
| `site/` | the live site: plain HTML, CSS, JS |
| `site/config.js` | the one settings file: payment link, Supabase address and key |
| `design/` | snapshot of the design system: `brand.md`, `tokens.json` |
| `supabase/schema.sql` | the database tables and their access rules |
| `docs/` | setup steps, hosting, payments, the why |

### Rules

1. **Memory lives in this repo.** Start every session by reading `CLAUDE.md`
   and `project-state.md`. End it with `/wrap-up`. A co-founder picking up
   tomorrow starts exactly where you stopped.
2. **One proposition per page.** A second idea goes to `project-state.md`
   under *Parked*.
3. **Every claim on a page traces to `evidence/`.** Quotes are verbatim and
   used with permission. Numbers are real counts. Anything else is removed.
4. **One settings file.** Payment link, provider, Supabase address and
   publishable key live in `site/config.js` and nowhere else.
5. **Secret keys live in `.env` only** — Stripe `sk_…`, Supabase secret or
   `service_role` keys. Git ignores `.env`. Keys stay out of chat and out of
   `site/`. The Supabase *publishable* key is public by design; the table
   rules protect the data.
6. **Row-level security on every table.** The page may add rows to `leads`
   and `events`. Reading happens in the Supabase dashboard.
7. **Small steps.** Change → preview → `/publish` → check the live page.
   Bigger experiments go on a branch; Cloudflare gives it a preview address.
8. **Plain HTML, CSS and JS in `site/`**, served as they are, until the
   team chooses a framework. Cloudflare publishes the folder directly.
9. **Personal data:** the ledgers hold first name + initial. Emails live in
   Supabase only.
10. **Logins and dashboards belong to the team.** When a step needs one, give
    the exact clicks and wait for the team to confirm.
11. **The look comes from the design system.** Before building or restyling
    a page, read the design system (its `README.md` and `tokens.json`; if
    the link is unreachable, the snapshot in `design/`). Map its tokens into
    the `:root` variables of `site/styles.css`, load its fonts, use real
    photos from `site/img/`. Refresh the snapshot whenever the system changes.
12. **Programme vocabulary:** segment · assumption · give and ask · metric ·
    EVIDENCE / INFERENCE / UNKNOWN · responded / committed / paid.

### Skills

| Command | Does |
|---|---|
| `/setup-venture` | builds *The venture* section from the Demo Day page — run once |
| `/new-page` | builds a page or a channel variant from this file and `evidence/` |
| `/publish` | checks, commits, pushes, and confirms the change is live |
| `/log` | records a deposit or a team expense in the ledgers |
| `/wrap-up` | updates `project-state.md`, commits, pushes |
