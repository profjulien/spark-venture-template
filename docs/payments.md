# Payments

For an ask of type `payment` (see [`the-ask.md`](the-ask.md)). Stripe is
the default. The page only knows two things, both in `site/config.js` →
`ask`: the **provider** and the **link**. Swapping provider means changing
those two lines.

Whatever the provider, every confirmed payment goes in
`evidence/commitments.csv` via `/log`.

## Which provider

It depends on where the **founder who holds the account** lives and banks.

| Founder based in | Use | Works as an individual? |
|---|---|---|
| Singapore | **Stripe** | Yes — *Individual / Sole proprietor*, NRIC or FIN, SG bank account |
| India | **Razorpay** | Yes — PAN, one ID, personal bank account. Stripe India is invite-only. |
| Indonesia | **Xendit** | Yes — QRIS, e-wallets, bank transfer. Cards need a registered company. |
| Anywhere, today | **Manual** | PayNow, UPI, bank transfer — confirm each one by hand |

Activation takes days. Start it early and use `manual` meanwhile.

## Level 1 — a payment link (now)

**Stripe**
1. Sandbox on → **Payment Links → New.** Product: *Refundable deposit —
   [what it reserves]*. After payment → redirect to `…/thanks.html`.
2. Link → `ask.link`, `ask.provider: "stripe"`.
3. Going live: activate the account (*Settings → Account*), using your live
   page as the website. Recreate the link in live mode and replace
   `ask.link`.

With the Stripe plugin connected to your **sandbox**, Claude can create the
product and link for you: *"create a sandbox payment link for our deposit
from CLAUDE.md"*. Keep the connection on the sandbox until you go live.

**Razorpay** — **Payment Links** or **Payment Pages** → create → copy the
link. `provider: "razorpay"`. Razorpay reviews your site for refund, terms
and contact pages before activation — `policies.html` covers all three.

**Xendit** — **Payment Links** → create → copy. `provider: "xendit"`.

**Manual** — `ask.provider: "manual"`, `ask.link: ""`, and write
`ask.instructions`, e.g. *"PayNow S$50 to +65 …, reference: your email.
We confirm within 24 hours."* The ask button then shows those
instructions.

Test before you share: one sandbox payment end to end, then one real payment
from a teammate, refunded.

**Before collecting real deposits:** the offer, the delivery window and the
refund terms are written on the page and in `policies.html`. Sandbox
payments prove the plumbing works; real payments are the evidence of demand.

## Level 2 — automatic logging (after the first 10)

When you move from 10 to 50, logging by hand gets slow. Level 2 replaces the
link with Stripe Checkout and a webhook that writes each payment into the
Supabase `commitments` table — same columns as `commitments.csv`.
It needs secret keys in `.env` and a small server function. Ask Claude to
plan it with you when you get there.

## Deposits, honestly

- Say **refundable** on the page, and mean it.
- State the **delivery window**. Payment providers watch pre-orders with far
  delivery dates; a clear window and refund policy keep your account healthy.
- Until you form a company, the founder personally holds customer money.
  Keep every record.
