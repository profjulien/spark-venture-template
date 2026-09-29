# Spark setup — one prompt

Create a new, empty folder named after your venture (for example
`~/my-venture`), outside Google Drive, Dropbox, iCloud and your Phase 1
Venture Folder. This folder becomes your team repo. Open Claude Code on it
(desktop app, Code tab), start a new session, paste the prompt below, and
follow along. Claude does
the technical steps and walks you through every sign-up. Each founder runs
it once: one creates the team setup, the other joins it.

```
Set up my Spark build infrastructure with me, step by step. Do the
technical steps yourself. Sign-ups and sign-ins are mine: open the page,
tell me exactly what to click, and wait for my confirmation before moving
on. Keep passwords and API keys out of this chat.

First, ask me:
a) my first name;
b) my venture's name, short and lowercase: it names the repo and, later,
   the web address;
c) whether I create the team setup, or join my co-founder's (then ask for
   the repo address);
d) my payment provider: Stripe, Razorpay (India), Xendit (Indonesia) or
   manual transfer, and whether I hold the team's payment account.

Then work through these in order, and report ✅ or ❌ after each:

1. Tools: git and the GitHub CLI are installed; git is set up with my name
   and email.
2. GitHub: I have an account with two-factor authentication on, and the
   GitHub CLI is signed in to it (walk me through the browser sign-in).
3. Team repo:
   - If I create: make a private repo named after the venture from the
     template profjulien/spark-venture-template, then invite my
     co-founder as a collaborator (ask for their GitHub username).
   - If I join: have me accept the invite at github.com/notifications.
   Then bring the repo into the folder this session is open on: it is
   empty and becomes our team repo. First check the folder is outside
   Google Drive, Dropbox and iCloud; if it is inside one, stop and help me
   pick a new place. If we have an older repo for this venture, copy its
   files into legacy/ and commit.
4. Push test: create a branch called setup-check, push it, delete it.
5. Accounts, one at a time: Cloudflare (free plan) and Supabase (sign up
   with GitHub). Accounts only for now; the projects come in
   docs/setup.md. If I create, I will own the team's projects and invite
   my co-founder then; if I join, I accept those invites when they come.
6. Payments, if I hold the team's payment account:
   - Stripe: I open an account at stripe.com and stay in the sandbox.
     Then I connect Stripe to Claude. In the Claude desktop app: open
     Customize, search for Stripe, install it, sign in to Stripe when the
     browser opens, choose the sandbox account and click Allow. In a
     terminal instead: claude plugin install stripe@claude-plugins-official.
     Wait for me, then check the Stripe tools reach my sandbox account.
   - Razorpay or Xendit: open the sign-up page and wait until I confirm
     my sign-up has started (activation takes a few days).
   - Manual transfer, or the other founder holds the account: mark ✅.

Finish with five lines on what now exists (repo address, local folder,
accounts, payment set-up, anything pending). Remind me to start a new
session in this same folder, so the /commands load, and to work in this
folder from now on: the team's memory lives here. Then end with exactly
one line:
SETUP <my first name>: N/6 green — <anything still red>
```

## What it leaves you with

- A private team repo made from this template, on GitHub, with both
  founders as collaborators, in the folder you started from.
- Accounts on GitHub, Cloudflare and Supabase, each founder on their own
  login.
- A payment account under way: Stripe in sandbox, connected to Claude
  Code, or Razorpay or Xendit activation started.

Start a new session in that same folder so the `/commands` load. From now
on, work there: the team's memory lives in it.

Next: `docs/setup.md` takes you from **Setup complete** to **Ready to
launch** — design system, database, hosting, and the ask.
