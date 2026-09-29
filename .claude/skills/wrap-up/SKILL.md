---
name: wrap-up
description: End-of-session save. Updates project-state.md with counts, this week's metric and the next action, updates CLAUDE.md if a stable fact changed, then commits and pushes. Use at the end of every working session.
---

# Wrap up

1. **Count.**
   - Deposits: paid minus refunded, from `evidence/deposits.csv`.
   - Funnel: ask the team to open Supabase → **Table Editor →
     funnel_by_day** and read out this week's views, deposit clicks and
     leads. Record what they say.

2. **Update `project-state.md`:**
   - *Updated* line: today's date and who worked.
   - *Now*: milestone, count, funnel, live page.
   - *Metric this week*: *"By [day] we will have asked N [segment]; M will
     have [done the ask]. We record the actual, including zero."* If last
     week's metric is due, write the actual next to it.
   - *Last session*: what changed, in three lines or fewer.
   - *Next*: the single next action, and who does it.
   - *Blocked / waiting on*: anything outside the team's hands.

3. **Update `CLAUDE.md`** only if a stable fact changed: the proposition, the
   deposit terms, the segment, or an evidence line moving from UNKNOWN to
   EVIDENCE. Say which lines changed.

4. **Commit and push.** Message: `Session YYYY-MM-DD: <one line>`.

5. **Tell the team** the next action and the metric, in two lines — ready to
   paste into your team or programme channel.
