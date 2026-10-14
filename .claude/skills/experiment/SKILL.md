---
name: experiment
description: Design the team's next experiment and get the ask out to people. Reads the commitments ledger to find which leg the team is on — the first 10, or 10 to 50 — audits the commitments so far, picks the assumption to test, does the arithmetic, writes the card to experiments/, and ends with the first asks sent. Also reads a running experiment once its read date has passed. Use whenever the team asks "what next?", has a page live and no asks out, or reaches the first milestone.
---

# Design the next experiment

A page is a tool. The experiment starts when the ask reaches people, so this
skill ends with asks sent, counted on the card.

Work through the steps in order. Ask the team one question at a time. Label
every claim EVIDENCE, INFERENCE (a hint or our reading) or UNKNOWN, and use
the rubric's words for strength of proof: responded · committed · paid.
Programme vocabulary throughout: segment · assumption · give and ask ·
metric · channel.

## 0. Read first

Read `CLAUDE.md`, `project-state.md`, `evidence/commitments.csv`,
`evidence/language.md` and every card in `experiments/`.

**A card is running and its read date has passed?** Go to *Reading a card*
at the end, and design the next one only after the team has read this one.

## 1. Which leg

Count confirmed rows of the milestone's kind in `evidence/commitments.csv`
(the milestone is in `CLAUDE.md`).

| Confirmed | Leg | The question this leg answers |
|---|---|---|
| below the first milestone (10 deposits, or 1 signed pilot) | **The first 10** | Will anyone commit at all? |
| at or above it, below the next (50, or 3 accounts) | **10 to 50** | Will people outside our network commit, through a channel we can repeat? |

Tell the team the leg and the count in one line. A team on the first 10
skips step 2 and follows the notes marked *First 10*.

**Build work planned before the first send?** Ask what the team means to
build, restyle or add before anyone outside the team sees it. Move all of
it after the sends: the product as it stands today is the give for this
experiment, and the people who use it will say which polish matters. The
one exception is a fault that stops the ask from working on a phone.

## 2. Audit the 10 (10 to 50 only)

The first ten say where the next forty come from. For each confirmed row,
fill what is missing by asking the team, one question per gap:

