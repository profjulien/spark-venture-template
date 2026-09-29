---
name: setup-venture
description: First-run setup. Turns the team's Demo Day page and pre-work answers into "The venture" section of CLAUDE.md, then drafts the starter page copy. Use once at the start, and again when the single proposition changes.
---

# Set up the venture memory

The page can only be as sharp as this section. Take the time.

1. **Collect.** Start with what is already in the repo: `phase1/` (the
   Phase 1 Venture Folder — `venture_context.md`, `venture_memory.md`,
   `traction_log.md`, `week0/`) and `evidence/`. Read all of it. Then ask
   the team only for what is still missing:
   - the Demo Day page (file, link or pasted text);
   - the single proposition, one sentence;
   - the ask and the give: which type (signup · form · booking · payment,
     see `docs/the-ask.md`), exactly what is asked, what the visitor gets,
     and the terms (for a payment: amount, refund, delivery window; for a
     pilot: scope, what the client commits to, who signs);
   - the founders' names and the city each is based in;
   - 3–5 visuals, if they have them (save into `site/img/`).

2. **Save the source.** Write the Demo Day page to
   `evidence/demo-day-page.md`. Save any interview notes or transcripts
   they paste as `evidence/interview-YYYY-MM-DD-firstname.md`, and their
   problem space canvas as `evidence/canvas.md`.

   **Fill the language bank.** Go through every transcript, note and reply;
   copy customers' exact phrases into `evidence/language.md` under the
   canvas heading they belong to, each with its source. Verbatim only —
   the team's own summaries stay out. List the jargon the team uses that
   customers never said under *Our jargon*.

3. **Draft *The venture*** in `CLAUDE.md`. Fill every bracket. Label each
   evidence line EVIDENCE, INFERENCE (a hint or our reading) or UNKNOWN.
   Use the rubric's words for strength of proof: responded · committed · paid.

4. **One proposition.** If the team brings two, stop and ask them to choose.
   Park the other in `project-state.md` under *Parked*.

5. **Probe the UNKNOWNs.** For each UNKNOWN, ask the team one question about
   what they actually hold. Update the line from their answer.

6. **Confirm.** Show the finished section. Ask the team to confirm the single
   proposition word for word.

7. **Draft the page** to `docs/converting-page.md`. Replace the brackets in `site/index.html`,
   `site/thanks.html` and `site/policies.html` with copy drawn only from
   `CLAUDE.md` and `evidence/`. Where evidence is missing (say, no quote the
   team may use), leave that block out and tell them what would fill it.
   Set `venture` and `ask.type` in `site/config.js`.

8. **Record and commit.** Fill `project-state.md` (milestone, count, this
   week's metric in the form *"By [day] we will have asked N [segment]; M
   will have [done the ask]."*). Commit: `Venture memory v1`.

Tell the team what to do next: `docs/setup.md`, step 1 — the design system.
