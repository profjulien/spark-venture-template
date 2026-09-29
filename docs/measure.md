# Measuring the page

The page counts what visitors do, from arriving to saying yes, and which
channel brought them. Everything lands in your Supabase database; two views
turn it into a funnel you can read in one glance.

## The funnel

Visits and clicks are tracked automatically. You record confirmed asks with
`/log`. At the end of each session, `/wrap-up` updates the team's progress
summary in `project-state.md`.

**Main path:** `visitors → ask clicks → confirmed`

| Count | Made | If it is low, possible explanations to investigate |
|---|---|---|
| **visitors** | automatically, on page load (`page_view`) | the channel, the message that carried the link, the timing |
| **ask clicks** | automatically, on each click of the ask button (`cta_click`) | the offer, the price, trust in the page, the headline |
| **confirmed** | by you, with `/log` (or a webhook at Level 2) | payment or booking friction, price, trust, timing, your follow-up |

**Other route:** `visitors → list sign-ups → your follow-up → confirmed`.
Sign-ups are tracked automatically (`lead`); the follow-up is yours.

**Supporting signal:** `engaged` — half the page scrolled, or 15 seconds in
view. A hint about the top of the page; read it next to clicks and
confirmed asks.

Visitors, engaged and ask clicks count **people**, once each, through an
anonymous id kept in their browser. Confirmed comes from
`evidence/commitments.csv` (import it into the `commitments` table to see
it in the views) or, at Level 2, from a webhook.

## Reading it

Supabase → **Table Editor**:

- **`funnel_by_source`** — one row per channel: raw counts, then
  `clicked_pct` and `confirmed_pct`.
- **`funnel_daily`** — one row per day. Watch it after every change to the
  page.

Report **raw counts next to rates**: 2 of 30 is a count first, and with
small numbers 2 of 30 and 4 of 30 are the same result. A low number points
to several possible explanations; test one at a time, and change one thing
at a time.

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

Visitor tracking stores four things: a random id kept in the visitor's
browser, the page, the channel and the device type. Names and emails exist
only in `leads`, for people who join the list. The privacy policy says so
in one line.

## Cross-checks and next steps

- **Cloudflare Web Analytics** (free, no cookies; Pages project →
  **Metrics**) counts visits independently and filters bots. If its numbers
  and yours drift far apart, something is off.
- **PostHog** is the usual next step once the product has users: session
  replays, product funnels, retention. The events here stay useful for the
  landing page.
