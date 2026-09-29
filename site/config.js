// The one settings file. Change the ask and database settings here only.
// Everything in this file is public — secret keys belong in .env.

window.SPARK_CONFIG = {
  venture: "[Venture name]",

  // The ask: the one thing the page asks visitors to do. See docs/the-ask.md.
  ask: {
    // signup  — join the list: the form on the page, no link needed
    // form    — a commitment in writing: pilot request, letter of intent, application
    // booking — time: a call, a demo, a fitting
    // payment — money: a deposit, a pre-order, a purchase
    type: "payment",
    // Where the button leads: the payment, calendar or form link.
    // Sandbox or test link while testing, live link once activated.
    link: "",
    // payment only: stripe | razorpay | xendit | manual
    provider: "stripe",
    // manual payment only: how to pay, and what reference to add.
    instructions: "",
  },

  supabase: {
    // Supabase → Project Settings → API Keys.
    url: "",
    // The publishable key (older projects: the anon key). Public by design;
    // the row-level security rules in supabase/schema.sql protect the data.
    publishableKey: "",
  },
};
