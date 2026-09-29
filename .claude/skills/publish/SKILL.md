---
name: publish
description: Check, commit and push the site so Cloudflare publishes it, then confirm the change is live. Use whenever the team wants a change on the live page.
---

# Publish

1. **Show what changed.** `git status` and `git diff --stat`. Summarise the
   changes in plain words.

2. **Checks — stop and fix before going further:**
   - **Secrets:** search `site/` and every staged file (this skill file
     aside) for `sk_live`, `sk_test`, `rk_live`, `service_role`,
     `sb_secret_`, and any `.env` file. Any hit: remove it and explain why.
   - **Brackets:** list any `[…]` placeholder left in `site/*.html`. Ask
     whether to fill or remove each one.
   - **Links:** every page links to `policies.html` and every deposit
     button carries `data-deposit`.
   - **Payment:** `site/config.js` has a provider, and either a
     `depositLink` or, for `manual`, `manualInstructions`.

3. **Commit** with a message that says what changed and why, e.g.
   `Headline uses the customer's own words; LinkedIn variant added`.

4. **Push.** On `main`, `git push` publishes. On a branch, push the branch
   and give the team its preview address.

5. **Confirm it is live.** Wait about a minute. Fetch the live address from
   `CLAUDE.md` (*Live page*) and check the change is there. Ask the team to
   open it on a phone and click the deposit button once.

6. **Record** the publish in `project-state.md` under *Last session*.
