# The look — with Claude Design

People decide in seconds whether a page is worth their money. The look does
half of that work, and your photos do most of the look. Claude Design comes
with your Claude plan (Pro and up) and shares its usage with Claude Code.

## Bring

- **Photos of the real thing** — samples, prototype, the app on a phone, the
  marina (with permission). Phone camera, daylight, plain background, 5–10
  shots. Save them in `site/img/` too.
- **2–3 sites your segment already buys from**, as screenshots. They set the
  bar and the register.
- **Three adjectives** for how the brand should feel.

## 1. The design system · 10 min

claude.ai → **Design → Design System.** Give it your photos, the reference
screenshots, the three adjectives, and your single proposition from
`CLAUDE.md`. Ask for a small system: palette, two typefaces, spacing, and a
one-page brand guide.

Borrow the register of your references; keep the colours, type and words
your own.

## 2. The top of the page · 10 min

claude.ai → **Design → Design.** Ask for the top of your deposit page —
headline, photo, deposit button — in **two or three directions**, phone
size first, using your design system. Pick one with your co-founder; comment
on the canvas to refine it.

## 3. Bring it into the repo · 5 min

- **Share** the design system and the canvas with your co-founder (Can edit).
- Paste the design system's link into `CLAUDE.md` → *Design system*.
- Hand the chosen design to Claude Code from the canvas's export options, or
  paste its link into Claude Code and say:

  > *Apply our design system and this design to site/. Save a snapshot of
  > the system in design/. Keep config.js, app.js and the policy links
  > working.*

Claude Code then builds the real page in `site/` — the one that takes
deposits and counts visits. The canvas stays your drawing board.

## When the look changes

Change it in Claude Design first, then ask Claude Code to refresh the page
and the snapshot in `design/`. The design system stays the single source of
the look.

## Plan B

Claude Design out of reach? Install Anthropic's design plugin in Claude
Code — `claude plugin install frontend-design@claude-plugins-official` —
and write the brief (photos, references, adjectives) into
`design/brand.md`. Claude builds from that.
