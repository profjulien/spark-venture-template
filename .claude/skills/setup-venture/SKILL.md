---
name: setup-venture
description: First-run setup. Turns the team's venture brief and answers into "The venture" section of CLAUDE.md, then drafts the starter page copy. Use once at the start, and again when the single proposition changes.
---

# Set up the venture memory

The page can only be as sharp as this section. Take the time.

1. **Collect.** Ask the team for:
   - the venture brief — any one-pager: pitch page, canvas, notes (file,
     link or pasted text);
   - the single proposition, one sentence;
   - the deposit: amount, currency, what it reserves, refund terms, delivery
     window — or, for a B2B pilot, the feature scope, what the client
     commits to, and who signs;
   - the founders' names and the city each is based in;
   - 3–5 visuals, if they have them (save into `site/img/`).

2. **Save the source.** Write the venture brief to
   `evidence/brief.md`. Save any interview notes they paste as
   `evidence/interview-YYYY-MM-DD-firstname.md`.

3. **Draft *The venture*** in `CLAUDE.md`. Fill every bracket. Label each
   evidence line EVIDENCE, INFERENCE (a hint or our reading) or UNKNOWN.
   Rate strength of proof as responded · committed · paid.

4. **One proposition.** If the team brings two, stop and ask them to choose.
   Park the other in `project-state.md` under *Parked*.

5. **Probe the UNKNOWNs.** For each UNKNOWN, ask the team one question about
   what they actually hold. Update the line from their answer.

6. **Confirm.** Show the finished section. Ask the team to confirm the single
   proposition word for word.

7. **Draft the page.** Replace the brackets in `site/index.html`,
   `site/thanks.html` and `site/policies.html` with copy drawn only from
   `CLAUDE.md` and `evidence/`. Where evidence is missing (say, no quote the
   team may use), leave that block out and tell them what would fill it.
   Set `venture` in `site/config.js`.

8. **Record and commit.** Fill `project-state.md` (milestone, count, this
   week's metric in the form *"By [day] we will have asked N [segment]; M
   will have [done the ask]."*). Commit: `Venture memory v1`.

Tell the team what to do next: `docs/setup.md`, step 1 — the design system.
