# Measuring the page

The page counts what visitors do, from arriving to saying yes, and which
channel brought them. Everything lands in your Supabase database; two views
turn it into a funnel you can read in one glance.

## The funnel

```
visitors → engaged → clicked → leads → confirmed
```

| Stage | Counted when | Tells you |
|---|---|---|
| **visitors** | the page loads (`page_view`) | whether the channel brings people |
| **engaged** | half the page scrolled, or 15 seconds in view (`engaged`) | whether the top of the page holds them |
| **clicked** | a click on the ask button (`cta_click`) | whether the offer pulls |
| **leads** | a list sign-up (`lead`, and a row in `leads`) | a softer yes |
| **confirmed** | a paid deposit, a call held, a form signed — recorded with `/log` | the milestone |

Visitors, engaged and clicked count **people**, once each, through an
anonymous id kept in their browser. Confirmed comes from
`evidence/commitments.csv` (import it into the `commitments` table to see
it in the views) or, at Level 2, from a webhook.

## Reading it

Supabase → **Table Editor**:

- **`funnel_by_source`** — one row per channel, with `clicked_pct` and
  `confirmed_pct`. This is the view that tells you where to spend next week.
- **`funnel_daily`** — one row per day. Watch it after every change to the
  page.

What the stages point to:

- Few visitors → the channel. Post elsewhere, or ask more people directly.
- Visitors, few engaged → the top of the page. Rewrite the headline in the
  customers' words (`converting-page.md`).
- Engaged, few clicks → the offer. Revisit the give and the ask
  (`the-ask.md`).
- Clicks, few confirmed → the step after the click: the payment page, the
  calendar, the form, or your follow-up.

With small numbers, read people over percentages: 2 of 30 and 4 of 30 are
the same result. Change one thing at a time.

## Channels

Every link you post carries its channel: `?ref=linkedin`, `?ref=wa-group`,
`?ref=fair`. For a link with no code, the page records the referring
site, or `direct`. Use the same codes in the `channel` column when you `/log` a
commitment, so the two meet in `funnel_by_source`.

Stripe payment links also carry the visitor's id back
(`client_reference_id`), so at Level 2 each payment ties to the visit and
channel that produced it.

## Your own events

Anything else worth counting takes one line in the page's script:

```js
track("price_viewed");
track("video_played", { seconds: 30 });
```

Names are lowercase with underscores. They appear in the `events` table
next to the standard ones, and Claude can add them to the views on request.

When the product arrives, two events join the funnel: `signup` (an account
created) and `activated` — the first action that proves value, which each
team defines for its own product.

## Privacy

No cookies, no personal data in the events: a random id in the visitor's
browser, the page, the channel, the device type. The privacy policy says
so in one line. Emails exist only in `leads`, from people who gave them.

## Cross-checks and next steps

- **Cloudflare Web Analytics** (free, no cookies; Pages project →
  **Metrics**) counts visits independently and filters bots. If its numbers
  and yours drift far apart, something is off.
- **PostHog** is the usual next step once the product has users: session
  replays, product funnels, retention. The events here stay useful for the
  landing page.