- **How they knew us:** `network` (friend, family, colleague, a friend of
  one of them) or `stranger` (found us through a channel, from outside the
  founders' circles). Write it at the start of the row's `note`, e.g. `network: colleague
  of a founder`.
- **Channel:** the `?ref=` code, or how the team reached them.
- **What exactly they reserved:** the product, the delivery window, and
  whether the deposit is refundable.
- **Deposit against full price:** the amount, the full price, and the
  deposit as a share of it. A full price still unset is an UNKNOWN; write it.

Then ask the team how many people they asked to get these ten. Use their
best count, labelled.

Print the audit in five lines:

```
CONFIRMED: N — network X · strangers Y
BEST CHANNEL SO FAR: [code] — [n] of the N
ASKED TO GET THEM: [count] → rate [N/asked] — EVIDENCE | INFERENCE
DEPOSIT: [amount] of [full price] = [share] — refundable: [yes/no/UNKNOWN]
WHAT THEY RESERVED: [one line, as the depositors understood it]
```

Save the updated notes to `evidence/commitments.csv`.

## 3. The assumption this experiment tests

Each leg has its own riskiest assumptions. Propose one, show the team why,
and let them choose.

**10 to 50** — the defaults, in the order they usually bite:

1. **Strangers pay.** People outside our network take the ask on the strength
   of the page and the proof alone. *Desirability question 3, for
   strangers.* First whenever most of the ten came from the network.
2. **A channel we can repeat.** One channel brings commitments at a rate
   that reaches 40 more within the programme. *Question 5.*
3. **We can tell who belongs.** We can spot the segment before we ask: a
   signal, a group, a place. *Question 4.* First when the ten look unalike
   from the outside.
4. **The price holds.** The full price, or a deposit closer to it, still
   converts. *Question 6.* First when the deposit is a small share of an
   unset price.

Then challenge the choice, in two questions to the team: *If this assumption
is false, do the 50 still happen?* and *Is this the assumption we fear, or
the one that is comfortable to test?* Rewrite it if the answers say so.

Write it as one sentence that this week's count can prove false:
*"[Segment] outside our network will pay a [deposit] for [what they reserve]
after seeing [proof], through [channel]."*

**First 10** — the assumption is that someone in the segment commits at
all. Start with the people the team already interviewed, then their
network. The test is the direct ask; a page is optional.

**First 10, with a working app or prototype** — the app is the give, and
the ask climbs in two steps, both written on the card before the first send:

1. **Use it (act):** a specific use in a fixed window, chosen so it shows
   the habit the product needs — e.g. *use it on five separate days in
   the next week*. A download or a sign-up is a response; the use is the commitment.
2. **Pay (paid):** to everyone who reaches the use, the paid step — a
   lifetime early-bird subscription to the premium features, or a
   pre-order (of a later version, or of hardware that comes later). Price
   and terms on the card from day one.

**Only step 2 counts toward the 10.** Beta testers and free users are
step 1: committed, and on the way to the milestone. The 10 are people who
paid for the premium features or pre-ordered, on one single proposition.
Log step-2 commitments with `/log`; keep step-1 users in the card's result.

The assumption under test is the first step: *[segment] will [use it this
way] within [window].* The count of people reaching step 2 tells the team
how many to ask next time. The paid step is how the team reaches the
milestone, so it completes the card.

## 4. Hold the rest still

Copy these from `CLAUDE.md`, word for word, onto the card: the segment, the
problem assumption, the ask and its amount, the give. The experiment changes
only what the assumption is about. With one change, a result tells the team
what caused it.

For **strangers pay**, the ask and amount match the first ten's, and the
channel and the proof are the new parts. For **the price holds**, the price
is the one change.

## 5. The arithmetic

Show the working on the card.

- **Still to go:** 50 − confirmed (or 3 − signed accounts).
- **Expected rate:** start from the rate in the audit. Strangers usually
  convert at a lower rate than friends; ask the team for their own estimate
  and label it INFERENCE.
- **How many to ask:** enough people that the team expects at least 3
  yeses. Formula: people to ask = 3 ÷ expected rate. Example: at an
  expected 5%, ask 60. Why 3: ask 10 people at 5% and the team expects half
  a yes, so zero yeses is the likeliest outcome even when the assumption is
  true. Ask 60, and zero yeses turns up about one time in twenty by chance:
  a zero from 60 says the assumption is false. Say this to the team in one
  line, with their own numbers.
- **Readable within a week:** if the team cannot reach that many through
  one channel in seven days, choose a channel where it can, or lower the
  ask's step (a booking before a deposit) and say so on the card.
- **The road to 50:** at this rate, how many people the 40 need, and how
  many weeks at this pace. One line. This is the number the team is
  testing whether it can afford.

## 6. Channel

One channel per experiment, so the count says which channel did it. Choose
where the segment already gathers, and where the team can return next week:
a repeatable channel is the point of this leg.

**Every channel on this leg is direct effort:** the founders reach each
person, post or group themselves. The first 50 come from the team's own
hands; that is part of what the leg proves. Paid ads come after 50, once
direct effort has shown who commits and which words move them. A team that
proposes ads hears this reasoning, then picks a direct channel.

Options to put in front of the team, with the audit beside them:

- **The ten, as a channel.** Each depositor passes the link to one person
  like them (code `ref=ref-<initial>`). Fast, and still close to the
  network: record those depositors as `network` if they know the referrer
  personally.
- **People who show the signal:** strangers who post about the problem —
  a complaint, a question, a workaround — reached one by one with a direct
  message that quotes what they wrote.
- **Communities:** Instagram, Reddit, Facebook, WhatsApp or Telegram groups,
  LinkedIn groups, forums where the segment talks about the problem. Be a
  member first: answer, help, then ask. Read each group's rules before
  posting.
- **Places and events:** fairs, shops, clubs, meet-ups, with a QR code
  (`/new-page` makes the channel's variant).

**First 10:** the channel is the team's own contacts, interviewees first.

## 7. Give and ask

- **The ask:** the same as the first ten's (step 4), unless price is the
  assumption. One sentence, one action.
- **The give:** what the person gets for the ask, worth what it costs them.
- **Proof for strangers:** the ten are the proof. With each depositor's
  permission, a quote, a first name, a photo of them with the sample. The
  count itself, if true: *10 founding members so far*.
- **A reason to act now that is true:** a first batch of 50, a founding
  price until a date, a vote on the final design for depositors. Each one
  is a promise the team then keeps.
- **Message match:** the first line of every post or message uses the
  segment's words from `evidence/language.md`, and the page it links to
  opens on the same words. Build the channel's page variant with `/new-page`
  when the channel needs a page; a payment or booking link alone works for
  direct messages.

## 8. Lead collector and metric

- **Lead collector:** the page's own count by `?ref=` code
  (`funnel_by_source`), and every confirmed ask in `evidence/commitments.csv`
  with the same code, through `/log`.
- **Metric**, in the programme's form, with a read date seven days out:
  *"By [day] we will have asked N [segment] through [channel]; M will have
  [done the ask]. We record the actual, including zero."*
  N and M come from step 5.

## 9. The send plan

Write who sends what, where, and when. Each line is one send:

| # | Where or who | Owner | Link with `?ref=` | Date | Sent |
|---|---|---|---|---|---|

Draft the first message, or the post, for each kind of send from
`evidence/language.md`: it opens on the segment's own words, says the
stage honestly, and makes the ask in one sentence.

Then, while this session is open: **ask the team to send the first five.**
Wait. Tick each one they confirm, and write the count on the card. The
experiment is live once the first send has gone out.

## 10. Write it down

Save the card as `experiments/NN-short-name.md`, numbered after the last
card, in this shape:

```
# Experiment NN — [short name]

_Designed [date] by [names] · Leg: [first 10 | 10 to 50] · Confirmed at start: N · Read on [date]_

**Assumption tested:** [one sentence] — desirability question [n]
**Why this one:** [the audit line that points to it]

## The eight buckets
- User segment: [copied from CLAUDE.md]
- Problem assumption: [copied from CLAUDE.md]
- Desirability assumption: [step 3]
- Channel: [one channel] — code `ref=[code]`
- Give (hook): [step 7, with the proof]
- Ask (CTA): [step 7]
- Lead collector: [step 8]
- Metric: By [day] we will have asked N [segment] through [channel]; M will have [done the ask].

## Held still
[what was copied unchanged, and the one thing this experiment changes]

## The arithmetic
[step 5, every number labelled]

## Send plan
[step 9 table; sent so far: n]

## Result — filled on the read date
- Asked: · Responded: · Committed: · Paid:
- Strangers among those who paid:
- Reading:
- Next:
```

Update `project-state.md`: the *Metric this week* line, and under *Now* a
line `Experiment running: experiments/NN-….md — asked n of N; m confirmed;
read on [date]`. Commit: `Experiment NN: <the assumption, short>`, and push.

Close with two lines the team can paste into the Spark WhatsApp group: the
assumption, and the metric.

## Reading a card

On or after the read date:

1. **Count.** Asked (sends ticked on the card), responded, committed, paid,
   by `?ref=` code, from `funnel_by_source` and `evidence/commitments.csv`.
   How many of those who paid are strangers.
2. **Write the actual next to the metric**, including zero, in *Result*.
3. **Read it with the team**, in one of three ways:
   - **Keep:** the channel reached the expected count. Run it again at the
     size the road to 50 needs, and record the new card as a repeat.
   - **Change one thing:** the count came in below. Choose the one change
     the numbers point to — the channel (few visitors), the page and proof
     (visitors, few ask clicks), or the ask and its friction (clicks, few
     confirmed) — and design the next card with that change alone.
   - **Rethink:** zero yeses from enough people asked (step 5's number).
     The assumption is
     false as written. Go back to step 3 with this result in the audit.
4. **Ask the people who acted one question**, within 24 hours of their
   commitment: *what almost stopped you?* Add their answers, verbatim, to
   `evidence/language.md`.
5. Save the card, update `project-state.md`, commit: `Experiment NN: read`.

## B2B teams

The same steps, with the pilot in place of the deposit: the first leg is
one signed pilot, the second is three accounts. In the audit, *how they
knew us* is the introduction path, and the ask's strength is what the
client commits to: a meeting, a letter of intent, a signed pilot with
scope and dates.
