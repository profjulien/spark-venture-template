# The ask

Every page asks visitors to do one thing. That is the ask, and what you
offer in return is the give. A stronger ask means fewer people say yes, and
each yes tells you more — so a small number of strong yeses beats a long
list of emails.

## Four kinds of ask

From the lightest commitment to the strongest:

| Type | They give | Where it lands | Examples |
|---|---|---|---|
| `signup` | email or WhatsApp | the form on the page → Supabase `leads` | waitlist, early access, beta list |
| `form` | details, in writing | a form link (Tally, Google Forms, Typeform) | pilot request, letter of intent, application |
| `booking` | time | a calendar link (Cal.com, Calendly, Google Calendar) | demo, fitting, discovery call |
| `payment` | money | a payment link, or manual transfer | deposit, pre-order, purchase |

Pick one per page, in `site/config.js` → `ask`. Every button marked
`data-ask` follows it. The list sign-up stays on every page as the fallback
for visitors who want to wait.

## Setting it up

**`signup`** — nothing to connect beyond Supabase (`docs/setup.md`). The
button scrolls to the form.

**`form`** — build the form in Tally or Google Forms with the questions a
real commitment needs (who, what, when, who signs). Set its confirmation to
redirect to `…/thanks.html`. Paste the link into `ask.link`.

**`booking`** — create one event type in Cal.com or Calendly, with the
two or three questions you need answered before the call. Redirect to
`…/thanks.html` after booking. Paste the link into `ask.link`.

**`payment`** — a Stripe, Razorpay or Xendit payment link, or manual
instructions: see [`payments.md`](payments.md). Set `ask.provider`.

## Counting

The page counts clicks on the ask by itself (`cta_click` in Supabase). What
counts toward the milestone is the **confirmed** ask — money received, a
call held, a form signed. Record each one with `/log` in
`evidence/commitments.csv`: one row per commitment, whatever its kind.

## Writing the button

The button says what happens next, in the visitor's words:

- *Reserve mine — S$50, refundable*
- *Book a 20-minute demo*
- *Request a pilot for my team*
- *Get early access*

The deal section says what the visitor gives, what they get, and what
happens after.
