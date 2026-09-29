# Hosting

## Default: Cloudflare Pages

- Free plan: 500 builds a month, static traffic free, commercial use fine.
- Setup: [`setup.md`](setup.md), step 2. Output directory is always `site`.
- **`main` = live.** Every push to `main` publishes to
  `https://<project>.pages.dev`.
- **Any other branch = preview.** Push a branch and Cloudflare gives it its
  own address. Use it for bigger experiments; merge to `main` when it works.
- Own domain later (a marketing expense): **Custom domains** tab on the
  project.

Cloudflare's dashboard steers new projects toward *Workers*. Choose the
**Pages** tab when creating the project.

## Plan B

Both connect to the same GitHub repo. Switching takes minutes.

**Netlify**
- Free plan allows commercial sites. Hard cap of 300 credits a month; a
  production publish costs 15, so about 20 publishes. Past the cap, the site
  shows *Site not available* until the month resets. Branch previews are free.
- Work on a branch; merge to `main` in batches.
- Setup: **Add new project → Import an existing project → GitHub** → pick the
  repo → **Build command** empty · **Publish directory** `site`.

**Vercel**
- The free Hobby plan covers personal, non-commercial sites. A page that
  asks for payment is commercial under Vercel's own rules, so it belongs on
  the paid Pro plan.
- Setup: **Add New → Project** → import the repo → **Framework preset**
  Other · **Output directory** `site`.

## After any switch

1. Update *Live page* in `CLAUDE.md` and `project-state.md`.
2. Update the **after payment** redirect in your payment link.
3. Update the referral link on `thanks.html`.
