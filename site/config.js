// The one settings file. Change payment and database settings here only.
// Everything in this file is public — secret keys belong in .env.

window.SPARK_CONFIG = {
  venture: "[Venture name]",

  payments: {
    // stripe | razorpay | xendit | manual
    provider: "stripe",
    // The payment link from your provider. Sandbox link while testing,
    // live link once your account is activated.
    depositLink: "",
    // Used when provider is "manual": how to pay, and what reference to add.
    manualInstructions: "",
  },

  supabase: {
    // Supabase → Project Settings → API Keys.
    url: "",
    // The publishable key (older projects: the anon key). Public by design;
    // the row-level security rules in supabase/schema.sql protect the data.
    publishableKey: "",
  },
};
