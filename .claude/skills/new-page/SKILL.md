---
name: new-page
description: Build a new page or a variant of the deposit page — for a channel (LinkedIn, a community, a pet fair QR code), a sub-segment, or a new headline test. Draws only on CLAUDE.md and evidence/.
---

# Build a page

1. **Read** `CLAUDE.md`, `project-state.md` and the list of files in
   `evidence/`.

2. **Ask three things** (skip any the team already said):
   - Who arrives here, and from where? (the channel)
   - What one action should they take? (usually: pay the deposit)
   - What is this page testing? (a headline, a segment, a channel)

3. **Build** `site/<short-name>.html` from `site/index.html` — same
   `styles.css`, `config.js`, `app.js`, footer and policy links. Keep the
   deposit buttons as `data-deposit` so the payment link stays in one place.

4. **Copy rules.**
   - Speak to the channel's visitor in the segment's words (*Voice on the
     page* in `CLAUDE.md`).
   - Every claim traces to `evidence/`. Quotes verbatim, with permission.
   - Where the evidence is thin, write less.

5. **Preview.** Open the page locally (the `site` preview in the desktop app,
   or open the file). Check it at phone width.

6. **Report** to the team:
   - the page's address once published: `https://<project>.pages.dev/<short-name>.html?ref=<channel>`;
   - each claim on the page and the evidence file it comes from;
   - what the page tests, and the number that will tell them.

Publishing is a separate step: `/publish`.
