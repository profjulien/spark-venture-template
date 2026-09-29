---
name: log
description: Record a deposit (or refund) in evidence/deposits.csv, or a team expense in evidence/spend.csv with its receipt. Use whenever money moves — it keeps the milestone count and the spend record honest.
---

# Log money

Ask which: **deposit**, **refund**, or **spend**.

## Deposit or refund → `evidence/deposits.csv`

Columns: `date,provider,amount,currency,customer,reference,status,note`

- `provider`: stripe · razorpay · xendit · manual
- `customer`: first name + initial only
- `reference`: the provider's payment ID, or the transfer reference
- `status`: `paid`, or `refunded` (a refund updates the original row's
  status; add a note with the refund date)

## Spend → `evidence/spend.csv`

Columns: `date,item,category,amount,currency,paid_to,receipt_file`

- `category`: e.g. `sampling`, `marketing`, `tools` — match the categories
  of any grant or matched funding you report to
- Save the receipt as `evidence/receipts/YYYY-MM-DD-item.pdf` (or .png) and
  put that path in `receipt_file`.

## Then

Report back:
- **Milestone count:** paid rows, minus refunded, against the milestone in
  `CLAUDE.md`.
- **Spend to date** by category, with receipts — ready for any grant or
  matched-funding claim.

Update the count in `project-state.md`. Commit: `Log: <what>`.
