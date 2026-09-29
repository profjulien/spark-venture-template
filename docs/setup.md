# First setup — about an hour

Do these in order. Claude can walk you through each one: say
*"walk me through step N of docs/setup.md"*.

## 0. Venture memory · 10 min

Run **`/setup-venture`**. Have your Demo Day page and your single proposition
ready. It fills *The venture* in `CLAUDE.md` and drafts the page copy.

## 1. The look — Claude Design · 20 min

Follow [`design.md`](design.md): build your design system from your
references and photos, mock the top of the page, and put the link in
`CLAUDE.md`. Then ask Claude to apply it to the page.

## 2. Database — Supabase · 10 min

1. supabase.com → **New project**. Name: your venture. Region: the one
   closest to your customers (Singapore or Mumbai). Save the database password
   in your password manager.
2. **SQL Editor → New query.** Paste all of `supabase/schema.sql`. **Run.**
3. **Project Settings → API Keys.** Copy the **Project URL** and the
   **publishable key** into `site/config.js`.
4. Check: open `site/index.html`, submit the form with your own email, then
   look in **Table Editor → leads**. Your row is there, and
   **funnel_daily** shows you as one visitor. What the funnel measures:
   [`measure.md`](measure.md).

Free projects pause after about a week idle. Page traffic keeps
yours awake; if it sleeps, press **Restore** in the dashboard.

## 3. Hosting — Cloudflare Pages · 10 min

1. `/publish` once, so your latest work is on GitHub.
2. dash.cloudflare.com → **Workers & Pages → Create → Pages →
   Import an existing Git repository.** Authorise GitHub; pick your repo.
3. Build settings: **Framework preset** None · **Build command** empty ·
   **Build output directory** `site`. **Save and Deploy.**
4. Your address is `https://<project>.pages.dev`. Put it in `CLAUDE.md`
   under *Live page*.

From now on, every push to `main` goes live in about a minute.
Details and plan B: [`hosting.md`](hosting.md).

## 4. The ask — your link · 10 min

Set `ask.type` in `site/config.js` (see [`the-ask.md`](the-ask.md)). For a
`signup`, skip to *Done when*. For a `form` or `booking`, create the link,
redirect it to `…/thanks.html`, paste it into `ask.link`, `/publish`. For a
`payment`, the Stripe sandbox:

1. Stripe dashboard, **sandbox** on → **Payment Links → New.**
2. Product: *Refundable deposit — [what it reserves]*. Price: your deposit.
3. **After payment → redirect to your website:**
   `https://<project>.pages.dev/thanks.html`
4. Optional: add a custom field (size, colour, company name).
5. Copy the link into `site/config.js` → `ask.link`. `/publish`.
6. Check: click **Reserve** on the live page, pay with the test card
   `4242 4242 4242 4242` (any future date, any CVC). You land on
   `thanks.html`.

Using Razorpay, Xendit or manual transfers instead: [`payments.md`](payments.md).

## Done when

- [ ] The live page opens on your phone, and looks like your design system.
- [ ] A test lead shows up in Supabase.
- [ ] The ask works end to end: a sandbox payment, a test booking or a
      test form lands on `thanks.html`.
- [ ] `/wrap-up` has recorded the live address.
