---
name: log
description: Record a confirmed ask — a deposit, pre-order, booking held, pilot or letter signed — or a refund or cancellation, in evidence/commitments.csv; or a team expense in evidence/spend.csv with its receipt. Use whenever a commitment is confirmed or money moves.
---

# Log it

Ask which: **commitment**, **refund or cancellation**, or **spend**.

## Commitment → `evidence/commitments.csv`

Columns: `date,kind,channel,amount,currency,provider,customer,reference,status,note`

- `kind`: what was confirmed — `deposit`, `pre-order`, `purchase`, `booking`,
  `pilot`, `loi`, `application`, or the team's own word (lowercase, hyphens)
- `channel`: where this person came from — the same code as the `?ref=` on
  their link, so it meets the page's own counts in `funnel_by_source` (or how you
  reached them)
- `amount`, `currency`, `provider`: for payments only; leave empty otherwise
- `customer`: first name + initial only
- `reference`: the payment ID, booking ID, form response or document name
- `status`: `confirmed`; a refund or cancellation updates the original row
  to `refunded` or `cancelled`, with the date in `note`

Count only what is confirmed: money received, a call held, a form or letter
signed. A click or a promise stays out.

## Spend → `evidence/spend.csv`

Columns: `date,item,category,amount,currency,paid_to,receipt_file`

- `category`: `sampling` or `marketing` — the two that ESSEC matches
- Save the receipt as `evidence/receipts/YYYY-MM-DD-item.pdf` (or .png) and
  put that path in `receipt_file`.

## Then

Report back:
- **Milestone count:** confirmed rows of the milestone's kind, against the
  milestone in `CLAUDE.md`.
- **By channel:** confirmed commitments per channel.
- **Spend to date** by category, and the ESSEC match it unlocks (1 for 1, up
  to €500, once the validation milestone is reached).

Update the count in `project-state.md`. Commit: `Log: <what>`.
